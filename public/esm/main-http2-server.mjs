var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { findPackageNodePath, Import, Package, InheritClass, CONFIG, logger, New, global, ClassFactory } from "qcobjects";
import mime from "mime";
import path from "node:path";
import http2 from "node:http2";
import fs from "node:fs";
import os from "node:os";
import URL from "node:url";
import http from "node:http";
import { FileDispatcher } from "./main-file.mjs";
import { PipeLog } from "./common-pipelog.mjs";
const absolutePath = path.resolve(__dirname, "./");
const ImportMicroservice = /* @__PURE__ */ __name(function(microservicePackage) {
  var _ret_;
  var standardPath = findPackageNodePath(microservicePackage) || findPackageNodePath(microservicePackage + ".js");
  if (standardPath !== null) {
    _ret_ = Import(microservicePackage);
  } else {
    var nonStandardPath = findPackageNodePath(absolutePath + "/backend/" + microservicePackage) || findPackageNodePath(absolutePath + "/backend/" + microservicePackage + ".js");
    if (nonStandardPath !== null) {
      _ret_ = Import(absolutePath + "/backend/" + microservicePackage);
    } else {
      _ret_ = Promise.resolve((async () => await import(microservicePackage))());
    }
  }
  return _ret_;
}, "ImportMicroservice");
class HTTP2ServerResponse extends InheritClass {
  static {
    __name(this, "HTTP2ServerResponse");
  }
  fileDispatcher;
  request;
  headers;
  stream;
  body;
  constructor({
    headers = {
      ":status": 200,
      "content-type": "text/html",
      "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
    },
    body = "",
    request = null,
    fileDispatcher = null,
    stream = null
  }) {
    super();
    var self = this;
    self.request = request || {};
    self.stream = stream;
    self.headers = headers;
    self.body = body;
    self.fileDispatcher = fileDispatcher;
    if (!self.request.scriptname || !self.request.pathname) {
      const defaultPath = "/";
      self.request.pathname = self.request.pathname || defaultPath;
      self.request.scriptname = self.request.scriptname || CONFIG.get("documentRootFileIndex", "index.html");
    }
    if (!CONFIG.get("documentRoot")) {
      CONFIG.set("documentRoot", path.join(process.cwd(), "public"));
    }
    self._generateResponse();
  }
  sendFile(stream, fileName) {
    try {
      const fd = fs.openSync(fileName, "r");
      const stat = fs.fstatSync(fd);
      const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": mime.getType(fileName),
        "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
      };
      stream.respondWithFD(fd, headers);
      stream.on("close", () => {
        logger.debug("closing file " + fileName);
        fs.closeSync(fd);
      });
      stream.end();
    } catch (e) {
      logger.debug("[HTTP2ServerResponse][sendFile][ERROR] Something went wrong when trying to send the response as file " + fileName);
      if (e.errno == -2) {
        const headers = {
          ":status": 404,
          "content-type": mime.getType(fileName)
        };
        stream.respond(headers);
        stream.write("<h1>404 - FILE NOT FOUND</h1>");
        stream.on("close", () => {
          logger.debug("closing file " + fileName);
        });
        stream.end();
      }
    }
  }
  _generateResponse() {
    var response = this;
    response.fileDispatcher = New(FileDispatcher, {
      scriptname: response.request.scriptname,
      pathname: response.request.pathname,
      done(headers, body, templateURI, isTemplate) {
        response.headers = headers;
        var stream = response.stream;
        if (isTemplate) {
          response.body = body;
          stream.respond(response.headers);
          stream.write(response.body);
          stream.end();
        } else if (headers[":status"] == 200) {
          response.sendFile(stream, templateURI);
        } else {
          stream.respond(response.headers);
          stream.end();
        }
      }
    });
  }
}
class HTTP2ServerRequest extends InheritClass {
  static {
    __name(this, "HTTP2ServerRequest");
  }
  constructor({
    scriptname = "",
    path: path2 = "",
    method = "",
    url = "",
    headers = null,
    flags = null,
    protocol = null,
    slashes = null,
    auth = null,
    host = null,
    port = null,
    hostname = null,
    hash = null,
    search = "",
    query = "",
    pathname = "",
    href = ""
  }) {
    super({
      scriptname,
      path: path2,
      method,
      url,
      headers,
      flags,
      protocol,
      slashes,
      auth,
      host,
      port,
      hostname,
      hash,
      search,
      query,
      pathname,
      href
    });
  }
}
class HTTP2Server extends InheritClass {
  static {
    __name(this, "HTTP2Server");
  }
  server;
  interceptorInstances;
  request;
  response;
  constructor({
    request = null,
    response = "",
    server = null,
    scriptname = "",
    interceptorInstances = []
  }) {
    super({
      request,
      response,
      server,
      scriptname,
      interceptorInstances
    });
    const welcometo = "Welcome to \n";
    const instructions = "HTTP2Server \n";
    const logo = ` .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r
d88P" "Y88bd88P  Y88bd88P" "Y88b888       Y8P                888            \r
888     888888    888888     888888                          888            \r
888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r
888     888888       888     888888 "88b "888d8P  Y8bd88P"   888   88K      \r
888 Y8b 888888    888888     888888  888  88888888888888     888   "Y8888b. \r
Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r
 "Y888888"  "Y8888P"  "Y88888P" 88888P"   888 "Y8888  "Y8888P "Y888 88888P' \r
       Y8b                                888                               \r
                                         d88P                               \r
                                       888P"   `;
    console.log(welcometo);
    console.log(logo);
    console.log(instructions);
    logger.debug(this.showIPAddress());
    logger.info("Listening on HTTP PORT: " + CONFIG.get("serverPortHTTP").toString());
    logger.info("Listening on HTTPS PORT: " + CONFIG.get("serverPortHTTPS").toString());
    logger.info("Go to: \n" + this.showPossibleURL());
    const http2ServerInstance = this;
    http2ServerInstance.server = http2.createSecureServer({
      key: fs.readFileSync(CONFIG.get("private-key-pem")),
      cert: fs.readFileSync(CONFIG.get("private-cert-pem")),
      allowHTTP1: CONFIG.get("allowHTTP1"),
      origins: ["https://" + CONFIG.get("domain"), "http://" + CONFIG.get("domain")]
    });
    server = http2ServerInstance.server;
    server.on("error", (err) => console.error(err));
    server.on("session", (session) => {
      session.altsvc('h2=":8000"', "https://" + CONFIG.get("domain"));
      session.altsvc('https=":' + CONFIG.get("serverPortHTTPS") + '"', "https://" + CONFIG.get("domain"));
      session.altsvc('http=":' + CONFIG.get("serverPortHTTP") + '"', "http://" + CONFIG.get("domain"));
      session.origin("https://" + CONFIG.get("domain"), "http://" + CONFIG.get("domain"));
    });
    if (global.get("backendAvailable")) {
      logger.info("Loading backend interceptors...");
      const interceptors = CONFIG.get("backend", {}).interceptors;
      if (typeof interceptors !== "undefined") {
        logger.info("Backend Interceptors Available");
        interceptors.map((interceptor) => {
          ImportMicroservice(interceptor.microservice);
          var interceptorClassFactory = ClassFactory(interceptor.microservice + ".Interceptor");
          var interceptorInstance = New(interceptorClassFactory, {
            domain: CONFIG.get("domain"),
            basePath: CONFIG.get("basePath"),
            projectPath: CONFIG.get("projectPath"),
            interceptor,
            server
          });
          http2ServerInstance.interceptorInstances.push(interceptorInstance);
        });
      }
    }
    server.on("stream", (stream, headers, flags) => {
      CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 2e4);
      stream.session.setTimeout(CONFIG.get("backendTimeout"));
      stream.session.setMaxListeners(9999999999);
      var timeoutHandler = /* @__PURE__ */ __name(() => {
        try {
          if (!stream.destroyed) {
            logger.info("A timeout occurred... " + CONFIG.get("backendTimeout").toString());
            logger.info("Killing session...");
            stream.respond({
              ":status": 500,
              "content-type": "text/html"
            });
            stream.on("error", () => {
            });
            stream.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
            stream.end();
          } else {
            logger.debug("Session was normally finishing...");
          }
        } catch (e) {
          logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
        }
        if (!stream.destroyed) {
          stream.session.removeListener("timeout", timeoutHandler);
        } else {
          server.removeListener("timeout", timeoutHandler);
        }
      }, "timeoutHandler");
      if (!stream.destroyed) {
        stream.session.on("timeout", timeoutHandler);
      }
      stream.session.altsvc('h2=":8000"', stream.id);
      stream.session.altsvc('https=":' + CONFIG.get("serverPortHTTPS") + '"', stream.id);
      stream.session.altsvc('http=":' + CONFIG.get("serverPortHTTP") + '"', stream.id);
      const request2 = Object.assign(New(HTTP2ServerRequest), URL.parse(headers[":path"]));
      request2.headers = headers;
      request2.flags = flags;
      http2ServerInstance.request = request2;
      http2ServerInstance.request.method = headers[":method"];
      http2ServerInstance.request.path = headers[":path"];
      const pathParts = http2ServerInstance.request.pathname.split("/");
      if (pathParts.length > 0) {
        if (http2ServerInstance.request.pathname.indexOf(".") < 0) {
          http2ServerInstance.request.scriptname = CONFIG.get("documentRootFileIndex", "index.html");
        } else {
          http2ServerInstance.request.scriptname = pathParts[pathParts.length - 1];
          http2ServerInstance.request.pathname = http2ServerInstance.request.pathname.substr(0, http2ServerInstance.request.pathname.lastIndexOf("/"));
        }
      } else {
        http2ServerInstance.request.scriptname = CONFIG.get("documentRootFileIndex", "index.html");
        http2ServerInstance.request.pathname = "/";
      }
      logger.debug(PipeLog.pipe(this.request));
      if (global.get("backendAvailable")) {
        logger.info("Backend Microservices Available...");
        logger.info("Loading backend routes...");
        const routes = CONFIG.get("backend", {}).routes;
        const selectedRoute = routes.filter((route) => {
          const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
          return new RegExp(standardRoutePath, "g").test(request2.path);
        });
        if (selectedRoute.length > 0) {
          selectedRoute.map((route) => {
            const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
            console.log(standardRoutePath);
            const selectedRouteParams = {
              ...[...request2.path.matchAll(new RegExp(standardRoutePath, "g"))][0]["groups"]
            };
            ImportMicroservice(route.microservice).then(function() {
              logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
              var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
              if (typeof microServiceClassFactory !== "undefined") {
                http2ServerInstance.response = New(microServiceClassFactory, {
                  domain: CONFIG.get("domain"),
                  basePath: CONFIG.get("basePath"),
                  projectPath: CONFIG.get("projectPath"),
                  route,
                  routeParams: selectedRouteParams,
                  server,
                  stream,
                  request: request2
                });
              } else {
                throw Error(`${route.microservice + ".Microservice"} not defined.`);
              }
            }).catch((e) => {
              throw Error(e);
            });
          });
        } else {
          this.response = New(HTTP2ServerResponse, {
            domain: CONFIG.get("domain"),
            basePath: CONFIG.get("basePath"),
            projectPath: CONFIG.get("projectPath"),
            server,
            stream,
            request: request2
          });
        }
      } else {
        this.response = New(HTTP2ServerResponse, {
          domain: CONFIG.get("domain"),
          basePath: CONFIG.get("basePath"),
          projectPath: CONFIG.get("projectPath"),
          server,
          stream,
          request: request2
        });
      }
    });
  }
  showIPAddress() {
    var _ret_ = "";
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function(iface) {
      ifaces[iface]?.map(function(ipGroup) {
        _ret_ += iface + ": " + PipeLog.pipe(ipGroup) + "\n";
      });
    });
    return _ret_;
  }
  showPossibleURL() {
    let _ret_ = "";
    const ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach((iface) => {
      ifaces[iface]?.forEach((ipGroup) => {
        if (ipGroup.family.toLowerCase() === "ipv4") {
          _ret_ += `http://${ipGroup.address}:${CONFIG.get("serverPortHTTP")}/
`;
          _ret_ += `https://${ipGroup.address}:${CONFIG.get("serverPortHTTPS")}/
`;
        }
      });
    });
    return _ret_;
  }
  start() {
    var server = this.server;
    const httpServer = http.createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
      });
      res.end();
    });
    httpServer.listen(CONFIG.get("serverPortHTTP"));
    server.listen(CONFIG.get("serverPortHTTPS"));
  }
}
Package("org.quickcorp.qcobjects.main.http2.server", [
  HTTP2ServerResponse,
  HTTP2ServerRequest,
  HTTP2Server
]);
export {
  HTTP2Server
};
//# sourceMappingURL=main-http2-server.mjs.map
