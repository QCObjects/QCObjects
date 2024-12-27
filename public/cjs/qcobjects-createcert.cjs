#!/usr/bin/env node
"use strict";
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
var import_node_path = __toESM(require("node:path"));
var import_node_os = __toESM(require("node:os"));
(async () => {
  "use strict";
  const absolutePath = import_node_path.default.resolve(__dirname, "./");
  const templatePath = import_node_path.default.resolve(__dirname, "./templates/apps/") + "/";
  const isWindows = /* @__PURE__ */ __name(() => {
    return import_node_os.default.platform().toLowerCase().startsWith("win");
  }, "isWindows");
  const isMac = /* @__PURE__ */ __name(() => {
    return import_node_os.default.platform().toLowerCase().startsWith("darwin");
  }, "isMac");
  const { InheritClass, CONFIG } = await import("qcobjects");
  await import(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
  const { execSync } = await import("node:child_process");
  class Main extends InheritClass {
    static {
      __name(this, "Main");
    }
    constructor() {
      super();
      this.start();
    }
    start() {
      const certificate_provider = CONFIG.get("certificate_provider", "self_signed");
      let stdout;
      switch (certificate_provider) {
        case "self_signed":
          if (isWindows()) {
            stdout = execSync('openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj "/CN=' + CONFIG.get("domain") + '"  -keyout ' + CONFIG.get("private-key-pem") + " -out " + CONFIG.get("private-cert-pem"));
          } else {
            stdout = execSync("openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=" + CONFIG.get("domain") + "'  -keyout " + CONFIG.get("private-key-pem") + " -out " + CONFIG.get("private-cert-pem"));
          }
          break;
        case "letsencrypt":
          if (isWindows()) {
            throw Error("Letsencrypt certificate is not supported in Windows");
          } else {
            var prehook_posthook = '--pre-hook "service qcobjects stop" --post-hook="service qcobjects start"';
            stdout = execSync(`certbot -n -d ${CONFIG.get("domain")} certonly --standalone ${prehook_posthook}`);
          }
          break;
        default:
          break;
      }
    }
  }
  const __main__ = new Main();
})().catch((e) => console.error(e));
//# sourceMappingURL=qcobjects-createcert.cjs.map
