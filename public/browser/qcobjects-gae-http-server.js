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
  var import_path = __toESM(require("path"));
  var import_qcobjects = require("qcobjects");
  var import_defaultsettings = require("./defaultsettings");
  var import_main_http_gae_server = require("./main-http-gae-server");
  const absolutePath = import_path.default.resolve(__dirname, "./");
  class Main extends import_qcobjects.InheritClass {
    static {
      __name(this, "Main");
    }
    constructor() {
      super();
      const app = (0, import_qcobjects.New)(import_main_http_gae_server.HTTPServer);
      app.start();
      import_qcobjects.logger.debug("initialized");
    }
  }
  const __main__ = new Main();
})();
//# sourceMappingURL=qcobjects-gae-http-server.js.map
