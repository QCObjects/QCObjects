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

  // src/qcobjects-http2-server.ts
  var require_qcobjects_http2_server = __commonJS({
    "src/qcobjects-http2-server.ts"() {
      var path = __require("path");
      var absolutePath = path.resolve(__dirname, "./");
      __require("qcobjects");
      var { CONFIG, InheritClass, New, logger } = __require("qcobjects");
      __require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
      var HTTPServer = __require(absolutePath + "/org.quickcorp.qcobjects.main.http.server.js");
      var HTTP2Server = __require(absolutePath + "/org.quickcorp.qcobjects.main.http2.server.js");
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
    }
  });
  return require_qcobjects_http2_server();
})();
//# sourceMappingURL=qcobjects-http2-server.js.map
