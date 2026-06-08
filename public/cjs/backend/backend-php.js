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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const common_pipelog_1 = require("../common-pipelog");
const fs_1 = __importDefault(require("fs"));
const os_1 = __importDefault(require("os"));
const child_process_1 = require("child_process");
const node_path_1 = __importDefault(require("node:path"));
const absolutePath = node_path_1.default.resolve(__dirname, "./");
const qcobjects_1 = require("qcobjects");
const fixWinCmd = function (commandline) {
    if (!process.platform.toLowerCase().startsWith("win")) {
        commandline = commandline.replace(/(")/g, String.fromCharCode(92) + "\"");
    }
    return commandline;
};
class PHPMicroservice extends qcobjects_1.BackendMicroservice {
    request;
    stream;
    scriptFilePath;
    domain;
    tempFileName;
    route;
    body;
    headers;
    constructor() {
        super();
        const o = this;
        qcobjects_1.logger.debug("PHP Microservice executing");
        const microservice = this;
        const request = microservice.request;
        const stream = o.stream;
        microservice.stream = stream;
        stream.on("data", (data) => {
            // data from POST, GET
            const requestMethod = request.method.toLowerCase();
            const supportedMethods = {
                "post": microservice.post.bind(this),
            };
            if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
                supportedMethods[requestMethod].call(microservice, data);
            }
        });
        // data from POST, GET
        const requestMethod = request.method.toLowerCase();
        const supportedMethods = {
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
    get_php_headers_list() {
        const phpheaders = {
            "QUERY_STRING": `${this.request.query}`,
            "REDIRECT_STATUS": "200",
            "REQUEST_METHOD": `${this.request.method}`,
            "SCRIPT_FILENAME": `${this.scriptFilePath}`,
            "SCRIPT_NAME": `${this.scriptFilePath.toString()}`,
            "PATH_INFO": `${this.request.path}`,
            "SERVER_NAME": `${this.domain}`,
            "SERVER_PROTOCOL": "HTTP/2",
            "REQUEST_URI": `${this.request.href}`,
            "HTTP_HOST": `${this.domain}`
        };
        function fixedEncodeURIComponent(str) {
            return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
        }
        for (const headername in this.request.headers) {
            if (!headername.startsWith(":")) {
                const phpheadername = headername.toUpperCase().replace(new RegExp("-", "g"), "_");
                let headervalue = this.request.headers[headername];
                if (typeof headervalue !== "string") {
                    headervalue = JSON.stringify(headervalue);
                }
                phpheaders["HTTP_" + phpheadername] = fixedEncodeURIComponent(headervalue);
            }
        }
        return common_pipelog_1.PipeLog.pipe(phpheaders);
    }
    saveTempData(data, done) {
        const filename = os_1.default.tmpdir() + this.tempFileName;
        fs_1.default.writeFile(filename, data, (err) => {
            if (err)
                throw err;
            qcobjects_1.logger.debug("A temp data file has been saved!");
            done.call(this);
        });
    }
    generateTempFileName() {
        this.tempFileName = "temp" + Date.now().toString();
        return this.tempFileName;
    }
    trimSlash(pathname) {
        if (pathname.startsWith("/")) {
            pathname = pathname.slice(1);
        }
        if (pathname.endsWith("/")) {
            pathname = pathname.slice(0, -1);
        }
        return pathname.replace("//", "/");
    }
    get() {
        const microservice = this;
        microservice.generateTempFileName();
        microservice.saveTempData(this.request.query, function () {
            try {
                process.chdir(qcobjects_1.CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            }
            catch (e) { }
            const scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
                microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = qcobjects_1.CONFIG.get("documentRoot", "");
            if (documentRoot == "./") {
                documentRoot = "";
            }
            let scriptFilePath;
            if (documentRoot !== "") {
                scriptFilePath = `${documentRoot}/${pathname}/${scriptFileName}`;
            }
            else {
                scriptFilePath = `${pathname}/${scriptFileName}`;
            }
            scriptFilePath = scriptFilePath.replace("//", "/");
            if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
                scriptFilePath = scriptFilePath.slice(1);
            }
            qcobjects_1.logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${qcobjects_1.CONFIG.get("documentRoot")}:${qcobjects_1.CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${os_1.default.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
<?php
$_payload = file_get_contents(sys_get_temp_dir().'${microservice.tempFileName}');
foreach ($_SERVER as $_k => $_v) {
if (array_key_exists($_k,$_ENV)){
$_SERVER[$_k] = $_ENV[$_k];
}
if ( substr($_k, 0, strlen('HTTP_')) == 'HTTP_' ){
$_SERVER[$_k]=urldecode($_v);
}
}
@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_REQUEST);
@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_GET);
unlink(sys_get_temp_dir().'${microservice.tempFileName}');
include('${scriptFilePath}');
?>
EOF`;
            commandline = fixWinCmd(commandline);
            qcobjects_1.logger.debug(commandline);
            try {
                const php = (0, child_process_1.exec)(commandline, (err, stdout, stderr) => {
                    microservice.body = stdout;
                    console.log(stderr);
                    microservice.done();
                });
            }
            catch (ex) {
                microservice.body = "500 - INTERNAL ERROR";
                qcobjects_1.logger.debug(ex.toString());
                console.log(ex);
                microservice.done();
            }
        });
    }
    head(formData) {
        this.done();
    }
    post(formData) {
        qcobjects_1.logger.debug("POST DATA");
        const microservice = this;
        microservice.generateTempFileName();
        microservice.saveTempData(formData, function () {
            try {
                process.chdir(qcobjects_1.CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            }
            catch (e) { }
            const scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
                microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = qcobjects_1.CONFIG.get("documentRoot", "");
            if (documentRoot == "./") {
                documentRoot = "";
            }
            let scriptFilePath;
            if (documentRoot !== "") {
                scriptFilePath = `${documentRoot}/${pathname}/${scriptFileName}`;
            }
            else {
                scriptFilePath = `${pathname}/${scriptFileName}`;
            }
            scriptFilePath = scriptFilePath.replace("//", "/");
            if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
                scriptFilePath = scriptFilePath.slice(1);
            }
            qcobjects_1.logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${qcobjects_1.CONFIG.get("documentRoot")}:${qcobjects_1.CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${os_1.default.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
<?php
$_payload = file_get_contents(sys_get_temp_dir().'${microservice.tempFileName}');
foreach ($_SERVER as $_k => $_v) {
if (array_key_exists($_k,$_ENV)){
$_SERVER[$_k] = $_ENV[$_k];
}
if ( substr($_k, 0, strlen('HTTP_')) == 'HTTP_' ){
$_SERVER[$_k]=urldecode($_v);
}
}
@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_REQUEST);
@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_POST);
unlink(sys_get_temp_dir().'${microservice.tempFileName}');
@include('${scriptFilePath}');
?>
EOF`;
            commandline = fixWinCmd(commandline);
            //        logger.debug(commandline);
            try {
                microservice.body = (0, child_process_1.execSync)(commandline).toString();
            }
            catch (ex) {
                microservice.body = "500 - INTERNAL ERROR";
                qcobjects_1.logger.debug(ex.toString());
            }
            microservice.done();
        });
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
    done() {
        const microservice = this;
        const stream = microservice.stream;
        try {
            stream.respond(microservice.headers);
        }
        catch (e) {
            //
        }
        if (microservice.body != null) {
            microservice.finishWithBody.call(microservice, stream);
        }
    }
    finishWithBody(stream) {
        try {
            stream.write(this.body);
            stream.end();
        }
        catch (e) {
            qcobjects_1.logger.debug("Something wrong writing the response for microservice" + e.toString());
        }
    }
}
const Microservice = (0, qcobjects_1.Class)("Microservice", PHPMicroservice);
(0, qcobjects_1.Package)("org.quickcorp.backend.php", [
    PHPMicroservice,
    Microservice
]);
exports = {
    PHPMicroservice,
    Microservice
};
//# sourceMappingURL=backend-php.js.map