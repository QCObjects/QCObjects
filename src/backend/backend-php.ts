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
import { PipeLog } from "../common-pipelog";

(async () => {
  const fs = await import("node:fs");
  const os = await import("node:os");
  const { exec, execSync } = await import("node:child_process");
    // MY_ENV_VAR="HELLO WORLD" php -f index.php

  const { Package, BackendMicroservice, logger, CONFIG, Class } = await import("qcobjects");
  const path = await import("node:path");
  const absolutePath = path.resolve(__dirname, "./");

  const fixWinCmd = function (commandline: string) {
    if (!process.platform.toLowerCase().startsWith("win")) {
      commandline = commandline.replace(/(")/g, String.fromCharCode(92) + "\"");
    }
    return commandline;
  };


  class PHPMicroservice extends BackendMicroservice {
    request: any;
    stream: any;
    scriptFilePath: any;
    domain: any;
    tempFileName!: string;
    route: any;
    body: any;
    headers:any;
    constructor() {
      super();
      const o = this;

      logger.debug("PHP Microservice executing");
      const microservice = this;
      const request = microservice.request;
      const stream = o.stream;
      microservice.stream = stream;
      stream.on("data", (data: any) => {
        // data from POST, GET
        const requestMethod = request.method.toLowerCase();
        const supportedMethods: any = {
          "post": microservice.post.bind(this),
        };
        if (supportedMethods.hasOwnProperty.call(supportedMethods, requestMethod)) {
          supportedMethods[requestMethod].call(microservice, data);
        }
      });

      // data from POST, GET
      const requestMethod = request.method.toLowerCase();
      const supportedMethods: any = {
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
      const phpheaders: any = {
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

      function fixedEncodeURIComponent(str: string | number | boolean) {
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

      return PipeLog.pipe(phpheaders);
    }

    saveTempData(data: any, done: { (): void; (): void; call?: any; }) {
      const filename = os.tmpdir() + this.tempFileName;
      fs.writeFile(filename, data, (err: any) => {
        if (err) throw err;
        logger.debug("A temp data file has been saved!");
        done.call(this);
      });
    }

    generateTempFileName() {
      this.tempFileName = "temp" + Date.now().toString();
      return this.tempFileName;
    }

    trimSlash(pathname: string) {
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
          process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
        } catch (e) { }

        const scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
          microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
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
          const php = exec(commandline, (err: any, stdout: any, stderr: any) => {
            microservice.body = stdout;
            console.log(stderr);
            microservice.done();
          });
        } catch (ex: any) {
          microservice.body = "500 - INTERNAL ERROR";
          logger.debug(ex.toString());
          console.log(ex);
          microservice.done();
        }

      });

    }

    head(formData: any) {
      this.done();
    }

    post(formData: any) {
      logger.debug("POST DATA");
      const microservice = this;
      microservice.generateTempFileName();

      microservice.saveTempData(formData, function () {
        try {
          process.chdir(CONFIG.get("documentRoot") + microservice.request.pathname.slice(1));
        } catch (e) { }

        const scriptFileName = (microservice.route.hasOwnProperty.call(microservice.route, "redirect_to") &&
          microservice.route.redirect_to !== "") ? (microservice.route.redirect_to) : (microservice.request.scriptname);
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
        //        logger.debug(commandline);

        try {
          microservice.body = execSync(commandline).toString();
        } catch (ex: any) {
          microservice.body = "500 - INTERNAL ERROR";
          logger.debug(ex.toString());
        }
        microservice.done();

      });

    }

    put(formData: any) {
      this.done();
    }

    delete(formData: any) {
      this.done();
    }

    connect(formData: any) {
      this.done();
    }

    options(formData: any) {
      this.done();
    }

    trace(formData: any) {
      this.done();
    }

    patch(formData: any) {
      this.done();
    }

    done() {
      const microservice = this;
      const stream = microservice.stream;
      try {
        stream.respond(microservice.headers);
      } catch (e) {
        //
      }
      if (microservice.body != null) {
        microservice.finishWithBody.call(microservice, stream);
      }
    }

    finishWithBody(stream: { write: (arg0: any) => void; end: () => void; }) {
      try {
        stream.write(this.body);
        stream.end();
      } catch (e: any) {
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
})()
.catch(e => {console.error(e);});