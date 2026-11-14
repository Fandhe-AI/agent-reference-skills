---
source: https://developers.cloudflare.com/containers/api/container-class/
---

# Container class

DEPRECATED. The `Container` class from `@cloudflare/containers` extends `DurableObject` and wraps the container runtime with routing, readiness checks, lifecycle hooks, and scheduling. It is available only with the `default` scheduling policy.

## Signature / Usage

```js
import { Container, getContainer } from "@cloudflare/containers";

export class SandboxContainer extends Container {
	defaultPort = 8080;
	requiredPorts = [8080, 9222];
	sleepAfter = "5m";
	envVars = {
		NODE_ENV: "production",
		LOG_LEVEL: "info",
	};
	entrypoint = ["npm", "run", "start"];
	enableInternet = false;
	pingEndpoint = "localhost/ready";
}

export default {
	async fetch(request, env) {
		return getContainer(env.SANDBOX_CONTAINER, "workspace-123").fetch(request);
	},
};
```

Install with `npm i @cloudflare/containers` (also `yarn add`, `pnpm add`, `bun add`).

Because the subclass is a Durable Object, `this.ctx.storage` (SQLite), `this.ctx.id`, alarms, and RPC methods are all available. Container disk is ephemeral by default; Durable Object storage persists across container restarts.

Adapted (not in the official docs): the `results` table is created before use (the source inserts into a table that is never defined).

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;

	async runAndPersist() {
		const res = await this.containerFetch("/run-task");
		const body = await res.text();
		this.ctx.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS results (value TEXT PRIMARY KEY)",
		);
		this.ctx.storage.sql.exec(
			"INSERT OR REPLACE INTO results (value) VALUES (?)",
			body,
		);
		return body;
	}
}
```

## Options / Props

### Class properties

Set as class fields on the subclass; they apply to every instance.

| Name | Type | Default | Description |
|------|------|---------|-------------|
| defaultPort | number | — | Port the container process listens on. `fetch()` and `containerFetch()` forward here unless `switchPort()` or the `port` argument says otherwise. |
| requiredPorts | number[] | — | Ports that must accept connections before the container counts as ready. Used by `startAndWaitForPorts()` when no `ports` argument is passed. |
| sleepAfter | string \| number | `"10m"` | Idle time before shutdown. A number of seconds, or a duration string such as `"30s"`, `"5m"`, `"1h"`. Activity resets the timer. |
| envVars | Record<string, string> | `{}` | Environment variables passed on every start. For per-instance values, pass `startOptions.envVars` to `startAndWaitForPorts()`. |
| entrypoint | string[] | — | Overrides the image's default entrypoint. |
| enableInternet | boolean | `true` | Whether the container may make outbound HTTP requests. |
| pingEndpoint | string | `"ping"` | Host and path used to health-check the container during startup. |

### Lifecycle hooks

| Name | Signature | Description |
|------|-----------|-------------|
| onStart | `onStart(): void \| Promise<void>` | Runs after the container has started. Use to log, seed data, or call `schedule()`. |
| onStop | `onStop(params: StopParams): void \| Promise<void>` | Runs after the process exits. `params.exitCode` is the exit code; `params.reason` is `'exit'` (process exited on its own) or `'runtime_signal'`. |
| onError | `onError(error: unknown): any` | Handles startup and port-check errors. Default implementation logs and re-throws. |
| onActivityExpired | `onActivityExpired(): Promise<void>` | Called when `sleepAfter` expires with no requests. Default calls `stop()`. |

### Request methods

| Name | Signature | Description |
|------|-----------|-------------|
| fetch | `fetch(request: Request): Promise<Response>` | Forwards the request to `defaultPort`, starting the container if needed. The only method that supports WebSocket proxying. |
| containerFetch | `containerFetch(request: Request, port?: number)` or `containerFetch(url: string \| URL, init?: RequestInit, port?: number)` | Sends an HTTP request straight to the container process. Call it (not `this.fetch()`) inside an overridden `fetch()`. No WebSocket support. |

### Start and stop

| Name | Signature | Description |
|------|-----------|-------------|
| startAndWaitForPorts | `startAndWaitForPorts(args?: StartAndWaitForPortsOptions): Promise<void>` or positional `(ports?, cancellationOptions?, startOptions?)` | Starts the container and waits until the target ports accept connections; resolves after `onStart()` has run. Port resolution order: explicit `ports`, then `requiredPorts`, then `defaultPort`. |
| start | `start(startOptions?: ContainerStartConfigOptions, waitOptions?: WaitOptions): Promise<void>` | Starts without waiting for all ports. For containers with no ports (batch or cron jobs). |
| waitForPort | `waitForPort(waitOptions: WaitOptions): Promise<number>` | Polls one port until it accepts connections; throws when the retry limit is reached. |
| stop | `stop(signal?: 'SIGTERM' \| 'SIGINT' \| 'SIGKILL' \| number): Promise<void>` | Sends a signal (default `SIGTERM`). Triggers `onStop()`. |
| destroy | `destroy(): Promise<void>` | Sends `SIGKILL`. Triggers `onStop()`. |

Option objects:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| args.ports | number \| number[] | — | Ports to wait for (`startAndWaitForPorts`). |
| args.startOptions / startOptions.envVars | Record<string, string> | — | Per-instance environment variables. |
| startOptions.entrypoint | string[] | — | Entrypoint override for this start only. |
| startOptions.enableInternet | boolean | — | Whether outbound internet access is allowed for this start. |
| cancellationOptions.abort | AbortSignal | — | Cancels startup. |
| cancellationOptions.instanceGetTimeoutMS | number | `8000` | Maximum time to get a container instance and issue the start command. |
| cancellationOptions.portReadyTimeoutMS | number | `20000` | Maximum time to wait for all ports to become ready. |
| cancellationOptions.waitInterval | number | `300` | Polling interval in milliseconds. |
| waitOptions.portToCheck | number | `defaultPort`, else the first `requiredPorts` entry, else a fallback port (`start()`); required for `waitForPort()` | Port to probe. |
| waitOptions.signal | AbortSignal | — | Cancels waiting. |
| waitOptions.retries | number | — | Maximum attempts before throwing. |
| waitOptions.waitInterval | number | — | Polling interval in milliseconds. |

### State and scheduling

| Name | Signature | Description |
|------|-----------|-------------|
| getState | `getState(): Promise<State>` | `status` is `'running'` (starting, not yet healthy), `'healthy'`, `'stopping'`, `'stopped'`, or `'stopped_with_code'`; plus `lastChange` (Unix ms) and optional `exitCode`. |
| renewActivityTimeout | `renewActivityTimeout(): void` | Resets the `sleepAfter` timer. Incoming requests do this automatically; call it from background work. |
| schedule | `schedule<T>(when: Date \| number, callback: string, payload?: T): Promise<Schedule<T>>` | Runs a class method later (`Date`, or seconds of delay). Returns `taskId`, `callback`, `payload`, `type` (`'scheduled'` or `'delayed'`), `time` (Unix seconds), `delayInSeconds`. |

### Utility functions

Exported alongside `Container`.

| Name | Signature | Description |
|------|-----------|-------------|
| getContainer | `getContainer<T>(binding: DurableObjectNamespace<T>, name?: string): DurableObjectStub<T>` | Stub for a named instance. `name` defaults to `cf-singleton-container`. |
| getRandom | `getRandom<T>(binding: DurableObjectNamespace<T>, instances?: number): Promise<DurableObjectStub<T>>` | Stub for a random instance out of `instances` (default `3`). For stateless workloads. |
| switchPort | `switchPort(request: Request, port: number): Request` | Copy of the request targeting another port while still using `fetch()` (keeps WebSocket support). |

### Example: lifecycle hook and idle stop

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	sleepAfter = "2m";

	async onActivityExpired() {
		const state = await this.getState();
		console.log("Container is idle, stopping it now", state.status);

		await this.stop();
	}
}
```

### Example: per-instance start and a scheduled recurring task

```js
import { getContainer } from "@cloudflare/containers";

export default {
	async scheduled(_event, env) {
		const container = getContainer(env.API_CONTAINER, "tenant-42");

		await container.startAndWaitForPorts({
			ports: [8080, 9222],
			startOptions: {
				envVars: {
					API_KEY: env.API_KEY,
					TENANT_ID: "tenant-42",
				},
			},
			cancellationOptions: {
				portReadyTimeoutMS: 30_000,
			},
		});
	},
};
```

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;

	async onStart() {
		await this.schedule(60, "healthReport");
	}

	async healthReport() {
		const state = await this.getState();
		console.log("Container status:", state.status);
		await this.schedule(60, "healthReport");
	}
}
```

### Example: overriding fetch and port-targeted requests

```js
import { Container } from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;

	async fetch(request) {
		const url = new URL(request.url);

		if (url.pathname === "/health") {
			return new Response("ok");
		}

		return this.containerFetch(request);
	}
}
```

```js
import { getContainer, switchPort } from "@cloudflare/containers";

export default {
	async fetch(request, env) {
		const container = getContainer(env.MY_CONTAINER);
		return container.fetch(switchPort(request, 9090));
	},
};
```

### Example: stateless pool

```js
import { getRandom } from "@cloudflare/containers";

export default {
	async fetch(request, env) {
		const container = await getRandom(env.WORKER_POOL, 5);
		return container.fetch(request);
	},
};
```

### Example: outbound interception

Static `outbound` and `outboundByHost` handlers route the container's outbound HTTP through Worker code. `ContainerProxy` must be exported from the Worker entry module.

```js
import {
	Container,
	ContainerProxy,
	getContainer,
} from "@cloudflare/containers";

export class MyContainer extends Container {
	defaultPort = 8080;
	enableInternet = true;

	static outboundByHost = {
		"blocked.example.com": () => {
			return new Response("Blocked", { status: 403 });
		},
	};

	static outbound = async (request, _env, ctx) => {
		console.log(`[${ctx.containerId}] outbound:`, request.url);
		return fetch(request);
	};
}

export { ContainerProxy };

export default {
	async fetch(request, env) {
		return getContainer(env.MY_CONTAINER).fetch(request);
	},
};
```

## Notes

- Deprecated: the `@cloudflare/containers` package is deprecated, and the official Container class reference page (https://developers.cloudflare.com/containers/api/container-class/) was removed from the docs on 2026-11-09 (cloudflare-docs commit `b3a1f52`, "Replace @cloudflare/containers with ctx.container"); the URL no longer serves a docs page. This page is kept as a historical reference for existing code and reflects the official page as of cloudflare-docs `d0995b9` (fetched 2026-11-03). New code and migrations use the Durable Object Container API (durable-object-container.md); the mapping is in api-comparison.md.
- `Container` does not support applications that use the `durable_object` scheduling policy. For those, use the Durable Object Container API (see durable-object-container.md). Moving an existing application to direct control: replace the `Container` subclass with a plain `DurableObject` and drive `this.ctx.container` yourself (readiness via `getTcpPort()`, hooks via `monitor()`, idle stop via `setInactivityTimeout()`, scheduling via alarms); see [api-comparison.md](./api-comparison.md) for the method mapping and [durable-object-container.md](./durable-object-container.md) for the API.
- Do not override `alarm()`: the class uses the alarm handler for lifecycle management. Use `schedule()`.
- If you override `onActivityExpired()` you must call `await this.stop()` or `await this.destroy()`; otherwise the timer renews and the hook fires again on the next expiry and the container never sleeps.
- Inside an overridden `fetch()`, call `this.containerFetch()` rather than `this.fetch()` to avoid infinite recursion.
- `fetch()` starts the container automatically; call `start*()` explicitly only to pre-warm or control lifecycle.
- Adapted from the official docs: the page's `getContainer` example names the instance from a `sessionId` in an unverified request body, and its `fetch` examples expose unauthenticated `/admin/stop` and `/admin/destroy` routes. They were replaced by fixed-name and idle-timer examples. If you derive an instance name from request input, authenticate and validate it first.
- Adapted from the official docs: the `containerFetch` metrics-forwarding example (which forwarded the client's `authorization` header to an internal endpoint) is omitted; do not forward client credentials to other hosts.
- Corrected from the official docs: the `runAndPersist()` example inserts into a `results` table that is never created; a `CREATE TABLE IF NOT EXISTS` statement was added.
- Container-side `envVars` and `startOptions.envVars` are visible to the container process; keep secrets in Worker secrets and pass only what is needed.
- Outbound interception details: containers/outbound-traffic.md.

## Related

- [Durable Object Container API](./durable-object-container.md)
- [API comparison](./api-comparison.md)
- [Outbound traffic](./outbound-traffic.md)
- [Scheduling policy](./scheduling-policy.md)
- [Execute commands](./execute-commands.md)
