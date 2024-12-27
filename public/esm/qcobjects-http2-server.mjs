#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
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
export default require_qcobjects_http2_server();
//# sourceMappingURL=qcobjects-http2-server.mjs.map
