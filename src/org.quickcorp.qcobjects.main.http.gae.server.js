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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var path = require("path");
var absolutePath = path.resolve(__dirname, "./");
var fs = require("fs");
var mime = require("mime");
require(absolutePath + "/org.quickcorp.qcobjects.main.file.js");
require(absolutePath + "/org.qcobjects.common.pipelog.js");
var ImportMicroservice = function (microservicePackage) {
    var _ret_;
    var standardPath = findPackageNodePath(microservicePackage) || findPackageNodePath(microservicePackage + ".js");
    if (standardPath !== null) {
        _ret_ = Import(microservicePackage);
    }
    else {
        var nonStandardPath = findPackageNodePath(absolutePath + "/backend/" + microservicePackage) || findPackageNodePath(absolutePath + "/backend/" + microservicePackage + ".js");
        if (nonStandardPath !== null) {
            _ret_ = Import(absolutePath + "/backend/" + microservicePackage);
        }
        else {
            _ret_ = Promise.resolve(require(microservicePackage));
        }
    }
    return _ret_;
};
Package("org.quickcorp.qcobjects.main.http.gae.server", [
    /** @class */ (function (_super) {
        __extends(BackendMicroservice, _super);
        function BackendMicroservice(o) {
            var _this = _super.apply(this, arguments) || this;
            _this.domain = CONFIG.get("domain");
            _this.basePath = CONFIG.get("basePath");
            logger.debug("Executing GAE HTTP BackendMicroservice ");
            var microservice = _this;
            var server = microservice.server;
            var request = microservice.request;
            _this.cors();
            microservice.req.on("data", function (data) {
                // data from POST, GET
                var requestMethod = request.method.toLowerCase();
                var supportedMethods = {
                    "post": microservice.post,
                };
                if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
                    supportedMethods[requestMethod].call(microservice, data);
                }
            });
            // data from POST, GET
            var requestMethod = request.method.toLowerCase();
            var supportedMethods = {
                "get": microservice.get,
                "head": microservice.head,
                "put": microservice.put,
                "delete": microservice.delete,
                "connect": microservice.connect,
                "options": microservice.options,
                "trace": microservice.trace,
                "patch": microservice.patch
            };
            if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
                supportedMethods[requestMethod].call(microservice);
            }
            return _this;
        }
        BackendMicroservice.prototype.cors = function () {
            if (this.route.cors) {
                var _a = this.route.cors, allow_origins = _a.allow_origins, allow_credentials = _a.allow_credentials, allow_methods = _a.allow_methods, allow_headers = _a.allow_headers;
                var microservice = this;
                if (typeof microservice.headers !== "object") {
                    microservice.headers = {};
                }
                if (typeof allow_origins !== "undefined") {
                    // an example of allow_origins is ['https://example.com','http://www.example.com']
                    if (allow_origins == "*" || (typeof microservice.request.headers.origin == "undefined") || __spreadArray([], allow_origins, true).indexOf(microservice.request.headers.origin) !== -1) {
                        // for compatibility with all browsers allways return a wildcard when the origin is allowed
                        microservice.headers["Access-Control-Allow-Origin"] = "*";
                    }
                    else {
                        logger.debug("Origin is not allowed: " + microservice.request.headers.origin);
                        logger.debug("Forcing to finish the response...");
                        this.body = {};
                        try {
                            this.done();
                        }
                        catch (e) { }
                    }
                }
                else {
                    microservice.headers["Access-Control-Allow-Origin"] = "*";
                }
                if (typeof allow_credentials !== "undefined") {
                    microservice.headers["Access-Control-Allow-Credentials"] = allow_credentials.toString();
                }
                else {
                    microservice.headers["Access-Control-Allow-Credentials"] = "true";
                }
                if (typeof allow_methods !== "undefined") {
                    microservice.headers["Access-Control-Allow-Methods"] = __spreadArray([], allow_methods, true).join(",");
                }
                else {
                    microservice.headers["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
                }
                if (typeof allow_headers !== "undefined") {
                    microservice.headers["Access-Control-Allow-Headers"] = __spreadArray([], allow_headers, true).join(",");
                }
                else {
                    microservice.headers["Access-Control-Allow-Headers"] = "*";
                }
            }
        };
        BackendMicroservice.prototype.head = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.post = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.put = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.delete = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.connect = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.options = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.trace = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.patch = function (formData) {
            this.done();
        };
        BackendMicroservice.prototype.finishWithBody = function (stream) {
            try {
                stream.write(JSON.stringify(this.body));
                stream.end();
            }
            catch (e) {
                logger.debug("Something wrong writing the response for microservice" + e.toString());
            }
        };
        BackendMicroservice.prototype.done = function () {
            var microservice = this;
            var stream = microservice.stream;
            try {
                stream.writeHead(200, microservice.headers);
            }
            catch (e) {
                logger.debug("Something went wront while sending headers in http...");
                logger.debug(e.toString());
            }
            if (microservice.body != null) {
                microservice.finishWithBody.call(microservice, stream);
            }
        };
        return BackendMicroservice;
    }(InheritClass)),
    /** @class */ (function (_super) {
        __extends(HTTPServerResponse, _super);
        function HTTPServerResponse(o) {
            var _this = _super.apply(this, arguments) || this;
            var self = _this;
            self.body = "";
            self.stream = o.stream;
            self._generateResponse();
            _this.headers = {
                ":status": 200,
                "content-type": "text/html"
            };
            return _this;
        }
        HTTPServerResponse.prototype.sendFile = function (stream, fileName) {
            // read and send file content in the stream
            try {
                console.log("trying to read " + fileName);
                var fd = fs.openSync(fileName, "r");
                var stat = fs.fstatSync(fd);
                var headers = {
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
                readStream.on("error", function (err) {
                    stream.end(err);
                });
            }
            catch (e) {
                if (e.errno == -2) {
                    var headers = {
                        ":status": 404,
                        "content-type": "text/html"
                    };
                    stream.write("<h1>404 - FILE NOT FOUND</h1>");
                    stream.on("close", function () {
                        console.log("closing file", fileName);
                    });
                    stream.end();
                }
            }
        };
        HTTPServerResponse.prototype._generateResponse = function () {
            var response = this;
            response.fileDispatcher = New(FileDispatcher, {
                scriptname: response.request.scriptname,
                pathname: response.request.pathname,
                done: function (headers, body, templateURI, isTemplate) {
                    response.headers = headers;
                    var stream = response.stream;
                    if (isTemplate) {
                        logger.debug("TEMPLATE");
                        response.body = body;
                        //            stream.respond(response.headers);
                        stream.write(response.body);
                        stream.end();
                    }
                    else if (headers[":status"] == 200) {
                        response.sendFile(stream, templateURI);
                    }
                    else {
                        logger.debug("NONE ");
                        //          stream.respond(response.headers);
                        stream.end();
                    }
                }
            });
        };
        return HTTPServerResponse;
    }(InheritClass)),
    /** @class */ (function (_super) {
        __extends(HTTPServerRequest, _super);
        function HTTPServerRequest(_a) {
            var _b = _a.scriptname, scriptname = _b === void 0 ? "" : _b, _c = _a.path, path = _c === void 0 ? "" : _c, _d = _a.method, method = _d === void 0 ? "" : _d, _e = _a.url, url = _e === void 0 ? "" : _e, _f = _a.headers, headers = _f === void 0 ? null : _f, _g = _a.flags, flags = _g === void 0 ? null : _g, _h = _a.protocol, protocol = _h === void 0 ? null : _h, _j = _a.slashes, slashes = _j === void 0 ? null : _j, _k = _a.auth, auth = _k === void 0 ? null : _k, _l = _a.host, host = _l === void 0 ? null : _l, _m = _a.port, port = _m === void 0 ? null : _m, _o = _a.hostname, hostname = _o === void 0 ? null : _o, _p = _a.hash, hash = _p === void 0 ? null : _p, _q = _a.search, search = _q === void 0 ? "" : _q, _r = _a.query, query = _r === void 0 ? "" : _r, _s = _a.pathname, pathname = _s === void 0 ? "" : _s, _t = _a.href, href = _t === void 0 ? "" : _t;
            return _super.apply(this, arguments) || this;
        }
        return HTTPServerRequest;
    }(InheritClass)),
    /** @class */ (function (_super) {
        __extends(HTTPServer, _super);
        function HTTPServer(_a) {
            var _b = _a.request, request = _b === void 0 ? null : _b, _c = _a.response, response = _c === void 0 ? "" : _c, _d = _a.server, server = _d === void 0 ? null : _d, _e = _a.scriptname, scriptname = _e === void 0 ? "" : _e, _f = _a.interceptorInstances, interceptorInstances = _f === void 0 ? [] : _f;
            var _this = _super.apply(this, arguments) || this;
            var oHTTPServer = _this;
            var welcometo = "Welcome to \n";
            var instructions = "QCObjects Legacy HTTPServer \n";
            var logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
            console.log(welcometo);
            console.log(logo);
            console.log(instructions);
            logger.debug(_this.showIPAddress());
            logger.info("Listening on HTTP PORT: " + CONFIG.get("serverPortHTTP").toString());
            logger.info("Go to: \n" + _this.showPossibleURL());
            _this.interceptorInstances = interceptorInstances;
            var http = require("http");
            oHTTPServer.server = http.createServer(function (req, res) {
            });
            var server = oHTTPServer.server;
            server.on("error", function (err) { return console.error(err); });
            if (global.get("backendAvailable")) {
                logger.info("Loading backend interceptors...");
                var interceptors = CONFIG.get("backend", {}).interceptors;
                if (typeof interceptors !== "undefined") {
                    logger.info("Backend Interceptors Available");
                    interceptors.map(function (interceptor) {
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
            server.on("request", function (req, res) {
                var request = Object.assign(New(HTTPServerRequest), require("url").parse(req.url));
                request.headers = req.headers;
                _this.request = request;
                _this.request.method = req.method;
                _this.request.path = req.url;
                server.setMaxListeners(9999999999);
                CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 20000);
                var timeoutHandler = function () {
                    // end the stream on timeout
                    try {
                        if (!res.destroyed) {
                            logger.info("A timeout occurred..." + CONFIG.get("backendTimeout").toString());
                            logger.info("Killing session...");
                            res.writeHeader(500, {
                                "content-type": "text/html"
                            });
                            res.on("error", function () { });
                            res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                            res.end();
                        }
                        else {
                            logger.debug("Session was normally finishing...");
                        }
                    }
                    catch (e) {
                        logger.debug("An unhandled error occurred during timeout catching...");
                        logger.debug(e.message);
                    }
                    server.removeListener("timeout", timeoutHandler);
                };
                if (!res.destroyed) {
                    server.setTimeout(CONFIG.get("backendTimeout"), timeoutHandler);
                }
                if (_this.request.pathname.indexOf(".") < 0) {
                    _this.request.scriptname = CONFIG.get("documentRootFileIndex");
                }
                else {
                    _this.request.scriptname = _this.request.pathname.split("/").reverse()[0];
                }
                _this.request.pathname = _this.request.pathname.substr(0, _this.request.pathname.lastIndexOf("/"));
                logger.debug((new PipeLog()).pipe(_this.request));
                if (global.get("backendAvailable")) {
                    logger.info("Backend GAE Microservices Available");
                    var routes = CONFIG.get("backend").routes;
                    var selectedRoute = routes.filter(function (route) {
                        var standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                        return (new RegExp(standardRoutePath, "g")).test(request.path);
                    });
                    if (selectedRoute.length > 0) {
                        selectedRoute.map(function (route) {
                            var standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
                            var selectedRouteParams = __assign({}, __spreadArray([], request.path.matchAll((new RegExp(standardRoutePath, "g"))), true)[0]["groups"]);
                            ImportMicroservice(route.microservice);
                            var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
                            _this.response = New(microServiceClassFactory, {
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
                    }
                    else {
                        _this.response = New(HTTPServerResponse, {
                            server: server,
                            stream: res,
                            request: _this.request
                        });
                    }
                }
                else {
                    // ...
                    _this.response = New(HTTPServerResponse, {
                        server: server,
                        stream: res,
                        request: _this.request
                    });
                }
            });
            return _this;
        }
        HTTPServer.prototype.showIPAddress = function () {
            var _ret_ = "";
            var os = require("os");
            var ifaces = os.networkInterfaces();
            Object.keys(ifaces).forEach(function (iface) {
                ifaces[iface].map(function (ipGroup) {
                    _ret_ += iface + ": " + (new PipeLog()).pipe(ipGroup) + "\n";
                });
            });
            return _ret_;
        };
        HTTPServer.prototype.showPossibleURL = function () {
            var _ret_ = "";
            var os = require("os");
            var ifaces = os.networkInterfaces();
            Object.keys(ifaces).forEach(function (iface) {
                ifaces[iface].map(function (ipGroup) {
                    if (ipGroup["family"].toLowerCase() == "ipv4") {
                        _ret_ += "http://" + ipGroup["address"] + ":" + CONFIG.get("serverPortHTTP").toString() + "/\n";
                    }
                });
            });
            return _ret_;
        };
        HTTPServer.prototype.start = function () {
            var server = this.server;
            server.listen(process.env.PORT || CONFIG.get("serverPortHTTP"));
        };
        return HTTPServer;
    }(InheritClass))
]);
