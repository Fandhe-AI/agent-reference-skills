---
source: https://developers.cloudflare.com/agents/runtime/capabilities/state/
---

# State

`State` from `agents/state` stores one JSON value in the Durable Object's SQLite database, validates every change, calls you back after each one, and syncs to clients with `WebSockets`.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

type Counter = { count: number };

export class CounterAgent extends DurableObject<Env> {
	readonly state: State<Counter> = new State<Counter>({
		initialState: { count: 0 },
		validateStateChange: (next) => {
			if (!Number.isSafeInteger(next.count) || next.count < 0) {
				throw new Error("count must be a non-negative integer");
			}
		},
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	readonly webSockets: WebSockets = new WebSockets({ state: this.state });
	readonly lifecycle = Lifecycle.install(this)
		.use(this.state)
		.use(this.webSockets);
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

Know where a change came from:

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State, type StateChangeSource } from "agents/state";

type Doc = { title: string; lockedBy?: string };

export class DocAgent extends DurableObject<Env> {
	readonly doc = new State<Doc>({
		initialState: { title: "Untitled" },
		validateStateChange: (next: Doc, source: StateChangeSource) => {
			if (source !== "server" && next.lockedBy !== undefined) {
				throw new Error("Only the server can lock a document");
			}
		},
		onChanged: (state: Doc, source: StateChangeSource) => {
			const who = source === "server" ? "server" : source.id;
			console.log(`${who} changed the title to ${state.title}`);
		},
	});
	readonly lifecycle = Lifecycle.install(this).use(this.doc);
}
```

React client:

```tsx
import { useAgent } from "agents/react";

export function Counter() {
	const agent = useAgent<{ count: number }>({
		agent: "CounterAgent",
		name: "demo",
	});
	const count = agent.state?.count ?? 0;
	return (
		<button onClick={() => agent.setState({ count: count + 1 })}>
			{count}
		</button>
	);
}
```

## Options / Props

`new State(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `initialState` | — | — | Stored on first read when no value exists. |
| `validateStateChange` | `(next, source) => void` | — | Throw to reject a change before it is stored. Must be synchronous. |
| `onChanged` | `(state, source) => void` or promise | — | Runs after a change is stored. A failure does not undo the write. |

Methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `get()` | method | — | Current value, or `undefined` when nothing is stored. |
| `set(next, source?)` | method | `"server"` source | Validates and stores `next`, then calls `onChanged`. Writes synchronously; throws when the validator rejects. |

## Notes

- The capability ID is `"state"`, so install one `State` per Durable Object; store several values in one object or your own tables.
- `source` (`StateChangeSource`) is `"server"` for changes your code makes, or the `Connection` that sent a client change.
- The `state` and `webSockets` fields refer to each other, so give them explicit types.
- When a client calls `setState()`, the change goes through `validateStateChange` with the connection as `source`; a rejected change is logged on the server and the client receives a generic error. `broadcastState(source)` skips `source`, which already has the value. Use readonly connections to refuse changes from some connections.
- `connection.setState()` is different: it stores a value on one connection and never syncs.
- Storage is the `cf_agents_state` table; every change rewrites the whole value, so keep large or relational data in your own tables.
- The official page also shows a `PUT` handler that stores `await request.json()` straight into state; it is omitted here because it performs no validation or authentication. Validate with `validateStateChange` and authenticate in the Worker.
- On the `Agent` class, `initialState`, `this.state`, `this.setState()`, `validateStateChange()`, and `onStateChanged()` use a wired `State` and `WebSockets`.

## Related

- [WebSockets](./websockets.md)
- [Capabilities](./capabilities.md)
