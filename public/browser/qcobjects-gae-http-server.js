#!/usr/bin/env node
"use strict";
var global = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };

  // src/qcobjects-gae-http-server.ts
  var require_qcobjects_gae_http_server = __commonJS({
    "src/qcobjects-gae-http-server.ts"() {
      var path = __require("path");
      var absolutePath = path.resolve(__dirname, "./");
      var { InheritClass, New, logger } = __require("qcobjects");
      __require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
      var { HTTPServer } = __require(absolutePath + "/org.quickcorp.qcobjects.main.http.gae.server.js");
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
    }
  });
  return require_qcobjects_gae_http_server();
})();
//# sourceMappingURL=qcobjects-gae-http-server.js.map
