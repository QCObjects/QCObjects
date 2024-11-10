#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/qcobjects-http-server.ts
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var { InheritClass, New, logger } = require("qcobjects");
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var { HTTPServer } = require(absolutePath + "/org.quickcorp.qcobjects.main.http.server.js");
var Main = class extends InheritClass {
  static {
    __name(this, "Main");
  }
  constructor() {
    super();
    const app = New(HTTPServer);
    app.start();
    logger.debug("initialized");
  }
};
var __main__ = new Main();
//# sourceMappingURL=qcobjects-http-server.cjs.map
