"use strict";
var global = (() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
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
  var require_backend_php = __commonJS({
    "src/backend/backend-php.ts"(exports) {
      var import_common_pipelog = require("../common-pipelog");
      var import_fs = __toESM(require("fs"));
      var import_os = __toESM(require("os"));
      var import_child_process = require("child_process");
      var import_node_path = __toESM(require("node:path"));
      var import_qcobjects = require("qcobjects");
      const absolutePath = import_node_path.default.resolve(__dirname, "./");
      const fixWinCmd = /* @__PURE__ */ __name(function(commandline) {
        if (!process.platform.toLowerCase().startsWith("win")) {
          commandline = commandline.replace(/(")/g, String.fromCharCode(92) + '"');
        }
        return commandline;
      }, "fixWinCmd");
      class PHPMicroservice extends import_qcobjects.BackendMicroservice {
        static {
          __name(this, "PHPMicroservice");
        }
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
          import_qcobjects.logger.debug("PHP Microservice executing");
          const microservice = this;
          const request = microservice.request;
          const stream = o.stream;
          microservice.stream = stream;
          stream.on("data", (data) => {
            const requestMethod2 = request.method.toLowerCase();
            const supportedMethods2 = {
              "post": microservice.post.bind(this)
            };
            if (supportedMethods2.hasOwnProperty.call(supportedMethods2, requestMethod2)) {
              supportedMethods2[requestMethod2].call(microservice, data);
            }
          });
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
          __name(fixedEncodeURIComponent, "fixedEncodeURIComponent");
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
          return import_common_pipelog.PipeLog.pipe(phpheaders);
        }
        saveTempData(data, done) {
          const filename = import_os.default.tmpdir() + this.tempFileName;
          import_fs.default.writeFile(filename, data, (err) => {
            if (err) throw err;
            import_qcobjects.logger.debug("A temp data file has been saved!");
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
          microservice.saveTempData(this.request.query, function() {
            try {
              process.chdir(import_qcobjects.CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            } catch (e) {
            }
            const scriptFileName = microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") && microservice.route.redirect_to !== "" ? microservice.route.redirect_to : microservice.request.scriptname;
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = import_qcobjects.CONFIG.get("documentRoot", "");
            if (documentRoot == "./") {
              documentRoot = "";
            }
            let scriptFilePath;
            if (documentRoot !== "") {
              scriptFilePath = `${documentRoot}/${pathname}/${scriptFileName}`;
            } else {
              scriptFilePath = `${pathname}/${scriptFileName}`;
            }
            scriptFilePath = scriptFilePath.replace("//", "/");
            if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
              scriptFilePath = scriptFilePath.slice(1);
            }
            import_qcobjects.logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${import_qcobjects.CONFIG.get("documentRoot")}:${import_qcobjects.CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${import_os.default.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
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
            import_qcobjects.logger.debug(commandline);
            try {
              const php = (0, import_child_process.exec)(commandline, (err, stdout, stderr) => {
                microservice.body = stdout;
                console.log(stderr);
                microservice.done();
              });
            } catch (ex) {
              microservice.body = "500 - INTERNAL ERROR";
              import_qcobjects.logger.debug(ex.toString());
              console.log(ex);
              microservice.done();
            }
          });
        }
        head(formData) {
          this.done();
        }
        post(formData) {
          import_qcobjects.logger.debug("POST DATA");
          const microservice = this;
          microservice.generateTempFileName();
          microservice.saveTempData(formData, function() {
            try {
              process.chdir(import_qcobjects.CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            } catch (e) {
            }
            const scriptFileName = microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") && microservice.route.redirect_to !== "" ? microservice.route.redirect_to : microservice.request.scriptname;
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = import_qcobjects.CONFIG.get("documentRoot", "");
            if (documentRoot == "./") {
              documentRoot = "";
            }
            let scriptFilePath;
            if (documentRoot !== "") {
              scriptFilePath = `${documentRoot}/${pathname}/${scriptFileName}`;
            } else {
              scriptFilePath = `${pathname}/${scriptFileName}`;
            }
            scriptFilePath = scriptFilePath.replace("//", "/");
            if (scriptFilePath.startsWith("/") && !documentRoot.startsWith("/")) {
              scriptFilePath = scriptFilePath.slice(1);
            }
            import_qcobjects.logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${import_qcobjects.CONFIG.get("documentRoot")}:${import_qcobjects.CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${import_os.default.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
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
            try {
              microservice.body = (0, import_child_process.execSync)(commandline).toString();
            } catch (ex) {
              microservice.body = "500 - INTERNAL ERROR";
              import_qcobjects.logger.debug(ex.toString());
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
          } catch (e) {
          }
          if (microservice.body != null) {
            microservice.finishWithBody.call(microservice, stream);
          }
        }
        finishWithBody(stream) {
          try {
            stream.write(this.body);
            stream.end();
          } catch (e) {
            import_qcobjects.logger.debug("Something wrong writing the response for microservice" + e.toString());
          }
        }
      }
      const Microservice = (0, import_qcobjects.Class)("Microservice", PHPMicroservice);
      (0, import_qcobjects.Package)("org.quickcorp.backend.php", [
        PHPMicroservice,
        Microservice
      ]);
      exports = {
        PHPMicroservice,
        Microservice
      };
    }
  });
  return require_backend_php();
})();
//# sourceMappingURL=backend-php.js.map
