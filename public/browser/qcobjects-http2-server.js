#!/usr/bin/env node
"use strict";
var global = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var require_qcobjects_http2_server = __commonJS({
    "src/qcobjects-http2-server.ts"() {
      (async () => {
        "use strict";
        const path = await import("path");
        const absolutePath = path.resolve(__dirname, "./");
        await import("qcobjects");
        const { CONFIG, InheritClass, New, logger } = await import("qcobjects");
        await import(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
        const HTTPServer = await import(absolutePath + "/org.quickcorp.qcobjects.main.http.server.js");
        const HTTP2Server = await import(absolutePath + "/org.quickcorp.qcobjects.main.http2.server.js");
        class Main extends InheritClass {
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
        }
        const __main__ = new Main();
      })().catch((e) => console.error(e));
    }
  });
  return require_qcobjects_http2_server();
})();
//# sourceMappingURL=qcobjects-http2-server.js.map
