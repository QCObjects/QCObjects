var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "qcobjects";
import * as EnterpriseCommands from "./enterprise-commands";
import { Component, CONFIG, findPackageNodePath, InheritClass, logger, New, Service, serviceLoader, global, Package, Export } from "qcobjects";
import { QCObjectsEnterprise } from "./enterprise-commands";
import * as QuickCorpServices from "./api-client_services";
import { QuickCorpCloud } from "./api-client_services";
import * as customCommands from "./cli-commands";
import { __get_version__, __get_version_string__ } from "./defaultsettings";
import path from "node:path";
import fs from "node:fs";
import { exec, execSync } from "node:child_process";
import commander from "commander";
const templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
const getPluginCommandsList = /* @__PURE__ */ __name(() => {
  return global.ClassesList?.filter((c) => c.packageName.startsWith("com.qcobjects.cli.commands.")).filter((p) => p.classFactory.name.endsWith("CommandHandler"));
}, "getPluginCommandsList");
class SwitchCommander extends InheritClass {
  static {
    __name(this, "SwitchCommander");
  }
  choiceOption = {
    generateSw: /* @__PURE__ */ __name((_appName, options) => {
      const dirPrefix = options.dir;
      const switchCommander = this;
      const appName = typeof _appName === "undefined" || _appName === true ? "MyAppName" : _appName;
      switchCommander.generateServiceWorker(appName, dirPrefix).catch((e) => {
        logger.warn(`An error ocurred while creating service worker: ${e}`);
      });
    }, "generateSw"),
    create: /* @__PURE__ */ __name((_appName, options) => {
      const version = __get_version__();
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
      CONFIG.set("qcobjectsnewapp_path", CONFIG.get("node_modules_path") + "/" + appTemplateName);
      const _package_json_template_fname = path.resolve(CONFIG.get("qcobjectsnewapp_path", "qcobjectsnewapp"), "./package.json");
      const createAppCommand = "npm init -y";
      const _package_json_file = path.resolve(CONFIG.get("projectPath"), "./package.json");
      logger.debug("_package_json_file: " + _package_json_file);
      logger.debug(createAppCommand);
      exec(createAppCommand, (err) => {
        if (err) {
          throw Error(err.message);
          process.exit(1);
          return;
        }
        exec(`npm i --save-dev ${appTemplateName}`, () => {
          (async () => {
            const _package_json_template_file = JSON.parse(fs.readFileSync(_package_json_template_fname, "utf8"));
            _package_json_template_file.name = appName;
            _package_json_template_file.version = "1.0.0";
            _package_json_template_file.repository = {};
            fs.writeFileSync(_package_json_file, JSON.stringify(_package_json_template_file, null, 4));
            logger.info("Good! App Templates was installed!");
            console.log(`Starting to copy files from app template ${appTemplateName} to your project...`);
            switchCommander.copyTemplate(path.resolve(findPackageNodePath(appTemplateName), appTemplateName), path.resolve(CONFIG.get("projectPath"), "./")).then(() => {
              exec("npm uninstall " + appTemplateName + " --save && npm cache verify", (err2) => {
                if (err2) {
                  throw Error(err2.message);
                  process.exit(1);
                  return;
                }
                execSync("npm install --save-dev qcobjects-cli ");
              });
              exec("npm cache verify && npm i ", (err2) => {
                if (err2) {
                  throw Error(err2.message);
                  process.exit(1);
                  return;
                }
                logger.info("Good! Your application is done. You can play with QCObjects now!");
                logger.info("I will create the SSL certificates now. It may take some time...");
                exec("qcobjects-createcert", () => {
                  logger.info("Test certificates generated");
                  const githubService = New(Service);
                  githubService.url = "https://raw.githubusercontent.com/QuickCorp/QCObjects/main/.gitignore";
                  githubService.headers = {
                    Accept: "application/vnd.github+json",
                    "X-GitHub-Api-Version": "2022-11-28",
                    "User-Agent": "qcobjects-cli"
                  };
                  githubService.done = () => {
                  };
                  serviceLoader(githubService).then(({ service }) => {
                    fs.writeFileSync(path.resolve(CONFIG.get("projectPath"), "./.gitignore"), service.template);
                    try {
                      execSync("git init");
                      logger.debug("Git initialized.");
                    } catch (e) {
                      logger.debug("Could not initialize git.");
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
      logger.debug("publish is not yet implemented");
    },
    upgradeToEnterprise(_appName, _options) {
      const switchCommander = this;
      void QCObjectsEnterprise.upgrade(switchCommander);
    }
  };
  program;
  constructor() {
    super();
    this.program = commander;
  }
  async shellCommands(_shell_commands) {
    const results = [];
    for (const shell_command of _shell_commands) {
      const result = await new Promise((resolve, reject) => {
        logger.debug(shell_command);
        const child = exec(shell_command, (err, stdout, stderr) => {
          if (!err) {
            resolve(stdout);
          } else {
            logger.debug(`[FAILED]: ${shell_command}`);
            logger.debug(`${stderr}`);
            reject(stderr);
          }
        });
        child.stdout?.on("data", function(data) {
          logger.info(data);
        });
      });
      results.push(result);
    }
    return results;
  }
  fileListRecursive(dir) {
    var instance = this;
    return fs.statSync(dir).isDirectory() ? Array.prototype.concat(...fs.readdirSync(dir).map((f) => instance.fileListRecursive(path.join(dir, f)))).filter((f) => {
      return !f.startsWith(".git") && f.lastIndexOf(".DS_Store") == -1;
    }) : dir;
  }
  register(email, phonenumber) {
    return new Promise(function(resolve, reject) {
      logger.info("I'm going to register your profile on the cloud...");
      const cloudClient = New(QuickCorpCloud, {
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
      logger.debug("Starting to write the sw file...");
      fs.writeFile(`${dirPrefix}/sw.js`, parsedText, (err) => {
        if (err) {
          throw Error(err);
        }
        logger.info("Service Worker Generated");
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
    class ServiceWorkerComponent extends Component {
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
        source2 = path.resolve(source2);
        dest2 = path.resolve(dest2);
        const dname = path.basename(source2);
        const dirExcluded = exclude.includes(dname);
        const isDir = /* @__PURE__ */ __name((d) => {
          return fs.existsSync(d) && fs.statSync(d).isDirectory() ? true : false;
        }, "isDir");
        const isFile = /* @__PURE__ */ __name((d) => {
          return fs.existsSync(d) && fs.statSync(d).isFile() ? true : false;
        }, "isFile");
        if (isDir(source2) && !dirExcluded) {
          fs.mkdirSync(dest2, { recursive: true });
          const paths = fs.readdirSync(source2, { withFileTypes: true });
          const dirs = paths.filter((d) => d.isDirectory());
          const files = paths.filter((f) => f.isFile());
          ((paths2, dirs2, files2, exclude2) => {
            files2.map((f) => {
              const sourceFile = path.resolve(source2, f.name);
              const destFile = path.resolve(dest2, f.name);
              const fileExcluded = exclude2.includes(f.name);
              if (isFile(sourceFile) && !fileExcluded) {
                logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...`);
                fs.copyFileSync(sourceFile, destFile);
                logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2.join(",")}...DONE!`);
              }
            });
            dirs2.map((d) => {
              const sourceDir = path.resolve(source2, d.name);
              const destDir = path.resolve(dest2, d.name);
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
        logger.info(`[create] Copying files from ${source} to ${dest} excluding ${exclude.join(",")}...`);
        copyDir(source, dest, typeof exclude !== "undefined" ? exclude : []);
        resolve();
      } catch (e) {
        logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
        reject(e);
      }
    });
  }
  initCommand() {
    const switchCommander = this;
    if (process.argv.length > 1) {
      logger.debug("Installing Commands...");
      switchCommander.program.version(__get_version_string__());
      switchCommander.program.command("create <appname>").description("Creates an app with <appname>").option("--pwa, --create-pwa", "Creates the progressive web app assets").option("--amp, --create-amp", "Creates the accelerated mobile pages assets").option("--php, --create-php", "Creates the PWA PHP assets").option("--custom, --create-custom <templateappname>", "Creates an App from any NPM package template").option("--tests, --create-tests", "Creates the test suite").action(function(args, options) {
        switchCommander.choiceOption.create.call(switchCommander, args, options);
      });
      try {
        logger.debug("Loading Plugin Commands...");
        const importPluginCommands = /* @__PURE__ */ __name((switchCommander2) => {
          return getPluginCommandsList()?.map((pluginCommand) => {
            try {
              logger.debug(`Loading plugin ${pluginCommand.packageName}`);
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
        logger.info("Launching...");
        setTimeout(() => {
          logger.info("Go to the browser and open https://localhost ");
          logger.info("Press Ctrl-C to stop serving ");
          exec("qcobjects-server", () => {
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
CONFIG.set("node_modules_path", "./node_modules/");
CONFIG.set("qcobjectsnewapp_path", CONFIG.get("node_modules_path") + "/qcobjectsnewapp");
Package("org.quickcorp.qcobjects.cli", [
  SwitchCommander
]);
Export(SwitchCommander);
export {
  EnterpriseCommands,
  QuickCorpServices,
  SwitchCommander,
  customCommands,
  getPluginCommandsList
};
//# sourceMappingURL=cli-main.mjs.map
