var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});
var __commonJS = (cb, mod) => function __require2() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};

// src/org.qcobjects.common.pipelog.ts
var require_org_qcobjects_common_pipelog = __commonJS({
  "src/org.qcobjects.common.pipelog.ts"() {
    var { Package, InheritClass } = __require("qcobjects");
    Package("org.qcobjects.common.pipelog", [
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
    ]);
  }
});
export default require_org_qcobjects_common_pipelog();
//# sourceMappingURL=org.qcobjects.common.pipelog.mjs.map
