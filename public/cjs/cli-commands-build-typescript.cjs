"use strict";
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
var cli_commands_build_typescript_exports = {};
__export(cli_commands_build_typescript_exports, {
  CommandHandler: () => CommandHandler
});
module.exports = __toCommonJS(cli_commands_build_typescript_exports);
var import_node_path = __toESM(require("node:path"));
var import_typescript = __toESM(require("typescript"));
var import_qcobjects = require("qcobjects");
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
      build_typescript(configFile) {
        try {
          import_qcobjects.logger.info(`[build:typescript] Building TypeScript with config file: ${configFile}...`);
          const configPath = import_node_path.default.resolve(process.cwd(), configFile);
          const parsedCommandLine = import_typescript.default.getParsedCommandLineOfConfigFile(configPath, {}, {
            ...import_typescript.default.sys,
            onUnRecoverableConfigFileDiagnostic: /* @__PURE__ */ __name((diagnostic) => {
              import_qcobjects.logger.warn(import_typescript.default.formatDiagnostic(diagnostic, {
                getCanonicalFileName: /* @__PURE__ */ __name((fileName) => fileName, "getCanonicalFileName"),
                getCurrentDirectory: import_typescript.default.sys.getCurrentDirectory,
                getNewLine: /* @__PURE__ */ __name(() => import_typescript.default.sys.newLine, "getNewLine")
              }));
              process.exit(1);
            }, "onUnRecoverableConfigFileDiagnostic")
          });
          if (!parsedCommandLine) {
            import_qcobjects.logger.warn("Failed to parse tsconfig file");
            process.exit(1);
          }
          const program = import_typescript.default.createProgram({
            rootNames: parsedCommandLine.fileNames,
            options: parsedCommandLine.options
          });
          const emitResult = program.emit();
          const allDiagnostics = import_typescript.default.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
          allDiagnostics.forEach((diagnostic) => {
            if (diagnostic.file && diagnostic.start) {
              const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
              const message = import_typescript.default.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
              import_qcobjects.logger.warn(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
              import_qcobjects.logger.warn(import_typescript.default.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
            }
          });
          const emittedFiles = emitResult.emittedFiles || [];
          if (emittedFiles.length > 0) {
            import_qcobjects.logger.info("Emitted files:");
            emittedFiles.forEach((file) => import_qcobjects.logger.info(file));
          }
          const exitCode = emitResult.emitSkipped ? 1 : 0;
          import_qcobjects.logger.info(`Process completed with code '${exitCode}'.`);
          if (exitCode !== 0) {
            process.exit(exitCode);
          }
        } catch (e) {
          import_qcobjects.logger.warn(`Something went wrong trying to build TypeScript: ${e.message}`);
          process.exit(1);
        }
      }
    };
    const commandHandler = this;
    import_qcobjects.logger.debug("Loading command build:typescript...");
    const buildCommand = switchCommander.program.command("build:typescript <configFile>").allowExcessArguments(false).description("Builds TypeScript files using the specified config file").action(function(configFile) {
      commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
    });
    switchCommander.program.command("build:ts <configFile>").allowExcessArguments(false).description("Alias for build:typescript - Builds TypeScript files using the specified config file").action(function(configFile) {
      commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
    });
    import_qcobjects.logger.debug("Loading command build:typescript... DONE.");
  }
}
(0, import_qcobjects.Package)("com.qcobjects.cli.commands.build.typescript", [
  CommandHandler
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandHandler
});
//# sourceMappingURL=cli-commands-build-typescript.cjs.map
