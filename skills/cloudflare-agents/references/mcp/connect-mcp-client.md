---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/connect-mcp-client/
---

# Connect to an MCP server

Create a Cloudflare Agent that connects to an external MCP server with `addMcpServer()` and lists its tools.

## Signature / Usage

```sh
npm create cloudflare@latest -- my-mcp-client --template=cloudflare/ai/demos/hello-world
cd my-mcp-client
```

Add endpoints to connect and to inspect MCP state.

Adapted (not in the official docs): the source accepts any `serverUrl` from an unauthenticated POST, making the Agent an open connector to arbitrary hosts; this version allows only listed origins, validates the JSON body, reads `authUrl` through the `state` discriminant, and authenticates callers in `routeAgentRequest` (fail closed, without `cors: true`). See Notes.

```ts
import { Agent, routeAgentRequest } from "agents";

const ALLOWED_MCP_ORIGINS = new Set(["https://docs.mcp.cloudflare.com"]);

export class HelloAgent extends Agent<Env> {
	async onRequest(request: Request): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname.endsWith("add-mcp") && request.method === "POST") {
			let body: unknown;
			try {
				body = await request.json();
			} catch {
				return new Response("Invalid JSON", { status: 400 });
			}
			const { serverUrl, name } = (body ?? {}) as Record<string, unknown>;
			if (typeof serverUrl !== "string" || typeof name !== "string") {
				return new Response("serverUrl and name are required", { status: 400 });
			}

			let origin: string;
			try {
				origin = new URL(serverUrl).origin;
			} catch {
				return new Response("Invalid serverUrl", { status: 400 });
			}
			if (!ALLOWED_MCP_ORIGINS.has(origin)) {
				return new Response("MCP server not allowed", { status: 403 });
			}

			const result = await this.addMcpServer(name, serverUrl);

			if (result.state === "authenticating") {
				// OAuth required - return auth URL
				return Response.json({ serverId: result.id, authUrl: result.authUrl });
			}
			return Response.json({ serverId: result.id, status: "connected" });
		}

		// List MCP state (servers, tools, etc)
		if (url.pathname.endsWith("mcp-state") && request.method === "GET") {
			return Response.json(this.getMcpServers());
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

Test locally once `authenticate()` accepts your credential (`<USER_ID>` is the authenticated user's id, `<TOKEN>` whatever credential your `authenticate()` verifies):

Adapted (not in the official docs): the requests target the authenticated user's instance and send a credential, because the Worker above rejects unauthenticated callers. See Notes.

```sh
npm start
curl -X POST "http://localhost:8788/agents/hello-agent/<USER_ID>/add-mcp" \
	-H "Authorization: Bearer <TOKEN>" \
	-H "Content-Type: application/json" \
	-d '{"serverUrl": "https://docs.mcp.cloudflare.com/mcp", "name": "Example Server"}'
curl "http://localhost:8788/agents/hello-agent/<USER_ID>/mcp-state" \
	-H "Authorization: Bearer <TOKEN>"
```

`addMcpServer()` returns an `authUrl` when the server needs OAuth; the user must visit it to authorize. `getMcpServers()` returns servers with connection state and their tools.

## Notes

- Adapted from the official docs: added an origin allowlist (and typed `Response.json`). The SDK additionally blocks private, link-local, and metadata addresses (see [MCP Client API](./client-api.md)).
- Corrected from the official docs: the source destructures `const { id, authUrl } = await this.addMcpServer(...)`, but the return type is a union in which only the `state: "authenticating"` member has `authUrl`, so TypeScript rejects it; the fence narrows on `result.state` as in the [MCP Client API](./client-api.md) examples. The source also cast `await request.json()` without handling malformed JSON or checking field types; the fence returns `400` instead of throwing.
- Adapted from the official docs: the source exposes these endpoints through `routeAgentRequest(request, env, { cors: true })` with no checks, so any caller could add or list MCP servers on any instance. The fence adds the routing-authentication hooks with a placeholder `authenticate()` that rejects every request until you implement verification, and binds the instance name to the authenticated user id; the curl examples therefore address `<USER_ID>` instead of `default` and send a credential.
- The OAuth callback (`/agents/<agent>/<name>/callback` by default) also passes through `onBeforeRequest`. It is a top-level browser redirect that carries no `Authorization` header, so `authenticate()` must recognize the browser session there (for example a session cookie), or the connection never leaves `authenticating`.
- Adapted from the official docs: the source's `{ cors: true }` is dropped. It sends `Access-Control-Allow-Origin: *` on every matched response, which lets any site call these endpoints from a browser and cannot carry the session cookie the OAuth callback relies on. Serve the client from the same origin, or pass explicit CORS headers for one trusted origin (routing-options reference).
- Connections persist in the Agent's SQL storage and remain active across requests.
- Distance lines: this is the Cloudflare Agent acting as MCP client. Claude Code as client is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; the protocol is mcp-spec; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Handle OAuth with MCP servers](./oauth-mcp-client.md)
- [MCP Client API](./client-api.md)
