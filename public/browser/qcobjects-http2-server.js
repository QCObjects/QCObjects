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
  var import_defaultsettings = require("./defaultsettings");
  var import_main_http_server = require("./main-http-server");
  var import_main_http2_server = require("./main-http2-server");
  var import_qcobjects = require("qcobjects");
  (async () => {
    "use strict";
    const path = await import("path");
    const absolutePath = path.resolve(__dirname, "./");
    class Main extends import_qcobjects.InheritClass {
      static {
        __name(this, "Main");
      }
      constructor() {
        super();
        const _ServerClass_ = import_qcobjects.CONFIG.get("useLegacyHTTP", false) ? import_main_http_server.HTTPServer : import_main_http2_server.HTTP2Server;
        const app = (0, import_qcobjects.New)(_ServerClass_);
        app.start();
        import_qcobjects.logger.debug("initialized");
      }
    }
    const __main__ = new Main();
  })().catch((e) => console.error(e));
})();
//# sourceMappingURL=qcobjects-http2-server.js.map
