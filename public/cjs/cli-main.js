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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SwitchCommander = exports.getPluginCommandsList = exports.customCommands = exports.QuickCorpServices = exports.EnterpriseCommands = void 0;
require("qcobjects");
exports.EnterpriseCommands = __importStar(require("./enterprise-commands"));
const qcobjects_1 = require("qcobjects");
const enterprise_commands_1 = require("./enterprise-commands");
exports.QuickCorpServices = __importStar(require("./api-client_services"));
const api_client_services_1 = require("./api-client_services");
exports.customCommands = __importStar(require("./cli-commands"));
const defaultsettings_1 = require("./defaultsettings");
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_child_process_1 = require("node:child_process");
const commander_1 = __importDefault(require("commander"));
const templatePwaPath = node_path_1.default.resolve(__dirname, "./templates/pwa/") + "/";
const getPluginCommandsList = () => {
    return qcobjects_1.global.ClassesList?.filter((c) => c.packageName.startsWith("com.qcobjects.cli.commands."))
        .filter((p) => p.classFactory.name.endsWith("CommandHandler"));
};
exports.getPluginCommandsList = getPluginCommandsList;
class SwitchCommander extends qcobjects_1.InheritClass {
    choiceOption = {
        generateSw: (_appName, options) => {
            const dirPrefix = options.dir;
            const switchCommander = this;
            const appName = (typeof _appName === "undefined" || _appName === true) ? ("MyAppName") : (_appName);
            switchCommander.generateServiceWorker(appName, dirPrefix)
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred while creating service worker: ${e}`); });
        },
        create: (_appName, options) => {
            const version = (0, defaultsettings_1.__get_version__)();
            const switchCommander = this;
            const appName = (typeof _appName === "undefined" || _appName === true) ? ("MyAppName") : (_appName);
            let appTemplateName;
            if (options.createAmp) {
                appTemplateName = "qcobjects-ecommerce-amp";
            }
            else if (options.createPwa) {
                appTemplateName = "qcobjectsnewapp";
            }
            else if (options.createPhp) {
                appTemplateName = "qcobjectsnewphp";
            }
            else if (options.createCustom) {
                appTemplateName = options.createCustom;
            }
            else {
                appTemplateName = "qcobjectsnewapp";
            }
            qcobjects_1.CONFIG.set("qcobjectsnewapp_path", qcobjects_1.CONFIG.get("node_modules_path") + "/" + appTemplateName);
            const _package_json_template_fname = node_path_1.default.resolve(qcobjects_1.CONFIG.get("qcobjectsnewapp_path", "qcobjectsnewapp"), "./package.json");
            /*          if (!process.platform.toLowerCase().startsWith("win")){
                    _package_json_content = _package_json_content.replace(/(")/g, String.fromCharCode(92)+"\"");
                  }*/
            const createAppCommand = "npm init -y";
            const _package_json_file = node_path_1.default.resolve(qcobjects_1.CONFIG.get("projectPath"), "./package.json");
            qcobjects_1.logger.debug("_package_json_file: " + _package_json_file);
            qcobjects_1.logger.debug(createAppCommand);
            (0, node_child_process_1.exec)(createAppCommand, (err) => {
                if (err) {
                    throw Error(err.message);
                    // eslint-disable-next-line no-unreachable
                    process.exit(1);
                    return;
                }
                (0, node_child_process_1.exec)(`npm i --save-dev ${appTemplateName}`, () => {
                    (async () => {
                        const _package_json_template_file = await import(_package_json_template_fname);
                        _package_json_template_file.name = appName;
                        _package_json_template_file.version = "1.0.0";
                        _package_json_template_file.repository = {};
                        node_fs_1.default.writeFileSync(_package_json_file, JSON.stringify(_package_json_template_file, null, 4));
                        qcobjects_1.logger.info("Good! App Templates was installed!");
                        console.log(`Starting to copy files from app template ${appTemplateName} to your project...`);
                        switchCommander.copyTemplate(node_path_1.default.resolve((0, qcobjects_1.findPackageNodePath)(appTemplateName), appTemplateName), node_path_1.default.resolve(qcobjects_1.CONFIG.get("projectPath"), "./"))
                            .then(() => {
                            (0, node_child_process_1.exec)("npm uninstall " + appTemplateName + " --save && npm cache verify", err => {
                                if (err) {
                                    throw Error(err.message);
                                    // eslint-disable-next-line no-unreachable
                                    process.exit(1);
                                    return;
                                }
                                /*
                                switchCommander.generateServiceWorker(appName)
                                .then(()=>{
                                  execSync("npm install --save-dev qcobjects-cli ");
                                });
                                */
                                (0, node_child_process_1.execSync)("npm install --save-dev qcobjects-cli ");
                            });
                            (0, node_child_process_1.exec)("npm cache verify && npm i ", (err) => {
                                if (err) {
                                    throw Error(err.message);
                                    // eslint-disable-next-line no-unreachable
                                    process.exit(1);
                                    return;
                                }
                                qcobjects_1.logger.info("Good! Your application is done. You can play with QCObjects now!");
                                qcobjects_1.logger.info("I will create the SSL certificates now. It may take some time...");
                                (0, node_child_process_1.exec)("qcobjects-createcert", () => {
                                    qcobjects_1.logger.info("Test certificates generated");
                                    const githubService = (0, qcobjects_1.New)(qcobjects_1.Service);
                                    githubService.url = "https://raw.githubusercontent.com/QuickCorp/QCObjects/main/.gitignore";
                                    githubService.headers = {
                                        Accept: "application/vnd.github+json",
                                        "X-GitHub-Api-Version": "2022-11-28",
                                        "User-Agent": "qcobjects-cli"
                                    };
                                    githubService.done = () => { };
                                    (0, qcobjects_1.serviceLoader)(githubService)
                                        .then(({ service }) => {
                                        node_fs_1.default.writeFileSync(node_path_1.default.resolve(qcobjects_1.CONFIG.get("projectPath"), "./.gitignore"), service.template);
                                        try {
                                            (0, node_child_process_1.execSync)("git init");
                                            qcobjects_1.logger.debug("Git initialized.");
                                        }
                                        catch (e) {
                                            qcobjects_1.logger.debug("Could not initialize git.");
                                        }
                                    });
                                }).stdout?.on("data", function (data) {
                                    console.log(data);
                                });
                            }).stdout?.on("data", function (data) {
                                console.log(data);
                            });
                        })
                            .catch((e) => {
                            console.log(e);
                        });
                    })().catch(e => console.error(e));
                }).stdout?.on("data", function (data) {
                    console.log(data);
                });
            }).stdout?.on("data", function () {
                console.log("App generation started...");
            });
        },
        publish(_appName, _options) {
            qcobjects_1.logger.debug("publish is not yet implemented");
        },
        upgradeToEnterprise(_appName, _options) {
            const switchCommander = this;
            void enterprise_commands_1.QCObjectsEnterprise.upgrade(switchCommander);
        }
    };
    program;
    constructor() {
        super();
        this.program = commander_1.default;
    }
    shellCommands(_shell_commands) {
        return new Promise(function (resolve_all, reject_all) {
            var _promises_set = _shell_commands.map(function (shell_command) {
                return (new Promise(function (resolve, reject) {
                    qcobjects_1.logger.debug(shell_command);
                    (0, node_child_process_1.exec)(shell_command, (err, stdout, stderr) => {
                        if (!err) {
                            resolve(stdout);
                        }
                        else {
                            qcobjects_1.logger.debug(`[FAILED]: ${shell_command}`);
                            qcobjects_1.logger.debug(`${stderr}`);
                            reject(stderr);
                        }
                    }).stdout?.on("data", function (data) {
                        qcobjects_1.logger.info(data);
                    });
                })).catch(e => reject_all(e));
            });
        }).catch(e => console.log(e));
    }
    fileListRecursive(dir) {
        var instance = this;
        return (node_fs_1.default.statSync(dir).isDirectory())
            ? (Array.prototype.concat(...node_fs_1.default.readdirSync(dir).map((f) => instance.fileListRecursive(node_path_1.default.join(dir, f))))
                .filter((f) => {
                return !f.startsWith(".git")
                    && f.lastIndexOf(".DS_Store") == -1;
            }))
            : (dir);
    }
    register(email, phonenumber) {
        return new Promise(function (resolve, reject) {
            qcobjects_1.logger.info("I'm going to register your profile on the cloud...");
            const cloudClient = (0, qcobjects_1.New)(api_client_services_1.QuickCorpCloud, {
                apiMethod: "register",
                data: { email: email, phonenumber: phonenumber }
            });
            //        logger.debugEnabled = true;
            try {
            }
            catch (e) {
                console.log("\u{1F926} Something went wrong \u{1F926} when trying to register you in the cloud");
                reject(e);
            }
        });
    }
    generateServiceWorker(appName, dirPrefix = "./") {
        const writeContent = (component) => {
            const parsedText = component.parsedAssignmentText;
            qcobjects_1.logger.debug("Starting to write the sw file...");
            node_fs_1.default.writeFile(`${dirPrefix}/sw.js`, parsedText, (err) => {
                if (err) {
                    throw Error(err);
                }
                qcobjects_1.logger.info("Service Worker Generated");
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
        };
        class ServiceWorkerComponent extends qcobjects_1.Component {
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
                filelist = filelist.map(f => f.replace(new RegExp(`${dirPrefix}/`), ""));
            }
            filelist = filelist.filter(function (fl) { return fl !== "sw.js" && (!fl.startsWith("node_modules/")); });
            filelist = filelist.filter(fname => !fname.endsWith(".pem"));
            filelist = filelist.filter(fname => !fname.endsWith(".sh"));
            filelist = filelist.filter(fname => !(new RegExp("^package(.*).json$")).test(fname));
            filelist = filelist.filter(fname => !fname.startsWith("."));
            var fileListString = "\n\t\"" + filelist.join("\",\n\t\"") + "\"";
            const component = new ServiceWorkerComponent({
                name: "sw",
                data: {
                    appName: appName,
                    appVersion: "1.0.0",
                    filelist: fileListString
                }
            });
            setTimeout(() => {
                component.done({ request: null, component });
            }, 1000);
        });
    }
    copyTemplate(source, dest) {
        return new Promise((resolve, reject) => {
            const copyDir = (source, dest, exclude) => {
                source = node_path_1.default.resolve(source);
                dest = node_path_1.default.resolve(dest);
                const dname = node_path_1.default.basename(source);
                const dirExcluded = (exclude.includes(dname));
                const isDir = (d) => {
                    return (node_fs_1.default.existsSync(d) && node_fs_1.default.statSync(d).isDirectory()) ? (true) : (false);
                };
                const isFile = (d) => {
                    return (node_fs_1.default.existsSync(d) && node_fs_1.default.statSync(d).isFile()) ? (true) : (false);
                };
                if (isDir(source) && !dirExcluded) {
                    node_fs_1.default.mkdirSync(dest, { recursive: true });
                    const paths = node_fs_1.default.readdirSync(source, { withFileTypes: true });
                    const dirs = paths.filter((d) => d.isDirectory());
                    const files = paths.filter((f) => f.isFile());
                    ((paths, dirs, files, exclude) => {
                        files.map((f) => {
                            const sourceFile = node_path_1.default.resolve(source, f.name);
                            const destFile = node_path_1.default.resolve(dest, f.name);
                            const fileExcluded = exclude.includes(f.name);
                            if (isFile(sourceFile) && !fileExcluded) {
                                qcobjects_1.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude.join(",")}...`);
                                node_fs_1.default.copyFileSync(sourceFile, destFile);
                                qcobjects_1.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude.join(",")}...DONE!`);
                            }
                        });
                        dirs.map((d) => {
                            const sourceDir = node_path_1.default.resolve(source, d.name);
                            const destDir = node_path_1.default.resolve(dest, d.name);
                            copyDir(sourceDir, destDir, exclude);
                        });
                    })(paths, dirs, files, exclude);
                }
            };
            try {
                const exclude = [
                    "package.json",
                    "node_modules",
                    ".DS_Store"
                ];
                qcobjects_1.logger.info(`[create] Copying files from ${source} to ${dest} excluding ${exclude.join(",")}...`);
                copyDir(source, dest, (typeof exclude !== "undefined") ? (exclude) : ([]));
                resolve();
            }
            catch (e) {
                qcobjects_1.logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
                reject(e);
            }
        });
    }
    initCommand() {
        const switchCommander = this;
        if (process.argv.length > 1) {
            qcobjects_1.logger.debug("Installing Commands...");
            switchCommander.program
                .version((0, defaultsettings_1.__get_version_string__)());
            switchCommander.program
                .command("create <appname>")
                .description("Creates an app with <appname>")
                .option("--pwa, --create-pwa", "Creates the progressive web app assets")
                .option("--amp, --create-amp", "Creates the accelerated mobile pages assets")
                .option("--php, --create-php", "Creates the PWA PHP assets")
                .option("--custom, --create-custom <templateappname>", "Creates an App from any NPM package template")
                .option("--tests, --create-tests", "Creates the test suite")
                .action(function (args, options) {
                switchCommander.choiceOption.create.call(switchCommander, args, options);
            });
            try {
                qcobjects_1.logger.debug("Loading Plugin Commands...");
                const importPluginCommands = (switchCommander) => {
                    return (0, exports.getPluginCommandsList)()?.map((pluginCommand) => {
                        try {
                            qcobjects_1.logger.debug(`Loading plugin ${pluginCommand.packageName}`);
                            const classFactory = pluginCommand.classFactory;
                            pluginCommand.plugin = new classFactory({ switchCommander: switchCommander });
                        }
                        catch (e) {
                            throw Error(`Something went wrong loading ${pluginCommand.packageName}`);
                        }
                        return pluginCommand;
                    });
                };
                importPluginCommands(switchCommander);
            }
            catch (e) {
                throw Error(`Something went wrong loading plugins: ${e.message}`);
            }
            switchCommander.program.command("publish <appname>")
                .description("Publishes an app with <appname>")
                .option("--pwa, --create-pwa", "Publishes the progressive web app assets")
                .option("--amp, --create-amp", "Publishes the accelerated mobile pages assets")
                .option("--php, --create-php", "Creates the PWA PHP assets")
                .option("--custom, --create-custom", "Creates an App from any NPM package template")
                .option("--tests, --create-tests", "Publishes the test suite")
                .action((args, options) => {
                switchCommander.choiceOption.publish.bind(switchCommander)(args, options);
            });
            switchCommander.program.command("upgrade-to-enterprise")
                .description("Upgrades to QCObjects Enterprise Edition")
                .action(function (args, options) {
                switchCommander.choiceOption.upgradeToEnterprise.call(switchCommander, args, options);
            });
            switchCommander.program.command("generate-sw <appname>")
                .option("-d, --dir <dirPrefix> ", "creates the service worker in a specific dir <dirPrefix>")
                .description("Generates the service worker <appname>")
                .action(function (args, options) {
                switchCommander.choiceOption.generateSw.call(switchCommander, args, options);
            });
            switchCommander.program.command("launch <appname>")
                .description("Launches the application")
                .action(function () {
                qcobjects_1.logger.info("Launching...");
                setTimeout(() => {
                    qcobjects_1.logger.info("Go to the browser and open https://localhost ");
                    qcobjects_1.logger.info("Press Ctrl-C to stop serving ");
                    (0, node_child_process_1.exec)("qcobjects-server", () => {
                    })
                        .stdout?.on("data", function (data) {
                        console.log(data);
                    });
                }, 5000);
                //          setTimeout(()=>{
                //            execSync("open -a \"google chrome\" https://localhost");
                //          },6000);
            });
            switchCommander.program.on("--help", function () {
                console.log("");
                console.log("Use:");
                console.log("  $ qcobjects-cli [command] --help");
                console.log("  For detailed information of a command ");
                console.log("");
                process.exit(0);
            });
            switchCommander.program.on("command:*", function () {
                console.error("Invalid command: %s\nSee --help for a list of available commands.", switchCommander.program.args.join(" "));
                process.exit(1);
            });
            switchCommander.program.parse(process.argv);
        }
        else {
            console.log("");
            console.log("Use:");
            console.log("  $ qcobjects-cli [command] --help");
            console.log("  For detailed information of a command ");
            console.log("");
            process.exit(0);
        }
    }
}
exports.SwitchCommander = SwitchCommander;
qcobjects_1.CONFIG.set("node_modules_path", "./node_modules/");
qcobjects_1.CONFIG.set("qcobjectsnewapp_path", qcobjects_1.CONFIG.get("node_modules_path") + "/qcobjectsnewapp");
(0, qcobjects_1.Package)("org.quickcorp.qcobjects.cli", [
    SwitchCommander
]);
(0, qcobjects_1.Export)(SwitchCommander);
//# sourceMappingURL=cli-main.js.map