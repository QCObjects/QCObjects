#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import path from "path";
import "./defaultsettings";
import { CollabServer } from "./collab-server";
import { InheritClass, logger } from "qcobjects";
var require_qcobjects_collab = __commonJS({
  "src/qcobjects-collab.ts"() {
    const absolutePath = path.resolve(__dirname, "./");
    class Main extends InheritClass {
      static {
        __name(this, "Main");
      }
      constructor() {
        super();
        const app = new CollabServer();
        app.start();
        logger.debug("initialized");
      }
    }
    const __main__ = new Main();
  }
});
export default require_qcobjects_collab();
//# sourceMappingURL=qcobjects-collab.mjs.map
