"use strict";
var global = (() => {
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

  // src/org.qcobjects.common.pipelog.ts
  var org_qcobjects_common_pipelog_exports = {};
  __export(org_qcobjects_common_pipelog_exports, {
    PipeLog: () => PipeLog
  });
  var { Package, InheritClass } = __require("qcobjects");
  var PipeLog = class extends InheritClass {
    static {
      __name(this, "PipeLog");
    }
    pipe(o) {
      var _o = [];
      for (var k in o) {
        if (typeof o[k] !== "undefined" && o[k] !== null && typeof o[k] !== "function") {
          try {
            _o.push("" + k + "=" + o[k].toString());
          } catch (e) {
          }
        }
      }
      return _o.join(" ");
    }
  };
  Package("org.qcobjects.common.pipelog", [
    PipeLog
  ]);
  return __toCommonJS(org_qcobjects_common_pipelog_exports);
})();
//# sourceMappingURL=org.qcobjects.common.pipelog.js.map
