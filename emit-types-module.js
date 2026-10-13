/*
Computes the public type surface for the bundled declaration file.

public/types/index.d.ts is emitted by tsc as a single file containing one
`declare module "<source>"` block per source module. Those blocks import the
governing types by the bare specifier "types", which resolves only through the
repo-internal `paths` mapping in tsconfig.d.json and is never published. A
consumer resolving the bundle therefore reports TS2307 once per import site.

The specifier is a fossil. It was originally supplied by the external packages
`@types/qcobjects` (github:QCObjects/-types-qcobjects) and
`@types/qcobjects-sdk`, removed in de295144 (2024-10-27). The alias outlived
them and was baked into emitted declarations.

Rather than rewrite import sites, this emits the declarations the bundle
actually needs as one ambient `declare module "types"` block. Because postbuild
restores the bundle to a global script, that block is visible to every other
module block in the file, so all existing imports resolve unchanged.

"Public" is defined structurally, not by hand: a type is public if it is
reachable from a declaration the bundle exports. That is the transitive closure
of the imported names over src/types/global/index.d.ts. Types unreachable from
the public surface stay internal and are never emitted — nothing here is
transcribed, copied, or maintained by hand, so a new class needs no new type.
*/

const fs = require('node:fs');
const ts = require('typescript');

const INTERNAL_TYPES = 'src/types/global/index.d.ts';
const BUNDLE = './public/types/index.d.ts';

/*
Node builtin types the internal file imports, and the module each comes from.

IMicroservice is reachable from the public surface (BackendMicroservice's
constructor is typed with it) and declares `stream` / `request` in terms of
Http2Stream, Stream, Http2ServerRequest and ClientRequest. Those references are
part of the exported API, so the emitted block re-imports exactly the ones it
uses. Type-checking Core's full public surface therefore requires @types/node,
which is a genuine property of an HTTP-aware API rather than an artefact of the
build. Consumers without it can still check everything that does not touch
BackendMicroservice.
*/
const NODE_BUILTIN_SOURCES = {
  ClientRequest: 'http',
  Http2SecureServer: 'http2',
  Http2Server: 'http2',
  Http2ServerRequest: 'http2',
  Http2Stream: 'http2',
  Stream: 'stream',
};

const IMPORT_RE = /import\s*(?:type\s*)?\{([^}]*)\}\s*from\s*["']types["']/g;

/** Names the bundle imports from the internal "types" module. */
function collectSeedNames(bundleText) {
  const seed = new Set();
  let match;
  IMPORT_RE.lastIndex = 0;
  while ((match = IMPORT_RE.exec(bundleText)) !== null) {
    for (const part of match[1].split(',')) {
      const name = part.trim().replace(/^type\s+/, '');
      if (name) seed.add(name);
    }
  }
  return seed;
}

/** Index every exported interface and type alias in the internal types file. */
function indexDeclarations(sourceText) {
  const sourceFile = ts.createSourceFile(
    INTERNAL_TYPES,
    sourceText,
    ts.ScriptTarget.Latest,
    true,
  );
  const declarations = new Map();
  for (const statement of sourceFile.statements) {
    const isInterface = ts.isInterfaceDeclaration(statement);
    const isTypeAlias = ts.isTypeAliasDeclaration(statement);
    if (!isInterface && !isTypeAlias) continue;
    const modifiers = ts.canHaveModifiers(statement)
      ? ts.getModifiers(statement) || []
      : [];
    const isExported = modifiers.some(
      (modifier) => modifier.kind === ts.SyntaxKind.ExportKeyword,
    );
    if (!isExported) continue;
    declarations.set(statement.name.text, { node: statement, sourceFile });
  }
  return { sourceFile, declarations };
}

/**
 * Walk references outward from the seed names. An identifier anywhere inside a
 * declaration that names another indexed declaration pulls it into the closure.
 * Conservative by design: over-approximating publishes a type that is internal,
 * under-approximating ships a bundle missing types.
 */
function computeClosure(declarations, seed) {
  const closure = new Set();
  const queue = [...seed];
  const unresolved = [];

  while (queue.length > 0) {
    const name = queue.shift();
    if (closure.has(name)) continue;
    const entry = declarations.get(name);
    if (!entry) {
      unresolved.push(name);
      continue;
    }
    closure.add(name);
    const visit = (node) => {
      if (
        ts.isIdentifier(node) &&
        declarations.has(node.text) &&
        !closure.has(node.text)
      ) {
        queue.push(node.text);
      }
      ts.forEachChild(node, visit);
    };
    visit(entry.node);
  }

  if (unresolved.length > 0) {
    throw new Error(
      `Bundle references type(s) not declared in ${INTERNAL_TYPES}: ` +
        `${unresolved.join(', ')}. Refusing to emit an incomplete bundle.`,
    );
  }

  return closure;
}

/** Print the closure as the body of an ambient `declare module "types"` block. */
function printModule(closure, declarations, sourceFile) {
  const printer = ts.createPrinter({
    newLine: ts.NewLineKind.LineFeed,
    removeComments: false,
  });

  /*
  The printed declarations go inside `declare module "types" { … }`, which is
  already ambient. The source file spells them `export declare interface X` /
  `export declare type X`, and carrying the redundant `declare` into an ambient
  context is TS1038.

  Stripped from the printed text rather than the AST: the keyword only ever
  appears in a declaration's own modifier list, never in a member body, so a
  match anchored at the start of the printed declaration is unambiguous. It also
  leaves every recorded generated position untouched — the removed characters
  sit before the position being recorded only on the first line of each member,
  and members are separated by blank lines rather than by that prefix.
  */
  const dropRedundantDeclare = (text) =>
    text.replace(/^export declare /, 'export ');

  /*
  Record where each declaration came from so index.d.ts.map can point at it.
  Generated positions are relative to the start of the emitted block; the caller
  offsets them once it knows where the block lands in the bundle.
  */
  const positions = [];
  let code = '';

  for (const name of [...closure].sort()) {
    const { node } = declarations.get(name);
    const text = dropRedundantDeclare(
      printer.printNode(ts.EmitHint.Unspecified, node, sourceFile),
    );

    const genLine = code === '' ? 0 : code.split('\n').length - 1;
    const genCol =
      code === '' ? 0 : code.length - code.lastIndexOf('\n') - 1;
    const { line, character } = sourceFile.getLineAndCharacterOfPosition(
      node.getStart(sourceFile),
    );
    positions.push({ name, srcLine: line, srcCol: character, genLine, genCol });

    code = code === '' ? text : `${code}\n\n${text}`;
  }

  /*
  Re-import only the Node builtin types the emitted code actually mentions,
  grouped by module so each specifier appears once.
  */
  const byModule = new Map();
  for (const [name, moduleName] of Object.entries(NODE_BUILTIN_SOURCES)) {
    if (!new RegExp(`\\b${name}\\b`).test(code)) continue;
    if (!byModule.has(moduleName)) byModule.set(moduleName, []);
    byModule.get(moduleName).push(name);
  }

  const imports = [...byModule.entries()]
    .sort(([a], [b]) => a.localeCompare(b))
    .map(
      ([moduleName, names]) =>
        `import type { ${names.sort().join(', ')} } from "${moduleName}";`,
    );

  if (imports.length === 0) return { code, positions };

  /*
  Imports sit above the declarations, so every recorded generated line moves
  down by the number of lines the import block occupies.
  */
  const shift = imports.join('\n\n').split('\n').length + 1;
  for (const entry of positions) entry.genLine += shift;

  return { code: [...imports, code].join('\n\n'), positions };
}

/**
 * @returns {{code: string, positions: object[], names: string[], internalOnly: string[], declared: number}}
 */
function buildTypesModule() {
  const bundleText = fs.readFileSync(BUNDLE, 'utf8');
  const seed = collectSeedNames(bundleText);

  if (seed.size === 0) {
    return { code: '', positions: [], names: [], internalOnly: [], declared: 0 };
  }

  const sourceText = fs.readFileSync(INTERNAL_TYPES, 'utf8');
  const { sourceFile, declarations } = indexDeclarations(sourceText);
  const closure = computeClosure(declarations, seed);

  const { code, positions } = printModule(closure, declarations, sourceFile);

  return {
    code,
    positions,
    names: [...closure].sort(),
    internalOnly: [...declarations.keys()]
      .filter((name) => !closure.has(name))
      .sort(),
    declared: declarations.size,
  };
}

module.exports = { buildTypesModule, INTERNAL_TYPES, BUNDLE };

if (require.main === module) {
  const result = buildTypesModule();
  console.log(`declared in ${INTERNAL_TYPES}: ${result.declared}`);
  console.log(`public closure:               ${result.names.length}`);
  console.log(`internal only:                ${result.internalOnly.length}`);
}
