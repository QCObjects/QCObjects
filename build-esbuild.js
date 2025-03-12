const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("node:path");
const { readFileSync, writeFileSync } = require("node:fs");
const fs = require("node:fs").promises;
const glob = require("glob");

// Function to detect and add the extension
const nameToExtension = (name, ext) => {
    function isPackage(name) {
      // Simple check to determine if the name is a package
      // This can be enhanced based on your specific needs
      return !name.startsWith(".") && !name.startsWith("/") && !name.includes("/");
    }
  
    const hasExtension = /\.[^/\\]+$/.test(name);
    if (!hasExtension && !isPackage(name)) {
      name += ext;
    }
  
    return name;
  };
  
  // Function to add .cjs and .mjs extensions to import/export/require statements
  const addExtensions = (filePath, toExt) => {
    const content = readFileSync(filePath, 'utf8');
    const updatedContent = content.replace(/(from\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      return `${p1}${nameToExtension(p2, toExt)}${p3}`;
    }).replace(/(import\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      return `${p1}${nameToExtension(p2, toExt)}${p3}`;
    }).replace(/(export\s+['"])(.*?)(['"])/g, (match, p1, p2, p3) => {
      return `${p1}${nameToExtension(p2, toExt)}${p3}`;
    }).replace(/(require\s*\(\s*['"])(.*?)(['"]\s*\))/g, (match, p1, p2, p3) => {
      return `${p1}${nameToExtension(p2, toExt)}${p3}`;
    });
    writeFileSync(filePath, updatedContent, 'utf8');
  };

// Get all TypeScript entry points
const entryPoints = glob.sync('src/**/*.ts');

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

const ignorePlugin = {
  name: 'ignore-packages',
  setup(build) {
    // Handle both static and dynamic imports of these packages
    build.onResolve({ filter: /^(qcobjects-sdk|qcobjects)$/ }, args => {
      return { 
        external: true,
        // Preserve the path for dynamic imports
        path: args.path
      }
    })
  }
}

const baseSettings = {
    entryPoints: entryPoints,
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
    },
    plugins: [
        {
            name: 'add-extensions',
            setup(build) {
                build.onEnd(() => {
                    entryPoints.forEach(entry => {
                        const outputFilePath = path.join('./public/cjs', entry.replace('src/', '').replace('.ts', '.cjs'));
                        addExtensions(outputFilePath, '.cjs');
                    });
                });
            }
        }
    ]
};

const esmSettings = {
    ...baseSettings,
    outdir: "public/esm", // Output dir
    format: "esm", // or "esm" depending on your module system    
    platform: "browser", // or "browser" depending on your target environment
    outExtension: {
        ".js": ".mjs"
    },
    plugins: [
        {
            name: 'add-extensions',
            setup(build) {
                build.onEnd(() => {
                    entryPoints.forEach(entry => {
                        const outputFilePath = path.join('./public/esm', entry.replace('src/', '').replace('.ts', '.mjs'));
                        addExtensions(outputFilePath, '.mjs');
                    });
                });
            }
        }
    ]
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