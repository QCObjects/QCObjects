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
var cli_commands_version_exports = {};
__export(cli_commands_version_exports, {
  CommandHandler: () => CommandHandler
});
module.exports = __toCommonJS(cli_commands_version_exports);
var import_node_fs = __toESM(require("node:fs"));
var import_qcobjects = require("qcobjects");
class CommandHandler extends import_qcobjects.InheritClass {
  static {
    __name(this, "CommandHandler");
  }
  choiceOption;
  switchCommander;
  constructor({ switchCommander }) {
    super({ switchCommander });
    this.switchCommander = switchCommander;
    const commandHandler = this;
    this.choiceOption = {
      v_major(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major: major + 1, minor, patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_minor(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major, minor: minor + 1, patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_patch(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major, minor, patch: patch + 1 }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_sync(filename, options) {
        filename = typeof filename === "undefined" ? "VERSION" : filename;
        var commandHandler2 = this;
        commandHandler2.switchCommander.shellCommands([
          "echo $(git describe)"
        ]).then(function(response) {
          const versionString = response[0].split("-")[0].slice(1).replace("\n", "");
          console.log(versionString);
          const versionSuffix = commandHandler2.parseVersionSuffix(versionString);
          const versionObject = commandHandler2.parseVersionString(versionString);
          const major = parseInt(versionObject.major);
          const minor = parseInt(versionObject.minor);
          const patch = parseInt(versionObject.patch);
          const newVersion = commandHandler2.buildNewVersionString({ major, minor, patch }, versionSuffix);
          commandHandler2.saveNewVersionFile(filename, newVersion);
          var commitMsg = options.commitMsg || `Synced Version v${newVersion}`;
          commandHandler2.switchCommander.shellCommands(
            [
              "git fetch --tags -f",
              `git add . && git commit -am "${commitMsg}"`,
              "git fetch origin --tags",
              "git tag -ln",
              `npm version "${newVersion}" --allow-same-version -m "${commitMsg}"`,
              "git push && git push --tags"
            ]
          ).then(function(response2) {
            console.log(response2);
          });
        });
      },
      v_changelog() {
        const commandHandler2 = this;
        commandHandler2.switchCommander.shellCommands(
          [
            "git tag -ln"
          ]
        ).then(function(response) {
          var versionTags = response[0].split("\n").map((tag) => tag.split(" ").unique()).unique().map(
            (tag) => {
              return {
                "version": tag[0],
                "major": tag[0].split(".")[0],
                "minor": tag[0].split(".")[0] + "." + tag[0].split(".")[1],
                "description": tag.slice(1).join(" ").trim()
              };
            }
          );
          var minorVersionTags = versionTags.filter((tag) => tag.version !== "").map((tag) => tag.version.split(".")[0] + "." + tag.version.split(".")[1]).unique();
          var history = minorVersionTags.map((minor) => {
            return {
              "major": minor.split(".")[0],
              "minor": minor,
              "history": "\n	- " + versionTags.filter((tag) => tag.minor === minor).map(
                function(tag) {
                  return tag.description;
                }
              ).filter((desc) => !desc.startsWith(minor.slice(1))).sort().unique().join("\n	- ")
            };
          }).map((hist) => {
            return `## ${hist.major} -> ${hist.minor}
` + hist.history;
          }).join("\n");
          const subtitle = "This is an automatic Changelog history of versions generated using the command: **qcobjects v-changelog > CHANGELOG.md**";
          console.log("# Changelog \n\n" + subtitle + "\n\n" + history);
        });
      }
    };
    switchCommander.program.command("v-major [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new major version").action(function(args, options) {
      commandHandler.choiceOption.v_major.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-minor [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new minor version").action(function(args, options) {
      commandHandler.choiceOption.v_minor.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-patch [filename]").option("--git, --sync-git", "Sync with Git").option("--npm, --sync-npm", "Sync with NPM").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Upgrade to a new patch version").action(function(args, options) {
      commandHandler.choiceOption.v_patch.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-sync [filename]").option("-m, --commit-msg [message]", "Commit Message").description("Semantic Versioning: Sync the version of NPM with version of GIT").action(function(args, options) {
      commandHandler.choiceOption.v_sync.call(commandHandler, args, options);
    });
    switchCommander.program.command("v-changelog").description("Semantic Versioning: Shows a changelog using Semantic Versioning").action(function(args, options) {
      commandHandler.choiceOption.v_changelog.call(commandHandler);
    });
  }
  syncGit(versionString, commitMsg, syncNpm = false) {
    let _commands_ = [];
    if (syncNpm) {
      _commands_ = _commands_.concat(
        [
          "git fetch --tags -f",
          `npm version "${versionString}" -m "${commitMsg}"`
        ]
      );
    }
    _commands_ = _commands_.concat(
      [
        `git add . && git commit -am "${commitMsg}"`,
        "git fetch origin --tags",
        "git tag -ln"
      ]
    );
    if (!syncNpm) {
      _commands_ = _commands_.concat(
        [
          `git tag -a "v${versionString}" -m "${commitMsg}"`
        ]
      );
    }
    _commands_ = _commands_.concat(
      [
        "git push && git push --tags"
      ]
    );
    this.switchCommander.shellCommands(_commands_).then(function(response) {
      import_qcobjects.logger.info("Synced to Git");
      import_qcobjects.logger.debug(response);
    }).catch(function(e) {
      import_qcobjects.logger.info("Something went wrong trying to sync to git");
      import_qcobjects.logger.debug(e);
    });
  }
  parseVersionString(versionString) {
    versionString = versionString.replace("\n", "");
    const regexpVer = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    const versionObject = { ...versionString.match(regexpVer)?.groups };
    return versionObject;
  }
  getVersionStringFromFile(filename) {
    let versionString;
    try {
      versionString = import_node_fs.default.readFileSync(filename).toString().replace("\n", "");
    } catch (e) {
      versionString = "0.0.1";
    }
    return versionString;
  }
  buildNewSemVersionString({ major, minor, patch }) {
    return `${major}.${minor}.${patch}`;
  }
  parseVersionSuffix(versionString) {
    versionString = versionString.replace("\n", "");
    const versionObject = this.parseVersionString(versionString);
    const semVersionString = this.buildNewSemVersionString(versionObject);
    return versionString.replace(semVersionString, "");
  }
  buildNewVersionString({ major, minor, patch }, suffix) {
    const semVersionString = this.buildNewSemVersionString({ major, minor, patch });
    return `${semVersionString}${suffix}`;
  }
  saveNewVersionFile(filename, versionString) {
    import_node_fs.default.writeFileSync(filename, versionString);
  }
}
(0, import_qcobjects.Package)("com.qcobjects.cli.commands.version", [
  CommandHandler
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandHandler
});
//# sourceMappingURL=cli-commands-version.cjs.map
