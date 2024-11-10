"use strict";
var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// src/org.quickcorp.qcobjects.api.client_services.ts
var { Package, Service, logger } = require("qcobjects");
var QuickCorpCloud = class extends Service {
  static {
    __name(this, "QuickCorpCloud");
  }
  constructor({
    name = "quickcorp_cloud",
    external = true,
    useHTTP2 = true,
    cached = false,
    method = "post",
    headers = {
      "origin": "localhost",
      "content-type": "application/json"
    },
    basePath = "https://cloud.quickcorp.org/",
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
  }
  _new_(o) {
    this.headers["authorization"] = "Basic token";
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
Package("org.quickcorp.qcobjects.api.client_services", [
  QuickCorpCloud
]);
exports = {
  QuickCorpCloud
};
//# sourceMappingURL=org.quickcorp.qcobjects.api.client_services.cjs.map
