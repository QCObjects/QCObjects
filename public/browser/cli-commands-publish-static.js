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
  var cli_commands_publish_static_exports = {};
  __export(cli_commands_publish_static_exports, {
    CommandHandler: () => CommandHandler
  });
  var import_node_path = __toESM(require("node:path"));
  var import_node_fs = __toESM(require("node:fs"));
  var import_qcobjects = require("qcobjects");
  const absolutePath = import_node_path.default.resolve(__dirname, "./");
  class CommandHandler extends import_qcobjects.InheritClass {
    static {
      __name(this, "CommandHandler");
    }
    choiceOption;
    constructor({
      switchCommander
    }) {
      super({ switchCommander });
      this.choiceOption = {
        publish_static(source, dest, options) {
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
              void ((paths2, dirs2, files2, exclude2) => {
                files2.forEach((f) => {
                  const sourceFile = import_node_path.default.resolve(source2, f.name);
                  const destFile = import_node_path.default.resolve(dest2, f.name);
                  const fileExcluded = exclude2.includes(f.name);
                  if (isFile(sourceFile) && !fileExcluded) {
                    import_qcobjects.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2}...`);
                    import_node_fs.default.copyFileSync(sourceFile, destFile);
                    import_qcobjects.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2}...DONE!`);
                  }
                });
                dirs2.forEach((d) => {
                  const sourceDir = import_node_path.default.resolve(source2, d.name);
                  const destDir = import_node_path.default.resolve(dest2, d.name);
                  copyDir(sourceDir, destDir, exclude2);
                });
              })(paths, dirs, files, exclude);
            }
          }, "copyDir");
          try {
            import_qcobjects.logger.info(`[publish:static] Copying files from ${source} to ${dest} excluding ${options.exclude}...`);
            copyDir(source, dest, typeof options.exclude !== "undefined" ? options.exclude : []);
          } catch (e) {
            import_qcobjects.logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
            process.exit(1);
          }
        }
      };
      const commandHandler = this;
      import_qcobjects.logger.debug("Loading command publish-static...");
      switchCommander.program.command("publish:static <source> <dest>").allowExcessArguments(false).option("-e, --exclude <excludePaths...>", "Exclude some paths or files").description("Publishes (copy) all files and directories from source to dest").action(function(source, dest, options) {
        commandHandler.choiceOption.publish_static.call(commandHandler, source, dest, options);
      });
      import_qcobjects.logger.debug("Loading command publish-static... DONE.");
    }
  }
  (0, import_qcobjects.Package)("com.qcobjects.cli.commands.jira", [
    CommandHandler
  ]);
  return __toCommonJS(cli_commands_publish_static_exports);
})();
//# sourceMappingURL=cli-commands-publish-static.js.map
