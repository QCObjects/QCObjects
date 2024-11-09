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
var http2 = require("http2");
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
Package("org.quickcorp.qcobjects.main.http2.server", [
    /** @class */ (function (_super) {
        __extends(HTTP2ServerResponse, _super);
        function HTTP2ServerResponse(_a) {
            var _b = _a.headers, headers = _b === void 0 ? {
                ":status": 200,
                "content-type": "text/html",
                "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
            } : _b, _c = _a.body, body = _c === void 0 ? "" : _c, _d = _a.request, request = _d === void 0 ? null : _d, _e = _a.fileDispatcher, fileDispatcher = _e === void 0 ? null : _e, _f = _a.stream, stream = _f === void 0 ? null : _f;
            var _this = _super.apply(this, arguments) || this;
            var self = _this;
            self._generateResponse();
            return _this;
        }
        HTTP2ServerResponse.prototype.sendFile = function (stream, fileName) {
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
                stream.respondWithFD(fd_1, headers);
                stream.on("close", function () {
                    logger.debug("closing file " + fileName);
                    fs.closeSync(fd_1);
                });
                stream.end();
            }
            catch (e) {
                logger.debug("[HTTP2ServerResponse][sendFile][ERROR] Something went wrong when trying to send the response as file " + fileName);
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
        HTTP2ServerResponse.prototype._generateResponse = function () {
            var response = this;
            response.fileDispatcher = New(FileDispatcher, {
                scriptname: response.request.scriptname,
                pathname: response.request.pathname,
                done: function (headers, body, templateURI, isTemplate) {
                    response.headers = headers;
                    var stream = response.stream;
                    if (isTemplate) {
                        response.body = body;
                        stream.respond(response.headers);
                        stream.write(response.body);
                        stream.end();
                    }
                    else if (headers[":status"] == 200) {
                        response.sendFile(stream, templateURI);
                    }
                    else {
                        stream.respond(response.headers);
                        stream.end();
                    }
                }
            });
        };
        return HTTP2ServerResponse;
    }(InheritClass)),
    /** @class */ (function (_super) {
        __extends(HTTP2ServerRequest, _super);
        function HTTP2ServerRequest(_a) {
            var _b = _a.scriptname, scriptname = _b === void 0 ? "" : _b, _c = _a.path, path = _c === void 0 ? "" : _c, _d = _a.method, method = _d === void 0 ? "" : _d, _e = _a.url, url = _e === void 0 ? "" : _e, _f = _a.headers, headers = _f === void 0 ? null : _f, _g = _a.flags, flags = _g === void 0 ? null : _g, _h = _a.protocol, protocol = _h === void 0 ? null : _h, _j = _a.slashes, slashes = _j === void 0 ? null : _j, _k = _a.auth, auth = _k === void 0 ? null : _k, _l = _a.host, host = _l === void 0 ? null : _l, _m = _a.port, port = _m === void 0 ? null : _m, _o = _a.hostname, hostname = _o === void 0 ? null : _o, _p = _a.hash, hash = _p === void 0 ? null : _p, _q = _a.search, search = _q === void 0 ? "" : _q, _r = _a.query, query = _r === void 0 ? "" : _r, _s = _a.pathname, pathname = _s === void 0 ? "" : _s, _t = _a.href, href = _t === void 0 ? "" : _t;
            return _super.apply(this, arguments) || this;
        }
        return HTTP2ServerRequest;
    }(InheritClass)),
    /** @class */ (function (_super) {
        __extends(HTTP2Server, _super);
        function HTTP2Server(_a) {
            var _b = _a.request, request = _b === void 0 ? null : _b, _c = _a.response, response = _c === void 0 ? "" : _c, _d = _a.server, server = _d === void 0 ? null : _d, _e = _a.scriptname, scriptname = _e === void 0 ? "" : _e, _f = _a.interceptorInstances, interceptorInstances = _f === void 0 ? [] : _f;
            var _this = _super.apply(this, arguments) || this;
            var welcometo = "Welcome to \n";
            var instructions = "HTTP2Server \n";
            var logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
            console.log(welcometo);
            console.log(logo);
            console.log(instructions);
            logger.debug(_this.showIPAddress());
            logger.info("Listening on HTTP PORT: " + CONFIG.get("serverPortHTTP").toString());
            logger.info("Listening on HTTPS PORT: " + CONFIG.get("serverPortHTTPS").toString());
            logger.info("Go to: \n" + _this.showPossibleURL());
            var http2ServerInstance = _this;
            http2ServerInstance.server = http2.createSecureServer({
                key: fs.readFileSync(CONFIG.get("private-key-pem")),
                cert: fs.readFileSync(CONFIG.get("private-cert-pem")),
                allowHTTP1: CONFIG.get("allowHTTP1"),
                origins: ["https://" + CONFIG.get("domain"), "http://" + CONFIG.get("domain")]
            });
            var server = http2ServerInstance.server;
            server.on("error", function (err) { return console.error(err); });
            server.on("session", function (session) {
                // Set altsvc for origin https://example.org:80
                session.altsvc("h2=\":8000\"", "https://" + CONFIG.get("domain"));
                session.altsvc("https=\":" + CONFIG.get("serverPortHTTPS") + "\"", "https://" + CONFIG.get("domain"));
                session.altsvc("http=\":" + CONFIG.get("serverPortHTTP") + "\"", "http://" + CONFIG.get("domain"));
                session.origin("https://" + CONFIG.get("domain"), "http://" + CONFIG.get("domain"));
            });
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
                        http2ServerInstance.interceptorInstances.push(interceptorInstance);
                    });
                }
            }
            server.on("stream", function (stream, headers, flags) {
                CONFIG.set("backendTimeout", CONFIG.get("backendTimeout") || 20000);
                stream.session.setTimeout(CONFIG.get("backendTimeout"));
                stream.session.setMaxListeners(9999999999);
                var timeoutHandler = function () {
                    // end the stream on timeout
                    try {
                        if (!stream.destroyed) {
                            logger.info("A timeout occurred... " + CONFIG.get("backendTimeout").toString());
                            logger.info("Killing session...");
                            stream.respond({
                                ":status": 500,
                                "content-type": "text/html"
                            });
                            stream.on("error", function () { });
                            stream.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                            stream.end();
                        }
                        else {
                            logger.debug("Session was normally finishing...");
                        }
                    }
                    catch (e) {
                        logger.debug("An unhandled error occurred during timeout catching: ".concat(e));
                    }
                    if (!stream.destroyed) {
                        stream.session.removeListener("timeout", timeoutHandler);
                    }
                    else {
                        server.removeListener("timeout", timeoutHandler);
                    }
                };
                if (!stream.destroyed) {
                    stream.session.on("timeout", timeoutHandler);
                }
                stream.session.altsvc("h2=\":8000\"", stream.id);
                stream.session.altsvc("https=\":" + CONFIG.get("serverPortHTTPS") + "\"", stream.id);
                stream.session.altsvc("http=\":" + CONFIG.get("serverPortHTTP") + "\"", stream.id);
                var request = Object.assign(New(HTTP2ServerRequest), require("url").parse(headers[":path"]));
                request.headers = headers;
                request.flags = flags;
                http2ServerInstance.request = request;
                http2ServerInstance.request.method = headers[":method"];
                http2ServerInstance.request.path = headers[":path"];
                if (http2ServerInstance.request.pathname.indexOf(".") < 0) {
                    http2ServerInstance.request.scriptname = CONFIG.get("documentRootFileIndex");
                }
                else {
                    http2ServerInstance.request.scriptname = http2ServerInstance.request.pathname.split("/").reverse()[0];
                }
                http2ServerInstance.request.pathname = _this.request.pathname.substr(0, http2ServerInstance.request.pathname.lastIndexOf("/"));
                logger.debug((new PipeLog()).pipe(_this.request));
                if (global.get("backendAvailable")) {
                    logger.info("Backend Microservices Available...");
                    logger.info("Loading backend routes...");
                    var routes = CONFIG.get("backend", {}).routes;
                    var selectedRoute = routes.filter(function (route) {
                        var standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                        return (new RegExp(standardRoutePath, "g")).test(request.path);
                    });
                    if (selectedRoute.length > 0) {
                        selectedRoute.map(function (route) {
                            var standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
                            console.log(standardRoutePath);
                            var selectedRouteParams = __assign({}, __spreadArray([], request.path.matchAll((new RegExp(standardRoutePath, "g"))), true)[0]["groups"]);
                            ImportMicroservice(route.microservice).then(function () {
                                logger.debug("Trying to execute ".concat(route.microservice + ".Microservice", "..."));
                                var microServiceClassFactory = ClassFactory(route.microservice + ".Microservice");
                                if (typeof microServiceClassFactory !== "undefined") {
                                    http2ServerInstance.response = New(microServiceClassFactory, {
                                        domain: CONFIG.get("domain"),
                                        basePath: CONFIG.get("basePath"),
                                        projectPath: CONFIG.get("projectPath"),
                                        route: route,
                                        routeParams: selectedRouteParams,
                                        server: server,
                                        stream: stream,
                                        request: request
                                    });
                                }
                                else {
                                    throw Error("".concat(route.microservice + ".Microservice", " not defined."));
                                }
                            }).catch(function (e) {
                                throw Error(e);
                            });
                        });
                    }
                    else {
                        _this.response = New(HTTP2ServerResponse, {
                            domain: CONFIG.get("domain"),
                            basePath: CONFIG.get("basePath"),
                            projectPath: CONFIG.get("projectPath"),
                            server: server,
                            stream: stream,
                            request: request
                        });
                    }
                }
                else {
                    // ...
                    _this.response = New(HTTP2ServerResponse, {
                        domain: CONFIG.get("domain"),
                        basePath: CONFIG.get("basePath"),
                        projectPath: CONFIG.get("projectPath"),
                        server: server,
                        stream: stream,
                        request: request
                    });
                }
            });
            return _this;
        }
        HTTP2Server.prototype.showIPAddress = function () {
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
        HTTP2Server.prototype.showPossibleURL = function () {
            var _ret_ = "";
            var os = require("os");
            var ifaces = os.networkInterfaces();
            Object.keys(ifaces).forEach(function (iface) {
                ifaces[iface].map(function (ipGroup) {
                    if (ipGroup["family"].toLowerCase() == "ipv4") {
                        _ret_ += "http://" + ipGroup["address"] + ":" + CONFIG.get("serverPortHTTP").toString() + "/\n";
                        _ret_ += "https://" + ipGroup["address"] + ":" + CONFIG.get("serverPortHTTPS").toString() + "/\n";
                    }
                });
            });
            return _ret_;
        };
        HTTP2Server.prototype.start = function () {
            var server = this.server;
            // http2 port is 8443 but normally is used 443 by replacing current https
            var http = require("http");
            var httpServer = http.createServer(function (req, res) {
                res.writeHead(301, {
                    Location: "https://".concat(req.headers.host).concat(req.url)
                });
                res.end();
            });
            httpServer.listen(CONFIG.get("serverPortHTTP"));
            server.listen(CONFIG.get("serverPortHTTPS"));
        };
        return HTTP2Server;
    }(InheritClass))
]);
