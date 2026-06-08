![logo](https://qcobjects.dev/qcobjects_01.png)

Learn more about QCObjects framework in [https://qcobjects.dev](https://qcobjects.dev)

To start, use:
```shell
> su - qcobjects
```
and go to the path ~/projects/mynewapp

To create a new progressive web app type:
```shell
> qcobjects create mynewapp --pwa
```

To create an accelerated mobile page type:
```shell
> qcobjects create mynewapp --amp
```

The QCObjects HTTP2 Server Settings file is in:
```shell
/etc/qcobjects/config.json
```

To check the status of the service:
```shell
> service qcobjects status
```

To start|stop|prestart the service:
```shell
> service qcobjects start
> service qcobjects stop
> service qcobjects restart
```

## Synced Semantic Versioning

Version management is handled through the `VERSION` file at the project root. Commands read from and write to this file, and can optionally sync changes to `package.json` and git.

### `v-patch [filename]`

Bumps the patch number (e.g., `1.2.3` → `1.2.4`). Default filename is `VERSION`.

| Option | Alias | Description |
|--------|-------|-------------|
| `--sync-git` | `--git` | Commit changes, tag, and push to git |
| `--sync-npm` | `--npm` | Also update `package.json` via `npm version` (implies `--git`) |
| `--commit-msg [message]` | `-m` | Custom commit message |

```shell
# Just bump the VERSION file
qcobjects v-patch

# Bump, commit, tag, and push
qcobjects v-patch --git -m "fix: resolve timeout issue"

# Bump VERSION + package.json, commit, tag, push
qcobjects v-patch --git --npm
```

### `v-minor [filename]`

Bumps the minor number (e.g., `1.2.3` → `1.3.0`). Supports the same options as `v-patch`.

```shell
qcobjects v-minor --git -m "feat: add collaboration endpoints"
```

### `v-major [filename]`

Bumps the major number (e.g., `1.2.3` → `2.0.0`). Supports the same options as `v-patch`.

```shell
qcobjects v-major --git --npm -m "breaking: migrate to new API"
```

### `v-sync [filename]`

Reads the current version from `git describe` (latest tag), writes it to the `VERSION` file, updates `package.json` with `npm version`, commits, tags, and pushes.

| Option | Description |
|--------|-------------|
| `-m, --commit-msg [message]` | Commit message (default: `Synced Version v<version>`) |

```shell
qcobjects v-sync -m "sync after release merge"
```

### `v-changelog`

Generates a changelog from annotated git tags, grouped by minor version, printed to stdout.

```shell
qcobjects v-changelog > CHANGELOG.md
```

### Typical workflow

```shell
# 1. Bump the patch version and push everything
qcobjects v-patch --git --npm -m "your message"

# 2. CI publishes the new version to npm

# 3. Generate changelog for release notes
qcobjects v-changelog > CHANGELOG.md
```

---

```shell
   .d88888b.  .d8888b.  .d88888b. 888       d8b                888
  d88P" "Y88bd88P  Y88bd88P" "Y88b888       Y8P                888
  888     888888    888888     888888                          888
  888     888888       888     88888888b.  8888 .d88b.  .d8888b888888.d8888b
  888     888888       888     888888 "88b "888d8P  Y8bd88P"   888   88K
  888 Y8b 888888    888888     888888  888  88888888888888     888   "Y8888b.
  Y88b.Y8b88PY88b  d88PY88b. .d88P888 d88P  888Y8b.    Y88b.   Y88b.      X88
   "Y888888"  "Y8888P"  "Y88888P" 88888P"   888 "Y8888  "Y8888P "Y888 88888P'
         Y8b                                888
                                           d88P
                                         888P"

  Usage: qcobjects [options] [command]

  Options:
    -V, --version                output the version number
    -h, --help                   output usage information

  Commands:
    create [options] <appname>   Creates an app with <appname>
    publish [options] <appname>  Publishes an app with <appname>
    generate-sw <appname>        Generates the service worker  <appname>
    launch <appname>             Launches the application

  Use:
    $ qcobjects-cli [command] --help
    For detailed information of a command

```

