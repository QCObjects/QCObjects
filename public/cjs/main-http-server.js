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
exports.HTTPServer = void 0;
const node_os_1 = __importDefault(require("node:os"));
const node_path_1 = __importDefault(require("node:path"));
const qcobjects_1 = require("qcobjects");
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const http_1 = __importDefault(require("http"));
const url_1 = __importDefault(require("url"));
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
            _ret_ = Promise.resolve(async () => (await import(microservicePackage))());
        }
    }
    return _ret_;
};
class BackendMicroservice extends qcobjects_1.InheritClass {
    body;
    stream;
    req;
    get;
    route;
    headers;
    request;
    constructor({ domain = qcobjects_1.CONFIG.get("domain"), basePath = qcobjects_1.CONFIG.get("basePath"), body = null, stream = null, request = null }) {
        super({
            domain,
            basePath,
            body,
            stream,
            request
        });
        qcobjects_1.logger.debug("Initializing Legacy BackendMicroservice...");
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
            // data from POST, GET
            var requestMethod = request?.method.toLowerCase();
            var supportedMethods = {
                "post": microservice.post.bind(this),
            };
            if (Object.hasOwnProperty.call(supportedMethods, requestMethod)) {
                supportedMethods[requestMethod].call(microservice, data);
            }
        });
        // data from POST, GET
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
            qcobjects_1.logger.debug("Validating CORS...");
            const { allow_origins, allow_credentials, allow_methods, allow_headers } = this.route.cors;
            var microservice = this;
            if (typeof microservice.headers !== "object") {
                microservice.headers = {};
            }
            if (typeof microservice.route.responseHeaders !== "object") {
                microservice.route.responseHeaders = {};
            }
            if (typeof allow_origins !== "undefined") {
                qcobjects_1.logger.debug("CORS: allow_origins available. Validating origins...");
                // an example of allow_origins is ['https://example.com','http://www.example.com']
                if (allow_origins === "*" || (typeof microservice.request.headers.origin === "undefined") || [...allow_origins].indexOf(microservice.request.headers.origin) !== -1) {
                    // for compatibility with all browsers allways return a wildcard when the origin is allowed
                    qcobjects_1.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
                    microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
                }
                else {
                    qcobjects_1.logger.debug("CORS: Origin is not allowed: " + microservice.request.headers.origin);
                    qcobjects_1.logger.debug("CORS: Forcing to finish the response...");
                    this.body = {};
                    try {
                        this.done();
                    }
                    catch (e) {
                        qcobjects_1.logger.debug(`It was not possible to finish the call to the microservice: ${e}`);
                    }
                }
            }
            else {
                qcobjects_1.logger.debug("CORS: no allow_origins available. Allowing all origins...");
                qcobjects_1.logger.debug("CORS: Adding header Access-Control-Allow-Origin=*");
                microservice.route.responseHeaders["Access-Control-Allow-Origin"] = "*";
            }
            if (typeof allow_credentials !== "undefined") {
                qcobjects_1.logger.debug(`CORS: allow_credentials present. Allowing ${allow_credentials}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = allow_credentials.toString();
            }
            else {
                qcobjects_1.logger.debug("CORS: No allow_credentials present. Allowing all credentials.");
                microservice.route.responseHeaders["Access-Control-Allow-Credentials"] = "true";
            }
            if (typeof allow_methods !== "undefined") {
                qcobjects_1.logger.debug(`CORS: allow_methods present. Allowing ${allow_methods}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Methods"] = [...allow_methods].join(",");
            }
            else {
                qcobjects_1.logger.debug("CORS: No allow_methods present. Allowing only GET, OPTIONS and POST");
                microservice.route.responseHeaders["Access-Control-Allow-Methods"] = "GET, OPTIONS, POST";
            }
            if (typeof allow_headers !== "undefined") {
                qcobjects_1.logger.debug(`CORS: allow_headers present. Allowing ${allow_headers}...`);
                microservice.route.responseHeaders["Access-Control-Allow-Headers"] = [...allow_headers].join(",");
            }
            else {
                qcobjects_1.logger.debug("CORS: No allow_headers present. Allowing all headers...");
                microservice.route.responseHeaders["Access-Control-Allow-Headers"] = "*";
            }
        }
        else {
            qcobjects_1.logger.debug("No CORS validation available. You can specify cors in CONFIG.backend.routes[].cors");
        }
    }
    head(formData) { this.done(); }
    post(formData) { this.done(); }
    put(formData) { this.done(); }
    delete(formData) { this.done(); }
    connect(formData) { this.done(); }
    options(formData) { this.done(); }
    trace(formData) { this.done(); }
    patch(formData) { this.done(); }
    finishWithBody(stream) {
        try {
            stream.write(JSON.stringify(this.body));
            stream.end();
        }
        catch (e) {
            qcobjects_1.logger.debug(`Something wrong writing the response for microservice: ${e}`);
            throw Error(e);
        }
    }
    done() {
        var microservice = this;
        var stream = microservice.stream;
        try {
            stream.writeHead(200, microservice.headers);
        }
        catch (e) {
            qcobjects_1.logger.debug(`Something went wront while sending headers in http... ${e}`);
            throw Error(e);
        }
        if (microservice.body != null) {
            microservice.finishWithBody.call(microservice, stream);
        }
    }
}
(0, qcobjects_1.Export)(BackendMicroservice);
class HTTPServerResponse extends qcobjects_1.InheritClass {
    stream;
    fileDispatcher;
    request;
    headers;
    body;
    constructor({ headers = {
        "status": 200,
        "content-type": "text/html"
    }, body = "", request = null, fileDispatcher = null, stream = null }) {
        super({
            headers,
            body,
            request,
            fileDispatcher,
            stream
        });
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
            console.log("trying to read " + fileName);
            const fd = fs_1.default.openSync(fileName, "r");
            const stat = fs_1.default.fstatSync(fd);
            const headers = {
                "content-length": stat.size,
                "last-modified": stat.mtime.toUTCString(),
                "content-type": mime_1.default.getType(fileName),
                "cache-control": qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000")
            };
            qcobjects_1.logger.debug("closing file " + fileName);
            fs_1.default.closeSync(fd);
            stream.setHeader("content-length", headers["content-length"]);
            stream.setHeader("last-modified", headers["last-modified"]);
            stream.setHeader("content-type", headers["content-type"]);
            stream.setHeader("cache-control", headers["cache-control"]);
            // This line opens the file as a readable stream
            var readStream = fs_1.default.createReadStream(fileName);
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
                const headers = {
                    "status": 500,
                    "content-type": mime_1.default.getType(fileName)
                };
                stream.setHeader("content-type", headers["content-type"]);
                stream.setHeader("status", headers["status"]);
                stream.write(`<h1>500 - INTERNAL SERVER ERROR</h1>
          <p>${err}</p>
        `);
                stream.end(err);
            });
        }
        catch (e) {
            if (e.errno == -2) {
                const headers = {
                    "status": 404,
                    "content-type": mime_1.default.getType(fileName)
                };
                stream.setHeader("content-type", headers["content-type"]);
                stream.setHeader("status", headers["status"]);
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
                    Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
                    stream.write(response.body);
                    stream.end();
                }
                else if (headers["status"] == 200 || headers[":status"] == 200) {
                    response.sendFile(stream, templateURI);
                }
                else {
                    Object.keys(headers).map((header) => stream.setHeader(header, headers[header]));
                    stream.end();
                }
            }
        });
    }
}
class HTTPServerRequest extends qcobjects_1.InheritClass {
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
class HTTPServer extends qcobjects_1.InheritClass {
    interceptorInstances;
    server;
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
        const instructions = "QCObjects Legacy HTTPServer \n";
        const logo = " .d88888b.  .d8888b.  .d88888b. 888       d8b                888            \r\nd88P\" \"Y88bd88P  Y88bd88P\" \"Y88b888       Y8P                888            \r\n888     888888    888888     888888                          888            \r\n888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b  \r\n888     888888       888     888888 \"88b \"888d8P  Y8bd88P\"   888   88K      \r\n888 Y8b 888888    888888     888888  888  88888888888888     888   \"Y8888b. \r\nY88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88 \r\n \"Y888888\"  \"Y8888P\"  \"Y88888P\" 88888P\"   888 \"Y8888  \"Y8888P \"Y888 88888P' \r\n       Y8b                                888                               \r\n                                         d88P                               \r\n                                       888P\"   ";
        console.log(welcometo);
        console.log(logo);
        console.log(instructions);
        qcobjects_1.logger.debug(this.showIPAddress());
        qcobjects_1.logger.info("Listening on HTTP PORT: " + qcobjects_1.CONFIG.get("serverPortHTTP").toString());
        qcobjects_1.logger.info("Go to: \n" + this.showPossibleURL());
        this.interceptorInstances = interceptorInstances;
        this.server = http_1.default.createServer((req, res) => {
            qcobjects_1.logger.debug("Legacy Server Instantiated.");
        });
        this.server.on("error", (err) => console.error(err));
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
                        server: this.server
                    });
                    this.interceptorInstances.push(interceptorInstance);
                });
            }
        }
        this.server.on("request", (req, res) => {
            const request = Object.assign((0, qcobjects_1.New)(HTTPServerRequest), url_1.default.parse(req.url));
            request.headers = req.headers;
            this.request = request;
            this.request.method = req.method;
            this.request.path = req.url;
            this.server.setMaxListeners(9999999999);
            qcobjects_1.CONFIG.set("backendTimeout", qcobjects_1.CONFIG.get("backendTimeout") || 20000);
            var timeoutHandler = () => {
                // end the stream on timeout
                try {
                    if (!res.destroyed) {
                        qcobjects_1.logger.info("A timeout occurred..." + qcobjects_1.CONFIG.get("backendTimeout").toString());
                        qcobjects_1.logger.info("Killing session...");
                        res.writeHeader(500, {
                            "content-type": "text/html"
                        });
                        res.on("error", () => { });
                        res.write("<h1>500 - INTERNAL SERVER ERROR (TIMEOUT)</h1>");
                        res.end();
                    }
                    else {
                        qcobjects_1.logger.debug("Session was normally finishing...");
                    }
                }
                catch (e) {
                    qcobjects_1.logger.debug(`An unhandled error occurred during timeout catching: ${e}`);
                }
                this.server.removeListener("timeout", timeoutHandler);
            };
            if (!res.destroyed) {
                this.server.setTimeout(qcobjects_1.CONFIG.get("backendTimeout"), timeoutHandler);
            }
            if (this.request.pathname.indexOf(".") < 0) {
                this.request.scriptname = qcobjects_1.CONFIG.get("documentRootFileIndex");
            }
            else {
                this.request.scriptname = this.request.pathname.split("/").reverse()[0];
            }
            this.request.pathname = this.request.pathname.substr(0, this.request.pathname.lastIndexOf("/"));
            qcobjects_1.logger.debug(common_pipelog_1.PipeLog.pipe(this.request));
            if (qcobjects_1.global.get("backendAvailable")) {
                qcobjects_1.logger.info("Backend Legacy Microservices Available...");
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
                        ImportMicroservice(route.microservice).then(() => {
                            qcobjects_1.logger.debug(`Trying to execute ${route.microservice + ".Microservice"}...`);
                            var microServiceClassFactory = (0, qcobjects_1.ClassFactory)(route.microservice + ".Microservice");
                            if (typeof microServiceClassFactory !== "undefined") {
                                const server = this.server;
                                this.response = (0, qcobjects_1.New)(microServiceClassFactory, {
                                    domain: qcobjects_1.CONFIG.get("domain"),
                                    basePath: qcobjects_1.CONFIG.get("basePath"),
                                    projectPath: qcobjects_1.CONFIG.get("projectPath"),
                                    route: route,
                                    routeParams: selectedRouteParams,
                                    server: server,
                                    stream: res,
                                    req: req,
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
                    this.response = (0, qcobjects_1.New)(HTTPServerResponse, {
                        domain: qcobjects_1.CONFIG.get("domain"),
                        basePath: qcobjects_1.CONFIG.get("basePath"),
                        projectPath: qcobjects_1.CONFIG.get("projectPath"),
                        server: this.server,
                        stream: res,
                        req: req,
                        request: this.request
                    });
                }
            }
            else {
                // ...
                this.response = (0, qcobjects_1.New)(HTTPServerResponse, {
                    server: this.server,
                    stream: res,
                    req: req,
                    request: this.request
                });
            }
        });
    }
    showIPAddress() {
        var _ret_ = "";
        var ifaces = node_os_1.default.networkInterfaces();
        Object.keys(ifaces).forEach(function (iface) {
            ifaces[iface]?.forEach(function (ipGroup) {
                _ret_ += iface + ": " + common_pipelog_1.PipeLog.pipe(ipGroup) + "\n";
            });
        });
        return _ret_;
    }
    showPossibleURL() {
        var _ret_ = "";
        var ifaces = node_os_1.default.networkInterfaces();
        Object.keys(ifaces).forEach(function (iface) {
            ifaces[iface]?.forEach(function (ipGroup) {
                if (ipGroup["family"].toLowerCase() == "ipv4") {
                    _ret_ += "http://" + ipGroup["address"] + ":" + qcobjects_1.CONFIG.get("serverPortHTTP").toString() + "/\n";
                }
            });
        });
        return _ret_;
    }
    start() {
        var server = this.server;
        server.listen(process.env.PORT || qcobjects_1.CONFIG.get("serverPortHTTP"));
    }
}
exports.HTTPServer = HTTPServer;
(0, qcobjects_1.Package)("org.quickcorp.qcobjects.main.http.server", [
    BackendMicroservice,
    HTTPServer,
    HTTPServerRequest,
    HTTPServerResponse
]);
//# sourceMappingURL=main-http-server.js.map