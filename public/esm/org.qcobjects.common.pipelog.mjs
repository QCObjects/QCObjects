var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
export {
  PipeLog
};
//# sourceMappingURL=org.qcobjects.common.pipelog.mjs.map
