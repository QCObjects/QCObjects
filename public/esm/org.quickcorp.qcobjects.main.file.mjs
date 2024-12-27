var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_org_quickcorp_qcobjects_main_file = __commonJS({
  "src/org.quickcorp.qcobjects.main.file.ts"(exports) {
    (() => {
      "use strict";
      const path = require("path");
      const fs = require("fs");
      const mime = require("mime");
      const { InheritClass, CONFIG, logger, New, Component, Package } = require("qcobjects");
      const absolutePath = path.resolve(__dirname, "./");
      class FileDispatcher extends InheritClass {
        static {
          __name(this, "FileDispatcher");
        }
        constructor({
          name = CONFIG.get("documentRootFileIndex"),
          template = "",
          templateURI = CONFIG.get("documentRootFileIndex"),
          headers = {},
          body = "",
          filename = "",
          done
        }) {
          super({
            name,
            template,
            templateURI,
            headers,
            body,
            filename,
            done
          });
          var o = this;
          var scriptname = o.scriptname;
          this.filename = scriptname;
          var pathname = o.pathname !== "" ? o.pathname + "/" : "";
          var appTemplateInstance = this;
          if (typeof appTemplateInstance.headers === "undefined") {
            appTemplateInstance.headers = {
              ":status": 500,
              "content-type": "text/html"
            };
          }
          appTemplateInstance.done = o.done.bind(appTemplateInstance);
          appTemplateInstance.templateURI = CONFIG.get("documentRoot") + pathname + scriptname;
          appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace("//", "/");
          if (appTemplateInstance.isTemplate()) {
            fs.readFile(appTemplateInstance.templateURI, function(err, data) {
              logger.debug("reading data from " + appTemplateInstance.templateURI);
              if (typeof data !== "undefined") {
                appTemplateInstance.template = data.toString();
                appTemplateInstance._done();
              } else {
                appTemplateInstance.headers = {
                  ":status": 404,
                  "content-type": "text/html"
                };
                appTemplateInstance.done(
                  appTemplateInstance.headers,
                  "FILE NOT FOUND",
                  "notfound.html",
                  false
                );
                logger.debug("file not found");
              }
            });
          } else {
            appTemplateInstance.headers[":status"] = 200;
            appTemplateInstance.headers["content-type"] = mime.getType(appTemplateInstance.templateURI);
            appTemplateInstance.done(
              appTemplateInstance.headers,
              "",
              appTemplateInstance.templateURI,
              false
            );
          }
          logger.info("FileDispatcher initialized");
        }
        file_extension() {
          return this.filename.substr(this.filename.indexOf("."));
        }
        isTemplate() {
          return CONFIG.get("useTemplate") && (this.file_extension() == ".html" || this.file_extension() == ".tpl.html");
        }
        _done() {
          var appTemplateInstance = this;
          const source = appTemplateInstance.template;
          if (appTemplateInstance.isTemplate()) {
            New(Component, {
              name: "static_source",
              template: source,
              cached: false,
              tplsource: "inline",
              data: {
                title: "QCObjects"
              },
              done({
                request,
                component
              }) {
                appTemplateInstance.body = component.parsedAssignmentText;
                return Promise.resolve({
                  request,
                  component
                });
              }
            });
          } else {
            appTemplateInstance.body = source;
          }
          if ([
            ".png",
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
            appTemplateInstance.done(
              appTemplateInstance.headers,
              appTemplateInstance.body,
              appTemplateInstance.templateURI,
              appTemplateInstance.isTemplate()
            );
          } else {
            appTemplateInstance.done(
              {
                ":status": 403,
                "content-type": "text/plain"
              },
              "FORBIDDEN",
              "notfound.html",
              false
            );
          }
        }
        done(headers, body, templateURI = "", isTemplate = false) {
        }
      }
      Package("org.quickcorp.qcobjects.main.file", [
        FileDispatcher
      ]);
      exports = {
        FileDispatcher
      };
    })();
  }
});
export default require_org_quickcorp_qcobjects_main_file();
//# sourceMappingURL=org.quickcorp.qcobjects.main.file.mjs.map
