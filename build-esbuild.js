// build.js
const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("node:path");
const fs = require ("node:fs");

const logError = (e) => { console.error(e); process.exit(1); };
const logDebug = (e) => { console.debug(e); }

const copyDir = (source, dest, exclude) => {
    source = path.resolve(source);
    dest = path.resolve(dest);
    const dname = path.basename(source);
    const dirExcluded = (exclude.includes(dname));

    const isDir = (d) => {
        return (fs.existsSync(d) && fs.statSync(d).isDirectory()) ? (true) : (false);
    };

    const isFile = (d) => {
        return (fs.existsSync(d) && fs.statSync(d).isFile()) ? (true) : (false);
    }

    if (isDir(source) && !dirExcluded) {
        fs.mkdirSync(dest, { recursive: true });
        const paths = fs.readdirSync(source, { withFileTypes: true })
        const dirs = paths.filter(d => d.isDirectory());
        const files = paths.filter(f => f.isFile());
        (async function (paths, dirs, files, exclude) {
            files.map((f) => {
                const sourceFile = path.resolve(source, f.name);
                const destFile = path.resolve(dest, f.name);
                const fileExcluded = exclude.includes(f.name);
                if (isFile(sourceFile) && !fileExcluded) {
                    logDebug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
                    fs.copyFileSync(sourceFile, destFile);
                    logDebug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
                }
            });
            dirs.map((d) => {
                const sourceDir = path.resolve(source, d.name);
                const destDir = path.resolve(dest, d.name);
                copyDir(sourceDir, destDir, exclude);
            });
        })(paths, dirs, files, exclude);
    }

};

copyDir("./src/templates", "./build/templates", []);
copyDir("./src/templates", "./public/cjs/templates", []);
copyDir("./src/templates", "./public/esm/templates", []);
copyDir("./src/templates", "./public/browser/templates", []);

const baseSettings = {
    entryPoints: ["src/**/*.ts"], // Your entry file
    bundle: true,
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    target: ["esnext"], // Adjust based on your target environment
    tsconfig: "tsconfig.json", // Path to your tsconfig.json,
    globalName: "global",
    minify: false,
    keepNames: true,
    sourcemap: true,
    splitting: false,
    chunkNames: "chunks/[name]-[hash]",
    plugins: [
        alias({
            "types": path.join(__dirname, "src/types/global/index.d.ts")
        })
    ],
    external: ["os", "path", "http", "url",
        "child_process", "events", "fs", "process","node:process",
        "node:fs", "node:os", "node:child_process",
        "node:path", "readline", "node:net", "node:repl",
        "node:vm", "http2", "vm", "qcobjects-sdk",
        "../package.json", "package.json", "./package.json"
    ]
};

const cjsSettings = {
    ...baseSettings,
    entryPoints: ["src/**/*.ts"], // Your entry file
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    platform: "node", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".cjs"
    }

};

const esmSettings = {
    ...baseSettings,
    entryPoints: ["src/**/*.ts"], // Your entry file
    outdir: "public/esm", // Output dir
    format: "esm", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".mjs"
    }

};

const browserSettings = {
    ...baseSettings,
    entryPoints: ["src/**/*.ts"], // Your entry file
    bundle: true,
    outdir: "public/browser", // Output dir
    format: "iife", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".js"
    }
};



esbuild.build(cjsSettings).catch(logError);
esbuild.build(esmSettings).catch(logError);
esbuild.build(browserSettings).catch(logError);
