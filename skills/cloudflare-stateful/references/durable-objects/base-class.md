---
source: https://developers.cloudflare.com/durable-objects/api/base/
---

# Durable Object Base Class

The `DurableObject` base class is the abstract class all Durable Objects inherit from. It provides optional handler methods (`fetch`, `alarm`, `webSocketMessage`, `webSocketClose`, `webSocketError`) plus the `ctx` and `env` properties.

## Signature / Usage

```js
export class MyDurableObject extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
	}

	async fetch(request) {
		return new Response("Hello, World!");
	}
}
```

Handler examples:

```js
export class MyDurableObject extends DurableObject {
	async fetch(request) {
		const url = new URL(request.url);
		if (url.pathname === "/hello") {
			return new Response("Hello, World!");
		}
		return new Response("Not found", { status: 404 });
	}
}
```

```ts
export class MyDurableObject extends DurableObject<Env> {
	async alarm(alarmInfo?: AlarmInvocationInfo): Promise<void> {
		if (alarmInfo?.isRetry) {
			console.log(`Alarm retry attempt ${alarmInfo.retryCount}`);
		}
		await this.processScheduledTask();
	}

	async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer) {
		if (typeof message === "string") {
			ws.send(`Received: ${message}`);
		} else {
			ws.send(`Received ${message.byteLength} bytes`);
		}
	}

	async webSocketError(ws: WebSocket, error: unknown) {
		const message = error instanceof Error ? error.message : String(error);
		console.error(`WebSocket error: ${message}`);
	}
}
```

## Options / Props

### Handler methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `fetch(request)` | `(Request) => Response \| Promise<Response>` | — | Handles an HTTP request; the Durable Object emulates an HTTP server and the calling Worker is the client. Can be `async`. |
| `alarm(alarmInfo?)` | `(AlarmInvocationInfo?) => void \| Promise<void>` | — | Called when a scheduled alarm time is reached. At-least-once execution, retried on uncaught exception with exponential backoff starting at 2 s for up to 6 retries. |
| `webSocketMessage(ws, message)` | `(WebSocket, string \| ArrayBuffer) => void \| Promise<void>` | — | Called when an accepted WebSocket receives a message. Not called for control frames; protocol pings are answered automatically without interrupting hibernation. |
| `webSocketClose(ws, code, reason, wasClean)` | `(WebSocket, number, string, boolean) => void \| Promise<void>` | — | Called when a WebSocket connection is closed. |
| `webSocketError(ws, error)` | `(WebSocket, unknown) => void \| Promise<void>` | — | Called on a non-disconnection error on a WebSocket connection. |

### Handler parameters

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `request` | `Request` | — | Incoming HTTP request (`fetch`). |
| `alarmInfo` | `AlarmInvocationInfo` | — | Optional (`alarm`). |
| `alarmInfo.retryCount` | `number` | — | Number of times this alarm event has been retried. |
| `alarmInfo.isRetry` | `boolean` | — | `true` if this alarm event is a retry. |
| `ws` | `WebSocket` | — | The WebSocket that received the message / closed / errored. Use it to respond or read serialized attachments. |
| `message` | `string \| ArrayBuffer` | — | Text messages arrive as `string`, binary as `ArrayBuffer`. |
| `code` | `number` | — | Close code sent by the peer (e.g. `1000`, `1001`). |
| `reason` | `string` | — | Why the connection closed; may be empty. |
| `wasClean` | `boolean` | — | `true` if closed with a proper closing handshake. |
| `error` | `unknown` | — | May be an `Error` or another type. |

### Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `ctx` | `DurableObjectState` (readonly) | — | Storage, WebSocket management and other instance-specific functionality. |
| `env` | — | — | Environment bindings available to this Durable Object, as defined in the Wrangler configuration. |

## Notes

- RPC is supported as of compatibility date 2024-04-03; RPC methods are preferred over `fetch()` when the application does not follow an HTTP request/response flow.
- `webSocketClose` and compatibility dates: with the `web_socket_auto_reply_to_close` compatibility flag (enabled by default on compatibility dates on or after `2026-04-07`) the runtime sends the reciprocal Close frame and moves `readyState` to `CLOSED` before the handler runs; calling `ws.close()` is then safe and silently ignored. On older compatibility dates you must call `ws.close(code, reason)` inside the handler, otherwise clients see `1006` abnormal-closure errors.
- Compatibility flags are set in the Wrangler configuration; the flags and `wrangler` options themselves are documented in the cloudflare-wrangler skill, and the Worker-side handler model in cloudflare-workers.
- The Agents SDK is built on Durable Objects and is covered by the cloudflare-agents skill (https://developers.cloudflare.com/agents/).

## Related

- [DurableObjectState](./state.md)
- [Alarms](./alarms.md)
- [WebSockets](./websockets.md)
- [Create stubs and send requests (RPC)](./create-stubs-and-send-requests.md)
