"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/index.ts
var src_exports = {};
__export(src_exports, {
  default: () => src_default
});
module.exports = __toCommonJS(src_exports);

// src/qcobjects-cli.ts
var qcobjects_cli_exports = {};
__export(qcobjects_cli_exports, {
  default: () => qcobjects_cli_default
});
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var package_config = require(absolutePath + "/../package.json");
var { logger, InheritClass } = require("qcobjects");
logger.debugEnabled = false;
var welcometo = "Welcome to \n";
var instructions = `
Community Edition
=================

This edition has the most of features that you can use for free but if you want to

Upgrade to \u{1F3E2} Enterprise Edition,
type the command:

> qcobjects upgrade-to-enterprise
`;
var logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
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
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var { SwitchCommander } = require(absolutePath + "/org.quickcorp.qcobjects.cli");
var Main = class extends InheritClass {
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
};
var __main__ = new Main();
var qcobjects_cli_default = __main__;

// src/index.ts
var src_default = qcobjects_cli_exports;
//# sourceMappingURL=index.cjs.map
