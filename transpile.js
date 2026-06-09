const ts = require('typescript');
const path = require('path');
const { readFileSync, writeFileSync } = require('fs');
const glob = require('glob');

// Get the tsconfig file name from command line arguments
const configFileName = process.argv[2];

if (!configFileName) {
  console.error('Please provide the tsconfig file name as a parameter.');
  process.exit(1);
}

// Resolve the path to the tsconfig file
const configPath = path.resolve(__dirname, configFileName);

// Parse the tsconfig file
const parsedCommandLine = ts.getParsedCommandLineOfConfigFile(configPath, {}, {
  ...ts.sys,
  onUnRecoverableConfigFileDiagnostic: diagnostic => {
    console.error(ts.formatDiagnostic(diagnostic, {
      getCanonicalFileName: (fileName) => fileName,
      getCurrentDirectory: ts.sys.getCurrentDirectory,
      getNewLine: () => ts.sys.newLine,
    }));
    process.exit(1);
  }
});

if (!parsedCommandLine) {
  console.error('Failed to parse tsconfig file');
  process.exit(1);
}

// Create a program with the parsed settings
const program = ts.createProgram({
  rootNames: parsedCommandLine.fileNames,
  options: parsedCommandLine.options,
});

// Emit the compiled files
const emitResult = program.emit();

// Report any diagnostics (errors or warnings)
const allDiagnostics = ts.getPreEmitDiagnostics(program).concat(emitResult.diagnostics);

allDiagnostics.forEach(diagnostic => {
  if (diagnostic.file) {
    const { line, character } = diagnostic.file.getLineAndCharacterOfPosition(diagnostic.start);
    const message = ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n');
    console.error(`${diagnostic.file.fileName} (${line + 1},${character + 1}): ${message}`);
  } else {
    console.error(ts.flattenDiagnosticMessageText(diagnostic.messageText, '\n'));
  }
});

// Check if any files were emitted
const emittedFiles = emitResult.emittedFiles || [];
if (emittedFiles.length > 0) {
  console.log('Emitted files:');
  emittedFiles.forEach(file => console.log(file));
}

// Post-process CJS output: convert await import(var) → require(var) for data file imports
// Detects variables assigned to paths ending in .json/.jsonp/.md/.mdc/.text/.txt
const extensionsToConvert = ['json', 'jsonp', 'md', 'mdc', 'text', 'txt'];
const extPattern = extensionsToConvert.join('|');
const varDeclRegex = new RegExp(
  `(?:const|let|var)\\s+(\\w+)\\s*=[^;]*?\\.(?:${extPattern})["'\`][^;]*;`,
  'g'
);

glob.sync('public/cjs/**/*.js').forEach(file => {
  const content = readFileSync(file, 'utf8');

  const jsonVars = new Set();
  let match;
  while ((match = varDeclRegex.exec(content)) !== null) {
    jsonVars.add(match[1]);
  }

  if (jsonVars.size > 0) {
    const importRegex = new RegExp(
      `await import\\((${[...jsonVars].join('|')})\\)`,
      'g'
    );
    const newContent = content.replace(importRegex, 'require($1)');
    if (newContent !== content) {
      writeFileSync(file, newContent, 'utf8');
    }
  }
});

// Exit with an appropriate code
const exitCode = emitResult.emitSkipped ? 1 : 0;
console.log(`Process exiting with code '${exitCode}'.`);
process.exit(exitCode);