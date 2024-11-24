"use strict";
var global = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
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
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/com.qcobjects.cli.commands.ts
  var com_qcobjects_cli_commands_exports = {};
  __export(com_qcobjects_cli_commands_exports, {
    jiraCommand: () => com_qcobjects_cli_commands_jira_exports,
    versionCommand: () => com_qcobjects_cli_commands_version_exports
  });

  // src/com.qcobjects.cli.commands.version.ts
  var com_qcobjects_cli_commands_version_exports = {};
  __export(com_qcobjects_cli_commands_version_exports, {
    CommandHandler: () => CommandHandler
  });
  var fs = __require("fs");
  var path = __require("path");
  var { exec, execSync } = __require("child_process");
  var { Package, InheritClass, logger } = __require("qcobjects");
  var CommandHandler = class extends InheritClass {
    static {
      __name(this, "CommandHandler");
    }
    constructor({ switchCommander }) {
      super({ switchCommander });
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
        commandHandler.choiceOption.v_changelog.call(commandHandler, args, options);
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
        logger.info("Synced to Git");
        logger.debug(response);
      }).catch(function(e) {
        logger.info("Something went wrong trying to sync to git");
        logger.debug(e);
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
        versionString = fs.readFileSync(filename).toString().replace("\n", "");
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
      fs.writeFileSync(filename, versionString);
    }
  };
  Package("com.qcobjects.cli.commands.version", [
    CommandHandler
  ]);

  // src/com.qcobjects.cli.commands.jira.ts
  var com_qcobjects_cli_commands_jira_exports = {};
  __export(com_qcobjects_cli_commands_jira_exports, {
    CommandHandler: () => CommandHandler2
  });

  // src/com.qcobjects.cli.commands.jira.client_services.ts
  var { Package: Package2, Service, logger: logger2 } = __require("qcobjects");
  var JiraCloud = class extends Service {
    static {
      __name(this, "JiraCloud");
    }
    constructor({
      name = "jira_cloud",
      external = true,
      useHTTP2 = true,
      cached = false,
      method = "POST",
      headers = {
        "accept": "application/json",
        "content-type": "application/json"
      },
      basePath = "",
      url = "",
      withCredentials = false
    }) {
      super({
        name,
        external,
        useHTTP2,
        cached,
        method,
        headers,
        basePath,
        url,
        withCredentials
      });
      var o = this;
      this.domain = `${o.domain}`;
      this.basePath = `https://${this.domain}/`;
      this.username_password = `${o.username}:${o.password}`;
      this.headers["authorization"] = `Basic ${Buffer.from(this.username_password).toString("base64")}`;
      this.url = this.basePath + o.apiMethod;
      this.data = o.data;
    }
    done(service, standardResponse) {
      logger2.debug(standardResponse);
    }
    fail(e) {
      logger2.debug(e);
    }
  };
  Package2("com.qcobjects.cli.commands.jira.client_services", [
    JiraCloud
  ]);

  // src/com.qcobjects.cli.commands.jira.ts
  var path2 = __require("path");
  var absolutePath = path2.resolve(__dirname, "./");
  var {
    exec: exec2,
    execSync: execSync2
  } = __require("child_process");
  var { Package: Package3, InheritClass: InheritClass2, _DataStringify, New, CONFIG, logger: logger3, serviceLoader } = __require("qcobjects");
  var CommandHandler2 = class extends InheritClass2 {
    static {
      __name(this, "CommandHandler");
    }
    constructor({
      switchCommander
    }) {
      super({ switchCommander });
      this.choiceOption = {
        issues: /* @__PURE__ */ __name(function() {
          this.getIssueList().then(function(response) {
            console.log(_DataStringify(response));
          }).catch((e) => {
            console.log(e);
            process.exit(1);
          });
        }, "issues")
      };
      const commandHandler = this;
      switchCommander.program.command("jira <subcommand>").option("-u, --from-user [username]", "User name").option("-fp,--from-project <projectName>", "Project name").option("-p, --pwd <password>", "Password").option("-f, --format <format>", "Format (json, table)").description(`Jira Integration:
                            Sub-Commands can be:
                                issues: To get the issues list from JIRA
        `).action(function(subcommand, options) {
        if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption, subcommand)) {
          commandHandler.choiceOption[subcommand].call(commandHandler, subcommand, options);
        } else {
          console.error(`Sub-Command (jira ${subcommand}... ) is not available`);
          process.exit(1);
        }
      });
    }
    getIssueList() {
      return new Promise(function(resolve, reject) {
        logger3.info("I'm going to get the issue list from the jira cloud...");
        const jira_config = CONFIG.get("jira", null);
        if (jira_config !== null) {
          const jira_username = jira_config.username;
          const jira_password = jira_config.auth_token;
          const jira_project = jira_config.project;
          const jira_domain = jira_config.domain;
          const jira_issue_fields = ["id", "key", "summary", "timetracking"];
          const cloudClient = New(JiraCloud, {
            domain: `${jira_domain}`,
            username: `${jira_username}`,
            password: `${jira_password}`,
            apiMethod: "rest/api/latest/search",
            data: {
              "jql": `project = ${jira_project}`,
              "startAt": 0,
              "maxResults": 5e3,
              "fields": jira_issue_fields
            }
          });
          try {
          } catch (e) {
            console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
            reject(e);
          }
        } else {
          console.error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings");
          reject(new Error("\u{1F926} Something went wrong \u{1F926} You need to set the jira config settings"));
        }
      });
    }
  };
  Package3("com.qcobjects.cli.commands.jira", [
    CommandHandler2
  ]);
  return __toCommonJS(com_qcobjects_cli_commands_exports);
})();
//# sourceMappingURL=com.qcobjects.cli.commands.js.map
