# Launch & Server Architecture

## How to launch an app

After creating a project with `qcobjects create myapp --pwa`, enter the project directory and run:

```shell
npm start
```

This executes `npm run createcert && npm run serve` (defined in the generated `package.json`). The `serve` script runs `qcobjects-server`.

Alternatively, from anywhere:

```shell
qcobjects launch <appname>
```

**Note:** The `<appname>` argument is accepted for interface consistency but is not used by the server — the server discovers the app from the current working directory.

## The launch chain

```
qcobjects launch <appname>
  │
  ▼
src/cli-main.ts:455-472
  └─ exec("qcobjects-server")
       │
       ▼
package.json bin → public/cjs/qcobjects-http2-server.js
       │
       ▼
src/qcobjects-http2-server.ts
  ├─ import "./defaultsettings"      ← loads CONFIG defaults + project config.json
  ├─ choose server class:
  │    CONFIG.get("useLegacyHTTP", false)
  │    → false (default): HTTP2Server  (src/main-http2-server.ts)
  │    → true:           HTTPServer    (src/main-http-server.ts)
  └─ New(serverClass).start()
```

## CLI command handler

**File:** `src/cli-main.ts:455-472`

```typescript
switchCommander.program.command("launch <appname>")
  .description("Launches the application")
  .action(function () {
    logger.info("Launching...");
    setTimeout(() => {
      logger.info("Go to the browser and open https://localhost ");
      logger.info("Press Ctrl-C to stop serving ");
      exec("qcobjects-server", () => {})
        .stdout?.on("data", data => console.log(data));
    }, 5000);
  });
```

The handler:
1. Logs `"Launching..."` immediately
2. Waits 5 seconds
3. Spawns `qcobjects-server` (the HTTP/2 server binary) via `child_process.exec()`
4. Pipes the server's stdout to the console

The 5-second delay exists so the CLI process can exit gracefully before the server takes over.

## Server binary

The `qcobjects-server` binary is defined in `package.json`:

| Binary | Path | Source |
|--------|------|--------|
| `qcobjects-server` | `public/cjs/qcobjects-http2-server.js` | `src/qcobjects-http2-server.ts` |
| `qcobjects-http-server` | `public/cjs/qcobjects-http-server.js` | `src/qcobjects-http-server.ts` |
| `qcobjects-gae-server` | `public/cjs/qcobjects-gae-http-server.js` | `src/qcobjects-gae-http-server.ts` |

## Server selection

**File:** `src/qcobjects-http2-server.ts`

```typescript
import "./defaultsettings";
import { CONFIG, New } from "qcobjects";
import { HTTPServer } from "./main-http-server";
import { HTTP2Server } from "./main-http2-server";

const _ServerClass_ = CONFIG.get("useLegacyHTTP", false)
  ? HTTPServer
  : HTTP2Server;
const app = New(_ServerClass_);
app.start();
```

The default is **HTTP/2** (`useLegacyHTTP: false`). Set `useLegacyHTTP: true` in the project's `config.json` to use HTTP/1.1.

| Server | File | Listens on | Default port |
|--------|------|------------|--------------|
| HTTP/2 (default) | `src/main-http2-server.ts` | HTTP redirect (port 8080 → 8443) + HTTPS/2 (port 8443) | 8443 |
| Legacy HTTP | `src/main-http-server.ts` | HTTP (plain, single port) | `process.env.PORT` \|\| 8080 |
| GAE HTTP | `src/main-http-gae-server.ts` | HTTP (single port, GAE compatible) | `process.env.PORT` \|\| 8080 |

## App discovery

The server does not use the `<appname>` argument. Instead, the app is discovered through the **current working directory**:

1. **`src/defaultsettings.ts:133`** — `CONFIG.set("projectPath", \`${process.cwd()}/\`)`
2. **`src/defaultsettings.ts:173-178`** — reads `<projectPath>/config.json` and merges every key into CONFIG, overriding all defaults
3. **`src/defaultsettings.ts:90`** — `documentRoot` defaults to `<projectPath>/public/`
4. **`src/main-file.ts`** — `FileDispatcher` resolves all file requests relative to `documentRoot`

The implicit contract is that the user is `cd`'d into the project directory, and the project contains a `config.json` and a `public/` directory.

## CONFIG settings reference

All defaults are set in `src/defaultsettings.ts:83-136`.

### Server & network

| Setting | Default | Description |
|---------|---------|-------------|
| `serverPortHTTP` | `"8080"` | Port for HTTP (and HTTP→HTTPS redirect in HTTP/2 mode) |
| `serverPortHTTPS` | `"8443"` | Port for HTTPS/HTTP/2 |
| `useLegacyHTTP` | `false` | Use HTTP/1.1 instead of HTTP/2 |
| `allowHTTP1` | `true` | Allow HTTP/1.1 fallback on the HTTP/2 server |
| `documentRoot` | `$config(projectPath)public/` | Root directory for static file serving |
| `documentRootFileIndex` | `"index.html"` | Default file served for directory paths |
| `cacheControl` | `"max-age=31536000"` | Cache-Control header for static files |
| `backendTimeout` | `20000` | Request timeout in ms (set at runtime) |

### TLS / certificates

| Setting | Default | Description |
|---------|---------|-------------|
| `private-key-pem` | `$config(domain)-privkey.pem` | TLS private key file |
| `private-cert-pem` | `$config(domain)-cert.pem` | TLS certificate file |
| `certificate_provider` | `$ENV(CERTIFICATE_PROVIDER)` | `self_signed` or `letsencrypt` |

### Backend

| Setting | Default | Description |
|---------|---------|-------------|
| `backend.db_engine.name` | `$ENV(ENGINE_NAME)` | Database engine name |
| `backend.auth.enabled` | `true` | Enable authentication |
| `backend.routes` | `[]` | Route definitions (microservice dispatch) |

### Autodiscovery

| Setting | Default | Description |
|---------|---------|-------------|
| `autodiscover` | `true` | Master switch for plugin autodiscovery |
| `autodiscover_commands` | `true` | Auto-load `qcobjects-command` plugins |
| `autodiscover_handlers` | `true` | Auto-load `qcobjects-handler` plugins |

### Config resolution order

1. Hardcoded defaults (`defaultsettings.ts:83-136`)
2. `$ENV(VAR)` template literals resolved at runtime from environment variables
3. `$config(key)` template literals resolved from CONFIG values
4. Project `<projectPath>/config.json` values merged on top (overrides all)

## HTTP/2 server start

**File:** `src/main-http2-server.ts:433-448`

```typescript
start() {
  var server = this.server;

  const httpServer = http.createServer((req, res) => {
    res.writeHead(301, {
      Location: `https://${req.headers.host}${req.url}`
    });
    res.end();
  });

  httpServer.listen(CONFIG.get("serverPortHTTP"));     // 8080 → redirects to HTTPS
  server.listen(CONFIG.get("serverPortHTTPS"));         // 8443 → HTTP/2
}
```

- Creates an HTTP redirector on `serverPortHTTP` (8080) that sends 301 redirects to HTTPS
- Creates the HTTP/2 secure server on `serverPortHTTPS` (8443) using `http2.createSecureServer()` with TLS key and cert from CONFIG

## Legacy HTTP server start

**File:** `src/main-http-server.ts:595-598`

```typescript
start() {
  var server = this.server;
  server.listen(process.env.PORT || CONFIG.get("serverPortHTTP"));
}
```

Single HTTP listener on `process.env.PORT || serverPortHTTP` (default 8080).

## Request handling flow

Both server variants follow the same pattern on each request:

```
Incoming request
  │
  ▼
Check global.get("backendAvailable")?
  │
  ├─ Yes (project config.json has "backend" key)
  │     │
  │     ├─ Load interceptors from CONFIG.get("backend").interceptors
  │     ├─ Match request path against CONFIG.get("backend").routes
  │     │
  │     ├─ Route matched?
  │     │   ├─ Yes → Instantiate route.microservice + ".Microservice"
  │     │   │         via New(microServiceClassFactory, { ...CONFIG values })
  │     │   └─ No  → Fall through to HTTPServerResponse / HTTP2ServerResponse
  │     │
  │     └─ Response class serves file via FileDispatcher
  │
  └─ No (no backend config)
        │
        └─ HTTPServerResponse / HTTP2ServerResponse
              └─ FileDispatcher resolves <documentRoot>/<path>
```

### Key files

| File | Role |
|------|------|
| `src/qcobjects-http2-server.ts` | Server bootstrap — chooses HTTP vs HTTP/2 |
| `src/qcobjects-http-server.ts` | Legacy HTTP bootstrap |
| `src/qcobjects-gae-http-server.ts` | GAE-compatible bootstrap |
| `src/main-http2-server.ts` | HTTP2Server, HTTP2ServerResponse, HTTP2ServerRequest |
| `src/main-http-server.ts` | HTTPServer, BackendMicroservice, HTTPServerResponse |
| `src/main-http-gae-server.ts` | GAE-compatible server classes |
| `src/main-file.ts` | FileDispatcher — filesystem resolution |
| `src/defaultsettings.ts` | All CONFIG defaults + config.json loading + plugin autodiscovery |
| `src/common-pipelog.ts` | PipeLog logging utility |

## Template-generated app scripts

Running `qcobjects create myapp --pwa` generates a `package.json` with these relevant scripts:

| Script | Command | Purpose |
|--------|---------|---------|
| `start` | `npm run createcert && npm run serve` | Full launch (generate TLS cert then serve) |
| `serve` | `qcobjects-server` | Start HTTP/2 server |
| `http-server` | `qcobjects-http-server` | Start legacy HTTP server |
| `createcert` | `qcobjects-createcert` | Generate self-signed TLS certificate |
| `prestart` | `npm run publish:web` | Build before launching |

The recommended workflow: `npm start` → generates a self-signed cert (if needed) → builds the web assets → starts the HTTP/2 server.
