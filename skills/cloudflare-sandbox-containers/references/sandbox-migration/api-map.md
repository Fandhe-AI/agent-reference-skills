---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/api-map/
---

# Sandbox SDK 0.x API map

Maps each public API of `@cloudflare/sandbox` 0.12 to its 1.0 replacement: a 1.0 class, a platform API, another Cloudflare product, or code you write. In the tables `container` is `this.ctx.container` in your Durable Object and `files` is a `Files` instance. Condensed from the official table: replacement names are verbatim; the official Notes column is folded into the Notes section below where it matters.

## Signature / Usage

Snippet taken from https://developers.cloudflare.com/sandbox/sdk/migrate/commands/ (a typical 0.12 to 1.0 call mapping, `exec()` to `container.exec()`; runs inside the sandbox container, never on the host):

```ts
const result = await sandbox.exec("npm test");

if (!result.success) {
	console.error(result.stderr);
}
```

Adapted (not in the official docs): comment added; `ENV` is the constants object and `this.container` the getter defined in plan-and-move.md.

```ts
// Inside a method of your Durable Object class (see plan-and-move.md for `ENV` and `this.container`)
const process = await this.container.exec(["npm", "test"], {
	cwd: "/workspace",
	env: ENV,
});
const result = await process.output();

if (result.exitCode !== 0) {
	console.error(new TextDecoder().decode(result.stderr));
}
```

## Options / Props

Kind values: Native (call `container` or a platform API directly), Package (a class from `@cloudflare/sandbox` 1.0), Pattern (write it yourself), Product (another Cloudflare product), Removed (not needed).

### Class, identity, lifetime

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `class X extends Sandbox`, `export { Sandbox }` | Removed | — | `class X extends DurableObject`. |
| `getSandbox(ns, id, options)` | Native | — | `env.NS.getByName(id)`; validate names yourself. |
| `normalizeId`, `setSandboxName()` | Removed | — | Lowercase names yourself. |
| `sleepAfter`, `setSleepAfter()` | Native | — | `container.setInactivityTimeout(ms)`. |
| `keepAlive`, `setKeepAlive()` | Pattern | — | An alarm that sends the container a request while work remains. |
| `renewActivityTimeout()` | Native | — | Any request to the Durable Object. |
| `containerTimeouts`, `setContainerTimeouts()` | Removed | — | `AbortSignal`. |
| `transport`, `setTransport()`, `SANDBOX_TRANSPORT` | Removed | — | Not needed. |
| `labels`, `setLabels()` | Native | — | `container.start({ image, enableInternet, labels })`. |
| `configure()` | Removed | — | Options on each call. |
| `setEnvVars()`, class `envVars` | Native | — | `container.start({ env })` or `container.exec(argv, { env })`. |
| Class `entrypoint`, `enableInternet` | Native | — | `container.start({ entrypoint, enableInternet })`; `enableInternet` defaults to `false` (was `true` in 0.12). |
| Class `defaultPort`, `requiredPorts` | Native | — | `container.getTcpPort(port)`. |
| `start()` | Native | — | `container.start({ image, enableInternet })`; does not wait for the container. |
| `startAndWaitForPorts()`, `waitForPort()` | Pattern | — | Retry `getTcpPort(port).fetch()`. |
| `stop()`, `destroy()` | Native | — | `container.signal()`, `container.destroy()`. |
| `getState()` | Native | — | `container.running`, `container.monitor()`. |
| `getContainerPlacementId()` | Pattern | — | Read `CLOUDFLARE_PLACEMENT_ID` from `/proc/1/environ` with `container.exec()`. |
| `onStart`, `onStop`, `onError`, `onActivityExpired` | Pattern | — | Your code around `start()` and `monitor()`. |
| `schedule()`, `listSchedules()`, `getSchedule()`, `deleteSchedules()`, `alarm()` | Native | — | Durable Object alarms (one per object). |
| `fetch()`, `containerFetch()` | Native | — | `container.getTcpPort(port).fetch()`. |

### Commands and sessions

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exec(command, options)` | Native | — | `container.exec(argv, options)`; `success` is `exitCode === 0`. |
| `stream`, `onOutput`, `onComplete`, `onError` | Native | — | Read `stdout` and `stderr`, await `exitCode`. |
| `execStream()` | Native | — | The `stdout` stream from `container.exec(argv)`; set `Content-Type: text/event-stream`. |
| `timeout`, `signal` | Native | — | Run under `timeout`, or pass `signal` from a timer you clear; exit code 124 or 137 means time passed. |
| `cwd`, `env` | Native | — | Same options; pass `cwd: "/workspace"` and `env` (0.12 set them). |
| `encoding` | Removed | — | Decode bytes yourself. |
| `isExecResult()`, `isProcess()`, `isProcessStatus()` | Removed | — | Not needed. |
| `createSession()`, `getSession()`, `deleteSession()` | Removed | — | `cwd` and `env` on each call. |
| `enableDefaultSession` | Removed | — | `cwd` and `env` on each call; `cd` and `export` do not carry over. |
| `isolation` | Removed | — | Separate sandboxes. |
| `commandTimeoutMs` | Removed | — | `timeout` in each command. |

### Processes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `startProcess()` | Pattern | — | `startProcess(id, argv)` writing process ID, output and exit code to files. |
| `Process.getStatus()`, `getProcess()`, `listProcesses()` | Pattern | — | `status()` and a `listProcesses()` over the process directories. |
| `getProcessLogs()`, `Process.getLogs()` | Pattern | — | `logs()` for each stream. |
| `streamProcessLogs()` | Pattern | — | `follow()`, streaming `tail -F --pid`; named `stdout`, `stderr`, `exit` events. |
| `Process.waitForLog()` | Pattern | — | `waitForLog()` polling log files with `grep -E` (escape 0.12 string patterns). |
| `Process.waitForExit()` | Pattern | — | `waitForExit()` calling `status()` until the process ends. |
| `Process.waitForPort()` | Pattern | — | Retry `getTcpPort(port).fetch()`. |
| `Process.kill()`, `killProcess()` | Pattern | — | `stop()` sending `SIGTERM` to the process group (0.12 sent `SIGKILL` 5 seconds later). |
| `killAllProcesses()` | Pattern | — | `stop()` for each process `listProcesses()` returns. |
| `cleanupCompletedProcesses()`, `autoCleanup` | Removed | — | Not needed (did nothing in 0.12); delete ended process directories with `rm -rf`. |
| `onStart`, `onOutput`, `onError` | Pattern | — | Code after `startProcess()`, `follow()`, and a start that throws or returns `false`. |
| `onExit` | Pattern | — | An alarm that checks each process every minute. |

### Files

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `readFile()`, `readFileStream()` | Package | — | `files.readFile()` returns a `Response` (bytes, not server-sent events). |
| `writeFile()` | Package | — | `files.writeFile()`; `mkdir()` parents first; pass bytes instead of base64. |
| `mkdir()` | Package | — | `files.mkdir()`. |
| `deleteFile()` | Package | — | `files.remove()` (directories with `recursive: true`). |
| `renameFile()`, `moveFile()` | Package | — | `files.rename()`; fails with `EXDEV` across filesystems; does not move into an existing directory like `mv`. |
| `listFiles()` | Package | — | `files.readDirectory()`; one level; includes hidden entries. |
| `listFiles({ recursive: true })` | Pattern | — | Walk `readDirectory()`. |
| `exists()` | Package | — | `files.stat()`; catch `SandboxFileError` with `ENOENT`. |
| File metadata | Package | — | `files.stat()`, `files.lstat()`. |
| `watch()`, `checkChanges()` | Pattern | — | `inotifywait -m` through `container.exec()`. |
| `collectFile()`, `streamFile()` | Removed | — | The `Response` body. |
| `parseSSEStream()`, `responseToAsyncIterable()`, `asyncIterableToSSEStream()` | Removed | — | The `ReadableStream` objects on `ExecProcess`. |
| `WriteFileResult`, `ReadFileResult`, and other result types | Removed | — | `void`, `Response`, or `SandboxFileStat`; failures throw `SandboxFileError`. |

### Ports, preview URLs, tunnels

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exposePort()`, `unexposePort()`, `getExposedPorts()`, `isPortExposed()` | Pattern | — | Methods over the 0.12 `portTokens` key; URLs 0.12 issued keep working. |
| `validatePortToken()` | Pattern | — | A constant-time check of the stored token. |
| `proxyToSandbox()`, `SandboxEnv` | Pattern | — | Route `<port>-<name>-<token>` hostnames to `getByName()`. |
| `wsConnect(request, port)` | Native | — | `container.getTcpPort(port).fetch(request)`; bridge the WebSocket to keep the container running. |
| `tunnels.get(port)`, `tunnels.list()`, `tunnels.destroy(port)` | Pattern | — | `openTunnel()`, `listTunnels()`, `closeTunnel()` running `cloudflared`; needs `enableInternet: true`. |
| `tunnels.get(port, { name })` | Pattern | — | `resumeTunnel()` and `deleteTunnel()` over the 0.12 `tunnels` key. |
| `CLOUDFLARE_API_TOKEN` | Pattern | — | The same secret; keep it while you run or delete 0.12 named tunnels. |
| `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_TUNNEL_ACCOUNT_ID`, `CLOUDFLARE_ZONE_ID` | Removed | — | Not needed. |

### Terminals

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `terminal()`, `session.terminal()` | Pattern | — | `getByName(name).fetch(request)` and a handler attaching a tmux client with `exec(argv, { pty })`. |
| `proxyTerminal()` | Pattern | — | Same `fetch()` call with the session in the query string. |
| `cwd` and `env` of a terminal session | Pattern | — | `-c` and `-e` options of `tmux new-session`. |
| `shell` option | Pattern | — | A command after the session name in the tmux command. |
| `@cloudflare/sandbox/xterm`, `SandboxAddon`, `SandboxAddonOptions`, `ConnectionState`, `ConnectionTarget` | Pattern | — | xterm.js with a WebSocket the page reopens; send `{"type":"ready"}`. |
| Terminal reconnect and replay | Pattern | — | tmux keeps the session and redraws the screen. |

### Outbound network and Git

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `allowedHosts`, `deniedHosts`, `outbound`, `outboundByHost`, `outboundHandlers`, `outboundProxies`, `outboundProxy` | Pattern | — | A `WorkerEntrypoint` applying the rules in the 0.12 order; handlers take `(request, env, params)`. |
| `outboundByHost` handlers that read Workers bindings | Pattern | — | A `WorkerEntrypoint` for each hostname. |
| `interceptHttps` | Native | — | `container.interceptOutboundHttps("*", fetcher)` for every sandbox; add the certificate to the system bundle and set `NODE_EXTRA_CA_CERTS` and `REQUESTS_CA_BUNDLE`. |
| `setAllowedHosts()`, `setDeniedHosts()`, `allowHost()`, `denyHost()`, `removeAllowedHost()`, `removeDeniedHost()`, `setOutboundHandler()`, `setOutboundByHost()`, `setOutboundByHosts()`, `removeOutboundByHost()` | Pattern | — | Methods that update the `OUTBOUND_CONFIGURATION` key and register the entrypoint again. |
| `ContainerProxy` | Removed | — | Export your own entrypoint. |
| `gitCheckout()` | Pattern | — | `exec()` of `git clone --filter=blob:none` in `/workspace`. |

### Bucket mounts and backups

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `mountBucket()` with an S3 endpoint | Package | — | `S3Mount.mount()` with `S3Gateway` exported from your Worker. |
| `mountBucket()` with an R2 binding | Package | — | `S3Mount.mount()` with the R2 S3 endpoint; needs an R2 API token (1.0 cannot mount through a binding). |
| `prefix`, `readOnly`, `s3fsOptions` | Package | — | `keyPrefix` (no leading `/`), `access` (required), `s3fsOptions` (object). |
| `credentials`, `R2_*` and `AWS_*` variables | Package | — | `source.credentials`; not read from the environment. |
| `credentialProxy`, `provider` | Removed | — | Not needed. |
| `localBucket` | Package | — | `S3Mount` under `wrangler dev` with a local S3-compatible server (Wrangler 4.137.0 or later). |
| `unmountBucket()` | Package | — | `S3Mount.unmount()`; throws `S3_MOUNT_BUSY` while a process uses the path. |
| `BucketMountError`, `BucketUnmountError`, `InvalidMountConfigError`, `MissingCredentialsError`, `S3FSMountError` | Package | — | `SandboxS3MountError`; an invalid request throws `TypeError`. |
| `createBackup()`, `restoreBackup()` | Package | — | `DirectoryBackup` `backup()` and `restore()`; whole filesystem: `container.snapshotContainer()`. |
| `name`, `gitignore` | Package | — | `DirectoryBackup` options of the same names. |
| `excludes` | Package | — | `exclude` (`.gitignore` syntax). |
| `ttl` | Pattern | — | An expiry time stored in the bucket next to the backup. |
| `multipart`, `localBucket`, `compression` | Removed | — | Not needed. |
| `BACKUP_BUCKET` | Native | — | An R2 binding; pass its name as `binding` of `DirectoryBackup`. |
| `BACKUP_BUCKET_NAME`, `BACKUP_BUCKET_ENDPOINT`, R2 access keys | Removed | — | The R2 binding. |
| `BackupNotFoundError` | Package | — | `SandboxBackupError` with code `BACKUP_NOT_FOUND`. |
| `BackupExpiredError` | Pattern | — | The error your expiry check throws. |
| `InvalidBackupConfigError` | Removed | — | `TypeError`. |
| `BackupCreateError`, `BackupRestoreError` | Package | — | `SandboxFileError` or `SandboxBackupError`. |
| Backups made by 0.12 | Pattern | — | `unsquashfs` on `backups/<id>/data.sqsh`, then `backup()`. |

### Code interpreter, subpath packages, images, errors

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `runCode()`, `createCodeContext()`, `listCodeContexts()`, `deleteCodeContext()`, `CodeInterpreter` | Pattern | — | An IPython kernel for each context, or a Dynamic Worker for JavaScript. |
| `runCodeStream()`, `onStdout`, `onStderr`, `onResult` | Pattern | — | A command with `python3 -` and its `stdout`. |
| `@cloudflare/sandbox/opencode`, `createOpencode()`, `createOpencodeServer()`, `OpencodeOptions`, `OpencodeResult`, `OpencodeServer`, `OpencodeStartupError` | Pattern | — | `opencode serve` and an OpenCode SDK client. |
| `proxyToOpencode()`, `proxyToOpencodeServer()` | Pattern | — | `fetch()` in your Durable Object forwarding to the server port. |
| `@cloudflare/sandbox/openai`, `Shell`, `Editor`, `CommandResult`, `FileOperationResult` | Pattern | — | Your own `Shell` and `Editor`; `ShellResult` and `ApplyPatchResult` from `@openai/agents` replace the result types. |
| `@cloudflare/sandbox/bridge`, `bridge()`, `resolveWorkspacePath()`, `shellQuote()`, `BridgeConfig`, `BridgeEnv`, `WorkerHandlers` | Pattern | — | Your own Worker routes. |
| `WarmPool`, `WarmPoolConfig`, `PoolStats` | Removed | — | Start each sandbox when a request needs it. |
| `cloudflare/sandbox`, `-python`, `-opencode`, `-musl` images | Removed | — | Your own `linux/amd64` image; copy `sandbox-shim` for `Files`, `S3Mount`, `DirectoryBackup`. |
| `docker:dind-rootless` with `USER root` | Pattern | — | `docker:dind` with `--ip-forward=false`. |
| `ContainerUnavailableError`, `OperationInterruptedError`, `RPCTransportError`, `SessionTerminatedError` | Removed | — | Native errors from `container`. |
| `ProcessExitedBeforeReadyError`, `ProcessReadyTimeoutError` | Pattern | — | The results of your readiness check. |
| `isPlatformTransientError()`, `isDurableObjectCodeUpdateReset()` | Removed | — | `error.retryable` and `error.overloaded`. |
| `SandboxClient`, `BackupClient`, `CommandClient`, `FileClient`, `GitClient`, `InterpreterClient`, `PortClient`, `ProcessClient`, `UtilityClient` | Removed | — | `container` and `Files`. |
| `SANDBOX_LOG_LEVEL`, `SANDBOX_LOG_FORMAT` | Removed | — | Your own logs (the package does not log). |

## Notes

- Types: the official page also maps 0.12 types. Exec types (`BaseExecOptions`, `ExecOptions`, `StreamOptions`, `ExecResult`, `ExecEvent`, `ExecuteRequest`, `CommandExecuteResponse`, `CommandsResponse`) become `ContainerExecOptions`, `ExecProcess`, `ExecOutput` (generated by `wrangler types`); `PtyOptions` becomes `ContainerExecPtyOptions` (passed as `pty`). File types become `FileOperationOptions`, `MkdirOptions`, `RemoveOptions`, `FileContent`. Mount types become `S3MountRequest`. Backup types become `DirectoryBackupOptions`, `DirectoryBackupRecord`, `DirectoryRestoreOptions` (`DirectoryBackupRecord` adds `size`, `name`, `sha256`, `format` and drops `localBucket`; `restore()` returns nothing). Session, error-context and client types are removed; process, tunnel, watch, git and code-interpreter types become the types of your own methods.
- Condensed from the official table: its Notes column is dropped except the key behavioural differences kept in the Description above. The 0.12 `enableInternet` default was `true`; in 1.0 it must be passed to `start()`.
- Retry: the package retries nothing. Retry idempotent calls with a new stub when `error.retryable` is `true`, never when `error.overloaded` is `true`.
- The 0.x reference is not covered by this skill; see https://developers.cloudflare.com/sandbox/sdk/ for it.

## Related

- [Overview](./overview.md)
- [Plan and move](./plan-and-move.md)
- [Commands and processes](./commands-and-processes.md)
- [Files and storage](./files-and-storage.md)
- [Networking and other features](./networking-and-other.md)
