---
source: https://developers.cloudflare.com/agents/model-context-protocol/apis/agent-api/
---

# McpAgent (deprecated)

`McpAgent` is a deprecated, feature-frozen stateful legacy MCP server backed by a Durable Object. Prefer `createMcpHandler` for new servers.

## Signature / Usage

`McpAgent` requires `@modelcontextprotocol/sdk` (an optional peer of `agents`); keep the SDK v1 `McpServer` import (an SDK v2 server cannot run inside `McpAgent`).

```sh
npm i agents @modelcontextprotocol/sdk@1.32.1 zod
```

```ts
import { McpAgent } from "agents/mcp";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { z } from "zod";

export class MyMCP extends McpAgent {
	server = new McpServer({ name: "my-server", version: "1.0.0" });

	async init() {
		this.server.tool("square", { n: z.number() }, async ({ n }) => ({
			content: [{ type: "text", text: String(n * n) }],
		}));
	}
}

// Export the Worker handler
export default MyMCP.serve("/mcp");
```

Stateful counter with persisted state and a resource:

```ts
type State = { counter: number };

export class MyMCP extends McpAgent<Env, State, {}> {
	server = new McpServer({ name: "Demo", version: "1.0.0" });

	initialState: State = { counter: 1 };

	async init() {
		this.server.resource(`counter`, `mcp://resource/counter`, (uri) => ({
			contents: [{ uri: uri.href, text: String(this.state.counter) }],
		}));

		this.server.tool("add", "Add to the counter, stored in the MCP", { a: z.number() }, async ({ a }) => {
			this.setState({ ...this.state, counter: this.state.counter + a });
			return {
				content: [{ type: "text", text: `Added ${a}, total is now ${this.state.counter}` }],
			};
		});
	}

	onStateChanged(state: State) {
		console.log({ stateUpdate: state });
	}
}
```

Legacy OAuth (a combined provider in one Worker; the current approach is the split authorization/resource server in [Authorization](./authorization.md)). `MyAuthHandler` is your own default handler.

Adapted (not in the official docs): the source references an undefined `AuthHandler`; renamed `MyAuthHandler` as a placeholder you supply. See Notes.

```ts
import { OAuthProvider } from "@cloudflare/workers-oauth-provider";

export default new OAuthProvider({
	apiHandlers: { "/mcp": MyMCP.serve("/mcp") },
	authorizeEndpoint: "/authorize",
	tokenEndpoint: "/token",
	clientRegistrationEndpoint: "/register",
	defaultHandler: MyAuthHandler,
	resourceMetadata: {
		// The URL MCP clients connect to. Use http://localhost:8787/mcp with wrangler dev.
		resource: "https://my-mcp-server.<your-subdomain>.workers.dev/mcp",
	},
});
```

Data jurisdiction: `export default MyMCP.serve("/mcp", { jurisdiction: "eu" });` (also `"fedramp"`).

RPC transport: an Agent connects to an `McpAgent` through its Durable Object binding with `addMcpServer(name, env.MyMCP, { props })`, and the server reads `this.props`. Bind the class in the calling Worker:

```jsonc
{
	"durable_objects": {
		"bindings": [
			{ "name": "Chat", "class_name": "Chat" },
			{ "name": "MyMCP", "class_name": "MyMCP" },
		],
	},
	"migrations": [
		{
			"new_sqlite_classes": ["MyMCP", "Chat"],
			"tag": "v1",
		},
	],
}
```

Override `protected getRpcTransportOptions() { return { timeout: 120000 }; }` to change the 60 s tool-response wait.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `state` | — | — | Current persisted state |
| `initialState` | — | — | Default state when an instance starts |
| `setState(state)` | — | — | Update and persist state |
| `onStateChanged(state)` | — | — | Called when state changes |
| `sql` | — | — | Query the embedded SQL database |
| `server` | — | — | `McpServer` instance for registering tools |
| `props` | — | — | User identity and tokens from OAuth (third type parameter defines the shape) |
| `elicitInput(options, context)` | — | — | Request structured input from the user |
| `McpAgent.serve(path, options)` | — | — | Static method creating the Worker handler; `jurisdiction` option |
| `getRpcTransportOptions()` | — | `{ timeout: 60000 }` (60 s wait for a tool response) | Override to change the RPC timeout |

## Notes

- State resets after the session ends: each client session is its own `McpAgent` instance, so a reconnecting client starts with fresh state.
- Hibernation (WebSocket Hibernation) is on by default. Streamable HTTP survives the roughly 5-minute edge idle-stream watchdog: POST streams are always kept alive; GET listen streams recover via `Last-Event-ID` when an `EventStore` is configured (otherwise a 25-second `: keepalive` comment frame is sent). `DurableObjectEventStore` is exported from `agents/mcp`.
- Legacy elicitation: call `this.server.server.elicitInput({ mode: "form" | "url", ... }, { relatedRequestId: extra.requestId })` inside a tool handler. Results are `accept`, `decline`, or `cancel`; form `content` appears only on accepted forms. Never request secrets via form mode; URL mode URLs must not contain secrets, personal data, or pre-authenticated URLs, should be HTTPS in production, and must be bound to the authenticated user. Not all clients implement elicitation; provide a fallback.
- RPC transport is supported but not developed further, has no OAuth flow, and has no equivalent for `createMcpHandler` servers.
- Source examples read `this.props?.userId || "anonymous"` and gate admin tools on `this.props.permissions`; treat missing props as unauthenticated (deny) rather than defaulting to a privileged or shared identity. Props are stored in Durable Object storage; do not log tokens.
- Adapted from the official docs: the source OAuth snippet references an undefined `AuthHandler`; it is renamed `MyAuthHandler` and described as your own.
- Distance lines: the protocol spec is mcp-spec; Claude Code MCP is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Migrate to MCP SDK v2](./migrate-to-mcp-sdk-v2.md)
- [createMcpHandler API](./handler-api.md)
- [MCP Client API](./client-api.md)
