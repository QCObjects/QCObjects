"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var import_node_os = __toESM(require("node:os"));
var import_node_path = __toESM(require("node:path"));
var import_qcobjects = require("qcobjects");
var import_fs = __toESM(require("fs"));
var import_mime = __toESM(require("mime"));
var import_http = __toESM(require("http"));
var import_url = __toESM(require("url"));
(async () => {
  "use strict";
  const absolutePath = import_node_path.default.resolve(__dirname, "./");
  const { FileDispatcher } = await import(absolutePath + "/org.quickcorp.qcobjects.main.file.js");
  const { PipeLog } = await import(absolutePath + "/org.qcobjects.common.pipelog.js");
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
        _ret_ = Promise.resolve(async () => (await import(microservicePackage))());
      }
    }
    return _ret_;
  }, "ImportMicroservice");
  class BackendMicroservice extends import_qcobjects.InheritClass {
    static {
      __name(this, "BackendMicroservice");
    }
    body;
    stream;
    req;
    get;
    route;
    headers;
    request;
    constructor({
      domain = import_qcobjects.CONFIG.get("domain"),
      basePath = import_qcobjects.CONFIG.get("basePath"),
      body = null,
      stream = null,
      request = null
    }) {
      super({
        domain,
        basePath,
        body,
        stream,
        request
      });
      import_qcobjects.logger.debug("Initializing Legacy BackendMicroservice...");
      const microservice = this;
      if (typeof this.body === "undefined") {
        this.body = null;
      }
      if (typeof body !== "undefined") {
        this.body = body;
      }
      this.cors();
      microservice.stream = stream;
      microservice.req.on("data", (data) => {
        var requestMethod2 = request?.method.toLowerCase();
        var supportedMethods2 = {
          "post": microservice.post.bind(this)
        };
        if (Object.hasOwnProperty.call(supportedMethods2, requestMethod2)) {
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
      if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
        supportedMethods[requestMethod].call(microservice);
      }
    }
    cors() {
      if (this.route.cors) {
        import_qcobjects.logger.debug("Validating CORS...");
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
        if (typeof microservice.route.responseHeaders !== "object") {
          microservice.route.responseHeaders = {};
        }
        if (typeof allow_origins !== "undefined") {
          import_qcobjects.logger.debug("CORS: allow_origins available. Validating origins...");
          if (allow_origins === "*" || typeof microservice.request.headers.origin === "undefined" || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
            import_qcobjects.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
            microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
          } else {
            import_qcobjects.logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
            import_qcobjects.logger.debug("CORS: Forcing to finish the response...");
            this.body = {};
            try {
              this.done();
            } catch (e) {
              import_qcobjects.logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
            }
          }
        } else {
          import_qcobjects.logger.debug("CORS: no allow_origins available. Allowing all origins...");
          import_qcobjects.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
          microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
        }
        if (typeof allow_credentials !== "undefined") {
          import_qcobjects.logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
        } else {
          import_qcobjects.logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
          microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
        }
        if (typeof allow_methods !== "undefined") {
          import_qcobjects.logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
        } else {
          import_qcobjects.logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
          microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
        }
        if (typeof allow_headers !== "undefined") {
          import_qcobjects.logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
          microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
        } else {
          import_qcobjects.logger.debug("CORS: No allow_headers present. Allowing all headers...");
          microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
        }
      } else {
        import_qcobjects.logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
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
        import_qcobjects.logger.debug(`Something wrong writing the response for microservice: ${e}`);
        throw Error(e);
      }
    }
    done() {
      var microservice = this;
      var stream = microservice.stream;
      try {
        stream.writeHead(200, microservice.headers);
      } catch (e) {
        import_qcobjects.logger.debug(`Something went wront while sending headers in http... ${e}`);
        throw Error(e);
      }
      if (microservice.body != null) {
        microservice.finishWithBody.call(microservice, stream);
      }
    }
  }
  (0, import_qcobjects.Export)(BackendMicroservice);
  class HTTPServerResponse extends import_qcobjects.InheritClass {
    static {
      __name(this, "HTTPServerResponse");
    }
    stream;
    fileDispatcher;
    request;
    headers;
    body;
    constructor({
      headers = {
        "status": 200,
        "content-type": "text/html"
      },
      body = "",
      request = null,
      fileDispatcher = null,
      stream = null
    }) {
      super({
        headers,
        body,
        request,
        fileDispatcher,
        stream
      });
      var self = this;
      self.stream = stream;
      self._generateResponse();
    }
    sendFile(stream, fileName) {
      try {
        console.log("trying to read " + fileName);
        const fd = import_fs.default.openSync(fileName, "r");
        const stat = import_fs.default.fstatSync(fd);
        const headers = {
          "content-length": stat.size,
          "last-modified": stat.mtime.toUTCString(),
          "content-type": import_mime.default.getType(fileName),
          "cache-control": import_qcobjects.CONFIG.get("cacheControl", "max-age=31536000")
        };
        import_qcobjects.logger.debug("closing file " + fileName);
        import_fs.default.closeSync(fd);
        stream.setHeader("content-length", headers["content-length"]);
        stream.setHeader("last-modified", headers["last-modified"]);
        stream.setHeader("content-type", headers["content-type"]);
        stream.setHeader("cache-control", headers["cache-control"]);
        var readStream = import_fs.default.createReadStream(fileName);
        readStream.on("open", function() {
          readStream.pipe(stream);
        });
        readStream.on("end", function() {
          stream.end();
        });
        readStream.on("error", function(err) {
          const headers2 = {
            "status": 500,
            "content-type": import_mime.default.getType(fileName)
          };
          stream.setHeader("content-type", headers2["content-type"]);
          stream.setHeader("status", headers2["status"]);
          stream.write(`<h1>500 - INTERNAL SERVER ERROR</h1>
          <p>${err}</p>
        `);
          stream.end(err);
        });
      } catch (e) {
        if (e.errno == -2) {
          const headers = {
            "status": 404,
            "content-type": import_mime.default.getType(fileName)
          };
          stream.setHeader("content-type", headers["content-type"]);
          stream.setHeader("status", headers["status"]);
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
      response.fileDispatcher = (0, import_qcobjects.New)(FileDispatcher, {
        scriptname: response.request.scriptname,
        pathname: response.request.pathname,
        done(headers, body, templateURI, isTemplate) {
          response.headers = headers;
          var stream = response.stream;
          if (isTemplate) {
            response.body = body;
            Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
            stream.write(response.body);
            stream.end();
          } else if (headers["status"] == 200 || headers[":status"] == 200) {
            response.sendFile(stream, templateURI);
          } else {
            Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
            stream.end();
          }
        }
      });
    }
  }
  class HTTPServerRequest extends import_qcobjects.InheritClass {
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
  class HTTPServer extends import_qcobjects.InheritClass {
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
      import_qcobjects.logger.debug(this.showIPAddress());
      import_qcobjects.logger.info("Listening on HTTP PORT: " + import_qcobjects.CONFIG.get("serverPortHTTP").toString());
      import_qcobjects.logger.info("Go to: \n" + this.showPossibleURL());
      this.interceptorInstances = interceptorInstances;
      this.server = import_http.default.createServer((req, res) => {
        import_qcobjects.logger.debug("Legacy Server Instantiated.");
      });
      this.server.on("error", (err) => console.error(err));
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
              server: this.server
            });
            this.interceptorInstances.push(interceptorInstance);
          });
        }
      }
      this.server.on("request", (req, res) => {
        const request2 = Object.assign((0, import_qcobjects.New)(HTTPServerRequest), import_url.default.parse(req.url));
        request2.headers = req.headers;
        this.request = request2;
        this.request.method = req.method;
        this.request.path = req.url;
        this.server.setMaxListeners(9999999999);
        import_qcobjects.CONFIG.set("backendTimeout", import_qcobjects.CONFIG.get("backendTimeout") || 2e4);
        var timeoutHandler = /* @__PURE__ */ __name(() => {
          try {
            if (!res.destroyed) {
              import_qcobjects.logger.info("A timeout occurred..." + import_qcobjects.CONFIG.get("backendTimeout").toString());
              import_qcobjects.logger.info("Killing session...");
              res.writeHeader(500, {
                "content-type": "text/html"
              });
              res.on("error", () => {
              });
              res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
              res.end();
            } else {
              import_qcobjects.logger.debug("Session was normally finishing...");
            }
          } catch (e) {
            import_qcobjects.logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
          }
          this.server.removeListener("timeout", timeoutHandler);
        }, "timeoutHandler");
        if (!res.destroyed) {
          this.server.setTimeout(import_qcobjects.CONFIG.get("backendTimeout"), timeoutHandler);
        }
        if (this.request.pathname.indexOf(".") < 0) {
          this.request.scriptname = import_qcobjects.CONFIG.get("documentRootFileIndex");
        } else {
          this.request.scriptname = this.request.pathname.split("/").reverse()[0];
        }
        this.request.pathname = this.request.pathname.substr(0, this.request.pathname.lastIndexOf("/"));
        import_qcobjects.logger.debug(new PipeLog().pipe(this.request));
        if (import_qcobjects.global.get("backendAvailable")) {
          import_qcobjects.logger.info("Backend Legacy Microservices Available...");
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
              ImportMicroservice(route.microservice).then(() => {
                import_qcobjects.logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
                var microServiceClassFactory = (0, import_qcobjects.ClassFactory)(route.microservice + ".Microservice");
                if (typeof microServiceClassFactory !== "undefined") {
                  const server2 = this.server;
                  this.response = (0, import_qcobjects.New)(microServiceClassFactory, {
                    domain: import_qcobjects.CONFIG.get("domain"),
                    basePath: import_qcobjects.CONFIG.get("basePath"),
                    projectPath: import_qcobjects.CONFIG.get("projectPath"),
                    route,
                    routeParams: selectedRouteParams,
                    server: server2,
                    stream: res,
                    req,
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
            this.response = (0, import_qcobjects.New)(HTTPServerResponse, {
              domain: import_qcobjects.CONFIG.get("domain"),
              basePath: import_qcobjects.CONFIG.get("basePath"),
              projectPath: import_qcobjects.CONFIG.get("projectPath"),
              server: this.server,
              stream: res,
              req,
              request: this.request
            });
          }
        } else {
          this.response = (0, import_qcobjects.New)(HTTPServerResponse, {
            server: this.server,
            stream: res,
            req,
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
        ifaces[iface]?.forEach(function(ipGroup) {
          if (ipGroup["family"].toLowerCase() == "ipv4") {
            _ret_ += "http://" + ipGroup["address"] + ":" + import_qcobjects.CONFIG.get("serverPortHTTP").toString() + "/\n";
          }
        });
      });
      return _ret_;
    }
    start() {
      var server = this.server;
      server.listen(process.env.PORT || import_qcobjects.CONFIG.get("serverPortHTTP"));
    }
  }
  (0, import_qcobjects.Package)("org.quickcorp.qcobjects.main.http.server", [
    BackendMicroservice,
    HTTPServer,
    HTTPServerRequest,
    HTTPServerResponse
  ]);
})().catch((e) => console.error(e));
//# sourceMappingURL=org.quickcorp.qcobjects.main.http.server.cjs.map
