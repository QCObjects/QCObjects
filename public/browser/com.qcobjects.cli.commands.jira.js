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
  var com_qcobjects_cli_commands_jira_exports = {};
  __export(com_qcobjects_cli_commands_jira_exports, {
    CommandHandler: () => CommandHandler
  });
  var import_node_path = __toESM(require("node:path"));
  var import_com_qcobjects_cli_commands_jira = require("./com.qcobjects.cli.commands.jira.client_services");
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
        issues: /* @__PURE__ */ __name(function() {
          this.getIssueList().then(function(response) {
            console.log((0, import_qcobjects._DataStringify)(response));
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
        import_qcobjects.logger.info("I'm going to get the issue list from the jira cloud...");
        const jira_config = import_qcobjects.CONFIG.get("jira", null);
        if (jira_config !== null) {
          const jira_username = jira_config.username;
          const jira_password = jira_config.auth_token;
          const jira_project = jira_config.project;
          const jira_domain = jira_config.domain;
          const jira_issue_fields = ["id", "key", "summary", "timetracking"];
          const cloudClient = (0, import_qcobjects.New)(import_com_qcobjects_cli_commands_jira.JiraCloud, {
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
  }
  (0, import_qcobjects.Package)("com.qcobjects.cli.commands.jira", [
    CommandHandler
  ]);
  return __toCommonJS(com_qcobjects_cli_commands_jira_exports);
})();
//# sourceMappingURL=com.qcobjects.cli.commands.jira.js.map
