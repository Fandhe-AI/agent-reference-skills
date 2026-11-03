---
source: https://developers.cloudflare.com/agents/runtime/capabilities/build-a-capability/
---

# Build a capability

Write your own reusable Lifecycle capability by extending `LifecycleCapability` (stable ID plus Lifecycle services) or implementing the `DurableObjectCapability` interface (plain hooks, no services).

## Signature / Usage

Simple middleware with the interface (no ID, no services):

```ts
import { DurableObject } from "cloudflare:workers";
import {
	Lifecycle,
	type CapabilityRequestContext,
	type DurableObjectCapability,
} from "agents/lifecycle";

class HealthCheck implements DurableObjectCapability {
	readonly storage: DurableObjectStorage;

	constructor(storage: DurableObjectStorage) {
		this.storage = storage;
	}

	onStart(): void {
		this.storage.sql.exec(
			"CREATE TABLE IF NOT EXISTS health_checks (checked_at INTEGER NOT NULL)",
		);
	}

	onRequest({ request }: CapabilityRequestContext): Response | undefined {
		if (!new URL(request.url).pathname.endsWith("/health")) return;
		this.storage.sql.exec(
			"INSERT INTO health_checks (checked_at) VALUES (?)",
			Date.now(),
		);
		return new Response("ok");
	}
}

export class MyAgent extends DurableObject<Env> {
	readonly health = new HealthCheck(this.ctx.storage);
	readonly lifecycle = Lifecycle.install(this).use(this.health);

	onRequest(): Response {
		return new Response("application response");
	}
}
```

The guide's `UptimeMonitor` (tables, jobs, request handling, events, host-context callbacks), assembled from the page's fragments:

```ts
import {
	LifecycleCapability,
	type CapabilityRequestContext,
	type LifecycleJobContext,
	type LifecycleJobOutcome,
} from "agents/lifecycle";

type UptimeMonitorOptions = {
	url: string;
	intervalMs: number;
	onDown?: (status: number) => void | Promise<void>;
};

export class UptimeMonitor extends LifecycleCapability {
	readonly options: UptimeMonitorOptions;

	constructor(options: UptimeMonitorOptions) {
		super("uptime-monitor");
		this.options = options;
	}

	override onStart(): void {
		this.lifecycle.storage.sql.exec(`
			CREATE TABLE IF NOT EXISTS uptime_checks (
				checked_at INTEGER NOT NULL,
				status INTEGER NOT NULL
			)
		`);
	}

	async startMonitoring(): Promise<void> {
		await this.lifecycle.ready();
		await this.lifecycle.jobs.push({
			id: "check",
			fn: "check",
			time: Date.now(),
		});
	}

	async onJob({ job }: LifecycleJobContext): Promise<LifecycleJobOutcome> {
		if (job.fn !== "check") return;
		const response = await fetch(this.options.url, { method: "HEAD" });
		this.lifecycle.storage.sql.exec(
			"INSERT INTO uptime_checks (checked_at, status) VALUES (?, ?)",
			Date.now(),
			response.status,
		);
		this.lifecycle.events.emit("uptime:check", { status: response.status });

		const { onDown } = this.options;
		if (!response.ok && onDown) {
			await this.lifecycle.runInHostContext(() => onDown(response.status));
		}
		return { rescheduleAt: Date.now() + this.options.intervalMs };
	}

	onRequest({ request }: CapabilityRequestContext): Response | undefined {
		if (!new URL(request.url).pathname.endsWith("/uptime")) return;
		const checks = this.lifecycle.storage.sql
			.exec(
				"SELECT checked_at, status FROM uptime_checks ORDER BY checked_at DESC LIMIT 20",
			)
			.toArray();
		return Response.json(checks);
	}
}
```

Install it:

Adapted (not in the official docs): an import of `UptimeMonitor` is added (the class from the previous snippet; the module path is yours).

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { UptimeMonitor } from "./uptime-monitor";

export class SiteAgent extends DurableObject<Env> {
	readonly uptime = new UptimeMonitor({
		url: "https://example.com/",
		intervalMs: 5 * 60_000,
		onDown: (status) => console.warn(`example.com returned ${status}`),
	});
	readonly lifecycle = Lifecycle.install(this).use(this.uptime);

	async onRequest(): Promise<Response> {
		await this.uptime.startMonitoring();
		return new Response("Monitoring started", { status: 202 });
	}
}
```

## Options / Props

Other optional hooks (full signatures in Lifecycle API):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onWebSocketUpgrade(context)` | hook | — | Claim a WebSocket upgrade by returning a `Response`. |
| `onWebSocketMessage`, `onWebSocketClose`, `onWebSocketError` | hook | — | Handle events for sockets the capability owns, and return `true`. |
| `onJobError(context, error)` | hook | — | Decide what happens after a job fails its last retry. |
| `onMemoryLimit(context)` | hook | — | Apply policy after an alarm ends in a memory-limit reset. |
| `onRoute(context)` | hook | — | Handle a message routed to this capability's ID. |
| `dispose()` | hook | — | Release live resources during explicit teardown. |
| `claims` | `"selective" \| "catch-all"` | `"selective"` | Set `"catch-all"` for a capability that handles every request, so it runs after all others. |

## Notes

- Pass a stable, non-empty ID to `super()`; the Lifecycle routes jobs and events back by it. Do not change it after deploying, or pending jobs lose their owner. `this.lifecycle` throws if the capability is not installed with `use()`. The capability never receives the host object; pass bindings and callbacks through its constructor.
- Prefix table names to avoid collisions with the host and other capabilities. `onStart()` runs on every capability before the host's `onStart()`.
- A fixed job ID means calling `startMonitoring()` again replaces the pending check. Keep `onJob()` short; for longer work see the heartbeat pattern in Jobs and alarms.
- Await `this.lifecycle.ready()` at the top of any public method that uses storage or jobs, or starts work `onStart()` also starts. RPC calls do not start the object; work begun outside startup that `onStart()` awaits cannot finish until startup times out after 30 seconds and the object resets (an intermittent timeout). `ready()` resolves immediately inside startup.
- Capability hooks run outside the host's invocation context (`getCurrentAgent()` returns `undefined` values). Call user code through `runInHostContext(fn, { connection, request })`.
- `events.emit(type, payload)` is best-effort telemetry, not a durable outbox; unknown prefixes such as `uptime:check` go to `agents:lifecycle`. Events emitted during startup are held until it finishes. If delivery matters, store an outbox in the capability's own table.
- `onRequest` returns a `Response` to handle, or `undefined` to pass on. The `/uptime` and `/health` routes shown are unauthenticated; authenticate in the Worker.
- Test by installing the capability on a small Durable Object with a real Lifecycle (do not fake Lifecycle services), using the Workers Vitest integration (cloudflare-wrangler).
- On the `Agent` class, construct the capability as a field and install it with `this.lifecycle.use(this.uptime)` in the constructor after `super()`.
- Adapted from the official docs: the install snippet imports `UptimeMonitor` from `./uptime-monitor` (an illustrative path; the previous snippet must be exported from that file).
- The `UptimeMonitor` above is assembled from the page's separate fragments (the page elides the rest of the class with `// ...`).

## Related

- [Capabilities](./capabilities.md)
- [Lifecycle API](./lifecycle-api.md)
- [Jobs and alarms](./job-queue.md)
- [getCurrentAgent()](./get-current-agent.md)
