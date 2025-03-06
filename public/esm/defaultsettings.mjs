var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "qcobjects";
import { readFileSync } from "node:fs";
import path from "node:path";
import fs from "node:fs";
import { CONFIG, global, logger, _Crypt, findPackageNodePath, Export } from "qcobjects";
const __get_version__ = /* @__PURE__ */ __name(() => {
  const absolutePath = path.resolve(__dirname, "./");
  const package_config_path = path.resolve(process.cwd(), "package.json");
  const qcobjects_pkg_config_path = `${findPackageNodePath("qcobjects/package.json")}/qcobjects/package.json`;
  const qcobjects_sdk_pkg_config_path = `${findPackageNodePath("qcobjects-sdk/package.json")}/qcobjects-sdk/package.json`;
  const readVersionFile = /* @__PURE__ */ __name((filePath) => {
    try {
      return fs.readFileSync(filePath).toString();
    } catch (error) {
      logger.debug(`Error reading file at ${filePath}:`, error.message);
      return JSON.stringify({ version: "0.0.0" });
    }
  }, "readVersionFile");
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
}, "__get_version__");
const __get_version_string__ = /* @__PURE__ */ __name(() => {
  const version = __get_version__();
  return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
}, "__get_version_string__");
Export(__get_version__);
Export(__get_version_string__);
const __load_default_settings__ = /* @__PURE__ */ __name(() => {
  CONFIG.set("documentRootFileIndex", "index.html");
  CONFIG.set("projectPath", `${process.cwd()}/`);
  CONFIG.set("useConfigService", false);
  CONFIG.set("documentRoot", "./");
  CONFIG.set("serverPortHTTP", 80);
  CONFIG.set("serverPortHTTPS", 443);
  CONFIG.set("private-key-pem", "localhost-privkey.pem");
  CONFIG.set("private-cert-pem", "localhost-cert.pem");
  CONFIG.set("allowHTTP1", true);
  CONFIG.set("useTemplate", false);
  CONFIG.set("domain", "localhost");
  const setDevMode = /* @__PURE__ */ __name((devmode) => {
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
    } else {
      logger.debugEnabled = false;
      logger.warnEnabled = false;
      logger.infoEnabled = false;
    }
  }, "setDevMode");
  try {
    const loadConfig = /* @__PURE__ */ __name(() => {
      const configPath = path.resolve(CONFIG.get("projectPath"), "config.json");
      const configText = readFileSync(configPath).toString();
      const configJson = JSON.parse(configText);
      return configJson;
    }, "loadConfig");
    var _config = loadConfig();
    logger.debug("Loading settings from your config.json");
    const _secretKey = Object.hasOwn(_config, "domain") ? _config["domain"] : "_secret_";
    if (Object.hasOwn(_config, "__encoded__")) {
      _config = JSON.parse(_Crypt.decrypt(_config.__encoded__, _secretKey));
    }
    for (var k in _config) {
      CONFIG.set(k, _config[k]);
    }
    setDevMode(CONFIG.get("devmode", ""));
    if (typeof CONFIG.get("backend") !== "undefined") {
      global.set("backendAvailable", true);
      if (typeof CONFIG.get("basePath") !== "undefined") {
        logger.debug(`Changing the current directory: ${process.cwd()}`);
        try {
          process.chdir(CONFIG.get("basePath"));
          logger.debug(`New directory: ${process.cwd()}`);
        } catch (err) {
          logger.warn(`It was impossible to change the current chdir: ${err}`);
        }
      }
    }
  } catch (e) {
    logger.debug(e);
    logger.debug("Something went wrong trying to load config.json file in your project");
  }
  (async function() {
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    const loadDefaultRoutes = /* @__PURE__ */ __name(async () => {
      return await new Promise((resolve, reject) => {
        const sdkPath = path.resolve(findPackageNodePath("qcobjects-sdk"), "qcobjects-sdk");
        const qcobjectsPath = path.resolve(findPackageNodePath("qcobjects"), "qcobjects");
        let backend = CONFIG.get("backend");
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
        resolve();
      });
    }, "loadDefaultRoutes");
    await loadDefaultRoutes();
  })().then(() => logger.info("Default routes loaded")).catch((e) => {
    logger.warn(`An error ocurred loading default settings: ${e}`);
  });
  (function() {
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    logger.debug(`CONFIG.projectPath is set to ${projectPath}`);
    const findPath = /* @__PURE__ */ __name((p) => {
      const packagePath = path.resolve(findPackageNodePath(p), p);
      return packagePath;
    }, "findPath");
    const getPackageJSON = /* @__PURE__ */ __name((p) => {
      let _json;
      try {
        const packagePath = findPath(p);
        if (typeof packagePath !== "undefined") {
          _json = JSON.parse(fs.readFileSync(path.resolve(`${packagePath}`, "./package.json")).toString());
        } else {
          _json = {};
        }
      } catch (e) {
        logger.debug(`It was impossible to get the package.json from ${p}: ${e}`);
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
          console.log("getting keywords for: ", p);
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
      const backend = CONFIG.get("backend", {});
      if (typeof value !== "undefined") {
        backend[name] = value;
      }
      CONFIG.set("backend", backend);
    }, "setBackendValue");
    const dependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve(`${projectPath}`, "./package.json")).toString()).dependencies);
          setBackendValue("dependencies", deps);
        }
        return deps;
      };
    })();
    const devDependencies = /* @__PURE__ */ (() => {
      let deps = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve(`${projectPath}`, "./package.json")).toString()).devDependencies);
          setBackendValue("devDependencies", deps);
        }
        return deps;
      };
    })();
    const loadLibs = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false)) {
        const libs = dependencies().filter((p) => hasKeyword(p, "qcobjects-lib"));
        setBackendValue("libs", libs);
        if (libs.length > 0) {
          logger.debug(`Plugin Libs found: ${libs.join(",")}`);
          _ret_ = Promise.all(libs.map(async (p) => {
            return await import(findPath(p));
          })).then(() => logger.info("Libs loaded"));
        } else {
          logger.debug("No Plugin Libs found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load libs, set autodiscover_libs to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadLibs");
    const loadHandlers = /* @__PURE__ */ __name(() => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_handlers", false)) {
        const handlers = dependencies().filter((p) => hasKeyword(p, "qcobjects-handler"));
        setBackendValue("handlers", handlers);
        if (handlers.length > 0) {
          logger.debug(`Plugin Handlers found: ${handlers.join(",")}`);
          _ret_ = Promise.all(handlers.map(async (p) => {
            return await import(findPath(p));
          })).then(() => logger.info("Handlers loaded"));
        } else {
          logger.debug("No Plugin Handlers found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadHandlers");
    const loadCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      logger.debug(`Looking for custom commands as dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = dependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("commands", commands);
        if (commands.length > 0) {
          logger.debug(`Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map(async (p) => {
            return await import(findPath(p));
          })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadCommands");
    const loadDevCommands = /* @__PURE__ */ __name(() => {
      let _ret_;
      logger.debug(`Looking for custom commands as dev dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = devDependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("devCommands", commands);
        if (commands.length > 0) {
          logger.debug(`Dev Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map(async (p) => {
            return await import(findPath(p));
          })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found in dev dependencies.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    }, "loadDevCommands");
    if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false) || CONFIG.get("autodiscover_handlers", false) || CONFIG.get("autodiscover_commands", false)) {
      logger.info("Auto discover is enabled");
    } else if (!CONFIG.get("autodiscover", false)) {
      logger.info("Auto discover is disabled");
      logger.debug("To load all dependencies, set autodiscover to true in your config.json");
    } else {
      logger.info("Auto discover is disabled");
    }
    try {
      logger.debug("Loading Libs...");
      loadLibs().catch((e) => {
        logger.warn(`An error ocurred loading libs: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load libs: ${e.message}`);
    }
    try {
      logger.debug("Loading Handlers...");
      loadHandlers().catch((e) => {
        logger.warn(`An error ocurred loading handlers: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load handler: ${e.message}`);
    }
    try {
      logger.debug("Loading Commands...");
      loadCommands().catch((e) => {
        logger.warn(`An error ocurred loading commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load commands: ${e.message}`);
    }
    try {
      logger.debug("Loading Dev Commands...");
      loadDevCommands().catch((e) => {
        logger.warn(`An error ocurred loading dev commands: ${e}`);
      });
    } catch (e) {
      throw Error(`Something went wrong trying to load Dev commands: ${e.message}`);
    }
    try {
      const commands = CONFIG.get("backend", { commands: [] }).commands || [];
      const devCommands = CONFIG.get("backend", { devCommands: [] }).devCommands || [];
      setBackendValue("plugins", commands.concat(devCommands));
    } catch (e) {
      throw Error(`Something went wrong trying to load plugins list: ${e.message}`);
    }
    logger.info("Dependencies loaded");
    process.once("SIGTERM", () => {
      console.log("\x1B[33m%s\x1B[0m", "Bye bye!");
      process.exit();
    });
  })();
}, "__load_default_settings__");
global.__load_default_settings__ = __load_default_settings__;
global.__load_default_settings__();
const cleanCache = /* @__PURE__ */ __name(() => {
  Object.keys(require.cache).forEach((key) => {
    delete require.cache[key];
  });
}, "cleanCache");
const __reset_settings__ = /* @__PURE__ */ __name(() => {
  cleanCache();
  global.__load_default_settings__();
}, "__reset_settings__");
global.__reset_settings__ = __reset_settings__;
export {
  __get_version__,
  __get_version_string__
};
//# sourceMappingURL=defaultsettings.mjs.map
