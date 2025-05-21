"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CollabServer = void 0;
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
const qcobjects_1 = require("qcobjects");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const node_net_1 = __importDefault(require("node:net"));
const node_repl_1 = __importDefault(require("node:repl"));
const node_vm_1 = __importDefault(require("node:vm"));
const path_1 = __importDefault(require("path"));
const child_process_1 = require("child_process");
const welcometo = "Welcome to \n";
const instructions = "Type:\n .exit to quit\n .help for see a quick guide\n And any other command to execute like pure javascript \n All the QCObjects stuff is already loaded for you";
const logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
const absolutePath = path_1.default.resolve(__dirname, "./");
console.log(welcometo);
console.log(logo);
const unixsocket_default = os_1.default.tmpdir() + "/qcobjects-collab-socket" + Date.now().toString();
const collab_port_default = 10300;
const collab_domain_default = "0.0.0.0";
const sandbox = {
    require: require,
    module: module,
    __dirname: "./",
    __filename: "qcobjects-collab"
};
class CollabServer extends qcobjects_1.InheritClass {
    protected_symbols;
    replServer;
    commands;
    constructor() {
        super();
        this.protected_symbols = ["clearInterval",
            "clearTimeout",
            "setInterval",
            "setTimeout", "queueMicrotask",
            "clearImmediate", "setImmediate", "_asyncLoad",
            "_fireAsyncLoad", "asyncLoad", "logger",
            "_Crypt", "CONFIG", "waitUntil",
            "_super_", "ComplexStorageCache", "TagElements",
            "onload", "InheritClass", "Component",
            "Controller", "View", "Service",
            "JSONService", "ConfigService", "VO",
            "serviceLoader", "componentLoader", "ComponentURI",
            "SourceJS", "SourceCSS", "ArrayList",
            "ArrayCollection", "Effect", "Timer",
            "Export", "Import", "Package",
            "Class", "New", "Tag",
            "Ready", "Contact", "FormField",
            "ButtonField", "InputField", "TextField",
            "EmailField", "GridComponent", "GridController",
            "GridView", "Move", "RotateX",
            "RotateY", "RotateZ", "Rotate",
            "Fade", "Radius", "CanvasTool",
            "BasicLayout"
        ];
        const replServer = this.replServer;
        this.commands = {
            loadcmd_json: {
                help: `
            Executes a CMD Shell Command
            and loads the stdout to a variable after trying to convert the result
            to JSON format
            The first argument is the variable name followed by an equal sign "=".
            Example:
             > .loadcmd_json result = cat somefile.json

            The above command will save the content of somefile.json using cat into the variable global.result
            as JSON format
`,
                action(args) {
                    const _rplServer = replServer;
                    var commandArgs = args.split(" ");
                    if (commandArgs.length > 2) {
                        var _variableName = commandArgs[0];
                        var _equal_sign = commandArgs[1].toString();
                        if (_equal_sign === "=") {
                            var cmdArguments = commandArgs.slice(2).join(" ");
                            _rplServer.clearBufferedCommand();
                            qcobjects_1.logger.debug(`Executing... ${cmdArguments}`);
                            (0, child_process_1.exec)(cmdArguments, (err, stdout, stderr) => {
                                try {
                                    _rplServer.context[_variableName] = JSON.parse(stdout);
                                }
                                catch (e) {
                                    qcobjects_1.logger.debug("It was not possible to parse the data.");
                                }
                                _rplServer.displayPrompt();
                            }).stdout?.on("data", function (data) {
                                console.log(data);
                            });
                        }
                        else {
                            console.log("That is no good my friend. You need to specify an equal sign.");
                            _rplServer.displayPrompt();
                        }
                    }
                    else {
                        console.log("No enough data in the command line. Try .help");
                        _rplServer.displayPrompt();
                    }
                }
            },
            loadcmd_str: {
                help: `
            Executes a CMD Shell Command
            and loads the stdout to a variable.
            The first argument is the variable name followed by an equal sign "=".
            Example:
             > .loadcmd_str foo = ls *

            The above command will save the output of "ls *" into the variable global.foo as string
`,
                action(args) {
                    const _rplServer = replServer;
                    var commandArgs = args.split(" ");
                    if (commandArgs.length > 2) {
                        var _variableName = commandArgs[0];
                        var _equal_sign = commandArgs[1].toString();
                        if (_equal_sign === "=") {
                            var cmdArguments = commandArgs.slice(2).join(" ");
                            _rplServer.clearBufferedCommand();
                            qcobjects_1.logger.debug(`Executing... ${cmdArguments}`);
                            (0, child_process_1.exec)(cmdArguments, (err, stdout, stderr) => {
                                _rplServer.context[_variableName] = stdout;
                                _rplServer.displayPrompt();
                            }).stdout?.on("data", function (data) {
                                console.log(data);
                            });
                        }
                        else {
                            console.log("That is no good my friend. You need to specify an equal sign.");
                            _rplServer.displayPrompt();
                        }
                    }
                    else {
                        console.log("No enough data in the command line. Try .help");
                        _rplServer.displayPrompt();
                    }
                }
            },
            save_json: {
                help: `
            Serializes a variable using JSON.stringify
            and saves it in a file.
            The first argument is the variable name and the second argument is the name of the file.
            Example:
             > .save_json foo ./filename

            The above command will save the stringified content of foo into ./filename
`,
                action(args) {
                    const _rplServer = replServer;
                    var commandArgs = args.split(" ");
                    if (commandArgs.length >= 2) {
                        var _variableName = commandArgs[0];
                        var _filename = commandArgs[1].toString();
                        qcobjects_1.logger.debug(`Saving variable ${_variableName} in ${_filename}...`);
                        var data = JSON.stringify(_rplServer.context[_variableName]);
                        fs_1.default.writeFile(_filename, data, (err) => {
                            if (err)
                                throw err;
                            qcobjects_1.logger.debug(`The data of the file ${_filename} has been saved!`);
                            _rplServer.displayPrompt();
                        });
                    }
                    else {
                        console.log("No enough data in the command line. Try .help");
                        _rplServer.displayPrompt();
                    }
                }
            },
            load_json: {
                help: `
            Loads a json from a file and saves it into a variable.
            The first argument is the variable name and the second argument is the name of the file.
            Example:
             > .load_json foo = ./filename

            The above command will load a json from ./filename and save it in global.foo as an object
`,
                action(args) {
                    const _rplServer = replServer;
                    var commandArgs = args.split(" ");
                    if (commandArgs.length > 2) {
                        var _variableName = commandArgs[0];
                        var _equal_sign = commandArgs[1].toString();
                        if (_equal_sign === "=") {
                            var _filename = commandArgs[2].toString();
                            qcobjects_1.logger.debug(`Trying to read ${_variableName} from ${_filename}...`);
                            fs_1.default.readFile(_filename, (err, data) => {
                                if (err)
                                    throw err;
                                try {
                                    _rplServer.context[_variableName] = JSON.parse(data.toString());
                                    qcobjects_1.logger.debug(`The data of the file ${_filename} has been loaded!`);
                                }
                                catch (e) {
                                    qcobjects_1.logger.debug("It was not possible to parse the data.");
                                }
                                _rplServer.displayPrompt();
                            });
                        }
                        else {
                            console.log("That is no good my friend. You need to specify an equal sign.");
                            _rplServer.displayPrompt();
                        }
                    }
                    else {
                        console.log("No enough data in the command line. Try .help");
                        _rplServer.displayPrompt();
                    }
                }
            },
            cmd: {
                help: "Executes a CMD Shell Command",
                action(...args) {
                    const _rplServer = replServer;
                    var cmdArguments = args.join(" ");
                    _rplServer.clearBufferedCommand();
                    qcobjects_1.logger.debug(`Executing... ${cmdArguments}`);
                    (0, child_process_1.exec)(cmdArguments, (err, stdout, stderr) => {
                        _rplServer.displayPrompt();
                    }).stdout?.on("data", function (data) {
                        console.log(data);
                    });
                }
            }
        };
    }
    runScript(context) {
        const runScript = (code, logOutput = false) => {
            const options = { filename: sandbox.__filename };
            const backgroundRunScript = (code) => {
                var output = node_vm_1.default.runInContext(code, context, options);
                return output;
            };
            var output = backgroundRunScript(code);
            if (logOutput && typeof output !== "undefined") {
                console.log(output);
            }
        };
    }
    start() {
        var collabServer = this;
        qcobjects_1.global.require = require.bind(qcobjects_1.global);
        qcobjects_1.global.module = module;
        qcobjects_1.global.__dirname = "./";
        qcobjects_1.global.__filename = "qcobjects-collab";
        const globalContext = node_vm_1.default.createContext(qcobjects_1.global);
        globalContext.connections = 0;
        function unlink_socket() {
            try {
                qcobjects_1.logger.debug("Trying to delete the socket... ");
                fs_1.default.unlink(qcobjects_1.CONFIG.get("collab-unix-socket", unixsocket_default), (err) => {
                    if (err) {
                        qcobjects_1.logger.debug("Unix Socket does not exist");
                    }
                    qcobjects_1.logger.debug("Unix Socket was deleted before start");
                });
            }
            catch (e) {
                // socket doesnt exists
                qcobjects_1.logger.debug("Unix Socket was not deleted");
            }
        }
        unlink_socket();
        var _defineReplCommands = function (_cmdReplServer, commands) {
            for (var _command in commands) {
                _cmdReplServer.defineCommand(_command, commands[_command]);
            }
        };
        const replServer = node_repl_1.default.start({
            useColors: true,
            prompt: "QCObjects Collab> ",
            terminal: true,
            useGlobal: false
        });
        this.replServer = replServer;
        this.replServer.context.global = globalContext;
        this.replServer.on("exit", () => {
            unlink_socket();
            console.log("Thank you for using QCObjects Collab for Data Science!");
            console.log("Have a nice day!");
            process.exit();
        });
        _defineReplCommands(this.replServer, collabServer.commands);
        const unixsocket_server = node_net_1.default.createServer(function (unixsocket) {
            unixsocket.on("end", () => {
                qcobjects_1.logger.debug("A Unix socket connection was ended");
            });
            qcobjects_1.global.connections += 1;
            const unixReplServer = node_repl_1.default.start({
                prompt: "QCObjects Collab> ",
                input: unixsocket,
                output: unixsocket,
                terminal: true,
                useGlobal: false
            });
            unixReplServer.on("exit", function () {
                unixsocket.end();
            });
            unixReplServer.context.global = qcobjects_1.global;
            _defineReplCommands(unixReplServer, collabServer.commands);
        }).listen(qcobjects_1.CONFIG.get("collab-unix-socket", unixsocket_default));
        const http_server = node_net_1.default.createServer(function (httpsocket) {
            httpsocket.on("end", () => {
                qcobjects_1.logger.debug("A http connection was ended");
            });
            qcobjects_1.global.connections += 1;
            const httpReplServer = node_repl_1.default.start({
                prompt: "QCObjects Collab> ",
                input: httpsocket,
                output: httpsocket,
                terminal: true,
                useGlobal: false
            });
            httpReplServer.on("exit", function () {
                httpsocket.end();
            });
            httpReplServer.context.global = qcobjects_1.global;
            _defineReplCommands(httpReplServer, collabServer.commands);
        }).listen(qcobjects_1.CONFIG.get("collab-port", collab_port_default), qcobjects_1.CONFIG.get("collab-domain", collab_domain_default));
        http_server.on("error", function (e) {
            if (e.code == "EADDRINUSE") {
                console.log("Collab HTTP Address in use, retrying...");
                setTimeout(function () {
                    http_server.close();
                    http_server.listen(qcobjects_1.CONFIG.get("collab-port", collab_port_default), qcobjects_1.CONFIG.get("collab-domain", collab_domain_default));
                }, 1000);
            }
        });
        unixsocket_server.on("error", function (e) {
            if (e.code == "EADDRINUSE") {
                console.log("Collab Unix Socket Address in use, retrying...");
                setTimeout(function () {
                    unixsocket_server.close();
                    unixsocket_server.listen(qcobjects_1.CONFIG.get("collab-unix-socket", unixsocket_default));
                }, 1000);
            }
        });
    }
}
exports.CollabServer = CollabServer;
(() => {
    if (process.argv.length < 3) {
        console.log(instructions);
        const collabinstructions = `
Collab for Data Science
=======================

QCObjects Collab is a tool that helps you to make data science math using JavaScript

You can use a TCP socket to connect yourself to the engine:

> ssh user@${qcobjects_1.CONFIG.get("domain", collab_domain_default)} nc ${qcobjects_1.CONFIG.get("collab-domain", collab_domain_default)} ${qcobjects_1.CONFIG.get("collab-port", collab_port_default)}

You can also use a Unix Socket to connect yourself to the engine:

> ssh user@${qcobjects_1.CONFIG.get("domain", collab_domain_default)} nc -U ${qcobjects_1.CONFIG.get("collab-unix-socket", unixsocket_default)}

(change "user" for whathever your username is!)

`;
        console.log(collabinstructions);
    }
    (0, qcobjects_1.Package)("org.quickcorp.qcobjects.collab.server", [
        CollabServer
    ]);
})();
//# sourceMappingURL=collab-server.js.map