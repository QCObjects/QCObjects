const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("node:path");
const fs = require("node:fs").promises;

const logError = (e) => { console.error(e); process.exit(1); };
const logDebug = (e) => { console.debug(e); }

const copyDir = async (source, dest, exclude) => {
    source = path.resolve(source);
    dest = path.resolve(dest);
    const dname = path.basename(source);
    const dirExcluded = exclude.includes(dname);

    const isDir = async (d) => {
        try {
            const stat = await fs.stat(d);
            return stat.isDirectory();
        } catch {
            return false;
        }
    };

    const isFile = async (d) => {
        try {
            const stat = await fs.stat(d);
            return stat.isFile();
        } catch {
            return false;
        }
    };

    if (await isDir(source) && !dirExcluded) {
        await fs.mkdir(dest, { recursive: true });
        const paths = await fs.readdir(source, { withFileTypes: true });
        const dirs = paths.filter(d => d.isDirectory());
        const files = paths.filter(f => f.isFile());

        for (const f of files) {
            const sourceFile = path.resolve(source, f.name);
            const destFile = path.resolve(dest, f.name);
            const fileExcluded = exclude.includes(f.name);
            if (await isFile(sourceFile) && !fileExcluded) {
                logDebug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...`);
                await fs.copyFile(sourceFile, destFile);
                logDebug(`[publish:static] Copying files from ${sourceFile} to ${destFile} excluding ${exclude}...DONE!`);
            }
        }

        for (const d of dirs) {
            const sourceDir = path.resolve(source, d.name);
            const destDir = path.resolve(dest, d.name);
            await copyDir(sourceDir, destDir, exclude);
        }
    }
};

(async () => {
    await copyDir("./src/templates", "./build/templates", []);
    await copyDir("./src/templates", "./public/cjs/templates", []);
    await copyDir("./src/templates", "./public/esm/templates", []);
    await copyDir("./src/templates", "./public/browser/templates", []);
})();

const baseSettings = {
    entryPoints: ["src/**/*.ts"], // Your entry file
    bundle: false,
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    target: ["node22"], // Adjust based on your target environment
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
    ]
};

const cjsSettings = {
    ...baseSettings,
    outdir: "public/cjs", // Output dir
    format: "cjs", // or "esm" depending on your module system    
    platform: "node", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".cjs"
    }
};

const esmSettings = {
    ...baseSettings,
    outdir: "public/esm", // Output dir
    format: "esm", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".mjs"
    }
};

const browserSettings = {
    ...baseSettings,
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