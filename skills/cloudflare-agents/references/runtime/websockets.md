---
source: https://developers.cloudflare.com/agents/runtime/capabilities/websockets/
---

# WebSockets

`WebSockets` from `agents/websockets` accepts hibernating WebSocket connections on a Durable Object, tracks and tags connections, serves callable methods, and speaks the Agents protocol so `useAgent` and `AgentClient` work with a plain Durable Object.

## Signature / Usage

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { routeAgentRequest } from "agents/routing";
import { WebSockets } from "agents/websockets";

export class RoomAgent extends DurableObject<Env> {
	readonly webSockets: WebSockets = new WebSockets({
		handlers: {
			onConnect: (connection) => {
				connection.send(JSON.stringify({ type: "welcome", id: connection.id }));
			},
			onMessage: (connection, message) => {
				for (const other of this.webSockets.getConnections()) {
					if (other.id !== connection.id) other.send(message);
				}
			},
		},
	});
	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);
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

Tag connections by room:

Adapted (not in the official docs): the official `onMessage` sent every message to the hard-coded `room:general` tag; it now relays within the sender's own room tag. The `room` query parameter is client-chosen, so verify room membership in your Worker before routing; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { WebSockets } from "agents/websockets";

export class ChatRoom extends DurableObject<Env> {
	readonly webSockets: WebSockets = new WebSockets({
		getConnectionTags: (_connection, ctx) => {
			const room = new URL(ctx.request.url).searchParams.get("room");
			return room ? [`room:${room}`] : [];
		},
		handlers: {
			onMessage: (connection, message) => {
				const roomTag = connection.tags.find((tag) => tag.startsWith("room:"));
				if (!roomTag) return;
				for (const peer of this.webSockets.getConnections(roomTag)) {
					peer.send(message);
				}
			},
		},
	});
	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);
}
```

Callables: methods on an `RpcTarget` that clients invoke over the existing connection.

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";
import { getCurrentAgent, Lifecycle } from "agents/lifecycle";
import { WebSockets } from "agents/websockets";

class RoomCallables extends RpcTarget {
	readonly #room: Room;

	constructor(room: Room) {
		super();
		this.#room = room;
	}

	say(text: string): void {
		const { connection } = getCurrentAgent();
		for (const peer of this.#room.webSockets.getConnections()) {
			if (peer.id !== connection?.id) peer.send(text);
		}
	}
}

export class Room extends DurableObject<Env> {
	readonly webSockets: WebSockets = new WebSockets({
		callables: new RoomCallables(this),
	});
	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);
}
```

Define the callable that the client below invokes:

Adapted (not in the official docs): the official snippet imported `RunCallables` from a file that is not shown; a minimal server definition is added. It validates its untrusted `sessionId` argument and only stops runs the object itself registered.

```ts
import { DurableObject, RpcTarget } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { WebSockets } from "agents/websockets";

export class RunCallables extends RpcTarget {
	readonly #runs: Map<string, AbortController>;

	constructor(runs: Map<string, AbortController>) {
		super();
		this.#runs = runs;
	}

	stopRun(sessionId: string): boolean {
		if (typeof sessionId !== "string" || !/^[\w-]{1,64}$/.test(sessionId)) {
			throw new Error("Invalid sessionId");
		}
		const run = this.#runs.get(sessionId);
		if (!run) return false;
		run.abort();
		this.#runs.delete(sessionId);
		return true;
	}
}

export class Assistant extends DurableObject<Env> {
	readonly runs = new Map<string, AbortController>();
	readonly webSockets: WebSockets = new WebSockets({
		callables: new RunCallables(this.runs),
	});
	readonly lifecycle = Lifecycle.install(this).use(this.webSockets);
}
```

Call from a client, typed with `AgentStub`:

```tsx
import type { AgentStub } from "agents/client";
import { useAgent } from "agents/react";
import type { RunCallables } from "./server";

export function StopRunButton({ agentName, sessionId }: { agentName: string; sessionId: string }) {
	const agent = useAgent({ agent: "Assistant", name: agentName });
	const runs = agent.stub as AgentStub<RunCallables>;

	return (
		<button
			onClick={async () => {
				await agent.ready;
				await runs.stopRun(sessionId);
			}}
		>
			Stop
		</button>
	);
}
```

Streaming result and stream callbacks:

```ts
import { RpcTarget } from "cloudflare:workers";

class CountdownCallables extends RpcTarget {
	countdown(from: number): ReadableStream<number> {
		const start = Math.min(Math.max(Math.trunc(from), 1), 10);
		return new ReadableStream<number>({
			start(controller) {
				for (let n = start; n >= 0; n--) controller.enqueue(n);
				controller.close();
			},
		});
	}
}

```

Adapted (not in the official docs): the client call is wrapped in a function with its `agent` parameter typed, so it is valid standalone.

```ts
import type { useAgent } from "agents/react";

// client side
export async function runCountdown(agent: ReturnType<typeof useAgent>) {
	await agent.call("countdown", [3], {
		stream: {
			onChunk: (chunk) => console.log(chunk),
			onDone: () => console.log("done"),
			onError: (error) => console.error(error),
		},
	});
}
```

Readonly connections and per-connection protocol:

Adapted (not in the official docs): the official `readonly` callback derived write access from a client-supplied `?mode=view` query parameter, which any client can drop to become writable. It now fails closed through a placeholder `canEdit()`; see Notes.

```ts
import { DurableObject } from "cloudflare:workers";
import { Lifecycle } from "agents/lifecycle";
import { State } from "agents/state";
import { WebSockets } from "agents/websockets";

type Board = { cards: string[] };

// Placeholder: verify a session or token that your Worker checked and return
// true only for users allowed to edit. It denies everyone until implemented.
function canEdit(request: Request): boolean {
	return false;
}

export class BoardAgent extends DurableObject<Env> {
	readonly board: State<Board> = new State<Board>({
		initialState: { cards: [] },
		onChanged: (_state, source) => this.webSockets.broadcastState(source),
	});
	readonly webSockets: WebSockets = new WebSockets({
		state: this.board,
		readonly: (_connection, ctx) => !canEdit(ctx.request),
		protocol: (_connection, ctx) =>
			new URL(ctx.request.url).searchParams.get("client") !== "sensor",
	});
	readonly lifecycle = Lifecycle.install(this)
		.use(this.board)
		.use(this.webSockets);

	// Called over RPC from the Worker after it checks the user's role.
	async promote(connectionId: string): Promise<boolean> {
		await this.lifecycle.start();
		const connection = this.webSockets.getConnection(connectionId);
		if (!connection) return false;
		this.webSockets.setReadonly(connection, false);
		return this.webSockets.isReadonly(connection) === false;
	}
}
```

## Options / Props

`new WebSockets(options)`:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `handlers` | object | — | Connection handlers: `onConnect`, `onMessage`, `onClose`, `onError`. |
| `callables` | `RpcTarget` | — | An `RpcTarget` whose methods clients call. |
| `state` | `State` | — | A `State` capability to sync with clients. |
| `getConnectionTags` | `(connection, ctx) => string[]` | — | Labels each connection when accepted. |
| `readonly` | `(connection, ctx) => boolean` | — | Decides whether a connection may change the synced state. |
| `protocol` | `true \| false \| (connection, ctx) => boolean` | `true` | Decides whether a connection gets Agents protocol frames. |

In every function, `ctx.request` is the upgrade request.

Handlers (run inside your object's invocation context):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onConnect(connection, ctx)` | handler | — | After the upgrade is accepted. |
| `onMessage(connection, message)` | handler | — | For each message that is not an Agents protocol frame. |
| `onClose(connection, code, reason, wasClean)` | handler | — | When the connection closes. |
| `onError(connection, error)` | handler | — | When the connection fails mid-session. |

`Connection` fields:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | string | — | The connection ID. |
| `uri` | string | — | URL of the upgrade request. |
| `tags` | string[] | — | The connection's tags; the ID is always the first tag. |
| `state` | — | — | Small value stored on this connection; survives hibernation. |
| `setState(value)` | method | — | Replaces `state`; pass a function to update from the previous value, or `null` to clear. Not synced to other clients. |

Methods:

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `getConnections(tag?)` | method | — | Iterates open connections, optionally by tag. |
| `getConnection(id)` | method | — | One open connection or `undefined`. |
| `use(handlers)` | method | — | Adds a handler set that runs before the configured handlers; an added `onMessage` can return `true` to claim a message. |
| `broadcastState(except?)` | method | — | Sends current state to every protocol-enabled connection except `except`. |
| `sendConnectFrames(connection, identity?)` | method | — | Sends identity frame, then current state if stored. |
| `sendIdentity(connection, identity?)` | method | — | Identity frame alone; defaults to object name and kebab-case class name. |
| `sendState(connection)` | method | — | Sends current state to one connection. |
| `applyStateFrame(connection, frame)` | method | — | Applies a client's state frame, refusing readonly connections; returns `true` when `frame` was a state frame. |
| `isReadonly(connection)`, `setReadonly(connection, readonly?)` | method | — | Read or set readonly; `false` makes writable again. |
| `isProtocolEnabled(connection)`, `setProtocolEnabled(connection, enabled)` | method | — | Read or toggle protocol frames per connection. |

Transports (client `transport` option):

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `"cf-websocket"` | transport | default | JSON `rpc` frames over a hibernating WebSocket; results must be JSON-serializable; a `ReadableStream` streams; an `RpcTarget` result is an error. |
| `"capnweb"` | transport | — | Native methods on a Cap'n Web session; does not hibernate; an `RpcTarget` result arrives as a live stub; streams and pipelined calls work. |

## Notes

- `WebSockets` claims every upgrade, even without handlers; it is the only catch-all capability, so the Lifecycle offers each upgrade to others first. Without it the Lifecycle declines upgrades; plain HTTP still reaches `onRequest()`. Authenticate the request in the Worker before you route it.
- A message wakes a hibernated object; the constructor and Lifecycle startup run again before `onMessage`. Keep anything needed after a wake in storage or on the connection.
- Callables: use one for an action initiated by an application client; use a tool for actions the model chooses; use Durable Object RPC when another Worker calls the object. Only methods on the class prototype are callable (not instance properties or arrow-function fields, not the constructor or `Object`/`RpcTarget` methods); `WebSockets` throws if the class declares a method named `then`. Any connected client can call any of them: treat every argument as untrusted and authenticate before the request reaches the object (the official page's `stopRun()` validates its `sessionId` argument this way). The official page demonstrates `stopRun()` on a Pi harness; see the Pi harness docs for that full example.
- Client calls: `agent.call(method, args[, { timeout, stream }])`; non-streaming calls time out after 30 seconds by default (`defaultCallTimeout` on the client; `0` disables); streaming calls have no default timeout. A thrown error rejects with its message; a missing method rejects with `Method <name> does not exist`. Each call runs in the object's invocation context with the calling connection in scope, so `getCurrentAgent()` returns it.
- A Cap'n Web connection keeps the object in memory while open and the client reconnects after eviction. The same `callables` target serves both transports. Use the default unless you need results passed by reference.
- State sync: `WebSockets` does not broadcast on its own; call `broadcastState(source)` from `State`'s `onChanged`. Readonly connections receive state and can call methods but `setState()` is refused (client gets a `cf_agent_state_error` frame; `onStateUpdateError` runs). Do not trust a query parameter alone to decide who can write; verify the user in your Worker.
- Adapted from the official docs: (1) `ChatRoom` relays within the sender's own `room:` tag instead of a fixed `room:general`, and the client-chosen `room` parameter must be authorized in your Worker; (2) the `RunCallables` server class is added (the page imports it from an unshown file) and the `countdown` client call is wrapped in a typed function; (3) `BoardAgent` derives `readonly` from a fail-closed `canEdit()` placeholder instead of `?mode=view`.
- With `protocol: false` you drive the connect sequence with `sendConnectFrames()` / `applyStateFrame()`. Send methods send nothing to a connection without the protocol. On destroy, `WebSockets` closes every connection with code `1001`.
- On the `Agent` class, `@callable()` methods are the client interface instead of a `callables` target. Durable Object hibernation internals: cloudflare-stateful.

## Related

- [State](./state.md)
- [Lifecycle API](./lifecycle-api.md)
- [Authentication](./routing-authentication.md)
- [Custom routing](./custom-routing.md)
- [get-current-agent](./get-current-agent.md)
