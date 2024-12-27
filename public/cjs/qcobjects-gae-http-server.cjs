#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
(() => {
  "use strict";
  const path = require("path");
  const absolutePath = path.resolve(__dirname, "./");
  const { InheritClass, New, logger } = require("qcobjects");
  require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
  const { HTTPServer } = require(absolutePath + "/org.quickcorp.qcobjects.main.http.gae.server.js");
  class Main extends InheritClass {
    static {
      __name(this, "Main");
    }
    constructor() {
      super();
      const app = New(HTTPServer);
      app.start();
      logger.debug("initialized");
    }
  }
  const __main__ = new Main();
})();
//# sourceMappingURL=qcobjects-gae-http-server.cjs.map
