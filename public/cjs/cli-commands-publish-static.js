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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = __importDefault(require("node:fs"));
const qcobjects_1 = require("qcobjects");
const absolutePath = node_path_1.default.resolve(__dirname, "./");
class CommandHandler extends qcobjects_1.InheritClass {
    choiceOption;
    constructor({ switchCommander }) {
        super({ switchCommander });
        this.choiceOption = {
            publish_static(source, dest, options) {
                const copyDir = (source, dest, exclude) => {
                    source = node_path_1.default.resolve(source);
                    dest = node_path_1.default.resolve(dest);
                    const dname = node_path_1.default.basename(source);
                    const dirExcluded = (exclude.includes(dname));
                    const isDir = (d) => {
                        return (node_fs_1.default.existsSync(d) && node_fs_1.default.statSync(d).isDirectory()) ? (true) : (false);
                    };
                    const isFile = (d) => {
                        return (node_fs_1.default.existsSync(d) && node_fs_1.default.statSync(d).isFile()) ? (true) : (false);
                    };
                    if (isDir(source) && !dirExcluded) {
                        node_fs_1.default.mkdirSync(dest, { recursive: true });
                        const paths = node_fs_1.default.readdirSync(source, { withFileTypes: true });
                        const dirs = paths.filter(d => d.isDirectory());
                        const files = paths.filter(f => f.isFile());
                        void ((paths, dirs, files, exclude) => {
                            files.forEach((f) => {
                                const sourceFile = node_path_1.default.resolve(source, f.name);
                                const destFile = node_path_1.default.resolve(dest, f.name);
                                const fileExcluded = exclude.includes(f.name);
                                if (isFile(sourceFile) && !fileExcluded) {
                                    qcobjects_1.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
                                    node_fs_1.default.copyFileSync(sourceFile, destFile);
                                    qcobjects_1.logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
                                }
                            });
                            dirs.forEach((d) => {
                                const sourceDir = node_path_1.default.resolve(source, d.name);
                                const destDir = node_path_1.default.resolve(dest, d.name);
                                copyDir(sourceDir, destDir, exclude);
                            });
                        })(paths, dirs, files, exclude);
                    }
                };
                try {
                    qcobjects_1.logger.info(`[publish:static] Copying files from ${source} to ${dest} excluding ${options.exclude}...`);
                    copyDir(source, dest, (typeof options.exclude !== "undefined") ? (options.exclude) : ([]));
                }
                catch (e) {
                    qcobjects_1.logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
                    process.exit(1);
                }
            }
        };
        const commandHandler = this;
        qcobjects_1.logger.debug("Loading command publish-static...");
        switchCommander.program.command("publish:static <source> <dest>")
            .allowExcessArguments(false)
            .option("-e, --exclude <excludePaths...>", "Exclude some paths or files")
            .description("Publishes (copy) all files and directories from source to dest")
            .action(function (source, dest, options) {
            commandHandler.choiceOption.publish_static.call(commandHandler, source, dest, options);
        });
        qcobjects_1.logger.debug("Loading command publish-static... DONE.");
    }
}
exports.CommandHandler = CommandHandler;
(0, qcobjects_1.Package)("com.qcobjects.cli.commands.jira", [
    CommandHandler
]);
//# sourceMappingURL=cli-commands-publish-static.js.map