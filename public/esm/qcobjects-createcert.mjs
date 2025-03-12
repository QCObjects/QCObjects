#!/usr/bin/env node
var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
import path from "node:path";
import os from "node:os";
import "./defaultsettings.mjs";
import { InheritClass, CONFIG } from "qcobjects";
var require_qcobjects_createcert = __commonJS({
  "src/qcobjects-createcert.ts"() {
    (async () => {
      "use strict";
      const absolutePath = path.resolve(__dirname, "./");
      const templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
      const isWindows = /* @__PURE__ */ __name(() => {
        return os.platform().toLowerCase().startsWith("win");
      }, "isWindows");
      const isMac = /* @__PURE__ */ __name(() => {
        return os.platform().toLowerCase().startsWith("darwin");
      }, "isMac");
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
  }
});
export default require_qcobjects_createcert();
//# sourceMappingURL=qcobjects-createcert.mjs.map
