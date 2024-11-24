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

  // src/com.qcobjects.cli.commands.jira.client_services.ts
  var com_qcobjects_cli_commands_jira_client_services_exports = {};
  __export(com_qcobjects_cli_commands_jira_client_services_exports, {
    JiraCloud: () => JiraCloud
  });
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
  return __toCommonJS(com_qcobjects_cli_commands_jira_client_services_exports);
})();
//# sourceMappingURL=com.qcobjects.cli.commands.jira.client_services.js.map
