/**
 * QCObjects CLI 2.4.x
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

import { JiraCloud } from "./client_services";
import { Package, InheritClass, _DataStringify, New, CONFIG, logger } from "qcobjects";
const absolutePath = path.resolve(__dirname, "./");

export class CommandHandler extends InheritClass {
  choiceOption: {
    [x: string]: any; issues: () => void;
  };
  constructor({
    switchCommander
  }: { switchCommander: any }) {
    super({ switchCommander });
    this.choiceOption = {
      issues: function () {

        this.getIssueList().then(function (response: any) {
          console.log(_DataStringify(response));
        }).catch((e: any) => {
          console.log(e);
          process.exit(1);
        });

      }
    };

    const commandHandler = this;

    switchCommander.program.command("jira <subcommand>")
      .option("-u, --from-user [username]", "User name")
      .option("-fp,--from-project <projectName>", "Project name")
      .option("-p, --pwd <password>", "Password")
      .option("-f, --format <format>", "Format (json, table)")
      .description(`Jira Integration:
                            Sub-Commands can be:
                                issues: To get the issues list from JIRA
        `)
      .action(function (subcommand: string | number, options: any) {
        if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption, subcommand)) {
          commandHandler.choiceOption[subcommand].call(commandHandler, subcommand, options);
        } else {
          console.error(`Sub-Command (jira ${subcommand}... ) is not available`);
          process.exit(1);
        }
      });

  }

  getIssueList() {
    return new Promise<void>(function (resolve, reject) {
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
            "maxResults": 5000,
            "fields": jira_issue_fields
          }
        });
        try {
        } catch (e) {
          console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
          reject(e as Error);
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
