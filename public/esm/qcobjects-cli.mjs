#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { logger, InheritClass } from "qcobjects";
logger.debugEnabled = false;
const welcometo = "Welcome to \n";
const instructions = `
Community Edition
=================

This edition has the most of features that you can use for free but if you want to

Upgrade to \u{1F3E2} Enterprise Edition,
type the command:

> qcobjects upgrade-to-enterprise
`;
const logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
d88P" "Y88bd88P  Y88bd88P" "Y88b888       Y8P                888            \r
888     888888    888888     888888                          888            \r
888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r
888     888888       888     888888 "88b "888d8P  Y8bd88P"   888   88K      \r
888 Y8b 888888    888888     888888  888  88888888888888     888   "Y8888b. \r
Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r
 "Y888888"  "Y8888P"  "Y88888P" 88888P"   888 "Y8888  "Y8888P "Y888 88888P' \r
       Y8b                                888                               \r
                                         d88P                               \r
                                       888P"   `;
if (process.argv.length < 3 || process.argv[2] === "create") {
  console.log(welcometo);
  console.log(logo);
  console.log(instructions);
}
logger.debugEnabled = false;
logger.warnEnabled = false;
logger.infoEnabled = false;
import * as defaultSettings from "./defaultsettings";
import { SwitchCommander } from "./org.quickcorp.qcobjects.cli";
class Main extends InheritClass {
  static {
    __name(this, "Main");
  }
  constructor() {
    super();
    const main = this;
    const switchCommander = new SwitchCommander();
    switchCommander.initCommand();
    logger.debug("initialized");
  }
}
const __main__ = new Main();
var qcobjects_cli_default = __main__;
export {
  Main,
  qcobjects_cli_default as default,
  defaultSettings
};
//# sourceMappingURL=qcobjects-cli.mjs.map
