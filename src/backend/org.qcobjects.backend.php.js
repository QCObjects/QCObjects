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
var fs = require("fs");
var os = require("os");
var _a = require("child_process"), exec = _a.exec, execSync = _a.execSync;
// MY_ENV_VAR="HELLO WORLD" php -f index.php
var fixWinCmd = function (commandline) {
    if (!process.platform.toLowerCase().startsWith("win")) {
        commandline = commandline.replace(/(")/g, String.fromCharCode(92) + "\"");
    }
    return commandline;
};
Package("org.quickcorp.backend.php", [
    /** @class */ (function (_super) {
        __extends(PHPMicroservice, _super);
        function PHPMicroservice() {
            var _this = _super.apply(this, arguments) || this;
            var o = _this;
            logger.debug("PHP Microservice executing");
            var microservice = _this;
            var request = microservice.request;
            var stream = o.stream;
            microservice.stream = stream;
            stream.on("data", function (data) {
                // data from POST, GET
                var requestMethod = request.method.toLowerCase();
                var supportedMethods = {
                    "post": microservice.post,
                };
                if (supportedMethods.hasOwnProperty.call(supportedmethods, requestMethod)) {
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
        PHPMicroservice.prototype.get_php_headers_list = function () {
            var phpheaders = {
                "QUERY_STRING": "".concat(this.request.query),
                "REDIRECT_STATUS": "200",
                "REQUEST_METHOD": "".concat(this.request.method),
                "SCRIPT_FILENAME": "".concat(this.scriptFilePath),
                "SCRIPT_NAME": "".concat(this.scriptFilePath.toString()),
                "PATH_INFO": "".concat(this.request.path),
                "SERVER_NAME": "".concat(this.domain),
                "SERVER_PROTOCOL": "HTTP/2",
                "REQUEST_URI": "".concat(this.request.href),
                "HTTP_HOST": "".concat(this.domain)
            };
            function fixedEncodeURIComponent(str) {
                return encodeURIComponent(str).replace(/[!'()]/g, escape).replace(/\*/g, "%2A");
            }
            for (var headername in this.request.headers) {
                if (!headername.startsWith(":")) {
                    var phpheadername = headername.toUpperCase().replace(new RegExp("-", "g"), "_");
                    var headervalue = this.request.headers[headername];
                    if (typeof headervalue !== "string") {
                        headervalue = JSON.stringify(headervalue);
                    }
                    phpheaders["HTTP_" + phpheadername] = fixedEncodeURIComponent(headervalue);
                }
            }
            return PipeLog.pipe(phpheaders);
        };
        PHPMicroservice.prototype.saveTempData = function (data, done) {
            var _this = this;
            var filename = os.tmpdir() + this.tempFileName;
            fs.writeFile(filename, data, function (err) {
                if (err)
                    throw err;
                logger.debug("A temp data file has been saved!");
                done.call(_this);
            });
        };
        PHPMicroservice.prototype.generateTempFileName = function () {
            this.tempFileName = "temp" + Date.now().toString();
            return this.tempFileName;
        };
        PHPMicroservice.prototype.trimSlash = function (pathname) {
            if (pathname.startsWith("/")) {
                pathname = pathname.slice(1);
            }
            if (pathname.endsWith("/")) {
                pathname = pathname.slice(0, -1);
            }
            return pathname.replace("//", "/");
        };
        PHPMicroservice.prototype.get = function () {
            var microservice = this;
            microservice.generateTempFileName();
            microservice.saveTempData(this.request.query, function () {
                try {
                    process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
                }
                catch (e) { }
                var scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
                    microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
                var pathname = this.trimSlash(microservice.request.pathname);
                var documentRoot = CONFIG.get("documentRoot", "");
                if (documentRoot == "./") {
                    documentRoot = "";
                }
                var scriptFilePath;
                if (documentRoot !== "") {
                    scriptFilePath = "".concat(documentRoot, "/").concat(pathname, "/").concat(scriptFileName);
                }
                else {
                    scriptFilePath = "".concat(pathname, "/").concat(scriptFileName);
                }
                scriptFilePath = scriptFilePath.replace("//", "/");
                if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
                    scriptFilePath = scriptFilePath.slice(1);
                }
                logger.debug("Loading PHP file: ".concat(scriptFilePath));
                var PHPIncludePath = ".:".concat(CONFIG.get("documentRoot"), ":").concat(CONFIG.get("projectPath"));
                microservice.scriptFilePath = scriptFilePath;
                var commandline = "echo $(cat ".concat(os.tmpdir()).concat(microservice.tempFileName, ") |") + microservice.get_php_headers_list() + " php -d include_path=\"".concat(PHPIncludePath, "\" -q <<- 'EOF'\n<?php\n$_payload = file_get_contents(sys_get_temp_dir().'").concat(microservice.tempFileName, "');\nforeach ($_SERVER as $_k => $_v) {\n  if (array_key_exists($_k,$_ENV)){\n    $_SERVER[$_k] = $_ENV[$_k];\n  }\n  if ( substr($_k, 0, strlen('HTTP_')) == 'HTTP_' ){\n    $_SERVER[$_k]=urldecode($_v);\n  }\n}\n@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_REQUEST);\n@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_GET);\nunlink(sys_get_temp_dir().'").concat(microservice.tempFileName, "');\ninclude('").concat(scriptFilePath, "');\n?>\nEOF");
                commandline = fixWinCmd(commandline);
                logger.debug(commandline);
                try {
                    var php = exec(commandline, function (err, stdout, stderr) {
                        microservice.body = stdout;
                        console.log(stderr);
                        microservice.done();
                    });
                }
                catch (ex) {
                    microservice.body = "500 - INTERNAL ERROR";
                    logger.debug(ex.toString());
                    console.log(ex);
                    microservice.done();
                }
            });
        };
        PHPMicroservice.prototype.head = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.post = function (formData) {
            logger.debug("POST DATA");
            var microservice = this;
            microservice.generateTempFileName();
            microservice.saveTempData(formData, function () {
                try {
                    process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
                }
                catch (e) { }
                var scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
                    microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
                var pathname = this.trimSlash(microservice.request.pathname);
                var documentRoot = CONFIG.get("documentRoot", "");
                if (documentRoot == "./") {
                    documentRoot = "";
                }
                var scriptFilePath;
                if (documentRoot !== "") {
                    scriptFilePath = "".concat(documentRoot, "/").concat(pathname, "/").concat(scriptFileName);
                }
                else {
                    scriptFilePath = "".concat(pathname, "/").concat(scriptFileName);
                }
                scriptFilePath = scriptFilePath.replace("//", "/");
                if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
                    scriptFilePath = scriptFilePath.slice(1);
                }
                logger.debug("Loading PHP file: ".concat(scriptFilePath));
                var PHPIncludePath = ".:".concat(CONFIG.get("documentRoot"), ":").concat(CONFIG.get("projectPath"));
                microservice.scriptFilePath = scriptFilePath;
                var commandline = "echo $(cat ".concat(os.tmpdir()).concat(microservice.tempFileName, ") |") + microservice.get_php_headers_list() + " php -d include_path=\"".concat(PHPIncludePath, "\" -q <<- 'EOF'\n<?php\n$_payload = file_get_contents(sys_get_temp_dir().'").concat(microservice.tempFileName, "');\nforeach ($_SERVER as $_k => $_v) {\n  if (array_key_exists($_k,$_ENV)){\n    $_SERVER[$_k] = $_ENV[$_k];\n  }\n  if ( substr($_k, 0, strlen('HTTP_')) == 'HTTP_' ){\n    $_SERVER[$_k]=urldecode($_v);\n  }\n}\n@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_REQUEST);\n@parse_str(parse_url('?'.$_payload, PHP_URL_QUERY), $_POST);\nunlink(sys_get_temp_dir().'").concat(microservice.tempFileName, "');\n@include('").concat(scriptFilePath, "');\n?>\nEOF");
                commandline = fixWinCmd(commandline);
                //        logger.debug(commandline);
                try {
                    microservice.body = execSync(commandline).toString();
                }
                catch (ex) {
                    microservice.body = "500 - INTERNAL ERROR";
                    logger.debug(ex.toString());
                }
                microservice.done();
            });
        };
        PHPMicroservice.prototype.put = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.delete = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.connect = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.options = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.trace = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.patch = function (formData) {
            this.done();
        };
        PHPMicroservice.prototype.done = function () {
            var microservice = this;
            var stream = microservice.stream;
            try {
                stream.respond(microservice.headers);
            }
            catch (e) {
                //
            }
            if (microservice.body != null) {
                microservice.finishWithBody.call(microservice, stream);
            }
        };
        PHPMicroservice.prototype.finishWithBody = function (stream) {
            try {
                stream.write(this.body);
                stream.end();
            }
            catch (e) {
                logger.debug("Something wrong writing the response for microservice" + e.toString());
            }
        };
        return PHPMicroservice;
    }(BackendMicroservice)),
    Class("Microservice", PHPMicroservice)
]);
