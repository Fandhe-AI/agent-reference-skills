---
source: https://developers.cloudflare.com/agents/runtime/
---

# Runtime overview

Every agent built with the Agents SDK runs on a Durable Object. The runtime is the Lifecycle (`agents/lifecycle`), routing (`agents/routing`), attachable capabilities, and observability.

## Signature / Usage

Compose the runtime yourself on a plain `DurableObject`:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { Scheduler } from "agents/schedules";
import { WebSockets } from "agents/websockets";

export class MyAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({ callbacks: {} });
	readonly webSockets = new WebSockets();
	readonly lifecycle = Lifecycle.install(this)
		.use(this.scheduler)
		.use(this.webSockets);

	onRequest(request: Request): Response {
		return new Response(`Hello from ${this.lifecycle.name}`);
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

Parts of the runtime:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| Lifecycle (`agents/lifecycle`) | — | — | Runs startup, dispatches each request and WebSocket event, owns a durable job queue and the object's single alarm. |
| Routing (`agents/routing`) | — | — | Sends requests from your Worker to the right named object. |
| Capabilities | — | — | Features attached with `lifecycle.use()`. |
| Observability | — | — | Traces model calls and publishes events from the Lifecycle and its capabilities. |

Capabilities:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `WebSockets` (`agents/websockets`) | Stable | — | Real-time client connections. |
| `State` (`agents/state`) | Stable | — | Shared state that syncs to clients. |
| `Scheduler` (`agents/schedules`) | Stable | — | Delayed, dated, cron, and interval callbacks. |
| `MCPClientManager` (`agents/mcp/client`) | Stable | — | Connections to MCP servers. |
| `Streams` (`agents/streams`) | Experimental | — | Durable incremental output. |
| `Sessions` (`agents/sessions`) | Experimental | — | Durable conversation history. |

## Notes

- The `Agent` class is a preset of the same runtime: a Durable Object with the Lifecycle and several capabilities already installed.
- Harnesses: Think extends the `Agent` class (installs the Lifecycle and capabilities for you). Pi is one capability; you install the Lifecycle and add the harness with `.use()`.
- With a harness, the parts you usually work with directly are routing, WebSockets, and observability. The rest matters when you build your own agent loop or capability.
- Cloudflare `agents` package only: this is not the OpenAI Agents SDK (openai-agents skill) nor the Claude Agent SDK (anthropic-agent-sdk skill). Durable Object internals (storage, alarms, hibernation) are in cloudflare-stateful; Workers runtime APIs are in cloudflare-workers.

## Related

- [Lifecycle](./lifecycle.md)
- [Routing](./routing.md)
- [Capabilities](./capabilities.md)
- [Tracing](./tracing.md)
- [Diagnostics channels](./diagnostics-channels.md)
