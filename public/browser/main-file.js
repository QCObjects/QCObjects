"use strict";
var global = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __export = (target, all) => {
    for (var name in all)
      __defProp(target, name, { get: all[name], enumerable: true });
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));
  var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
  var main_file_exports = {};
  __export(main_file_exports, {
    FileDispatcher: () => FileDispatcher
  });
  var import_path = __toESM(require("path"));
  var import_fs = __toESM(require("fs"));
  var import_mime = __toESM(require("mime"));
  var import_qcobjects = require("qcobjects");
  class FileDispatcher extends import_qcobjects.InheritClass {
    static {
      __name(this, "FileDispatcher");
    }
    scriptname;
    filename;
    pathname;
    headers;
    templateURI;
    template;
    body;
    constructor({
      name = import_qcobjects.CONFIG.get("documentRootFileIndex"),
      template = "",
      templateURI = import_qcobjects.CONFIG.get("documentRootFileIndex"),
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
      appTemplateInstance.templateURI = import_qcobjects.CONFIG.get("documentRoot") + pathname + scriptname;
      appTemplateInstance.templateURI = appTemplateInstance.templateURI.replace("//", "/");
      if (appTemplateInstance.isTemplate()) {
        import_fs.default.readFile(appTemplateInstance.templateURI, function(err, data) {
          import_qcobjects.logger.debug("reading data from " + appTemplateInstance.templateURI);
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
            import_qcobjects.logger.debug("file not found");
          }
        });
      } else {
        appTemplateInstance.headers[":status"] = 200;
        appTemplateInstance.headers["content-type"] = import_mime.default.getType(appTemplateInstance.templateURI);
        appTemplateInstance.done(
          appTemplateInstance.headers,
          "",
          appTemplateInstance.templateURI,
          false
        );
      }
      import_qcobjects.logger.info("FileDispatcher initialized");
    }
    file_extension() {
      return this.filename.substr(this.filename.indexOf("."));
    }
    isTemplate() {
      return import_qcobjects.CONFIG.get("useTemplate") && (this.file_extension() == ".html" || this.file_extension() == ".tpl.html");
    }
    _done() {
      var appTemplateInstance = this;
      const source = appTemplateInstance.template;
      if (appTemplateInstance.isTemplate()) {
        (0, import_qcobjects.New)(import_qcobjects.Component, {
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
        appTemplateInstance.headers["content-type"] = import_mime.default.getType(appTemplateInstance.templateURI);
        appTemplateInstance.headers["cache-control"] = import_qcobjects.CONFIG.get("cacheControl", "max-age=31536000");
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
  (() => {
    "use strict";
    const absolutePath = import_path.default.resolve(__dirname, "./");
    (0, import_qcobjects.Package)("org.quickcorp.qcobjects.main.file", [
      FileDispatcher
    ]);
    exports = {
      FileDispatcher
    };
  })();
  return __toCommonJS(main_file_exports);
})();
//# sourceMappingURL=main-file.js.map
