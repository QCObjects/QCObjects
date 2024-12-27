#!/usr/bin/env node
"use strict";
var global = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var require_qcobjects_gae_http_server = __commonJS({
    "src/qcobjects-gae-http-server.ts"() {
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
    }
  });
  return require_qcobjects_gae_http_server();
})();
//# sourceMappingURL=qcobjects-gae-http-server.js.map
