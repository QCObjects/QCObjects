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
var org_quickcorp_qcobjects_api_client_services_exports = {};
__export(org_quickcorp_qcobjects_api_client_services_exports, {
  QuickCorpCloud: () => QuickCorpCloud
});
module.exports = __toCommonJS(org_quickcorp_qcobjects_api_client_services_exports);
const { Package, Service, logger } = require("qcobjects");
class QuickCorpCloud extends Service {
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
}
Package("org.quickcorp.qcobjects.api.client_services", [
  QuickCorpCloud
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QuickCorpCloud
});
//# sourceMappingURL=org.quickcorp.qcobjects.api.client_services.cjs.map
