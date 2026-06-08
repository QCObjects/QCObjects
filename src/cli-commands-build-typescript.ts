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
import path from "node:path";
import ts from "typescript";
import { Package, InheritClass, logger } from "qcobjects";

export class CommandHandler extends InheritClass {
  choiceOption: {
    [x: string]: any;
    build_typescript: (configFile: string) => void;
  };

  constructor({
    switchCommander
  }: { switchCommander: any }) {
    super({ switchCommander });
    this.choiceOption = {
      build_typescript(configFile) {
        try {
          logger.info(`[build:typescript] Building TypeScript with config file: ${configFile}...`);
          
          // Resolve the path to the tsconfig file
          const configPath = path.resolve(process.cwd(), configFile);

          // Parse the tsconfig file
          const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
            ...ts.sys,
            onUnRecoverableConfigFileDiagnostic: diagnostic => {
              logger.warn(ts.formatDiagnostic(diagnostic, {
                getCanonicalFileName: (fileName) => fileName,
                getCurrentDirectory: ts.sys.getCurrentDirectory,
                getNewLine: () => ts.sys.newLine,
              }));
              process.exit(1);
            }
          });

          if (!parsedCommandLine) {
            logger.warn('Failed to parse tsconfig file');
            process.exit(1);
          }

          // Create a program with the parsed settings
          const program = ts.createProgram({
            rootNames: parsedCommandLine.fileNames,
            options: parsedCommandLine.options,
          });

          // Emit the compiled files
          const emitResult = program.emit();

          // Report any diagnostics (errors or warnings)
          const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

          allDiagnostics.forEach(diagnostic => {
            if (diagnostic.file && diagnostic.start) {
              const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
              const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
              logger.warn(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
            } else {
              logger.warn(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
            }
          });

          // Check if any files were emitted
          const emittedFiles = emitResult.emittedFiles || [];
          if (emittedFiles.length > 0) {
            logger.info('Emitted files:');
            emittedFiles.forEach(file => logger.info(file));
          }

          // Exit with an appropriate code
          const exitCode = emitResult.emitSkipped ? 1 : 0;
          logger.info(`Process completed with code '${exitCode}'.`);
          if (exitCode !== 0) {
            process.exit(exitCode);
          }
        } catch (e: any) {
          logger.warn(`Something went wrong trying to build TypeScript: ${e.message}`);
          process.exit(1);
        }
      }
    };

    const commandHandler = this;
    logger.debug("Loading command build:typescript...");

    // Register both commands
    const buildCommand = switchCommander.program.command("build:typescript <configFile>")
      .allowExcessArguments(false)
      .description("Builds TypeScript files using the specified config file")
      .action(function (configFile: string) {
        commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
      });

    // Add alias
    switchCommander.program.command("build:ts <configFile>")
      .allowExcessArguments(false)
      .description("Alias for build:typescript - Builds TypeScript files using the specified config file")
      .action(function (configFile: string) {
        commandHandler.choiceOption.build_typescript.call(commandHandler, configFile);
      });

    logger.debug("Loading command build:typescript... DONE.");
  }
}

Package("com.qcobjects.cli.commands.build.typescript", [
  CommandHandler
]); 