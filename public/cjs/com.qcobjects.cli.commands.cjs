"use strict";

// src/com.qcobjects.cli.commands.ts
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
var package_config = require(absolutePath + "/../package.json");
var { exec, execSync } = require("child_process");
require(absolutePath + "/com.qcobjects.cli.commands.version");
require(absolutePath + "/com.qcobjects.cli.commands.jira");
//# sourceMappingURL=com.qcobjects.cli.commands.cjs.map
