/**
 * QCObjects CLI 2.5
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
 */
/*eslint no-unused-vars: "off"*/
/*eslint no-redeclare: "off"*/
/*eslint no-empty: "off"*/
/*eslint strict: "off"*/
/*eslint no-mixed-operators: "off"*/
/*eslint no-undef: "off"*/
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getProjectPath = exports.__get_version_string__ = exports.__get_version__ = void 0;
require("qcobjects");
const node_fs_1 = require("node:fs");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_2 = __importDefault(require("node:fs"));
const qcobjects_1 = require("qcobjects");
const __get_version__ = () => {
    const absolutePath = node_path_1.default.resolve(__dirname, "./");
    const package_config_path = node_path_1.default.resolve(process.cwd(), "package.json");
    const qcobjects_pkg_config_path = `${(0, qcobjects_1.findPackageNodePath)("qcobjects/package.json")}/qcobjects/package.json`;
    const qcobjects_sdk_pkg_config_path = `${(0, qcobjects_1.findPackageNodePath)("qcobjects-sdk/package.json")}/qcobjects-sdk/package.json`;
    const readVersionFile = (filePath) => {
        try {
            return node_fs_2.default.readFileSync(filePath).toString();
        }
        catch (error) {
            qcobjects_1.logger.debug(`Error reading file at ${filePath}:`, error.message);
            return JSON.stringify({ version: "0.0.0" });
        }
    };
    const package_config_text = readVersionFile(package_config_path);
    const qcobjects_pkg_config_text = readVersionFile(qcobjects_pkg_config_path);
    const qcobjects_sdk_pkg_config_text = readVersionFile(qcobjects_sdk_pkg_config_path);
    const package_config = JSON.parse(package_config_text);
    const qcobjects_pkg_config = JSON.parse(qcobjects_pkg_config_text);
    const qcobjects_sdk_pkg_config = JSON.parse(qcobjects_sdk_pkg_config_text);
    return {
        "qcobjects": qcobjects_pkg_config.version,
        "sdk": qcobjects_sdk_pkg_config.version,
        "cli": package_config.version
    };
};
exports.__get_version__ = __get_version__;
const __get_version_string__ = () => {
    const version = (0, exports.__get_version__)();
    return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
};
exports.__get_version_string__ = __get_version_string__;
const getProjectPath = () => {
    return qcobjects_1.CONFIG.get("projectPath", `${process.cwd()}/`);
};
exports.getProjectPath = getProjectPath;
(0, qcobjects_1.Export)(exports.__get_version__);
(0, qcobjects_1.Export)(exports.__get_version_string__);
(0, qcobjects_1.Export)(exports.getProjectPath);
const __load_default_settings__ = () => {
    qcobjects_1.CONFIG.set("domain", "$ENV(DOMAIN)");
    qcobjects_1.CONFIG.set("certificate_provider", "$ENV(CERTIFICATE_PROVIDER)");
    qcobjects_1.CONFIG.set("devmode", "$ENV(DEVMODE)");
    qcobjects_1.CONFIG.set("autodiscover", true);
    qcobjects_1.CONFIG.set("autodiscover_commands", true);
    qcobjects_1.CONFIG.set("autodiscover_handlers", true);
    qcobjects_1.CONFIG.set("documentRoot", "$config(projectPath)public/");
    qcobjects_1.CONFIG.set("documentRootFileIndex", "index.html");
    qcobjects_1.CONFIG.set("cacheControl", "max-age=31536000");
    qcobjects_1.CONFIG.set("relativeImportPath", "js/packages/");
    qcobjects_1.CONFIG.set("serverPortHTTP", "8080");
    qcobjects_1.CONFIG.set("serverPortHTTPS", "8443");
    qcobjects_1.CONFIG.set("useLocalSDK", true);
    qcobjects_1.CONFIG.set("useLegacyHTTP", false);
    qcobjects_1.CONFIG.set("private-key-pem", "$config(domain)-privkey.pem");
    qcobjects_1.CONFIG.set("private-cert-pem", "$config(domain)-cert.pem");
    qcobjects_1.CONFIG.set("enableShellCommands", true);
    qcobjects_1.CONFIG.set("OPENAI_API_KEY", "$ENV(OPENAI_API_KEY)");
    // Set backend configuration
    const backend = {
        db_engine: {
            name: "$ENV(ENGINE_NAME)",
            databaseName: "$ENV(DATABASE_NAME)"
        },
        auth: {
            enabled: true,
            defaultUser: "$ENV(DEFAULT_USER)",
            defaultPasswd: "$ENV(DEFAULT_PASSWORD)",
            microsoftapikey: "$ENV(MICROSOFT_API_KEY)",
            googleapikey: "$ENV(GOOGLE_API_KEY)"
        },
        routes: []
    };
    qcobjects_1.CONFIG.set("backend", backend);
    // Set package configuration
    const packageConfig = {
        source: {
            backend: "backend",
            frontend: "src"
        },
        build: "build",
        dist: "dist"
    };
    qcobjects_1.CONFIG.set("package", packageConfig);
    qcobjects_1.CONFIG.set("useConfigService", false); // this is only true useful for client web side
    qcobjects_1.CONFIG.set("projectPath", `${process.cwd()}/`);
    qcobjects_1.CONFIG.set("allowHTTP1", true);
    qcobjects_1.CONFIG.set("useTemplate", false);
    qcobjects_1.CONFIG.set("useLegacyHTTP", false);
    const setDevMode = (devmode) => {
        if (typeof devmode !== "undefined") {
            switch (true) {
                case devmode == "debug":
                    qcobjects_1.logger.debugEnabled = true;
                    qcobjects_1.logger.warnEnabled = true;
                    qcobjects_1.logger.infoEnabled = true;
                    break;
                case devmode == "warn":
                    qcobjects_1.logger.debugEnabled = false;
                    qcobjects_1.logger.warnEnabled = true;
                    qcobjects_1.logger.infoEnabled = true;
                    break;
                case devmode == "info":
                    qcobjects_1.logger.debugEnabled = false;
                    qcobjects_1.logger.warnEnabled = false;
                    qcobjects_1.logger.infoEnabled = true;
                    break;
                default:
                    qcobjects_1.logger.debugEnabled = false;
                    qcobjects_1.logger.warnEnabled = false;
                    qcobjects_1.logger.infoEnabled = false;
                    break;
            }
        }
        else {
            qcobjects_1.logger.debugEnabled = false;
            qcobjects_1.logger.warnEnabled = false;
            qcobjects_1.logger.infoEnabled = false;
        }
    };
    try {
        const loadConfig = () => {
            const configPath = node_path_1.default.resolve(qcobjects_1.CONFIG.get("projectPath"), "config.json");
            const configText = (0, node_fs_1.readFileSync)(configPath).toString();
            const configJson = JSON.parse(configText);
            return configJson;
        };
        var _config = loadConfig();
        qcobjects_1.logger.debug("Loading settings from your config.json");
        const _secretKey = (Object.hasOwn(_config, "domain")) ? (_config["domain"]) : ("_secret_");
        if (Object.hasOwn(_config, "__encoded__")) {
            _config = JSON.parse(qcobjects_1._Crypt.decrypt(_config.__encoded__, _secretKey));
        }
        for (var k in _config) {
            qcobjects_1.CONFIG.set(k, _config[k]);
        }
        setDevMode(qcobjects_1.CONFIG.get("devmode", ""));
        if (typeof qcobjects_1.CONFIG.get("backend") !== "undefined") {
            qcobjects_1.global.set("backendAvailable", true);
        }
        if (typeof qcobjects_1.CONFIG.get("basePath") !== "undefined") {
            qcobjects_1.logger.debug(`Changing the current directory: ${process.cwd()}`);
            try {
                process.chdir(qcobjects_1.CONFIG.get("basePath"));
                qcobjects_1.logger.debug(`New directory: ${process.cwd()}`);
            }
            catch (err) {
                qcobjects_1.logger.warn(`It was impossible to change the current chdir: ${err}`);
            }
        }
    }
    catch (e) {
        qcobjects_1.logger.debug(e);
        qcobjects_1.logger.debug("Something went wrong trying to load config.json file in your project");
    }
    (async function () {
        const projectPath = (0, exports.getProjectPath)();
        const loadDefaultRoutes = async () => {
            return await new Promise((resolve, reject) => {
                const sdkPath = node_path_1.default.resolve((0, qcobjects_1.findPackageNodePath)("qcobjects-sdk"), "qcobjects-sdk");
                const qcobjectsPath = node_path_1.default.resolve((0, qcobjects_1.findPackageNodePath)("qcobjects"), "qcobjects");
                let backend = qcobjects_1.CONFIG.get("backend");
                if (typeof backend === "undefined") {
                    backend = {};
                }
                if (typeof backend.routes === "undefined") {
                    backend.routes = [];
                }
                backend.routes = backend.routes.concat([{
                        "name": "QCObjects.js",
                        "description": "Redirection of QCObjects.js",
                        "path": "^/QCObjects.js$",
                        "microservice": "com.qcobjects.backend.microservice.static",
                        "redirect_to": node_path_1.default.resolve(qcobjectsPath, "src", "QCObjects.js"),
                        "responseHeaders": {},
                        "cors": {
                            "allow_origins": "*"
                        }
                    },
                    {
                        "name": "QCObjects-SDK.js",
                        "description": "Redirection of QCObjects SDK",
                        "path": "^/js/packages/QCObjects-SDK.js$",
                        "microservice": "com.qcobjects.backend.microservice.static",
                        "redirect_to": node_path_1.default.resolve(sdkPath, "src/QCObjects-SDK.js"),
                        "responseHeaders": {},
                        "cors": {
                            "allow_origins": "*"
                        }
                    },
                    {
                        "name": "QCObjects-SDK Components",
                        "description": "Redirection of QCObjects SDK",
                        "path": "^/qcobjects-sdk/(.*)$",
                        "microservice": "com.qcobjects.backend.microservice.static",
                        "redirect_to": node_path_1.default.resolve(sdkPath, "$1"),
                        "responseHeaders": {},
                        "cors": {
                            "allow_origins": "*"
                        }
                    }
                ]);
                qcobjects_1.CONFIG.set("backend", backend);
                resolve();
            });
        };
        await loadDefaultRoutes();
    })()
        .then(() => qcobjects_1.logger.info("Default routes loaded"))
        .catch((e) => { qcobjects_1.logger.warn(`An error ocurred loading default settings: ${e}`); });
    (function () {
        /* Auto Discover dependencies (lib, handlers, commands) */
        const projectPath = qcobjects_1.CONFIG.get("projectPath", `${process.cwd()}/`);
        qcobjects_1.logger.debug(`CONFIG.projectPath is set to ${projectPath}`);
        const findPath = (p) => {
            const packagePath = node_path_1.default.resolve((0, qcobjects_1.findPackageNodePath)(p), p);
            return packagePath;
        };
        const getPackageJSON = (p) => {
            let _json;
            try {
                const packagePath = findPath(p);
                if (typeof packagePath !== "undefined") {
                    _json = JSON.parse(node_fs_2.default.readFileSync(node_path_1.default.resolve(`${packagePath}`, "./package.json")).toString());
                }
                else {
                    _json = {};
                }
            }
            catch (e) {
                qcobjects_1.logger.debug(`It was impossible to get the package.json from ${p}: ${e}`);
                _json = {};
            }
            return _json;
        };
        const hasKeyword = (() => {
            let keywords = {};
            return (p, keyword) => {
                if (typeof keywords === "undefined") {
                    keywords = {};
                }
                try {
                    console.log("getting keywords for: ", p);
                    if (typeof keywords[p] === "undefined") {
                        keywords[p] = getPackageJSON(p).keywords;
                    }
                }
                catch (e) {
                    throw Error(`Something went wrong when trying to get the keywords of ${p}`);
                }
                return typeof keywords[p] !== "undefined" && keywords[p].includes(keyword);
            };
        })();
        const setBackendValue = (name, value) => {
            const backend = qcobjects_1.CONFIG.get("backend", {});
            if (typeof value !== "undefined") {
                backend[name] = value;
            }
            qcobjects_1.CONFIG.set("backend", backend);
        };
        const dependencies = (() => {
            let deps = [];
            return () => {
                if (typeof deps === "undefined") {
                    deps = Object.keys(JSON.parse(node_fs_2.default.readFileSync(node_path_1.default.resolve(`${projectPath}`, "./package.json")).toString()).dependencies);
                    setBackendValue("dependencies", deps);
                }
                return deps;
            };
        })();
        const devDependencies = (() => {
            let deps = [];
            return () => {
                if (typeof deps === "undefined") {
                    deps = Object.keys(JSON.parse(node_fs_2.default.readFileSync(node_path_1.default.resolve(`${projectPath}`, "./package.json")).toString()).devDependencies);
                    setBackendValue("devDependencies", deps);
                }
                return deps;
            };
        })();
        const loadLibs = () => {
            let _ret_;
            if (qcobjects_1.CONFIG.get("autodiscover", false) || qcobjects_1.CONFIG.get("autodiscover_libs", false)) {
                const libs = dependencies().filter((p) => hasKeyword(p, "qcobjects-lib"));
                setBackendValue("libs", libs);
                if (libs.length > 0) {
                    qcobjects_1.logger.debug(`Plugin Libs found: ${libs.join(",")}`);
                    _ret_ = Promise.all(libs.map(async (p) => {
                        return await import(findPath(p));
                    })).then(() => qcobjects_1.logger.info("Libs loaded"));
                }
                else {
                    qcobjects_1.logger.debug("No Plugin Libs found.");
                    _ret_ = Promise.resolve();
                }
            }
            else {
                qcobjects_1.logger.debug("To load libs, set autodiscover_libs to true in your config.json");
                _ret_ = Promise.resolve();
            }
            return _ret_;
        };
        const loadHandlers = () => {
            let _ret_;
            if (qcobjects_1.CONFIG.get("autodiscover", false) || qcobjects_1.CONFIG.get("autodiscover_handlers", false)) {
                const handlers = dependencies().filter((p) => hasKeyword(p, "qcobjects-handler"));
                setBackendValue("handlers", handlers);
                if (handlers.length > 0) {
                    qcobjects_1.logger.debug(`Plugin Handlers found: ${handlers.join(",")}`);
                    _ret_ = Promise.all(handlers.map(async (p) => {
                        return await import(findPath(p));
                    })).then(() => qcobjects_1.logger.info("Handlers loaded"));
                }
                else {
                    qcobjects_1.logger.debug("No Plugin Handlers found.");
                    _ret_ = Promise.resolve();
                }
            }
            else {
                qcobjects_1.logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
                _ret_ = Promise.resolve();
            }
            return _ret_;
        };
        const loadCommands = () => {
            let _ret_;
            qcobjects_1.logger.debug(`Looking for custom commands as dependencies in: ${projectPath}/package.json`);
            if (qcobjects_1.CONFIG.get("autodiscover", false) || qcobjects_1.CONFIG.get("autodiscover_commands", false)) {
                const commands = dependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
                setBackendValue("commands", commands);
                if (commands.length > 0) {
                    qcobjects_1.logger.debug(`Plugin Commands found: ${commands.join(",")}`);
                    _ret_ = Promise.all(commands.map(async (p) => {
                        try {
                            return await import(findPath(p));
                        }
                        catch (error) {
                            qcobjects_1.logger.error(`Failed to load command ${p}: ${error}`);
                            throw error;
                        }
                    })).then(() => qcobjects_1.logger.info("Commands loaded"))
                        .catch(error => {
                        qcobjects_1.logger.error("Failed to load commands:", error);
                        throw error;
                    });
                }
                else {
                    qcobjects_1.logger.debug("No Plugin Commands found.");
                    _ret_ = Promise.resolve();
                }
            }
            else {
                qcobjects_1.logger.debug("To load commands, set autodiscover_commands to true in your config.json");
                _ret_ = Promise.resolve();
            }
            return _ret_;
        };
        const loadDevCommands = () => {
            let _ret_;
            qcobjects_1.logger.debug(`Looking for custom commands as dev dependencies in: ${projectPath}/package.json`);
            if (qcobjects_1.CONFIG.get("autodiscover", false) || qcobjects_1.CONFIG.get("autodiscover_commands", false)) {
                const commands = devDependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
                setBackendValue("devCommands", commands);
                if (commands.length > 0) {
                    qcobjects_1.logger.debug(`Dev Plugin Commands found: ${commands.join(",")}`);
                    _ret_ = Promise.all(commands.map(async (p) => {
                        return await import(findPath(p));
                    })).then(() => qcobjects_1.logger.info("Commands loaded"));
                }
                else {
                    qcobjects_1.logger.debug("No Plugin Commands found in dev dependencies.");
                    _ret_ = Promise.resolve();
                }
            }
            else {
                qcobjects_1.logger.debug("To load commands, set autodiscover_commands to true in your config.json");
                _ret_ = Promise.resolve();
            }
            return _ret_;
        };
        if (qcobjects_1.CONFIG.get("autodiscover", false) ||
            qcobjects_1.CONFIG.get("autodiscover_libs", false) ||
            qcobjects_1.CONFIG.get("autodiscover_handlers", false) ||
            qcobjects_1.CONFIG.get("autodiscover_commands", false)) {
            qcobjects_1.logger.info("Auto discover is enabled");
        }
        else if (!qcobjects_1.CONFIG.get("autodiscover", false)) {
            qcobjects_1.logger.info("Auto discover is disabled");
            qcobjects_1.logger.debug("To load all dependencies, set autodiscover to true in your config.json");
        }
        else {
            qcobjects_1.logger.info("Auto discover is disabled");
        }
        try {
            qcobjects_1.logger.debug("Loading Libs...");
            loadLibs().catch((e) => {
                qcobjects_1.logger.warn(`An error ocurred loading libs: ${e}`);
            });
        }
        catch (e) {
            throw Error(`Something went wrong trying to load libs: ${e.message}`);
        }
        try {
            qcobjects_1.logger.debug("Loading Handlers...");
            loadHandlers().catch((e) => {
                qcobjects_1.logger.warn(`An error ocurred loading handlers: ${e}`);
            });
        }
        catch (e) {
            throw Error(`Something went wrong trying to load handler: ${e.message}`);
        }
        try {
            qcobjects_1.logger.debug("Loading Commands...");
            loadCommands().catch((e) => {
                qcobjects_1.logger.warn(`An error ocurred loading commands: ${e}`);
            });
        }
        catch (e) {
            throw Error(`Something went wrong trying to load commands: ${e.message}`);
        }
        try {
            qcobjects_1.logger.debug("Loading Dev Commands...");
            loadDevCommands().catch((e) => {
                qcobjects_1.logger.warn(`An error ocurred loading dev commands: ${e}`);
            });
        }
        catch (e) {
            throw Error(`Something went wrong trying to load Dev commands: ${e.message}`);
        }
        try {
            const commands = qcobjects_1.CONFIG.get("backend", { commands: [] }).commands || [];
            const devCommands = qcobjects_1.CONFIG.get("backend", { devCommands: [] }).devCommands || [];
            setBackendValue("plugins", commands.concat(devCommands));
        }
        catch (e) {
            throw Error(`Something went wrong trying to load plugins list: ${e.message}`);
        }
        qcobjects_1.logger.info("Dependencies loaded");
        process.once("SIGTERM", () => {
            console.log("\x1b[33m%s\x1b[0m", "Bye bye!");
            process.exit();
        });
    })();
};
qcobjects_1.global.__load_default_settings__ = __load_default_settings__;
qcobjects_1.global.__load_default_settings__();
const cleanCache = () => {
    Object.keys(require.cache).forEach((key) => { delete require.cache[key]; });
};
const __reset_settings__ = () => {
    cleanCache();
    qcobjects_1.global.__load_default_settings__();
};
qcobjects_1.global.__reset_settings__ = __reset_settings__;
//# sourceMappingURL=defaultsettings.js.map