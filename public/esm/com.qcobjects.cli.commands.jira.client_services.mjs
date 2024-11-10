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

// src/com.qcobjects.cli.commands.jira.client_services.ts
var require_com_qcobjects_cli_commands_jira_client_services = __commonJS({
  "src/com.qcobjects.cli.commands.jira.client_services.ts"(exports) {
    var { Package, Service, logger } = __require("qcobjects");
    var JiraCloud = class extends Service {
      static {
        __name(this, "JiraCloud");
      }
      constructor({
        name = "jira_cloud",
        external = true,
        useHTTP2 = true,
        cached = false,
        method = "POST",
        headers = {
          "accept": "application/json",
          "content-type": "application/json"
        },
        basePath = "",
        url = "",
        withCredentials = false
      }) {
        super({
          name,
          external,
          useHTTP2,
          cached,
          method,
          headers,
          basePath,
          url,
          withCredentials
        });
        var o = this;
        this.domain = `${o.domain}`;
        this.basePath = `https://${this.domain}/`;
        this.username_password = `${o.username}:${o.password}`;
        this.headers["authorization"] = `Basic ${Buffer.from(this.username_password).toString("base64")}`;
        this.url = this.basePath + o.apiMethod;
        this.data = o.data;
      }
      done(service, standardResponse) {
        logger.debug(standardResponse);
      }
      fail(e) {
        logger.debug(e);
      }
    };
    Package("com.qcobjects.cli.commands.jira.client_services", [
      JiraCloud
    ]);
    exports = { JiraCloud };
  }
});
export default require_com_qcobjects_cli_commands_jira_client_services();
//# sourceMappingURL=com.qcobjects.cli.commands.jira.client_services.mjs.map
