---
source: https://developers.cloudflare.com/agents/runtime/routing/custom-routing/
---

# Custom routing

`routeAgentRequest()` is optional. Any request reaching a Lifecycle Durable Object through `fetch()` goes through the Lifecycle; use custom routing for your own URLs, a server-chosen object, or RPC.

## Signature / Usage

Forward a request to a named object:

```ts
export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		// /chat/:room goes to the ChatRoom object named :room.
		const room = url.pathname.match(/^\/chat\/([^/]+)/)?.[1];
		if (room) {
			return env.ChatRoom.getByName(decodeURIComponent(room)).fetch(request);
		}

		return new Response("Not found", { status: 404 });
	},
} satisfies ExportedHandler<Env>;
```

Placement, the way `routeAgentRequest()` addresses an object:

```ts
const namespace = env.ChatRoom.jurisdiction("eu");
const stub = namespace.get(namespace.idFromName("general"), {
	locationHint: "weur",
});
const response = await stub.fetch(request);
```

Choose the object on the server:

Adapted (not in the official docs): the official `getUserId()` trusted a client-supplied `x-user-id` header, so any caller could pick any user's object; this placeholder fails closed until you add real verification, and the `routeAgentRequest()` fallback now authenticates and requires the object name to equal the user ID via `onBeforeConnect` / `onBeforeRequest`; see Notes.

```ts
import { routeAgentRequest } from "agents/routing";

async function getUserId(request: Request): Promise<string | null> {
	// Verify a session cookie or token here and return the user ID it proves.
	// Never trust a client-supplied header. This placeholder rejects everyone.
	return null;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const url = new URL(request.url);

		if (url.pathname === "/me") {
			const userId = await getUserId(request);
			if (!userId) return new Response("Unauthorized", { status: 401 });
			return env.UserAgent.getByName(userId).fetch(request);
		}

		// Fail closed: every other request must be authenticated, and the
		// object name in the URL must equal the authenticated user ID.
		const check = async (req: Request, route: { name: string }) => {
			const userId = await getUserId(req);
			if (!userId) return new Response("Unauthorized", { status: 401 });
			if (route.name !== userId) {
				return new Response("Forbidden", { status: 403 });
			}
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

Connect the client to that path with `basePath`:

```tsx
import { useAgent } from "agents/react";

export function Profile() {
	const agent = useAgent({
		agent: "UserAgent",
		basePath: "me",
		onIdentity: (name, agentType) => {
			console.log(`Connected to ${agentType} ${name}`);
		},
	});

	return <p>{agent.identified ? agent.name : "Connecting..."}</p>;
}
```

Call an object over RPC:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { Scheduler } from "agents/schedules";

type Props = { userId: string };

export class UserAgent extends DurableObject<Env> {
	readonly scheduler = new Scheduler({ callbacks: {} });
	readonly lifecycle = Lifecycle.install<Env, Props>(this).use(this.scheduler);

	async pendingReminders(props?: Props): Promise<number> {
		await this.lifecycle.start(props);
		return (await this.scheduler.list()).length;
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const agents = env.UserAgent as DurableObjectNamespace<UserAgent>;
		const count = await agents
			.getByName("alice")
			.pendingReminders({ userId: "alice" });
		return Response.json({ count });
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: the page read the user from `request.headers.get("x-user-id")`; replaced with a fail-closed verification placeholder. The fallback `routeAgentRequest(request, env)` also let any caller address `/agents/user-agent/<other-user>`; it now runs `getUserId()` in `onBeforeConnect` / `onBeforeRequest` and returns 401 (unauthenticated) or 403 (object name differs from the user ID). See Routing authentication for the hook contract.
- A forwarded request starts a cold object, then reaches its capabilities and `onRequest()`. WebSocket upgrades work the same way, so the `WebSockets` capability accepts them.
- The `props` routing option only works through `routeAgentRequest()`; for a forwarded request, send values with the request or call over RPC.
- The `WebSockets` capability sends an identity frame on connect, so `agent.name` / `onIdentity` report the server-chosen name; `onIdentityChange` runs if the identity changes on reconnect. The frame includes the object's name; if the name is private, set `protocol: false` on `WebSockets` and send your own frames from `onConnect`.
- Public methods on a Durable Object are RPC methods; RPC does not go through `fetch()` and does not start the Lifecycle, so call `await this.lifecycle.start()` first. Props passed to `start()` only apply if that call starts the object.
- `getAgentByName()` from `agents` starts the object for you but only works with the `Agent` class; on a plain Durable Object use `getByName()` and `lifecycle.start()`. Stub and namespace APIs: cloudflare-stateful.

## Related

- [Routing](./routing.md)
- [Authentication](./routing-authentication.md)
- [Routing options](./routing-options.md)
- [WebSockets](./websockets.md)
