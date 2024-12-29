"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var main_http2_server_exports = {};
__export(main_http2_server_exports, {
  HTTP2Server: () => HTTP2Server
});
module.exports = __toCommonJS(main_http2_server_exports);
var import_qcobjects = require("qcobjects");
var import_mime = __toESM(require("mime"));
var import_node_path = __toESM(require("node:path"));
var import_node_http2 = __toESM(require("node:http2"));
var import_node_fs = __toESM(require("node:fs"));
var import_node_os = __toESM(require("node:os"));
var import_node_url = __toESM(require("node:url"));
var import_node_http = __toESM(require("node:http"));
var import_main_file = require("./main-file.cjs");
var import_common_pipelog = require("./common-pipelog.cjs");
const absolutePath = import_node_path.default.resolve(__dirname, "./");
const ImportMicroservice = /* @__PURE__ */ __name(function(microservicePackage) {
  var _ret_;
  var standardPath = (0, import_qcobjects.findPackageNodePath)(microservicePackage) || (0, import_qcobjects.findPackageNodePath)(microservicePackage + ".js");
  if (standardPath !== null) {
    _ret_ = (0, import_qcobjects.Import)(microservicePackage);
  } else {
    var nonStandardPath = (0, import_qcobjects.findPackageNodePath)(absolutePath + "/backend/" + microservicePackage) || (0, import_qcobjects.findPackageNodePath)(absolutePath + "/backend/" + microservicePackage + ".js");
    if (nonStandardPath !== null) {
      _ret_ = (0, import_qcobjects.Import)(absolutePath + "/backend/" + microservicePackage);
    } else {
      _ret_ = Promise.resolve((async () => await import(microservicePackage))());
    }
  }
  return _ret_;
}, "ImportMicroservice");
class HTTP2ServerResponse extends import_qcobjects.InheritClass {
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
      "cache-control": import_qcobjects.CONFIG.get("cacheControl", "max-age=31536000")
    },
    body = "",
    request = null,
    fileDispatcher = null,
    stream = null
  }) {
    super();
    var self = this;
    self._generateResponse();
  }
  sendFile(stream, fileName) {
    try {
      const fd = import_node_fs.default.openSync(fileName, "r");
      const stat = import_node_fs.default.fstatSync(fd);
      const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": import_mime.default.getType(fileName),
        "cache-control": import_qcobjects.CONFIG.get("cacheControl", "max-age=31536000")
      };
      stream.respondWithFD(fd, headers);
      stream.on("close", () => {
        import_qcobjects.logger.debug("closing file " + fileName);
        import_node_fs.default.closeSync(fd);
      });
      stream.end();
    } catch (e) {
      import_qcobjects.logger.debug("[HTTP2ServerResponse][sendFile][ERROR] Something went wrong when trying to send the response as file " + fileName);
      if (e.errno == -2) {
        const headers = {
          ":status": 404,
          "content-type": import_mime.default.getType(fileName)
        };
        stream.respond(headers);
        stream.write("<h1>404 - FILE NOT FOUND</h1>");
        stream.on("close", () => {
          import_qcobjects.logger.debug("closing file " + fileName);
        });
        stream.end();
      }
    }
  }
  _generateResponse() {
    var response = this;
    response.fileDispatcher = (0, import_qcobjects.New)(import_main_file.FileDispatcher, {
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
class HTTP2ServerRequest extends import_qcobjects.InheritClass {
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
class HTTP2Server extends import_qcobjects.InheritClass {
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
    import_qcobjects.logger.debug(this.showIPAddress());
    import_qcobjects.logger.info("Listening on HTTP PORT: " + import_qcobjects.CONFIG.get("serverPortHTTP").toString());
    import_qcobjects.logger.info("Listening on HTTPS PORT: " + import_qcobjects.CONFIG.get("serverPortHTTPS").toString());
    import_qcobjects.logger.info("Go to: \n" + this.showPossibleURL());
    const http2ServerInstance = this;
    http2ServerInstance.server = import_node_http2.default.createSecureServer({
      key: import_node_fs.default.readFileSync(import_qcobjects.CONFIG.get("private-key-pem")),
      cert: import_node_fs.default.readFileSync(import_qcobjects.CONFIG.get("private-cert-pem")),
      allowHTTP1: import_qcobjects.CONFIG.get("allowHTTP1"),
      origins: ["https://" + import_qcobjects.CONFIG.get("domain"), "http://" + import_qcobjects.CONFIG.get("domain")]
    });
    server = http2ServerInstance.server;
    server.on("error", (err) => console.error(err));
    server.on("session", (session) => {
      session.altsvc('h2=":8000"', "https://" + import_qcobjects.CONFIG.get("domain"));
      session.altsvc('https=":' + import_qcobjects.CONFIG.get("serverPortHTTPS") + '"', "https://" + import_qcobjects.CONFIG.get("domain"));
      session.altsvc('http=":' + import_qcobjects.CONFIG.get("serverPortHTTP") + '"', "http://" + import_qcobjects.CONFIG.get("domain"));
      session.origin("https://" + import_qcobjects.CONFIG.get("domain"), "http://" + import_qcobjects.CONFIG.get("domain"));
    });
    if (import_qcobjects.global.get("backendAvailable")) {
      import_qcobjects.logger.info("Loading backend interceptors...");
      const interceptors = import_qcobjects.CONFIG.get("backend", {}).interceptors;
      if (typeof interceptors !== "undefined") {
        import_qcobjects.logger.info("Backend Interceptors Available");
        interceptors.map((interceptor) => {
          ImportMicroservice(interceptor.microservice);
          var interceptorClassFactory = (0, import_qcobjects.ClassFactory)(interceptor.microservice + ".Interceptor");
          var interceptorInstance = (0, import_qcobjects.New)(interceptorClassFactory, {
            domain: import_qcobjects.CONFIG.get("domain"),
            basePath: import_qcobjects.CONFIG.get("basePath"),
            projectPath: import_qcobjects.CONFIG.get("projectPath"),
            interceptor,
            server
          });
          http2ServerInstance.interceptorInstances.push(interceptorInstance);
        });
      }
    }
    server.on("stream", (stream, headers, flags) => {
      import_qcobjects.CONFIG.set("backendTimeout", import_qcobjects.CONFIG.get("backendTimeout") || 2e4);
      stream.session.setTimeout(import_qcobjects.CONFIG.get("backendTimeout"));
      stream.session.setMaxListeners(9999999999);
      var timeoutHandler = /* @__PURE__ */ __name(() => {
        try {
          if (!stream.destroyed) {
            import_qcobjects.logger.info("A timeout occurred... " + import_qcobjects.CONFIG.get("backendTimeout").toString());
            import_qcobjects.logger.info("Killing session...");
            stream.respond({
              ":status": 500,
              "content-type": "text/html"
            });
            stream.on("error", () => {
            });
            stream.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
            stream.end();
          } else {
            import_qcobjects.logger.debug("Session was normally finishing...");
          }
        } catch (e) {
          import_qcobjects.logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
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
      stream.session.altsvc('https=":' + import_qcobjects.CONFIG.get("serverPortHTTPS") + '"', stream.id);
      stream.session.altsvc('http=":' + import_qcobjects.CONFIG.get("serverPortHTTP") + '"', stream.id);
      const request2 = Object.assign((0, import_qcobjects.New)(HTTP2ServerRequest), import_node_url.default.parse(headers[":path"]));
      request2.headers = headers;
      request2.flags = flags;
      http2ServerInstance.request = request2;
      http2ServerInstance.request.method = headers[":method"];
      http2ServerInstance.request.path = headers[":path"];
      if (http2ServerInstance.request.pathname.indexOf(".") < 0) {
        http2ServerInstance.request.scriptname = import_qcobjects.CONFIG.get("documentRootFileIndex");
      } else {
        http2ServerInstance.request.scriptname = http2ServerInstance.request.pathname.split("/").reverse()[0];
      }
      http2ServerInstance.request.pathname = this.request.pathname.substr(0, http2ServerInstance.request.pathname.lastIndexOf("/"));
      import_qcobjects.logger.debug(import_common_pipelog.PipeLog.pipe(this.request));
      if (import_qcobjects.global.get("backendAvailable")) {
        import_qcobjects.logger.info("Backend Microservices Available...");
        import_qcobjects.logger.info("Loading backend routes...");
        const routes = import_qcobjects.CONFIG.get("backend", {}).routes;
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
              import_qcobjects.logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
              var microServiceClassFactory = (0, import_qcobjects.ClassFactory)(route.microservice + ".Microservice");
              if (typeof microServiceClassFactory !== "undefined") {
                http2ServerInstance.response = (0, import_qcobjects.New)(microServiceClassFactory, {
                  domain: import_qcobjects.CONFIG.get("domain"),
                  basePath: import_qcobjects.CONFIG.get("basePath"),
                  projectPath: import_qcobjects.CONFIG.get("projectPath"),
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
          this.response = (0, import_qcobjects.New)(HTTP2ServerResponse, {
            domain: import_qcobjects.CONFIG.get("domain"),
            basePath: import_qcobjects.CONFIG.get("basePath"),
            projectPath: import_qcobjects.CONFIG.get("projectPath"),
            server,
            stream,
            request: request2
          });
        }
      } else {
        this.response = (0, import_qcobjects.New)(HTTP2ServerResponse, {
          domain: import_qcobjects.CONFIG.get("domain"),
          basePath: import_qcobjects.CONFIG.get("basePath"),
          projectPath: import_qcobjects.CONFIG.get("projectPath"),
          server,
          stream,
          request: request2
        });
      }
    });
  }
  showIPAddress() {
    var _ret_ = "";
    var ifaces = import_node_os.default.networkInterfaces();
    Object.keys(ifaces).forEach(function(iface) {
      ifaces[iface]?.map(function(ipGroup) {
        _ret_ += iface + ": " + import_common_pipelog.PipeLog.pipe(ipGroup) + "\n";
      });
    });
    return _ret_;
  }
  showPossibleURL() {
    let _ret_ = "";
    const ifaces = import_node_os.default.networkInterfaces();
    Object.keys(ifaces).forEach((iface) => {
      ifaces[iface]?.forEach((ipGroup) => {
        if (ipGroup.family.toLowerCase() === "ipv4") {
          _ret_ += `http://${ipGroup.address}:${import_qcobjects.CONFIG.get("serverPortHTTP")}/
`;
          _ret_ += `https://${ipGroup.address}:${import_qcobjects.CONFIG.get("serverPortHTTPS")}/
`;
        }
      });
    });
    return _ret_;
  }
  start() {
    var server = this.server;
    const httpServer = import_node_http.default.createServer((req, res) => {
      res.writeHead(301, {
        Location: `https://${req.headers.host}${req.url}`
      });
      res.end();
    });
    httpServer.listen(import_qcobjects.CONFIG.get("serverPortHTTP"));
    server.listen(import_qcobjects.CONFIG.get("serverPortHTTPS"));
  }
}
(0, import_qcobjects.Package)("org.quickcorp.qcobjects.main.http2.server", [
  HTTP2ServerResponse,
  HTTP2ServerRequest,
  HTTP2Server
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  HTTP2Server
});
//# sourceMappingURL=main-http2-server.cjs.map
