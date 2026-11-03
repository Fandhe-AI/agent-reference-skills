---
source: https://developers.cloudflare.com/agents/runtime/lifecycle/
---

# Lifecycle

`Lifecycle` from `agents/lifecycle` (stable) coordinates startup and incoming events for a Durable Object, stores pending jobs in SQLite, and manages the object's single alarm.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onStart(): void {
		// Runs once for each in-memory lifetime, before any other work.
	}

	onRequest(request: Request): Response {
		return new Response(`Hello from ${this.lifecycle.name}`);
	}

	onAlarm(): void {
		// Runs once for each alarm, after due jobs.
	}
}
```

Install: `npm i agents`. Expanded form (separates construction from handler installation):

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = new Lifecycle(this);

	constructor(ctx: DurableObjectState, env: Env) {
		super(ctx, env);
		this.lifecycle.installHandlers();
	}
}
```

SQLite via the `lifecycle.sql` tagged template (interpolated values become bound parameters):

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

export class NotesAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onStart(): void {
		this.lifecycle
			.sql`CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY, body TEXT NOT NULL)`;
	}

	onRequest(request: Request): Response {
		const id = new URL(request.url).searchParams.get("id") ?? "";
		const rows = this.lifecycle.sql<{ id: string; body: string }>`
			SELECT id, body FROM notes WHERE id = ${id}
		`;
		return Response.json(rows);
	}
}
```

Start from an RPC method, and teardown:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";

type Props = { userId: string };

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install<Env, Props>(this);
	#userId: string | undefined;

	onStart(props?: Props): void {
		this.#userId = props?.userId;
	}

	async whoAmI(props?: Props): Promise<string | undefined> {
		await this.lifecycle.start(props);
		return this.#userId;
	}

	async destroy(): Promise<void> {
		await this.lifecycle.disableAlarms();
		await this.lifecycle.dispose();
		await this.ctx.storage.deleteAll();
	}
}
```

## Options / Props

Host hooks (optional methods on your class; called inside the host context so `getCurrentAgent()` works):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStart(props?)` | hook | — | Once per in-memory lifetime, after every capability has started. |
| `onRequest(request)` | hook | — | For each HTTP request that no capability handled. |
| `onAlarm()` | hook | — | Once per alarm, after the Lifecycle has run the due jobs. |
| `onJob(context)` | hook | — | When a job the host pushed through `lifecycle.jobs` comes due. |
| `onAlarmMemoryLimit(context)` | hook | — | After an alarm ends in a memory-limit reset, after every capability's policy has run. |

Capability `claims`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `"selective"` | claims | default | Handles only the routes it recognizes, returns `undefined` for the rest. Runs in registration order. |
| `"catch-all"` | claims | — | Handles everything offered to its hooks. Always runs after every selective capability. |

Event handling:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| HTTP request | event | — | First capability returning a `Response`, else host `onRequest()`, else `404`. |
| WebSocket upgrade | event | — | First capability returning a `Response`, else `404`. |
| WebSocket message, close, error | event | — | The capability that owns the connection, else ignored. |
| Alarm | event | — | Due jobs, then the host's `onAlarm()`. |

## Notes

- `Lifecycle.install(this)` installs the `fetch`, `alarm`, `webSocketMessage`, `webSocketClose`, and `webSocketError` handlers. Do not define those methods yourself; if your class already defines one, the Lifecycle leaves it in place and that handler does not run through the Lifecycle. `installHandlers()` throws if called twice. Both forms accept `LifecycleOptions` (one option, `maxAlarmMemoryLimitStrikes`).
- Startup runs on the first request, alarm, or WebSocket event: resolve the name; each capability `onStart()` in registration order (catch-all last); host `onStart(props)`; then handle the event. It runs inside `blockConcurrencyWhile()`. A warm object skips it. If startup throws, the event fails and the next event retries; while the job queue holds jobs, a fallback alarm also retries startup.
- After an eviction, deploy, or crash, Lifecycle starts the capabilities again and pending jobs remain in SQLite. It does not checkpoint arbitrary JavaScript or resume a function where it stopped.
- RPC calls do not go through `fetch()` and do not start the Lifecycle; call `await this.lifecycle.start()` at the top of each RPC method that uses a capability. Props passed to `start()` are ignored when startup is already running or finished. Concurrent `start()` calls share one startup. `isStarted()` is true once all `onStart()`s finished.
- The host never receives WebSocket events; install the `WebSockets` capability for clients.
- `use()` rules: declare capability fields before the `lifecycle` field; register before startup; one catch-all per hook (`onRequest`, `onWebSocketUpgrade`) or it throws; duplicate IDs throw. There is no `next()` callback, so a capability cannot wrap a later response.
- Names: `lifecycle.name` comes from `ctx.id.name`. Startup fails for IDs from `newUniqueId()` or `idFromString()`, and for names over 1,024 bytes.
- `lifecycle.sql` values must be strings, numbers, booleans, or `null`; use `ctx.storage.sql` for other queries.
- Do not call `ctx.storage.setAlarm()` on an object that uses the Lifecycle; push a job instead.
- Teardown: `disableAlarms()` deletes the alarm and cannot be undone for this instance; `dispose()` runs each capability's `dispose()` in reverse registration order and releases live resources but does not delete stored data. Eviction calls neither.
- The `Agent` class installs this Lifecycle as its `lifecycle` field and starts it before its public `async` RPC methods run. Durable Object storage/alarm internals: cloudflare-stateful.

## Related

- [Jobs and alarms](./job-queue.md)
- [getCurrentAgent()](./get-current-agent.md)
- [Lifecycle API](./lifecycle-api.md)
- [Build a capability](./build-a-capability.md)
- [Routing](./routing.md)
