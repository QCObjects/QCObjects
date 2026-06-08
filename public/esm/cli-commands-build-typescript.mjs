var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "node:path";
import ts from "typescript";
import { Package, InheritClass, logger } from "qcobjects";
class CommandHandler extends InheritClass {
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
          logger.info(`[build:typescript] Building TypeScript with config file: ${configFile}...`);
          const configPath = path.resolve(process.cwd(), configFile);
          const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
            ...ts.sys,
            onUnRecoverableConfigFileDiagnostic: /* @__PURE__ */ __name((diagnostic) => {
              logger.warn(ts.formatDiagnostic(diagnostic, {
                getCanonicalFileName: /* @__PURE__ */ __name((fileName) => fileName, "getCanonicalFileName"),
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getNewLine: /* @__PURE__ */ __name(() => ts.sys.newLine, "getNewLine")
              }));
              process.exit(1);
            }, "onUnRecoverableConfigFileDiagnostic")
          });
          if (!parsedCommandLine) {
            logger.warn("Failed to parse tsconfig file");
            process.exit(1);
          }
          const program = ts.createProgram({
            rootNames: parsedCommandLine.fileNames,
            options: parsedCommandLine.options
          });
          const emitResult = program.emit();
          const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);
          allDiagnostics.forEach((diagnostic) => {
            if (diagnostic.file && diagnostic.start) {
              const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
              const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n");
              logger.warn(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
              logger.warn(ts.flattenDiagnosticMessageText(diagnostic.messageText, "\n"));
            }
          });
          const emittedFiles = emitResult.emittedFiles || [];
          if (emittedFiles.length > 0) {
            logger.info("Emitted files:");
            emittedFiles.forEach((file) => logger.info(file));
          }
          const exitCode = emitResult.emitSkipped ? 1 : 0;
          logger.info(`Process completed with code '${exitCode}'.`);
          if (exitCode !== 0) {
            process.exit(exitCode);
          }
        } catch (e) {
          logger.warn(`Something went wrong trying to build TypeScript: ${e.message}`);
          process.exit(1);
        }
      }
    };
    const commandHandler = this;
    logger.debug("Loading command build:typescript...");
    const buildCommand = switchCommander.program.command("build:typescript <configFile>").allowExcessArguments(false).description("Builds TypeScript files using the specified config file").action(function(configFile) {
      commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
    });
    switchCommander.program.command("build:ts <configFile>").allowExcessArguments(false).description("Alias for build:typescript - Builds TypeScript files using the specified config file").action(function(configFile) {
      commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
    });
    logger.debug("Loading command build:typescript... DONE.");
  }
}
Package("com.qcobjects.cli.commands.build.typescript", [
  CommandHandler
]);
export {
  CommandHandler
};
//# sourceMappingURL=cli-commands-build-typescript.mjs.map
