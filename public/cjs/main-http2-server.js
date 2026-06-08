/**
 * QCObjects CLI 2.5
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTP2Server = void 0;
const qcobjects_1 = require("qcobjects");
const mime_1 = __importDefault(require("mime"));
const node_path_1 = __importDefault(require("node:path"));
const node_http2_1 = __importDefault(require("node:http2"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_os_1 = __importDefault(require("node:os"));
const node_url_1 = __importDefault(require("node:url"));
const node_http_1 = __importDefault(require("node:http"));
const main_file_1 = require("./main-file");
const common_pipelog_1 = require("./common-pipelog");
const absolutePath = node_path_1.default.resolve(__dirname, "./");
const ImportMicroservice = function (microservicePackage) {
    var _ret_;
    var standardPath = (0, qcobjects_1.findPackageNodePath)(microservicePackage) || (0, qcobjects_1.findPackageNodePath)(microservicePackage + ".js");
    if (standardPath !== null) {
        _ret_ = (0, qcobjects_1.Import)(microservicePackage);
    }
    else {
        var nonStandardPath = (0, qcobjects_1.findPackageNodePath)(absolutePath + "/backend/" + microservicePackage) || (0, qcobjects_1.findPackageNodePath)(absolutePath + "/backend/" + microservicePackage + ".js");
        if (nonStandardPath !== null) {
            _ret_ = (0, qcobjects_1.Import)(absolutePath + "/backend/" + microservicePackage);
        }
        else {
            _ret_ = Promise.resolve((async () => (await import(microservicePackage)))());
        }
    }
    return _ret_;
};
class HTTP2ServerResponse extends qcobjects_1.InheritClass {
    fileDispatcher;
    request;
    headers;
    stream;
    body;
    constructor({ headers = {
        ":status": 200,
        "content-type": "text/html",
        "cache-control": qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000")
    }, body = "", request = null, fileDispatcher = null, stream = null }) {
        super();
        var self = this;
        self.request = request || {};
        self.stream = stream;
        self.headers = headers;
        self.body = body;
        self.fileDispatcher = fileDispatcher;
        // Initialize request properties if not set
        if (!self.request.scriptname || !self.request.pathname) {
            const defaultPath = "/";
            self.request.pathname = self.request.pathname || defaultPath;
            self.request.scriptname = self.request.scriptname || qcobjects_1.CONFIG.get("documentRootFileIndex", "index.html");
        }
        // Ensure documentRoot is set
        if (!qcobjects_1.CONFIG.get("documentRoot")) {
            qcobjects_1.CONFIG.set("documentRoot", node_path_1.default.join(process.cwd(), "public"));
        }
        self._generateResponse();
    }
    sendFile(stream, fileName) {
        // read and send file content in the stream
        try {
            const fd = node_fs_1.default.openSync(fileName, "r");
            const stat = node_fs_1.default.fstatSync(fd);
            const headers = {
                "content-length": stat.size,
                "last-modified": stat.mtime.toUTCString(),
                "content-type": mime_1.default.getType(fileName),
                "cache-control": qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000")
            };
            stream.respondWithFD(fd, headers);
            stream.on("close", () => {
                qcobjects_1.logger.debug("closing file " + fileName);
                node_fs_1.default.closeSync(fd);
            });
            stream.end();
        }
        catch (e) {
            qcobjects_1.logger.debug("[HTTP2ServerResponse][sendFile][ERROR] Something went wrong when trying to send the response as file " + fileName);
            if (e.errno == -2) {
                const headers = {
                    ":status": 404,
                    "content-type": mime_1.default.getType(fileName)
                };
                stream.respond(headers);
                stream.write("<h1>404 - FILE NOT FOUND</h1>");
                stream.on("close", () => {
                    qcobjects_1.logger.debug("closing file " + fileName);
                });
                stream.end();
            }
        }
    }
    _generateResponse() {
        var response = this;
        response.fileDispatcher = (0, qcobjects_1.New)(main_file_1.FileDispatcher, {
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
    }
}
class HTTP2ServerRequest extends qcobjects_1.InheritClass {
    constructor({ scriptname = "", path = "", method = "", url = "", headers = null, flags = null, protocol = null, slashes = null, auth = null, host = null, port = null, hostname = null, hash = null, search = "", query = "", pathname = "", href = "" }) {
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
class HTTP2Server extends qcobjects_1.InheritClass {
    server;
    interceptorInstances;
    request;
    response;
    constructor({ request = null, response = "", server = null, scriptname = "", interceptorInstances = [] }) {
        super({
            request,
            response,
            server,
            scriptname,
            interceptorInstances
        });
        const welcometo = "Welcome to \n";
        const instructions = "HTTP2Server \n";
        const logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
        console.log(welcometo);
        console.log(logo);
        console.log(instructions);
        qcobjects_1.logger.debug(this.showIPAddress());
        qcobjects_1.logger.info("Listening on HTTP PORT: " + qcobjects_1.CONFIG.get("serverPortHTTP").toString());
        qcobjects_1.logger.info("Listening on HTTPS PORT: " + qcobjects_1.CONFIG.get("serverPortHTTPS").toString());
        qcobjects_1.logger.info("Go to: \n" + this.showPossibleURL());
        const http2ServerInstance = this;
        http2ServerInstance.server = node_http2_1.default.createSecureServer({
            key: node_fs_1.default.readFileSync(qcobjects_1.CONFIG.get("private-key-pem")),
            cert: node_fs_1.default.readFileSync(qcobjects_1.CONFIG.get("private-cert-pem")),
            allowHTTP1: qcobjects_1.CONFIG.get("allowHTTP1"),
            origins: ["https://" + qcobjects_1.CONFIG.get("domain"), "http://" + qcobjects_1.CONFIG.get("domain")]
        });
        server = http2ServerInstance.server;
        server.on("error", (err) => console.error(err));
        server.on("session", (session) => {
            // Set altsvc for origin https://example.org:80
            session.altsvc("h2=\":8000\"", "https://" + qcobjects_1.CONFIG.get("domain"));
            session.altsvc("https=\":" + qcobjects_1.CONFIG.get("serverPortHTTPS") + "\"", "https://" + qcobjects_1.CONFIG.get("domain"));
            session.altsvc("http=\":" + qcobjects_1.CONFIG.get("serverPortHTTP") + "\"", "http://" + qcobjects_1.CONFIG.get("domain"));
            session.origin("https://" + qcobjects_1.CONFIG.get("domain"), "http://" + qcobjects_1.CONFIG.get("domain"));
        });
        if (qcobjects_1.global.get("backendAvailable")) {
            qcobjects_1.logger.info("Loading backend interceptors...");
            const interceptors = qcobjects_1.CONFIG.get("backend", {}).interceptors;
            if (typeof interceptors !== "undefined") {
                qcobjects_1.logger.info("Backend Interceptors Available");
                interceptors.map((interceptor) => {
                    ImportMicroservice(interceptor.microservice);
                    var interceptorClassFactory = (0, qcobjects_1.ClassFactory)(interceptor.microservice + ".Interceptor");
                    var interceptorInstance = (0, qcobjects_1.New)(interceptorClassFactory, {
                        domain: qcobjects_1.CONFIG.get("domain"),
                        basePath: qcobjects_1.CONFIG.get("basePath"),
                        projectPath: qcobjects_1.CONFIG.get("projectPath"),
                        interceptor: interceptor,
                        server: server
                    });
                    http2ServerInstance.interceptorInstances.push(interceptorInstance);
                });
            }
        }
        server.on("stream", (stream, headers, flags) => {
            qcobjects_1.CONFIG.set("backendTimeout", qcobjects_1.CONFIG.get("backendTimeout") || 20000);
            stream.session.setTimeout(qcobjects_1.CONFIG.get("backendTimeout"));
            stream.session.setMaxListeners(9999999999);
            var timeoutHandler = () => {
                // end the stream on timeout
                try {
                    if (!stream.destroyed) {
                        qcobjects_1.logger.info("A timeout occurred... " + qcobjects_1.CONFIG.get("backendTimeout").toString());
                        qcobjects_1.logger.info("Killing session...");
                        stream.respond({
                            ":status": 500,
                            "content-type": "text/html"
                        });
                        stream.on("error", () => { });
                        stream.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                        stream.end();
                    }
                    else {
                        qcobjects_1.logger.debug("Session was normally finishing...");
                    }
                }
                catch (e) {
                    qcobjects_1.logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
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
            stream.session.altsvc("https=\":" + qcobjects_1.CONFIG.get("serverPortHTTPS") + "\"", stream.id);
            stream.session.altsvc("http=\":" + qcobjects_1.CONFIG.get("serverPortHTTP") + "\"", stream.id);
            const request = Object.assign((0, qcobjects_1.New)(HTTP2ServerRequest), node_url_1.default.parse(headers[":path"]));
            request.headers = headers;
            request.flags = flags;
            http2ServerInstance.request = request;
            http2ServerInstance.request.method = headers[":method"];
            http2ServerInstance.request.path = headers[":path"];
            // Fix pathname and scriptname initialization
            const pathParts = http2ServerInstance.request.pathname.split("/");
            if (pathParts.length > 0) {
                if (http2ServerInstance.request.pathname.indexOf(".") < 0) {
                    http2ServerInstance.request.scriptname = qcobjects_1.CONFIG.get("documentRootFileIndex", "index.html");
                    // Keep the original pathname as is, no need to reassign
                }
                else {
                    http2ServerInstance.request.scriptname = pathParts[pathParts.length - 1];
                    http2ServerInstance.request.pathname = http2ServerInstance.request.pathname.substr(0, http2ServerInstance.request.pathname.lastIndexOf("/"));
                }
            }
            else {
                http2ServerInstance.request.scriptname = qcobjects_1.CONFIG.get("documentRootFileIndex", "index.html");
                http2ServerInstance.request.pathname = "/";
            }
            qcobjects_1.logger.debug(common_pipelog_1.PipeLog.pipe(this.request));
            if (qcobjects_1.global.get("backendAvailable")) {
                qcobjects_1.logger.info("Backend Microservices Available...");
                qcobjects_1.logger.info("Loading backend routes...");
                const routes = qcobjects_1.CONFIG.get("backend", {}).routes;
                const selectedRoute = routes.filter((route) => {
                    const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)");
                    return (new RegExp(standardRoutePath, "g")).test(request.path);
                });
                if (selectedRoute.length > 0) {
                    selectedRoute.map((route) => {
                        const standardRoutePath = route.path.replace(/{(.*?)}/g, "(?<$1>.*)"); //allowing {param}
                        console.log(standardRoutePath);
                        const selectedRouteParams = {
                            ...[...request.path.matchAll((new RegExp(standardRoutePath, "g")))][0]["groups"]
                        };
                        ImportMicroservice(route.microservice).then(function () {
                            qcobjects_1.logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
                            var microServiceClassFactory = (0, qcobjects_1.ClassFactory)(route.microservice + ".Microservice");
                            if (typeof microServiceClassFactory !== "undefined") {
                                http2ServerInstance.response = (0, qcobjects_1.New)(microServiceClassFactory, {
                                    domain: qcobjects_1.CONFIG.get("domain"),
                                    basePath: qcobjects_1.CONFIG.get("basePath"),
                                    projectPath: qcobjects_1.CONFIG.get("projectPath"),
                                    route: route,
                                    routeParams: selectedRouteParams,
                                    server: server,
                                    stream: stream,
                                    request: request
                                });
                            }
                            else {
                                throw Error(`${route.microservice + ".Microservice"} not defined.`);
                            }
                        }).catch((e) => {
                            throw Error(e);
                        });
                    });
                }
                else {
                    this.response = (0, qcobjects_1.New)(HTTP2ServerResponse, {
                        domain: qcobjects_1.CONFIG.get("domain"),
                        basePath: qcobjects_1.CONFIG.get("basePath"),
                        projectPath: qcobjects_1.CONFIG.get("projectPath"),
                        server: server,
                        stream: stream,
                        request: request
                    });
                }
            }
            else {
                // ...
                this.response = (0, qcobjects_1.New)(HTTP2ServerResponse, {
                    domain: qcobjects_1.CONFIG.get("domain"),
                    basePath: qcobjects_1.CONFIG.get("basePath"),
                    projectPath: qcobjects_1.CONFIG.get("projectPath"),
                    server: server,
                    stream: stream,
                    request: request
                });
            }
        });
    }
    showIPAddress() {
        var _ret_ = "";
        var ifaces = node_os_1.default.networkInterfaces();
        Object.keys(ifaces).forEach(function (iface) {
            ifaces[iface]?.map(function (ipGroup) {
                _ret_ += iface + ": " + common_pipelog_1.PipeLog.pipe(ipGroup) + "\n";
            });
        });
        return _ret_;
    }
    showPossibleURL() {
        let _ret_ = "";
        const ifaces = node_os_1.default.networkInterfaces();
        Object.keys(ifaces).forEach((iface) => {
            ifaces[iface]?.forEach((ipGroup) => {
                if (ipGroup.family.toLowerCase() === "ipv4") {
                    _ret_ += `http://${ipGroup.address}:${qcobjects_1.CONFIG.get("serverPortHTTP")}/\n`;
                    _ret_ += `https://${ipGroup.address}:${qcobjects_1.CONFIG.get("serverPortHTTPS")}/\n`;
                }
            });
        });
        return _ret_;
    }
    start() {
        var server = this.server;
        // http2 port is 8443 but normally is used 443 by replacing current https
        const httpServer = node_http_1.default.createServer((req, res) => {
            res.writeHead(301, {
                Location: `https://${req.headers.host}${req.url}`
            });
            res.end();
        });
        httpServer.listen(qcobjects_1.CONFIG.get("serverPortHTTP"));
        server.listen(qcobjects_1.CONFIG.get("serverPortHTTPS"));
    }
}
exports.HTTP2Server = HTTP2Server;
(0, qcobjects_1.Package)("org.quickcorp.qcobjects.main.http2.server", [
    HTTP2ServerResponse, HTTP2ServerRequest, HTTP2Server
]);
//# sourceMappingURL=main-http2-server.js.map