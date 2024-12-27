var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "node:path";
import { JiraCloud } from "./com.qcobjects.cli.commands.jira.client_services";
import { Package, InheritClass, _DataStringify, New, CONFIG, logger } from "qcobjects";
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
Package("com.qcobjects.cli.commands.jira", [
  CommandHandler
]);
export {
  CommandHandler
};
//# sourceMappingURL=com.qcobjects.cli.commands.jira.mjs.map
