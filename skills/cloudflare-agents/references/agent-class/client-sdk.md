---
source: https://developers.cloudflare.com/agents/agent-class/communication-channels/chat/client-sdk/
---

# Client SDK (useAgent / AgentClient / agentFetch)

Connect to Agents from browsers, Node.js, Deno, Bun or edge functions over WebSocket or HTTP, with bidirectional state sync, typed RPC calls, streaming and automatic reconnection (exponential backoff).

## Signature / Usage

```tsx
import { useAgent } from "agents/react";

function Chat() {
	const agent = useAgent({
		agent: "ChatAgent",
		name: "room-123",
		onStateUpdate: (state) => {
			console.log("New state:", state);
		},
	});

	const sendMessage = async () => {
		const response = await agent.call("sendMessage", ["Hello!"]);
		console.log("Response:", response);
	};

	return <button onClick={sendMessage}>Send</button>;
}
```

Vanilla JS:

```ts
import { AgentClient } from "agents/client";

const client = new AgentClient({
	agent: "ChatAgent",
	name: "room-123",
	host: "your-worker.your-subdomain.workers.dev",
	onStateUpdate: (state) => {
		console.log("New state:", state);
	},
});

// Call a method
const response = await client.call("sendMessage", ["Hello!"]);

// When done:
client.close();
```

Async query (auth tokens):

```ts
useAgent({
	agent: "ChatAgent",
	name: "room-123",

	// Async query - called before connecting
	query: async () => {
		const token = await getAuthToken();
		return { token };
	},

	// Dependencies that trigger re-fetching the query
	queryDeps: [userId],

	// Cache TTL for the query result (default: 5 minutes)
	cacheTtl: 60 * 1000, // 1 minute
});
```

Typed stub and streaming:

Adapted (not in the official docs): the streaming callbacks are nested under the `stream` option, matching the `call()` contract in callable-methods.md (see Notes).

```ts
import type { MyAgent } from "./agents/my-agent";

const agent = useAgent<MyAgent>({
	agent: "MyAgent",
	name: "instance-1",
});

// Now stub methods are fully typed
const result = await agent.stub.processData({ input: "test" });

await agent.call("generateText", [prompt], {
	stream: {
		onChunk: (chunk) => {
			appendToOutput(chunk);
		},
		onDone: (finalResult) => {
			console.log("Complete:", finalResult);
		},
		onError: (error) => {
			console.error("Stream error:", error);
		},
	},
});
```

HTTP:

```ts
import { agentFetch } from "agents/client";

// POST request with body
const response = await agentFetch(
	{
		agent: "DataAgent",
		name: "instance-1",
		host: "my-worker.workers.dev",
	},
	{
		method: "POST",
		headers: { "Content-Type": "application/json" },
		body: JSON.stringify({ action: "process" }),
	},
);
```

Non-React chat transport:

```ts
import { AgentClient } from "agents/client";
import { WebSocketChatTransport } from "agents/chat/transport";

const transport = new WebSocketChatTransport({
	agent: new AgentClient({
		agent: "ChatAgent",
		name: "user-123",
		host: window.location.host,
	}),
});
```

## Options / Props

`UseAgentOptions<State>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | `string` | — | Required. Agent class name (camelCase converted to kebab-case in the URL) |
| `name` | `string` | `"default"` | Instance name |
| `host` | `string` | current origin | Custom host |
| `path` | `string` | — | Custom path prefix |
| `query` | `Record<string,string>` or `() => Promise<Record<string,string>>` | — | Query parameters sent on connection |
| `queryDeps` | `unknown[]` | — | Dependencies for the async query |
| `cacheTtl` | `number` | 5 minutes | Query cache TTL in ms |
| `onStateUpdate` | `(state, source: "server" \| "client") => void` | — | State callback |
| `onMcpUpdate` | `(mcpServers) => void` | — | MCP server state callback |
| `onOpen` / `onClose` | `() => void` | — | Connection events |
| `onError` | `(error: Event) => void` | — | WebSocket error |
| `onMessage` | `(message: MessageEvent) => void` | — | Raw message |
| `sub` | `{ agent, name }[]` | — | Connect to a descendant sub-agent |

`AgentClientOptions<State>`: `agent` (required), `host` (required), `name` (default `"default"`), `path`, `query` (`Record<string,string>` only), `onStateUpdate`.

Shared members of `useAgent` and `AgentClient`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `agent` | `string` | — | Kebab-case agent name |
| `name` | `string` | — | Instance name |
| `state` | State | `undefined` until first server message | Current state |
| `setState(state)` | `void` | — | Push state to the agent |
| `call(method, args?, options?)` | `Promise` | — | Call a `@callable()` method |
| `stub` | `Proxy` | — | Typed method calls (`useAgent`) |
| `send(data)` | `void` | — | Send raw WebSocket message |
| `close()` | `void` | — | Close connection |
| `reconnect()` | `void` | — | Force reconnection |

`AgentClient` also supports `addEventListener("open" | "close" | "error" | "message", ...)`.

## Notes

- Corrected from the official docs: the page passes `onChunk` / `onDone` / `onError` directly as the third argument of `call()`; the call options take them under `stream: { onChunk, onDone, onError }` (see callable-methods.md and websockets.md), so they are nested here.
- The async `query` cache is re-run when `queryDeps` change, `cacheTtl` expires, the WebSocket closes (automatic invalidation, so tokens refresh on reconnect), or the component remounts.
- `state` starts `undefined`; `useAgent` re-renders on updates. `setState()` flows: client sends over WebSocket, agent's `onStateChanged()` runs, agent broadcasts, `onStateUpdate` fires with `source: "client"`.
- `@callable()` is only needed for external runtimes; inside a Worker use Durable Object RPC. Errors thrown by the method reject `call()`; streaming errors go to `onError`.
- Use `agentFetch` for one-off or server-to-server requests and `useAgent`/`AgentClient` for real-time, state sync and multiple RPC calls.
- `WebSocketChatTransport` (`agents/chat/transport`) needs no React peer dependency; see [chat-agents.md](./chat-agents.md) for what it does not cover. `useAgentToolEvents({ agent })` renders agent-tool timelines ([agent-tools.md](./agent-tools.md)).
- Authentication across domains: routing-authentication.md (https://developers.cloudflare.com/agents/runtime/routing/authentication/). Do not put long-lived secrets in query parameters; prefer short-lived tokens.
- `getAuthToken`, `userId`, `prompt`, `appendToOutput` in snippets are placeholders.

## Related

- [Routing](./routing.md)
- [Callable methods](./callable-methods.md)
- [Chat agents](./chat-agents.md)
- [State](./state.md)
