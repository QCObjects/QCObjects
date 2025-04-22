var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import path from "node:path";
import { readFileSync, writeFileSync } from "node:fs";
import fs from "node:fs/promises";
import glob from "glob";
import esbuild from "esbuild";
import alias from "esbuild-plugin-alias";
import { Package, InheritClass, logger } from "qcobjects";
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
  const content = readFileSync(filePath, "utf8");
  const updatedContent = content.replace(/(from\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(import\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(export\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  }).replace(/(require\s*\(\s*['"])(.*?)(['"]\s*\))/g, (match, p1, p2, p3) => {
    return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
  });
  writeFileSync(filePath, updatedContent, "utf8");
}, "addExtensions");
const copyDir = /* @__PURE__ */ __name(async (source, dest, exclude) => {
  source = path.resolve(source);
  dest = path.resolve(dest);
  const dname = path.basename(source);
  const dirExcluded = exclude.includes(dname);
  const isDir = /* @__PURE__ */ __name(async (d) => {
    try {
      const stat = await fs.stat(d);
      return stat.isDirectory();
    } catch {
      return false;
    }
  }, "isDir");
  const isFile = /* @__PURE__ */ __name(async (d) => {
    try {
      const stat = await fs.stat(d);
      return stat.isFile();
    } catch {
      return false;
    }
  }, "isFile");
  if (await isDir(source) && !dirExcluded) {
    await fs.mkdir(dest, { recursive: true });
    const paths = await fs.readdir(source, { withFileTypes: true });
    const dirs = paths.filter((d) => d.isDirectory());
    const files = paths.filter((f) => f.isFile());
    for (const f of files) {
      const sourceFile = path.resolve(source, f.name);
      const destFile = path.resolve(dest, f.name);
      const fileExcluded = exclude.includes(f.name);
      if (await isFile(sourceFile) && !fileExcluded) {
        logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
        await fs.copyFile(sourceFile, destFile);
        logger.debug(`[build:esbuild] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
      }
    }
    for (const d of dirs) {
      const sourceDir = path.resolve(source, d.name);
      const destDir = path.resolve(dest, d.name);
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
class CommandHandler extends InheritClass {
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
          logger.info("[build:esbuild] Starting esbuild process...");
          const entryPoints = glob.sync("src/**/*.ts");
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
              alias({
                "types": path.join(process.cwd(), "src/types/global/index.d.ts")
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
                    const files = glob.sync("public/cjs/**/*.cjs");
                    for (const file of files) {
                      let content = readFileSync(file, "utf8");
                      content = content.replace(
                        /await\s+import\(['"]([^'"]+)['"]\)/g,
                        '__toESM(require("$1"), true)'
                      );
                      writeFileSync(file, content, "utf8");
                    }
                  });
                }
              },
              {
                name: "add-extensions",
                setup(build) {
                  build.onEnd(() => {
                    entryPoints.forEach((entry) => {
                      const outputFilePath = path.join("./public/cjs", entry.replace("src/", "").replace(".ts", ".cjs"));
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
                    const files = glob.sync("public/esm/**/*.mjs");
                    for (const file of files) {
                      let content = readFileSync(file, "utf8");
                      content = content.replace(
                        /const\s+{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\)/g,
                        'import { $1 } from "$2"'
                      );
                      content = content.replace(
                        /const\s+([^=]+)\s*=\s*require\(['"]([^'"]+)['"]\)/g,
                        'import $1 from "$2"'
                      );
                      writeFileSync(file, content, "utf8");
                    }
                  });
                }
              },
              {
                name: "add-extensions",
                setup(build) {
                  build.onEnd(() => {
                    entryPoints.forEach((entry) => {
                      const outputFilePath = path.join("./public/esm", entry.replace("src/", "").replace(".ts", ".mjs"));
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
            esbuild.build(cjsSettings),
            esbuild.build(esmSettings),
            esbuild.build(browserSettings)
          ]);
          logger.info("[build:esbuild] Build process completed successfully!");
        } catch (e) {
          logger.error(`[build:esbuild] Build process failed: ${e.message}`);
          process.exit(1);
        }
      }
    };
    const commandHandler = this;
    logger.debug("Loading command build:esbuild...");
    switchCommander.program.command("build:esbuild").allowExcessArguments(false).description("Builds the project using esbuild for CJS, ESM, and browser formats").action(function() {
      commandHandler.choiceOption.build_esbuild.call(commandHandler);
    });
    switchCommander.program.command("build:esb").allowExcessArguments(false).description("Alias for build:esbuild - Builds the project using esbuild").action(function() {
      commandHandler.choiceOption.build_esbuild.call(commandHandler);
    });
    logger.debug("Loading command build:esbuild... DONE.");
  }
}
Package("com.qcobjects.cli.commands.build.esbuild", [
  CommandHandler
]);
export {
  CommandHandler
};
//# sourceMappingURL=cli-commands-build-esbuild.mjs.map
