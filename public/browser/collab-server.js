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
  var collab_server_exports = {};
  __export(collab_server_exports, {
    CollabServer: () => CollabServer
  });
  var import_qcobjects = require("qcobjects");
  var import_os = __toESM(require("os"));
  var import_fs = __toESM(require("fs"));
  var import_node_net = __toESM(require("node:net"));
  var import_node_repl = __toESM(require("node:repl"));
  var import_node_vm = __toESM(require("node:vm"));
  var import_path = __toESM(require("path"));
  var import_child_process = require("child_process");
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
  const absolutePath = import_path.default.resolve(__dirname, "./");
  console.log(welcometo);
  console.log(logo);
  const unixsocket_default = import_os.default.tmpdir() + "/qcobjects-collab-socket" + Date.now().toString();
  const collab_port_default = 10300;
  const collab_domain_default = "0.0.0.0";
  const sandbox = {
    require,
    module,
    __dirname: "./",
    __filename: "qcobjects-collab"
  };
  class CollabServer extends import_qcobjects.InheritClass {
    static {
      __name(this, "CollabServer");
    }
    protected_symbols;
    replServer;
    commands;
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
                import_qcobjects.logger.debug(`Executing... ${cmdArguments}`);
                (0, import_child_process.exec)(cmdArguments, (err, stdout, stderr) => {
                  try {
                    _rplServer.context[_variableName] = JSON.parse(stdout);
                  } catch (e) {
                    import_qcobjects.logger.debug("It was not possible to parse the data.");
                  }
                  _rplServer.displayPrompt();
                }).stdout?.on("data", function(data) {
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
            const _rplServer = replServer;
            var commandArgs = args.split(" ");
            if (commandArgs.length > 2) {
              var _variableName = commandArgs[0];
              var _equal_sign = commandArgs[1].toString();
              if (_equal_sign === "=") {
                var cmdArguments = commandArgs.slice(2).join(" ");
                _rplServer.clearBufferedCommand();
                import_qcobjects.logger.debug(`Executing... ${cmdArguments}`);
                (0, import_child_process.exec)(cmdArguments, (err, stdout, stderr) => {
                  _rplServer.context[_variableName] = stdout;
                  _rplServer.displayPrompt();
                }).stdout?.on("data", function(data) {
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
            const _rplServer = replServer;
            var commandArgs = args.split(" ");
            if (commandArgs.length >= 2) {
              var _variableName = commandArgs[0];
              var _filename = commandArgs[1].toString();
              import_qcobjects.logger.debug(`Saving variable ${_variableName} in ${_filename}...`);
              var data = JSON.stringify(_rplServer.context[_variableName]);
              import_fs.default.writeFile(_filename, data, (err) => {
                if (err) throw err;
                import_qcobjects.logger.debug(`The data of the file ${_filename} has been saved!`);
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
            const _rplServer = replServer;
            var commandArgs = args.split(" ");
            if (commandArgs.length > 2) {
              var _variableName = commandArgs[0];
              var _equal_sign = commandArgs[1].toString();
              if (_equal_sign === "=") {
                var _filename = commandArgs[2].toString();
                import_qcobjects.logger.debug(`Trying to read ${_variableName} from ${_filename}...`);
                import_fs.default.readFile(_filename, (err, data) => {
                  if (err) throw err;
                  try {
                    _rplServer.context[_variableName] = JSON.parse(data.toString());
                    import_qcobjects.logger.debug(`The data of the file ${_filename} has been loaded!`);
                  } catch (e) {
                    import_qcobjects.logger.debug("It was not possible to parse the data.");
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
            const _rplServer = replServer;
            var cmdArguments = args.join(" ");
            _rplServer.clearBufferedCommand();
            import_qcobjects.logger.debug(`Executing... ${cmdArguments}`);
            (0, import_child_process.exec)(cmdArguments, (err, stdout, stderr) => {
              _rplServer.displayPrompt();
            }).stdout?.on("data", function(data) {
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
          var output2 = import_node_vm.default.runInContext(code2, context, options);
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
      import_qcobjects.global.require = require.bind(import_qcobjects.global);
      import_qcobjects.global.module = module;
      import_qcobjects.global.__dirname = "./";
      import_qcobjects.global.__filename = "qcobjects-collab";
      const globalContext = import_node_vm.default.createContext(import_qcobjects.global);
      globalContext.connections = 0;
      function unlink_socket() {
        try {
          import_qcobjects.logger.debug("Trying to delete the socket... ");
          import_fs.default.unlink(import_qcobjects.CONFIG.get("collab-unix-socket", unixsocket_default), (err) => {
            if (err) {
              import_qcobjects.logger.debug("Unix Socket does not exist");
            }
            import_qcobjects.logger.debug("Unix Socket was deleted before start");
          });
        } catch (e) {
          import_qcobjects.logger.debug("Unix Socket was not deleted");
        }
      }
      __name(unlink_socket, "unlink_socket");
      unlink_socket();
      var _defineReplCommands = /* @__PURE__ */ __name(function(_cmdReplServer, commands) {
        for (var _command in commands) {
          _cmdReplServer.defineCommand(_command, commands[_command]);
        }
      }, "_defineReplCommands");
      const replServer = import_node_repl.default.start({
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
      const unixsocket_server = import_node_net.default.createServer(function(unixsocket) {
        unixsocket.on("end", () => {
          import_qcobjects.logger.debug("A Unix socket connection was ended");
        });
        import_qcobjects.global.connections += 1;
        const unixReplServer = import_node_repl.default.start({
          prompt: "QCObjects Collab> ",
          input: unixsocket,
          output: unixsocket,
          terminal: true,
          useGlobal: false
        });
        unixReplServer.on("exit", function() {
          unixsocket.end();
        });
        unixReplServer.context.global = import_qcobjects.global;
        _defineReplCommands(unixReplServer, collabServer.commands);
      }).listen(import_qcobjects.CONFIG.get("collab-unix-socket", unixsocket_default));
      const http_server = import_node_net.default.createServer(function(httpsocket) {
        httpsocket.on("end", () => {
          import_qcobjects.logger.debug("A http connection was ended");
        });
        import_qcobjects.global.connections += 1;
        const httpReplServer = import_node_repl.default.start({
          prompt: "QCObjects Collab> ",
          input: httpsocket,
          output: httpsocket,
          terminal: true,
          useGlobal: false
        });
        httpReplServer.on("exit", function() {
          httpsocket.end();
        });
        httpReplServer.context.global = import_qcobjects.global;
        _defineReplCommands(httpReplServer, collabServer.commands);
      }).listen(import_qcobjects.CONFIG.get("collab-port", collab_port_default), import_qcobjects.CONFIG.get("collab-domain", collab_domain_default));
      http_server.on("error", function(e) {
        if (e.code == "EADDRINUSE") {
          console.log("Collab HTTP Address in use, retrying...");
          setTimeout(function() {
            http_server.close();
            http_server.listen(import_qcobjects.CONFIG.get("collab-port", collab_port_default), import_qcobjects.CONFIG.get("collab-domain", collab_domain_default));
          }, 1e3);
        }
      });
      unixsocket_server.on("error", function(e) {
        if (e.code == "EADDRINUSE") {
          console.log("Collab Unix Socket Address in use, retrying...");
          setTimeout(function() {
            unixsocket_server.close();
            unixsocket_server.listen(import_qcobjects.CONFIG.get("collab-unix-socket", unixsocket_default));
          }, 1e3);
        }
      });
    }
  }
  (() => {
    if (process.argv.length < 3) {
      console.log(instructions);
      const collabinstructions = `
Collab for Data Science
=======================

QCObjects Collab is a tool that helps you to make data science math using JavaScript

You can use a TCP socket to connect yourself to the engine:

> ssh user@${import_qcobjects.CONFIG.get("domain", collab_domain_default)} nc ${import_qcobjects.CONFIG.get("collab-domain", collab_domain_default)} ${import_qcobjects.CONFIG.get("collab-port", collab_port_default)}

You can also use a Unix Socket to connect yourself to the engine:

> ssh user@${import_qcobjects.CONFIG.get("domain", collab_domain_default)} nc -U ${import_qcobjects.CONFIG.get("collab-unix-socket", unixsocket_default)}

(change "user" for whathever your username is!)

`;
      console.log(collabinstructions);
    }
    (0, import_qcobjects.Package)("org.quickcorp.qcobjects.collab.server", [
      CollabServer
    ]);
  })();
  return __toCommonJS(collab_server_exports);
})();
//# sourceMappingURL=collab-server.js.map
