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
Package("org.qcobjects.enterprise.commands", [
    /** @class */ (function (_super) {
        __extends(QCObjectsEnterprise, _super);
        function QCObjectsEnterprise() {
            return _super.apply(this, arguments) || this;
        }
        QCObjectsEnterprise.prototype.install = function (switchCommander) {
            var instance = this;
            return instance.installEnterprise(license, email);
        };
        QCObjectsEnterprise.prototype.upgrade = function (switchCommander) {
            var instance = this;
            var readline = require("readline");
            var rl = readline.createInterface({
                input: process.stdin,
                output: process.stdout
            });
            var emailQuestion = function () {
                rl.question("\n    [NOTE: No information will be sent to a server until I got your consent]\n  \n    Please tell me your e-Mail (\uD83D\uDC8C):\n    ", function (email) {
                    var asterisk = "*";
                    if (email !== "") {
                        var phoneNumberQuestion = function () {
                            rl.question("Please tell me your phone number (\uD83E\uDD19): \n", function (phonenumber) {
                                if (phonenumber !== "") {
                                    rl.question("\n    Please select one of the following options (type a number):\n  \n    1.- \uD83D\uDE40 This is your first interaction \uD83D\uDE0D with QCObjects Enterprise Edition \uD83C\uDFE2,\n    you want to send your email and phone number to one of our executives to process your\n    inquiry, pay the license (when aplies) and receive a new fresh license number\n    that will free up to you the most advanced features for large companies\n  \n    2.- \u2714 Your assigned executive \uD83E\uDDD1 has given to you a new fresh QCObjects Enterprise Edition License Number\n    and you want to enter it to follow up with the next steps.\n  \n    3.- \uD83C\uDFC3 You want to quit this form, as you got here accidentally\n    (You should think about it. It's not a coincidence, It's destiny \uD83D\uDE00).\n  \n    Please enter the number of the option and press [enter]: ", function (interaction_option) {
                                        logger.infoEnabled = true;
                                        switch (interaction_option) {
                                            case "1":
                                                switchCommander.register(email, phonenumber).then(function (response) {
                                                    logger.info("\uD83D\uDC4F Congrats! You have been successfully registered to the cloud! \uD83D\uDC4F\n    One of our executives will be in touch with you as soon as possible to give you the next steps\n    to get a new License Number and start using QCObjects Entrprise Edition!\n  \n    (In the meantime, you can continue using all the features of the QCObjects Community Edition)\n    ");
                                                    rl.close();
                                                }).catch(function (e) {
                                                    rl.close();
                                                });
                                                break;
                                            case "2":
                                                rl.stdoutMuted = true;
                                                rl._writeToOutput = function _writeToOutput(stringToWrite) {
                                                    if (rl.stdoutMuted)
                                                        rl.output.write("*");
                                                    else
                                                        rl.output.write(stringToWrite);
                                                };
                                                rl.question("Please tell me the number of license that your executive has given to you: \n", function (license) {
                                                    rl.stdoutMuted = false;
                                                    instance.installEnterprise(license, email);
                                                    rl.close();
                                                });
                                                break;
                                            default:
                                                logger.info("\uD83E\uDD37 You can continue to use QCObjects Community Edition, see you! \uD83D\uDE4B ");
                                                rl.close();
                                                break;
                                        }
                                    });
                                }
                                else {
                                    console.log("You need to enter a Phone Number if you want to be contacted.\n    If you want to quit, press Ctrl-C.\n    ");
                                    phoneNumberQuestion();
                                }
                            });
                        };
                        phoneNumberQuestion();
                    }
                    else {
                        console.log("You need to enter a real e-Mail adress if you want to be contacted.\n    If you want to quit, press Ctrl-C.\n    ");
                        emailQuestion();
                    }
                });
            };
            emailQuestion();
        };
        QCObjectsEnterprise.prototype.installEnterprise = function (license, email) {
            var asterisk = "*";
            var license = CONFIG.get("enterprise-license", license);
            var email = CONFIG.get("enterprise-email", email);
            logger.info("Your entered license number is ".concat(asterisk.repeat(license.length), " and the email that you have entered is ").concat(email));
            logger.info("Now, I'm installing QCObjects Enterprise Edition in your computer...");
            var cmdDownloadGit = "npm i --force -g git+https://license:".concat(license, "@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git");
            exec(cmdDownloadGit, function (err, stdout, stderr) {
                if (!err) {
                    exec("qcobjects --version", function (err, stdout, stderr) {
                        if (stdout.lastIndexOf("Enterprise Edition") !== -1) {
                            logger.info("\uD83D\uDC4F Congrats! Now you have installed QCObjects Entrprise Edition! \uD83D\uDC4F");
                            logger.info("You can test it using:\n  > qcobjects --version\n  \n  To find more help, type the command:\n  \n  > qcobjects --help\n  \n  Enjoy!\n  ");
                        }
                        else {
                            console.log("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to update your license to QCObjects Enterprise Edition");
                            console.log("Ask your executive to help");
                        }
                    });
                }
                else {
                    console.log("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to update your license to QCObjects Enterprise Edition");
                    if (stderr.lastIndexOf("Authentication failed") !== -1) {
                        console.log("Please ask to your executive for the right license number");
                    }
                    else {
                        console.log(stderr);
                    }
                }
            }).stdout.on("data", function (data) {
                console.log(data);
            });
        };
        return QCObjectsEnterprise;
    }(InheritClass))
]);
