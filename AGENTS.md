# qcobjects-cli

TypeScript CLI tool and HTTP/HTTP2 server for the [QCObjects](https://qcobjects.dev) framework.
Node >=22, npm >=10.

## Commands

| Action | Command |
|--------|---------|
| Install | `npm i --legacy-peer-deps` (peer deps don't auto-install on npm >=10) |
| Lint | `npm run lint` |
| Test | `npm test` (lint + jasmine) |
| Run single test | `npx ts-node --project ./tsconfig.jasmine.json ./node_modules/jasmine/bin/jasmine` |
| Full build (types → CJS → ESM) | `npm run build` |
| Build CJS only | `npm run build:ts` — runs test first |
| Build types only | `npm run build:ts-types` |
| Build ESM + browser IIFE | `npm run build:esbuild` |
| Dev server | `npm start` (aliases to `qcobjects-shell`) |

## Architecture

- **CLI framework:** Commander (`src/cli-main.ts` — `SwitchCommander` class)
- **Commands** in `src/cli-commands-*.ts`, registered via `src/cli-commands.ts`
- **Servers:** HTTP (`src/main-http-server.ts`), HTTP/2 (`src/main-http2-server.ts`), GAE variant
- **Build pipeline:** Custom `transpile.js` (TS compiler API) → CJS, then `build-esbuild-esm.js` → ESM + browser IIFE
- **Output:** `public/cjs/`, `public/esm/`, `public/browser/`, `public/types/`
- Also ships `deno.json` + `mod.ts` for Deno compatibility

## Testing

- **Framework:** Jasmine v3.7, single spec at `spec/testsSpec.ts`
- Verifies `qcobjects` version matches between `peerDependencies` and `devDependencies`
- Mock path in `tsconfig.jasmine.json`: `qcobjects-sdk` → `spec/mocks/qcobjects-sdk.mock.ts`
- Config: `stopSpecOnExpectationFailure: true`, `failSpecWithNoExpectations: true`, `random: false`

## QCObjects patterns in source

- `InheritClass`, `Package()`, `Export()`, `CONFIG`, `logger`, `Service`, `Component`
- Plugin autodiscovery: scans `dependencies`/`devDependencies` for packages with `qcobjects-lib`, `qcobjects-handler`, `qcobjects-command` keywords

## Config & env

- `config.json` at root — **gitignored** (local dev only), default: `{"devmode":"debug"}`
- `src/defaultsettings.ts` — `$ENV(VAR)` template syntax resolved at runtime
- `process.env.PORT` overrides HTTP listen port
- Version tracked in `VERSION` file, CLI has built-in `v-patch`/`v-minor`/`v-major`/`v-sync`/`v-changelog` commands

## Gotchas

- **Duplicate files:** Source has `* 2.ts`, `* 2.json`, `* 2.yml` files — always edit the version without ` 2` suffix
- **ESLint** uses `recommendedTypeChecked` but many core rules are explicitly disabled (`no-explicit-any: off`, `no-unused-vars: off`, `no-var: off`, etc.) — lint is permissive
- **CI workflows** (`ci.yml`) are placeholders with TODOs; real publish happens via `.github/workflows/npmpublish.yml` (single OIDC workflow handling all 3 channels)
- **Postversion** configured as `"git push"` (only pushes the branch) to avoid duplicate CI — the tag is pushed separately by `syncGit`

## Git workflow

See `.opencode/instructions/git-workflow.md` — topic branches from `development`, no rebase, SemVer tags.
See `docs/release-pipeline.md` — branch model, release channels, archive info.
