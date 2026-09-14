"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setBasePath = exports._basePath_ = void 0;
const platform_1 = require("./platform");
exports._basePath_ = (function () {
    let _basePath = "";
    if (platform_1.isBrowser) {
        const baseURI = document.baseURI.split("?")[0].split("/");
        baseURI.pop();
        _basePath = baseURI.join("/") + "/";
    }
    else {
        try {
            // eslint-disable-next-line @typescript-eslint/no-require-imports
            const nodeProcess = require("node:process");
            if (typeof nodeProcess !== "undefined") {
                _basePath = `${(nodeProcess).cwd()}/`;
            }
            else {
                _basePath = "";
            }
        }
        catch {
            _basePath = "";
        }
    }
    return _basePath;
})();
const setBasePath = (value) => { exports._basePath_ = value; };
exports.setBasePath = setBasePath;
