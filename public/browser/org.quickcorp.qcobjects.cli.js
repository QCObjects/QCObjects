"use strict";
var global = (() => {
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
  var org_quickcorp_qcobjects_cli_exports = {};
  __export(org_quickcorp_qcobjects_cli_exports, {
    EnterpriseCommands: () => EnterpriseCommands,
    QuickCorpServices: () => QuickCorpServices,
    SwitchCommander: () => SwitchCommander,
    customCommands: () => customCommands,
    getPluginCommandsList: () => getPluginCommandsList
  });
  var EnterpriseCommands = __toESM(require("./org.qcobjects.enterprise.commands"));
  var import_qcobjects = require("qcobjects");
  var import_org_qcobjects_enterprise = require("./org.qcobjects.enterprise.commands");
  var QuickCorpServices = __toESM(require("./org.quickcorp.qcobjects.api.client_services"));
  var import_org_quickcorp_qcobjects_api = require("./org.quickcorp.qcobjects.api.client_services");
  var customCommands = __toESM(require("./com.qcobjects.cli.commands"));
  var import_defaultsettings = require("./defaultsettings");
  var import_node_path = __toESM(require("node:path"));
  var import_node_fs = __toESM(require("node:fs"));
  var import_node_child_process = require("node:child_process");
  var import_commander = __toESM(require("commander"));
  const templatePwaPath = import_node_path.default.resolve(__dirname, "./templates/pwa/") + "/";
  const getPluginCommandsList = /* @__PURE__ */ __name(() => {
    return global.ClassesList.filter((c) => c.packageName.startsWith("com.qcobjects.cli.commands.")).filter((p) => p.classFactory.name.endsWith("CommandHandler"));
  }, "getPluginCommandsList");
  class SwitchCommander extends import_qcobjects.InheritClass {
    static {
      __name(this, "SwitchCommander");
    }
    choiceOption = {
      generateSw: /* @__PURE__ */ __name((_appName, options) => {
        const dirPrefix = options.dir;
        const switchCommander = this;
        const appName = typeof _appName === "undefined" || _appName === true ? "MyAppName" : _appName;
        switchCommander.generateServiceWorker(appName, dirPrefix).catch((e) => {
          import_qcobjects.logger.warn(`An error ocurred while creating service worker: ${e}`);
        });
      }, "generateSw"),
      create: /* @__PURE__ */ __name((_appName, options) => {
        const version = (0, import_defaultsettings.__get_version__)();
        const switchCommander = this;
        const appName = typeof _appName === "undefined" || _appName === true ? "MyAppName" : _appName;
        let appTemplateName;
        if (options.createAmp) {
          appTemplateName = "qcobjects-ecommerce-amp";
        } else if (options.createPwa) {
          appTemplateName = "qcobjectsnewapp";
        } else if (options.createPhp) {
          appTemplateName = "qcobjectsnewphp";
        } else if (options.createCustom) {
          appTemplateName = options.createCustom;
        } else {
          appTemplateName = "qcobjectsnewapp";
        }
        import_qcobjects.CONFIG.set("qcobjectsnewapp_path", import_qcobjects.CONFIG.get("node_modules_path") + "/" + appTemplateName);
        const _package_json_template_fname = import_node_path.default.resolve(import_qcobjects.CONFIG.get("qcobjectsnewapp_path", "qcobjectsnewapp"), "./package.json");
        const createAppCommand = "npm init -y";
        const _package_json_file = import_node_path.default.resolve(import_qcobjects.CONFIG.get("projectPath"), "./package.json");
        import_qcobjects.logger.debug("_package_json_file: " + _package_json_file);
        import_qcobjects.logger.debug(createAppCommand);
        (0, import_node_child_process.exec)(createAppCommand, (err) => {
          if (err) {
            throw Error(err.message);
            process.exit(1);
            return;
          }
          (0, import_node_child_process.exec)(`npm i --save-dev ${appTemplateName}`, () => {
            (async () => {
              const _package_json_template_file = await import(_package_json_template_fname);
              _package_json_template_file.name = appName;
              _package_json_template_file.version = "1.0.0";
              _package_json_template_file.repository = {};
              import_node_fs.default.writeFileSync(_package_json_file, JSON.stringify(_package_json_template_file, null, 4));
              import_qcobjects.logger.info("Good! App Templates was installed!");
              console.log(`Starting to copy files from app template ${appTemplateName} to your project...`);
              switchCommander.copyTemplate(import_node_path.default.resolve((0, import_qcobjects.findPackageNodePath)(appTemplateName), appTemplateName), import_node_path.default.resolve(import_qcobjects.CONFIG.get("projectPath"), "./")).then(() => {
                (0, import_node_child_process.exec)("npm uninstall " + appTemplateName + " --save && npm cache verify", (err2) => {
                  if (err2) {
                    throw Error(err2.message);
                    process.exit(1);
                    return;
                  }
                  (0, import_node_child_process.execSync)("npm install --save-dev qcobjects-cli ");
                });
                (0, import_node_child_process.exec)("npm cache verify && npm i ", (err2) => {
                  if (err2) {
                    throw Error(err2.message);
                    process.exit(1);
                    return;
                  }
                  import_qcobjects.logger.info("Good! Your application is done. You can play with QCObjects now!");
                  import_qcobjects.logger.info("I will create the SSL certificates now. It may take some time...");
                  (0, import_node_child_process.exec)("qcobjects-createcert", () => {
                    import_qcobjects.logger.info("Test certificates generated");
                    const githubService = (0, import_qcobjects.New)(import_qcobjects.Service);
                    githubService.url = "https://raw.githubusercontent.com/QuickCorp/QCObjects/main/.gitignore";
                    githubService.headers = {
                      Accept: "application/vnd.github+json",
                      "X-GitHub-Api-Version": "2022-11-28",
                      "User-Agent": "qcobjects-cli"
                    };
                    githubService.done = () => {
                    };
                    (0, import_qcobjects.serviceLoader)(githubService).then(({ service }) => {
                      import_node_fs.default.writeFileSync(import_node_path.default.resolve(import_qcobjects.CONFIG.get("projectPath"), "./.gitignore"), service.template);
                      try {
                        (0, import_node_child_process.execSync)("git init");
                        import_qcobjects.logger.debug("Git initialized.");
                      } catch (e) {
                        import_qcobjects.logger.debug("Could not initialize git.");
                      }
                    });
                  }).stdout?.on("data", function(data) {
                    console.log(data);
                  });
                }).stdout?.on("data", function(data) {
                  console.log(data);
                });
              }).catch((e) => {
                console.log(e);
              });
            })().catch((e) => console.error(e));
          }).stdout?.on("data", function(data) {
            console.log(data);
          });
        }).stdout?.on("data", function() {
          console.log("App generation started...");
        });
      }, "create"),
      publish(_appName, _options) {
        import_qcobjects.logger.debug("publish is not yet implemented");
      },
      upgradeToEnterprise(_appName, _options) {
        const switchCommander = this;
        import_org_qcobjects_enterprise.QCObjectsEnterprise.upgrade(switchCommander);
      }
    };
    program;
    constructor() {
      super();
      this.program = import_commander.default;
    }
    shellCommands(_shell_commands) {
      return new Promise(function(resolve_all, reject_all) {
        var _promises_set = _shell_commands.map(
          function(shell_command) {
            return new Promise(
              function(resolve, reject) {
                import_qcobjects.logger.debug(shell_command);
                (0, import_node_child_process.exec)(shell_command, (err, stdout, stderr) => {
                  if (!err) {
                    resolve(stdout);
                  } else {
                    import_qcobjects.logger.debug(`[FAILED]: ${shell_command}`);
                    import_qcobjects.logger.debug(`${stderr}`);
                    reject(stderr);
                  }
                }).stdout?.on("data", function(data) {
                  import_qcobjects.logger.info(data);
                });
              }
            ).catch((e) => reject_all(e));
          }
        );
      }).catch((e) => console.log(e));
    }
    fileListRecursive(dir) {
      var instance = this;
      return import_node_fs.default.statSync(dir).isDirectory() ? Array.prototype.concat(...import_node_fs.default.readdirSync(dir).map((f) => instance.fileListRecursive(import_node_path.default.join(dir, f)))).filter((f) => {
        return !f.startsWith(".git") && f.lastIndexOf(".DS_Store") == -1;
      }) : dir;
    }
    register(email, phonenumber) {
      return new Promise(function(resolve, reject) {
        import_qcobjects.logger.info("I'm going to register your profile on the cloud...");
        const cloudClient = (0, import_qcobjects.New)(import_org_quickcorp_qcobjects_api.QuickCorpCloud, {
          apiMethod: "register",
          data: { email, phonenumber }
        });
        try {
        } catch (e) {
          console.log("\u{1F926} Something went wrong \u{1F926} when trying to register you in the cloud");
          reject(e);
        }
      });
    }
    generateServiceWorker(appName, dirPrefix = "./") {
      const writeContent = /* @__PURE__ */ __name((component) => {
        const parsedText = component.parsedAssignmentText;
        import_qcobjects.logger.debug("Starting to write the sw file...");
        import_node_fs.default.writeFile(`${dirPrefix}/sw.js`, parsedText, (err) => {
          if (err) {
            throw Error(err);
          }
          import_qcobjects.logger.info("Service Worker Generated");
          console.log("");
          console.log("Now simply put:");
          console.log("CONFIG.set('serviceWorkerURI','/sw.js');");
          console.log(" In your init.js file ");
          console.log("");
          console.log("To start your app in a local server ");
          console.log("Execute the command: ");
          console.log("> qcobjects launch <appname>");
          console.log("");
        });
      }, "writeContent");
      class ServiceWorkerComponent extends import_qcobjects.Component {
        static {
          __name(this, "ServiceWorkerComponent");
        }
        cached = false;
        templateURI = "sw.js";
        basePath = templatePwaPath;
        name = "sw";
        tplsource = "default";
        template = "";
        data;
        constructor({ name, data }) {
          super({ name, data });
          this.data = data;
        }
        done({ request, component }) {
          super.done({ request, component });
          writeContent(component);
        }
      }
      return new Promise(() => {
        var filelist = ["/"].concat(this.fileListRecursive(`${dirPrefix}`));
        if (typeof dirPrefix !== "undefined" && dirPrefix !== "./" && dirPrefix !== ".") {
          filelist = filelist.map((f) => f.replace(new RegExp(`${dirPrefix}/`), ""));
        }
        filelist = filelist.filter(function(fl) {
          return fl !== "sw.js" && !fl.startsWith("node_modules/");
        });
        filelist = filelist.filter((fname) => !fname.endsWith(".pem"));
        filelist = filelist.filter((fname) => !fname.endsWith(".sh"));
        filelist = filelist.filter((fname) => !new RegExp("^package(.*).json$").test(fname));
        filelist = filelist.filter((fname) => !fname.startsWith("."));
        var fileListString = '\n	"' + filelist.join('",\n	"') + '"';
        const component = new ServiceWorkerComponent({
          name: "sw",
          data: {
            appName,
            appVersion: "1.0.0",
            filelist: fileListString
          }
        });
        setTimeout(() => {
          component.done({ request: null, component });
        }, 1e3);
      });
    }
    copyTemplate(source, dest) {
      return new Promise((resolve, reject) => {
        const copyDir = /* @__PURE__ */ __name((source2, dest2, exclude) => {
          source2 = import_node_path.default.resolve(source2);
          dest2 = import_node_path.default.resolve(dest2);
          const dname = import_node_path.default.basename(source2);
          const dirExcluded = exclude.includes(dname);
          const isDir = /* @__PURE__ */ __name((d) => {
            return import_node_fs.default.existsSync(d) && import_node_fs.default.statSync(d).isDirectory() ? true : false;
          }, "isDir");
          const isFile = /* @__PURE__ */ __name((d) => {
            return import_node_fs.default.existsSync(d) && import_node_fs.default.statSync(d).isFile() ? true : false;
          }, "isFile");
          if (isDir(source2) && !dirExcluded) {
            import_node_fs.default.mkdirSync(dest2, { recursive: true });
            const paths = import_node_fs.default.readdirSync(source2, { withFileTypes: true });
            const dirs = paths.filter((d) => d.isDirectory());
            const files = paths.filter((f) => f.isFile());
            ((paths2, dirs2, files2, exclude2) => {
              files2.map((f) => {
                const sourceFile = import_node_path.default.resolve(source2, f.name);
                const destFile = import_node_path.default.resolve(dest2, f.name);
                const fileExcluded = exclude2.includes(f.name);
                if (isFile(sourceFile) && !fileExcluded) {
                  import_qcobjects.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...`);
                  import_node_fs.default.copyFileSync(sourceFile, destFile);
                  import_qcobjects.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...DONE!`);
                }
              });
              dirs2.map((d) => {
                const sourceDir = import_node_path.default.resolve(source2, d.name);
                const destDir = import_node_path.default.resolve(dest2, d.name);
                copyDir(sourceDir, destDir, exclude2);
              });
            })(paths, dirs, files, exclude);
          }
        }, "copyDir");
        try {
          const exclude = [
            "package.json",
            "node_modules",
            ".DS_Store"
          ];
          import_qcobjects.logger.info(`[create] Copying files from ${source} to ${dest} excluding ${exclude.join(",")}...`);
          copyDir(source, dest, typeof exclude !== "undefined" ? exclude : []);
          resolve();
        } catch (e) {
          import_qcobjects.logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
          reject(e);
        }
      });
    }
    initCommand() {
      const switchCommander = this;
      if (process.argv.length > 1) {
        import_qcobjects.logger.debug("Installing Commands...");
        switchCommander.program.version((0, import_defaultsettings.__get_version_string__)());
        switchCommander.program.command("create <appname>").description("Creates an app with <appname>").option("--pwa, --create-pwa", "Creates the progressive web app assets").option("--amp, --create-amp", "Creates the accelerated mobile pages assets").option("--php, --create-php", "Creates the PWA PHP assets").option("--custom, --create-custom <templateappname>", "Creates an App from any NPM package template").option("--tests, --create-tests", "Creates the test suite").action(function(args, options) {
          switchCommander.choiceOption.create.call(switchCommander, args, options);
        });
        try {
          import_qcobjects.logger.debug("Loading Plugin Commands...");
          const importPluginCommands = /* @__PURE__ */ __name(function(switchCommander2) {
            return getPluginCommandsList().map((pluginCommand) => {
              try {
                import_qcobjects.logger.debug(`Loading plugin ${pluginCommand.packageName}`);
                const classFactory = pluginCommand.classFactory;
                pluginCommand.plugin = new classFactory({ switchCommander: switchCommander2 });
              } catch (e) {
                throw Error(`Something went wrong loading ${pluginCommand.packageName}`);
              }
              return pluginCommand;
            });
          }, "importPluginCommands");
          importPluginCommands(switchCommander);
        } catch (e) {
          throw Error(`Something went wrong loading plugins: ${e.message}`);
        }
        switchCommander.program.command("publish <appname>").description("Publishes an app with <appname>").option("--pwa, --create-pwa", "Publishes the progressive web app assets").option("--amp, --create-amp", "Publishes the accelerated mobile pages assets").option("--php, --create-php", "Creates the PWA PHP assets").option("--custom, --create-custom", "Creates an App from any NPM package template").option("--tests, --create-tests", "Publishes the test suite").action((args, options) => {
          switchCommander.choiceOption.publish.bind(switchCommander)(args, options);
        });
        switchCommander.program.command("upgrade-to-enterprise").description("Upgrades to QCObjects Enterprise Edition").action(function(args, options) {
          switchCommander.choiceOption.upgradeToEnterprise.call(switchCommander, args, options);
        });
        switchCommander.program.command("generate-sw <appname>").option("-d, --dir <dirPrefix> ", "creates the service worker in a specific dir <dirPrefix>").description("Generates the service worker <appname>").action(function(args, options) {
          switchCommander.choiceOption.generateSw.call(switchCommander, args, options);
        });
        switchCommander.program.command("launch <appname>").description("Launches the application").action(function() {
          import_qcobjects.logger.info("Launching...");
          setTimeout(() => {
            import_qcobjects.logger.info("Go to the browser and open https://localhost ");
            import_qcobjects.logger.info("Press Ctrl-C to stop serving ");
            (0, import_node_child_process.exec)("qcobjects-server", () => {
            }).stdout?.on("data", function(data) {
              console.log(data);
            });
          }, 5e3);
        });
        switchCommander.program.on("--help", function() {
          console.log("");
          console.log("Use:");
          console.log("  $ qcobjects-cli [command] --help");
          console.log("  For detailed information of a command ");
          console.log("");
          process.exit(0);
        });
        switchCommander.program.on("command:*", function() {
          console.error("Invalid command: %s\nSee --help for a list of available commands.", switchCommander.program.args.join(" "));
          process.exit(1);
        });
        switchCommander.program.parse(process.argv);
      } else {
        console.log("");
        console.log("Use:");
        console.log("  $ qcobjects-cli [command] --help");
        console.log("  For detailed information of a command ");
        console.log("");
        process.exit(0);
      }
    }
  }
  (async () => {
    "use strict";
    await import("qcobjects");
    const { CONFIG: CONFIG2, findPackageNodePath: findPackageNodePath2, logger: logger2, Package, InheritClass: InheritClass2, New: New2, serviceLoader: serviceLoader2, global: global2, Service: Service2, Component: Component2 } = await import("qcobjects");
    CONFIG2.set("node_modules_path", "./node_modules/");
    CONFIG2.set("qcobjectsnewapp_path", CONFIG2.get("node_modules_path") + "/qcobjectsnewapp");
    Package("org.quickcorp.qcobjects.cli", [
      SwitchCommander
    ]);
    global2.SwitchCommander = SwitchCommander;
  })().catch((e) => console.error(e));
  return __toCommonJS(org_quickcorp_qcobjects_cli_exports);
})();
//# sourceMappingURL=org.quickcorp.qcobjects.cli.js.map
