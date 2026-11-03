---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/oauth-mcp-client/
---

# Handle OAuth with MCP servers

Implement OAuth flows in a Cloudflare Agent so it can connect to OAuth-protected MCP servers (for example Slack or Notion).

## Signature / Usage

Flow: call `addMcpServer()`; if OAuth is required an `authUrl` is returned instead of connecting; present it to the user; the provider redirects back to the Agent's callback URL; the Agent completes the connection. The built-in `DurableObjectOAuthClientProvider` stores a nonce and server ID, validates on callback, and cleans up after use or expiry.

Adapted (not in the official docs): `authUrl` is read through the `state` discriminant, the `/disconnect` body is validated, and `routeAgentRequest` authenticates callers (fail closed, without `cors: true`). See Notes.

```ts
import { Agent, routeAgentRequest } from "agents";

export class MyAgent extends Agent<Env> {
	onStart() {
		this.mcp.configureOAuthCallback({
			customHandler: () => {
				// Close popup after OAuth completes (success or failure)
				return new Response("<script>window.close();</script>", {
					headers: { "content-type": "text/html" },
				});
			},
		});
	}

	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.endsWith("/connect") && request.method === "POST") {
			const result = await this.addMcpServer(
				"Cloudflare API",
				"https://mcp.cloudflare.com/mcp",
			);
			if (result.state === "authenticating") {
				return Response.json({
					serverId: result.id,
					authUrl: result.authUrl,
					message: "Please authorize access",
				});
			}
			return Response.json({ serverId: result.id, status: "connected" });
		}

		if (url.pathname.endsWith("/status") && request.method === "GET") {
			const mcpState = this.getMcpServers();
			return Response.json(
				Object.entries(mcpState.servers).map(([id, server]) => ({
					serverId: id,
					name: server.name,
					state: server.state,
					authUrl: server.auth_url,
				})),
			);
		}

		if (url.pathname.endsWith("/disconnect") && request.method === "POST") {
			let body: unknown;
			try {
				body = await request.json();
			} catch {
				return new Response("Invalid JSON", { status: 400 });
			}
			const { serverId } = (body ?? {}) as Record<string, unknown>;
			if (typeof serverId !== "string") {
				return new Response("serverId is required", { status: 400 });
			}
			await this.removeMcpServer(serverId);
			return Response.json({ message: "Disconnected" });
		}

		return new Response("Not found", { status: 404 });
	}
}

type User = { id: string };

async function authenticate(request: Request, env: Env): Promise<User | null> {
	// Verify a session cookie, a JWT, or an API key here.
	// This placeholder rejects every request until you implement verification.
	return null;
}

const check = async (
	env: Env,
	req: Request,
	route: { name: string },
): Promise<Response | void> => {
	const user = await authenticate(req, env);
	if (!user) return new Response("Unauthorized", { status: 401 });
	// Each user can only reach the agent named after them.
	if (route.name !== user.id) return new Response("Forbidden", { status: 403 });
};

export default {
	async fetch(request: Request, env: Env) {
		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: (req, route) => check(env, req, route),
				onBeforeRequest: (req, route) => check(env, req, route),
			})) || new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

### Callback behaviour

By default success redirects to your application origin and failure shows an HTML error page. Redirect instead:

```ts
this.mcp.configureOAuthCallback({
	successRedirect: "/dashboard",
	errorRedirect: "/auth-error", // failure adds ?error=<message>
});
```

### Present the authUrl

Redirect (`Response.redirect(authUrl, 302)`), open a popup (`window.open(authUrl, '_blank', 'width=600,height=700')`), show a link, or use a deep link for mobile apps.

### Monitor status (React)

Adapted (not in the official docs): the initial state includes `resourceTemplates`, and the agent `name` is the signed-in user's id to match the routing check above. See Notes.

```tsx
import { useAgent } from "agents/react";
import { useState } from "react";
import type { MCPServersState } from "agents";

function App({ userId }: { userId: string }) {
	const [mcpState, setMcpState] = useState<MCPServersState>({
		prompts: [],
		resources: [],
		resourceTemplates: [],
		servers: {},
		tools: [],
	});

	const agent = useAgent({
		agent: "my-agent",
		name: userId,
		onMcpUpdate: (mcpServers: MCPServersState) => setMcpState(mcpServers),
	});

	return (
		<div>
			{Object.entries(mcpState.servers).map(([id, server]) => (
				<div key={id}>
					<strong>{server.name}</strong>: {server.state}
					{server.state === "authenticating" && server.auth_url && (
						<button onClick={() => window.open(server.auth_url, "_blank")}>
							Authorize
						</button>
					)}
					{server.state === "failed" && server.error && (
						<p className="error">{server.error}</p>
					)}
				</div>
			))}
		</div>
	);
}
```

`onMcpUpdate` fires on every MCP state change; no polling. Other frameworks poll an endpoint such as `/status`.

## Notes

- States flow `authenticating` (needs OAuth) to `connecting` to `ready`. On failure the state is `failed` and the message is in `server.error` (escaped by the SDK, safe to display). Failed connections stay until `removeMcpServer(serverId)`; to retry, remove then re-add.
- Common failures: user canceled, invalid credentials, permission denied, expired session.
- Corrected from the official docs: the source destructures `const { id, authUrl } = await this.addMcpServer(...)`, but only the `state: "authenticating"` member of the returned union has `authUrl`, so TypeScript rejects it; the fence narrows on `result.state` as in the [MCP Client API](./client-api.md). The source's React initial state also omits `resourceTemplates`, which `MCPServersState` requires.
- Adapted from the official docs: the source routes with `routeAgentRequest(request, env, { cors: true })` and no checks, so any caller could connect, list, or disconnect MCP servers on any instance, and `/disconnect` casts an unvalidated JSON body. The fence adds the routing-authentication hooks with a placeholder `authenticate()` that rejects every request until you implement verification, binds the instance name to the authenticated user id (the React client passes that id as `name`), and returns `400` for a malformed body.
- Adapted from the official docs: the source retry sample calls `/disconnect` and `/connect` with JSON bodies and no `Content-Type` header or authentication, and `/connect` there takes a caller-supplied URL. Authenticate these endpoints and allowlist server URLs (see [Connect to an MCP server](./connect-mcp-client.md)).
- Adapted from the official docs: the source's `{ cors: true }` is dropped. It sends `Access-Control-Allow-Origin: *` on every matched response, which lets any site call these endpoints from a browser and cannot carry the session cookie the OAuth callback relies on. Serve the client from the same origin, or pass explicit CORS headers for one trusted origin (routing-options reference).
- The OAuth callback (`/agents/<agent>/<name>/callback` by default) also passes through `onBeforeRequest`. It is a top-level browser redirect that carries no `Authorization` header, so `authenticate()` must recognize the browser session there (for example a session cookie), or the connection never leaves `authenticating`.
- Never log OAuth tokens or the callback's `code`/`state`. Tokens are stored in the Agent's SQLite storage. PKCE and `state` validation are handled by the built-in provider.
- Distance lines: this is a Cloudflare Agent as OAuth MCP client. Claude Code `/mcp` auth is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; the OAuth spec is mcp-spec; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Connect to an MCP server](./connect-mcp-client.md)
- [MCP Client API](./client-api.md)
