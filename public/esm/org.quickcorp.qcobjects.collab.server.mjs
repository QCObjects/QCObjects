var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_org_quickcorp_qcobjects_collab_server = __commonJS({
  "src/org.quickcorp.qcobjects.collab.server.ts"(exports, module) {
    (() => {
      "use strict";
      const { CONFIG, Package, InheritClass, logger, global } = require("qcobjects");
      const os = require("os");
      const fs = require("fs");
      const net = require("node:net");
      const repl = require("node:repl");
      const vm = require("node:vm");
      const welcometo = "Welcome to \n";
      const instructions = "Type:\n .exit to quit\n .help for see a quick guide\n And any other command to execute like pure javascript \n All the QCObjects stuff is already loaded for you";
      const logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
d88P" "Y88bd88P  Y88bd88P" "Y88b888       Y8P                888            \r
888     888888    888888     888888                          888            \r
888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r
888     888888       888     888888 "88b "888d8P  Y8bd88P"   888   88K      \r
888 Y8b 888888    888888     888888  888  88888888888888     888   "Y8888b. \r
Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r
 "Y888888"  "Y8888P"  "Y88888P" 88888P"   888 "Y8888  "Y8888P "Y888 88888P' \r
       Y8b                                888                               \r
                                         d88P                               \r
                                       888P"   `;
      const path = require("path");
      const absolutePath = path.resolve(__dirname, "./");
      const { exec, execSync } = require("child_process");
      console.log(welcometo);
      console.log(logo);
      const unixsocket_default = os.tmpdir() + "/qcobjects-collab-socket" + Date.now().toString();
      const collab_port_default = 10300;
      const collab_domain_default = "0.0.0.0";
      if (process.argv.length < 3) {
        console.log(instructions);
        const collabinstructions = `
Collab for Data Science
=======================

QCObjects Collab is a tool that helps you to make data science math using JavaScript

You can use a TCP socket to connect yourself to the engine:

> ssh user@${CONFIG.get("domain", collab_domain_default)} nc ${CONFIG.get("collab-domain", collab_domain_default)} ${CONFIG.get("collab-port", collab_port_default)}

You can also use a Unix Socket to connect yourself to the engine:

> ssh user@${CONFIG.get("domain", collab_domain_default)} nc -U ${CONFIG.get("collab-unix-socket", unixsocket_default)}

(change "user" for whathever your username is!)

`;
        console.log(collabinstructions);
      }
      const sandbox = {
        require,
        module,
        __dirname: "./",
        __filename: "qcobjects-collab"
      };
      class CollabServer extends InheritClass {
        static {
          __name(this, "CollabServer");
        }
        constructor() {
          super();
          this.protected_symbols = [
            "clearInterval",
            "clearTimeout",
            "setInterval",
            "setTimeout",
            "queueMicrotask",
            "clearImmediate",
            "setImmediate",
            "_asyncLoad",
            "_fireAsyncLoad",
            "asyncLoad",
            "logger",
            "_Crypt",
            "CONFIG",
            "waitUntil",
            "_super_",
            "ComplexStorageCache",
            "TagElements",
            "onload",
            "InheritClass",
            "Component",
            "Controller",
            "View",
            "Service",
            "JSONService",
            "ConfigService",
            "VO",
            "serviceLoader",
            "componentLoader",
            "ComponentURI",
            "SourceJS",
            "SourceCSS",
            "ArrayList",
            "ArrayCollection",
            "Effect",
            "Timer",
            "Export",
            "Import",
            "Package",
            "Class",
            "New",
            "Tag",
            "Ready",
            "Contact",
            "FormField",
            "ButtonField",
            "InputField",
            "TextField",
            "EmailField",
            "GridComponent",
            "GridController",
            "GridView",
            "Move",
            "RotateX",
            "RotateY",
            "RotateZ",
            "Rotate",
            "Fade",
            "Radius",
            "CanvasTool",
            "BasicLayout"
          ];
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
                const _rplServer = repl;
                var commandArgs = args.split(" ");
                if (commandArgs.length > 2) {
                  var _variableName = commandArgs[0];
                  var _equal_sign = commandArgs[1].toString();
                  if (_equal_sign === "=") {
                    var cmdArguments = commandArgs.slice(2).join(" ");
                    _rplServer.clearBufferedCommand();
                    logger.debug(`Executing... ${cmdArguments}`);
                    exec(cmdArguments, (err, stdout, stderr) => {
                      try {
                        _rplServer.context[_variableName] = JSON.parse(stdout);
                      } catch (e) {
                        logger.debug("It was not possible to parse the data.");
                      }
                      _rplServer.displayPrompt();
                    }).stdout.on("data", function(data) {
                      console.log(data);
                    });
                  } else {
                    console.log("That is no good my friend. You need to specify an equal sign.");
                    _rplServer.displayPrompt();
                  }
                } else {
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
                const _rplServer = repl;
                var commandArgs = args.split(" ");
                if (commandArgs.length > 2) {
                  var _variableName = commandArgs[0];
                  var _equal_sign = commandArgs[1].toString();
                  if (_equal_sign === "=") {
                    var cmdArguments = commandArgs.slice(2).join(" ");
                    _rplServer.clearBufferedCommand();
                    logger.debug(`Executing... ${cmdArguments}`);
                    exec(cmdArguments, (err, stdout, stderr) => {
                      _rplServer.context[_variableName] = stdout;
                      _rplServer.displayPrompt();
                    }).stdout.on("data", function(data) {
                      console.log(data);
                    });
                  } else {
                    console.log("That is no good my friend. You need to specify an equal sign.");
                    _rplServer.displayPrompt();
                  }
                } else {
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
                const _rplServer = repl;
                var commandArgs = args.split(" ");
                if (commandArgs.length >= 2) {
                  var _variableName = commandArgs[0];
                  var _filename = commandArgs[1].toString();
                  logger.debug(`Saving variable ${_variableName} in ${_filename}...`);
                  var data = JSON.stringify(_rplServer.context[_variableName]);
                  fs.writeFile(_filename, data, (err) => {
                    if (err) throw err;
                    logger.debug(`The data of the file ${_filename} has been saved!`);
                    _rplServer.displayPrompt();
                  });
                } else {
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
                const _rplServer = repl;
                var commandArgs = args.split(" ");
                if (commandArgs.length > 2) {
                  var _variableName = commandArgs[0];
                  var _equal_sign = commandArgs[1].toString();
                  if (_equal_sign === "=") {
                    var _filename = commandArgs[2].toString();
                    logger.debug(`Trying to read ${_variableName} from ${_filename}...`);
                    fs.readFile(_filename, (err, data) => {
                      if (err) throw err;
                      try {
                        _rplServer.context[_variableName] = JSON.parse(data.toString());
                        logger.debug(`The data of the file ${_filename} has been loaded!`);
                      } catch (e) {
                        logger.debug("It was not possible to parse the data.");
                      }
                      _rplServer.displayPrompt();
                    });
                  } else {
                    console.log("That is no good my friend. You need to specify an equal sign.");
                    _rplServer.displayPrompt();
                  }
                } else {
                  console.log("No enough data in the command line. Try .help");
                  _rplServer.displayPrompt();
                }
              }
            },
            cmd: {
              help: "Executes a CMD Shell Command",
              action(...args) {
                const _rplServer = repl;
                var cmdArguments = args.join(" ");
                _rplServer.clearBufferedCommand();
                logger.debug(`Executing... ${cmdArguments}`);
                exec(cmdArguments, (err, stdout, stderr) => {
                  _rplServer.displayPrompt();
                }).stdout.on("data", function(data) {
                  console.log(data);
                });
              }
            }
          };
        }
        runScript(context) {
          const runScript = /* @__PURE__ */ __name((code, logOutput = false) => {
            const options = { filename: sandbox.__filename };
            const backgroundRunScript = /* @__PURE__ */ __name((code2) => {
              var output2 = vm.runInContext(code2, context, options);
              return output2;
            }, "backgroundRunScript");
            var output = backgroundRunScript(code);
            if (logOutput && typeof output !== "undefined") {
              console.log(output);
            }
          }, "runScript");
        }
        start() {
          var collabServer = this;
          global.require = require.bind(global);
          global.module = module;
          global.__dirname = "./";
          global.__filename = "qcobjects-collab";
          const globalContext = vm.createContext(global);
          globalContext.connections = 0;
          function unlink_socket() {
            try {
              logger.debug("Trying to delete the socket... ");
              fs.unlink(CONFIG.get("collab-unix-socket", unixsocket_default), (err) => {
                if (err) {
                  logger.debug("Unix Socket does not exist");
                }
                logger.debug("Unix Socket was deleted before start");
              });
            } catch (e) {
              logger.debug("Unix Socket was not deleted");
            }
          }
          __name(unlink_socket, "unlink_socket");
          unlink_socket();
          var _defineReplCommands = /* @__PURE__ */ __name(function(_cmdReplServer, commands) {
            for (var _command in commands) {
              _cmdReplServer.defineCommand(_command, commands[_command]);
            }
          }, "_defineReplCommands");
          const replServer = repl.start({
            useColors: true,
            prompt: "QCObjects Collab> ",
            terminal: true,
            useGlobal: false
          });
          replServer.context = globalContext;
          replServer.on("exit", () => {
            unlink_socket();
            console.log("Thank you for using QCObjects Collab for Data Science!");
            console.log("Have a nice day!");
            process.exit();
          });
          _defineReplCommands(replServer, collabServer.commands);
          const unixsocket_server = net.createServer(function(unixsocket) {
            unixsocket.on("end", () => {
              logger.debug("A Unix socket connection was ended");
            });
            global.connections += 1;
            const unixReplServer = repl.start({
              prompt: "QCObjects Collab> ",
              input: unixsocket,
              output: unixsocket,
              terminal: true,
              useGlobal: false
            });
            unixReplServer.on("exit", function() {
              unixsocket.end();
            });
            unixReplServer.context = global;
            _defineReplCommands(unixReplServer, collabServer.commands);
          }).listen(CONFIG.get("collab-unix-socket", unixsocket_default));
          const http_server = net.createServer(function(httpsocket) {
            httpsocket.on("end", () => {
              logger.debug("A http connection was ended");
            });
            global.connections += 1;
            const httpReplServer = repl.start({
              prompt: "QCObjects Collab> ",
              input: httpsocket,
              output: httpsocket,
              terminal: true,
              useGlobal: false
            });
            httpReplServer.on("exit", function() {
              httpsocket.end();
            });
            httpReplServer.context = global;
            _defineReplCommands(httpReplServer, collabServer.commands);
          }).listen(CONFIG.get("collab-port", collab_port_default), CONFIG.get("collab-domain", collab_domain_default));
          http_server.on("error", function(e) {
            if (e.code == "EADDRINUSE") {
              console.log("Collab HTTP Address in use, retrying...");
              setTimeout(function() {
                http_server.close();
                http_server.listen(CONFIG.get("collab-port", collab_port_default), CONFIG.get("collab-domain", collab_domain_default));
              }, 1e3);
            }
          });
          unixsocket_server.on("error", function(e) {
            if (e.code == "EADDRINUSE") {
              console.log("Collab Unix Socket Address in use, retrying...");
              setTimeout(function() {
                unixsocket_server.close();
                unixsocket_server.listen(CONFIG.get("collab-unix-socket", unixsocket_default));
              }, 1e3);
            }
          });
        }
      }
      Package("org.quickcorp.qcobjects.collab.server", [
        CollabServer
      ]);
      exports = { CollabServer };
    })();
  }
});
export default require_org_quickcorp_qcobjects_collab_server();
//# sourceMappingURL=org.quickcorp.qcobjects.collab.server.mjs.map
