---
source: https://developers.cloudflare.com/agents/runtime/routing/options/
---

# Routing options

Options for `routeAgentRequest()` (third argument, type `AgentOptions`, exported from `agents/routing`): URL prefix, CORS, placement, startup props, retries, and auth hooks.

## Signature / Usage

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				jurisdiction: "eu",
				locationHint: "weur",
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `prefix` | `string` | `agents` | URL segments before the binding and name; may contain several segments (such as `"api/v1"`). |
| `cors` | `boolean \| HeadersInit` | — | Adds CORS headers to matched responses and answers matched `OPTIONS` preflight requests. |
| `jurisdiction` | `DurableObjectJurisdiction` | — | Creates objects in a jurisdiction, such as `"eu"`. |
| `locationHint` | `DurableObjectLocationHint` | — | Hints where to create objects, such as `"enam"`. |
| `props` | `object` | — | JSON-serializable values passed to `onStart(props)` when the request starts the object. |
| `routingRetry` | `false \| RoutingRetryOptions` | enabled | Retries transient Durable Object errors. |
| `onBeforeConnect` | `(request, route) => Response \| Request \| void` | — | Runs in the Worker before a WebSocket upgrade is forwarded. |
| `onBeforeRequest` | `(request, route) => Response \| Request \| void` | — | Runs in the Worker before an HTTP request is forwarded. |

`RoutingRetryOptions`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `maxAttempts` | — | `3` | Attempts, including the first. |
| `baseDelayMs` | — | `100` | Base delay for the backoff, in milliseconds. |
| `maxDelayMs` | — | `800` | Maximum delay between attempts, in milliseconds. |
| `onRetry` | — | None | Called before each retry with the error, attempt number, and delay. |

### Props

Type props with the second type argument of `Lifecycle.install()`:

Adapted (not in the official docs): the official example read the plan owner's user ID from a client-supplied `x-user-id` header; this version does not trust unverified headers; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";

type Props = { plan: "free" | "pro" };

export class MyAgent extends DurableObject<Env> {
	readonly lifecycle = Lifecycle.install<Env, Props>(this);
	#plan: Props["plan"] = "free";

	onStart(props?: Props): void {
		this.#plan = props?.plan ?? "free";
	}

	onRequest(): Response {
		return Response.json({ plan: this.#plan });
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				props: { plan: "pro" },
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

### CORS with credentials

```ts
import { routeAgentRequest } from "agents/routing";

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		return (
			(await routeAgentRequest(request, env, {
				cors: {
					"Access-Control-Allow-Origin": "https://app.example.com",
					"Access-Control-Allow-Methods": "GET, POST, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
					"Access-Control-Allow-Credentials": "true",
				},
			})) ?? new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

## Notes

- Adapted from the official docs: the props example in the page derived `userId` from a client-supplied `x-user-id` header and passed it as props; identities must come from a verified session, so only the server-decided `plan` is passed here.
- `cors: true` adds `Access-Control-Allow-Origin: *`, `Access-Control-Allow-Methods: GET, POST, HEAD, OPTIONS`, `Access-Control-Allow-Headers: *`, and `Access-Control-Max-Age: 86400` to every matched HTTP response. Matched `OPTIONS` requests get the headers without reaching the object; responses returned by `onBeforeRequest` also get them. WebSocket upgrade responses never do. For credentialed requests pass your own headers with a specific origin (not `*`).
- `useAgent` and `AgentClient` build `/agents/...` paths. With another prefix, pass the full path as their `basePath` option, such as `basePath: "api/v1/my-agent/alice"`.
- An object in a jurisdiction has a different ID from an object with the same name outside it; use the same `jurisdiction` every time. The location hint applies only when the object is first created.
- Props only reach a cold object; a warm object has already run startup and ignores them. Do not rely on props for values needed on every request. The same props go to whichever object the URL matches. To start an object over RPC with props, call `lifecycle.start(props)`.
- `routingRetry` retries errors the platform marks retryable and not caused by overload, with exponential backoff and jitter. Pass `routingRetry: false` to turn it off.
- Placement values: see Durable Objects data location docs (cloudflare-stateful).

## Related

- [Routing](./routing.md)
- [Authentication](./routing-authentication.md)
- [Custom routing](./custom-routing.md)
