---
source: https://developers.cloudflare.com/durable-objects/best-practices/websockets/
---

# Use WebSockets

Durable Objects can act as WebSocket servers connecting thousands of clients per instance, or as WebSocket clients. Two APIs exist: the Hibernation WebSocket API (recommended; the object can sleep while clients stay connected) and the Web Standard WebSocket API (`addEventListener`, prevents hibernation).

## Signature / Usage

Hibernation API (accept in `fetch`, handle in handler methods):

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class WebSocketHibernationServer extends DurableObject {
	async fetch(request) {
		// Creates two ends of a WebSocket connection.
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		// Calling `acceptWebSocket()` connects the WebSocket to the Durable Object, allowing the WebSocket to send and receive messages.
		// Unlike `ws.accept()`, `state.acceptWebSocket(ws)` allows the Durable Object to be hibernated
		// When the Durable Object receives a message during Hibernation, it will run the `constructor` to be re-initialized
		this.ctx.acceptWebSocket(server);

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async webSocketMessage(ws, message) {
		// Upon receiving a message from the client, reply with the same message,
		// but will prefix the message with "[Durable Object]: " and return the number of connections.
		ws.send(
			`[Durable Object] message: ${message}, connections: ${this.ctx.getWebSockets().length}`,
		);
	}

	async webSocketClose(ws, code, reason, wasClean) {
		// With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime
		// auto-replies to Close frames. Calling close() is safe but no longer required.
		ws.close(code, reason);
	}
}
```

Wrangler binding and migration:

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "websocket-hibernation-server",
	"durable_objects": {
		"bindings": [
			{
				"name": "WEBSOCKET_HIBERNATION_SERVER",
				"class_name": "WebSocketHibernationServer"
			}
		]
	},
	"migrations": [
		{
			"tag": "v1",
			"new_sqlite_classes": ["WebSocketHibernationServer"]
		}
	]
}
```

Persist per-connection state across hibernation with attachments:

Adapted (not in the official docs): `orderId` comes from the query string, so its UTF-8 byte length is checked before the WebSocket is accepted; otherwise a long value makes `serializeAttachment()` throw (16,384-byte limit) after the socket was accepted. The 256-byte cap is an example value. See Notes.

```js
import { DurableObject } from "cloudflare:workers";

export class WebSocketServer extends DurableObject {
	async fetch(request) {
		const url = new URL(request.url);
		const orderId = url.searchParams.get("orderId") ?? "anonymous";
		// Keep the attachment (orderId + joinedAt) far below the 16,384-byte limit.
		if (new TextEncoder().encode(orderId).byteLength > 256) {
			return new Response("orderId too long", { status: 400 });
		}

		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		this.ctx.acceptWebSocket(server);

		// Persist per-connection state that survives hibernation
		const state = {
			orderId,
			joinedAt: Date.now(),
		};
		server.serializeAttachment(state);

		return new Response(null, { status: 101, webSocket: client });
	}

	async webSocketMessage(ws, message) {
		// Restore state after potential hibernation
		const state = ws.deserializeAttachment();
		ws.send(`Hello ${state.orderId}, you joined at ${state.joinedAt}`);
	}

	async webSocketClose(ws, code, reason, wasClean) {
		const state = ws.deserializeAttachment();
		console.log(`${state.orderId} disconnected`);
		// With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime
		// auto-replies to Close frames. Calling close() is safe but no longer required.
		ws.close(code, reason);
	}
}
```

Batching messages:

Adapted (not in the official docs): the server validates the batch (frame size in bytes, JSON parse errors, object shape, `messages` array with an element limit and a string `type` per element) instead of casting `JSON.parse(message) as BatchedMessage`; the limits are example values.

```ts
import { DurableObject } from "cloudflare:workers";

// Define a batch envelope format
interface BatchedMessage {
	messages: Array<{ type: string; payload: unknown }>;
	timestamp: number;
}

// Client-side: batch messages before sending
function sendBatch(
	ws: WebSocket,
	messages: Array<{ type: string; payload: unknown }>,
) {
	const batch: BatchedMessage = {
		messages,
		timestamp: Date.now(),
	};
	ws.send(JSON.stringify(batch));
}

const MAX_FRAME_BYTES = 64 * 1024;
const MAX_BATCH_SIZE = 100;

function isBatchedMessage(value: unknown): value is BatchedMessage {
	if (typeof value !== "object" || value === null) return false;
	const { messages } = value as { messages?: unknown };
	return (
		Array.isArray(messages) &&
		messages.length <= MAX_BATCH_SIZE &&
		messages.every(
			(m) =>
				typeof m === "object" &&
				m !== null &&
				typeof (m as { type?: unknown }).type === "string",
		)
	);
}

// Durable Object: process batched messages
export class GameRoom extends DurableObject<Env> {
	async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		if (typeof message !== "string") return;
		// Reject oversized frames and batches before doing any work
		if (new TextEncoder().encode(message).byteLength > MAX_FRAME_BYTES) {
			ws.close(1009, "Message too big");
			return;
		}

		let batch: unknown;
		try {
			batch = JSON.parse(message);
		} catch {
			ws.close(1007, "Invalid JSON");
			return;
		}
		if (!isBatchedMessage(batch)) {
			ws.close(1007, "Invalid batch");
			return;
		}

		// Process all messages in the batch in a single handler invocation
		for (const msg of batch.messages) {
			this.handleMessage(ws, msg);
		}
	}

	private handleMessage(
		ws: WebSocket,
		msg: { type: string; payload: unknown },
	) {
		// Handle individual message logic
	}
}
```

Standard API: validate the upgrade in the Worker, then proxy:

```js
// Worker
export default {
	async fetch(request, env, ctx) {
		if (request.method === "GET" && request.url.endsWith("/websocket")) {
			// Expect to receive a WebSocket Upgrade request.
			// If there is one, accept the request and return a WebSocket Response.
			const upgradeHeader = request.headers.get("Upgrade");
			if (!upgradeHeader || upgradeHeader !== "websocket") {
				return new Response(null, {
					status: 426,
					statusText: "Durable Object expected Upgrade: websocket",
					headers: {
						"Content-Type": "text/plain",
					},
				});
			}

			// This example will refer to a single Durable Object instance, since the name "foo" is
			// hardcoded
			let stub = env.WEBSOCKET_SERVER.getByName("foo");

			// The Durable Object's fetch handler will accept the server side connection and return
			// the client
			return stub.fetch(request);
		}

		return new Response(null, {
			status: 400,
			statusText: "Bad Request",
			headers: {
				"Content-Type": "text/plain",
			},
		});
	},
};
```

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class WebSocketServer extends DurableObject {
	currentlyConnectedWebSockets;

	constructor(ctx, env) {
		super(ctx, env);
		this.currentlyConnectedWebSockets = 0;
	}

	async fetch(request) {
		// Creates two ends of a WebSocket connection.
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		// Calling `accept()` connects the WebSocket to this Durable Object
		server.accept();
		this.currentlyConnectedWebSockets += 1;

		// Upon receiving a message from the client, the server replies with the same message,
		// and the total number of connections with the "[Durable Object]: " prefix
		server.addEventListener("message", (event) => {
			server.send(
				`[Durable Object] currentlyConnectedWebSockets: ${this.currentlyConnectedWebSockets}`,
			);
		});

		// When the client closes the connection, clean up the server side.
		// With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime
		// auto-replies to Close frames. Calling close() is safe but no longer required.
		server.addEventListener("close", (cls) => {
			this.currentlyConnectedWebSockets -= 1;
			server.close(cls.code, "Durable Object is closing WebSocket");
		});

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}
}
```

## Options / Props

### Hibernation extension methods on `WebSocket`

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `serializeAttachment(value)` | `(any) => void` | — | Keeps a copy of `value` with the connection. Any structured-clone type; max serialized size 16,384 bytes. Later mutation of `value` is not retained unless called again. |
| `deserializeAttachment()` | `() => any` | — | Most recent value passed to `serializeAttachment()`, or `null`. |

## Notes

- Adapted from the official docs: the attachment example validates the byte length of the query-string `orderId` (example cap 256 bytes) before `acceptWebSocket()`, so an oversized value is rejected with 400 instead of making `serializeAttachment()` throw after the socket was accepted.
- Adapted from the official docs: the batching example casts `JSON.parse(message)` to `BatchedMessage` without checks, so malformed JSON, `null` or `{"messages":null}` throws and batch size is unbounded; the example checks the frame size in bytes, parses in `try`, validates the shape and caps the element count, closing with `1009` / `1007` on failure.

- Hibernation: after a short period without events, the object is evicted; clients stay connected, in-memory state resets, and an event re-runs the `constructor`, so keep the constructor light. Billable duration (GB-s) does not accrue while hibernating.
- Attachments persist through hibernation as long as the WebSocket remains healthy; if either side closes the connection they are lost. For larger values or data that must outlive the socket, use the Storage API and store its key as the attachment.
- Ping/pong control frames are handled automatically without waking the object, and `webSocketMessage` is not called for control frames.
- Batching: each message incurs a context switch; batch 10-100 logical messages per frame (e.g. every 50-100 ms or every 50-100 messages) to raise throughput.
- Only objects acting as WebSocket servers can hibernate; outgoing WebSockets do not hibernate, and an open outbound WebSocket prevents eviction for up to 15 minutes. Alarms, incoming requests, `setTimeout` and `setInterval` also prevent hibernation.
- Before `wrangler@3.13.2` and Miniflare `v3.20231016.0`, WebSockets did not hibernate in local development (handlers still ran). Local development tooling is covered by the cloudflare-wrangler skill.
- Validate upgrade requests in the Worker: Workers and Durable Objects are both billed per request, so rejecting invalid requests in the Worker avoids billing them against an object.
- Connections accepted with the Hibernation API stay connected when the object adopts new code after hibernating. A forced code update (a `deferred` update hitting `max_delay` before hibernation, or the `immediate` strategy) disconnects attached sockets; the Web Standard API prevents hibernation, so its sockets are disconnected on any update.
- Adapted from the official docs: the official TypeScript attachment example has broken indentation and the Python examples are garbled markdown; only the JavaScript attachment example is reproduced. The `ws.close(...)` inside close handlers is safe on compatibility dates on or after 2026-04-07.
- Agents SDK (built on Durable Objects) is the cloudflare-agents skill (https://developers.cloudflare.com/agents/).

## Related

- [DurableObjectState](./state.md)
- [Durable Object base class](./base-class.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [Code updates](./code-updates.md)
- [Pricing](./pricing.md)
