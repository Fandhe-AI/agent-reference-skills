---
source: https://developers.cloudflare.com/agents/runtime/routing/authentication/
---

# Routing authentication

Anyone who knows an agent's URL can send it requests. Check the caller in your Worker, before `routeAgentRequest()` forwards a request to the Durable Object.

## Signature / Usage

Adapted (not in the official docs): the official `authenticate()` returned a user for any non-empty `Authorization` header (fail-open); this placeholder rejects every request until you implement real verification; see Notes.

```ts
import { routeAgentRequest } from "agents/routing";

type User = { id: string };

async function authenticate(request: Request, env: Env): Promise<User | null> {
	// Verify a session cookie, a JWT, or an API key here.
	// This placeholder rejects every request until you implement verification.
	return null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const check = async (req: Request, route: { name: string }) => {
			const user = await authenticate(req, env);
			if (!user) {
				return new Response("Unauthorized", { status: 401 });
			}
			// Each user can only reach the agent named after them.
			if (route.name !== user.id) {
				return new Response("Forbidden", { status: 403 });
			}
			const forwarded = new Request(req);
			forwarded.headers.set("x-user-id", user.id);
			return forwarded;
		};

		return (
			(await routeAgentRequest(request, env, {
				onBeforeConnect: check,
				onBeforeRequest: check,
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

Hook contract (`onBeforeConnect` before a WebSocket upgrade, `onBeforeRequest` before an HTTP request; both run in the Worker):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| return `Response` | Response | — | Rejects the request. |
| return `Request` | Request | — | Replaces the request, for example to add a header the object trusts. |
| return nothing | void | — | Forwards the request unchanged. |
| `route.className` | string | — | The matched binding name. |
| `route.name` | string | — | The object's name. |

## Notes

- Adapted from the official docs: the page's `authenticate()` placeholder returned `{ id: "user-123" }` for any `Authorization` header. A copy-pasted example would let every caller in as that user; the placeholder now fails closed. Also, the official page showed a second variant that checks `url.pathname.split("/")[3]` before calling `routeAgentRequest()`; it is omitted here because it must stay in sync with URL decoding and prefix rules of the router, so prefer the hooks above.
- Browsers cannot set an `Authorization` header on a WebSocket upgrade. For WebSocket clients, read a token from a cookie or a query parameter in `onBeforeConnect`; `useAgent` and `AgentClient` accept a `query` option for this.
- A header you add in the hook (such as `x-user-id`) is only trustworthy if clients cannot reach the object any other way, and only if the hook overwrites any client-supplied value (`headers.set` does). Route every request to the object through the same check.
- Alternative: pick the object name on the server from the session so the client never names the object (see Custom routing).
- Authentication decides who reaches the object. Inside the object, the `WebSockets` capability can still limit each connection, for example with readonly connections for viewers.

## Related

- [Routing options](./routing-options.md)
- [Custom routing](./custom-routing.md)
- [WebSockets](./websockets.md)
