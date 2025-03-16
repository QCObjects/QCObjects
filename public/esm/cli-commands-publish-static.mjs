var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "node:path";
import fs from "node:fs";
import { Package, InheritClass, logger } from "qcobjects";
const absolutePath = path.resolve(__dirname, "./");
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
      publish_static(source, dest, options) {
        const copyDir = /* @__PURE__ */ __name((source2, dest2, exclude) => {
          source2 = path.resolve(source2);
          dest2 = path.resolve(dest2);
          const dname = path.basename(source2);
          const dirExcluded = exclude.includes(dname);
          const isDir = /* @__PURE__ */ __name((d) => {
            return fs.existsSync(d) && fs.statSync(d).isDirectory() ? true : false;
          }, "isDir");
          const isFile = /* @__PURE__ */ __name((d) => {
            return fs.existsSync(d) && fs.statSync(d).isFile() ? true : false;
          }, "isFile");
          if (isDir(source2) && !dirExcluded) {
            fs.mkdirSync(dest2, { recursive: true });
            const paths = fs.readdirSync(source2, { withFileTypes: true });
            const dirs = paths.filter((d) => d.isDirectory());
            const files = paths.filter((f) => f.isFile());
            void ((paths2, dirs2, files2, exclude2) => {
              files2.forEach((f) => {
                const sourceFile = path.resolve(source2, f.name);
                const destFile = path.resolve(dest2, f.name);
                const fileExcluded = exclude2.includes(f.name);
                if (isFile(sourceFile) && !fileExcluded) {
                  logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2}...`);
                  fs.copyFileSync(sourceFile, destFile);
                  logger.debug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude2}...DONE!`);
                }
              });
              dirs2.forEach((d) => {
                const sourceDir = path.resolve(source2, d.name);
                const destDir = path.resolve(dest2, d.name);
                copyDir(sourceDir, destDir, exclude2);
              });
            })(paths, dirs, files, exclude);
          }
        }, "copyDir");
        try {
          logger.info(`[publish:static] Copying files from ${source} to ${dest} excluding ${options.exclude}...`);
          copyDir(source, dest, typeof options.exclude !== "undefined" ? options.exclude : []);
        } catch (e) {
          logger.warn(`Something went wrong trying to publish static files: ${e.message}`);
          process.exit(1);
        }
      }
    };
    const commandHandler = this;
    logger.debug("Loading command publish-static...");
    switchCommander.program.command("publish:static <source> <dest>").allowExcessArguments(false).option("-e, --exclude <excludePaths...>", "Exclude some paths or files").description("Publishes (copy) all files and directories from source to dest").action(function(source, dest, options) {
      commandHandler.choiceOption.publish_static.call(commandHandler, source, dest, options);
    });
    logger.debug("Loading command publish-static... DONE.");
  }
}
Package("com.qcobjects.cli.commands.jira", [
  CommandHandler
]);
export {
  CommandHandler
};
//# sourceMappingURL=cli-commands-publish-static.mjs.map
