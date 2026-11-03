---
source: https://developers.cloudflare.com/agents/model-context-protocol/protocol/authorization/
---

# Authorization

Protect an MCP server with OAuth 2.1 using Workers OAuth Provider: an authorization server (`OAuthAuthorizationServer`) and a resource server (`OAuthResourceServer`) around `createMcpHandler`.

## Signature / Usage

```sh
npm i @cloudflare/workers-oauth-provider
```

Roles: the authorization server signs users in and issues tokens; the resource server (your MCP server) accepts tokens and validates each with the authorization server over a Service Binding. One authorization server can serve several MCP servers.

Flow: client sends request without token, MCP server returns `401` pointing at protected resource metadata, client signs in at `/authorize` and `/oauth/token`, then retries with the token; the MCP server calls `validateToken()` over the Service Binding and receives the props stored at sign-in.

### Authorization server

Adapted (not in the official docs): the source `/authorize` hard-codes `{ id: "user-123" }` as the signed-in user, which grants every caller an authorization. This version fails closed when no user is signed in; see Notes.

```ts
import {
	AuthorizationError,
	OAuthAuthorizationServer,
	type AuthRequest,
} from "@cloudflare/workers-oauth-provider";
import { env, WorkerEntrypoint } from "cloudflare:workers";

const SCOPES = ["mcp:read", "mcp:write", "offline_access"];

const authorizationServer = new OAuthAuthorizationServer<Env>({
	issuer: env.ISSUER, // this Worker's URL
	resources: [env.MCP_SERVER_URL], // the MCP servers it issues tokens for
	scopesSupported: SCOPES,
	clientIdMetadataDocumentEnabled: true,
	// Optional: Dynamic Client Registration for older MCP clients.
	clientRegistrationEndpoint: "/oauth/register",
});

// Replace with your own sign-in. Return undefined when no one is signed in.
async function getSignedInUser(
	request: Request,
): Promise<{ id: string; name: string } | undefined> {
	return undefined;
}

async function authorize(request: Request, env: Env): Promise<Response> {
	const oauth = authorizationServer.getOAuthApi(env);

	let authRequest: AuthRequest;
	try {
		// Validates the client, redirect URI, resource, and PKCE.
		authRequest = await oauth.parseAuthRequest(request);
	} catch (error) {
		if (!(error instanceof AuthorizationError)) throw error;
		if (error.redirectTo) return Response.redirect(error.redirectTo, 302);
		return new Response(error.description, { status: 400 });
	}

	const user = await getSignedInUser(request);
	if (!user) return new Response("Sign-in required", { status: 401 });

	// Production: show a consent page first (see Securing MCP servers).
	const { redirectTo } = await oauth.completeAuthorization({
		request: authRequest,
		userId: user.id,
		metadata: {},
		scope: authRequest.scope.filter((scope) => SCOPES.includes(scope)),
		props: { userId: user.id, name: user.name },
	});
	return Response.redirect(redirectTo, 302);
}

export default class AuthServer extends WorkerEntrypoint<Env> {
	fetch(request: Request) {
		if (new URL(request.url).pathname === "/authorize") {
			return authorize(request, this.env);
		}
		return authorizationServer.fetch(request, this.env, this.ctx);
	}

	// MCP servers call this over their Service Binding.
	validateToken(resource: string, token: string) {
		return authorizationServer.validateToken(resource, token, this.env);
	}
}
```

Grants and tokens are stored in a KV namespace bound as `OAUTH_KV` (`npx wrangler kv namespace create OAUTH_KV`). `global_fetch_strictly_public` is required for Client ID Metadata Documents because the server fetches client-supplied URLs.

```jsonc
{
	"name": "auth-server",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat", "global_fetch_strictly_public"],
	"vars": {
		"ISSUER": "https://auth-server.<your-subdomain>.workers.dev",
		"MCP_SERVER_URL": "https://mcp-server.<your-subdomain>.workers.dev/mcp",
	},
	"kv_namespaces": [{ "binding": "OAUTH_KV", "id": "<YOUR_KV_NAMESPACE_ID>" }],
}
```

### Resource server (the MCP server)

```ts
import {
	OAuthResourceServer,
	insufficientScope,
	type AuthorizationServerBinding,
} from "@cloudflare/workers-oauth-provider";
import { McpServer } from "@modelcontextprotocol/server";
import { createMcpHandler, getMcpAuthContext } from "agents/mcp/server";
import { env } from "cloudflare:workers";

type AuthProps = { userId: string; name: string };

interface Env {
	AUTH_SERVER: AuthorizationServerBinding<AuthProps>;
	AUTH_SERVER_URL: string;
	MCP_SERVER_URL: string;
}

function createServer() {
	const server = new McpServer({ name: "my-mcp-server", version: "1.0.0" });
	const props = getMcpAuthContext()?.props as AuthProps;

	server.registerTool(
		"whoami",
		{ description: "Return the signed-in user" },
		async () => ({
			content: [{ type: "text", text: `Hello, ${props.name}!` }],
		}),
	);

	return server;
}

const mcpHandler = createMcpHandler(createServer);

export default new OAuthResourceServer<Env, AuthProps>({
	resourceMetadata: {
		resource: env.MCP_SERVER_URL, // the URL MCP clients connect to
		authorization_servers: [env.AUTH_SERVER_URL],
	},
	// Advertised, not enforced: check scopes in the handler.
	requiredScopes: ["mcp:read"],
	validateToken: (env) => env.AUTH_SERVER.validateToken,
	handler: {
		fetch(request, env, ctx) {
			if (!ctx.auth.scope.includes("mcp:read")) {
				return insufficientScope(ctx.auth, ["mcp:read"]);
			}
			// ctx.props is what completeAuthorization() stored;
			// createMcpHandler exposes it to tools through getMcpAuthContext().
			return mcpHandler(request, env, ctx);
		},
	},
});
```

The MCP server binds to the authorization server, so token checks stay on Cloudflare's network and it needs no KV of its own:

```jsonc
{
	"name": "mcp-server",
	"main": "src/index.ts",
	// Set this to today's date
	"compatibility_date": "2026-11-03",
	"compatibility_flags": ["nodejs_compat"],
	"vars": {
		"AUTH_SERVER_URL": "https://auth-server.<your-subdomain>.workers.dev",
		"MCP_SERVER_URL": "https://mcp-server.<your-subdomain>.workers.dev/mcp",
	},
	"services": [{ "binding": "AUTH_SERVER", "service": "auth-server" }],
}
```

Deploy the authorization server first, then the MCP server.

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `OAuthAuthorizationServer.issuer` | — | — | This Worker's URL |
| `OAuthAuthorizationServer.resources` | — | — | MCP server URLs it issues tokens for |
| `OAuthAuthorizationServer.scopesSupported` | — | — | Scopes it can grant |
| `OAuthAuthorizationServer.clientIdMetadataDocumentEnabled` | — | — | Enables Client ID Metadata Documents |
| `OAuthAuthorizationServer.clientRegistrationEndpoint` | — | — | Optional Dynamic Client Registration path |
| `OAuthResourceServer.resourceMetadata` | — | — | `resource` (URL clients connect to) and `authorization_servers` |
| `OAuthResourceServer.requiredScopes` | — | — | Scopes advertised to clients; not enforced |
| `OAuthResourceServer.validateToken` | — | — | Selects the Service Binding's `validateToken` |
| `OAuthResourceServer.handler` | — | — | Runs only for valid tokens; receives `ctx.auth` and `ctx.props` |

## Notes

- Corrected from the official docs: the source `/authorize` example signs in a hard-coded user (`user-123`) and calls `completeAuthorization()` immediately, so every client is authorized for that identity. The fence above fails closed and notes that a consent page is required; use `describeConsent()`, `beginConsent()`, `approveConsent()`, `denyConsent()` and, for GitHub/Google sign-in, `beginUpstream()` / `finishUpstream()` (see [Securing MCP servers](./securing-mcp-server.md)).
- `MCP_SERVER_URL` must be exactly the URL clients connect to; every token is bound to it and tokens for another resource are rejected. Locally, set `http://localhost` URLs in each Worker's `.dev.vars` (add `.dev.vars` to `.gitignore`); `http` is accepted only on loopback hosts.
- Props passed to `completeAuthorization()` are encrypted and reach the MCP server as `ctx.props` / `getMcpAuthContext()`. They often hold upstream access tokens: never log or return them.
- Permission-based tools: check `props.permissions` inside a tool handler (the model sees the denial) or register tools conditionally in the factory (the model never sees them). For scope gating return `insufficientScope(ctx.auth, [...])` so the client asks for step-up consent.
- Cloudflare Access can sign users in (see https://developers.cloudflare.com/cloudflare-one/access-controls/ai-controls/secure-mcp-servers/). Identity-provider demos exist for Stytch, Auth0, WorkOS, and Descope; if Dynamic Client Registration is on for a Descope MCP server resource, configure an approval step.
- An older combined `OAuthProvider` deployment is documented in [McpAgent (deprecated)](./agent-api.md); the split roles above are current.
- Distance lines: the OAuth/authorization specification is mcp-spec; Claude Code MCP auth is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Securing MCP servers](./securing-mcp-server.md)
- [createMcpHandler API](./handler-api.md)
- [Build a Remote MCP server](./remote-mcp-server.md)
- [MCP governance](./governance.md)
