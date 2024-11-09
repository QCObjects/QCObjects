/**
 * QCObjects CLI 2.4.x
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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
(function () {
    var __load_default_settings__ = function () {
        CONFIG.set("documentRootFileIndex", "index.html");
        CONFIG.set("projectPath", "".concat(process.cwd(), "/"));
        CONFIG.set("useConfigService", false); // this is only true useful for client web side
        CONFIG.set("documentRoot", "./");
        CONFIG.set("serverPortHTTP", 80);
        CONFIG.set("serverPortHTTPS", 443);
        CONFIG.set("private-key-pem", "localhost-privkey.pem");
        CONFIG.set("private-cert-pem", "localhost-cert.pem");
        CONFIG.set("allowHTTP1", true);
        CONFIG.set("useTemplate", false);
        CONFIG.set("domain", "localhost");
        global.__get_version__ = function () {
            var path = require("path");
            var absolutePath = path.resolve(__dirname, "./");
            var package_config = require(absolutePath + "/../package.json");
            var qcobjects_pkg_config = require("qcobjects/package.json");
            var qcobjects_sdk_pkg_config = require("qcobjects-sdk/package.json");
            return {
                "qcobjects": qcobjects_pkg_config.version,
                "sdk": qcobjects_sdk_pkg_config.version,
                "cli": package_config.version
            };
        };
        global.__get_version_string__ = function () {
            var version = global.__get_version__();
            return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
        };
        var setDevMode = function (devmode) {
            if (typeof devmode !== "undefined") {
                switch (true) {
                    case devmode == "debug":
                        logger.debugEnabled = true;
                        logger.warnEnabled = true;
                        logger.infoEnabled = true;
                        break;
                    case devmode == "warn":
                        logger.debugEnabled = false;
                        logger.warnEnabled = true;
                        logger.infoEnabled = true;
                        break;
                    case devmode == "info":
                        logger.debugEnabled = false;
                        logger.warnEnabled = false;
                        logger.infoEnabled = true;
                        break;
                    default:
                        logger.debugEnabled = false;
                        logger.warnEnabled = false;
                        logger.infoEnabled = false;
                        break;
                }
            }
            else {
                logger.debugEnabled = false;
                logger.warnEnabled = false;
                logger.infoEnabled = false;
            }
        };
        try {
            var _config = require(CONFIG.get("projectPath") + "config.json");
            logger.debug("Loading settings from your config.json");
            var _secretKey = (_config.hasOwnProperty.call(_config, "domain")) ? (_config["domain"]) : ("_secret_");
            if (_config.hasOwnProperty.call(_config, "__encoded__")) {
                _config = JSON.parse(_Crypt.decrypt(_config.__encoded__, _secretKey));
            }
            for (var k in _config) {
                CONFIG.set(k, _config[k]);
            }
            setDevMode(CONFIG.get("devmode", ""));
            if (typeof CONFIG.get("backend") !== "undefined") {
                global.set("backendAvailable", true);
                if (typeof CONFIG.get("basePath") !== "undefined") {
                    logger.debug("Changing the current directory: ".concat(process.cwd()));
                    try {
                        process.chdir(CONFIG.get("basePath"));
                        logger.debug("New directory: ".concat(process.cwd()));
                    }
                    catch (err) {
                        logger.warn("It was impossible to change the current chdir: ".concat(err));
                    }
                }
            }
        }
        catch (e) {
            logger.debug(e);
            logger.debug("Something went wrong trying to load config.json file in your project");
        }
        (function () {
            return __awaiter(this, void 0, void 0, function () {
                var path, projectPath, loadDefaultRoutes;
                var _this = this;
                return __generator(this, function (_a) {
                    switch (_a.label) {
                        case 0:
                            path = require("path");
                            projectPath = CONFIG.get("projectPath", "".concat(process.cwd(), "/"));
                            loadDefaultRoutes = function () { return __awaiter(_this, void 0, void 0, function () {
                                var sdkPath, qcobjectsPath, backend;
                                return __generator(this, function (_a) {
                                    sdkPath = path.resolve(findPackageNodePath("qcobjects-sdk"), "qcobjects-sdk");
                                    qcobjectsPath = path.resolve(findPackageNodePath("qcobjects"), "qcobjects");
                                    backend = CONFIG.get("backend");
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
                                            "redirect_to": path.resolve(qcobjectsPath, "src", "QCObjects.js"),
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
                                            "redirect_to": path.resolve(sdkPath, "src/QCObjects-SDK.js"),
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
                                            "redirect_to": path.resolve(sdkPath, "$1"),
                                            "responseHeaders": {},
                                            "cors": {
                                                "allow_origins": "*"
                                            }
                                        }
                                    ]);
                                    CONFIG.set("backend", backend);
                                    return [2 /*return*/];
                                });
                            }); };
                            return [4 /*yield*/, loadDefaultRoutes()];
                        case 1:
                            _a.sent();
                            return [2 /*return*/];
                    }
                });
            });
        })().then(function () { return logger.info("Default routes loaded"); });
        (function () {
            /* Auto Discover dependencies (lib, handlers, commands) */
            var path = require("path");
            var fs = require("fs");
            var projectPath = CONFIG.get("projectPath", "".concat(process.cwd(), "/"));
            logger.debug("CONFIG.projectPath is set to ".concat(projectPath));
            var findPath = function (p) {
                var packagePath = path.resolve(findPackageNodePath(p), p);
                return packagePath;
            };
            var getPackageJSON = function (p) {
                var _json;
                try {
                    var packagePath = findPath(p);
                    if (typeof packagePath !== "undefined") {
                        _json = JSON.parse(fs.readFileSync(path.resolve("".concat(packagePath), "./package.json")).toString());
                    }
                    else {
                        _json = {};
                    }
                }
                catch (e) {
                    logger.debug("It was impossible to get the package.json from ".concat(p, ": ").concat(e));
                    _json = {};
                }
                return _json;
            };
            var hasKeyword = function (p, keyword) {
                if (typeof hasKeyword.keywords === "undefined") {
                    hasKeyword.keywords = {};
                }
                try {
                    if (typeof hasKeyword.keywords[p] === "undefined") {
                        hasKeyword.keywords[p] = getPackageJSON(p).keywords;
                    }
                }
                catch (e) {
                    throw Error("Something went wrong when trying to get the keywords of ".concat(p));
                }
                return typeof hasKeyword.keywords[p] !== "undefined" && hasKeyword.keywords[p].includes(keyword);
            };
            var setBackendValue = function (name, value) {
                var backend = CONFIG.get("backend", {});
                if (typeof value !== "undefined") {
                    backend[name] = value;
                }
                CONFIG.set("backend", backend);
            };
            var dependencies = function () {
                if (typeof dependencies.deps === "undefined") {
                    dependencies.deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve("".concat(projectPath), "./package.json")).toString()).dependencies);
                    setBackendValue("dependencies", dependencies.deps);
                }
                return dependencies.deps;
            };
            var devDependencies = function () {
                if (typeof devDependencies.deps === "undefined") {
                    devDependencies.deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve("".concat(projectPath), "./package.json")).toString()).devDependencies);
                    setBackendValue("devDependencies", devDependencies.deps);
                }
                return devDependencies.deps;
            };
            var loadLibs = function () {
                var _ret_;
                if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false)) {
                    var libs = dependencies().filter(function (p) { return hasKeyword(p, "qcobjects-lib"); });
                    setBackendValue("libs", libs);
                    if (libs.length > 0) {
                        logger.debug("Plugin Libs found: ".concat(libs));
                        _ret_ = Promise.all(libs.map(function (p) { return require(findPath(p)); })).then(function () { return logger.info("Libs loaded"); });
                    }
                    else {
                        logger.debug("No Plugin Libs found.");
                        _ret_ = Promise.resolve();
                    }
                }
                else {
                    logger.debug("To load libs, set autodiscover_libs to true in your config.json");
                    _ret_ = Promise.resolve();
                }
                return _ret_;
            };
            var loadHandlers = function () {
                var _ret_;
                if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_handlers", false)) {
                    var handlers = dependencies().filter(function (p) { return hasKeyword(p, "qcobjects-handler"); });
                    setBackendValue("handlers", handlers);
                    if (handlers.length > 0) {
                        logger.debug("Plugin Handlers found: ".concat(handlers));
                        _ret_ = Promise.all(handlers.map(function (p) { return require(findPath(p)); })).then(function () { return logger.info("Handlers loaded"); });
                    }
                    else {
                        logger.debug("No Plugin Handlers found.");
                        _ret_ = Promise.resolve();
                    }
                }
                else {
                    logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
                    _ret_ = Promise.resolve();
                }
                return _ret_;
            };
            var loadCommands = function () {
                var _ret_;
                logger.debug("Looking for custom commands as dependencies in: ".concat(projectPath, "/package.json"));
                if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
                    var commands = dependencies().filter(function (p) { return hasKeyword(p, "qcobjects-command"); });
                    setBackendValue("commands", commands);
                    if (commands.length > 0) {
                        logger.debug("Plugin Commands found: ".concat(commands));
                        _ret_ = Promise.all(commands.map(function (p) { return require(findPath(p)); })).then(function () { return logger.info("Commands loaded"); });
                    }
                    else {
                        logger.debug("No Plugin Commands found.");
                        _ret_ = Promise.resolve();
                    }
                }
                else {
                    logger.debug("To load commands, set autodiscover_commands to true in your config.json");
                    _ret_ = Promise.resolve();
                }
                return _ret_;
            };
            var loadDevCommands = function () {
                var _ret_;
                logger.debug("Looking for custom commands as dev dependencies in: ".concat(projectPath, "/package.json"));
                if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
                    var commands = devDependencies().filter(function (p) { return hasKeyword(p, "qcobjects-command"); });
                    setBackendValue("devCommands", commands);
                    if (commands.length > 0) {
                        logger.debug("Dev Plugin Commands found: ".concat(commands));
                        _ret_ = Promise.all(commands.map(function (p) { return require(findPath(p)); })).then(function () { return logger.info("Commands loaded"); });
                    }
                    else {
                        logger.debug("No Plugin Commands found in dev dependencies.");
                        _ret_ = Promise.resolve();
                    }
                }
                else {
                    logger.debug("To load commands, set autodiscover_commands to true in your config.json");
                    _ret_ = Promise.resolve();
                }
                return _ret_;
            };
            if (CONFIG.get("autodiscover", false) ||
                CONFIG.get("autodiscover_libs", false) ||
                CONFIG.get("autodiscover_handlers", false) ||
                CONFIG.get("autodiscover_commands", false)) {
                logger.info("Auto discover is enabled");
            }
            else if (!CONFIG.get("autodiscover", false)) {
                logger.info("Auto discover is disabled");
                logger.debug("To load all dependencies, set autodiscover to true in your config.json");
            }
            else {
                logger.info("Auto discover is disabled");
            }
            try {
                logger.debug("Loading Libs...");
                loadLibs();
            }
            catch (e) {
                throw Error("Something went wrong trying to load libs: ".concat(e.message));
            }
            try {
                logger.debug("Loading Handlers...");
                loadHandlers();
            }
            catch (e) {
                throw Error("Something went wrong trying to load handler: ".concat(e.message));
            }
            try {
                logger.debug("Loading Commands...");
                loadCommands();
            }
            catch (e) {
                throw Error("Something went wrong trying to load commands: ".concat(e.message));
            }
            try {
                logger.debug("Loading Dev Commands...");
                loadDevCommands();
            }
            catch (e) {
                throw Error("Something went wrong trying to load Dev commands: ".concat(e.message));
            }
            try {
                var commands = CONFIG.get("backend", { commands: [] }).commands || [];
                var devCommands = CONFIG.get("backend", { devCommands: [] }).devCommands || [];
                setBackendValue("plugins", commands.concat(devCommands));
            }
            catch (e) {
                throw Error("Something went wrong trying to load plugins list: ".concat(e.message));
            }
            logger.info("Dependencies loaded");
            process.once("SIGTERM", function () {
                console.log("\x1b[33m%s\x1b[0m", "Bye bye!");
                process.exit();
            });
        })();
    };
    global.__load_default_settings__ = __load_default_settings__;
    global.__load_default_settings__();
    var cleanCache = function () {
        Object.keys(require.cache).forEach(function (key) { delete require.cache[key]; });
    };
    var __reset_settings__ = function () {
        cleanCache();
        global.__load_default_settings__();
    };
    global.__reset_settings__ = __reset_settings__;
})();
