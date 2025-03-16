var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Package, Service, logger } from "qcobjects";
class QuickCorpCloud extends Service {
  static {
    __name(this, "QuickCorpCloud");
  }
  headers;
  url;
  basePath;
  data;
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
export {
  QuickCorpCloud
};
//# sourceMappingURL=api-client_services.mjs.map
