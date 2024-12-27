"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var org_qcobjects_common_pipelog_exports = {};
__export(org_qcobjects_common_pipelog_exports, {
  PipeLog: () => PipeLog
});
module.exports = __toCommonJS(org_qcobjects_common_pipelog_exports);
const { Package, InheritClass } = require("qcobjects");
class PipeLog extends InheritClass {
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
}
Package("org.qcobjects.common.pipelog", [
  PipeLog
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PipeLog
});
//# sourceMappingURL=org.qcobjects.common.pipelog.cjs.map
