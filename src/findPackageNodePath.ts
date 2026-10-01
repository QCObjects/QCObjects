import { CONFIG } from "./CONFIG";
import { Export } from "./Export";
import { logger } from "./Logger";
import { isBrowser } from "./platform";

export const findPackageNodePath = function (packagename:string):string|null {
    let sdkPath = null;
    if (!isBrowser) {
        /* require() does not exist in ESM builds and module.paths is undefined
           there and inside bundles, so both must be resolved defensively */
        let __fs__: any = null;
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const fs = require("node:fs");
            if (fs && typeof fs.existsSync === "function") {
                __fs__ = fs;
            }
        } catch (e: any) {
            logger.debug(`findPackageNodePath could not load node:fs: ${e}`);
        }

        const __modulePaths__:string[] = (typeof module !== "undefined" && Array.isArray(module.paths)) ? (module.paths) : [];
        const cwd:string = (typeof process !== "undefined" && typeof process.cwd === "function") ? process.cwd() : "";
        let sdkPaths = [
            `${CONFIG.get("projectPath")}${CONFIG.get("relativeImportPath")}`,
            `${CONFIG.get("basePath")}${CONFIG.get("relativeImportPath")}`,
            `${CONFIG.get("projectPath")}`,
            `${CONFIG.get("basePath")}`,
            `${CONFIG.get("relativeImportPath")}`,
            `${cwd}${CONFIG.get("relativeImportPath")}`,
            `${cwd}/node_modules/`,
            `${cwd}/node_modules`,
            `${cwd}`,
            "node_modules",
            "./",
            ""
        ].concat(__modulePaths__).filter((p:any):boolean => typeof p === "string" && p !== "undefined");

        if (__fs__ !== null) {
            sdkPaths = sdkPaths.filter((p:string):boolean => __fs__.existsSync(p + "/" + packagename));
            if (sdkPaths.length > 0) {
                sdkPath = sdkPaths[0];
                logger.info(packagename + " is Installed.");
            } else {
                sdkPath = "";
                logger.info(`${packagename} is not in a standard path.`);
            }
        } else {
            /* without fs we cannot verify, so prefer the conventional location
               rather than reporting the package as unavailable */
            sdkPath = `${cwd}/node_modules`;
            logger.debug(`findPackageNodePath could not verify ${packagename}, assuming ${sdkPath}`);
        }
    }
    return sdkPath;
};
Export(findPackageNodePath);