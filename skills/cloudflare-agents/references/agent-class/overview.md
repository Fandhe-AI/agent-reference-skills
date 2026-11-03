---
source: https://developers.cloudflare.com/agents/agent-class/
---

# Agent class overview

The `Agent` base class of the `agents` package encapsulates connections, state, SQL storage, scheduling, RPC and AI-model access in a Durable Object. A client-side SDK (`AgentClient`, `useAgent`, `useAgentChat`) connects to it from browsers.

## Signature / Usage

Adapted (not in the official docs): `routeAgentRequest(...)` is awaited so the 404 fallback can run (see Notes).

```ts
import { Agent, routeAgentRequest } from "agents";

export class MyAgent extends Agent<Env, State> {
	// Your agent logic
}

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env)) ||
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

Each Agent instance is a separate micro-server addressed by a unique name (user ID, email, ticket number, ...). Given the same name (or ID) you always get the same instance, so per-entity state needs no centralized session store.

### Lifecycle

```
flowchart TD
    A["onStart<br/>(instance wakes up)"] --> B["onRequest<br/>(HTTP)"]
    A --> C["onConnect<br/>(WebSocket)"]
    A --> D["onEmail"]
    C --> E["onMessage ↔ send()<br/>onError (on failure)"]
    E --> F["onClose"]
```

### SQL API

Each instance has an embedded SQLite database reachable through the `this.sql` tagged template:

```ts
// Create tables
this.sql`CREATE TABLE IF NOT EXISTS users (id TEXT PRIMARY KEY, name TEXT)`;

// Insert data
this.sql`INSERT INTO users (id, name) VALUES (${id}, ${name})`;

// Query data
const users = this.sql<User>`SELECT * FROM users WHERE id = ${id}`;
```

### Client quick example

```tsx
import { useAgent } from "agents/react";
import type { MyAgent } from "./server";

function App() {
	const agent = useAgent<MyAgent, State>({
		agent: "my-agent",
		name: "user-123",
	});

	// Call methods on the agent
	agent.stub.someMethod();

	// Update state (syncs to server and all clients)
	agent.setState({ count: 1 });
}
```

### Routing URL shape

```txt
https://your-worker.workers.dev/agents/:agent-name/:instance-name
```

## Options / Props

### Lifecycle methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onStart(props?)` | method | — | Runs when the instance starts or wakes from hibernation. Receives optional initialization props passed via `getAgentByName` or `routeAgentRequest` |
| `onRequest(request)` | method | — | Runs for each HTTP request to the instance |
| `onConnect(connection, ctx)` | method | — | Runs when a WebSocket connection is established |
| `onMessage(connection, message)` | method | — | Runs for each WebSocket message received |
| `onError(connection, error)` | method | — | Runs when a WebSocket error occurs |
| `onClose(connection, code, reason, wasClean)` | method | — | Runs when a WebSocket connection closes |
| `onEmail(email)` | method | — | Runs when an email is routed to the instance |
| `onStateChanged(state, source)` | method | — | Runs when state changes (from server or client) |

### Core properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `this.env` | `Env` | — | Environment variables and bindings |
| `this.ctx` | `ExecutionContext` | — | Execution context for the request |
| `this.state` | `State` | — | Current persisted state |
| `this.sql` | Function | — | Execute SQL queries on embedded SQLite |

### Server-side API map

| Feature | Methods | Page |
|---------|---------|------|
| State | `setState()`, `onStateChanged()`, `initialState` | [state.md](./state.md) |
| Callable methods | `@callable()` decorator | [callable-methods.md](./callable-methods.md) |
| Scheduling | `schedule()`, `scheduleEvery()`, `getScheduleById()`, `listSchedules()` | [schedule-tasks.md](./schedule-tasks.md) |
| Durable execution | `runFiber()`, `startFiber()`, `stash()`, `onFiberRecovered()`, `keepAlive()`, `keepAliveWhile()` | [durable-execution.md](./durable-execution.md) |
| Queue | `queue()`, `dequeue()`, `dequeueAll()`, `getQueue()` | [queue-tasks.md](./queue-tasks.md) |
| WebSockets | `onConnect()`, `onMessage()`, `onClose()`, `broadcast()` | [websockets.md](./websockets.md) |
| HTTP/SSE | `onRequest()` | http-sse.md (https://developers.cloudflare.com/agents/runtime/routing/http-sse/) |
| Email | `onEmail()`, `replyToEmail()` | [email.md](./email.md) |
| Workflows | `runWorkflow()`, `waitForApproval()` | [run-workflows.md](./run-workflows.md) |
| MCP client | `addMcpServer()`, `removeMcpServer()`, `getMcpServers()` | client-api.md (https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/) |
| Protocol messages | `shouldSendProtocolMessages()`, `isConnectionProtocolEnabled()` | [websockets.md](./websockets.md) |
| Context | `getCurrentAgent()` | get-current-agent.md (https://developers.cloudflare.com/agents/runtime/lifecycle/get-current-agent/) |
| Sub-agents | `subAgent()`, `abortSubAgent()`, `deleteSubAgent()` | [sub-agents.md](./sub-agents.md) |
| Agents as tools | `runAgentTool()`, `clearAgentToolRuns()`, `hasAgentToolRun()` | [agent-tools.md](./agent-tools.md) |
| Chat SDK | `createChatSdkState()`, `ChatSdkStateAgent` | [chat-sdk.md](./chat-sdk.md) |

### Client-side API map

| Feature | Methods | Page |
|---------|---------|------|
| WebSocket client | `AgentClient` | [client-sdk.md](./client-sdk.md) |
| HTTP client | `agentFetch()` | [client-sdk.md](./client-sdk.md) |
| React hook | `useAgent()` | [client-sdk.md](./client-sdk.md) |
| Chat hook | `useAgentChat()` | [chat-agents.md](./chat-agents.md) |
| Agent tool events | `useAgentToolEvents()` | [agent-tools.md](./agent-tools.md) |

## Notes

- Agents require Durable Objects. The wrangler bindings and migrations are covered in [routing.md](./routing.md) and routing.md (https://developers.cloudflare.com/agents/runtime/routing/) in the runtime category.
- Agents are Durable Objects: DO storage, alarms and the namespace API details are in the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/). See [internals.md](./internals.md) for how `Agent` layers on `DurableObject`.
- Chat UI hooks and the AI SDK integration (`streamText`, `useChat`, `UIMessage`) build on the AI SDK; see the vercel-ai-sdk skill for the SDK itself. `@cloudflare/ai-chat` is the Cloudflare adapter covered in [chat-agents.md](./chat-agents.md).
- This `Agent` class of the `agents` package is NOT the OpenAI Agents SDK (openai-agents skill) and NOT the Claude Agent SDK (anthropic-agent-sdk skill); it is a Cloudflare Durable Object base class.
- Module-level helper `agentTool()` from `agents/agent-tools` converts a Think or `AIChatAgent` subclass into an AI SDK tool definition.
- For AI chat applications extend `AIChatAgent` (`@cloudflare/ai-chat`) instead of `Agent`.
- Adapted from the official docs: the routing example in the source overview calls `routeAgentRequest(request, env) ||` without `await`; a Promise is always truthy, so the 404 fallback would never run. The snippet above awaits it, matching the other pages.

## Related

- [Internals](./internals.md)
- [State](./state.md)
- [Routing](./routing.md)
- [Client SDK](./client-sdk.md)
- [Chat agents](./chat-agents.md)
