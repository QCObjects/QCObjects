#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import path from "path";
import { InheritClass, New, logger } from "qcobjects";
var require_qcobjects_http_server = __commonJS({
  "src/qcobjects-http-server.ts"() {
    (async () => {
      "use strict";
      const absolutePath = path.resolve(__dirname, "./");
      await import(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
      const { HTTPServer } = await import(absolutePath + "/org.quickcorp.qcobjects.main.http.server.js");
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
    })().catch((e) => console.error(e));
  }
});
export default require_qcobjects_http_server();
//# sourceMappingURL=qcobjects-http-server.mjs.map
