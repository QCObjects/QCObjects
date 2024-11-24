var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
  get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
}) : x)(function(x) {
  if (typeof require !== "undefined") return require.apply(this, arguments);
  throw Error('Dynamic require of "' + x + '" is not supported');
});

// src/org.qcobjects.common.pipelog.ts
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
export {
  PipeLog
};
//# sourceMappingURL=org.qcobjects.common.pipelog.mjs.map
