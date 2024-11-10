#!/usr/bin/env node
"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/qcobjects-createcert.ts
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var os = require("os");
var isWindows = /* @__PURE__ */ __name(() => {
  return os.platform().toLowerCase().startsWith("win");
}, "isWindows");
var { InheritClass, CONFIG } = require("qcobjects");
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var { execSync } = require("child_process");
var Main = class extends InheritClass {
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
};
var __main__ = new Main();
//# sourceMappingURL=qcobjects-createcert.cjs.map
