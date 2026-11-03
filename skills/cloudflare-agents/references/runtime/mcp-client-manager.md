---
source: https://developers.cloudflare.com/agents/runtime/capabilities/mcp-client-manager/
---

# MCPClientManager

`MCPClientManager` from `agents/mcp/client` connects an agent to MCP servers. It stores servers in the Durable Object's SQLite database, reconnects on start, and answers OAuth callbacks before your `onRequest()` runs.

## Signature / Usage

Install: `npm i agents @modelcontextprotocol/client@2.3.1`.

Adapted (not in the official docs): `onRequest()` lists tools and registers a server, so it now requires a caller check; `isAuthorizedCaller()` is a placeholder that rejects everyone until you implement verification; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";
import { routeAgentRequest } from "agents/routing";

// Placeholder: rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ToolAgent extends DurableObject<Env> {
	readonly mcp = new MCPClientManager("tool-agent", "1.0.0");
	readonly lifecycle = Lifecycle.install(this).use(this.mcp);

	async onRequest(request: Request): Promise<Response> {
		if (!isAuthorizedCaller(request)) {
			return new Response("Unauthorized", { status: 401 });
		}
		const url = new URL(request.url);
		if (request.method !== "POST" || !url.pathname.endsWith("/connect")) {
			return Response.json({ tools: this.mcp.listTools() });
		}

		await this.mcp.registerServer("docs", {
			name: "Cloudflare Docs",
			url: "https://docs.mcp.cloudflare.com/mcp",
			callbackUrl: `${url.origin}/agents/tool-agent/${this.lifecycle.name}/callback`,
			transport: { type: "auto" },
		});

		const connection = await this.mcp.connectToServer("docs");
		if (connection.state === "authenticating") {
			return Response.redirect(connection.authUrl);
		}
		if (connection.state === "connected") {
			await this.mcp.discoverIfConnected("docs");
		}
		return Response.json({ state: connection.state });
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

Use tools with the AI SDK, and call over RPC:

Adapted (not in the official docs): the model-calling `onRequest()` requires the same fail-closed caller check (`isAuthorizedCaller()` placeholder) because it spends model quota and runs tools.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";
import { generateText, stepCountIs, type LanguageModel } from "ai";

declare const model: LanguageModel;

// Placeholder: rejects every request until you implement verification.
function isAuthorizedCaller(request: Request): boolean {
	return false;
}

export class ToolAgent extends DurableObject<Env> {
	readonly mcp = new MCPClientManager("tool-agent", "1.0.0");
	readonly lifecycle = Lifecycle.install(this).use(this.mcp);

	async onRequest(request: Request): Promise<Response> {
		if (!isAuthorizedCaller(request)) {
			return new Response("Unauthorized", { status: 401 });
		}
		await this.mcp.waitForConnections({ timeout: 10_000 });
		const { text } = await generateText({
			model,
			prompt: await request.text(),
			tools: this.mcp.getAITools(),
			stopWhen: stepCountIs(5),
		});
		return new Response(text);
	}

	// RPC methods do not start the Lifecycle on their own.
	async callDocsSearch(query: string) {
		await this.lifecycle.start();
		return this.mcp.callTool({
			serverId: "docs",
			name: "search",
			arguments: { query },
		});
	}
}
```

OAuth callback and elicitation configuration (in `onStart()`):

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { MCPClientManager } from "agents/mcp/client";

export class ToolAgent extends DurableObject<Env> {
	readonly mcp = new MCPClientManager("tool-agent", "1.0.0");
	readonly lifecycle = Lifecycle.install(this).use(this.mcp);

	onStart(): void {
		this.mcp.configureOAuthCallback({
			successRedirect: "/settings/integrations",
			errorRedirect: "/settings/integrations",
		});
		this.mcp.configureElicitationHandlers({
			form: async (request, serverId) => {
				console.log(`${serverId} asks:`, request.params.message);
				// Collect values that match request.params.requestedSchema.
				return { action: "decline" };
			},
		});
	}
}
```

## Options / Props

Constructor `new MCPClientManager(name, version, options?)` third argument:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `env` | — | — | Your Worker's bindings. Required to restore servers reached through a binding. |
| `createAuthProvider` | `(callbackUrl) => AgentMcpOAuthProvider` | — | Builds the OAuth provider for a stored HTTP server. |

`registerServer(id, options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `url` | — | — | Server URL. Private and internal addresses are refused. |
| `name` | — | — | Display name. |
| `callbackUrl` | — | — | Where the OAuth provider sends the user back; route it to the same named object. |
| `transport` | — | — | `type` is `"auto"`, `"streamable-http"`, or `"sse"`; also takes `authProvider` and MCP transport options such as `requestInit` for headers. |
| `client` | — | — | MCP client options, such as `capabilities` to advertise. |
| `clientId` | — | — | A pre-registered OAuth client ID. |
| `retry` | — | 3 attempts, 500 ms base, 5 s max | Retry policy for connecting and reconnecting. |

`connectToServer()` states:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `"connected"` | state | — | Transport open; call `discoverIfConnected()`. |
| `"authenticating"` | state | — | Server needs OAuth; send the user to `authUrl`. |
| `"failed"` | state | — | Connection failed; result includes `error`. |

Methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `discoverIfConnected(id, { timeoutMs? })` | method | 30 s wait | Returns `{ success, state, error? }`. |
| `listTools(filter?)` | method | — | MCP tools from every connected server, each with `serverId`. |
| `getAITools(filter?)` | method | — | Same tools as an AI SDK tool set. |
| `callTool({ serverId, name, arguments })` | method | — | Result of one tool call. |
| `listPrompts(filter?)`, `getPrompt({ serverId, name, arguments })` | method | — | Prompts. |
| `listResources(filter?)`, `listResourceTemplates(filter?)`, `readResource({ serverId, uri })` | method | — | Resources. |
| `waitForConnections({ timeout? })` | method | waits until all settle | Never rejects; call before reading tools after a wake. |
| `configureOAuthCallback({ successRedirect, errorRedirect, customHandler })` | method | — | Choose the response to the OAuth callback. |
| `configureElicitationHandlers({ form, url })` | method | — | Handlers for elicitation modes; only modes with a handler are advertised. |
| `listServers()` | method | — | Every stored server. |
| `mcpConnections[id]` | object | — | Live connection; `connectionState` reports its state. |
| `closeConnection(id)`, `closeAllConnections()` | method | — | Close but keep servers stored. |
| `removeServer(id)` | method | — | Close and delete the server. |
| `onServerStateChanged(listener)` | method | — | Called when a server is added, connects, fails, or is removed; returns a disposable. |
| `onObservabilityEvent(listener)` | method | — | Called for each `mcp:client:*` event. |

A `filter` limits results by `serverId`, `serverName`, or connection `state` (one value or an array).

## Notes

- Adding a server is three calls: `registerServer()` (stores without connecting), `connectToServer()`, `discoverIfConnected()`. Servers stay registered after the object leaves memory; on next start the manager reconnects to every stored server in the background.
- OAuth: the manager is a selective capability. It matches the callback by its `state` parameter, completes the token exchange, connects, and responds before `onRequest()`. By default it redirects to the callback URL's origin. On failure it adds an `error` query parameter to `errorRedirect`; `customHandler: (result) => Response` returns your own page. The error text can come from the OAuth provider, so escape it before rendering. For custom OAuth storage use `createAuthProvider` or `transport.authProvider`.
- Elicitation: configure handlers in `onStart()` so they exist after every wake; advertised modes are stored with each server. Handlers and in-flight calls are in memory only, so retry a call that was waiting for input if the object was evicted.
- RPC calls do not start the Lifecycle: call `await this.lifecycle.start()` first. When the object is destroyed the manager closes every connection.
- Servers are stored in the `cf_agents_mcp_servers` table; the default OAuth provider stores client registrations and tokens in the object's key-value storage.
- Adapted from the official docs: both `onRequest()` examples originally served any caller that reaches the object (listing tools, registering a server, running model-driven tool calls); they now call a fail-closed `isAuthorizedCaller()` placeholder. Also authenticate in the Worker first.
- On the `Agent` class, `this.mcp` is this manager, `addMcpServer()` runs register, connect, and discover in one call, and `removeMcpServer()`, `getMcpServers()`, and `useAgent({ onMcpUpdate })` wrap it. This consumes MCP servers; publishing an MCP server is a different topic (MCP spec: mcp-spec skill).

## Related

- [Capabilities](./capabilities.md)
- [Lifecycle](./lifecycle.md)
- [WebSockets](./websockets.md)
