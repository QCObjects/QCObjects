#!/usr/bin/env node
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
var absolutePath = path.resolve(__dirname, "./");
var templatePath = path.resolve(__dirname, "./templates/apps/") + "/";
var os = require("os");
var isWindows = function () {
    return os.platform().toLowerCase().startsWith("win");
};
var isMac = function () {
    return os.platform().toLowerCase().startsWith("darwin");
};
require("qcobjects");
require(absolutePath + "/org.quickcorp.qcobjects.defaultsettings.js");
var execSync = require("child_process").execSync;
var Main = /** @class */ (function (_super) {
    __extends(Main, _super);
    function Main() {
        var _this = _super.apply(this, arguments) || this;
        _this.start();
        return _this;
    }
    Main.prototype.start = function () {
        var certificate_provider = CONFIG.get("certificate_provider", "self_signed");
        var stdout;
        switch (certificate_provider) {
            case "self_signed":
                // stderr is sent to stderr of parent process
                // you can set options.stdio if you want it to go elsewhere
                if (isWindows()) {
                    stdout = execSync("openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj \"/CN=" + CONFIG.get("domain") + "\"  -keyout " + CONFIG.get("private-key-pem") + " -out " + CONFIG.get("private-cert-pem"));
                }
                else {
                    stdout = execSync("openssl req -x509 -newkey rsa:2048 -nodes -sha256 -subj '/CN=" + CONFIG.get("domain") + "'  -keyout " + CONFIG.get("private-key-pem") + " -out " + CONFIG.get("private-cert-pem"));
                }
                break;
            case "letsencrypt":
                if (isWindows()) {
                    throw Error("Letsencrypt certificate is not supported in Windows");
                }
                else {
                    var prehook_posthook = "--pre-hook \"service qcobjects stop\" --post-hook=\"service qcobjects start\"";
                    stdout = execSync("certbot -n -d ".concat(CONFIG.get("domain"), " certonly --standalone ").concat(prehook_posthook));
                }
                break;
            default:
                break;
        }
    };
    return Main;
}(InheritClass));
var __main__ = new Main();
