---
source: https://developers.cloudflare.com/agents/model-context-protocol/apis/client-api/
---

# MCP Client (addMcpServer / MCPClientManager)

Connect an Agent to external MCP servers to use their tools, resources, and prompts. The client uses `@modelcontextprotocol/client` and negotiates stateless or legacy behaviour automatically; it does not need `@modelcontextprotocol/sdk` or `@modelcontextprotocol/server`.

## Signature / Usage

```ts
import { Agent } from "agents";

export class MyAgent extends Agent {
	async onRequest(request: Request) {
		// Add an MCP server
		const result = await this.addMcpServer(
			"github",
			"https://mcp.github.com/mcp",
		);

		if (result.state === "authenticating") {
			// Server requires OAuth - redirect user to authorize
			return Response.redirect(result.authUrl);
		}

		// Server is ready - tools are now available
		const state = this.getMcpServers();
		console.log(`Connected! ${state.tools.length} tools available`);

		return new Response("MCP server connected");
	}
}
```

Connections persist in the Agent's SQL storage; all tools from a connected server become available automatically.

### addMcpServer

```ts
// HTTP transport (Streamable HTTP, SSE)
async addMcpServer(
  serverName: string,
  url: string,
  options?: {
    id?: string;
    callbackHost?: string;
    callbackPath?: string;
    agentsPrefix?: string;
    client?: McpClientOptions;
    transport?: {
      headers?: HeadersInit;
      type?: "sse" | "streamable-http" | "auto";
    };
    retry?: RetryOptions;
  }
): Promise<
  | { id: string; state: "authenticating"; authUrl: string }
  | { id: string; state: "ready" }
>

// RPC transport (Durable Object binding for an McpAgent)
async addMcpServer(
  serverName: string,
  binding: DurableObjectNamespace<McpAgent>,
  options?: { id?: string; props?: Record<string, unknown> }
): Promise<{ id: string; state: "ready" }>
```

### Other methods

```ts
async removeMcpServer(id: string): Promise<void>
getMcpServers(): MCPServersState
this.mcp.configureOAuthCallback(options: {
  successRedirect?: string;
  errorRedirect?: string;
  customHandler?: () => Response | Promise<Response>;
}): void
this.mcp.configureElicitationHandlers(handlers?: {
  form?: (request: ElicitRequest, serverId: string, signal?: AbortSignal) => Promise<ElicitResult>;
  url?: (request: ElicitRequest, serverId: string, signal?: AbortSignal) => Promise<ElicitResult>;
}): void
```

```ts
type MCPServersState = {
	servers: Record<
		string,
		{
			name: string;
			server_url: string;
			auth_url: string | null;
			state: "authenticating" | "connecting" | "connected" | "discovering" | "ready" | "failed";
			capabilities: ServerCapabilities | null;
			instructions: string | null;
			error: string | null;
		}
	>;
	tools: Array<Tool & { serverId: string }>;
	prompts: Array<Prompt & { serverId: string }>;
	resources: Array<Resource & { serverId: string }>;
	resourceTemplates: Array<ResourceTemplate & { serverId: string }>;
};
```

### MCPClientManager (`this.mcp`)

Step-by-step connection:

```ts
const id = "my-server";
await this.mcp.registerServer(id, {
	url: "https://mcp.example.com/mcp",
	name: "My Server",
	callbackUrl: "https://my-worker.workers.dev/agents/my-agent/default/callback",
	transport: { type: "auto" },
});

const connectResult = await this.mcp.connectToServer(id);
if (connectResult.state === "failed") {
	console.error("Connection failed:", connectResult.error);
	return;
}
if (connectResult.state === "authenticating") {
	console.log("OAuth required:", connectResult.authUrl);
	return;
}
if (connectResult.state === "connected") {
	const discoverResult = await this.mcp.discoverIfConnected(id);
	if (!discoverResult?.success) {
		console.error("Discovery failed:", discoverResult?.error);
	}
}
```

| Method | Signature | Purpose |
|--------|-----------|---------|
| `registerServer` | `(id, { url, name, callbackUrl, client?, transport? }) => Promise<string>` | Register without connecting |
| `connectToServer` | `(id) => Promise<MCPConnectionResult>` | `failed` / `authenticating` / `connected` |
| `discoverIfConnected` | `(serverId, { timeoutMs? }?) => Promise<MCPDiscoverResult \| undefined>` | Discover capabilities; moves `connected` to `ready` |
| `waitForConnections` | `({ timeout? }?) => Promise<void>` | Wait for in-flight connection and discovery after hibernation |
| `closeConnection` | `(id) => Promise<void>` | Close one connection, keep registration |
| `closeAllConnections` | `() => Promise<void>` | Close all, keep registrations |
| `listTools` | `(filter?) => Array<Tool & { serverId }>` | Raw catalog, no schema conversion |
| `getAITools` | `(filter?) => ToolSet` | AI SDK tools, namespaced by server ID |
| `onServerStateChanged` | `(listener) => disposable` | Subscribe to state changes |

`MCPServerFilter` (from `agents/mcp/client`) AND-combines `serverId`, `serverName`, `state`; it also applies to `listPrompts()`, `listResources()`, `listResourceTemplates()`:

```ts
const githubTools = this.mcp.getAITools({ serverId: "github" });
const readyTools = this.mcp.getAITools({ state: "ready" });
```

AI SDK use:

Adapted (not in the official docs): `stopWhen: stepCountIs(5)` is added; without it the AI SDK stops after one step, so the model never sees the tool results it requested. See Notes.

```ts
import { generateText, stepCountIs } from "ai";
import { createAI } from "agents/models/ai-sdk";

const ai = createAI({ binding: this.env.AI });
const response = await generateText({
	model: ai("@cf/zai-org/glm-4.7-flash"),
	prompt: "What's the weather in San Francisco?",
	tools: this.mcp.getAITools(),
	stopWhen: stepCountIs(5),
});
```

### Elicitation

Register handlers per mode in `onStart()`. Actions are `accept`, `decline`, `cancel`; include `content` only for accepted form responses.

```ts
this.mcp.configureElicitationHandlers({
	form: async (request) => {
		const content = await showFormToUser(request.params.requestedSchema);
		return content ? { action: "accept", content } : { action: "cancel" };
	},
});
```

To answer from a browser, broadcast the request and resolve a pending promise from a `@callable()` method with a timeout shorter than the 60 s MCP request default (the official example uses 55 s):

```ts
import { Agent, callable } from "agents";
import type { ElicitRequest, ElicitResult } from "agents/mcp/client";

type PendingResolver = {
	resolve: (result: ElicitResult) => void;
	timeout: ReturnType<typeof setTimeout>;
};

class MyAgent extends Agent<Env> {
	private pendingElicitations = new Map<string, PendingResolver>();

	onStart() {
		this.mcp.configureElicitationHandlers({
			form: (request, serverId) => this.forward(request, serverId),
			url: (request, serverId) => this.forward(request, serverId),
		});
	}

	private forward(request: ElicitRequest, serverId: string): Promise<ElicitResult> {
		const id = crypto.randomUUID();
		const result = new Promise<ElicitResult>((resolve) => {
			const timeout = setTimeout(() => {
				if (this.pendingElicitations.delete(id)) resolve({ action: "cancel" });
			}, 55_000);
			this.pendingElicitations.set(id, { resolve, timeout });
		});
		this.broadcast(
			JSON.stringify({ type: "mcp-elicitation", id, serverId, params: request.params }),
		);
		return result;
	}

	@callable()
	respondToElicitation(id: string, result: ElicitResult) {
		const pending = this.pendingElicitations.get(id);
		if (!pending) return;
		this.pendingElicitations.delete(id);
		clearTimeout(pending.timeout);
		pending.resolve(result);
	}
}
```

### Error handling

```ts
import { isUnauthorized, isTransportNotImplemented } from "agents";

try {
	await this.addMcpServer("Server", "https://mcp.example.com/mcp");
} catch (error) {
	if (isUnauthorized(error)) {
		return new Response("Authentication required", { status: 401 });
	} else if (isTransportNotImplemented(error)) {
		return new Response("Transport not supported", { status: 400 });
	}
	throw error;
}
```

## Options / Props

`addMcpServer` options (HTTP transport):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `string` | generated `nanoid(8)` | Stable caller-supplied ID; normalized with `normalizeServerId` (`"GitHub MCP!"` becomes `"github-mcp"`); tools surface as `tool_<id>_<name>`; an existing auto-ID registration migrates transparently; throws only if the ID belongs to a different `(name, url)` |
| `callbackHost` | `string` | derived from the incoming request or WebSocket URI | Host for the OAuth callback; needed mainly for custom domains |
| `callbackPath` | `string` | `/agents/{class}/{name}/callback` | Custom callback path; required when `sendIdentityOnConnect` is `false`; you must route it to the instance with `getAgentByName` |
| `agentsPrefix` | `string` | `"agents"` | Callback path prefix; ignored with `callbackPath` |
| `client` | `McpClientOptions` | — | Supported subset from `@modelcontextprotocol/client`; `client.capabilities.elicitation` narrows advertised modes |
| `transport.headers` | `HeadersInit` | — | Custom HTTP headers (for example bearer tokens) |
| `transport.type` | `"auto" \| "streamable-http" \| "sse"` | `"auto"` | Transport (`sse` is legacy) |
| `retry` | `RetryOptions` | 3 attempts, 500 ms base delay, 5 s max delay | Persisted; used on restore after hibernation or OAuth completion |

RPC transport options: `id` (as above) and `props` (`Record<string, unknown>`, default —; read as `this.props` in the `McpAgent`).

## Notes

- Source inconsistency: the official signature block for `registerServer()` lists `clientOptions?` / `transportOptions?`, while the examples on the same page and the `MCPClientManager` reference (runtime category) pass `client` / `transport`. The table follows the examples and the manager reference (`client?`, `transport?`).
- Corrected from the official docs: the example omitted `stopWhen`, and AI SDK `generateText` / `streamText` stop after a single step by default, so a tool call is executed but no answer is generated from its result; `stopWhen: stepCountIs(5)` (an example limit) lets the model continue after tool results.
- Idempotent when name and normalized URL both match an active connection (safe in `onStart()`). Same name with a different URL creates a second connection; call `removeMcpServer(oldId)` first to replace.
- URL security: private ranges (RFC 1918), unspecified addresses, link-local, IPv6 unique-local, IPv4-mapped private addresses, and `metadata.google.internal` are blocked; loopback (`localhost`, `127.x.x.x`, `[::1]`) is allowed for development.
- OAuth callback is matched by the `state` query parameter (`{serverId}:{stateValue}`), not the path. OAuth tokens are stored in SQLite. With `sendIdentityOnConnect: false` (`static options`) the default callback URL would leak the instance name, so set `callbackPath` and route it yourself.
- Custom headers: keep bearer tokens and `CF-Access-Client-Secret` values in Worker secrets (`this.env`), never hard-coded.
- RPC transport connects only to the deprecated `McpAgent`, has no OAuth flow, and is restored after hibernation; import `RPCClientTransport` and `RPC_DO_PREFIX` from `agents/mcp/client`, not `agents/mcp`.
- Custom OAuth: override `createMcpOAuthProvider(callbackUrl)` returning an `AgentMcpOAuthProvider` (for pre-registered client credentials; read `client_id`/`client_secret` from `this.env`), or pass your own storage adapter to `DurableObjectOAuthClientProvider(storage, this.name, callbackUrl)`. The default provider uses Dynamic Client Registration.
- Form-mode elicitation is for non-sensitive input only; never request passwords, API keys, tokens, or payment credentials. URL mode: show the server, host, and full URL, get consent, open outside the model's view, never prefetch, treat the URL as untrusted, expect HTTPS in production; `accept` means consent to open, not completion.
- `respondToElicitation` is `@callable()`, so any connected client can answer a pending elicitation. Authenticate connections (see the routing-authentication reference) and, if several users share an instance, record the connection that should answer and reject others. Likewise, `addMcpServer()` with a caller-supplied URL in a public `onRequest` handler is an SSRF/credential-forwarding risk: allowlist server URLs and never forward client credentials in `transport.headers`.
- Do not advertise a mode without a handler. `callTool(params, resultSchema, options)` is deprecated; prefer `callTool(params, options)`. `getAITools()` converts schemas to Zod; use `listTools()` for plain discovery.
- Fragments: the step-by-step and elicitation snippets are method-body fragments: they use `this.mcp` inside an Agent subclass method, `return` outside a function wrapper, and an undefined `showFormToUser` helper you must supply.
- Distance lines: this is a Cloudflare Agent acting as MCP client. Claude Code as client is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; the protocol is mcp-spec; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Connect to an MCP server](./connect-mcp-client.md)
- [Handle OAuth with MCP servers](./oauth-mcp-client.md)
- [createMcpHandler API](./handler-api.md)
- [Migrate to MCP SDK v2](./migrate-to-mcp-sdk-v2.md)
- [McpAgent (deprecated)](./agent-api.md)
