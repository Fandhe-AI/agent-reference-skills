---
source: https://developers.cloudflare.com/agents/agent-class/routing/
---

# Routing (routeAgentRequest / getAgentByName)

`routeAgentRequest()` sends `/agents/:binding/:name` to the Agent named `:name`; `getAgentByName()` returns a started stub for RPC. This page covers what the `Agent` class adds to Durable Object routing.

## Signature / Usage

```ts
import { Agent, getAgentByName, routeAgentRequest } from "agents";

export class Counter extends Agent<Env, { count: number }> {
	initialState = { count: 0 };

	async increment(): Promise<number> {
		this.setState({ count: this.state.count + 1 });
		return this.state.count;
	}
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		if (new URL(request.url).pathname === "/api/increment") {
			const counter = await getAgentByName(env.Counter, "global");
			return Response.json({ count: await counter.increment() });
		}

		return (
			(await routeAgentRequest(request, env)) ??
			new Response("Not found", { status: 404 })
		);
	},
} satisfies ExportedHandler<Env>;
```

A request to `/agents/counter/global` reaches the `Counter` Agent named `global`. Clients connect with `useAgent({ agent: "Counter", name: "global" })`.

Props:

```ts
import { Agent, getAgentByName } from "agents";

type Props = { userId: string };

export class Profile extends Agent<Env> {
	#userId: string | undefined;

	onStart(props?: Props) {
		this.#userId = props?.userId;
	}
}

export async function openProfile(env: Env, userId: string) {
	return getAgentByName(env.Profile, userId, { props: { userId } });
}
```

Sub-agent URLs:

```ts
import { buildAgentPath } from "agents";

const path = buildAgentPath(
	[
		{ className: "Inbox", name: "alice" },
		{ className: "Chat", name: "chat-1" },
	],
	{ leafPath: "/callbacks/job" },
);
// /agents/inbox/alice/sub/chat/chat-1/callbacks/job
```

## Options / Props

`getAgentByName(namespace, name, options?)` options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `locationHint` | — | — | Durable Object location hint |
| `jurisdiction` | — | — | Durable Object jurisdiction |
| `props` | — | — | Values passed to `onStart(props)` |
| `routingRetry` | — | — | Routing retry configuration |

Static agent options:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `sendIdentityOnConnect` | — | `true` | Set to `false` to keep the Agent's name out of the identity frame |
| `hibernate` | — | `true` | Set to `false` to keep the Agent in memory while clients are connected |

```ts
import { Agent } from "agents";

class SecureAgent extends Agent {
	static options = { sendIdentityOnConnect: false };
}
```

## Notes

- Unlike `getByName()`, `getAgentByName()` starts the Agent before returning, so its capabilities and `onStart()` are ready.
- Props only reach an Agent that is starting. `routeAgentRequest()` accepts the same `props` option and passes them to whichever Agent the URL matches; use `getAgentByName()` for per-Agent values.
- Inside an Agent, `this.selfPath` holds its own path. `buildAgentPath()` adds a `/sub/` segment per level.
- URL shape, routing options, authentication and custom routes: routing.md (https://developers.cloudflare.com/agents/runtime/routing/), routing-options.md (https://developers.cloudflare.com/agents/runtime/routing/options/), routing-authentication.md (https://developers.cloudflare.com/agents/runtime/routing/authentication/), custom-routing.md (https://developers.cloudflare.com/agents/runtime/routing/custom-routing/). Check the caller's identity in the Worker before routing.
- The Agents are Durable Objects; binding and migration details live in the cloudflare-stateful skill (https://developers.cloudflare.com/durable-objects/).

## Related

- [Overview](./overview.md)
- [Sub-agents](./sub-agents.md)
- [Client SDK](./client-sdk.md)
