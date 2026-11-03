---
source: https://developers.cloudflare.com/agents/agent-class/websockets/, https://developers.cloudflare.com/agents/agent-class/readonly-connections/, https://developers.cloudflare.com/agents/agent-class/protocol-messages/
---

# WebSockets, readonly connections and protocol messages

The `Agent` class calls your `onConnect()`, `onMessage()`, `onClose()` and `onError()` methods. Connections hibernate when idle. Readonly connections receive state but cannot change it; protocol frames can be disabled per connection.

## Signature / Usage

```ts
import {
	Agent,
	type Connection,
	type ConnectionContext,
	type WSMessage,
} from "agents";

export class ChatAgent extends Agent<Env> {
	getConnectionTags(_connection: Connection, ctx: ConnectionContext): string[] {
		const room = new URL(ctx.request.url).searchParams.get("room");
		return room ? [`room:${room}`] : [];
	}

	onConnect(connection: Connection, ctx: ConnectionContext) {
		connection.setState({ joinedAt: Date.now() });
		connection.send(JSON.stringify({ type: "welcome", id: connection.id }));
	}

	onMessage(connection: Connection, message: WSMessage) {
		// Send to everyone except the sender.
		this.broadcast(String(message), [connection.id]);
	}

	onClose(connection: Connection) {
		this.broadcast(JSON.stringify({ type: "left", id: connection.id }));
	}
}
```

Readonly connections:

```ts
import {
	Agent,
	callable,
	getCurrentAgent,
	type Connection,
	type ConnectionContext,
} from "agents";

type Doc = { text: string };

export class DocAgent extends Agent<Env, Doc> {
	initialState: Doc = { text: "" };

	shouldConnectionBeReadonly(_connection: Connection, ctx: ConnectionContext) {
		return new URL(ctx.request.url).searchParams.get("mode") === "view";
	}

	@callable()
	async edit(text: string) {
		// Throws "Connection is readonly" for a readonly caller.
		this.setState({ text });
	}

	@callable()
	async promote() {
		const { connection } = getCurrentAgent();
		if (connection) this.setConnectionReadonly(connection, false);
	}
}
```

Disabling protocol frames:

```ts
import { Agent, type Connection, type ConnectionContext } from "agents";

export class DeviceAgent extends Agent<Env> {
	shouldSendProtocolMessages(_connection: Connection, ctx: ConnectionContext) {
		return ctx.request.headers.get("Sec-WebSocket-Protocol") !== "mqtt";
	}
}
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `onConnect(connection, ctx)` | method | — | Runs after a client connects. `ctx.request` is the upgrade request |
| `onMessage(connection, message)` | method | — | Runs for each message that is not an Agents protocol frame |
| `onClose(connection, code, reason, wasClean)` | method | — | Runs when a connection closes |
| `onError(connection, error)` | method | — | Runs when a connection fails. The default logs and rethrows |
| `getConnectionTags(connection, ctx)` | method | — | Tags a connection when it is accepted |
| `broadcast(message, without?)` | method | — | Sends to every connection except the IDs in `without` |
| `getConnections(tag?)` | method | — | Finds open connections |
| `getConnection(id)` | method | — | Finds one open connection |
| `shouldSendProtocolMessages(connection, ctx)` | method | — | Return `false` to turn off identity, state and MCP frames for a connection |
| `isConnectionProtocolEnabled(connection)` | method | — | Returns the current protocol setting |
| `shouldConnectionBeReadonly(connection, ctx)` | method | `false` | Decides when a connection is accepted |
| `setConnectionReadonly(connection, readonly?)` | method | — | Changes it later; pass `false` to make the connection writable |
| `isConnectionReadonly(connection)` | method | — | Returns whether the connection is readonly |

Protocol frames sent on connect (and again on change for state and MCP): `cf_agent_identity`, `cf_agent_state`, `cf_agent_mcp_servers`.

## Notes

- Hibernation: an idle Agent hibernates while WebSocket connections stay open; a message wakes it and `onMessage()` runs as usual. Keep data in `this.state`, `connection.state` or SQLite, not class fields. Set `static options = { hibernate: false }` to stay in memory.
- Readonly is enforced inside `setState()`: it blocks client `setState()` and any `@callable()` that calls `this.setState()`. Other work in a callable still runs for a readonly caller, so write state first or check `isConnectionReadonly()` before side effects. On the client a refused write calls `onStateUpdateError`.
- Do not trust a query parameter alone to decide who can write (the `mode=view` example is illustrative); authenticate in the Worker before routing.
- The protocol decision is made once when the connection is accepted and survives hibernation. A connection without protocol frames still sends/receives your own messages, `broadcast()`, and `@callable()` calls.
- Connection state, tags and transports: websockets.md (https://developers.cloudflare.com/agents/runtime/capabilities/websockets/). WebSocket Hibernation API details are in the cloudflare-stateful skill.
- Decorator `@callable()` needs the setup in [callable-methods.md](./callable-methods.md).

## Related

- [Callable methods](./callable-methods.md)
- [State](./state.md)
- [Routing](./routing.md)
