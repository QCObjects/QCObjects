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

  // src/qcobjects-collab.ts
  var require_qcobjects_collab = __commonJS({
    "src/qcobjects-collab.ts"() {
      var path = __require("path");
      var absolutePath = path.resolve(__dirname, "./");
      var { InheritClass, logger } = __require("qcobjects");
      __require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
      var { CollabServer } = __require(absolutePath + "/org.quickcorp.qcobjects.collab.server.js");
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
    }
  });
  return require_qcobjects_collab();
})();
//# sourceMappingURL=qcobjects-collab.js.map
