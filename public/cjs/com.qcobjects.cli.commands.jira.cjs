"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/com.qcobjects.cli.commands.jira.ts
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
var package_config = require(absolutePath + "/../package.json");
var {
  exec,
  execSync
} = require("child_process");
var { Package, InheritClass, _DataStringify, New, CONFIG, logger, serviceLoader } = require("qcobjects");
var { JiraCloud } = require(absolutePath + "/com.qcobjects.cli.commands.jira.client_services");
var CommandHandler = class extends InheritClass {
  static {
    __name(this, "CommandHandler");
  }
  constructor({
    switchCommander
  }) {
    super({ switchCommander });
    this.choiceOption = {
      issues: /* @__PURE__ */ __name(function(options) {
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
  getIssueList(username, password, project) {
    return new Promise(function(resolve, reject) {
      logger.info("I'm going to get the issue list from the jira cloud...");
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
          const service = serviceLoader(cloudClient).then((successResponse) => {
            const template = successResponse.service.template;
            const responseHeaders = successResponse.responseHeaders;
            if (responseHeaders[":status"] === 200 || !cloudClient.useHTTP2) {
              const response = JSON.parse(template);
              resolve(response);
            } else {
              console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud. The status was: " + responseHeaders[":status"]);
              reject(template);
            }
          }).catch((e) => {
            console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
            reject(e);
          });
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
Package("com.qcobjects.cli.commands.jira", [
  CommandHandler
]);
//# sourceMappingURL=com.qcobjects.cli.commands.jira.cjs.map
