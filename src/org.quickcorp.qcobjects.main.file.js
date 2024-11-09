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
var path = require("path");
var fs = require("fs");
var mime = require("mime");
var absolutePath = path.resolve(__dirname, "./");
Package("org.quickcorp.qcobjects.main.file", [
    /** @class */ (function (_super) {
        __extends(FileDispatcher, _super);
        function FileDispatcher(_a) {
            var _b = _a.name, name = _b === void 0 ? CONFIG.get("documentRootFileIndex") : _b, _c = _a.template, template = _c === void 0 ? "" : _c, _d = _a.templateURI, templateURI = _d === void 0 ? CONFIG.get("documentRootFileIndex") : _d, _e = _a.headers, headers = _e === void 0 ? {} : _e, _f = _a.body, body = _f === void 0 ? "" : _f, _g = _a.filename, filename = _g === void 0 ? "" : _g;
            var _this = _super.apply(this, arguments) || this;
            var o = _this;
            var scriptname = o.scriptname;
            _this.filename = scriptname;
            var pathname = (o.pathname !== "") ? (o.pathname + "/") : ("");
            var appTemplateInstance = _this;
            if (typeof appTemplateInstance.headers === "undefined") {
                appTemplateInstance.headers = {
                    ":status": 500,
                    "content-type": "text/html"
                };
            }
            appTemplateInstance.done = o.done;
            appTemplateInstance.templateURI = CONFIG.get("documentRoot") + pathname + scriptname;
            appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace("//", "/");
            if (appTemplateInstance.isTemplate()) {
                fs.readFile(appTemplateInstance.templateURI, function (err, data) {
                    logger.debug("reading data from " + appTemplateInstance.templateURI);
                    if (typeof data !== "undefined") {
                        appTemplateInstance.template = data.toString();
                        appTemplateInstance._done.call(appTemplateInstance);
                    }
                    else {
                        appTemplateInstance.headers = {
                            ":status": 404,
                            "content-type": "text/html"
                        };
                        appTemplateInstance.done.call(appTemplateInstance, appTemplateInstance.headers, "FILE NOT FOUND", "notfound.html", false);
                        logger.debug("file not found");
                    }
                });
            }
            else {
                appTemplateInstance.headers[":status"] = 200;
                appTemplateInstance.headers["content-type"] = mime.getType(appTemplateInstance.templateURI);
                appTemplateInstance.done.call(appTemplateInstance, appTemplateInstance.headers, "", appTemplateInstance.templateURI, false);
            }
            logger.info("FileDispatcher initialized");
            return _this;
        }
        FileDispatcher.prototype.file_extension = function () {
            return this.filename.substr(this.filename.indexOf("."));
        };
        FileDispatcher.prototype.isTemplate = function () {
            return CONFIG.get("useTemplate") && (this.file_extension() == ".html" || this.file_extension() == ".tpl.html");
        };
        FileDispatcher.prototype._done = function () {
            var appTemplateInstance = this;
            var source = appTemplateInstance.template;
            if (appTemplateInstance.isTemplate()) {
                (New(Component, {
                    name: "static_source",
                    template: source,
                    cached: false,
                    tplsource: "inline",
                    data: {
                        title: "QCObjects"
                    },
                    done: function (_a) {
                        var request = _a.request, component = _a.component;
                        appTemplateInstance.body = component.parsedAssignmentText;
                        return Promise.resolve({
                            request: request,
                            component: component
                        });
                    }
                }));
            }
            else {
                appTemplateInstance.body = source;
            }
            if ([".png",
                ".jpg",
                ".jpeg",
                ".json",
                ".html",
                ".tpl.html",
                ".css",
                ".js",
                ".svg"
            ].includes(appTemplateInstance.file_extension())) {
                appTemplateInstance.headers["content-type"] = mime.getType(appTemplateInstance.templateURI);
                appTemplateInstance.headers["cache-control"] = CONFIG.get("cacheControl", "max-age=31536000");
                appTemplateInstance.done.call(appTemplateInstance, appTemplateInstance.headers, appTemplateInstance.body, appTemplateInstance.templateURI, appTemplateInstance.isTemplate());
            }
            else {
                appTemplateInstance.done.call(appTemplateInstance, {
                    ":status": 403,
                    "content-type": "text/plain"
                }, "FORBIDDEN", "notfound.html", false);
            }
        };
        FileDispatcher.prototype.done = function (headers, body) { };
        return FileDispatcher;
    }(InheritClass))
]);
