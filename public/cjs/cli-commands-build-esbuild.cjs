"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var cli_commands_build_esbuild_exports = {};
__export(cli_commands_build_esbuild_exports, {
  CommandHandler: () => CommandHandler
});
module.exports = __toCommonJS(cli_commands_build_esbuild_exports);
var import_node_path = __toESM(require("node:path"));
var import_node_fs = require("node:fs");
var import_promises = __toESM(require("node:fs/promises"));
var import_glob = __toESM(require("glob"));
var import_esbuild = __toESM(require("esbuild"));
var import_esbuild_plugin_alias = __toESM(require("esbuild-plugin-alias"));
var import_qcobjects = require("qcobjects");
const externalPackages = [
  "node:fs",
  "node:path",
  "node:os",
  "node:util",
  "node:events",
  "node:stream",
  "node:http",
  "node:https",
  "node:crypto",
  "node:zlib",
  "node:buffer",
  "node:url",
  "node:querystring",
  "node:child_process",
  "node:cluster",
  "node:dgram",
  "node:dns",
  "node:net",
  "node:readline",
  "node:repl",
  "node:tls",
  "node:tty",
  "node:vm",
  "node:worker_threads"
];
const nameToExtension = /* @__PURE__ */ __name((name, ext, settings) => {
  function isPackage(name2) {
    return !name2.startsWith(".") && !name2.startsWith("/") && !name2.includes("/");
  }
  __name(isPackage, "isPackage");
  const hasExtension = /\.[^/\\]+$/.test(name);
  const isExternalPackage = name.startsWith("qcobjects") || name.startsWith("qcobjects-sdk") || name.startsWith("node:") || name.startsWith("fs") || name.startsWith("path") || name.startsWith("os") || name.startsWith("util") || name.startsWith("events") || name.startsWith("stream") || name.startsWith("http") || name.startsWith("https") || name.startsWith("crypto") || name.startsWith("zlib") || name.startsWith("buffer") || name.startsWith("url") || name.startsWith("querystring") || name.startsWith("child_process") || name.startsWith("cluster") || name.startsWith("dgram") || name.startsWith("dns") || name.startsWith("net") || name.startsWith("readline") || name.startsWith("repl") || name.startsWith("tls") || name.startsWith("tty") || name.startsWith("vm") || name.startsWith("worker_threads") || externalPackages.includes(name);
  if (!hasExtension && !isPackage(name) && !isExternalPackage) {
    name += ext;
  }
  return name;
}, "nameToExtension");
const addExtensions = /* @__PURE__ */ __name((filePath, toExt, settings) => {
  const content = (0, import_node_fs.readFileSync)(filePath, "utf8");
  const updatedContent = content.replace(/(from\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(import\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(export\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(require\s*\(\s*['"])(.*?)(['"]\s*\))/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  });
  (0, import_node_fs.writeFileSync)(filePath, updatedContent, "utf8");
}, "addExtensions");
const copyDir = /* @__PURE__ */ __name(async (source, dest, exclude) => {
  source = import_node_path.default.resolve(source);
  dest = import_node_path.default.resolve(dest);
  const dname = import_node_path.default.basename(source);
  const dirExcluded = exclude.includes(dname);
  const isDir = /* @__PURE__ */ __name(async (d) => {
    try {
      const stat = await import_promises.default.stat(d);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }, "isDir");
  const isFile = /* @__PURE__ */ __name(async (d) => {
    try {
      const stat = await import_promises.default.stat(d);
      return stat.isFile();
    } catch {
      return false;
    }
  }, "isFile");
  if (await isDir(source) && !dirExcluded) {
    await import_promises.default.mkdir(dest, { recursive: true });
    const paths = await import_promises.default.readdir(source, { withFileTypes: true });
    const dirs = paths.filter((d) => d.isDirectory());
    const files = paths.filter((f) => f.isFile());
    for (const f of files) {
      const sourceFile = import_node_path.default.resolve(source, f.name);
      const destFile = import_node_path.default.resolve(dest, f.name);
      const fileExcluded = exclude.includes(f.name);
      if (await isFile(sourceFile) && !fileExcluded) {
        import_qcobjects.logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
        await import_promises.default.copyFile(sourceFile, destFile);
        import_qcobjects.logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
      }
    }
    for (const d of dirs) {
      const sourceDir = import_node_path.default.resolve(source, d.name);
      const destDir = import_node_path.default.resolve(dest, d.name);
      await copyDir(sourceDir, destDir, exclude);
    }
  }
}, "copyDir");
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
class CommandHandler extends import_qcobjects.InheritClass {
  static {
    __name(this, "CommandHandler");
  }
  choiceOption;
  constructor({
    switchCommander
  }) {
    super({ switchCommander });
    this.choiceOption = {
      async build_esbuild() {
        try {
          import_qcobjects.logger.info("[build:esbuild] Starting esbuild process...");
          const entryPoints = import_glob.default.sync("src/**/*.ts");
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
              (0, import_esbuild_plugin_alias.default)({
                "types": import_node_path.default.join(process.cwd(), "src/types/global/index.d.ts")
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
                    const files = import_glob.default.sync("public/cjs/**/*.cjs");
                    for (const file of files) {
                      let content = (0, import_node_fs.readFileSync)(file, "utf8");
                      content = content.replace(
                        /await\s+import\(['"]([^'"]+)['"]\)/g,
                        '__toESM(require("$1"), true)'
                      );
                      (0, import_node_fs.writeFileSync)(file, content, "utf8");
                    }
                  });
                }
              },
              {
                name: "add-extensions",
                setup(build) {
                  build.onEnd(() => {
                    entryPoints.forEach((entry) => {
                      const outputFilePath = import_node_path.default.join("./public/cjs", entry.replace("src/", "").replace(".ts", ".cjs"));
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
                    const files = import_glob.default.sync("public/esm/**/*.mjs");
                    for (const file of files) {
                      let content = (0, import_node_fs.readFileSync)(file, "utf8");
                      content = content.replace(
                        /const\s+{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\)/g,
                        'import { $1 } from "$2"'
                      );
                      content = content.replace(
                        /const\s+([^=]+)\s*=\s*require\(['"]([^'"]+)['"]\)/g,
                        'import $1 from "$2"'
                      );
                      (0, import_node_fs.writeFileSync)(file, content, "utf8");
                    }
                  });
                }
              },
              {
                name: "add-extensions",
                setup(build) {
                  build.onEnd(() => {
                    entryPoints.forEach((entry) => {
                      const outputFilePath = import_node_path.default.join("./public/esm", entry.replace("src/", "").replace(".ts", ".mjs"));
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
          await Promise.all([
            import_esbuild.default.build(cjsSettings),
            import_esbuild.default.build(esmSettings),
            import_esbuild.default.build(browserSettings)
          ]);
          import_qcobjects.logger.info("[build:esbuild] Build process completed successfully!");
        } catch (e) {
          import_qcobjects.logger.error(`[build:esbuild] Build process failed: ${e.message}`);
          process.exit(1);
        }
      }
    };
    const commandHandler = this;
    import_qcobjects.logger.debug("Loading command build:esbuild...");
    switchCommander.program.command("build:esbuild").allowExcessArguments(false).description("Builds the project using esbuild for CJS, ESM, and browser formats").action(function() {
      commandHandler.choiceOption.build_esbuild.call(commandHandler);
    });
    switchCommander.program.command("build:esb").allowExcessArguments(false).description("Alias for build:esbuild - Builds the project using esbuild").action(function() {
      commandHandler.choiceOption.build_esbuild.call(commandHandler);
    });
    import_qcobjects.logger.debug("Loading command build:esbuild... DONE.");
  }
}
(0, import_qcobjects.Package)("com.qcobjects.cli.commands.build.esbuild", [
  CommandHandler
]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CommandHandler
});
//# sourceMappingURL=cli-commands-build-esbuild.cjs.map
