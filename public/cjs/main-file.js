"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileDispatcher = void 0;
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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const mime_1 = __importDefault(require("mime"));
const qcobjects_1 = require("qcobjects");
class FileDispatcher extends qcobjects_1.InheritClass {
    scriptname;
    filename;
    pathname;
    headers;
    templateURI;
    template;
    body;
    constructor({ name = qcobjects_1.CONFIG.get("documentRootFileIndex"), template = "", templateURI = qcobjects_1.CONFIG.get("documentRootFileIndex"), headers = {}, body = "", filename = "", scriptname, pathname, done }) {
        super({
            name,
            template,
            templateURI,
            headers,
            body,
            filename,
            scriptname,
            pathname,
            done
        });
        var o = this;
        var scriptname = o.scriptname;
        this.filename = scriptname;
        var pathname = (o.pathname !== "") ? (o.pathname + "/") : ("");
        var appTemplateInstance = this;
        if (typeof appTemplateInstance.headers === "undefined") {
            appTemplateInstance.headers = {
                ":status": 500,
                "content-type": "text/html"
            };
        }
        appTemplateInstance.done = o.done.bind(appTemplateInstance);
        appTemplateInstance.templateURI = qcobjects_1.CONFIG.get("documentRoot") + pathname + scriptname;
        appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace("//", "/");
        if (appTemplateInstance.isTemplate()) {
            fs_1.default.readFile(appTemplateInstance.templateURI, function (err, data) {
                qcobjects_1.logger.debug("reading data from " + appTemplateInstance.templateURI);
                if (typeof data !== "undefined") {
                    appTemplateInstance.template = data.toString();
                    appTemplateInstance._done();
                }
                else {
                    appTemplateInstance.headers = {
                        ":status": 404,
                        "content-type": "text/html"
                    };
                    appTemplateInstance.done(appTemplateInstance.headers, "FILE NOT FOUND", "notfound.html", false);
                    qcobjects_1.logger.debug("file not found");
                }
            });
        }
        else {
            appTemplateInstance.headers[":status"] = 200;
            appTemplateInstance.headers["content-type"] = mime_1.default.getType(appTemplateInstance.templateURI);
            appTemplateInstance.done(appTemplateInstance.headers, "", appTemplateInstance.templateURI, false);
        }
        qcobjects_1.logger.info("FileDispatcher initialized");
    }
    file_extension() {
        return this.filename.substr(this.filename.indexOf("."));
    }
    isTemplate() {
        return qcobjects_1.CONFIG.get("useTemplate") && (this.file_extension() == ".html" || this.file_extension() == ".tpl.html");
    }
    _done() {
        var appTemplateInstance = this;
        const source = appTemplateInstance.template;
        if (appTemplateInstance.isTemplate()) {
            ((0, qcobjects_1.New)(qcobjects_1.Component, {
                name: "static_source",
                template: source,
                cached: false,
                tplsource: "inline",
                data: {
                    title: "QCObjects"
                },
                done({ request, component }) {
                    appTemplateInstance.body = component.parsedAssignmentText;
                    return Promise.resolve({
                        request,
                        component
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
            appTemplateInstance.headers["content-type"] = mime_1.default.getType(appTemplateInstance.templateURI);
            appTemplateInstance.headers["cache-control"] = qcobjects_1.CONFIG.get("cacheControl", "max-age=31536000");
            appTemplateInstance.done(appTemplateInstance.headers, appTemplateInstance.body, appTemplateInstance.templateURI, appTemplateInstance.isTemplate());
        }
        else {
            appTemplateInstance.done({
                ":status": 403,
                "content-type": "text/plain"
            }, "FORBIDDEN", "notfound.html", false);
        }
    }
    done(headers, body, templateURI = "", isTemplate = false) { }
}
exports.FileDispatcher = FileDispatcher;
(() => {
    "use strict";
    const absolutePath = path_1.default.resolve(__dirname, "./");
    (0, qcobjects_1.Package)("org.quickcorp.qcobjects.main.file", [
        FileDispatcher
    ]);
    exports = {
        FileDispatcher
    };
})();
//# sourceMappingURL=main-file.js.map