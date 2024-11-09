/**
 * QCObjects CLI 2.3.x
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
/* eslint no-unused-vars: "off" */
/* eslint no-redeclare: "off" */
/* eslint no-empty: "off" */
/* eslint strict: "off" */
/* eslint no-mixed-operators: "off" */
/* eslint no-undef: "off" */
/* eslint no-useless-escape: "off" */
"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var fs = require("fs");
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var mime = require("mime");
Package("com.qcobjects.backend.microservice.static", [
    /** @class */ (function (_super) {
        __extends(Microservice, _super);
        function Microservice() {
            return _super.apply(this, arguments) || this;
        }
        Microservice.prototype.finishWithBody = function () { };
        Microservice.prototype.done = function () {
            // read and send file content in the stream
            var microservice = this;
            var stream = microservice.stream;
            var fileName = (!microservice.fileName.startsWith("/")) ? ("".concat(process.cwd(), "/").concat(microservice.fileName)) : (microservice.fileName);
            var sendFileHTTP2 = function (stream, fileName) {
                // read and send file content in the stream
                try {
                    var fd_1 = fs.openSync(fileName, "r");
                    var stat = fs.fstatSync(fd_1);
                    var headers = {
                        "content-length": stat.size,
                        "last-modified": stat.mtime.toUTCString(),
                        "content-type": mime.getType(fileName),
                        "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
                    };
                    if (typeof microservice.route.responseHeaders !== "undefined") {
                        headers = Object.assign(headers, microservice.route.responseHeaders);
                    }
                    stream.respondWithFD(fd_1, headers);
                    stream.on("close", function () {
                        logger.debug("closing file " + fileName);
                        fs.closeSync(fd_1);
                    });
                    stream.end();
                }
                catch (e) {
                    logger.warn("[ERROR] Something went wrong when trying to send the response as file " + fileName);
                    if (e.errno == -2) {
                        var headers = {
                            ":status": 404,
                            "content-type": mime.getType(fileName)
                        };
                        stream.respond(headers);
                        stream.write("<h1>404 - FILE NOT FOUND</h1>");
                        stream.on("close", function () {
                            logger.debug("closing file " + fileName);
                        });
                        stream.end();
                    }
                }
            };
            var sendFileLegacyHTTP = function (stream, fileName) {
                // read and send file content in the stream
                var headers;
                try {
                    logger.info("trying to read " + fileName);
                    var fd = fs.openSync(fileName, "r");
                    var stat = fs.fstatSync(fd);
                    headers = {
                        "Content-Length": stat.size,
                        "Last-Modified": stat.mtime.toUTCString(),
                        "Content-Type": mime.getType(fileName),
                        "Cache-Control": CONFIG.get("cacheControl", "max-age=31536000")
                    };
                    if (typeof microservice.route.responseHeaders !== "undefined") {
                        headers = Object.assign(headers, microservice.route.responseHeaders);
                    }
                    logger.debug("closing file " + fileName);
                    fs.closeSync(fd);
                    stream.writeHead(200, headers);
                    stream.write(fs.readFileSync(fileName));
                    stream.on("close", function () {
                        logger.info("closing static file", fileName);
                    });
                }
                catch (e) {
                    if (e.errno == -2) {
                        headers = {
                            "status": 404,
                            "Content-Type": "text/html"
                        };
                        stream.writeHead(404, headers);
                        stream.write("<h1>404 - FILE NOT FOUND</h1>");
                        stream.on("close", function () {
                            logger.info("closing static file with error: ", fileName);
                        });
                    }
                    logger.warn(e);
                    stream.end();
                }
                stream.end();
            };
            if (typeof stream.respondWithFD !== "undefined") {
                sendFileHTTP2(stream, fileName);
            }
            else {
                sendFileLegacyHTTP(stream, fileName);
            }
        };
        Microservice.prototype.static = function (method, data) {
            var microservice = this;
            var redirect_to = microservice.route.redirect_to;
            return new Promise(function (resolve, reject) {
                var supported_methods = microservice.route.supported_methods;
                var _method_allowed_ = false;
                if (typeof supported_methods !== "undefined") {
                    if (supported_methods == "*" || (typeof method === "undefined") || __spreadArray([], supported_methods, true).map(function (m) { return m.toLowerCase(); }).indexOf(method.toLowerCase()) !== -1) {
                        _method_allowed_ = true;
                    }
                }
                else {
                    _method_allowed_ = true;
                }
                logger.debug("Starting static delivery microservice call for method: " + method);
                if (_method_allowed_) {
                    logger.info("I'm going to deliver a static path...");
                    if (redirect_to) {
                        var request_path = microservice.request.path;
                        var re = (new RegExp(microservice.route.path.replace(/{(.*?)}/g, "\(\?\<$1\>\.\*\)"), "g"));
                        microservice.fileName = request_path.replace(re, microservice.route.redirect_to);
                        try {
                            resolve();
                        }
                        catch (e) {
                            logger.warn("\uD83E\uDD26 Something went wrong \uD83E\uDD26 when trying to deliver a static path: " + microservice.fileName);
                            reject();
                        }
                    }
                    else {
                        logger.info("There is no redirect_to setting declared in route properties. \n Skipping static delivery...");
                        reject();
                    }
                }
                else {
                    logger.debug("Method: " + method + " will be skipped");
                    resolve();
                }
            });
        };
        Microservice.prototype.head = function (formData) {
            var microservice = this;
            microservice.static("head", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.get = function (formData) {
            var microservice = this;
            microservice.static("get", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            }).catch(function (error) {
                console.error(error);
            });
        };
        Microservice.prototype.post = function (formData) {
            var microservice = this;
            microservice.static("post", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.put = function (formData) {
            var microservice = this;
            microservice.static("put", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.delete = function (formData) {
            var microservice = this;
            microservice.static("delete", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.connect = function (formData) {
            var microservice = this;
            microservice.static("connect", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.options = function (formData) {
            var microservice = this;
            microservice.static("options", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.trace = function (formData) {
            var microservice = this;
            microservice.static("trace", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        Microservice.prototype.patch = function (formData) {
            var microservice = this;
            microservice.static("patch", formData).then(function (response) {
                microservice.body = response;
                microservice.done();
            });
        };
        return Microservice;
    }(BackendMicroservice))
]);
