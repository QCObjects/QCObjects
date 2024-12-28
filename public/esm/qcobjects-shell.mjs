#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import path from "path";
import vm from "vm";
import { InheritClass, global } from "qcobjects";
import "./defaultsettings";
import readline from "readline";
var require_qcobjects_shell = __commonJS({
  "src/qcobjects-shell.ts"(exports, module) {
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
    const absolutePath = path.resolve(__dirname, "./");
    class Main extends InheritClass {
      static {
        __name(this, "Main");
      }
      constructor() {
        super();
        this.start();
      }
      start() {
        const sandbox = {
          require,
          module,
          __dirname: "./",
          __filename: "qcobjects-shell-file.js"
        };
        global.context = vm.createContext(sandbox);
        const runScript = /* @__PURE__ */ __name((code, logOutput = false) => {
          const options = { filename: sandbox.__filename };
          const backgroundRunScript = /* @__PURE__ */ __name((code2) => {
            var output2 = vm.runInContext(code2, global.context, options);
            return output2;
          }, "backgroundRunScript");
          var output = backgroundRunScript(code);
          if (logOutput && typeof output !== "undefined") {
            console.log(output);
          }
        }, "runScript");
        const syncGlobal = /* @__PURE__ */ __name(() => {
          var s = "Object.assign(this,this.constructor.constructor('return this')())";
          runScript(s);
        }, "syncGlobal");
        readline.emitKeypressEvents(process.stdin);
        if (process.stdin.isTTY)
          process.stdin.setRawMode(true);
        const qcobjects_version = global.__get_version_string__();
        const rl = readline.createInterface({
          input: process.stdin,
          output: process.stdout,
          prompt: qcobjects_version + " >"
        });
        const protected_symbols = [
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
        const preloaded_scripts = [
          "require('qcobjects')",
          "Object.assign(this,this.constructor.constructor('return this')())"
        ];
        preloaded_scripts.map(
          (preloaded_script) => runScript(preloaded_script.trim())
        );
        console.log(welcometo);
        console.log(logo);
        console.log(instructions);
        rl.prompt(true);
        rl.on("line", (line) => {
          var codeline = line.trim();
          switch (true) {
            case codeline == "hello":
              console.log("world!");
              break;
            case codeline == ".exit":
              rl.close();
              break;
            default:
              try {
                runScript(codeline, true);
                syncGlobal.bind(sandbox)();
              } catch (e) {
                console.log("An exeption ocurred while trying to run your awesome code! ");
                console.log(e);
              }
              break;
          }
          rl.prompt();
        }).on("close", () => {
          console.log("Thank you for using QCObjects.");
          console.log("Have a nice day!");
          process.exit(0);
        });
      }
    }
  }
});
export default require_qcobjects_shell();
//# sourceMappingURL=qcobjects-shell.mjs.map
