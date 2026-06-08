#!/usr/bin/env node
"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
require("./defaultsettings");
const main_http_server_1 = require("./main-http-server");
const main_http2_server_1 = require("./main-http2-server");
const qcobjects_1 = require("qcobjects");
(async () => {
    "use strict";
    const path = await import("path");
    const absolutePath = path.resolve(__dirname, "./");
    class Main extends qcobjects_1.InheritClass {
        constructor() {
            super();
            const _ServerClass_ = (qcobjects_1.CONFIG.get("useLegacyHTTP", false)) ? (main_http_server_1.HTTPServer) : (main_http2_server_1.HTTP2Server);
            const app = (0, qcobjects_1.New)(_ServerClass_);
            app.start();
            qcobjects_1.logger.debug("initialized");
        }
    }
    const __main__ = new Main();
})()
    .catch(e => console.error(e));
//# sourceMappingURL=qcobjects-http2-server.js.map