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
/* eslint no-useless-escape: "off" */
"use strict";
import mime from "mime";
import fs from "node:fs";
import path from "node:path";
import { Package, BackendMicroservice, CONFIG, logger } from "qcobjects";

  const absolutePath = path.resolve(__dirname, "./");


  Package("com.qcobjects.backend.microservice.static", [
    class Microservice extends BackendMicroservice {
      stream: any;
      fileName: any;
      route: any;
      request: any;
      body!: void;

      finishWithBody() { }
      done() {
        // read and send file content in the stream

        const microservice = this;
        const stream = microservice.stream;
        const fileName = (!microservice.fileName.startsWith("/")) ? (`${process.cwd()}/${microservice.fileName}`) : (microservice.fileName);

        const sendFileHTTP2 = function (stream: { respondWithFD: (arg0: any, arg1: { "content-length": any; "last-modified": any; "content-type": any; "cache-control": any; }) => void; on: (arg0: string, arg1: { (): void; (): void; }) => void; end: () => void; respond: (arg0: { ":status": number; "content-type": any; }) => void; write: (arg0: string) => void; }, fileName: string) {
          // read and send file content in the stream

          try {
            const fd = fs.openSync(fileName, "r");
            const stat = fs.fstatSync(fd);
            let headers = {
              "content-length": stat.size,
              "last-modified": stat.mtime.toUTCString(),
              "content-type": mime.getType(fileName),
              "cache-control": CONFIG.get("cacheControl", "max-age=31536000")
            };
            if (typeof microservice.route.responseHeaders !== "undefined") {
              headers = Object.assign(headers, microservice.route.responseHeaders);
            }

            stream.respondWithFD(fd, headers);
            stream.on("close", () => {
              logger.debug("closing file " + fileName);
              fs.closeSync(fd);
            });
            stream.end();

          } catch (e: any) {
            logger.warn("[ERROR] Something went wrong when trying to send the response as file " + fileName);
            if (e.errno == -2) {
              const headers = {
                ":status": 404,
                "content-type": mime.getType(fileName)
              };
              stream.respond(headers);
              stream.write("<h1>404 - FILE NOT FOUND</h1>");
              stream.on("close", () => {
                logger.debug("closing file " + fileName);
              });
              stream.end();
            }
          }

        };

        const sendFileLegacyHTTP = function (stream: { writeHead: (arg0: number, arg1: { status: number; "Content-Type": string; }) => void; write: (arg0: string) => void; on: (arg0: string, arg1: { (): void; (): void; }) => void; end: () => void; }, fileName: string) {
          // read and send file content in the stream
          let headers;
          try {
            logger.info("trying to read " + fileName);
            const fd = fs.openSync(fileName, "r");
            const stat = fs.fstatSync(fd);
            headers = {
              "Content-Length": stat.size,
              "Last-Modified": stat.mtime.toUTCString(),
              "Content-Type": mime.getType(fileName),
              "Cache-Control": CONFIG.get("cacheControl", "max-age=31536000")
            };
            if (typeof microservice.route.responseHeaders !== "undefined") {
              headers = Object.assign(headers, microservice.route.responseHeaders);
            }

            logger.debug("closing file " + fileName);
            fs.closeSync(fd);

            stream.writeHead(200, headers);

            stream.write(fs.readFileSync(fileName).toString());
            stream.on("close", () => {
              logger.info("closing static file", fileName);
            });

          } catch (e: any) {
            if (e.errno == -2) {
              headers = {
                "status": 404,
                "Content-Type": "text/html"
              };
              stream.writeHead(404, headers);
              stream.write("<h1>404 - FILE NOT FOUND</h1>");
              stream.on("close", () => {
                logger.info("closing static file with error: ", fileName);
              });
            }
            logger.warn(e);
            stream.end();
          }
          stream.end();

        };

        if (typeof stream.respondWithFD !== "undefined") {
          sendFileHTTP2(stream, fileName);
        } else {
          sendFileLegacyHTTP(stream, fileName);
        }

      }

      static(method: string, data: any) {
        const microservice = this;
        const redirect_to = microservice.route.redirect_to;
        return new Promise<void>(function (resolve, reject) {
          const supported_methods = microservice.route.supported_methods;
          let _method_allowed_ = false;
          if (typeof supported_methods !== "undefined") {
            if (supported_methods == "*" || (typeof method === "undefined") || [...supported_methods].map(m => m.toLowerCase()).indexOf(method.toLowerCase()) !== -1) {
              _method_allowed_ = true;
            }
          } else {
            _method_allowed_ = true;
          }

          logger.debug("Starting static delivery microservice call for method: " + method);
          if (_method_allowed_) {
            logger.info("I'm going to deliver a static path...");
            if (redirect_to) {
              const request_path = microservice.request.path;
              const re = (new RegExp(microservice.route.path.replace(/{(.*?)}/g, "\(\?\<$1\>\.\*\)"), "g"));
              microservice.fileName = request_path.replace(re, microservice.route.redirect_to);
              try {
                resolve();
              } catch (e) {
                logger.warn("\u{1F926} Something went wrong \u{1F926} when trying to deliver a static path: " + microservice.fileName);
                reject(e as Error);
              }
            } else {
              logger.info("There is no redirect_to setting declared in route properties. \n Skipping static delivery...");
              reject(new Error("There is no redirect_to setting declared in route properties. \n Skipping static delivery..."));
            }
          } else {
            logger.debug("Method: " + method + " will be skipped");
            resolve();
          }

        });
      }

      head(formData: any) {
        const microservice = this;
        microservice.static("head", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });
      }

      get(formData: any) {
        const microservice = this;
        microservice.static("get", formData).then(response => {
          microservice.body = response;
          microservice.done();
        }).catch(error => {
          console.error(error);
        });
      }

      post(formData: any) {
        const microservice = this;
        microservice.static("post", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      put(formData: any) {
        const microservice = this;
        microservice.static("put", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      delete(formData: any) {
        const microservice = this;
        microservice.static("delete", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      connect(formData: any) {
        const microservice = this;
        microservice.static("connect", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      options(formData: any) {
        const microservice = this;
        microservice.static("options", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      trace(formData: any) {
        const microservice = this;
        microservice.static("trace", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

      patch(formData: any) {
        const microservice = this;
        microservice.static("patch", formData).then(response => {
          microservice.body = response;
          microservice.done();
        })
          .catch((e: any) => { logger.warn(`An error ocurred: ${e}`); });

      }

    }

  ]);
