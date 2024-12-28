var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { Package, Service, logger } from "qcobjects";
class JiraCloud extends Service {
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
    logger.debug(standardResponse);
  }
  fail(e) {
    logger.debug(e);
  }
}
Package("com.qcobjects.cli.commands.jira.client_services", [
  JiraCloud
]);
export {
  JiraCloud
};
//# sourceMappingURL=com.qcobjects.cli.commands.jira.client_services.mjs.map
