---
source: https://developers.cloudflare.com/agents/runtime/routing/
---

# Routing

`routeAgentRequest()` reads the Durable Object binding and the object's name from the URL and forwards HTTP requests and WebSocket upgrades to that named object.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install(this);

	onRequest(request: Request): Response {
		return new Response(`Hello from ${this.lifecycle.name}`);
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

Bind the class as a SQLite-backed Durable Object:

```jsonc
{
	"durable_objects": {
		"bindings": [{ "name": "MyAgent", "class_name": "MyAgent" }],
	},
	"migrations": [{ "tag": "v1", "new_sqlite_classes": ["MyAgent"] }],
}
```

## Options / Props

URL shape `/agents/:binding/:name/<sub-path>`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `:binding` | string | — | Durable Object binding name in `env`, in kebab case (`MyAgent` and `MY_AGENT` both become `my-agent`; `ChatRoom` becomes `chat-room`). |
| `:name` | string | — | The object's name; addressed with `idFromName(name)` and read as `lifecycle.name`. |
| sub-path | string | — | Anything after the name; the object receives the full URL. |

Return values of `routeAgentRequest()`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `null` | — | — | Path does not start with the prefix, so your Worker can handle other routes. |
| `400` response | Response | — | Path matches the prefix but no Durable Object binding matches. |
| object response | Response | — | Otherwise, the object's response. |

Naming patterns:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| One per user | user ID | — | `/agents/user-profile/user-abc123` |
| One per resource | room or document ID | — | `/agents/chat-room/general` |
| One per task | generated ID | — | `/agents/report/report-2026-10-29` |
| Singleton | fixed name | — | `/agents/app-config/default` |

## Notes

- Several agent classes: export and bind each class; one `routeAgentRequest()` call routes to all of them (`/agents/chat-room/...` reaches `ChatRoom`, `/agents/user-profile/...` reaches `UserProfile`).
- Each name is its own object, with its own storage, alarm, and connections. Use a name clients cannot guess when the object holds private data, and check who is calling before you route.
- The Lifecycle requires named objects. Startup fails for an object created with `newUniqueId()` or `idFromString()`, or with a name longer than 1,024 bytes.
- `routeAgentRequest` can be imported from `agents/routing` or `agents`. To change the `agents` segment, use the `prefix` option.
- Durable Object stubs, ids, and bindings themselves are covered by cloudflare-stateful; Worker `fetch` handler details by cloudflare-workers.

## Related

- [Routing options](./routing-options.md)
- [Authentication](./routing-authentication.md)
- [Custom routing](./custom-routing.md)
- [HTTP and Server-Sent Events](./http-sse.md)
- [Lifecycle](./lifecycle.md)
