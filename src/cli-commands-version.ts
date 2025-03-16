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
import fs from "node:fs";
import path from "node:path";
import { exec, execSync } from "node:child_process";

import { Package, InheritClass, logger } from "qcobjects";
import { SwitchCommander } from "./cli-main";

export class CommandHandler extends InheritClass {
  choiceOption: {
    getVersionStringFromFile(filename: string): string;
    parseVersionSuffix(versionString: any): string;
    parseVersionString(versionString: any): string;
    buildNewVersionString(arg0: { major: number; minor: number; patch: number; }, versionSuffix: any): string;
    saveNewVersionFile(filename: string, newVersion: any): string;
    syncGit(newVersion: any, commitMsg: any, syncNpm: any): string;
    switchCommander: any; v_major(filename: string, options: any): void; v_minor(filename: string, options: any): void; v_patch(filename: string, options: any): void; v_sync(filename: string, options: any): void; v_changelog(): void;
  };
  switchCommander: SwitchCommander;

  constructor({ switchCommander }:{switchCommander:SwitchCommander}) {
    super({ switchCommander });
    this.switchCommander = switchCommander;

    const commandHandler = this;

    this.choiceOption = {
      v_major(filename: string, options: any) {
        filename = (typeof filename === "undefined") ? ("VERSION") : (filename);
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major: major + 1, minor: minor, patch: patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_minor(filename: string, options: any) {
        filename = (typeof filename === "undefined") ? ("VERSION") : (filename);
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major: major, minor: minor + 1, patch: patch }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_patch(filename: string, options: any) {
        filename = (typeof filename === "undefined") ? ("VERSION") : (filename);
        const versionString = this.getVersionStringFromFile(filename);
        const versionSuffix = this.parseVersionSuffix(versionString);
        const versionObject = this.parseVersionString(versionString);
        const major = parseInt(versionObject.major);
        const minor = parseInt(versionObject.minor);
        const patch = parseInt(versionObject.patch);
        const newVersion = this.buildNewVersionString({ major: major, minor: minor, patch: patch + 1 }, versionSuffix);
        this.saveNewVersionFile(filename, newVersion);
        if (options.syncGit) {
          var commitMsg = options.commitMsg || `New Version v${newVersion}`;
          this.syncGit(newVersion, commitMsg, options.syncNpm);
        }
      },
      v_sync(filename: string, options: any) {
        filename = (typeof filename === "undefined") ? ("VERSION") : (filename);
        var commandHandler = this;
        commandHandler.switchCommander.shellCommands([
          "echo $(git describe)"
        ]).then(function (response: any) {
          const versionString = response[0].split("-")[0].slice(1).replace("\n", "");
          console.log(versionString);
          const versionSuffix = commandHandler.parseVersionSuffix(versionString);
          const versionObject = commandHandler.parseVersionString(versionString);
          const major = parseInt(versionObject.major);
          const minor = parseInt(versionObject.minor);
          const patch = parseInt(versionObject.patch);
          const newVersion = commandHandler.buildNewVersionString({ major: major, minor: minor, patch: patch }, versionSuffix);
          commandHandler.saveNewVersionFile(filename, newVersion);
          var commitMsg = options.commitMsg || `Synced Version v${newVersion}`;
          commandHandler.switchCommander.shellCommands(
            [
              "git fetch --tags -f",
              `git add . && git commit -am "${commitMsg}"`,
              "git fetch origin --tags",
              "git tag -ln",
              `npm version "${newVersion}" --allow-same-version -m "${commitMsg}"`,
              "git push && git push --tags"
            ]
          ).then(function (response: any) {
            console.log(response);
          });
        });
      },
      v_changelog() {
        const commandHandler = this;
        commandHandler.switchCommander.shellCommands(
          [
            "git tag -ln"
          ]
        ).then(function (response: any) {
          var versionTags = response[0].split("\n").map((tag: any) => tag.split(" ").unique()).unique().map(
            (tag: any) => {
              return {
                "version": tag[0],
                "major": tag[0].split(".")[0],
                "minor": tag[0].split(".")[0] + "." + tag[0].split(".")[1],
                "description": tag.slice(1).join(" ").trim()
              };
            }
          );
          var minorVersionTags = versionTags.filter((tag: { version: string; }) => tag.version !== "").map((tag: { version: string; }) => tag.version.split(".")[0] + "." + tag.version.split(".")[1]).unique();
          var history = minorVersionTags.map((minor: string) => {
            return {
              "major": minor.split(".")[0],
              "minor": minor,
              "history": "\n\t- " + versionTags.filter((tag: { minor: any; }) => tag.minor === minor).map(
                function (tag: { description: any; }) {
                  return tag.description;
                }
              ).filter((desc: string) => !desc.startsWith(minor.slice(1))).sort().unique().join("\n\t- ")
            };
          }).map((hist: { major: any; minor: any; history: string; }) => { return `## ${hist.major} -> ${hist.minor}` + "\n" + hist.history; }).join("\n");
          const subtitle = "This is an automatic Changelog history of versions generated using the command: **qcobjects v-changelog > CHANGELOG.md**";
          console.log("# Changelog \n\n" + subtitle + "\n\n" + history);

        });
      }
    } as any;

    switchCommander.program.command("v-major [filename]")
      .option("--git, --sync-git", "Sync with Git")
      .option("--npm, --sync-npm", "Sync with NPM")
      .option("-m, --commit-msg [message]", "Commit Message")
      .description("Semantic Versioning: Upgrade to a new major version")
      .action(function (args: any, options: any) {
        commandHandler.choiceOption.v_major.call(commandHandler, args, options);
      });
    switchCommander.program.command("v-minor [filename]")
      .option("--git, --sync-git", "Sync with Git")
      .option("--npm, --sync-npm", "Sync with NPM")
      .option("-m, --commit-msg [message]", "Commit Message")
      .description("Semantic Versioning: Upgrade to a new minor version")
      .action(function (args: any, options: any) {
        commandHandler.choiceOption.v_minor.call(commandHandler, args, options);
      });

    switchCommander.program.command("v-patch [filename]")
      .option("--git, --sync-git", "Sync with Git")
      .option("--npm, --sync-npm", "Sync with NPM")
      .option("-m, --commit-msg [message]", "Commit Message")
      .description("Semantic Versioning: Upgrade to a new patch version")
      .action(function (args: any, options: any) {
        commandHandler.choiceOption.v_patch.call(commandHandler, args, options);
      });

    switchCommander.program.command("v-sync [filename]")
      .option("-m, --commit-msg [message]", "Commit Message")
      .description("Semantic Versioning: Sync the version of NPM with version of GIT")
      .action(function (args: any, options: any) {
        commandHandler.choiceOption.v_sync.call(commandHandler, args, options);
      });

    switchCommander.program.command("v-changelog")
      .description("Semantic Versioning: Shows a changelog using Semantic Versioning")
      .action(function (args: any, options: any) {
        commandHandler.choiceOption.v_changelog.call(commandHandler);
      });


  }


  syncGit(versionString: any, commitMsg: any, syncNpm = false) {
    let _commands_: any[] = [];
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
      ]);

    if (!syncNpm) {
      _commands_ = _commands_.concat(
        [
          `git tag -a "v${versionString}" -m "${commitMsg}"`,
        ]
      );
    }

    _commands_ = _commands_.concat([
      "git push && git push --tags"
    ]
    );

    this.switchCommander.shellCommands(_commands_).then(function (response: any) {
      logger.info("Synced to Git");
      logger.debug(response);
    }).catch(function (e: any) {
      logger.info("Something went wrong trying to sync to git");
      logger.debug(e);
    });
  }

  parseVersionString(versionString: string): { major: string, minor: string, patch: string } {
    versionString = versionString.replace("\n", "");
    const regexpVer = /^(?<major>0|[1-9]\d*)\.(?<minor>0|[1-9]\d*)\.(?<patch>0|[1-9]\d*)(?:-((?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*)(?:\.(?:0|[1-9]\d*|\d*[a-zA-Z-][0-9a-zA-Z-]*))*))?(?:\+([0-9a-zA-Z-]+(?:\.[0-9a-zA-Z-]+)*))?$/;
    const versionObject = { ...versionString.match(regexpVer)?.groups };
    return versionObject as { major: string, minor: string, patch: string };
  }

  getVersionStringFromFile(filename: any) {
    let versionString;
    try {
      versionString = fs.readFileSync(filename).toString().replace("\n", "");
    } catch (e) {
      versionString = "0.0.1";
    }
    return versionString;
  }

  buildNewSemVersionString({ major, minor, patch }: { major: string, minor: string, patch: string }) {
    return `${major}.${minor}.${patch}`;
  }

  parseVersionSuffix(versionString: string) {
    versionString = versionString.replace("\n", "");
    const versionObject = this.parseVersionString(versionString);
    const semVersionString = this.buildNewSemVersionString(versionObject);
    return versionString.replace(semVersionString, "");
  }

  buildNewVersionString({ major, minor, patch }: any, suffix: any) {
    const semVersionString = this.buildNewSemVersionString({ major, minor, patch });
    return `${semVersionString}${suffix}`;
  }

  saveNewVersionFile(filename: any, versionString: any) {
    fs.writeFileSync(filename, versionString);
  }





}


Package("com.qcobjects.cli.commands.version", [
  CommandHandler
]);
