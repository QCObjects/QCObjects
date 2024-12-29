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

import { execSync } from "node:child_process";
import readline from "readline";
import { Package, InheritClass, CONFIG, logger } from "qcobjects";

const license: string = CONFIG.get("enterprise-license", "1234");
const email: string = CONFIG.get("enterprise-email", "a@b.com");

const MESSAGES = {
  NOTE: "[NOTE: No information will be sent to a server until I got your consent]",
  EMAIL_PROMPT: "Please tell me your e-Mail (💌):",
  PHONE_PROMPT: "Please tell me your phone number (🤙): \n",
  OPTION_PROMPT: `
Please select one of the following options (type a number):

1.- 🙀 This is your first interaction 😍 with QCObjects Enterprise Edition 🏢,
you want to send your email and phone number to one of our executives to process your
inquiry, pay the license (when aplies) and receive a new fresh license number
that will free up to you the most advanced features for large companies

2.- ✔ Your assigned executive 🧑 has given to you a new fresh QCObjects Enterprise Edition License Number
and you want to enter it to follow up with the next steps.

3.- 🏃 You want to quit this form, as you got here accidentally
(You should think about it. It's not a coincidence, It's destiny 😀).

Please enter the number of the option and press [enter]: `,
  REGISTRATION_SUCCESS: `👏 Congrats! You have been successfully registered to the cloud! 👏
One of our executives will be in touch with you as soon as possible to give you the next steps
to get a new License Number and start using QCObjects Entrprise Edition!

(In the meantime, you can continue using all the features of the QCObjects Community Edition)
`,
  LICENSE_PROMPT: "Please tell me the number of license that your executive has given to you: \n",
  COMMUNITY_EDITION: "🤷 You can continue to use QCObjects Community Edition, see you! 🙋 ",
  PHONE_REQUIRED: `You need to enter a Phone Number if you want to be contacted.
If you want to quit, press Ctrl-C.
`,
  EMAIL_REQUIRED: `You need to enter a real e-Mail address if you want to be contacted.
If you want to quit, press Ctrl-C.
`,
  INSTALLING: "Now, I'm installing QCObjects Enterprise Edition in your computer...",
  INSTALL_SUCCESS: `👏 Congrats! Now you have installed QCObjects Enterprise Edition! 👏
You can test it using:
> qcobjects --version

To find more help, type the command:

> qcobjects --help

Enjoy!
`,
  INSTALL_FAILURE: "🤦 Something went wrong 🤦 when trying to update your license to QCObjects Enterprise Edition. Ask your executive to help."
};

const OPTIONS = {
  FIRST_INTERACTION: "1",
  ENTER_LICENSE: "2",
  QUIT: "3"
};

export class QCObjectsEnterprise extends InheritClass {

  install(): void {
    const instance = this;
    instance.installEnterprise(license, email);
  }

  static async upgrade(switchCommander: any): Promise<void> {
    const instance = new QCObjectsEnterprise();

    const rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });

    const question = (query: string): Promise<string> => {
      return new Promise(resolve => rl.question(query, resolve));
    };

    const emailQuestion = async (): Promise<void> => {
      const email = await question(`${MESSAGES.NOTE}\n\n${MESSAGES.EMAIL_PROMPT}`);
      if (email !== "") {
        const phoneNumberQuestion = async (): Promise<void> => {
          const phonenumber = await question(MESSAGES.PHONE_PROMPT);
          if (phonenumber !== "") {
            const interaction_option = await question(MESSAGES.OPTION_PROMPT);
            logger.infoEnabled = true;

            switch (interaction_option) {
              case OPTIONS.FIRST_INTERACTION: {
                try {
                  await switchCommander.register(email, phonenumber);
                  logger.info(MESSAGES.REGISTRATION_SUCCESS);
                } finally {
                  rl.close();
                }
                break;
              }
              case OPTIONS.ENTER_LICENSE: {
                const license = await question(MESSAGES.LICENSE_PROMPT);
                instance.installEnterprise(license, email);
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
        };
        await phoneNumberQuestion();
      } else {
        console.log(MESSAGES.EMAIL_REQUIRED);
        await emailQuestion();
      }
    };
    await emailQuestion();
  }

  installEnterprise(license: string, email: string): void {
    const asterisk = "*";
    logger.info(`Your entered license number is ${asterisk.repeat(license.length)} and the email that you have entered is ${email}`);
    logger.info(MESSAGES.INSTALLING);
    const cmdDownloadGit = `npm i --force -g git+https://license:${license}@software.qcobjects.io/qcobjects-enterprise/qcobjects-enterprise.git`;
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
