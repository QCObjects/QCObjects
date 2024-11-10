"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/org.qcobjects.enterprise.commands.ts
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
var package_config = require(absolutePath + "/../package.json");
var { exec, execSync } = require("child_process");
var { Package, InheritClass, CONFIG, logger } = require("qcobjects");
var license = CONFIG.get("enterprise-license", "1234");
var email = CONFIG.get("enterprise-email", "a@b.com");
var QCObjectsEnterprise = class extends InheritClass {
  static {
    __name(this, "QCObjectsEnterprise");
  }
  install(switchCommander) {
    const instance = this;
    return instance.installEnterprise(license, email);
  }
  upgrade(switchCommander) {
    const instance = this;
    const readline = require("readline");
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    var emailQuestion = /* @__PURE__ */ __name(function() {
      rl.question(`
  [NOTE: No information will be sent to a server until I got your consent]

  Please tell me your e-Mail (\u{1F48C}):
  `, (email2) => {
        const asterisk = "*";
        if (email2 !== "") {
          var phoneNumberQuestion = /* @__PURE__ */ __name(function() {
            rl.question("Please tell me your phone number (\u{1F919}): \n", (phonenumber) => {
              if (phonenumber !== "") {
                rl.question(`
  Please select one of the following options (type a number):

  1.- \u{1F640} This is your first interaction \u{1F60D} with QCObjects Enterprise Edition \u{1F3E2},
  you want to send your email and phone number to one of our executives to process your
  inquiry, pay the license (when aplies) and receive a new fresh license number
  that will free up to you the most advanced features for large companies

  2.- \u2714 Your assigned executive \u{1F9D1} has given to you a new fresh QCObjects Enterprise Edition License Number
  and you want to enter it to follow up with the next steps.

  3.- \u{1F3C3} You want to quit this form, as you got here accidentally
  (You should think about it. It's not a coincidence, It's destiny \u{1F600}).

  Please enter the number of the option and press [enter]: `, (interaction_option) => {
                  logger.infoEnabled = true;
                  switch (interaction_option) {
                    case "1":
                      switchCommander.register(email2, phonenumber).then(function(response) {
                        logger.info(`\u{1F44F} Congrats! You have been successfully registered to the cloud! \u{1F44F}
  One of our executives will be in touch with you as soon as possible to give you the next steps
  to get a new License Number and start using QCObjects Entrprise Edition!

  (In the meantime, you can continue using all the features of the QCObjects Community Edition)
  `);
                        rl.close();
                      }).catch((e) => {
                        rl.close();
                      });
                      break;
                    case "2":
                      rl.stdoutMuted = true;
                      rl._writeToOutput = /* @__PURE__ */ __name(function _writeToOutput(stringToWrite) {
                        if (rl.stdoutMuted)
                          rl.output.write("*");
                        else
                          rl.output.write(stringToWrite);
                      }, "_writeToOutput");
                      rl.question("Please tell me the number of license that your executive has given to you: \n", (license2) => {
                        rl.stdoutMuted = false;
                        instance.installEnterprise(license2, email2);
                        rl.close();
                      });
                      break;
                    default:
                      logger.info("\u{1F937} You can continue to use QCObjects Community Edition, see you! \u{1F64B} ");
                      rl.close();
                      break;
                  }
                });
              } else {
                console.log(`You need to enter a Phone Number if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
                phoneNumberQuestion();
              }
            });
          }, "phoneNumberQuestion");
          phoneNumberQuestion();
        } else {
          console.log(`You need to enter a real e-Mail adress if you want to be contacted.
  If you want to quit, press Ctrl-C.
  `);
          emailQuestion();
        }
      });
    }, "emailQuestion");
    emailQuestion();
  }
  installEnterprise(license2, email2) {
    const asterisk = "*";
    logger.info(`Your entered license number is ${asterisk.repeat(license2.length)} and the email that you have entered is ${email2}`);
    logger.info("Now, I'm installing QCObjects Enterprise Edition in your computer...");
    const cmdDownloadGit = `npm i --force -g git+https://license:${license2}@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git`;
    exec(cmdDownloadGit, (err, stdout, stderr) => {
      if (!err) {
        exec("qcobjects --version", (err2, stdout2, stderr2) => {
          if (stdout2.lastIndexOf("Enterprise Edition") !== -1) {
            logger.info("\u{1F44F} Congrats! Now you have installed QCObjects Entrprise Edition! \u{1F44F}");
            logger.info(`You can test it using:
> qcobjects --version

To find more help, type the command:

> qcobjects --help

Enjoy!
`);
          } else {
            console.log("\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition");
            console.log("Ask your executive to help");
          }
        });
      } else {
        console.log("\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition");
        if (stderr.lastIndexOf("Authentication failed") !== -1) {
          console.log("Please ask to your executive for the right license number");
        } else {
          console.log(stderr);
        }
      }
    }).stdout.on("data", function(data) {
      console.log(data);
    });
  }
};
Package("org.qcobjects.enterprise.commands", [
  QCObjectsEnterprise
]);
exports = { QCObjectsEnterprise };
//# sourceMappingURL=org.qcobjects.enterprise.commands.cjs.map
