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

// src/com.qcobjects.cli.commands.ts
var require_com_qcobjects_cli_commands = __commonJS({
  "src/com.qcobjects.cli.commands.ts"() {
    var fs = __require("fs");
    var path = __require("path");
    var absolutePath = path.resolve(__dirname, "./");
    var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
    var templatePwaPath = path.resolve(__dirname, "./templates/pwa/") + "/";
    var package_config = __require(absolutePath + "/../package.json");
    var { exec, execSync } = __require("child_process");
    __require(absolutePath + "/com.qcobjects.cli.commands.version");
    __require(absolutePath + "/com.qcobjects.cli.commands.jira");
  }
});
export default require_com_qcobjects_cli_commands();
//# sourceMappingURL=com.qcobjects.cli.commands.mjs.map
