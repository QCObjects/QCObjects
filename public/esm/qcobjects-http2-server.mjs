#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import "./defaultsettings";
import { HTTPServer } from "./main-http-server";
import { HTTP2Server } from "./main-http2-server";
import { CONFIG, InheritClass, New, logger } from "qcobjects";
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
//# sourceMappingURL=qcobjects-http2-server.mjs.map
