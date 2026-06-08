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
import fs from "node:fs";

import { Package, InheritClass, _DataStringify, New, CONFIG, logger } from "qcobjects";
const absolutePath = path.resolve(__dirname, "./");

export class CommandHandler extends InheritClass {
  choiceOption: {
    [x: string]: any; publish_static: (source:string, dest:string, options:any) => void;
  };

  constructor({
    switchCommander
  }: { switchCommander: any }) {
    super({ switchCommander });
    this.choiceOption = {
      publish_static(source, dest, options) {

        const copyDir = (source:string, dest:string, exclude:string) => {
          source = path.resolve(source);
          dest = path.resolve(dest);
          const dname = path.basename(source);
          const dirExcluded = (exclude.includes(dname));
  
          const isDir = (d:string) => {
            return (fs.existsSync(d) && fs.statSync(d).isDirectory())?(true):(false);
          };
  
          const isFile = (d:string) => {
            return (fs.existsSync(d) && fs.statSync(d).isFile())?(true):(false);
          };
  
          if (isDir(source) && !dirExcluded){
            fs.mkdirSync(dest, {recursive:true});
            const paths = fs.readdirSync(source, {withFileTypes:true});
            const dirs = paths.filter(d=>d.isDirectory());
            const files = paths.filter(f=>f.isFile());
            void ((paths, dirs, files, exclude) => {
              files.forEach((f) => {
                const sourceFile = path.resolve(source, f.name);
                const destFile = path.resolve(dest, f.name);
                const fileExcluded = exclude.includes(f.name);
                if (isFile(sourceFile) && !fileExcluded) {
                  logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
                  fs.copyFileSync(sourceFile, destFile);
                  logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
                }
              });
              dirs.forEach((d) => {
                const sourceDir = path.resolve(source, d.name);
                const destDir = path.resolve(dest, d.name);
                copyDir(sourceDir, destDir, exclude);
              });
            })(paths, dirs, files, exclude);
          }
  
        };
  
        try {
          logger.info(`[publish:static] Copying files from ${source} to ${dest} excluding ${options.exclude}...`);
          copyDir(source, dest, (typeof options.exclude !== "undefined") ? (options.exclude) : ([]));
        } catch (e:any) {
          logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
          process.exit(1);
        }
      }
  
    };

    const commandHandler = this;
    logger.debug("Loading command publish-static...");

    switchCommander.program.command("publish:static <source> <dest>")
      .allowExcessArguments(false)
      .option("-e, --exclude <excludePaths...>", "Exclude some paths or files")
      .description("Publishes (copy) all files and directories from source to dest")
      .action(function (source:string, dest:string, options:any) {
        commandHandler.choiceOption.publish_static.call(commandHandler, source, dest, options);
      });

    logger.debug("Loading command publish-static... DONE.");
  }


}


Package("com.qcobjects.cli.commands.jira", [
  CommandHandler
]);
