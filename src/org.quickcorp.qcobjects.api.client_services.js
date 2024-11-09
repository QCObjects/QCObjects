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
Package("org.quickcorp.qcobjects.api.client_services", [
    /** @class */ (function (_super) {
        __extends(QuickCorpCloud, _super);
        function QuickCorpCloud(_a) {
            var _b = _a.name, name = _b === void 0 ? "quickcorp_cloud" : _b, _c = _a.external, external = _c === void 0 ? true : _c, _d = _a.useHTTP2, useHTTP2 = _d === void 0 ? true : _d, _e = _a.cached, cached = _e === void 0 ? false : _e, _f = _a.method, method = _f === void 0 ? "post" : _f, _g = _a.headers, headers = _g === void 0 ? {
                "origin": "localhost",
                "content-type": "application/json"
            } : _g, _h = _a.basePath, basePath = _h === void 0 ? "https://cloud.quickcorp.org/" : _h, _j = _a.url, url = _j === void 0 ? "" : _j, _k = _a.withCredentials, withCredentials = _k === void 0 ? false : _k;
            return _super.apply(this, arguments) || this;
        }
        QuickCorpCloud.prototype._new_ = function (o) {
            // service instantiated
            this.headers["authorization"] = "Basic token";
            this.url = this.basePath + o.apiMethod;
            this.data = o.data;
        };
        QuickCorpCloud.prototype.done = function (service, standardResponse) {
            // service loaded
            logger.debug(standardResponse);
        };
        QuickCorpCloud.prototype.fail = function (e) {
            logger.debug(e);
        };
        return QuickCorpCloud;
    }(Service))
]);
