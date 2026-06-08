# qcobjects-cli

TypeScript CLI tool and HTTP/HTTP2 server for the [QCObjects](https://qcobjects.dev) framework.
Node >=22, npm >=10.

## Git workflow

See `.opencode/instructions/git-workflow.md` — topic branches from `development`, no rebase, SemVer tags.
See `docs/release-pipeline.md` — branch model, release channels, archive info.

## Release pipeline

- **Branches:** only `main` (release digest) and `development` (active dev)
- **Version branches removed** (v2.3, v2.4-beta, v2.4-ts, v2.5-beta) — archived as
  `archive/v2.4-beta`, `archive/v2.4-ts` tags (v2.3 captured by v2.3.x tags)
- **Release channels encoded in tag suffix**, not branch name:

  | Tag pattern | npm dist-tag | Workflow |
  |-------------|-------------|----------|
  | `vX.Y.Z`        | `latest` | `npmpublish-main.yml` |
  | `vX.Y.Z-lts`    | `lts`    | `npmpublish-lts.yml`  |
  | `vX.Y.Z-beta`   | `beta`   | `npmpublish-beta.yml` |

- **Promotion:**
  1. `development` → `v-patch --git --npm` → tag `vX.Y.Z-beta` (beta publish)
  2. Edit VERSION suffix → `v-patch --git --npm` → tag `vX.Y.Z-lts` (LTS publish)
  3. PR `development` → `main` → merge → tag `vX.Y.Z` on `main` (latest publish)

## Commands

| Action | Command |
|--------|---------|
| Install | `npm install` |
| Lint | `npm run lint` (`eslint src/**/*.ts --fix`) |
| Test | `npm test` (lint → jasmine) |
| Run single test | `npx ts-node --project ./tsconfig.jasmine.json ./node_modules/jasmine/bin/jasmine` |
| Build (types → ts → esm) | `npm run build` |
| Build TS only | `npm run build:ts` — **runs `npm test` first**, then `node ./transpile.js tsconfig.json` |
| Build types only | `npm run build:ts-types` |
| Build ESM bundle | `npm run build:esbuild` |
| Dev server | `npm start` (aliased to `qcobjects-shell`) |

## Architecture

- **CLI framework:** Commander (`src/cli-main.ts` — `SwitchCommander` class)
- **Commands** in `src/cli-commands-*.ts`, registered via `src/cli-commands.ts`
- **Servers:** HTTP (`src/main-http-server.ts`), HTTP/2 (`src/main-http2-server.ts`), GAE variant
- **Build pipeline:** Custom `transpile.js` (TS compiler API) produces CJS → `esbuild` produces ESM + browser IIFE
- **Output:** `public/cjs/`, `public/esm/`, `public/browser/`, `public/types/`

## Testing quirks

- **Framework:** Jasmine v3.7 (`spec/support/jasmine.json`)
- Single spec: `spec/testsSpec.ts` — verifies `qcobjects` version matches between `peerDependencies` and `devDependencies`
- Mock path in `tsconfig.jasmine.json`: `qcobjects-sdk` → `spec/mocks/qcobjects-sdk.mock.ts`
- Config: `stopSpecOnExpectationFailure: true`, `failSpecWithNoExpectations: true`, `random: false`

## QCObjects patterns used in source

- `InheritClass`, `Package()`, `Export()`, `CONFIG`, `logger`, `Service`, `Component`
- Plugin autodiscovery: scans `dependencies`/`devDependencies` for packages with `qcobjects-lib`, `qcobjects-handler`, `qcobjects-command` keywords

## Config & env

- `config.json` at root — runtime config
- `src/defaultsettings.ts` — `$ENV(VAR)` template syntax resolved at runtime
- `process.env.PORT` overrides HTTP listen port
- Dev mode: `config.json` `{"devmode":"debug"}`

## Pre-commit

`.pre-commit-config.yaml`: trailing-whitespace, end-of-file-fixer, check-yaml, check-added-large-files (500 KB max).
Run `pre-commit install` to activate hooks.

## Build artifacts

- `build/templates/` — compiled template copies
- Lockfile: `package-lock.json` only (no yarn/pnpm)
