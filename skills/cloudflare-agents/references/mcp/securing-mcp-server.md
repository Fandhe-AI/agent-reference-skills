---
source: https://developers.cloudflare.com/agents/model-context-protocol/guides/securing-mcp-server/
---

# Securing MCP servers

What to get right when protecting an MCP server with Workers OAuth Provider: the consent page, third-party sign-in, and per-request checks on the MCP server.

## Signature / Usage

Every MCP client can register itself, so `/authorize` must ask the user whether this client may act for them before calling `completeAuthorization()`. The page must show the client name, the scopes, and the hostname that receives tokens, and must not be frameable or forgeable.

The consent flow uses the form below: the form carries only a single-use `handle`; the authorization request stays on the server.

```ts
async function authorize(request: Request, env: Env): Promise<Response> {
	const oauth = authorizationServer.getOAuthApi(env);
	const user = await getSignedInUser(request);
	if (!user)
		return Response.redirect(new URL("/login", request.url).toString(), 302);

	if (request.method === "GET") {
		const authRequest = await oauth.parseAuthRequest(request);
		const details = await oauth.describeConsent(authRequest);
		const consent = await oauth.beginConsent(authRequest);
		consent.headers.set("Content-Type", "text/html; charset=utf-8");
		return new Response(await consentPage(details, consent.handle), {
			headers: consent.headers,
		});
	}

	const form = await request.formData();
	const handle = String(form.get("handle"));
	if (form.get("decision") !== "approve") {
		const denied = await oauth.denyConsent(request, handle);
		return new Response(null, { status: 302, headers: denied.headers });
	}

	const approved = await oauth.approveConsent(request, handle, {
		scope: form.getAll("scope").map(String),
	});
	const { redirectTo } = await oauth.completeAuthorization({
		request: approved.request, // from storage, not from the form
		userId: user.id,
		metadata: {},
		scope: approved.request.scope,
		props: { userId: user.id },
	});
	approved.headers.set("Location", redirectTo);
	return new Response(null, { status: 302, headers: approved.headers });
}
```

`getSignedInUser(request)` is your own sign-in, returning `undefined` when no one is signed in. `consentPage(details, handle)` renders HTML with an escaping template library such as `hono/html`. `authorizationServer` is the `OAuthAuthorizationServer` from [Authorization](./authorization.md). Invalid requests surface as a thrown `AuthorizationError`: the official page calls `authorize()` from the Worker's `fetch` inside `try`/`catch`, redirecting to `error.redirectTo` when set and otherwise returning `error.description` with status `400`, as the `/authorize` handler in Authorization does.

### Consent APIs

| API | What it does |
|-----|--------------|
| `describeConsent(request)` | Returns what the page must show: `clientName`, `clientDomain`, `redirectHost`, `redirectIsLoopback`, `scope` |
| `beginConsent(request)` | Stores the request server-side; returns a single-use `handle` and `headers` (a browser-bound `__Host-` cookie, framing blocked) |
| `approveConsent(request, handle, options?)` | Checks handle against cookie; returns the stored request. Pass `scope` with the approved scopes |
| `denyConsent(request, handle)` | Returns headers redirecting back to the client with `access_denied` |
| `isConsentRemembered(request, authRequest, remember)` | `true` if this client, redirect URI, and scopes were already approved |

### Sign in through a third-party provider

With GitHub, Google, etc., all MCP clients share your one OAuth app at the provider (confused deputy problem). Ask for consent first, then call the provider:

| API | What it does |
|-----|--------------|
| `beginUpstream(authRequest, options)` | After `approveConsent()`; stores the request and your `data` (for example a PKCE verifier) and returns a `state` bound to the browser by a `__Host-` cookie |
| `finishUpstream(request)` | In your callback; checks `state` against the cookie and returns the original request and your `data` |
| `tokenExchangeCallback` | `OAuthAuthorizationServer` option run on refresh; throw `OAuthError("invalid_grant")` when the provider revoked access |

Adapted (not in the official docs): the source callback calls `completeAuthorization()` without checking the token response; this version fails closed when the provider call or token is missing. See Notes.

```ts
async function callback(request: Request, env: Env): Promise<Response> {
	const oauth = authorizationServer.getOAuthApi(env);
	const { request: original, data, headers } =
		await oauth.finishUpstream<{ verifier: string }>(request);

	const code = new URL(request.url).searchParams.get("code");
	if (!code)
		return new Response("GitHub did not return a code", { status: 400 });

	const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
		method: "POST",
		headers: { Accept: "application/json", "Content-Type": "application/json" },
		body: JSON.stringify({
			client_id: env.GITHUB_CLIENT_ID,
			client_secret: env.GITHUB_CLIENT_SECRET,
			code,
			code_verifier: data.verifier,
		}),
	});
	if (!tokenResponse.ok)
		return new Response("GitHub token exchange failed", { status: 502 });
	const { access_token } = await tokenResponse.json<{ access_token?: string }>();
	if (!access_token)
		return new Response("GitHub did not return a token", { status: 502 });

	const userResponse = await fetch("https://api.github.com/user", {
		headers: {
			Authorization: `Bearer ${access_token}`,
			"User-Agent": "my-mcp-server",
		},
	});
	if (!userResponse.ok)
		return new Response("GitHub user lookup failed", { status: 502 });
	const user = await userResponse.json<{ id: number; login: string }>();

	const { redirectTo } = await oauth.completeAuthorization({
		request: original,
		userId: String(user.id),
		metadata: {},
		scope: original.scope,
		props: { login: user.login, githubToken: access_token }, // encrypted at rest
	});
	headers.set("Location", redirectTo);
	return new Response(null, { status: 302, headers });
}
```

In `authorize()`, create a PKCE verifier (`crypto.randomUUID() + crypto.randomUUID()`), pass it as `data` to `beginUpstream()`, and send its S256 challenge (`code_challenge_method=S256`) plus the returned `state` in the provider redirect.

### Checks on the MCP server

`OAuthResourceServer` accepts only tokens issued for its own `resourceMetadata.resource`. `requiredScopes` is advertised, not enforced: check scopes in the handler and return `insufficientScope()` so the client can ask for the missing one (full resource-server code in [Authorization](./authorization.md)).

### Security checklist

| Protection | Provided by |
|------------|-------------|
| Per-client consent before `completeAuthorization()` | `beginConsent()`, `approveConsent()` |
| Consent form cannot be framed or forged | `beginConsent()` headers and single-use handle |
| Client metadata escaped on the consent page | Your page template |
| Provider `state` bound to the browser | `beginUpstream()`, `finishUpstream()` |
| Tokens accepted only for this MCP server | `OAuthResourceServer` |
| Scopes checked for each operation | Your handler, with `insufficientScope()` |

## Notes

- Adapted from the official docs: the source `getSignedInUser` stub returns a hard-coded `{ id: "user-123" }`; treat it as a placeholder that must return `undefined` when nobody is signed in (fail closed). The source GitHub callback does not check `tokenResponse.ok` or `access_token`; the fence above adds those checks.
- `describeConsent()` returns strings that can come from the client; render them with an escaping template engine, never string concatenation.
- Props may contain upstream access tokens: do not log them or return them from tools. Keep `GITHUB_CLIENT_SECRET` as a Worker secret.
- Which errors to redirect to the client vs render on your page: see https://github.com/cloudflare/workers-oauth-provider/blob/main/docs/consent-page.md.
- Distance lines: MCP security best practices are in the mcp-spec skill; Claude Code MCP auth is anthropic-claude-code-extend; Claude API MCP connector is anthropic-api-tools-mcp; OpenAI Agents SDK MCP is openai-agents; ChatGPT MCP apps are openai-apps-sdk.

## Related

- [Authorization](./authorization.md)
- [Build a Remote MCP server](./remote-mcp-server.md)
- [createMcpHandler API](./handler-api.md)
