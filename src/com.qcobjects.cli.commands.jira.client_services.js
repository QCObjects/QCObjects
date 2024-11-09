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
Package("com.qcobjects.cli.commands.jira.client_services", [
    /** @class */ (function (_super) {
        __extends(JiraCloud, _super);
        function JiraCloud(_a) {
            var _b = _a.name, name = _b === void 0 ? "jira_cloud" : _b, _c = _a.external, external = _c === void 0 ? true : _c, _d = _a.useHTTP2, useHTTP2 = _d === void 0 ? true : _d, _e = _a.cached, cached = _e === void 0 ? false : _e, _f = _a.method, method = _f === void 0 ? "POST" : _f, _g = _a.headers, headers = _g === void 0 ? {
                "accept": "application/json",
                "content-type": "application/json"
            } : _g, _h = _a.basePath, basePath = _h === void 0 ? "" : _h, _j = _a.url, url = _j === void 0 ? "" : _j, _k = _a.withCredentials, withCredentials = _k === void 0 ? false : _k;
            var _this = _super.apply(this, arguments) || this;
            var o = _this;
            _this.domain = "".concat(o.domain);
            _this.basePath = "https://".concat(_this.domain, "/");
            _this.username_password = "".concat(o.username, ":").concat(o.password);
            _this.headers["authorization"] = "Basic ".concat(Buffer.from(_this.username_password).toString("base64"));
            _this.url = _this.basePath + o.apiMethod;
            _this.data = o.data;
            return _this;
        }
        JiraCloud.prototype.done = function (service, standardResponse) {
            // service loaded
            logger.debug(standardResponse);
        };
        JiraCloud.prototype.fail = function (e) {
            logger.debug(e);
        };
        return JiraCloud;
    }(Service))
]);
