var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { execSync } from "node:child_process";
import readline from "readline";
import { Package, InheritClass, CONFIG, logger } from "qcobjects";
const license = CONFIG.get("enterprise-license", "1234");
const email = CONFIG.get("enterprise-email", "a@b.com");
const MESSAGES = {
  NOTE: "[NOTE: No information will be sent to a server until I got your consent]",
  EMAIL_PROMPT: "Please tell me your e-Mail (\u{1F48C}):",
  PHONE_PROMPT: "Please tell me your phone number (\u{1F919}): \n",
  OPTION_PROMPT: `
Please select one of the following options (type a number):

1.- \u{1F640} This is your first interaction \u{1F60D} with QCObjects Enterprise Edition \u{1F3E2},
you want to send your email and phone number to one of our executives to process your
inquiry, pay the license (when aplies) and receive a new fresh license number
that will free up to you the most advanced features for large companies

2.- \u2714 Your assigned executive \u{1F9D1} has given to you a new fresh QCObjects Enterprise Edition License Number
and you want to enter it to follow up with the next steps.

3.- \u{1F3C3} You want to quit this form, as you got here accidentally
(You should think about it. It's not a coincidence, It's destiny \u{1F600}).

Please enter the number of the option and press [enter]: `,
  REGISTRATION_SUCCESS: `\u{1F44F} Congrats! You have been successfully registered to the cloud! \u{1F44F}
One of our executives will be in touch with you as soon as possible to give you the next steps
to get a new License Number and start using QCObjects Entrprise Edition!

(In the meantime, you can continue using all the features of the QCObjects Community Edition)
`,
  LICENSE_PROMPT: "Please tell me the number of license that your executive has given to you: \n",
  COMMUNITY_EDITION: "\u{1F937} You can continue to use QCObjects Community Edition, see you! \u{1F64B} ",
  PHONE_REQUIRED: `You need to enter a Phone Number if you want to be contacted.
If you want to quit, press Ctrl-C.
`,
  EMAIL_REQUIRED: `You need to enter a real e-Mail address if you want to be contacted.
If you want to quit, press Ctrl-C.
`,
  INSTALLING: "Now, I'm installing QCObjects Enterprise Edition in your computer...",
  INSTALL_SUCCESS: `\u{1F44F} Congrats! Now you have installed QCObjects Enterprise Edition! \u{1F44F}
You can test it using:
> qcobjects --version

To find more help, type the command:

> qcobjects --help

Enjoy!
`,
  INSTALL_FAILURE: "\u{1F926} Something went wrong \u{1F926} when trying to update your license to QCObjects Enterprise Edition. Ask your executive to help."
};
const OPTIONS = {
  FIRST_INTERACTION: "1",
  ENTER_LICENSE: "2",
  QUIT: "3"
};
class QCObjectsEnterprise extends InheritClass {
  static {
    __name(this, "QCObjectsEnterprise");
  }
  install() {
    const instance = this;
    instance.installEnterprise(license, email);
  }
  static async upgrade(switchCommander) {
    const instance = new QCObjectsEnterprise();
    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
    const question = /* @__PURE__ */ __name((query) => {
      return new Promise((resolve) => rl.question(query, resolve));
    }, "question");
    const emailQuestion = /* @__PURE__ */ __name(async () => {
      const email2 = await question(`${MESSAGES.NOTE}

${MESSAGES.EMAIL_PROMPT}`);
      if (email2 !== "") {
        const phoneNumberQuestion = /* @__PURE__ */ __name(async () => {
          const phonenumber = await question(MESSAGES.PHONE_PROMPT);
          if (phonenumber !== "") {
            const interaction_option = await question(MESSAGES.OPTION_PROMPT);
            logger.infoEnabled = true;
            switch (interaction_option) {
              case OPTIONS.FIRST_INTERACTION: {
                try {
                  await switchCommander.register(email2, phonenumber);
                  logger.info(MESSAGES.REGISTRATION_SUCCESS);
                } finally {
                  rl.close();
                }
                break;
              }
              case OPTIONS.ENTER_LICENSE: {
                const license2 = await question(MESSAGES.LICENSE_PROMPT);
                instance.installEnterprise(license2, email2);
                rl.close();
                break;
              }
              case OPTIONS.QUIT:
              default: {
                logger.info(MESSAGES.COMMUNITY_EDITION);
                rl.close();
                break;
              }
            }
          } else {
            console.log(MESSAGES.PHONE_REQUIRED);
            await phoneNumberQuestion();
          }
        }, "phoneNumberQuestion");
        await phoneNumberQuestion();
      } else {
        console.log(MESSAGES.EMAIL_REQUIRED);
        await emailQuestion();
      }
    }, "emailQuestion");
    await emailQuestion();
  }
  installEnterprise(license2, email2) {
    const asterisk = "*";
    logger.info(`Your entered license number is ${asterisk.repeat(license2.length)} and the email that you have entered is ${email2}`);
    logger.info(MESSAGES.INSTALLING);
    const cmdDownloadGit = `npm i --force -g git+https://license:${license2}@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git`;
    execSync(cmdDownloadGit);
    const stdout = execSync("qcobjects --version");
    if (stdout.toString().includes("Enterprise Edition")) {
      logger.info(MESSAGES.INSTALL_SUCCESS);
    } else {
      console.log(MESSAGES.INSTALL_FAILURE);
    }
  }
}
Package("org.qcobjects.enterprise.commands", [
  QCObjectsEnterprise
]);
export {
  QCObjectsEnterprise
};
//# sourceMappingURL=org.qcobjects.enterprise.commands.mjs.map
