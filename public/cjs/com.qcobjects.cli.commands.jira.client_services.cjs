"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/com.qcobjects.cli.commands.jira.client_services.ts
var { Package, Service, logger } = require("qcobjects");
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
//# sourceMappingURL=com.qcobjects.cli.commands.jira.client_services.cjs.map
