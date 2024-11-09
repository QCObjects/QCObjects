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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
var package_config = require(absolutePath + "/../package.json");
var _a = require("child_process"), exec = _a.exec, execSync = _a.execSync;
CONFIG.set("node_modules_path", "./node_modules/");
CONFIG.set("qcobjectsnewapp_path", CONFIG.get("node_modules_path") + "/qcobjectsnewapp");
require(absolutePath + "/org.qcobjects.enterprise.commands");
require(absolutePath + "/org.quickcorp.qcobjects.api.client_services");
require(absolutePath + "/com.qcobjects.cli.commands");
var ImportCustomCommand = function (commandName, commandPackage) {
    var _ret_;
    var standardPath = findPackageNodePath(commandPackage) || findPackageNodePath(commandPackage + ".js");
    if (standardPath !== null) {
        _ret_ = Import(commandPackage);
    }
    else {
        logger.debug("".concat(commandPackage, " is not a valid package for ").concat(commandName, "!"));
        _ret_ = Promise.reject(new Error("".concat(commandName, " does not exist!")));
    }
    return _ret_;
};
Package("org.quickcorp.qcobjects.cli", [
    /** @class */ (function (_super) {
        __extends(SwitchCommander, _super);
        function SwitchCommander() {
            var _this = _super.apply(this, arguments) || this;
            _this.choiceOption = {
                generateSw: function (_appName, options) {
                    var dirPrefix = options.dir;
                    var switchCommander = this;
                    var appName = (typeof _appName === "undefined" || _appName === true) ? ("MyAppName") : (_appName);
                    switchCommander.generateServiceWorker(appName, dirPrefix);
                },
                create: function (_appName, options) {
                    var version = global.__get_version__();
                    var switchCommander = this;
                    var appName = (typeof _appName === "undefined" || _appName === true) ? ("MyAppName") : (_appName);
                    var _package_json_content;
                    _package_json_content = "{\n          \"name\": \"".concat(appName, "\"\n          \"version\": \"1.0.0\",\n          \"dependencies\":{\n            \"qcobjectsnewphp\": \"latest\",\n            \"qcobjects\": \"").concat(version.qcobjects, "\",\n            \"qcobjects-sdk\": \"^").concat(version.sdk, "\"\n          }\n        }");
                    var createAppCommand;
                    var appTemplateName;
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
                    CONFIG.set("qcobjectsnewapp_path", CONFIG.get("node_modules_path") + "/" + appTemplateName);
                    var _package_json_template_fname = path.resolve(CONFIG.get("qcobjectsnewapp_path", "qcobjectsnewapp"), "./package.json");
                    /*          if (!process.platform.toLowerCase().startsWith("win")){
                              _package_json_content = _package_json_content.replace(/(")/g, String.fromCharCode(92)+"\"");
                            }*/
                    createAppCommand = "npm init -y";
                    var _package_json_file = path.resolve(CONFIG.get("projectPath"), "./package.json");
                    logger.debug("_package_json_file: " + _package_json_file);
                    logger.debug(createAppCommand);
                    exec(createAppCommand, function (err, stdout, stderr) {
                        if (err) {
                            throw Error(err.message);
                            process.exit(1);
                            return;
                        }
                        exec("npm i --save-dev ".concat(appTemplateName), function () {
                            var _package_json_template_file = require(_package_json_template_fname);
                            _package_json_template_file.name = appName;
                            _package_json_template_file.version = "1.0.0";
                            _package_json_template_file.repository = {};
                            fs.writeFileSync(_package_json_file, JSON.stringify(_package_json_template_file, null, 4));
                            logger.info("Good! App Templates was installed!");
                            console.log("Starting to copy files from app template ".concat(appTemplateName, " to your project..."));
                            switchCommander.copyTemplate(path.resolve(findPackageNodePath(appTemplateName), appTemplateName), path.resolve(CONFIG.get("projectPath"), "./"))
                                .then(function () {
                                exec("npm uninstall " + appTemplateName + " --save && npm cache verify", function (err, stdout, stderr) {
                                    if (err) {
                                        throw Error(err.message);
                                        process.exit(1);
                                        return;
                                    }
                                    /*
                                    switchCommander.generateServiceWorker(appName)
                                    .then(()=>{
                                      execSync("npm install --save-dev qcobjects-cli ");
                                    });
                                    */
                                    execSync("npm install --save-dev qcobjects-cli ");
                                });
                                exec("npm cache verify && npm i ", function (err, stdout, stderr) {
                                    if (err) {
                                        throw Error(err.message);
                                        process.exit(1);
                                        return;
                                    }
                                    logger.info("Good! Your application is done. You can play with QCObjects now!");
                                    logger.info("I will create the SSL certificates now. It may take some time...");
                                    exec("qcobjects-createcert", function (err, stdout, stderr) {
                                        logger.info("Test certificates generated");
                                        var githubService = New(Service);
                                        githubService.url = "https://raw.githubusercontent.com/QuickCorp/QCObjects/main/.gitignore";
                                        githubService.headers = {
                                            Accept: 'application/vnd.github+json',
                                            'X-GitHub-Api-Version': '2022-11-28',
                                            'User-Agent': 'qcobjects-cli'
                                        };
                                        githubService.done = function () { };
                                        serviceLoader(githubService)
                                            .then(function (_a) {
                                            var service = _a.service;
                                            fs.writeFileSync(path.resolve(CONFIG.get("projectPath"), "./.gitignore"), service.template);
                                            try {
                                                execSync("git init");
                                                logger.debug("Git initialized.");
                                            }
                                            catch (e) {
                                                logger.debug("Could not initialize git.");
                                            }
                                        });
                                    }).stdout.on("data", function (data) {
                                        console.log(data);
                                    });
                                }).stdout.on("data", function (data) {
                                    console.log(data);
                                });
                            })
                                .catch(function (e) {
                                console.log(e);
                            });
                        }).stdout.on("data", function (data) {
                            console.log(data);
                        });
                    }).stdout.on("data", function (data) {
                        console.log("App generation started...");
                    });
                },
                publish: function (_appName) {
                    logger.debug("publish is not yet implemented");
                },
                upgradeToEnterprise: function () {
                    var switchCommander = this;
                    QCObjectsEnterprise.upgrade(switchCommander);
                }
            };
            _this.program = require("commander");
            return _this;
        }
        SwitchCommander.prototype.shellCommands = function (_shell_commands) {
            return new Promise(function (resolve_all, reject_all) {
                var _promises_set = _shell_commands.map(function (shell_command) {
                    return (new Promise(function (resolve, reject) {
                        logger.debug(shell_command);
                        exec(shell_command, function (err, stdout, stderr) {
                            if (!err) {
                                resolve(stdout);
                            }
                            else {
                                logger.debug("[FAILED]: ".concat(shell_command));
                                logger.debug("".concat(stderr));
                                reject(stderr);
                            }
                        }).stdout.on("data", function (data) {
                            logger.info(data);
                        });
                    })).catch(function (e) { return reject_all(e); });
                });
                var _promise_all = Promise.all(_promises_set).then(function (response) {
                    resolve_all(response);
                }).catch(function (e) {
                    reject_all(e);
                });
            }).catch(function (e) { return console.log(e); });
        };
        SwitchCommander.prototype.fileListRecursive = function (dir) {
            var _a;
            var instance = this;
            return (fs.statSync(dir).isDirectory())
                ? ((_a = Array.prototype).concat.apply(_a, fs.readdirSync(dir).map(function (f) { return instance.fileListRecursive(path.join(dir, f)); })).filter(function (f) {
                    return !f.startsWith(".git")
                        && f.lastIndexOf(".DS_Store") == -1;
                }))
                : (dir);
        };
        SwitchCommander.prototype.register = function (email, phonenumber) {
            return new Promise(function (resolve, reject) {
                logger.info("I'm going to register your profile on the cloud...");
                var cloudClient = New(QuickCorpCloud, {
                    apiMethod: "register",
                    data: { email: email, phonenumber: phonenumber }
                });
                //        logger.debugEnabled = true;
                try {
                    var service = serviceLoader(cloudClient).then(function (successResonse) {
                        var template = successResonse.service.template;
                        var response = JSON.parse(template);
                        resolve(response);
                    }).catch(function (e) {
                        console.log("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to register you in the cloud");
                        reject();
                    });
                }
                catch (e) {
                    console.log("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to register you in the cloud");
                    reject();
                }
            });
        };
        SwitchCommander.prototype.generateServiceWorker = function (appName, dirPrefix) {
            var _this = this;
            if (dirPrefix === void 0) { dirPrefix = "./"; }
            var writeContent = function (component) {
                var parsedText = component.parseTemplate(component.template);
                logger.debug("Starting to write the sw file...");
                fs.writeFile("".concat(dirPrefix, "/sw.js"), parsedText, function (err) {
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
            };
            var ServiceWorkerComponent = /** @class */ (function (_super) {
                __extends(ServiceWorkerComponent, _super);
                function ServiceWorkerComponent() {
                    var _this = _super !== null && _super.apply(this, arguments) || this;
                    _this.cached = false;
                    _this.templateURI = "sw.js";
                    _this.basePath = templatePwaPath;
                    _this.name = "sw";
                    _this.tplsource = "default";
                    _this.template = "";
                    return _this;
                }
                ServiceWorkerComponent.prototype.done = function (_a) {
                    var request = _a.request, component = _a.component;
                    _super.prototype.done.call(this, { request: request, component: component });
                    writeContent(this);
                };
                return ServiceWorkerComponent;
            }(Component));
            return new Promise(function (resolve, reject) {
                var filelist = ["/"].concat(_this.fileListRecursive("".concat(dirPrefix)));
                if (typeof dirPrefix !== "undefined" && dirPrefix !== "./" && dirPrefix !== ".") {
                    filelist = filelist.map(function (f) { return f.replace(new RegExp("".concat(dirPrefix, "/")), ""); });
                }
                filelist = filelist.filter(function (fl) { return fl !== "sw.js" && (!fl.startsWith("node_modules/")); });
                filelist = filelist.filter(function (fname) { return !fname.endsWith(".pem"); });
                filelist = filelist.filter(function (fname) { return !fname.endsWith(".sh"); });
                filelist = filelist.filter(function (fname) { return !(new RegExp("^package(.*).json$")).test(fname); });
                filelist = filelist.filter(function (fname) { return !fname.startsWith("."); });
                var fileListString = "\n\t\"" + filelist.join("\",\n\t\"") + "\"";
                var component;
                new Promise(function (resolve, reject) {
                    component = new ServiceWorkerComponent({
                        name: "sw",
                        data: {
                            appName: appName,
                            appVersion: "1.0.0",
                            filelist: fileListString
                        }
                    });
                    setTimeout(function () {
                        component.done({ request: null, component: component });
                    }, 1000);
                });
            });
        };
        SwitchCommander.prototype.copyTemplate = function (source, dest) {
            return new Promise(function (resolve, reject) {
                var copyDir = function (source, dest, exclude) {
                    source = path.resolve(source);
                    dest = path.resolve(dest);
                    var dname = path.basename(source);
                    var dirExcluded = (exclude.includes(dname));
                    var isDir = function (d) {
                        return (fs.existsSync(d) && fs.statSync(d).isDirectory()) ? (true) : (false);
                    };
                    var isFile = function (d) {
                        return (fs.existsSync(d) && fs.statSync(d).isFile()) ? (true) : (false);
                    };
                    if (isDir(source) && !dirExcluded) {
                        fs.mkdirSync(dest, { recursive: true });
                        var paths = fs.readdirSync(source, { withFileTypes: true });
                        var dirs = paths.filter(function (d) { return d.isDirectory(); });
                        var files = paths.filter(function (f) { return f.isFile(); });
                        (function (paths, dirs, files, exclude) {
                            return __awaiter(this, void 0, void 0, function () {
                                return __generator(this, function (_a) {
                                    files.map(function (f) {
                                        var sourceFile = path.resolve(source, f.name);
                                        var destFile = path.resolve(dest, f.name);
                                        var fileExcluded = exclude.includes(f.name);
                                        if (isFile(sourceFile) && !fileExcluded) {
                                            logger.debug("[publish:static] Copying files from ".concat(sourceFile, " to ").concat(destFile, " excluding ").concat(exclude, "..."));
                                            fs.copyFileSync(sourceFile, destFile);
                                            logger.debug("[publish:static] Copying files from ".concat(sourceFile, " to ").concat(destFile, " excluding ").concat(exclude, "...DONE!"));
                                        }
                                    });
                                    dirs.map(function (d) {
                                        var sourceDir = path.resolve(source, d.name);
                                        var destDir = path.resolve(dest, d.name);
                                        copyDir(sourceDir, destDir, exclude);
                                    });
                                    return [2 /*return*/];
                                });
                            });
                        })(paths, dirs, files, exclude);
                    }
                };
                try {
                    var exclude = [
                        "package.json",
                        "node_modules",
                        ".DS_Store"
                    ];
                    logger.info("[create] Copying files from ".concat(source, " to ").concat(dest, " excluding ").concat(exclude, "..."));
                    copyDir(source, dest, (typeof exclude !== "undefined") ? (exclude) : ([]));
                    resolve();
                }
                catch (e) {
                    logger.warn("Something went wrong trying to publish static files: ".concat(e.message));
                    reject(e);
                }
            });
        };
        SwitchCommander.prototype.initCommand = function () {
            var switchCommander = this;
            if (process.argv.length > 1) {
                logger.debug("Installing Commands...");
                switchCommander.program
                    .version(global.__get_version_string__());
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
                    logger.debug("Loading Plugin Commands...");
                    var importPluginCommands = function (switchCommander) {
                        return global.ClassesList
                            .filter(function (c) { return c.packageName.startsWith("com.qcobjects.cli.commands."); })
                            .filter(function (p) { return p.classFactory.name.endsWith("CommandHandler"); })
                            .map(function (pluginCommand) {
                            try {
                                logger.debug("Loading plugin ".concat(pluginCommand.packageName));
                                var classFactory = pluginCommand.classFactory;
                                pluginCommand.plugin = New(classFactory, { switchCommander: switchCommander });
                            }
                            catch (e) {
                                throw Error("Something went wrong loading ".concat(pluginCommand.packageName));
                            }
                            return pluginCommand;
                        });
                    };
                    importPluginCommands(switchCommander);
                }
                catch (e) {
                    throw Error("Something went wrong loading plugins: ".concat(e.message));
                }
                switchCommander.program.command("publish <appname>")
                    .description("Publishes an app with <appname>")
                    .option("--pwa, --create-pwa", "Publishes the progressive web app assets")
                    .option("--amp, --create-amp", "Publishes the accelerated mobile pages assets")
                    .option("--php, --create-php", "Creates the PWA PHP assets")
                    .option("--custom, --create-custom", "Creates an App from any NPM package template")
                    .option("--tests, --create-tests", "Publishes the test suite")
                    .action(function (args, options) {
                    switchCommander.choiceOption.publish.call(switchCommander, args, options);
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
                    .action(function (args, options) {
                    logger.info("Launching...");
                    setTimeout(function () {
                        logger.info("Go to the browser and open https://localhost ");
                        logger.info("Press Ctrl-C to stop serving ");
                        exec("qcobjects-server", function (err, stdout, stderr) {
                        }).stdout.on("data", function (data) {
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
        };
        return SwitchCommander;
    }(InheritClass))
]);
