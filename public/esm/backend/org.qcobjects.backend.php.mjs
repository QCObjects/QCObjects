var __defProp = Object.defineProperty;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var require_org_qcobjects_backend_php = __commonJS({
  "src/backend/org.qcobjects.backend.php.ts"(exports) {
    (async () => {
      "use strict";
      const fs = await import("node:fs");
      const os = await import("node:os");
      const { exec, execSync } = await import("node:child_process");
      const { Package, BackendMicroservice, logger, CONFIG, Class } = await import("qcobjects");
      const path = await import("node:path");
      const absolutePath = path.resolve(__dirname, "./");
      const { PipeLog } = await import(absolutePath + "/org.qcobjects.common.pipelog.js");
      const fixWinCmd = /* @__PURE__ */ __name(function(commandline) {
        if (!process.platform.toLowerCase().startsWith("win")) {
          commandline = commandline.replace(/(")/g, String.fromCharCode(92) + '"');
        }
        return commandline;
      }, "fixWinCmd");
      class PHPMicroservice extends BackendMicroservice {
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
          logger.debug("PHP Microservice executing");
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
          return PipeLog.pipe(phpheaders);
        }
        saveTempData(data, done) {
          const filename = os.tmpdir() + this.tempFileName;
          fs.writeFile(filename, data, (err) => {
            if (err) throw err;
            logger.debug("A temp data file has been saved!");
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
              process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            } catch (e) {
            }
            const scriptFileName = microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") && microservice.route.redirect_to !== "" ? microservice.route.redirect_to : microservice.request.scriptname;
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = CONFIG.get("documentRoot", "");
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
            logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${CONFIG.get("documentRoot")}:${CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${os.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
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
            logger.debug(commandline);
            try {
              const php = exec(commandline, (err, stdout, stderr) => {
                microservice.body = stdout;
                console.log(stderr);
                microservice.done();
              });
            } catch (ex) {
              microservice.body = "500 - INTERNAL ERROR";
              logger.debug(ex.toString());
              console.log(ex);
              microservice.done();
            }
          });
        }
        head(formData) {
          this.done();
        }
        post(formData) {
          logger.debug("POST DATA");
          const microservice = this;
          microservice.generateTempFileName();
          microservice.saveTempData(formData, function() {
            try {
              process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
            } catch (e) {
            }
            const scriptFileName = microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") && microservice.route.redirect_to !== "" ? microservice.route.redirect_to : microservice.request.scriptname;
            const pathname = microservice.trimSlash(microservice.request.pathname);
            let documentRoot = CONFIG.get("documentRoot", "");
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
            logger.debug(`Loading PHP file: ${scriptFilePath}`);
            const PHPIncludePath = `.:${CONFIG.get("documentRoot")}:${CONFIG.get("projectPath")}`;
            microservice.scriptFilePath = scriptFilePath;
            let commandline = `echo $(cat ${os.tmpdir()}${microservice.tempFileName}) |` + microservice.get_php_headers_list() + ` php -d include_path="${PHPIncludePath}" -q <<- 'EOF'
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
              microservice.body = execSync(commandline).toString();
            } catch (ex) {
              microservice.body = "500 - INTERNAL ERROR";
              logger.debug(ex.toString());
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
            logger.debug("Something wrong writing the response for microservice" + e.toString());
          }
        }
      }
      const Microservice = Class("Microservice", PHPMicroservice);
      Package("org.quickcorp.backend.php", [
        PHPMicroservice,
        Microservice
      ]);
      exports = {
        PHPMicroservice,
        Microservice
      };
    })().catch((e) => {
      console.error(e);
    });
  }
});
export default require_org_qcobjects_backend_php();
//# sourceMappingURL=org.qcobjects.backend.php.mjs.map
