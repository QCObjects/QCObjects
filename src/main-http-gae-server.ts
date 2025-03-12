/**
 * QCObjects CLI 2.4.x
 * ________________
 *
 * Author: Jean Machuca <correojean@gmail.com>
 *
 * Cross Browser Javascript Framework for MVC Patterns
 * QuickCorp/QCObjects is licensed under the
 * GNU Lesser General Public License v3.0
 * [LICENSE] (https://github.com/QuickCorp/QCObjects/blob/master/LICENSE.txt)
 *
 * Permissions of this copyleft license are conditioned on making available
 * complete source code of licensed works and modifications under the same
 * license or the GNU GPLv3. Copyright and license notices must be preserved.
 * Contributors provide an express grant of patent rights. However, a larger
 * work using the licensed work through interfaces provided by the licensed
 * work may be distributed under different terms and without source code for
 * the larger work.
 *
 * Copyright (C) 2015 Jean Machuca,<correojean@gmail.com>
 *
 * Everyone is permitted to copy and distribute verbatim copies of this
 * license document, but changing it is not allowed.
*/
/*eslint no-unused-vars: "off"*/
/*eslint no-redeclare: "off"*/
/*eslint no-empty: "off"*/
/*eslint strict: "off"*/
/*eslint no-mixed-operators: "off"*/
/*eslint no-undef: "off"*/
"use strict";
import { findPackageNodePath, Import, Package, InheritClass, CONFIG, logger, New, global, ClassFactory, Export } from "qcobjects";
import os from "node:os";
import path from "node:path";
import fs from "node:fs";
import http from "node:http";
import mime from "mime";
import { URL } from "url";

import { FileDispatcher } from "./main-file";
import { PipeLog } from "./common-pipelog";

export class HTTPServer extends InheritClass {
  interceptorInstances: any[];
  server: any;
  request: any;
  response: any;
  constructor({
    request = null,
    response = "",
    server = null,
    scriptname = "",
    interceptorInstances = []
  }: {
    request: any, response: any, server?: any, scriptname: string, interceptorInstances: any[]
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
    const logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
    console.log(welcometo);
    console.log(logo);
    console.log(instructions);
    logger.debug(this.showIPAddress());
    logger.info("Listening on HTTP PORT: " + CONFIG.get("serverPortHTTP").toString());
    logger.info("Go to: \n" + this.showPossibleURL());
    this.interceptorInstances = interceptorInstances;


    oHTTPServer.server = http.createServer((req: any, res: any) => {

    });

    server = oHTTPServer.server;

    server?.on("error", (err: any) => console.error(err));

    if (global.get("backendAvailable")) {
      logger.info("Loading backend interceptors...");
      const interceptors = CONFIG.get("backend", {}).interceptors;
      if (typeof interceptors !== "undefined") {
        logger.info("Backend Interceptors Available");
        interceptors.map((interceptor: { microservice: string; }) => {
          ImportMicroservice(interceptor.microservice);
          var interceptorClassFactory = ClassFactory(interceptor.microservice + ".Interceptor");
          var interceptorInstance = New(interceptorClassFactory, {
            domain: CONFIG.get("domain"),
            basePath: CONFIG.get("basePath"),
            projectPath: CONFIG.get("projectPath"),
            interceptor: interceptor,
            server: server
          });
          oHTTPServer.interceptorInstances.push(interceptorInstance);
        });
      }
    }

    server.on("request", (req: { url: any; headers: any; method: any; }, res: { destroyed: any; writeHeader: (arg0: number, arg1: { "content-type": string; }) => void; on: (arg0: string, arg1: () => void) => void; write: (arg0: string) => void; end: () => void; }) => {

      const request = Object.assign(New(HTTPServerRequest), URL.parse(req.url));
      request.headers = req.headers;
      this.request = request;
      this.request.method = req.method;
      this.request.path = req.url;
      server.setMaxListeners(9999999999);
      CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 20000);
      var timeoutHandler = () => {
        // end the stream on timeout
        try {
          if (!res.destroyed) {
            logger.info("A timeout occurred..." + CONFIG.get("backendTimeout").toString());
            logger.info("Killing session...");

            res.writeHeader(500, {
              "content-type": "text/html"
            });
            res.on("error", () => { });
            res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
            res.end();
          } else {
            logger.debug("Session was normally finishing...");
          }
        } catch (e: any) {
          logger.debug("An unhandled error occurred during timeout catching...");
          logger.debug(e.message);
        }
        server.removeListener("timeout", timeoutHandler);

      };
      if (!res.destroyed) {
        server.setTimeout(CONFIG.get("backendTimeout"), timeoutHandler);
      }

      if (this.request.pathname.indexOf(".") < 0) {
        this.request.scriptname = CONFIG.get("documentRootFileIndex");
      } else {
        this.request.scriptname = this.request.pathname.split("/").reverse()[0];
      }
      this.request.pathname = this.request.pathname.substr(0, this.request.pathname.lastIndexOf("/"));

      logger.debug(PipeLog.pipe(this.request));

      if (global.get("backendAvailable")) {
        logger.info("Backend GAE Microservices Available");
        const routes = CONFIG.get("backend").routes;
        const selectedRoute = routes.filter((route: { path: string; }) => {
          const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
          return (new RegExp(standardRoutePath, "g")).test(request.path);
        });
        if (selectedRoute.length > 0) {
          selectedRoute.map((route: { path: string; microservice: string; }) => {
            const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
            const selectedRouteParams = {
              ...[...request.path.matchAll((new RegExp(standardRoutePath, "g")))][0]["groups"]
            };
            ImportMicroservice(route.microservice);
            var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
            this.response = New(microServiceClassFactory, {
              domain: CONFIG.get("domain"),
              basePath: CONFIG.get("basePath"),
              projectPath: CONFIG.get("projectPath"),
              route: route,
              routeParams: selectedRouteParams,
              server: server,
              stream: res,
              req: req,
              request: request
            });
          });
        } else {
          this.response = New(HTTPServerResponse, {
            server: server,
            stream: res,
            request: this.request
          });
        }

      } else {
        // ...

        this.response = New(HTTPServerResponse, {
          server: server,
          stream: res,
          request: this.request
        });

      }

    });

  }

  showIPAddress() {
    var _ret_ = "";
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (iface) {
      ifaces[iface]?.forEach(function (ipGroup: any) {
        _ret_ += iface + ": " + PipeLog.pipe(ipGroup) + "\n";
      });
    });
    return _ret_;
  }

  showPossibleURL() {
    var _ret_ = "";
    var ifaces = os.networkInterfaces();
    Object.keys(ifaces).forEach(function (iface) {
      ifaces[iface]?.forEach((ipGroup: any) => {
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



const absolutePath = path.resolve(__dirname, "./");

const ImportMicroservice = function (microservicePackage: string) {
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
};

class BackendMicroservice extends InheritClass {
  domain: any;
  basePath: any;
  server: any;
  request: any;
  req: any;
  get: any;
  route: any;
  headers: any;
  body!: object;
  stream: any;

  constructor(o: any) {
    super(o);
    this.domain = CONFIG.get("domain");
    this.basePath = CONFIG.get("basePath");
    logger.debug("Executing GAE HTTP BackendMicroservice ");
    const microservice = this;
    const server = microservice.server;
    const request = microservice.request;
    this.cors();
    microservice.req.on("data", (data: any) => {
      // data from POST, GET
      var requestMethod = request.method.toLowerCase();
      var supportedMethods: any = {
        "post": microservice.post.bind(this),
      };
      if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
        supportedMethods[requestMethod].call(microservice, data);
      }
    });

    // data from POST, GET
    var requestMethod = request.method.toLowerCase();
    var supportedMethods: any = {
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
        // an example of allow_origins is ['https://example.com','http://www.example.com']
        if (allow_origins == "*" || (typeof microservice.request.headers.origin == "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
          // for compatibility with all browsers allways return a wildcard when the origin is allowed
          microservice.headers["Access-Control-Allow-Origin"] = "*";
        } else {
          logger.debug("Origin is not allowed: " + microservice.request.headers.origin);
          logger.debug("Forcing to finish the response...");
          this.body = {};
          try {
            this.done();
          } catch (e: any) { }
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

  head(formData: any) {
    this.done();
  }
  post(formData: any) {
    this.done();
  }
  put(formData: any) {
    this.done();
  }
  delete(formData: any) {
    this.done();
  }
  connect(formData: any) {
    this.done();
  }
  options(formData: any) {
    this.done();
  }
  trace(formData: any) {
    this.done();
  }
  patch(formData: any) {
    this.done();
  }
  finishWithBody(stream: { write: (arg0: string) => void; end: () => void; }) {
    try {
      stream.write(JSON.stringify(this.body));
      stream.end();
    } catch (e: any) {
      logger.debug("Something wrong writing the response for microservice" + e.toString());
    }
  }

  done() {
    var microservice = this;
    var stream = microservice.stream;
    try {
      stream.writeHead(200, microservice.headers);
    } catch (e: any) {
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
  body!: string;
  stream: any;
  headers: { ":status": number; "content-type": string; };
  fileDispatcher: any;
  request: any;
  constructor(o: { stream: any; request: any; headers: any; fileDispatcher: any; }) {
    super(o);
    var self = this;
    self.body = "";
    self.request = o.request || {};
    self.stream = o.stream;
    self.headers = o.headers;
    self.fileDispatcher = o.fileDispatcher;

    // Initialize request properties if not set
    if (!self.request.scriptname || !self.request.pathname) {
      const defaultPath = "/";
      self.request.pathname = self.request.pathname || defaultPath;
      self.request.scriptname = self.request.scriptname || CONFIG.get("documentRootFileIndex", "index.html");
    }

    self._generateResponse();
    this.headers = {
      ":status": 200,
      "content-type": "text/html"
    };
  }

  sendFile(stream: any, fileName: string) {
    // read and send file content in the stream

    try {
      console.log("trying to read " + fileName);
      const fd = fs.openSync(fileName, "r");
      const stat = fs.fstatSync(fd);
      const headers = {
        "content-length": stat.size,
        "last-modified": stat.mtime.toUTCString(),
        "content-type": mime.getType(fileName),
        "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
      };
      logger.debug("closing file " + fileName);
      fs.closeSync(fd);
      stream.setHeader("content-length", headers["content-length"]);
      stream.setHeader("last-modified", headers["last-modified"]);
      stream.setHeader("content-type", headers["content-type"]);
      stream.setHeader("cache-control", headers["cache-control"]);

      // This line opens the file as a readable stream
      var readStream = fs.createReadStream(fileName);

      // This will wait until we know the readable stream is actually valid before piping
      readStream.on("open", function () {
        // This just pipes the read stream to the response object (which goes to the client)
        readStream.pipe(stream);
      });

      readStream.on("end", function () {
        stream.end();
      });

      // This catches any errors that happen while creating the readable stream (usually invalid names)
      readStream.on("error", function (err: any) {
        stream.end(err);
      });

    } catch (e: any) {
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
      done(headers: any, body: any, templateURI: any, isTemplate: any) {
        response.headers = headers;
        var stream = response.stream;
        if (isTemplate) {
          logger.debug("TEMPLATE");
          response.body = body;
          //            stream.respond(response.headers);
          stream.write(response.body);
          stream.end();
        } else if (headers[":status"] == 200) {
          response.sendFile(stream, templateURI);
        } else {
          logger.debug("NONE ");
          //          stream.respond(response.headers);
          stream.end();
        }
      }
    });

  }

}

class HTTPServerRequest extends InheritClass {

  constructor({
    scriptname = "",
    path = "",
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
      path,
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



Package("org.quickcorp.qcobjects.main.http.gae.server", [
  BackendMicroservice, HTTPServer, HTTPServerRequest, HTTPServerResponse

]);
