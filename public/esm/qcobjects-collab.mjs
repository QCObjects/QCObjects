#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "path";
import "./defaultsettings";
import { CollabServer } from "./collab-server";
import { InheritClass, logger } from "qcobjects";
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
//# sourceMappingURL=qcobjects-collab.mjs.map
