---
source: https://developers.cloudflare.com/agents/agent-class/internals/
---

# Agent class internals

`Agent` extends `Server` from the `partyserver` package, which extends `DurableObject`: DurableObject > Server > Agent (> AIChatAgent). Agents are Durable Objects with state, scheduling, RPC, WebSockets, email and an MCP client layered on top.

## Signature / Usage

```ts
class MyAgent extends Agent<Env, { count: number }> {
	initialState = { count: 0 };

	increment() {
		this.setState({ count: this.state.count + 1 });
	}

	onStateChanged(state, source) {
		console.log("State updated:", state);
	}
}
```

Layers:

```ts
// Layer 1 (partyserver Server): addressing + callbacks
const stub = await getServerByName(env.MY_DO, "foo");

// Layer 2 (Agent): re-exported as getAgentByName / routeAgentRequest
const stub2 = await getAgentByName(env.MY_DO, "foo");
await stub2.someMethod();
```

`this.sql` template tag (synchronous, wraps `this.ctx.storage.sql`):

```ts
class MyAgent extends Agent {
	onStart() {
		this.sql`
      CREATE TABLE IF NOT EXISTS users (
        id TEXT PRIMARY KEY,
        name TEXT
      )
    `;

		const userId = "1";
		const userName = "Alice";
		this.sql`INSERT INTO users (id, name) VALUES (${userId}, ${userName})`;

		const users = this.sql<{ id: string; name: string }>`
      SELECT * FROM users WHERE id = ${userId}
    `;
		console.log(users); // [{ id: "1", name: "Alice" }]
	}
}
```

`this.destroy()`:

```ts
class MyAgent extends Agent {
	async cleanup() {
		// This wipes everything!
		await this.destroy();
	}

	async destroyAfterDelay() {
		// This will safely destroy the Agent even when
		// called from within the alarm handler
		await this.destroy();
	}
}
```

## Options / Props

`static options` (all optional):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `hibernate` | `boolean` | `true` | Whether the agent hibernates when inactive. WebSocket connections stay open while the DO sleeps |
| `sendIdentityOnConnect` | `boolean` | `true` | Send identity (agent name, instance name) to clients on WebSocket connect. Set to `false` to hide sensitive instance names |
| `hungScheduleTimeoutSeconds` | `number` | `30` | Timeout before a running interval schedule is considered hung and force-reset |
| `keepAliveIntervalMs` | `number` | `30000` | Interval in ms for `keepAlive()` alarm heartbeats |
| `retry` | `RetryOptions` | `{ maxAttempts: 3, baseDelayMs: 100, maxDelayMs: 3000 }` | Default retry options for `schedule()`, `queue()`, and `this.retry()` |

```ts
export class MyAgent extends Agent {
	static options = {
		hibernate: true,
		sendIdentityOnConnect: false,
		retry: { maxAttempts: 5, baseDelayMs: 200, maxDelayMs: 5000 },
	};
}
```

Built-in tables / frames:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `cf_agents_state` | SQL table | — | Stores state; state frames use `type: "cf_agent_state"` |
| `cf_agents_queues` | SQL table | — | Queue tasks |
| `cf_agents_schedules` | SQL table | — | Schedules; one DO alarm multiplexes them |
| `cf_agents_runs` | SQL table | — | Fiber rows (see durable execution) |

## Notes

- The Durable Object constructor signature `(ctx: DurableObjectState, env: Env)` is fixed; instances are created through the namespace binding, never manually.
- `Server.onStart` runs every time the DO starts (first creation, eviction, hibernation) before any `fetch` or RPC call.
- `this.name` is available through partyserver but is not a perfect solution (workerd issue 2240).
- `destroy()` calls `this.ctx.abort()` asynchronously via `setTimeout`, so an uncatchable error appears in logs after the event loop yields. It is safe inside scheduled callbacks (an internal flag skips remaining DB updates). In a sub-agent it delegates cleanup to the parent and should be treated as fire-and-forget.
- `agents` wraps your methods with `AsyncLocalStorage`; use `getCurrentAgent()` to get `{ agent, connection, request, email }` anywhere.
- Methods named `onError(connectionOrError, error?)` receive either a `Connection` plus error (WebSocket) or just an error (server).
- Because Agents are Durable Objects, DO storage, alarm and namespace API details live in the cloudflare-stateful skill. The snippets on the source page are illustrative, not best practice.
- Class-field state does not survive eviction; keep durable data in `this.state`, `connection.state` or SQLite.

## Related

- [Overview](./overview.md)
- [State](./state.md)
- [Schedule tasks](./schedule-tasks.md)
- [Queue tasks](./queue-tasks.md)
- [Durable execution](./durable-execution.md)
