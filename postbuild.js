const fs = require('node:fs');
const path = './public/types/index.d.ts';

/*
public/types/index.d.ts is generated as a single bundled declaration file
whose modules are named after their source paths, so the public barrel is
emitted as `declare module "QCObjects"`. The package is published as
`qcobjects`, so a consumer writing

    import { CONFIG, Component, RegisterWidgets } from "qcobjects";

resolves to no declaration at all, and every such import reports
"Module '\"qcobjects\"' has no exported member ...". The bundle build
downgrades those diagnostics to warnings, so the breakage is silent.

Append the package-named alias so the published declarations match the
package name. It mirrors what the runtime entry already does: package.json
maps exports["."] to the cjs/esm builds, both of which are the same barrel.
*/
const ALIAS = [
  'declare module "qcobjects" {',
  '    export * from "QCObjects";',
  '}',
].join('\n');

let current = '';
try {
  current = fs.readFileSync(path, 'utf8');
} catch (err) {
  console.error('Failed to read', path, err);
  process.exit(1);
}

/*
tsc emits a trailing `export {};` for this bundle. That top-level export makes
the file a *module*, and inside a module every `declare module "X"` block is an
augmentation of an already-existing module rather than a declaration of a new
one. Nothing in a consumer resolves those blocks, so the whole published type
surface is invisible and every import from "qcobjects" reports TS2305.

Dropping the export restores the file to a global script, where the blocks are
real ambient declarations.

The alias is rewritten on every run rather than appended: tsconfig.d.json is
composite, so a rebuild with no source changes skips emit and leaves whatever
this script wrote last time in place. Appending unconditionally would stack a
duplicate declaration per build.
*/
const withoutModuleMarker = current
  .replace(/declare module "qcobjects" \{[^}]*\}\n*/g, '')
  .replace(/^export \{\};?\s*$/m, '')
  .replace(/\s+$/, '\n');

fs.writeFileSync(
  path,
  `${withoutModuleMarker}\n${ALIAS}\n`,
  (err) => {
    if (err) {
      console.error('Failed to write module declaration:', err);
      process.exit(1);
    }
    console.log('Wrote declare module "qcobjects" into index.d.ts');
  },
);