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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mime_1 = __importDefault(require("mime"));
const node_fs_1 = __importDefault(require("node:fs"));
const node_path_1 = __importDefault(require("node:path"));
const qcobjects_1 = require("qcobjects");
const absolutePath = node_path_1.default.resolve(__dirname, "./");
(0, qcobjects_1.Package)("com.qcobjects.backend.microservice.static", [
    class Microservice extends qcobjects_1.BackendMicroservice {
        stream;
        fileName;
        route;
        request;
        body;
        finishWithBody() { }
        done() {
            // read and send file content in the stream
            const microservice = this;
            const stream = microservice.stream;
            const fileName = (!microservice.fileName.startsWith("/")) ? (`${process.cwd()}/${microservice.fileName}`) : (microservice.fileName);
            const sendFileHTTP2 = function (stream, fileName) {
                // read and send file content in the stream
                try {
                    const fd = node_fs_1.default.openSync(fileName, "r");
                    const stat = node_fs_1.default.fstatSync(fd);
                    let headers = {
                        "content-length": stat.size,
                        "last-modified": stat.mtime.toUTCString(),
                        "content-type": mime_1.default.getType(fileName),
                        "cache-control": qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000")
                    };
                    if (typeof microservice.route.responseHeaders !== "undefined") {
                        headers = Object.assign(headers, microservice.route.responseHeaders);
                    }
                    stream.respondWithFD(fd, headers);
                    stream.on("close", () => {
                        qcobjects_1.logger.debug("closing file " + fileName);
                        node_fs_1.default.closeSync(fd);
                    });
                    stream.end();
                }
                catch (e) {
                    qcobjects_1.logger.warn("[ERROR] Something went wrong when trying to send the response as file " + fileName);
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
            };
            const sendFileLegacyHTTP = function (stream, fileName) {
                // read and send file content in the stream
                let headers;
                try {
                    qcobjects_1.logger.info("trying to read " + fileName);
                    const fd = node_fs_1.default.openSync(fileName, "r");
                    const stat = node_fs_1.default.fstatSync(fd);
                    headers = {
                        "Content-Length": stat.size,
                        "Last-Modified": stat.mtime.toUTCString(),
                        "Content-Type": mime_1.default.getType(fileName),
                        "Cache-Control": qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000")
                    };
                    if (typeof microservice.route.responseHeaders !== "undefined") {
                        headers = Object.assign(headers, microservice.route.responseHeaders);
                    }
                    qcobjects_1.logger.debug("closing file " + fileName);
                    node_fs_1.default.closeSync(fd);
                    stream.writeHead(200, headers);
                    stream.write(node_fs_1.default.readFileSync(fileName).toString());
                    stream.on("close", () => {
                        qcobjects_1.logger.info("closing static file", fileName);
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
                        stream.on("close", () => {
                            qcobjects_1.logger.info("closing static file with error: ", fileName);
                        });
                    }
                    qcobjects_1.logger.warn(e);
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
        }
        static(method, data) {
            const microservice = this;
            const redirect_to = microservice.route.redirect_to;
            return new Promise(function (resolve, reject) {
                const supported_methods = microservice.route.supported_methods;
                let _method_allowed_ = false;
                if (typeof supported_methods !== "undefined") {
                    if (supported_methods == "*" || (typeof method === "undefined") || [...supported_methods].map(m => m.toLowerCase()).indexOf(method.toLowerCase()) !== -1) {
                        _method_allowed_ = true;
                    }
                }
                else {
                    _method_allowed_ = true;
                }
                qcobjects_1.logger.debug("Starting static delivery microservice call for method: " + method);
                if (_method_allowed_) {
                    qcobjects_1.logger.info("I'm going to deliver a static path...");
                    if (redirect_to) {
                        const request_path = microservice.request.path;
                        const re = (new RegExp(microservice.route.path.replace(/{(.*?)}/g, "\(\?\<$1\>\.\*\)"), "g"));
                        microservice.fileName = request_path.replace(re, microservice.route.redirect_to);
                        try {
                            resolve();
                        }
                        catch (e) {
                            qcobjects_1.logger.warn("\u{1F926} Something went wrong \u{1F926} when trying to deliver a static path: " + microservice.fileName);
                            reject(e);
                        }
                    }
                    else {
                        qcobjects_1.logger.info("There is no redirect_to setting declared in route properties. \n Skipping static delivery...");
                        reject(new Error("There is no redirect_to setting declared in route properties. \n Skipping static delivery..."));
                    }
                }
                else {
                    qcobjects_1.logger.debug("Method: " + method + " will be skipped");
                    resolve();
                }
            });
        }
        head(formData) {
            const microservice = this;
            microservice.static("head", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        get(formData) {
            const microservice = this;
            microservice.static("get", formData).then(response => {
                microservice.body = response;
                microservice.done();
            }).catch(error => {
                console.error(error);
            });
        }
        post(formData) {
            const microservice = this;
            microservice.static("post", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        put(formData) {
            const microservice = this;
            microservice.static("put", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        delete(formData) {
            const microservice = this;
            microservice.static("delete", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        connect(formData) {
            const microservice = this;
            microservice.static("connect", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        options(formData) {
            const microservice = this;
            microservice.static("options", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        trace(formData) {
            const microservice = this;
            microservice.static("trace", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
        patch(formData) {
            const microservice = this;
            microservice.static("patch", formData).then(response => {
                microservice.body = response;
                microservice.done();
            })
                .catch((e) => { qcobjects_1.logger.warn(`An error ocurred: ${e}`); });
        }
    }
]);
//# sourceMappingURL=backend-microservice-static.js.map