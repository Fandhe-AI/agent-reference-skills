---
source: https://developers.cloudflare.com/agents/model-context-protocol/apis/handler-api/
---

# createMcpHandler (MCP Server)

`createMcpHandler` from `agents/mcp/server` serves an MCP SDK v2 server from a Worker. It is stateless: a fresh server per request, no Durable Object, protocol session, or WebSocket.

## Signature / Usage

```sh
npm i agents @modelcontextprotocol/server@2.3.1 zod
```

`@modelcontextprotocol/server` is an optional peer dependency of `agents`; use the exact version your installed Agents release requires.

```ts
import {
	createMcpHandler,
	type CreateMcpHandlerOptions,
	type StatelessMcpHandler,
} from "agents/mcp/server";
import type { McpServerFactory } from "@modelcontextprotocol/server";

function createMcpHandler(
	factory: McpServerFactory,
	options?: CreateMcpHandlerOptions,
): StatelessMcpHandler;
```

The factory (sync or async) returns a fresh `McpServer` or `Server` and receives `McpRequestContext`:

```ts
interface McpRequestContext {
	era: "modern" | "legacy";
	authInfo?: AuthInfo;
	requestInfo?: Request;
}
```

Invoke from the Worker's object `fetch()` export:

```ts
const handler = createMcpHandler(createServer);

export default {
	fetch(request, env, ctx) {
		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

Pass the factory itself; do not create a global server or pass a constructed SDK v2 server.

Return value:

```ts
interface StatelessMcpHandler {
	(request: Request, env: unknown, ctx: ExecutionContext): Promise<Response>;
	fetch(request: Request, options?: McpHandlerRequestOptions): Promise<Response>;
	notify: {
		toolsChanged(): void;
		promptsChanged(): void;
		resourcesChanged(): void;
		resourceUpdated(uri: string): void;
	};
}

type McpHandlerRequestOptions = { authInfo?: AuthInfo; parsedBody?: unknown };
```

## Options / Props

`CreateMcpHandlerOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `route` | `string` | `"/mcp"` | Exact path handled by the Worker wrapper |
| `corsOptions` | `CORSOptions \| false` | Wildcard CORS | CORS response headers, or `false` to remove them |
| `allowedHostnames` | `string[]` | Localhost or `workers.dev` route | Optional Host restriction for custom domains |
| `allowedOriginHostnames` | `string[] \| "*"` | Localhost, `workers.dev`, or concrete CORS Origin | Browser Origin restriction, or explicit middleware delegation |
| `authContext` | `McpAuthContext` | Execution context props | Application props returned by `getMcpAuthContext()` |
| `legacy` | `"stateless" \| "reject"` | `"stateless"` | Legacy compatibility or stateless-only rejection |
| `responseMode` | `"auto" \| "json" \| "sse"` | `"auto"` | Stateless response shaping |
| `onerror` | `(error: Error) => void` | None | Out-of-band error reporting |
| `maxSubscriptions` | `number` | `1,024` | Maximum concurrent listen streams |
| `keepAliveMs` | `number` | `15,000` | Keepalive interval for listen streams |

### Return value notifiers

| Notifier | MCP notification |
|----------|------------------|
| `notify.toolsChanged()` | `notifications/tools/list_changed` |
| `notify.promptsChanged()` | `notifications/prompts/list_changed` |
| `notify.resourcesChanged()` | `notifications/resources/list_changed` |
| `notify.resourceUpdated(uri)` | `notifications/resources/updated` |

## Notes

### Origin validation and CORS

- Every present browser Origin is validated; malformed, opaque, and non-HTTP Origins get `403`. Origin-less non-browser clients remain valid. Host checks apply to localhost and `workers.dev` endpoints.
- For a custom domain with wildcard CORS, set `allowedHostnames` and `allowedOriginHostnames` explicitly (hostnames only, no scheme or port):

```ts
const handler = createMcpHandler(createServer, {
	allowedHostnames: ["mcp.example.com"],
	corsOptions: { origin: "https://app.example.com" },
});
```

- `allowedOriginHostnames: "*"` turns off the handler Origin check, including malformed and opaque rejection; use it only when trusted middleware validates Origins first.
- CORS headers are not authentication. Protect the endpoint with OAuth or another layer. The handler does not infer a Host allowlist from `request.url`.

### Behaviour

- Do not export the callable as the Worker default export: Wrangler treats function default exports as `WorkerEntrypoint` classes.
- SDK v1 transport options (`transport`, `storage`, `sessionIdGenerator`, `eventStore`, `enableJsonResponse`) are rejected. Use `responseMode: "json"` instead of `enableJsonResponse: true`; JSON mode drops notifications emitted before the final result.
- Elicitation through the stateless handler returns `input_required` and completes through multi-round-trip requests (MRTR). Each retry carries only the previous round's `inputResponses` plus the latest `requestState`; seal trusted intermediate values into integrity-protected `requestState`. Use `inputRequired(...)` and `acceptedContent(...)`.
- Legacy lane (`legacy: "stateless"`): each POST gets a new server and transport; GET and DELETE return `405`; no session ID; pushed elicitation, sampling, and roots fail; no standalone streams, resumability, or replay; experimental tasks unsupported. Use `legacy: "reject"` for a stateless-only endpoint.
- `notify` is isolate-local and routed per handler instance: create the handler once at module scope when using `notify` or `subscriptions/listen`. A notification with no open subscription is a no-op.
- Props from OAuth often hold upstream access tokens: do not log or return them.
- The `handler.fetch(request, { authInfo, parsedBody })` form does not derive `authInfo` from headers or verify tokens; verify first and replace the sample verifier.

### Adapted examples

Adapted (not in the official docs): the admin route compares against `Bearer ${env.ADMIN_TOKEN}`, which matches the string `Bearer undefined` when the secret is unset; this version rejects when the secret is missing and compares in constant time. See Notes.

```ts
const handler = createMcpHandler(createServer);

export default {
	async fetch(request, env, ctx) {
		const url = new URL(request.url);

		if (url.pathname === "/admin/tools-changed" && request.method === "POST") {
			const enc = new TextEncoder();
			const provided = enc.encode(request.headers.get("Authorization") ?? "");
			const expected = enc.encode(`Bearer ${env.ADMIN_TOKEN}`);
			if (
				!env.ADMIN_TOKEN ||
				provided.byteLength !== expected.byteLength ||
				!crypto.subtle.timingSafeEqual(provided, expected)
			) {
				return new Response("Unauthorized", { status: 401 });
			}
			handler.notify.toolsChanged();
			return new Response(null, { status: 204 });
		}

		return handler(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

- Adapted from the official docs: added the `!env.ADMIN_TOKEN` fail-closed check to the admin route, and replaced the `!==` string comparison with `crypto.subtle.timingSafeEqual` (after a length check) so the token cannot be recovered through response timing.

Passing your own authentication via `authContext` (`getMcpAuthContext()` then returns `props`, also inside the factory so tools can be registered per user):

```ts
async function authenticate(request: Request): Promise<Props | undefined> {
	// Replace with your own session or token check.
	return undefined;
}

export default {
	async fetch(request, env, ctx) {
		const props = await authenticate(request);
		if (!props) return new Response("Unauthorized", { status: 401 });
		return createMcpHandler(createServer, { authContext: { props } })(request, env, ctx);
	},
} satisfies ExportedHandler<Env>;
```

- Adapted from the official docs: the source `authenticate` hard-codes `Bearer dev-token`; this fence leaves a fail-closed stub (always unauthenticated) that you must replace.
- Distance lines: the protocol spec is mcp-spec; Claude Code consuming MCP is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps (Apps SDK servers can use this handler) are openai-apps-sdk.

## Related

- [Authorization](./authorization.md)
- [Tools](./tools.md)
- [Migrate to MCP SDK v2](./migrate-to-mcp-sdk-v2.md)
- [McpAgent (deprecated)](./agent-api.md)
- [Securing MCP servers](./securing-mcp-server.md)
