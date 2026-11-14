---
source: https://developers.cloudflare.com/containers/api/durable-object-container/
---

# Durable Object Container API

`this.ctx.container` inside any Durable Object class with a container binding gives direct control over the container process.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async start() {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured for this Durable Object");
		}
		if (!container.running) {
			// With the `default` scheduling policy, call `container.start()` without options.
			container.start({
				image: container.images.base,
				enableInternet: false,
			});
			await this.ctx.storage.put("lastStartedAt", Date.now());
		}
	}

	async scheduleStart(timestamp) {
		await this.ctx.storage.setAlarm(timestamp);
	}

	async alarm() {
		await this.start();
	}
}
```

## Options / Props

### Attributes

| Name | Type | Default | Description |
|------|------|---------|-------------|
| images | read-only map | — | (durable_object policy only) Generated from the `images` field of the Wrangler configuration; each key holds a digest-pinned reference. Pass a value as `image` to `start()`. |
| running | boolean | — | `true` when the container is running. Does not confirm readiness to accept requests. |

### Methods

| Name | Signature | Description |
|------|-----------|-------------|
| start | `start(options?)` returns `void` | Boots the container and returns once options validate, before the container is ready. Use `monitor()` to catch later failures. `options` is required under `durable_object` policy and optional under `default`. |
| inspect | `inspect(): Promise<ContainerInfo \| null>` | `null` when no container runs (including after a failed start or `destroy()`); else `{ image, labels }`. `image` is an empty string while starting and for a container restored from `containerSnapshot`. |
| exec | `exec(cmd: string[], options?: ContainerExecOptions): Promise<ExecProcess>` | Starts another process in an already-running container (waits for one still starting; does not start a stopped one). No shell is involved. |
| snapshotContainer | `snapshotContainer(options: ContainerSnapshotOptions): Promise<ContainerSnapshot>` | (durable_object policy only) Point-in-time snapshot of the writable root filesystem. Not memory, processes, or separately mounted filesystems. Pass `{}` when unnamed. |
| destroy | `destroy(error?: any): Promise<void>` | Stops the container; optional reason. `monitor()` rejects with the value passed. |
| signal | `signal(signal: number): void` | Sends a POSIX signal number such as `15` (SIGTERM) or `9` (SIGKILL). |
| setInactivityTimeout | `setInactivityTimeout(durationMs: number \| bigint): Promise<void>` | How long the container keeps running after its Durable Object becomes inactive. Must be > 0 and at most 6 hours (`21600000`). |
| getTcpPort | `getTcpPort(port: number): Fetcher` | Fetcher for HTTP (`.fetch()`) or TCP (`.connect()`) to a container port. |
| monitor | `monitor(): Promise<void>` | Settles when the container stops. |
| interceptOutboundHttp | `interceptOutboundHttp(addr: string, binding: Fetcher): Promise<void>` | Routes outbound HTTP matching a hostname, hostname glob, IP, IP:port, or CIDR through a Fetcher. |
| interceptAllOutboundHttp | `interceptAllOutboundHttp(binding: Fetcher): Promise<void>` | Routes all outbound HTTP on port 80. |
| interceptOutboundHttps | `interceptOutboundHttps(addr: string, binding: Fetcher): Promise<void>` | Routes outbound HTTPS (port 443 by default; `host:port` for another) matching a hostname or glob. |

### `start()` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| env | Record<string, string> | — | Environment variables for the container. Processes started with `exec()` do not receive them (except `PATH`). |
| entrypoint | string[] | — | Command and arguments to run. |
| enableInternet | boolean | — | Required when `options` is passed. Whether outbound Internet access is allowed. |
| image | string | — | (durable_object policy only) Required unless `containerSnapshot` is passed. The `cloudflare/debian-trixie` managed image or a value from `ctx.container.images`. |
| instance | string \| object | `"lite"` | (durable_object policy only) `"lite"`, `"standard-1"`, `"standard-2"`, `"standard-3"`, `"standard-4"`, or `{ vcpu, memoryMib, diskMb }` (positive integers; `memoryMib` in mebibytes, `diskMb` in megabytes). |
| containerSnapshot | ContainerSnapshotRestoreParams | — | (durable_object policy only) Snapshot handle (or an object with its `id`) to restore. Cannot be combined with `image`. |
| labels | Record<string, string> | — | Up to 10 labels returned by `inspect()`. Names 1 to 16 bytes; values up to 64 bytes; no control characters. |

### `exec()` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| stdin | ReadableStream \| "pipe" | closed (EOF) | `"pipe"` exposes a writable `stdin` on the process. |
| stdout | "pipe" \| "ignore" | `"pipe"` | Capture or discard standard output. |
| stderr | "pipe" \| "ignore" \| "combined" | `"pipe"` | `"combined"` merges into stdout (requires `stdout: "pipe"`; ordering between the two is not guaranteed). |
| cwd | string | — | Working directory. |
| env | Record<string, string> | — | Variables for the process. Nothing from `start()` or the image is inherited except `PATH`. |
| user | string | image user | Numeric `uid:gid`. |
| signal | AbortSignal | — | Aborting sends `SIGKILL`; an already-aborted signal makes `exec()` throw `AbortError`. |
| pty | boolean \| { cols?: number; rows?: number } | — | Attach to a pseudo-terminal (`true` is 80x24). With `pty`, `stdin` defaults to `"pipe"` and `stderr` is `"combined"`. |

### `ExecProcess`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| stdin | WritableStream \| undefined | — | Present when `stdin` is `"pipe"`. |
| stdout | ReadableStream \| undefined | — | Present when piped. |
| stderr | ReadableStream \| undefined | — | Present when piped separately. |
| pid | number | — | Process identifier. |
| isPty | boolean | — | Whether attached to a pseudo-terminal. |
| exitCode | Promise<number> | — | Resolves on exit; nonzero codes resolve normally. |
| output() | Promise<ExecOutput> | — | Buffered `{ stdout, stderr, exitCode }` (`ArrayBuffer`s). Callable once. |
| kill(signal?) | void | `15` | Queues a signal (1 through 64). |
| resize(cols, rows) | void | — | Resizes the pty; each value 1 through 65535. |

### Example: exec

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async runCommand() {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured for this Durable Object");
		}
		if (!container.running) {
			throw new Error("Container is not running");
		}

		// Runs inside the container, never on the host.
		const process = await container.exec(["node", "--version"]);
		const output = await process.output();

		return {
			pid: process.pid,
			exitCode: output.exitCode,
			stdout: new TextDecoder().decode(output.stdout),
		};
	}
}
```

### Example: getTcpPort and monitor

Adapted (not in the official docs): wrapped in a method with `initialState` defined (the source fragment used an undefined variable outside a function).

```js
import { DurableObject } from "cloudflare:workers";

export class MyDurableObject extends DurableObject {
	async setInitialState() {
		const initialState = JSON.stringify({ ready: true });
		const port = this.ctx.container.getTcpPort(8080);
		const res = await port.fetch("http://container/set-state", {
			body: initialState,
			method: "POST",
		});
		return res.status;
	}
}
```

```js
import { DurableObject } from "cloudflare:workers";

class MyDurableObject extends DurableObject {
	startAndMonitor() {
		const container = this.ctx.container;
		// With the `default` scheduling policy, call `container.start()` without options.
		container.start({
			image: container.images.base,
			enableInternet: false,
		});
		this.ctx.waitUntil(
			container
				.monitor()
				.then(() => console.log("Container exited"))
				.catch((error) => console.error("Container errored", error)),
		);
	}
}
```

### Example: inactivity timeout

```js
import { DurableObject } from "cloudflare:workers";

const INACTIVITY_TIMEOUT_MS = 10 * 60 * 1000;

export class MyDurableObject extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
		const container = ctx.container;
		if (container?.running) {
			void ctx.blockConcurrencyWhile(() =>
				container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS),
			);
		}
	}

	async ensureRunning() {
		const container = this.ctx.container;
		if (!container) {
			throw new Error("No container is configured for this Durable Object");
		}
		if (!container.running) {
			container.start({
				// `cloudflare/debian-trixie` requires the `durable_object` scheduling policy.
				image: "cloudflare/debian-trixie",
				entrypoint: ["sleep", "infinity"],
				enableInternet: false,
			});
			await container.setInactivityTimeout(INACTIVITY_TIMEOUT_MS);
		}
	}
}
```

### Example: snapshot and outbound intercept

Adapted (not in the official docs): the source fragments use `await` and `this` outside any method and an undefined `MyWorker`; they are wrapped in methods and a minimal `MyWorker` entrypoint is added.

```js
import { DurableObject, WorkerEntrypoint } from "cloudflare:workers";

export class MyWorker extends WorkerEntrypoint {
	async fetch(request) {
		return new Response(`intercepted: ${this.ctx.props.message}`);
	}
}

export class MyDurableObject extends DurableObject {
	async snapshot() {
		const snapshot = await this.ctx.container.snapshotContainer({
			name: "before-upgrade",
		});
		return snapshot;
	}

	async interceptOutbound() {
		const worker = this.ctx.exports.MyWorker({ props: { message: "hello" } });

		// Match a specific hostname
		await this.ctx.container.interceptOutboundHttp("api.example.com", worker);

		// Match a hostname glob pattern
		await this.ctx.container.interceptOutboundHttp("*.example.com", worker);

		// Match an IP:port
		await this.ctx.container.interceptOutboundHttp("15.0.0.1:80", worker);

		// Match an IPv4 CIDR range. Register an IPv6 range separately.
		await this.ctx.container.interceptOutboundHttp("203.0.113.0/24", worker);
	}
}
```

## Notes

- `start()` throws `Error` when the container is already running; `TypeError` when both `image` and `containerSnapshot` are set, either is empty, or `instance` names an unknown type; `RangeError` for an invalid custom `instance`; `Error` for label-limit violations, env names containing `=`, or env names/values containing a null character. Under `durable_object` policy, `monitor()` rejects when the container starts without `image` or `containerSnapshot`.
- `exec()` runs the executable directly: no pipes, redirects or expansion. Use `["bash", "-lc", "<COMMAND>"]` (or `["sh", "-c", "<COMMAND>"]` when only a POSIX shell exists) for shell syntax. Command examples run inside the container, never on the host.
- Added to the example above (not in the official docs): the leading `// Runs inside the container, never on the host.` comment.
- `user` needs both IDs (`"1000:1000"`): a bare user ID runs as root and a name makes `exec()` reject. In a deployed `durable_object`-policy container `user` does not restrict the process (same capabilities as root; it only sets file ownership). Under the `default` policy other users have no capabilities and file permissions apply.
- `exec()` has no built-in timeout. `kill()` and `signal` reach only the started process, not its children; `output()` waits for them. Aborting or killing after the process has exited raises an uncaught `internal error`; do not pass `AbortSignal.timeout()` or `request.signal` directly, use an `AbortController` and stop callers once `exitCode` resolves. Canceling the originating request does not stop the process (a client retry runs a second copy). To stop on client disconnect, enable the `enable_request_signal` compatibility flag and call the Durable Object via `fetch()`; RPC methods get no request signal.
- `output()` buffers everything in Durable Object memory (counts toward the memory limit) and throws `TypeError` if called twice or after a stream is consumed; stream large output instead (see execute-commands.md). Workers types declare the streams `| null`; test truthiness.
- `exec()` throws when the container is not running, `TypeError` for empty `cmd`, invalid modes, `stderr: "combined"` with `stdout: "ignore"`, or `pty` with another `stderr`; `AbortError` for an already-aborted signal. `kill()` throws `RangeError` outside 1 to 64; `resize()` throws `TypeError` without a pty and `RangeError` out of range.
- `setInactivityTimeout()` is per Durable Object instance; a restarted instance (for example after deploy) has none, so set it after `start()` and again in the constructor when already running. Without it Cloudflare stops the container shortly after the Durable Object goes inactive. Zero or less throws `TypeError`; over 6 hours rejects.
- `monitor()` resolves on exit code `0` or on `destroy()` with no value; rejects with an `Error` carrying `exitCode` for other codes, with the `destroy()` value if given, or with a description otherwise. A pending `monitor()` prevents eviction for up to 15 minutes. It does not survive a Durable Object restart; call it again if `running` is `true` at startup. Throws when the instance has no container.
- `snapshotContainer()` throws `Error` when not running and `TypeError` when `options` is omitted. There is no list method, so store the returned `id`. Snapshots are immutable with an implicit 30-day TTL refreshed on restore; a container restored from one runs its entrypoint again (see snapshots.md).
- Intercepts: shared limit of 128 entries per container (hostname or glob, including `*`, uses 2; IP, IP:port or CIDR uses 1; `interceptAllOutboundHttp()` uses 2; at most 64 hostname targets or 128 IP/CIDR targets). Re-registering a target replaces its handler and uses no extra entries; intercepts last until the container stops and cannot be removed. Overflow throws `You can't configure more than 128 egress interceptors`. With `enableInternet: false` only intercepted hostnames resolve (a `*` target or `interceptAllOutboundHttp()` makes every hostname resolve); other lookups time out. `interceptAllOutboundHttp()` covers only port 80; add `interceptOutboundHttps("*")` for HTTPS. Register hostname intercepts before `interceptAllOutboundHttp()`. HTTPS interception requires the container to trust `/etc/cloudflare/certs/cloudflare-containers-ca.crt`.
- Existing applications that use the deprecated `Container` class from `@cloudflare/containers` migrate to this API; see api-comparison.md (official migration guide, updated 2026-11-09).
- Source: https://developers.cloudflare.com/containers/api/durable-object-container/ (cloudflare-docs production `34d908a`, fetched 2026-11-14).
- Corrected from the official docs: the `getTcpPort`, `snapshotContainer` and `interceptOutboundHttp` fragments are wrapped in classes and methods so they run; `MyWorker` is a minimal entrypoint (its `ctx.props` usage is illustrative) and must be exported from the Worker entry module for `ctx.exports` to expose it.
- Adapted from the official docs: the request-signal example, the TCP `connect()` fragment and the TypeScript copies are omitted (the former lacked the `cloudflare:workers` import; the latter used undefined variables outside a function).

## Related

- [Container class (deprecated)](./container-class.md)
- [API comparison](./api-comparison.md)
- [Execute commands](./execute-commands.md)
- [Snapshots](./snapshots.md)
- [Outbound traffic](./outbound-traffic.md)
- [Scheduling policy](./scheduling-policy.md)
