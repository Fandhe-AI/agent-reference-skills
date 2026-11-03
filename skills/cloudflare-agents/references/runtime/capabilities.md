---
source: https://developers.cloudflare.com/agents/runtime/capabilities/
---

# Capabilities

A capability adds a reusable feature (WebSockets, scheduling, MCP connections, an agent harness) to a Durable Object. Construct it as a field and attach it to the Lifecycle with `lifecycle.use()`.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";
import { Scheduler } from "agents/schedules";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

type Settings = { model: string };

export class MyAgent extends DurableObject<Env> {
	readonly mcp = new MCPClientManager("my-agent", "1.0.0");
	readonly scheduler = new Scheduler({
		callbacks: {
			dailySummary: async () => {
				for (const connection of this.webSockets.getConnections()) {
					connection.send("Time for your daily summary");
				}
			},
		},
	});
	readonly settings: State<Settings> = new State<Settings>({
		initialState: { model: "anthropic/claude-opus-5.5" },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	readonly webSockets: WebSockets = new WebSockets({ state: this.settings });

	readonly lifecycle = Lifecycle.install(this)
		.use(this.mcp)
		.use(this.scheduler)
		.use(this.settings)
		.use(this.webSockets);
}
```

## Options / Props

Stable capabilities shipped with `agents`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WebSockets` | `agents/websockets` | — | Accepts WebSocket connections from `useAgent` and other clients. |
| `State` | `agents/state` | — | Stores one validated value and syncs it to clients through `WebSockets`. |
| `Scheduler` | `agents/schedules` | — | Runs callbacks after a delay, at a date, on a cron, or on an interval. |
| `MCPClientManager` | `agents/mcp/client` | — | Connects to MCP servers and keeps the connections across restarts. |

Experimental capabilities (APIs may change between releases):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `Streams` | `agents/streams` | — | Stores incremental output that readers replay and follow. |
| `Sessions` | `agents/sessions` | — | Stores conversation history as a tree of messages. |
| `Queue` | `agents/queue` | — | Runs background callbacks one at a time, in push order. |
| `Tasks` | `agents/tasks` | — | Runs replayable background work with journaled steps. |
| `RoutedAgents` | `agents/routing` | — | Keeps a catalog of independent agents and forwards requests to them. |
| `Browser` | `agents/browser` | — | Keeps one persistent Browser Run session open for the agent. |

What a starting point already provides:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Pi or OpenCode harness | — | — | Agent loop, conversation storage, recovery. |
| `Agent` class | — | — | WebSockets, shared state, scheduling, MCP connections. |
| Think or `AIChatAgent` | — | — | `Agent` capabilities plus conversation storage and streaming. |
| Plain Durable Object | — | — | Only the capabilities you explicitly install. |

## Notes

- Capabilities share the Lifecycle's startup, event dispatch, and durable job queue, so each feature does not manage the object's single alarm independently. Lifecycle does not automatically save the progress of arbitrary JavaScript code; a harness or capability reads its saved state to decide how to continue.
- Install before startup: call `use()` in a field initializer or the constructor. The Lifecycle starts on the first request, alarm, or WebSocket message, and `use()` throws after that.
- Declare each capability field before the `lifecycle` field (class fields initialize in order).
- Install each capability once: each has a stable ID (such as `"scheduler"` or `"mcp"`) that namespaces its jobs and events; `use()` throws on a duplicate.
- Startup order: each capability's `onStart()` in install order (catch-all last), then your own `onStart()`. Request order: capabilities in install order before your `onRequest()`; `WebSockets` accepts every upgrade, so it runs after the others.
- Callbacks you register (`Scheduler` callbacks, `WebSockets` handlers, callables) run inside your object's context, where `getCurrentAgent()` returns your object.
- Native Durable Object RPC bypasses `fetch()` and does not start the Lifecycle. Call `await this.lifecycle.start()` at the top of an RPC method that uses a capability.
- On the `Agent` class, `this.schedule()`, `this.setState()`, and `this.addMcpServer()` call these capabilities. To add another capability to an `Agent`, call `this.lifecycle.use()` in its constructor; do not install a duplicate.
- Cloudflare `agents` package; Durable Object internals are in cloudflare-stateful.

## Related

- [Lifecycle](./lifecycle.md)
- [WebSockets](./websockets.md)
- [State](./state.md)
- [Scheduler](./scheduler.md)
- [MCPClientManager](./mcp-client-manager.md)
- [Streams](./streams.md)
- [Sessions](./sessions.md)
- [Build a capability](./build-a-capability.md)
