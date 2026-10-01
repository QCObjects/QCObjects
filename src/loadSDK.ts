import { CONFIG } from "./CONFIG";
import { findPackageNodePath } from "./findPackageNodePath";
import { Import } from "./Import";
import { logger } from "./Logger";
import { _require_, isBrowser, isNodeCommonJS } from "./platform";
import { _top } from "./top";

const loadSDK = ():void => {
    /* The SDK announces itself on the shared context (_top._sdk_) when it is
       statically bundled with the application, as it is in a full bundle built
       by esbuild. There is then nothing left to import, and attempting it would
       both duplicate the SDK and read useLocalSDK before the application has had
       a chance to configure it. */
    if (typeof _top._sdk_ !== "undefined") {
        logger.debug("The SDK is already present in this bundle, skipping the dynamic import");
        return;
    }
    if (CONFIG.get("useSDK")) {
        (function () {
            const remoteImportsPath = CONFIG.get("remoteImportsPath");
            const external = (!CONFIG.get("useLocalSDK"));
            CONFIG.set("remoteImportsPath", CONFIG.get("remoteSDKPath"));

            let tryImportingSDK = false;
            let sdkName = "QCObjects-SDK";
            if (isBrowser) {
                tryImportingSDK = true;
            } else {
                const sdkPath = findPackageNodePath("qcobjects-sdk");
                if (sdkPath !== null) {
                    sdkName = "qcobjects-sdk";
                    tryImportingSDK = true;
                } else if (sdkPath !== ""){
                    sdkName = "node_modules/qcobjects-sdk/QCObjects-SDK";
                    tryImportingSDK = true;
                } else {
                    tryImportingSDK = false;
                }
            }

            if (tryImportingSDK) {
                logger.info("Importing SDK... " + sdkName);
                if (isNodeCommonJS && typeof require !== "undefined") {
                    const sdk = _require_("qcobjects-sdk");
                    if (sdk) {
                        logger.debug("QCObjects SDK was loaded OK.");
                    } else {
                        logger.debug("QCObjects SDK could not be imported.");
                    }
                } else {
                    Import(sdkName, function () {
                        if (external) {
                            logger.debug("QCObjects-SDK.js loaded from remote location");
                        } else {
                            logger.debug("QCObjects-SDK.js loaded from local");
                        }
                        CONFIG.set("remoteImportsPath", remoteImportsPath);
                    }, external)
                        ?.catch((e: any) => { throw new Error(`An error ocurred when trying to import: ${e}`); });
                }
            } else {
                logger.debug("SDK has not been imported as it is not available at the moment");
            }
        })();
    }

};

export default loadSDK;
