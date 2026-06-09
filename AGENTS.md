# qcobjects-cli

TypeScript CLI tool and HTTP/HTTP2 server for the [QCObjects](https://qcobjects.dev) framework.
Node >=22, npm >=10.

## Commands

| Action | Command |
|--------|---------|
| Install | `npm i --legacy-peer-deps` (peer deps don't auto-install on npm >=10) |
| Lint | `npm run lint` |
| Test (lint + jasmine) | `npm test` |
| Run jasmine only | `npm run test:jasmine` |
| Full build (types → CJS → ESM) | `npm run build` |
| Build CJS only (runs test first) | `npm run build:ts` |
| Build types only | `npm run build:ts-types` |
| Build ESM + browser IIFE | `npm run build:esbuild` |
| Dev server | `npm start` (aliases `qcobjects-shell`) |

## Architecture

- **CLI framework:** Commander (`src/cli-main.ts` — `SwitchCommander` class)
- **Commands** in `src/cli-commands-*.ts`, registered via `src/cli-commands.ts`
- **Servers:** HTTP (`src/main-http-server.ts`), HTTP/2 (`src/main-http2-server.ts`), GAE (`src/main-http-gae-server.ts`)
- **Build pipeline:** Custom `transpile.js` (TS compiler API) → CJS, then `build-esbuild-esm.js` → ESM + browser IIFE
- **Output:** `public/cjs/`, `public/esm/`, `public/browser/`, `public/types/`
- **Deno:** `deno.json` + `mod.ts` for Deno compatibility
- **Entrypoints:** `src/qcobjects-cli.ts` (CLI), `src/qcobjects-http{-2,}-server.ts` (servers), `src/qcobjects-shell.ts`, `src/qcobjects-collab.ts`
- **Source convention:** Most modules import `qcobjects` at top and use `InheritClass`, `Package()`, `Export()`, `CONFIG`, `logger`, `Component`, `Service`
- **Plugin autodiscovery:** Scans `dependencies`/`devDependencies` for packages with `qcobjects-lib`, `qcobjects-handler`, `qcobjects-command` keywords

## Testing

- **Framework:** Jasmine v3.7, single spec at `spec/testsSpec.ts`
- Verifies `qcobjects` version matches between `peerDependencies` and `devDependencies`
- **Mock:** `tsconfig.jasmine.json` maps `qcobjects-sdk` → `spec/mocks/qcobjects-sdk.mock.ts` (file may not exist yet)
- Config: `stopSpecOnExpectationFailure: true`, `failSpecWithNoExpectations: true`, `random: false`

## Config & env

- `config.json` at root — **gitignored** (local dev only), default: `{"devmode":"debug"}`
- `src/defaultsettings.ts` — `$ENV(VAR)` template syntax resolved at runtime
- `process.env.PORT` overrides HTTP listen port
- Version tracked in `VERSION` file; CLI has built-in `v-patch`/`v-minor`/`v-major`/`v-sync`/`v-changelog` commands

## CI / Git

- **CI workflows** (`ci.yml`, `codeql-analysis.yml`) have **placeholder steps** (TODOs) — not runnable
- Real publish: `.github/workflows/npmpublish.yml` — triggered by `v*.*.*` tags, uses OIDC (`id-token: write`), detects `-beta`/`-lts` suffix for npm dist-tag
- **Branch model:** `main` ← `development` ← `feature/*`/`fix/*`/`bugfix/*`. PRs into `development` auto-created on topic-branch push. PRs to `main` must come from `development`.
- **No rebase.** Use `git pull` (merge).
- **Postversion** is `"git push"` (branch only). Tag is pushed separately by `syncGit` to avoid duplicate CI.
- Version sync: `v-patch --git --npm` calls `npm version` internally (triggers `preversion`/`postversion`), then `syncGit` pushes VERSION commit + tag
- See `.opencode/instructions/git-workflow.md` for detailed git workflow rules.

## ESLint

- Uses `recommendedTypeChecked` but many core rules explicitly disabled (`no-explicit-any: off`, `no-unused-vars: off`, `no-var: off`, `no-unsafe-*: off`, etc.) — lint is permissive
- Ignores `**/*.js`, `spec/**/*`, `node_modules`
