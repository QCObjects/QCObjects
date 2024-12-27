"use strict";
var global = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
  var require_org_quickcorp_qcobjects_main_http_gae_server = __commonJS({
    "src/org.quickcorp.qcobjects.main.http.gae.server.ts"() {
      var import_node_os = __toESM(require("node:os"));
      var import_node_path = __toESM(require("node:path"));
      var import_node_fs = __toESM(require("node:fs"));
      var import_node_http = __toESM(require("node:http"));
      var import_mime = __toESM(require("mime"));
      (async () => {
        "use strict";
        const { findPackageNodePath, Import, Package, InheritClass, CONFIG, logger, New, global, ClassFactory, Export } = await import("qcobjects");
        const absolutePath = import_node_path.default.resolve(__dirname, "./");
        const { FileDispatcher } = await import(absolutePath + "/org.quickcorp.qcobjects.main.file.js");
        const { PipeLog } = await import(absolutePath + "/org.qcobjects.common.pipelog.js");
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
              _ret_ = Promise.resolve(async () => (await import(microservicePackage))());
            }
          }
          return _ret_;
        }, "ImportMicroservice");
        class BackendMicroservice extends InheritClass {
          static {
            __name(this, "BackendMicroservice");
          }
          domain;
          basePath;
          server;
          request;
          req;
          get;
          route;
          headers;
          body;
          stream;
          constructor(o) {
            super(o);
            this.domain = CONFIG.get("domain");
            this.basePath = CONFIG.get("basePath");
            logger.debug("Executing GAE HTTP BackendMicroservice ");
            const microservice = this;
            const server = microservice.server;
            const request = microservice.request;
            this.cors();
            microservice.req.on("data", (data) => {
              var requestMethod2 = request.method.toLowerCase();
              var supportedMethods2 = {
                "post": microservice.post.bind(this)
              };
              if (supportedMethods2.hasOwnProperty.call(supportedMethods2, requestMethod2)) {
                supportedMethods2[requestMethod2].call(microservice, data);
              }
            });
            var requestMethod = request.method.toLowerCase();
            var supportedMethods = {
              "get": microservice.get.bind(this),
              "head": microservice.head.bind(this),
              "put": microservice.put.bind(this),
              "delete": microservice.delete.bind(this),
              "connect": microservice.connect.bind(this),
              "options": microservice.options.bind(this),
              "trace": microservice.trace.bind(this),
              "patch": microservice.patch.bind(this)
            };
            if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
              supportedMethods[requestMethod].call(microservice);
            }
          }
          cors() {
            if (this.route.cors) {
              const {
                allow_origins,
                allow_credentials,
                allow_methods,
                allow_headers
              } = this.route.cors;
              var microservice = this;
              if (typeof microservice.headers !== "object") {
                microservice.headers = {};
              }
              if (typeof allow_origins !== "undefined") {
                if (allow_origins == "*" || typeof microservice.request.headers.origin == "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                  microservice.headers["Access-Control-Allow-Origin"] = "*";
                } else {
                  logger.debug("Origin is not allowed: " + microservice.request.headers.origin);
                  logger.debug("Forcing to finish the response...");
                  this.body = {};
                  try {
                    this.done();
                  } catch (e) {
                  }
                }
              } else {
                microservice.headers["Access-Control-Allow-Origin"] = "*";
              }
              if (typeof allow_credentials !== "undefined") {
                microservice.headers["Access-Control-Allow-Credentials"] = allow_credentials.toString();
              } else {
                microservice.headers["Access-Control-Allow-Credentials"] = "true";
              }
              if (typeof allow_methods !== "undefined") {
                microservice.headers["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
              } else {
                microservice.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
              }
              if (typeof allow_headers !== "undefined") {
                microservice.headers["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
              } else {
                microservice.headers["Access-Control-Allow-Headers"] = "*";
              }
            }
          }
          head(formData) {
            this.done();
          }
          post(formData) {
            this.done();
          }
          put(formData) {
            this.done();
          }
          delete(formData) {
            this.done();
          }
          connect(formData) {
            this.done();
          }
          options(formData) {
            this.done();
          }
          trace(formData) {
            this.done();
          }
          patch(formData) {
            this.done();
          }
          finishWithBody(stream) {
            try {
              stream.write(JSON.stringify(this.body));
              stream.end();
            } catch (e) {
              logger.debug("Something wrong writing the response for microservice" + e.toString());
            }
          }
          done() {
            var microservice = this;
            var stream = microservice.stream;
            try {
              stream.writeHead(200, microservice.headers);
            } catch (e) {
              logger.debug("Something went wront while sending headers in http...");
              logger.debug(e.toString());
            }
            if (microservice.body != null) {
              microservice.finishWithBody.call(microservice, stream);
            }
          }
        }
        Export(BackendMicroservice);
        class HTTPServerResponse extends InheritClass {
          static {
            __name(this, "HTTPServerResponse");
          }
          body;
          stream;
          headers;
          fileDispatcher;
          request;
          constructor(o) {
            super(o);
            var self = this;
            self.body = "";
            self.stream = o.stream;
            self._generateResponse();
            this.headers = {
              ":status": 200,
              "content-type": "text/html"
            };
          }
          sendFile(stream, fileName) {
            try {
              console.log("trying to read " + fileName);
              const fd = import_node_fs.default.openSync(fileName, "r");
              const stat = import_node_fs.default.fstatSync(fd);
              const headers = {
                "content-length": stat.size,
                "last-modified": stat.mtime.toUTCString(),
                "content-type": import_mime.default.getType(fileName),
                "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
              };
              logger.debug("closing file " + fileName);
              import_node_fs.default.closeSync(fd);
              stream.setHeader("content-length", headers["content-length"]);
              stream.setHeader("last-modified", headers["last-modified"]);
              stream.setHeader("content-type", headers["content-type"]);
              stream.setHeader("cache-control", headers["cache-control"]);
              var readStream = import_node_fs.default.createReadStream(fileName);
              readStream.on("open", function() {
                readStream.pipe(stream);
              });
              readStream.on("end", function() {
                stream.end();
              });
              readStream.on("error", function(err) {
                stream.end(err);
              });
            } catch (e) {
              if (e.errno == -2) {
                const headers = {
                  ":status": 404,
                  "content-type": "text/html"
                };
                stream.write("<h1>404 - FILE NOT FOUND</h1>");
                stream.on("close", () => {
                  console.log("closing file", fileName);
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
                  logger.debug("TEMPLATE");
                  response.body = body;
                  stream.write(response.body);
                  stream.end();
                } else if (headers[":status"] == 200) {
                  response.sendFile(stream, templateURI);
                } else {
                  logger.debug("NONE ");
                  stream.end();
                }
              }
            });
          }
        }
        class HTTPServerRequest extends InheritClass {
          static {
            __name(this, "HTTPServerRequest");
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
        class HTTPServer extends InheritClass {
          static {
            __name(this, "HTTPServer");
          }
          interceptorInstances;
          server;
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
            const oHTTPServer = this;
            const welcometo = "Welcome to \n";
            const instructions = "QCObjects Legacy HTTPServer \n";
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
            logger.info("Go to: \n" + this.showPossibleURL());
            this.interceptorInstances = interceptorInstances;
            oHTTPServer.server = import_node_http.default.createServer((req, res) => {
            });
            server = oHTTPServer.server;
            server?.on("error", (err) => console.error(err));
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
                  oHTTPServer.interceptorInstances.push(interceptorInstance);
                });
              }
            }
            server.on("request", (req, res) => {
              const request2 = Object.assign(New(HTTPServerRequest), require("url").parse(req.url));
              request2.headers = req.headers;
              this.request = request2;
              this.request.method = req.method;
              this.request.path = req.url;
              server.setMaxListeners(9999999999);
              CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 2e4);
              var timeoutHandler = /* @__PURE__ */ __name(() => {
                try {
                  if (!res.destroyed) {
                    logger.info("A timeout occurred..." + CONFIG.get("backendTimeout").toString());
                    logger.info("Killing session...");
                    res.writeHeader(500, {
                      "content-type": "text/html"
                    });
                    res.on("error", () => {
                    });
                    res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                    res.end();
                  } else {
                    logger.debug("Session was normally finishing...");
                  }
                } catch (e) {
                  logger.debug("An unhandled error occurred during timeout catching...");
                  logger.debug(e.message);
                }
                server.removeListener("timeout", timeoutHandler);
              }, "timeoutHandler");
              if (!res.destroyed) {
                server.setTimeout(CONFIG.get("backendTimeout"), timeoutHandler);
              }
              if (this.request.pathname.indexOf(".") < 0) {
                this.request.scriptname = CONFIG.get("documentRootFileIndex");
              } else {
                this.request.scriptname = this.request.pathname.split("/").reverse()[0];
              }
              this.request.pathname = this.request.pathname.substr(0, this.request.pathname.lastIndexOf("/"));
              logger.debug(new PipeLog().pipe(this.request));
              if (global.get("backendAvailable")) {
                logger.info("Backend GAE Microservices Available");
                const routes = CONFIG.get("backend").routes;
                const selectedRoute = routes.filter((route) => {
                  const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                  return new RegExp(standardRoutePath, "g").test(request2.path);
                });
                if (selectedRoute.length > 0) {
                  selectedRoute.map((route) => {
                    const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                    const selectedRouteParams = {
                      ...[...request2.path.matchAll(new RegExp(standardRoutePath, "g"))][0]["groups"]
                    };
                    ImportMicroservice(route.microservice);
                    var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
                    this.response = New(microServiceClassFactory, {
                      domain: CONFIG.get("domain"),
                      basePath: CONFIG.get("basePath"),
                      projectPath: CONFIG.get("projectPath"),
                      route,
                      routeParams: selectedRouteParams,
                      server,
                      stream: res,
                      req,
                      request: request2
                    });
                  });
                } else {
                  this.response = New(HTTPServerResponse, {
                    server,
                    stream: res,
                    request: this.request
                  });
                }
              } else {
                this.response = New(HTTPServerResponse, {
                  server,
                  stream: res,
                  request: this.request
                });
              }
            });
          }
          showIPAddress() {
            var _ret_ = "";
            var ifaces = import_node_os.default.networkInterfaces();
            Object.keys(ifaces).forEach(function(iface) {
              ifaces[iface]?.forEach(function(ipGroup) {
                _ret_ += iface + ": " + new PipeLog().pipe(ipGroup) + "\n";
              });
            });
            return _ret_;
          }
          showPossibleURL() {
            var _ret_ = "";
            var ifaces = import_node_os.default.networkInterfaces();
            Object.keys(ifaces).forEach(function(iface) {
              ifaces[iface]?.forEach((ipGroup) => {
                if (ipGroup["family"].toLowerCase() == "ipv4") {
                  _ret_ += "http://" + ipGroup["address"] + ":" + CONFIG.get("serverPortHTTP").toString() + "/\n";
                }
              });
            });
            return _ret_;
          }
          start() {
            var server = this.server;
            server.listen(process.env.PORT || CONFIG.get("serverPortHTTP"));
          }
        }
        Package("org.quickcorp.qcobjects.main.http.gae.server", [
          BackendMicroservice,
          HTTPServer,
          HTTPServerRequest,
          HTTPServerResponse
        ]);
      })().catch((e) => console.error(e));
    }
  });
  return require_org_quickcorp_qcobjects_main_http_gae_server();
})();
//# sourceMappingURL=org.quickcorp.qcobjects.main.http.gae.server.js.map
