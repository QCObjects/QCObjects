# Release Pipeline

## Why this change

Previously the repo used version-specific branches (v2.3, v2.4-beta, v2.4-ts,
v2.5-beta) to track different architecture waves (ECMA5, ES6+JS, full TS+JS).
As the number of active tracks grew, branch-based management added complexity:
CI workflows needed per-branch configuration, PR paths were unclear, and
promoting a beta to LTS required manual cross-branch coordination.

## What changed

- Removed all version-specific branches (v2.3, v2.4-beta, v2.4-ts, v2.5-beta)
- Single active development branch: `development`
- Release channel is encoded in the tag suffix, not in a branch name
- Old version tracks preserved as archive tags

## Branch model

    main          ← release digest (merged from development via PR)
    development   ← single active development branch
    feature/*     ← topic branches, PR into development
    fix/*
    bugfix/*

No more version-specific branches. Every release is a tag on `main`.

## Release channels (tags)

| Tag pattern | npm dist-tag | Triggered by |
|-------------|-------------|--------------|
| `vX.Y.Z`        | `latest` | `npmpublish.yml` (suffix detection) |
| `vX.Y.Z-lts`    | `lts`    | `npmpublish.yml` (suffix detection) |
| `vX.Y.Z-beta`   | `beta`   | `npmpublish.yml` (suffix detection) |
| (future) `-dev` | `dev`    | (add pattern to `npmpublish.yml`) |
| (future) `-alpha` | `alpha` | (add pattern to `npmpublish.yml`) |

## Promotion workflow

1. Daily work on `development` branch
2. `v-patch --git --npm` → tag `vX.Y.Z-beta` (beta publish)
3. Change VERSION suffix → `v-patch --git --npm` → tag `vX.Y.Z-lts` (LTS publish)
4. PR `development` → `main` → merge → tag `vX.Y.Z` on `main` (latest publish)

## Branch snapshot and removal steps

These steps preserve the latest state of every old version branch as a tag,
then delete the branches. Run them once during migration.

### Prerequisites

```bash
git fetch --all --prune
```

### 1. Archive v2.4-beta

```bash
git tag archive/v2.4-beta origin/v2.4-beta
git push origin archive/v2.4-beta
```

### 2. Archive v2.4-ts

```bash
git tag archive/v2.4-ts origin/v2.4-ts
git push origin archive/v2.4-ts
```

### 3. Bootstrap development from v2.5-beta

```bash
git checkout -b development origin/v2.5-beta
git push -u origin development
```

### 4. Delete old remote branches

```bash
git push origin --delete v2.5-beta v2.4-beta v2.4-ts
```

### 5. Delete old local branches

```bash
git branch -d v2.5-beta
```

### 6. Verify

```bash
git branch -a          # should show only main, development
git tag -ln archive/*  # should show archive/v2.4-beta, archive/v2.4-ts
```

## Archived tracks

v2.3 is already captured by existing tags `v2.3.1` through `v2.3.50` — no
separate archive tag needed. Its commits are ancestors of `main`.

| Archive tag | Source branch | Created |
|-------------|--------------|---------|
| `archive/v2.4-beta` | `origin/v2.4-beta` | migration date |
| `archive/v2.4-ts`   | `origin/v2.4-ts`   | migration date |
| `v2.3.50` (existing tag) | `v2.3` branch (GitLab, merged to master) | n/a |

## CI pipeline updates

| File | Change |
|------|--------|
| `.github/workflows/codeql-analysis.yml` | branch targets from `[v2.3, v2.4]` to `[main, development]` |
| `.github/workflows/npmpublish.yml` | consolidated single workflow (was 3 separate) |
| `.github/workflows/open-pr-to-development.yml` | already targets `development`, no changes needed |
| `.github/workflows/main-pr-source.yml` | already enforces `development` → `main`, no changes needed |
| `.github/workflows/ci.yml` | already targets `main`/`development`, no changes needed |

## Future considerations

- When starting a new architecture wave (e.g. v2.6), branch from `main` into a
  feature branch, develop on `development`, and release via the same tag flow
- Archived branches are never deleted from git history — the tags ensure
  the code is always accessible for reference or hotfix branching
