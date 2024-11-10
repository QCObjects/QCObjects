#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/qcobjects-http2-server.ts
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
require("qcobjects");
var { CONFIG, InheritClass, New, logger } = require("qcobjects");
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var HTTPServer = require(absolutePath + "/org.quickcorp.qcobjects.main.http.server.js");
var HTTP2Server = require(absolutePath + "/org.quickcorp.qcobjects.main.http2.server.js");
var Main = class extends InheritClass {
  static {
    __name(this, "Main");
  }
  constructor() {
    super();
    const _ServerClass_ = CONFIG.get("useLegacyHTTP", false) ? HTTPServer : HTTP2Server;
    const app = New(_ServerClass_);
    app.start();
    logger.debug("initialized");
  }
};
var __main__ = new Main();
//# sourceMappingURL=qcobjects-http2-server.cjs.map
