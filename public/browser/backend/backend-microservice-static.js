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
  var require_backend_microservice_static = __commonJS({
    "src/backend/backend-microservice-static.ts"() {
      var import_mime = __toESM(require("mime"));
      (async () => {
        "use strict";
        const fs = await import("fs");
        const path = await import("path");
        const absolutePath = path.resolve(__dirname, "./");
        const { Package, BackendMicroservice, CONFIG, logger } = await import("qcobjects");
        Package("com.qcobjects.backend.microservice.static", [
          class Microservice extends BackendMicroservice {
            static {
              __name(this, "Microservice");
            }
            stream;
            fileName;
            route;
            request;
            body;
            finishWithBody() {
            }
            done() {
              const microservice = this;
              const stream = microservice.stream;
              const fileName = !microservice.fileName.startsWith("/") ? `${process.cwd()}/${microservice.fileName}` : microservice.fileName;
              const sendFileHTTP2 = /* @__PURE__ */ __name(function(stream2, fileName2) {
                try {
                  const fd = fs.openSync(fileName2, "r");
                  const stat = fs.fstatSync(fd);
                  let headers = {
                    "content-length": stat.size,
                    "last-modified": stat.mtime.toUTCString(),
                    "content-type": import_mime.default.getType(fileName2),
                    "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
                  };
                  if (typeof microservice.route.responseHeaders !== "undefined") {
                    headers = Object.assign(headers, microservice.route.responseHeaders);
                  }
                  stream2.respondWithFD(fd, headers);
                  stream2.on("close", () => {
                    logger.debug("closing file " + fileName2);
                    fs.closeSync(fd);
                  });
                  stream2.end();
                } catch (e) {
                  logger.warn("[ERROR] Something went wrong when trying to send the response as file " + fileName2);
                  if (e.errno == -2) {
                    const headers = {
                      ":status": 404,
                      "content-type": import_mime.default.getType(fileName2)
                    };
                    stream2.respond(headers);
                    stream2.write("<h1>404 - FILE NOT FOUND</h1>");
                    stream2.on("close", () => {
                      logger.debug("closing file " + fileName2);
                    });
                    stream2.end();
                  }
                }
              }, "sendFileHTTP2");
              const sendFileLegacyHTTP = /* @__PURE__ */ __name(function(stream2, fileName2) {
                let headers;
                try {
                  logger.info("trying to read " + fileName2);
                  const fd = fs.openSync(fileName2, "r");
                  const stat = fs.fstatSync(fd);
                  headers = {
                    "Content-Length": stat.size,
                    "Last-Modified": stat.mtime.toUTCString(),
                    "Content-Type": import_mime.default.getType(fileName2),
                    "Cache-Control": CONFIG.get("cacheControl", "max-age=31536000")
                  };
                  if (typeof microservice.route.responseHeaders !== "undefined") {
                    headers = Object.assign(headers, microservice.route.responseHeaders);
                  }
                  logger.debug("closing file " + fileName2);
                  fs.closeSync(fd);
                  stream2.writeHead(200, headers);
                  stream2.write(fs.readFileSync(fileName2).toString());
                  stream2.on("close", () => {
                    logger.info("closing static file", fileName2);
                  });
                } catch (e) {
                  if (e.errno == -2) {
                    headers = {
                      "status": 404,
                      "Content-Type": "text/html"
                    };
                    stream2.writeHead(404, headers);
                    stream2.write("<h1>404 - FILE NOT FOUND</h1>");
                    stream2.on("close", () => {
                      logger.info("closing static file with error: ", fileName2);
                    });
                  }
                  logger.warn(e);
                  stream2.end();
                }
                stream2.end();
              }, "sendFileLegacyHTTP");
              if (typeof stream.respondWithFD !== "undefined") {
                sendFileHTTP2(stream, fileName);
              } else {
                sendFileLegacyHTTP(stream, fileName);
              }
            }
            static(method, data) {
              const microservice = this;
              const redirect_to = microservice.route.redirect_to;
              return new Promise(function(resolve, reject) {
                const supported_methods = microservice.route.supported_methods;
                let _method_allowed_ = false;
                if (typeof supported_methods !== "undefined") {
                  if (supported_methods == "*" || typeof method === "undefined" || [...supported_methods].map((m) => m.toLowerCase()).indexOf(method.toLowerCase()) !== -1) {
                    _method_allowed_ = true;
                  }
                } else {
                  _method_allowed_ = true;
                }
                logger.debug("Starting static delivery microservice call for method: " + method);
                if (_method_allowed_) {
                  logger.info("I'm going to deliver a static path...");
                  if (redirect_to) {
                    const request_path = microservice.request.path;
                    const re = new RegExp(microservice.route.path.replace(/{(.*?)}/g, "(?<$1>.*)"), "g");
                    microservice.fileName = request_path.replace(re, microservice.route.redirect_to);
                    try {
                      resolve();
                    } catch (e) {
                      logger.warn("\u{1F926} Something went wrong \u{1F926} when trying to deliver a static path: " + microservice.fileName);
                      reject(e);
                    }
                  } else {
                    logger.info("There is no redirect_to setting declared in route properties. \n Skipping static delivery...");
                    reject(new Error("There is no redirect_to setting declared in route properties. \n Skipping static delivery..."));
                  }
                } else {
                  logger.debug("Method: " + method + " will be skipped");
                  resolve();
                }
              });
            }
            head(formData) {
              const microservice = this;
              microservice.static("head", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            get(formData) {
              const microservice = this;
              microservice.static("get", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((error) => {
                console.error(error);
              });
            }
            post(formData) {
              const microservice = this;
              microservice.static("post", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            put(formData) {
              const microservice = this;
              microservice.static("put", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            delete(formData) {
              const microservice = this;
              microservice.static("delete", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            connect(formData) {
              const microservice = this;
              microservice.static("connect", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            options(formData) {
              const microservice = this;
              microservice.static("options", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            trace(formData) {
              const microservice = this;
              microservice.static("trace", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
            patch(formData) {
              const microservice = this;
              microservice.static("patch", formData).then((response) => {
                microservice.body = response;
                microservice.done();
              }).catch((e) => {
                logger.warn(`An error ocurred: ${e}`);
              });
            }
          }
        ]);
      })().catch((e) => console.error(e));
    }
  });
  return require_backend_microservice_static();
})();
//# sourceMappingURL=backend-microservice-static.js.map
