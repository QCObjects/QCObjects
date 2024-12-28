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

import "qcobjects";
import {readFileSync} from "node:fs";
import path from "node:path";
import fs from "node:fs";
import { CONFIG, global, logger, _Crypt, findPackageNodePath, Export, _DataStringify } from "qcobjects";

export const __get_version__ = () => {

  const absolutePath = path.resolve(__dirname, "./");
  const package_config_path = path.resolve(process.cwd(), "package.json");
  const qcobjects_pkg_config_path = `${findPackageNodePath("qcobjects/package.json")}/qcobjects/package.json`;
  const qcobjects_sdk_pkg_config_path = `${findPackageNodePath("qcobjects-sdk/package.json")}/qcobjects-sdk/package.json`;

  const package_config_text = readFileSync(package_config_path).toString();
  const qcobjects_pkg_config_text = readFileSync(qcobjects_pkg_config_path).toString();
  const qcobjects_sdk_pkg_config_text = readFileSync(qcobjects_sdk_pkg_config_path).toString();
  const package_config = JSON.parse(package_config_text);
  const qcobjects_pkg_config = JSON.parse(qcobjects_pkg_config_text);
  const qcobjects_sdk_pkg_config = JSON.parse(qcobjects_sdk_pkg_config_text);

  return {
    "qcobjects": qcobjects_pkg_config.version,
    "sdk": qcobjects_sdk_pkg_config.version,
    "cli": package_config.version
  };
};

export const __get_version_string__ = () => {
  const version = __get_version__();
  return "QCObjects: v" + version.qcobjects + ", SDK: v" + version.sdk + ", CLI: v" + version.cli;
};

Export(__get_version__);
Export(__get_version_string__);


const __load_default_settings__ = () => {
  CONFIG.set("documentRootFileIndex", "index.html");
  CONFIG.set("projectPath", `${process.cwd()}/`);
  CONFIG.set("useConfigService", false); // this is only true useful for client web side
  CONFIG.set("documentRoot", "./");
  CONFIG.set("serverPortHTTP", 80);
  CONFIG.set("serverPortHTTPS", 443);
  CONFIG.set("private-key-pem", "localhost-privkey.pem");
  CONFIG.set("private-cert-pem", "localhost-cert.pem");
  CONFIG.set("allowHTTP1", true);
  CONFIG.set("useTemplate", false);
  CONFIG.set("domain", "localhost");



  const setDevMode = (devmode: string) => {
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

  };

  try {

    const loadConfig = () => {
      const configPath = path.resolve(CONFIG.get("projectPath"),"config.json");
      const configText = readFileSync(configPath).toString();
      const configJson = JSON.parse(configText);
      return configJson;
    };

    var _config = loadConfig();
    logger.debug("Loading settings from your config.json");

    const _secretKey = (Object.hasOwn(_config, "domain")) ? (_config["domain"]) : ("_secret_");

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
        } catch (err: any) {
          logger.warn(`It was impossible to change the current chdir: ${err}`);
        }
      }
    }
  } catch (e:any) {
    logger.debug(e);
    logger.debug("Something went wrong trying to load config.json file in your project");
  }

  (async function () {
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    const loadDefaultRoutes = async () => {
      return await new Promise<void>((resolve, reject) => {
        const sdkPath = path.resolve(findPackageNodePath("qcobjects-sdk"), "qcobjects-sdk");
        const qcobjectsPath = path.resolve(findPackageNodePath("qcobjects"), "qcobjects");
        let backend = CONFIG.get("backend");
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
        resolve();
      });
    };
    await loadDefaultRoutes();
  })()
    .then(() => logger.info("Default routes loaded"))
    .catch((e: any) => { logger.warn(`An error ocurred loading default settings: ${e}`); });

  (function () {
    /* Auto Discover dependencies (lib, handlers, commands) */
    const projectPath = CONFIG.get("projectPath", `${process.cwd()}/`);
    logger.debug(`CONFIG.projectPath is set to ${projectPath}`);
    const findPath = (p: string) => {
      const packagePath = path.resolve(findPackageNodePath(p), p);
      return packagePath;
    };

    const getPackageJSON = (p: string) => {
      let _json;
      try {
        const packagePath = findPath(p);
        if (typeof packagePath !== "undefined") {
          _json = JSON.parse(fs.readFileSync(path.resolve(`${packagePath}`, "./package.json")).toString());
        } else {
          _json = {};
        }
      } catch (e: any) {
        logger.debug(`It was impossible to get the package.json from ${p}: ${e}`);
        _json = {};
      }
      return _json;
    };

    const hasKeyword = (() => {
      let keywords: { [key: string]: string[] } = {};
      return (p: string, keyword: string) => {
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

    const setBackendValue = (name: string, value: any) => {
      const backend = CONFIG.get("backend", {});
      if (typeof value !== "undefined") {
        backend[name] = value;
      }
      CONFIG.set("backend", backend);
    };

    const dependencies = (() => {
      let deps: string[] = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve(`${projectPath}`, "./package.json")).toString()).dependencies);
          setBackendValue("dependencies", deps);
        }
        return deps;
      };
    })();

    const devDependencies = (() => {
      let deps: string[] = [];
      return () => {
        if (typeof deps === "undefined") {
          deps = Object.keys(JSON.parse(fs.readFileSync(path.resolve(`${projectPath}`, "./package.json")).toString()).devDependencies);
          setBackendValue("devDependencies", deps);
        }
        return deps;
      };
    })();

    const loadLibs = () => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_libs", false)) {
        const libs = dependencies().filter((p) => hasKeyword(p, "qcobjects-lib"));
        setBackendValue("libs", libs);
        if (libs.length > 0) {
          logger.debug(`Plugin Libs found: ${libs.join(",")}`);
          _ret_ = Promise.all(libs.map((p) => { return require(findPath(p)); })).then(() => logger.info("Libs loaded"));
        } else {
          logger.debug("No Plugin Libs found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load libs, set autodiscover_libs to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    };
    const loadHandlers = () => {
      let _ret_;
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_handlers", false)) {
        const handlers = dependencies().filter((p) => hasKeyword(p, "qcobjects-handler"));
        setBackendValue("handlers", handlers);
        if (handlers.length > 0) {
          logger.debug(`Plugin Handlers found: ${handlers.join(",")}`);
          _ret_ = Promise.all(handlers.map((p) => { return require(findPath(p)); })).then(() => logger.info("Handlers loaded"));
        } else {
          logger.debug("No Plugin Handlers found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load handlers, set autodiscover_handlers to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    };
    const loadCommands = () => {
      let _ret_;
      logger.debug(`Looking for custom commands as dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = dependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("commands", commands);
        if (commands.length > 0) {
          logger.debug(`Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map((p) => { return require(findPath(p)); })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    };
    const loadDevCommands = () => {
      let _ret_;
      logger.debug(`Looking for custom commands as dev dependencies in: ${projectPath}/package.json`);
      if (CONFIG.get("autodiscover", false) || CONFIG.get("autodiscover_commands", false)) {
        const commands = devDependencies().filter((p) => hasKeyword(p, "qcobjects-command"));
        setBackendValue("devCommands", commands);
        if (commands.length > 0) {
          logger.debug(`Dev Plugin Commands found: ${commands.join(",")}`);
          _ret_ = Promise.all(commands.map((p) => { return require(findPath(p)); })).then(() => logger.info("Commands loaded"));
        } else {
          logger.debug("No Plugin Commands found in dev dependencies.");
          _ret_ = Promise.resolve();
        }
      } else {
        logger.debug("To load commands, set autodiscover_commands to true in your config.json");
        _ret_ = Promise.resolve();
      }
      return _ret_;
    };

    if (CONFIG.get("autodiscover", false) ||
      CONFIG.get("autodiscover_libs", false) ||
      CONFIG.get("autodiscover_handlers", false) ||
      CONFIG.get("autodiscover_commands", false)
    ) {
      logger.info("Auto discover is enabled");
    } else if (!CONFIG.get("autodiscover", false)) {
      logger.info("Auto discover is disabled");
      logger.debug("To load all dependencies, set autodiscover to true in your config.json");
    } else {
      logger.info("Auto discover is disabled");
    }

    try {
      logger.debug("Loading Libs...");
      loadLibs().catch((e: any) => {
        logger.warn(`An error ocurred loading libs: ${e}`);
      });
    } catch (e: any) {
      throw Error(`Something went wrong trying to load libs: ${e.message}`);
    }
    try {
      logger.debug("Loading Handlers...");
      loadHandlers().catch((e: any) => {
        logger.warn(`An error ocurred loading handlers: ${e}`);
      });
    } catch (e: any) {
      throw Error(`Something went wrong trying to load handler: ${e.message}`);
    }
    try {
      logger.debug("Loading Commands...");
      loadCommands().catch((e: any) => {
        logger.warn(`An error ocurred loading commands: ${e}`);
      });
    } catch (e: any) {
      throw Error(`Something went wrong trying to load commands: ${e.message}`);
    }
    try {
      logger.debug("Loading Dev Commands...");
      loadDevCommands().catch((e: any) => {
        logger.warn(`An error ocurred loading dev commands: ${e}`);
      });
    } catch (e: any) {
      throw Error(`Something went wrong trying to load Dev commands: ${e.message}`);
    }

    try {
      const commands = CONFIG.get("backend", { commands: [] }).commands || [];
      const devCommands = CONFIG.get("backend", { devCommands: [] }).devCommands || [];
      setBackendValue("plugins", commands.concat(devCommands));
    } catch (e: any) {
      throw Error(`Something went wrong trying to load plugins list: ${e.message}`);
    }

    logger.info("Dependencies loaded");

    process.once("SIGTERM", () => {
      console.log("\x1b[33m%s\x1b[0m", "Bye bye!");
      process.exit();
    });
  })();
};

(global as any).__load_default_settings__ = __load_default_settings__;
(global as any).__load_default_settings__();

const cleanCache = () => {
  Object.keys(require.cache).forEach((key) => { delete require.cache[key]; });
};

const __reset_settings__ = () => {
  cleanCache();
  (global as any).__load_default_settings__();
};

(global as any).__reset_settings__ = __reset_settings__;

