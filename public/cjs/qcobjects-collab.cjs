#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
(() => {
  "use strict";
  const path = require("path");
  const absolutePath = path.resolve(__dirname, "./");
  const { InheritClass, logger } = require("qcobjects");
  require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
  const { CollabServer } = require(absolutePath + "/org.quickcorp.qcobjects.collab.server.js");
  class Main extends InheritClass {
    static {
      __name(this, "Main");
    }
    constructor() {
      super();
      const app = new CollabServer();
      app.start();
      logger.debug("initialized");
    }
  }
  const __main__ = new Main();
})();
//# sourceMappingURL=qcobjects-collab.cjs.map
