#!/usr/bin/env node
var __getOwnPropNames = Object.getOwnPropertyNames;
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/qcobjects-shell.ts
import path from "path";
import vm from "vm";
import readline from "readline";
var require_qcobjects_shell = __commonJS({
  "src/qcobjects-shell.ts"(exports, module) {
    var absolutePath = path.resolve(__dirname, "./");
    var { InheritClass, global } = __require("qcobjects");
    __require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
    var package_config = __require(absolutePath + "/package.json");
  }
});
export default require_qcobjects_shell();
//# sourceMappingURL=qcobjects-shell.mjs.map
