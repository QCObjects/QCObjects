#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "path";
import { InheritClass, New, logger } from "qcobjects";
import "./defaultsettings";
import { HTTPServer } from "./main-http-gae-server";
const absolutePath = path.resolve(__dirname, "./");
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
//# sourceMappingURL=qcobjects-gae-http-server.mjs.map
