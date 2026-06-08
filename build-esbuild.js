const esbuild = require("esbuild");
const alias = require("esbuild-plugin-alias");
const path = require("node:path");
const { readFileSync, writeFileSync } = require("node:fs");
const fs = require("node:fs/promises");
const glob = require("glob");

// Organized external packages into categories
const externalPackages = {
  node: [
    "fs", "path", "os", "util", "events", "stream", "http", "https",
    "crypto", "zlib", "buffer", "url", "querystring", "child_process",
    "cluster", "dgram", "dns", "net", "readline", "repl", "tls", "tty",
    "vm", "worker_threads"
  ],
  qcobjects: ["qcobjects", "qcobjects-sdk"]
};

// Flatten external packages for quick lookup
const allExternalPackages = [
  ...externalPackages.node.map(pkg => `node:${pkg}`),
  ...externalPackages.qcobjects
];

// Function to detect and add the extension
const nameToExtension = (name, ext, settings) => {
  const isPackage = name => !name.startsWith(".") && !name.startsWith("/") && !name.includes("/");
  const hasExtension = /\.[^/\\]+$/.test(name);
  const isExternalPackage = allExternalPackages.includes(name);

  if (!hasExtension && !isPackage(name) && !isExternalPackage) {
    name += ext;
  }

  return name;
};

// Function to add extensions to import/export/require statements
const addExtensions = (filePath, toExt, settings) => {
  const content = readFileSync(filePath, 'utf8');
  const patterns = [
    [/(from\s+['"])(.*?)(['"])/g, '$1$2$3'],
    [/(import\s+['"])(.*?)(['"])/g, '$1$2$3'],
    [/(export\s+['"])(.*?)(['"])/g, '$1$2$3'],
    [/(require\s*\(\s*['"])(.*?)(['"]\s*\))/g, '$1$2$3']
  ];

  const updatedContent = patterns.reduce((content, [pattern, replacement]) => {
    return content.replace(pattern, (match, p1, p2, p3) => {
      return `${p1}${nameToExtension(p2, toExt, settings)}${p3}`;
    });
  }, content);

  writeFileSync(filePath, updatedContent, 'utf8');
};

// Common build settings
const baseSettings = {
  entryPoints: glob.sync('src/**/*.ts').map(file => path.resolve(file)),
  bundle: false,
  target: ["node22"],
  tsconfig: "tsconfig.json",
  globalName: "global",
  minify: false,
  keepNames: true,
  sourcemap: true,
  splitting: false,
  chunkNames: "chunks/[name]-[hash]",
  plugins: [
    {
      name: 'transform-qcobjects-imports',
      setup(build) {
        build.onResolve({ filter: /^(qcobjects|qcobjects-sdk)$/ }, args => ({
          path: path.resolve(args.path),
          namespace: args.kind === 'dynamic-import' ? 'qcobjects-transform' : undefined,
          external: args.kind !== 'dynamic-import'
        }));

        build.onResolve({ filter: /.*/, namespace: 'file' }, args => ({
          external: args.kind === 'dynamic-import',
          path: path.resolve(args.path)
        }));

        build.onLoad({ filter: /.*/, namespace: 'qcobjects-transform' }, args => ({
          contents: `module.exports = __toESM(require("${path.resolve(args.path)}"), true);`,
          loader: 'js'
        }));
      }
    },
    alias({
      "types": path.resolve(__dirname, "src/types/global/index.d.ts")
    })
  ]
};

// Build settings for different formats
const buildConfigs = {
  cjs: {
    ...baseSettings,
    outdir: "public/cjs",
    format: "cjs",
    platform: "node",
    outExtension: { ".js": ".cjs", ".ts": ".cjs" },
    plugins: [
      ...baseSettings.plugins,
      {
        name: 'transform-dynamic-imports',
        setup(build) {
          build.onEnd(() => {
            glob.sync('public/cjs/**/*.cjs').forEach(file => {
              let content = readFileSync(file, 'utf8');
              content = content.replace(
                /await\s+import\(['"]([^'"]+)['"]\)/g,
                '__toESM(require("$1"), true)'
              );
              writeFileSync(file, content, 'utf8');
            });
          });
        }
      }
    ]
  },
  esm: {
    ...baseSettings,
    outdir: "public/esm",
    format: "esm",
    platform: "browser",
    outExtension: { ".js": ".mjs" },
    plugins: [
      ...baseSettings.plugins,
      {
        name: 'transform-requires',
        setup(build) {
          build.onEnd(() => {
            glob.sync('public/esm/**/*.mjs').forEach(file => {
              let content = readFileSync(file, 'utf8');
              content = content
                .replace(/const\s+{([^}]+)}\s*=\s*require\(['"]([^'"]+)['"]\)/g, 'import { $1 } from "$2"')
                .replace(/const\s+([^=]+)\s*=\s*require\(['"]([^'"]+)['"]\)/g, 'import $1 from "$2"');
              writeFileSync(file, content, 'utf8');
            });
          });
        }
      }
    ]
  },
  browser: {
    ...baseSettings,
    outdir: "public/browser",
    format: "iife",
    platform: "browser",
    outExtension: { ".js": ".js" }
  }
};

// Utility functions
const logError = (e) => { console.error(e); process.exit(1); };
const logDebug = (e) => { console.debug(e); };

const copyDir = async (source, dest, exclude = []) => {
  source = path.resolve(source);
  dest = path.resolve(dest);
  const dname = path.basename(source);
  
  if (exclude.includes(dname)) return;

  try {
    const stat = await fs.stat(source);
    if (!stat.isDirectory()) return;

    await fs.mkdir(dest, { recursive: true });
    const paths = await fs.readdir(source, { withFileTypes: true });

    await Promise.all(paths.map(async item => {
      const sourcePath = path.resolve(source, item.name);
      const destPath = path.resolve(dest, item.name);

      if (item.isFile() && !exclude.includes(item.name)) {
        logDebug(`[publish:static] Copying ${sourcePath} to ${destPath}`);
        await fs.copyFile(sourcePath, destPath);
      } else if (item.isDirectory()) {
        await copyDir(sourcePath, destPath, exclude);
      }
    }));
  } catch (error) {
    logError(error);
  }
};

// Main execution
(async () => {
  try {
    // Copy templates
    const templateDirs = [
      "./build/templates",
      "./public/cjs/templates",
      "./public/esm/templates",
      "./public/browser/templates"
    ];
    
    await Promise.all(templateDirs.map(dir => 
      copyDir("./src/templates", dir, [])
    ));

    // Run builds in parallel
    await Promise.all([
//      esbuild.build(buildConfigs.cjs),
      esbuild.build(buildConfigs.esm),
      esbuild.build(buildConfigs.browser)
    ]);
  } catch (error) {
    logError(error);
  }
})();