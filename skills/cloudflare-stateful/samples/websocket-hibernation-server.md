---
source: https://developers.cloudflare.com/durable-objects/examples/websocket-hibernation-server/
---

# WebSocket Server with Hibernation

A Durable Object WebSocket server using the WebSocket Hibernation API, so the object can be evicted while connections stay open.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

// Worker
export default {
	async fetch(request, env, ctx) {
		if (request.url.endsWith("/websocket")) {
			// Expect to receive a WebSocket Upgrade request.
			// If there is one, accept the request and return a WebSocket Response.
			const upgradeHeader = request.headers.get("Upgrade");
			if (!upgradeHeader || upgradeHeader !== "websocket") {
				return new Response("Worker expected Upgrade: websocket", {
					status: 426,
				});
			}

			if (request.method !== "GET") {
				return new Response("Worker expected GET method", {
					status: 400,
				});
			}

			// Since we are hard coding the Durable Object ID by providing the constant name 'foo',
			// all requests to this Worker will be sent to the same Durable Object instance.
			let stub = env.WEBSOCKET_HIBERNATION_SERVER.getByName("foo");

			return stub.fetch(request);
		}

		return new Response(
			`Supported endpoints:
/websocket: Expects a WebSocket upgrade request`,
			{
				status: 200,
				headers: {
					"Content-Type": "text/plain",
				},
			},
		);
	},
};

// Durable Object
export class WebSocketHibernationServer extends DurableObject {
	// Keeps track of all WebSocket connections
	// When the DO hibernates, gets reconstructed in the constructor
	sessions;

	constructor(ctx, env) {
		super(ctx, env);
		this.sessions = new Map();

		// As part of constructing the Durable Object,
		// we wake up any hibernating WebSockets and
		// place them back in the `sessions` map.

		// Get all WebSocket connections from the DO
		this.ctx.getWebSockets().forEach((ws) => {
			let attachment = ws.deserializeAttachment();
			if (attachment) {
				// If we previously attached state to our WebSocket,
				// let's add it to `sessions` map to restore the state of the connection.
				this.sessions.set(ws, { ...attachment });
			}
		});

		// Sets an application level auto response that does not wake hibernated WebSockets.
		this.ctx.setWebSocketAutoResponse(
			new WebSocketRequestResponsePair("ping", "pong"),
		);
	}

	async fetch(request) {
		// Creates two ends of a WebSocket connection.
		const webSocketPair = new WebSocketPair();
		const [client, server] = Object.values(webSocketPair);

		// Calling `acceptWebSocket()` informs the runtime that this WebSocket is to begin terminating
		// request within the Durable Object. Unlike `ws.accept()`, it marks the WebSocket as
		// "hibernatable", so the runtime does not need to pin this Durable Object to memory while
		// the connection is open. If the WebSocket later receives a message, the runtime recreates
		// the Durable Object (runs the `constructor`) and delivers the message to the handler.
		this.ctx.acceptWebSocket(server);

		// Generate a random UUID for the session.
		const id = crypto.randomUUID();

		// Attach the session ID to the WebSocket connection and serialize it.
		// This is necessary to restore the state of the connection when the Durable Object wakes up.
		server.serializeAttachment({ id });

		// Add the WebSocket connection to the map of active sessions.
		this.sessions.set(server, { id });

		return new Response(null, {
			status: 101,
			webSocket: client,
		});
	}

	async webSocketMessage(ws, message) {
		// Get the session associated with the WebSocket connection.
		const session = this.sessions.get(ws);

		// Reply to the initiating client.
		ws.send(
			`[Durable Object] message: ${message}, from: ${session.id}, to: the initiating client. Total connections: ${this.sessions.size}`,
		);

		// Send a message to all WebSocket connections, loop over all the connected WebSockets.
		this.sessions.forEach((attachment, connectedWs) => {
			connectedWs.send(
				`[Durable Object] message: ${message}, from: ${session.id}, to: all clients. Total connections: ${this.sessions.size}`,
			);
		});

		// Send a message to all WebSocket connections except the connection (ws).
		this.sessions.forEach((attachment, connectedWs) => {
			if (connectedWs !== ws) {
				connectedWs.send(
					`[Durable Object] message: ${message}, from: ${session.id}, to: all clients except the initiating client. Total connections: ${this.sessions.size}`,
				);
			}
		});
	}

	async webSocketClose(ws, code, reason, wasClean) {
		// With web_socket_auto_reply_to_close (compat date >= 2026-04-07), the runtime
		// auto-replies to Close frames. Calling close() is safe but no longer required.
		ws.close(code, reason);
		this.sessions.delete(ws);
	}
}
```

Wrangler configuration:

Adapted (not in the official docs): `main` points to `src/index.js` because the code above is the JavaScript variant (the official file uses `src/index.ts`), and a `compatibility_date` is added. See Notes.

```jsonc
{
	"$schema": "./node_modules/wrangler/config-schema.json",
	"name": "websocket-hibernation-server",
	"main": "src/index.js",
	"upload_source_maps": true,
	// Set this to today's date
	"compatibility_date": "2026-11-03",
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
			"new_sqlite_classes": [
				"WebSocketHibernationServer"
			]
		}
	]
}
```

## Notes

- Adapted from the official docs: the Wrangler `main` is `src/index.js` to match the JavaScript code shown; the official configuration names `src/index.ts`, which belongs to the TypeScript variant. A `compatibility_date` was added because the official snippet omits it; Wrangler needs one to deploy.
- Hibernation applies only when the Durable Object acts as the WebSocket server; outgoing WebSockets cannot hibernate.
- In-memory state (the `sessions` map) is lost on hibernation, so per-connection state goes into `serializeAttachment()` and is restored from `getWebSockets()` in the constructor.
- `setWebSocketAutoResponse` answers `ping` with `pong` without waking a hibernated object.
- The sample accepts any client and does not check `Origin` or authenticate; add both before exposing it publicly.
- The non-hibernating variant (`server.accept()` plus event listeners) pins the object to memory and incurs duration charges while connected; it is not reproduced here. Only the JavaScript variant is shown.

## Related

- [WebSockets](../references/durable-objects/websockets.md)
- [State](../references/durable-objects/state.md)
- [Durable Object lifecycle](../references/durable-objects/durable-object-lifecycle.md)
