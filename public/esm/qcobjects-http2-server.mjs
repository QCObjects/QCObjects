#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import "./defaultsettings.mjs";
import { HTTPServer } from "./main-http-server.mjs";
import { HTTP2Server } from "./main-http2-server.mjs";
import { CONFIG, InheritClass, New, logger } from "qcobjects";
var require_qcobjects_http2_server = __commonJS({
  "src/qcobjects-http2-server.ts"() {
    (async () => {
      "use strict";
      const path = await import("path");
      const absolutePath = path.resolve(__dirname, "./");
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
export default require_qcobjects_http2_server();
//# sourceMappingURL=qcobjects-http2-server.mjs.map
