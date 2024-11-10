#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/qcobjects-collab.ts
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var { InheritClass, logger } = require("qcobjects");
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var { CollabServer } = require(absolutePath + "/org.quickcorp.qcobjects.collab.server.js");
var Main = class extends InheritClass {
  static {
    __name(this, "Main");
  }
  constructor() {
    super();
    const app = new CollabServer();
    app.start();
    logger.debug("initialized");
  }
};
var __main__ = new Main();
//# sourceMappingURL=qcobjects-collab.cjs.map
