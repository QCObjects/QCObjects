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
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
var package_config = require(absolutePath + "/../package.json");
var _a = require("child_process"), exec = _a.exec, execSync = _a.execSync;
require(absolutePath + "/com.qcobjects.cli.commands.jira.client_services");
Package("com.qcobjects.cli.commands.jira", [
    /** @class */ (function (_super) {
        __extends(CommandHandler, _super);
        function CommandHandler(_a) {
            var switchCommander = _a.switchCommander;
            var _this = _super.apply(this, arguments) || this;
            _this.choiceOption = {
                issues: function (options) {
                    this.getIssueList().then(function (response) {
                        console.log(_DataStringify(response));
                    }).catch(function (e) {
                        console.log(e);
                        process.exit(1);
                    });
                }
            };
            var commandHandler = _this;
            switchCommander.program.command("jira <subcommand>")
                .option("-u, --from-user [username]", "User name")
                .option("-fp,--from-project <projectName>", "Project name")
                .option("-p, --pwd <password>", "Password")
                .option("-f, --format <format>", "Format (json, table)")
                .description("Jira Integration:\n                              Sub-Commands can be:\n                                  issues: To get the issues list from JIRA\n          ")
                .action(function (subcommand, options) {
                if (commandHandler.choiceOption.hasOwnProperty.call(commandHandler.choiceOption, subcommand)) {
                    commandHandler.choiceOption[subcommand].call(commandHandler, subcommand, options);
                }
                else {
                    console.error("Sub-Command (jira ".concat(subcommand, "... ) is not available"));
                    process.exit(1);
                }
            });
            return _this;
        }
        CommandHandler.prototype.getIssueList = function (username, password, project) {
            return new Promise(function (resolve, reject) {
                logger.info("I'm going to get the issue list from the jira cloud...");
                var jira_config = CONFIG.get("jira", null);
                if (jira_config !== null) {
                    var jira_username = jira_config.username;
                    var jira_password = jira_config.auth_token;
                    var jira_project = jira_config.project;
                    var jira_domain = jira_config.domain;
                    var jira_issue_fields = ["id", "key", "summary", "timetracking"];
                    var cloudClient_1 = New(JiraCloud, {
                        domain: "".concat(jira_domain),
                        username: "".concat(jira_username),
                        password: "".concat(jira_password),
                        apiMethod: "rest/api/latest/search",
                        data: {
                            "jql": "project = ".concat(jira_project),
                            "startAt": 0,
                            "maxResults": 5000,
                            "fields": jira_issue_fields
                        }
                    });
                    try {
                        var service = serviceLoader(cloudClient_1).then(function (successResponse) {
                            var template = successResponse.service.template;
                            var responseHeaders = successResponse.responseHeaders;
                            if (responseHeaders[":status"] === 200 || !cloudClient_1.useHTTP2) {
                                var response = JSON.parse(template);
                                resolve(response);
                            }
                            else {
                                console.error("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to get jira issues from the cloud. The status was: " + responseHeaders[":status"]);
                                reject(template);
                            }
                        }).catch(function (e) {
                            console.error("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to get jira issues from the cloud");
                            reject(e);
                        });
                    }
                    catch (e) {
                        console.error("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to get jira issues from the cloud");
                        reject(e);
                    }
                }
                else {
                    console.error("\uD83E\uDD26 Something went wrong \uD83E\uDD26 You need to set the jira config settings");
                    reject();
                }
            });
        };
        return CommandHandler;
    }(InheritClass))
]);
