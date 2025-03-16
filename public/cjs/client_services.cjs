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
var client_services_exports = {};
__export(client_services_exports, {
  JiraCloud: () => JiraCloud
});
module.exports = __toCommonJS(client_services_exports);
var import_qcobjects = require("qcobjects");
class JiraCloud extends import_qcobjects.Service {
  static {
    __name(this, "JiraCloud");
  }
  domain;
  basePath;
  username_password;
  username;
  password;
  headers;
  url;
  apiMethod;
  data;
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
    import_qcobjects.logger.debug(standardResponse);
  }
  fail(e) {
    import_qcobjects.logger.debug(e);
  }
}
(0, import_qcobjects.Package)("com.qcobjects.cli.commands.jira.client_services", [
  JiraCloud
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  JiraCloud
});
//# sourceMappingURL=client_services.cjs.map
