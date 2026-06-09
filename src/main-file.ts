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
import path from "path";
import fs from "fs";
import mime from "mime";

import { InheritClass, CONFIG, logger, New, Component, Package } from "qcobjects";

export class FileDispatcher extends InheritClass {
  scriptname: any;
  filename: any;
  pathname!: string;
  headers: any;
  templateURI!: string;
  template: any;
  body: any;
  constructor({
    name = CONFIG.get("documentRootFileIndex"),
    template = "",
    templateURI = CONFIG.get("documentRootFileIndex"),
    headers = {},
    body = "",
    filename = "",
    scriptname,
    pathname,
    done
  }: {
    name: string, template: string, templateURI: string, headers: any, body: string, filename: string,
    scriptname: any, pathname: any,
    done: (headers: any, body: any, templateURI?: string, isTemplate?: boolean) => any
  }) {
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

    scriptname = o.scriptname;
    this.filename = scriptname;
    pathname = (o.pathname !== "") ? (o.pathname + "/") : ("");
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
      fs.readFile(appTemplateInstance.templateURI, function (err: any, data: any) {
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
            "FILE NOT FOUND", "notfound.html", false);
          logger.debug("file not found");
        }
      });
    } else {
      appTemplateInstance.headers[":status"] = 200;
      appTemplateInstance.headers["content-type"] = mime.getType(appTemplateInstance.templateURI);
      appTemplateInstance.done(
        appTemplateInstance.headers,
        "", appTemplateInstance.templateURI, false);
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

      (New(Component, {
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
        }: { request: any, component: any }) {
          appTemplateInstance.body = component.parsedAssignmentText;
          return Promise.resolve({
            request,
            component
          });
        }
      }));

    } else {
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
      appTemplateInstance.done(
        appTemplateInstance.headers,
        appTemplateInstance.body,
        appTemplateInstance.templateURI,
        appTemplateInstance.isTemplate());
    } else {
      appTemplateInstance.done({
        ":status": 403,
        "content-type": "text/plain"
      },
        "FORBIDDEN", "notfound.html", false);
    }
  }
  done(headers: any, body: any, templateURI = "", isTemplate = false) { }

}


( () => {
  "use strict";

  const absolutePath = path.resolve(__dirname, "./");



  Package("org.quickcorp.qcobjects.main.file", [
    FileDispatcher
  ]);

  exports = {
    FileDispatcher
  };
})();