"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var defaultsettings_exports = {};
__export(defaultsettings_exports, {
  __get_version__: () => __get_version__,
  __get_version_string__: () => __get_version_string__
});
module.exports = __toCommonJS(defaultsettings_exports);
var import_qcobjects = require("qcobjects");
var import_node_fs = require("node:fs");
var import_node_path = __toESM(require("node:path"));
var import_node_fs2 = __toESM(require("node:fs"));
var import_qcobjects2 = require("qcobjects");
const __get_version__ = /* @__PURE__ */ __name(() => {
  const absolutePath = import_node_path.default.resolve(__dirname, "./");
  const package_config_path = import_node_path.default.resolve(process.cwd(), "package.json");
  const qcobjects_pkg_config_path = `${(0, import_qcobjects2.findPackageNodePath)("qcobjects/package.json")}/qcobjects/package.json`;
  const qcobjects_sdk_pkg_config_path = `${(0, import_qcobjects2.findPackageNodePath)("qcobjects-sdk/package.json")}/qcobjects-sdk/package.json`;
  const package_config_text = (0, import_node_fs.readFileSync)(package_config_path).toString();
  const qcobjects_pkg_config_text = (0, import_node_fs.readFileSync)(qcobjects_pkg_config_path).toString();
  const qcobjects_sdk_pkg_config_text = (0, import_node_fs.readFileSync)(qcobjects_sdk_pkg_config_path).toString();
  const package_config = JSON.parse(package_config_text);
  const qcobjects_pkg_config = JSON.parse(qcobjects_pkg_config_text);
  const qcobjects_sdk_pkg_config = JSON.parse(qcobjects_sdk_pkg_config_text);
  return {
    "qcobjects": qcobjects_pkg_config.version,
    "sdk": qcobjects_sdk_pkg_config.version,
    "cli": package_config.version
  };
}, "__get_version__");
const __get_version_string__ = /* @__PURE__ */ __name(() => {
  const version = __get_version__();
  return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
}, "__get_version_string__");
(0, import_qcobjects2.Export)(__get_version__);
(0, import_qcobjects2.Export)(__get_version_string__);
const __load_default_settings__ = /* @__PURE__ */ __name(() => {
  import_qcobjects2.CONFIG.set("documentRootFileIndex", "index.html");
  import_qcobjects2.CONFIG.set("projectPath", `${process.cwd()}/`);
  import_qcobjects2.CONFIG.set("useConfigService", false);
  import_qcobjects2.CONFIG.set("documentRoot", "./");
  import_qcobjects2.CONFIG.set("serverPortHTTP", 80);
  import_qcobjects2.CONFIG.set("serverPortHTTPS", 443);
  import_qcobjects2.CONFIG.set("private-key-pem", "localhost-privkey.pem");
  import_qcobjects2.CONFIG.set("private-cert-pem", "localhost-cert.pem");
  import_qcobjects2.CONFIG.set("allowHTTP1", true);
  import_qcobjects2.CONFIG.set("useTemplate", false);
  import_qcobjects2.CONFIG.set("domain", "localhost");
  const setDevMode = /* @__PURE__ */ __name((devmode) => {
    if (typeof devmode !== "undefined") {
      switch (true) {
        case devmode == "debug":
          import_qcobjects2.logger.debugEnabled = true;
          import_qcobjects2.logger.warnEnabled = true;
          import_qcobjects2.logger.infoEnabled = true;
          break;
        case devmode == "warn":
          import_qcobjects2.logger.debugEnabled = false;
          import_qcobjects2.logger.warnEnabled = true;
          import_qcobjects2.logger.infoEnabled = true;
          break;
        case devmode == "info":
          import_qcobjects2.logger.debugEnabled = false;
          import_qcobjects2.logger.warnEnabled = false;
          import_qcobjects2.logger.infoEnabled = true;
          break;
        default:
          import_qcobjects2.logger.debugEnabled = false;
          import_qcobjects2.logger.warnEnabled = false;
          import_qcobjects2.logger.infoEnabled = false;
          break;
      }
    } else {
      import_qcobjects2.logger.debugEnabled = false;
      import_qcobjects2.logger.warnEnabled = false;
      import_qcobjects2.logger.infoEnabled = false;
    }
  }, "setDevMode");
  try {
    const loadConfig = /* @__PURE__ */ __name(() => {
      const configPath = import_node_path.default.resolve(import_qcobjects2.CONFIG.get("projectPath"), "config.json");
      const configText = (0, import_node_fs.readFileSync)(configPath).toString();
      const configJson = JSON.parse(configText);
      return configJson;
    }, "loadConfig");
    var _config = loadConfig();
    import_qcobjects2.logger.debug("Loading settings from your config.json");
    const _secretKey = Object.hasOwn(_config, "domain") ? _config["domain"] : "_secret_";
    if (Object.hasOwn(_config, "__encoded__")) {
      _config = JSON.parse(import_qcobjects2._Crypt.decrypt(_config.__encoded__, _secretKey));
    }
    for (var k in _config) {
      import_qcobjects2.CONFIG.set(k, _config[k]);
    }
    setDevMode(import_qcobjects2.CONFIG.get("devmode", ""));
    if (typeof import_qcobjects2.CONFIG.get("backend") !== "undefined") {
      import_qcobjects2.global.set("backendAvailable", true);
      if (typeof import_qcobjects2.CONFIG.get("basePath") !== "undefined") {
        import_qcobjects2.logger.debug(`Changing the current directory: ${process.cwd()}`);
        try {
          process.chdir(import_qcobjects2.CONFIG.get("basePath"));
          import_qcobjects2.logger.debug(`New directory: ${process.cwd()}`);
        } catch (err) {
          import_qcobjects2.logger.warn(`It was impossible to change the current chdir: ${err}`);
        }
      }
    }
  } catch (e) {
    import_qcobjects2.logger.debug(e);
    import_qcobjects2.logger.debug("Something went wrong trying to load config.json file in your project");
  }
  (async function() {
    const projectPath = import_qcobjects2.CONFIG.get("projectPath", `${process.cwd()}/`);
    const loadDefaultRoutes = /* @__PURE__ */ __name(async () => {
      return await new Promise((resolve, reject) => {
        const sdkPath = import_node_path.default.resolve((0, import_qcobjects2.findPackageNodePath)("qcobjects-sdk"), "qcobjects-sdk");
        const qcobjectsPath = import_node_path.default.resolve((0, import_qcobjects2.findPackageNodePath)("qcobjects"), "qcobjects");
        let backend = import_qcobjects2.CONFIG.get("backend");
        if (typeof backend === "undefined") {
          backend = {};
        }
        if (typeof backend.routes === "undefined") {
          backend.routes = [];
        }
        backend.routes = backend.routes.concat([
          {
            "name": "QCObjects.js",
            "description": "Redirection of QCObjects.js",
            "path": "^/QCObjects.js$",
            "microservice": "com.qcobjects.backend.microservice.static",
            "redirect_to": import_node_path.default.resolve(qcobjectsPath, "src", "QCObjects.js"),
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
            "redirect_to": import_node_path.default.resolve(sdkPath, "src/QCObjects-SDK.js"),
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
            "redirect_to": import_node_path.default.resolve(sdkPath, "$1"),
            "responseHeaders": {},
            "cors": {
              "allow_origins": "*"
            }
          }
        ]);
        import_qcobjects2.CONFIG.set("backend", backend);
        resolve();
      });
    }, "loadDefaultRoutes");
    await loadDefaultRoutes();
  })().then(() => import_qcobjects2.logger.info("Default routes loaded")).catch((e) => {
    import_qcobjects2.logger.warn(`An error ocurred loading default settings: ${e}`);
  });
  (function() {
    const projectPath = import_qcobjects2.CONFIG.get("projectPath", `${process.cwd()}/`);
    import_qcobjects2.logger.debug(`CONFIG.projectPath is set to ${projectPath}`);
    const findPath = /* @__PURE__ */ __name((p) => {
      const packagePath = import_node_path.default.resolve((0, import_qcobjects2.findPackageNodePath)(p), p);
      return packagePath;
    }, "findPath");
    const getPackageJSON = /* @__PURE__ */ __name((p) => {
      let _json;
      try {
        const packagePath = findPath(p);
        if (typeof packagePath !== "undefined") {
          _json = JSON.parse(import_node_fs2.default.readFileSync(import_node_path.default.resolve(`${packagePath}`, "./package.json")).toString());
        } else {
          _json = {};
        }
      } catch (e) {
        import_qcobjects2.logger.debug(`It was impossible to get the package.json from ${p}: ${e}`);
        _json = {};
      }
      return _json;
    }, "getPackageJSON");
    const hasKeyword = /* @__PURE__ */ (() => {
      let keywords = {};
      return (p, keyword) => {
        if (typeof keywords === "undefined") {
          keywords = {};
        }
        try {
          if (typeof keywords[p] === "undefined") {
            keywords[p] = getPackageJSON(p).keywords;
          }
        } catch (e) {
          throw Error(`Something went wrong when trying to get the keywords of ${p}`);
        }
        return typeof keywords[p] !== "undefined" && keywords[p].includes(keyword);
      };
    })();
    const setBackendValue = /* @__PURE__ */ __name((name, value) => {
      const backend = import_qcobjects2.CONFIG.get("backend", {});
      if (typeof value !== "undefined") {
        backend[name] = value;
      }
      import_qcobjects2.CONFIG.set("backend", backend);
    }, "setBackendValue");
    const dependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(import_node_fs2.default.readFileSync(import_node_path.default.resolve(`${projectPath}`, "./package.json")).toString()).dependencies);
          setBackendValue("dependencies", deps);
        }
        return deps;
      };
    })();
    const devDependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(import_node_fs2.default.readFileSync(import_node_path.default.resolve(`${projectPath}`, "./package.json")).toString()).devDependencies);
          setBackendValue("devDependencies", deps);
        }
        return deps;
      };
    })();
    const loadLibs = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (import_qcobjects2.CONFIG.get("autodiscover", false) || import_qcobjects2.CONFIG.get("autodiscover_libs", false)) {
        const libs = dependencies().filter((p) => hasKeyword(p, "qcobjects-lib"));
        setBackendValue("libs", libs);
        if (libs.length > 0) {
          import_qcobjects2.logger.debug(`Plugin Libs found: ${libs.join(",")}`);
          _ret_ = Promise.all(libs.map(async (p) => {
            return await import(findPath(p));
          })).then(() => import_qcobjects2.logger.info("Libs loaded"));
        } else {
          import_qcobjects2.logger.debug("No Plugin Libs found.");
          _ret_ = Promise.resolve();
        }
      } else {
        import_qcobjects2.logger.debug("To load libs, set autodiscover_libs to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadLibs");
    const loadHandlers = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (import_qcobjects2.CONFIG.get("autodiscover", false) || import_qcobjects2.CONFIG.get("autodiscover_handlers", false)) {
        const handlers = dependencies().filter((p) => hasKeyword(p, "qcobjects-handler"));
        setBackendValue("handlers", handlers);
        if (handlers.length > 0) {
          import_qcobjects2.logger.debug(`Plugin Handlers found: ${handlers.join(",")}`);
          _ret_ = Promise.all(handlers.map(async (p) => {
            return await import(findPath(p));
          })).then(() => import_qcobjects2.logger.info("Handlers loaded"));
        } else {
          import_qcobjects2.logger.debug("No Plugin Handlers found.");
          _ret_ = Promise.resolve();
        }
      } else {
        import_qcobjects2.logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadHandlers");
    const loadCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      import_qcobjects2.logger.debug(`Looking for custom commands as dependencies in: ${projectPath}/package.json`);
      if (import_qcobjects2.CONFIG.get("autodiscover", false) || import_qcobjects2.CONFIG.get("autodiscover_commands", false)) {
        const commands = dependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("commands", commands);
        if (commands.length > 0) {
          import_qcobjects2.logger.debug(`Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map(async (p) => {
            return await import(findPath(p));
          })).then(() => import_qcobjects2.logger.info("Commands loaded"));
        } else {
          import_qcobjects2.logger.debug("No Plugin Commands found.");
          _ret_ = Promise.resolve();
        }
      } else {
        import_qcobjects2.logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadCommands");
    const loadDevCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      import_qcobjects2.logger.debug(`Looking for custom commands as dev dependencies in: ${projectPath}/package.json`);
      if (import_qcobjects2.CONFIG.get("autodiscover", false) || import_qcobjects2.CONFIG.get("autodiscover_commands", false)) {
        const commands = devDependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("devCommands", commands);
        if (commands.length > 0) {
          import_qcobjects2.logger.debug(`Dev Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map(async (p) => {
            return await import(findPath(p));
          })).then(() => import_qcobjects2.logger.info("Commands loaded"));
        } else {
          import_qcobjects2.logger.debug("No Plugin Commands found in dev dependencies.");
          _ret_ = Promise.resolve();
        }
      } else {
        import_qcobjects2.logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadDevCommands");
    if (import_qcobjects2.CONFIG.get("autodiscover", false) || import_qcobjects2.CONFIG.get("autodiscover_libs", false) || import_qcobjects2.CONFIG.get("autodiscover_handlers", false) || import_qcobjects2.CONFIG.get("autodiscover_commands", false)) {
      import_qcobjects2.logger.info("Auto discover is enabled");
    } else if (!import_qcobjects2.CONFIG.get("autodiscover", false)) {
      import_qcobjects2.logger.info("Auto discover is disabled");
      import_qcobjects2.logger.debug("To load all dependencies, set autodiscover to true in your config.json");
    } else {
      import_qcobjects2.logger.info("Auto discover is disabled");
    }
    try {
      import_qcobjects2.logger.debug("Loading Libs...");
      loadLibs().catch((e) => {
        import_qcobjects2.logger.warn(`An error ocurred loading libs: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load libs: ${e.message}`);
    }
    try {
      import_qcobjects2.logger.debug("Loading Handlers...");
      loadHandlers().catch((e) => {
        import_qcobjects2.logger.warn(`An error ocurred loading handlers: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load handler: ${e.message}`);
    }
    try {
      import_qcobjects2.logger.debug("Loading Commands...");
      loadCommands().catch((e) => {
        import_qcobjects2.logger.warn(`An error ocurred loading commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load commands: ${e.message}`);
    }
    try {
      import_qcobjects2.logger.debug("Loading Dev Commands...");
      loadDevCommands().catch((e) => {
        import_qcobjects2.logger.warn(`An error ocurred loading dev commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load Dev commands: ${e.message}`);
    }
    try {
      const commands = import_qcobjects2.CONFIG.get("backend", { commands: [] }).commands || [];
      const devCommands = import_qcobjects2.CONFIG.get("backend", { devCommands: [] }).devCommands || [];
      setBackendValue("plugins", commands.concat(devCommands));
    } catch (e) {
      throw Error(`Something went wrong trying to load plugins list: ${e.message}`);
    }
    import_qcobjects2.logger.info("Dependencies loaded");
    process.once("SIGTERM", () => {
      console.log("\x1B[33m%s\x1B[0m", "Bye bye!");
      process.exit();
    });
  })();
}, "__load_default_settings__");
import_qcobjects2.global.__load_default_settings__ = __load_default_settings__;
import_qcobjects2.global.__load_default_settings__();
const cleanCache = /* @__PURE__ */ __name(() => {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
}, "cleanCache");
const __reset_settings__ = /* @__PURE__ */ __name(() => {
  cleanCache();
  import_qcobjects2.global.__load_default_settings__();
}, "__reset_settings__");
import_qcobjects2.global.__reset_settings__ = __reset_settings__;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  __get_version__,
  __get_version_string__
});
//# sourceMappingURL=defaultsettings.cjs.map
