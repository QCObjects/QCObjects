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
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommandHandler = void 0;
const node_path_1 = __importDefault(require("node:path"));
const node_fs_1 = require("node:fs");
const promises_1 = __importDefault(require("node:fs/promises"));
const glob_1 = __importDefault(require("glob"));
const esbuild_1 = __importDefault(require("esbuild"));
const esbuild_plugin_alias_1 = __importDefault(require("esbuild-plugin-alias"));
const qcobjects_1 = require("qcobjects");
const externalPackages = [
    "node:fs", "node:path", "node:os", "node:util", "node:events",
    "node:stream", "node:http", "node:https", "node:crypto", "node:zlib",
    "node:buffer", "node:url", "node:querystring", "node:child_process",
    "node:cluster", "node:dgram", "node:dns", "node:net", "node:readline",
    "node:repl", "node:tls", "node:tty", "node:vm", "node:worker_threads"
];
// Function to detect and add the extension
const nameToExtension = (name, ext, settings) => {
    function isPackage(name) {
        return !name.startsWith(".") && !name.startsWith("/") && !name.includes("/");
    }
    const hasExtension = /\.[^/\\]+$/.test(name);
    const isExternalPackage = name.startsWith("qcobjects") ||
        name.startsWith("qcobjects-sdk") ||
        name.startsWith("node:") ||
        name.startsWith("fs") ||
        name.startsWith("path") ||
        name.startsWith("os") ||
        name.startsWith("util") ||
        name.startsWith("events") ||
        name.startsWith("stream") ||
        name.startsWith("http") ||
        name.startsWith("https") ||
        name.startsWith("crypto") ||
        name.startsWith("zlib") ||
        name.startsWith("buffer") ||
        name.startsWith("url") ||
        name.startsWith("querystring") ||
        name.startsWith("child_process") ||
        name.startsWith("cluster") ||
        name.startsWith("dgram") ||
        name.startsWith("dns") ||
        name.startsWith("net") ||
        name.startsWith("readline") ||
        name.startsWith("repl") ||
        name.startsWith("tls") ||
        name.startsWith("tty") ||
        name.startsWith("vm") ||
        name.startsWith("worker_threads")
        || externalPackages.includes(name);
    if (!hasExtension && !isPackage(name) && !isExternalPackage) {
        name += ext;
    }
    return name;
};
// Function to add .cjs and .mjs extensions to import/export/require statements
const addExtensions = (filePath, toExt, settings) => {
    const content = (0, node_fs_1.readFileSync)(filePath, "utf8");
    const updatedContent = content
        .replace(/(from\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
        return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
    })
        .replace(/(import\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
        return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
    })
        .replace(/(export\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
        return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
    })
        .replace(/(require\s*\(\s*['"])(.*?)(['"]\s*\))/g, (match, p1, p2, p3) => {
        return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
    });
    (0, node_fs_1.writeFileSync)(filePath, updatedContent, "utf8");
};
const copyDir = async (source, dest, exclude) => {
    source = node_path_1.default.resolve(source);
    dest = node_path_1.default.resolve(dest);
    const dname = node_path_1.default.basename(source);
    const dirExcluded = exclude.includes(dname);
    const isDir = async (d) => {
        try {
            const stat = await promises_1.default.stat(d);
            return stat.isDirectory();
        }
        catch {
            return false;
        }
    };
    const isFile = async (d) => {
        try {
            const stat = await promises_1.default.stat(d);
            return stat.isFile();
        }
        catch {
            return false;
        }
    };
    if (await isDir(source) && !dirExcluded) {
        await promises_1.default.mkdir(dest, { recursive: true });
        const paths = await promises_1.default.readdir(source, { withFileTypes: true });
        const dirs = paths.filter(d => d.isDirectory());
        const files = paths.filter(f => f.isFile());
        for (const f of files) {
            const sourceFile = node_path_1.default.resolve(source, f.name);
            const destFile = node_path_1.default.resolve(dest, f.name);
            const fileExcluded = exclude.includes(f.name);
            if (await isFile(sourceFile) && !fileExcluded) {
                qcobjects_1.logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
                await promises_1.default.copyFile(sourceFile, destFile);
                qcobjects_1.logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
            }
        }
        for (const d of dirs) {
            const sourceDir = node_path_1.default.resolve(source, d.name);
            const destDir = node_path_1.default.resolve(dest, d.name);
            await copyDir(sourceDir, destDir, exclude);
        }
    }
};
const ignorePlugin = {
    name: "transform-qcobjects-imports",
    setup(build) {
        build.onResolve({ filter: /^(qcobjects|qcobjects-sdk)$/ }, (args) => {
            if (args.kind === "dynamic-import") {
                return {
                    path: args.path,
                    namespace: "qcobjects-transform"
                };
            }
            return {
                external: true,
                path: args.path
            };
        });
        build.onResolve({ filter: /.*/, namespace: "file" }, (args) => {
            if (args.kind === "dynamic-import") {
                return {
                    external: true,
                    path: args.path
                };
            }
            return null;
        });
        build.onLoad({ filter: /.*/, namespace: "qcobjects-transform" }, (args) => {
            return {
                contents: `
          module.exports = __toESM(require("${args.path}"), true);
        `,
                loader: "js"
            };
        });
    }
};
class CommandHandler extends qcobjects_1.InheritClass {
    choiceOption;
    constructor({ switchCommander }) {
        super({ switchCommander });
        this.choiceOption = {
            async build_esbuild() {
                try {
                    qcobjects_1.logger.info("[build:esbuild] Starting esbuild process...");
                    // Get all TypeScript entry points
                    const entryPoints = glob_1.default.sync("src/**/*.ts");
                    // Copy templates
                    await copyDir("./src/templates", "./build/templates", []);
                    await copyDir("./src/templates", "./public/cjs/templates", []);
                    await copyDir("./src/templates", "./public/esm/templates", []);
                    await copyDir("./src/templates", "./public/browser/templates", []);
                    const baseSettings = {
                        entryPoints,
                        bundle: false,
                        outdir: "public/cjs",
                        format: "cjs",
                        target: ["node22"],
                        tsconfig: "tsconfig.json",
                        globalName: "global",
                        minify: false,
                        keepNames: true,
                        sourcemap: true,
                        splitting: false,
                        chunkNames: "chunks/[name]-[hash]",
                        plugins: [
                            ignorePlugin,
                            (0, esbuild_plugin_alias_1.default)({
                                "types": node_path_1.default.join(process.cwd(), "src/types/global/index.d.ts")
                            })
                        ]
                    };
                    const cjsSettings = {
                        ...baseSettings,
                        outdir: "public/cjs",
                        format: "cjs",
                        platform: "node",
                        outExtension: {
                            ".js": ".cjs"
                        },
                        plugins: [
                            ignorePlugin,
                            {
                                name: "transform-dynamic-imports",
                                setup(build) {
                                    build.onEnd(() => {
                                        const files = glob_1.default.sync("public/cjs/**/*.cjs");
                                        for (const file of files) {
                                            let content = (0, node_fs_1.readFileSync)(file, "utf8");
                                            content = content.replace(/await\s+import\(['"]([^'"]+)['"]\)/g, "__toESM(require(\"$1\"), true)");
                                            (0, node_fs_1.writeFileSync)(file, content, "utf8");
                                        }
                                    });
                                }
                            },
                            {
                                name: "add-extensions",
                                setup(build) {
                                    build.onEnd(() => {
                                        entryPoints.forEach((entry) => {
                                            const outputFilePath = node_path_1.default.join("./public/cjs", entry.replace("src/", "").replace(".ts", ".cjs"));
                                            addExtensions(outputFilePath, ".cjs", cjsSettings);
                                        });
                                    });
                                }
                            }
                        ]
                    };
                    const esmSettings = {
                        ...baseSettings,
                        outdir: "public/esm",
                        format: "esm",
                        platform: "browser",
                        outExtension: {
                            ".js": ".mjs"
                        },
                        plugins: [
                            {
                                name: "transform-requires",
                                setup(build) {
                                    build.onEnd(() => {
                                        const files = glob_1.default.sync("public/esm/**/*.mjs");
                                        for (const file of files) {
                                            let content = (0, node_fs_1.readFileSync)(file, "utf8");
                                            // Transform require statements to dynamic imports
                                            content = content.replace(/const\s+{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\)/g, "import { $1 } from \"$2\"");
                                            content = content.replace(/const\s+([^=]+)\s*=\s*require\(['"]([^'"]+)['"]\)/g, "import $1 from \"$2\"");
                                            (0, node_fs_1.writeFileSync)(file, content, "utf8");
                                        }
                                    });
                                }
                            },
                            {
                                name: "add-extensions",
                                setup(build) {
                                    build.onEnd(() => {
                                        entryPoints.forEach((entry) => {
                                            const outputFilePath = node_path_1.default.join("./public/esm", entry.replace("src/", "").replace(".ts", ".mjs"));
                                            addExtensions(outputFilePath, ".mjs", esmSettings);
                                        });
                                    });
                                }
                            }
                        ]
                    };
                    const browserSettings = {
                        ...baseSettings,
                        outdir: "public/browser",
                        format: "iife",
                        platform: "browser",
                        outExtension: {
                            ".js": ".js"
                        }
                    };
                    // Build all formats
                    await Promise.all([
                        esbuild_1.default.build(cjsSettings),
                        esbuild_1.default.build(esmSettings),
                        esbuild_1.default.build(browserSettings)
                    ]);
                    qcobjects_1.logger.info("[build:esbuild] Build process completed successfully!");
                }
                catch (e) {
                    qcobjects_1.logger.error(`[build:esbuild] Build process failed: ${e.message}`);
                    process.exit(1);
                }
            }
        };
        const commandHandler = this;
        qcobjects_1.logger.debug("Loading command build:esbuild...");
        // Register both commands
        switchCommander.program.command("build:esbuild")
            .allowExcessArguments(false)
            .description("Builds the project using esbuild for CJS, ESM, and browser formats")
            .action(function () {
            commandHandler.choiceOption.build_esbuild.call(commandHandler);
        });
        // Add alias
        switchCommander.program.command("build:esb")
            .allowExcessArguments(false)
            .description("Alias for build:esbuild - Builds the project using esbuild")
            .action(function () {
            commandHandler.choiceOption.build_esbuild.call(commandHandler);
        });
        qcobjects_1.logger.debug("Loading command build:esbuild... DONE.");
    }
}
exports.CommandHandler = CommandHandler;
(0, qcobjects_1.Package)("com.qcobjects.cli.commands.build.esbuild", [
    CommandHandler
]);
//# sourceMappingURL=cli-commands-build-esbuild.js.map