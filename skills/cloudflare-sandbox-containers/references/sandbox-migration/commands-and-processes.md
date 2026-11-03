---
source: https://developers.cloudflare.com/sandbox/sdk/migrate/commands/, https://developers.cloudflare.com/sandbox/sdk/migrate/background-processes/, https://developers.cloudflare.com/sandbox/sdk/migrate/terminals/, https://developers.cloudflare.com/sandbox/sdk/migrate/code-interpreter/
---

# Migrating commands, processes, terminals and the code interpreter

Replace 0.12 `exec()`, `execStream()`, sessions, timeouts, `startProcess()` and `Process` methods, `terminal()` / `SandboxAddon`, and `runCode()` with `container.exec()` and code in your Durable Object. Aggregated: the official terminal, code-interpreter and process pages contain several hundred lines of replacement library code that this skill does not reproduce; use the official URLs above for those.

## Signature / Usage

All commands below run inside the sandbox container, never on the host. 0.12 versus 1.0 for a command with `exec()`: each 1.0 call starts one process with no shell; set `cwd` and `env` on every call. The snippets are bodies of methods on your Durable Object class (`this.container` and `ENV` are defined in plan-and-move.md).

```ts
const process = await this.container.exec(["npm", "test"], {
	cwd: "/workspace",
	env: ENV,
});
const result = await process.output();

if (result.exitCode !== 0) {
	console.error(new TextDecoder().decode(result.stderr));
}
```

Timeout (replaces the `timeout` option; the command and its process group stop):

```ts
const process = await this.container.exec(
	["timeout", "--kill-after=5", "60", "bash", "-c", "npm test"],
	{ cwd: "/workspace", env: ENV },
);
const result = await process.output();
// 124 or 137 means the command ran longer than 60 seconds
const timedOut = result.exitCode === 124 || result.exitCode === 137;
```

Stream output (replaces `execStream()`):

```ts
const process = await this.container.exec(["npm", "test"], {
	cwd: "/workspace",
	env: ENV,
	stderr: "combined",
});

return new Response(process.stdout, {
	headers: { "Content-Type": "text/event-stream" },
});
```

Sessions become an options object passed to every call.

Adapted (not in the official docs): the install step's exit code is checked, so a failed `npm ci` does not fall through to the test run; see Notes.

```ts
const build = { cwd: "/workspace/app", env: { ...ENV, CI: "1" } };

const install = await this.container.exec(["npm", "ci"], build);
if ((await install.exitCode) !== 0) {
	throw new Error("npm ci failed");
}

const test = await this.container.exec(["npm", "test"], build);
const result = await test.output();
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `exec("cmd string")` | 0.x call | — | `container.exec(["bash", "-c", "..."])` for pipes, redirects and variables; plain executables as arrays. |
| `execStream()`, `stream`, `onOutput` | 0.x call | — | Return `process.stdout` as a `Response` body with `Content-Type: text/event-stream`. |
| `createSession()`, `getSession()`, `deleteSession()`, `enableDefaultSession`, `isolation` | 0.x call | — | An options object (`cwd`, `env`) per call; `cd` and `export` last only until the command exits. Use separate sandbox names for isolation. |
| `timeout`, `commandTimeoutMs` | 0.x option | — | Run under GNU coreutils `timeout`; or an `AbortSignal` (see durable-object-container.md in the containers category). |
| `startProcess()` | 0.x call | — | `startProcess(id, argv)` returning `false` when the ID is already used (even for an ended process until its directory is deleted). |
| `Process.getStatus()`, `getProcess()` | 0.x call | — | `status(id)`, `undefined` for unknown IDs. |
| `getProcessLogs()`, `streamProcessLogs()` | 0.x call | — | `logs(id, stream)`, `follow()`. |
| `Process.kill()`, `killProcess()` | 0.x call | — | `stop(id)`: `SIGTERM` to the process group (change `TERM` to `KILL` for processes that ignore it). |
| `killAllProcesses()` | 0.x call | — | `stop()` for each process `listProcesses()` returns. |
| `onStart` | 0.x callback | — | Your code after `startProcess()` returns `true`. |
| `onOutput` | 0.x callback | — | `follow()`, or `logs()` for output so far. |
| `onExit` | 0.x callback | — | The `process.ended` branch of the one-minute alarm; `waitForExit()` for the exit at once. |
| `onError` | 0.x callback | — | A `startProcess()` call that throws or returns `false`. |
| `terminal()`, `session.terminal()`, `proxyTerminal()`, `SandboxAddon` | 0.x call | — | tmux sessions: `exec(["tmux", "new-session", "-A", "-s", session], { pty: { cols, rows }, env: { ...ENV, TERM: "xterm-256color" }, cwd: "/workspace", signal })` behind a WebSocket handler; xterm.js on the page. |
| `runCode()`, `createCodeContext()`, `runCodeStream()` | 0.x call | — | Python: an IPython kernel your Durable Object starts per context (on its own port); standalone code: a new `python3` process per call; JavaScript: a Dynamic Worker; streaming: a `python3 -` command and its `stdout`. |

## Notes

- Running commands: `exec()` starts in `/` (even if the image sets `WORKDIR`) and inherits only `PATH` from `start()` env; pass `cwd: "/workspace"` and `env` to match 0.12. A non-zero exit code does not throw. A missing executable throws (such as ``Command `npm` was not found in the container``), whereas 0.12 `bash` returned exit code 127; commands through `bash -c` still return 127. Call `ensureRunning()` first in each method.
- `stderr: "combined"` can reorder lines; use `["sh", "-c", "npm test 2>&1"]` to keep order. Keep `Content-Type: text/event-stream` or the response may arrive only at process exit. The 1.0 body is raw output, not JSON events: read it with `fetch()` and a stream reader, not `EventSource` (see the sandbox category for "stream command output").
- A 0.12 timeout threw `CommandError` ("Command timeout after 60000ms") and left the command running; in 1.0 the command stops. `exec()` resolves when the process starts, so await `exitCode` before dependent steps. Put dependent steps in one command, such as `["bash", "-c", "cd app && npm ci && npm test"]`.
- Background processes: your Durable Object keeps a directory per process in the container, which `exec()` starts with output ignored so the process outlives the request. Each ID becomes a directory name (use path-safe characters; `crypto.randomUUID()` replaces generated IDs). 0.x replaced an existing record; 1.0 returns `false`. A `timeout` option did not stop background processes in 0.12; start them under `timeout`. `python3 -m http.server` exits at startup in a 1.0 container (hostname longer than a DNS label); see local-dev.md in the containers category. Merge process checks into your single `alarm()` handler (a Durable Object has one alarm). 1.0 does not see processes 0.12 started, so start those you need after the switch.
- Terminals: tmux is added to the image (`apt-get install ... tmux`); a reconnected page shows the redrawn tmux screen rather than 256 KiB of replay; when the shell exits the socket closes with code 1000 and a reason such as `Terminal closed with code 0`; detaching with `CTRL + B` then `D` also closes with 1000; browsers sharing a session share one screen. Terminal WebSockets stop receiving data at the in-place switch without a close event: ask people to reload or add a read timeout. 0.12 shells inherited `envVars` and image `ENV`; `exec()` inherits only `PATH`, so add other variables to `ENV`.
- Code interpreter: 1.0 has no interpreter. A `runCode()` without `context` used a per-language default context, so plain calls shared variables; if your code relies on that, run a kernel per context. The kernel image adds `python3-ipython`, `python3-matplotlib`, `python3-numpy`, `python3-pandas` (the 0.12 python image included IPython, matplotlib, NumPy and pandas).
- Adapted from the official docs: the page's `sandbox.startProcess("dev", [...])` call is omitted because `sandbox` and the `startProcess()` helper (a Durable Object method plus helper scripts) are defined only in the official "Run background processes" guide, which this skill does not reproduce.
- Adapted from the official docs: the sessions example only awaited `install.exitCode` and then ran the tests regardless of the result; it now throws on a non-zero exit code (a non-zero exit does not reject `exitCode`).
- Sandboxes run untrusted or generated code: keep `enableInternet` false unless needed and validate any request-derived sandbox names or process IDs.

## Related

- [API map](./api-map.md)
- [Plan and move](./plan-and-move.md)
- [Files and storage](./files-and-storage.md)
- [Networking and other features](./networking-and-other.md)
