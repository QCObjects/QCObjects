/**
 * QCObjects CLI 0.1.x
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
const fs = require("fs");
const path = require("path");
const absolutePath = path.resolve( __dirname, "./" );
const templatePath = path.resolve( __dirname, "./templates/apps/" )+"/";
const templatePwaPath = path.resolve( __dirname, "./templates/pwa/" )+"/";
const package_config = require(absolutePath+"/package.json");
const { exec,execSync } = require("child_process");
const Handlebars = require("handlebars");

require(absolutePath+"/org.quickcorp.qcobjects.cli.commands.jira.client_services");

Package("org.quickcorp.qcobjects.cli.commands.jira",[
  Class("CommandHandler",{
    switchCommander:null,
    getIssueList: function (username, password, project){
      return new Promise(function (resolve, reject){
        logger.info("I'm going to get the issue list from the jira cloud...");
        let cloudClient = New(JiraCloud, {
          username: "correojean@gmail.com",
          password: "xglC5b7Pp7X55xJQ08Y4A5DB",
          apiMethod: "rest/api/latest/search",
          data:{"jql":"project = QJI","startAt":0,"maxResults":5000,"fields":["id","key","summary","timetracking"]}
        });
        try {
          let service = serviceLoader(cloudClient).then(successResponse => {
            let template = successResponse.service.template;
            let responseHeaders = successResponse.responseHeaders;
            if (responseHeaders[":status"] === 200 || !cloudClient.useHTTP2){
              let response = JSON.parse(template);
              resolve(response);
            } else {
              console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud. The status was: "+responseHeaders[":status"]);
              reject(template);
            }
          }).catch ((e)=>{
            console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
            reject(e);
          });
        } catch (e){
          console.error("\u{1F926} Something went wrong \u{1F926} when trying to get jira issues from the cloud");
          reject(e);
        }

      });
    },
    choiceOption:{
      credentials: function (username,options){

      },
      whereis: function (jira_base_url,options){

      },
      issues: function (options){

        this.getIssueList().then(function (response){
          console.log(_DataStringify(response));
        }).catch (e=>{
          console.log(e);
          process.exit(1);
        });

      }
    },
    _new_({switchCommander}){
      let commandHandler = this;
      this.switchCommander = switchCommander;

      switchCommander.program.command("jira <subcommand>")
        .option("-u, --from-user [username]", "User name")
        .option("-fp,--from-project <projectName>", "Project name")
        .option("-p, --pwd <password>", "Password")
        .option("-f, --format <format>", "Format (json, table)")
        .description(`Jira Integration:
                              Sub-Commands can be:
                                  credentials: To save creadential for auth login to jira
                                  whereis: To inform QCObjects where is your JIRA located
                                  issues: To get the issues list from JIRA
          `)
        .action(function(subcommand, options){
          if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption,subcommand)){
            commandHandler.choiceOption[subcommand].call(commandHandler,subcommand,options);
          } else {
            console.error(`Sub-Command (jira ${subcommand}... ) is not available`);
            process.exit(1);
          }
        });



    }
  })
]);
