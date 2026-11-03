---
source: https://developers.cloudflare.com/durable-objects/api/state/
---

# DurableObjectState

`DurableObjectState` (exposed as `this.ctx`) controls concurrency, WebSocket attachment and storage access. It has no top-level methods that manipulate persistent data; those live on `DurableObjectStorage` via `ctx.storage`.

## Signature / Usage

```js
import { DurableObject } from "cloudflare:workers";

// Durable Object
export class MyDurableObject extends DurableObject {
  // DurableObjectState is accessible via the ctx instance property
	constructor(ctx, env) {
		super(ctx, env);
	}
  ...
}
```

`blockConcurrencyWhile` in the constructor:

```js
// Durable Object
export class MyDurableObject extends DurableObject {
	initialized = false;

	constructor(ctx, env) {
		super(ctx, env);

		// blockConcurrencyWhile will ensure that initialized will always be true
		this.ctx.blockConcurrencyWhile(async () => {
			this.initialized = true;
		});
	}
  ...
}
```

Adapted (not in the official docs): the official snippet annotates `ctx: DurableObjectState, env: Env` in a `js` fence, which is not valid JavaScript; the type annotations are removed. See Notes.

```js
// Durable Object
export class MyDurableObject extends DurableObject {
	constructor(ctx, env) {
		super(ctx, env);
	}

  async sayHello() {
    // Error: Hello, World! will be logged
    this.ctx.abort("Hello, World!");
  }

  async alarm() {
    // Reset this instance without retrying the alarm
    this.ctx.abort("Alarm complete", { retryAlarm: false });
  }
}
```

## Options / Props

### Methods

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `waitUntil(promise)` | `(Promise<any>) => void` | — | Present for API compatibility with Workers. A promise passed here prevents eviction until it settles or for up to 15 minutes, whichever comes first. It does not affect when a request or RPC completes. |
| `blockConcurrencyWhile(callback)` | `(() => Promise<T>) => Promise<T>` | — | Runs an async callback while blocking all other events not initiated by the callback. 30 second timeout; if exceeded the object is reset. If the callback throws, the object is terminated and reset. |
| `acceptWebSocket(ws, tags?)` | `(WebSocket, Array<string>?) => void` | — | Hibernation API. Attaches a WebSocket to the object; messages go to `webSocketMessage`, closes to `webSocketClose`. Max 10 tags per WebSocket, each max 256 characters. Max 32,768 connections per object. |
| `getWebSockets(tag?)` | `(string?) => Array<WebSocket>` | — | Hibernation API. Returns attached WebSockets, optionally filtered by tag. Disconnected sockets are not returned. |
| `setWebSocketAutoResponse(pair?)` | `(WebSocketRequestResponsePair?) => void` | — | Hibernation API. Sets an auto-response for all attached sockets without waking them. Request and response are limited to 2,048 characters each. Omit to remove. |
| `getWebSocketAutoResponse()` | `() => WebSocketRequestResponsePair \| null` | — | Returns the pair last set, or `null`. Inspect with `getRequest()` / `getResponse()`. |
| `getWebSocketAutoResponseTimestamp(ws)` | `(WebSocket) => Date \| null` | — | Most recent auto-response `Date` for the socket, or `null`. |
| `setHibernatableWebSocketEventTimeout(ms?)` | `(number?) => void` | — | Max time in ms a WebSocket event can run. Omitted or `0` unsets a previous timeout. Max 604,800,000 ms (7 days). |
| `getHibernatableWebSocketEventTimeout()` | `() => number \| null` | — | Currently set timeout, or `null`. |
| `getTags(ws)` | `(WebSocket) => Array<string>` | — | Tags for a WebSocket; throws if it was not accepted via `acceptWebSocket`. |
| `abort(message?, options?)` | `(string?, DurableObjectAbortOptions?) => void` | — | Immediately resets the object; logs a JavaScript `Error` with the message, which application code cannot catch. |

### `abort` options

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `retryAlarm` | `boolean` | `true` | Whether an alarm interrupted by this abort retries. Pass `false` on any abort call that should prevent an interrupted alarm from retrying, including calls outside the alarm handler. |

### Properties

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `id` | `DurableObjectId` (readonly) | — | The ID of this Durable Object. |
| `storage` | `DurableObjectStorage` (readonly) | — | The Storage API. |
| `exports` | — | — | Loopback bindings to the Worker's own top-level exports; same meaning as `ctx.exports` on `ExecutionContext`. |

## Notes

- Corrected from the official docs: the `abort` example is shown in a JavaScript fence with TypeScript parameter annotations (`ctx: DurableObjectState, env: Env`); the annotations were removed so the snippet is valid JavaScript.
- Use `blockConcurrencyWhile` in the constructor to run schema migrations or initialize state before requests are processed. For regular request handling you rarely need it: SQLite storage operations are synchronous and do not yield the event loop, and for async KV storage operations input gates already prevent interleaving. Reserve it outside the constructor for external async calls (such as `fetch()`) when state must not change while the event loop yields. Keep the callback small, or wrap its body in `try...catch` to avoid a reset on exceptions.
- `ws.accept` must not be called separately with the Hibernation API, and `ws.addEventListener` receives no events; they are delivered to the handler methods instead.
- `getWebSockets` may still return a socket after `ws.close` (state `CLOSING`). With `web_socket_auto_reply_to_close` (default on compatibility dates on or after `2026-04-07`) sockets leave `CLOSING` much faster.
- An alarm can run concurrently with another request, which can call `abort` while the alarm is still running; the default retry prevents an unrelated request from permanently cancelling the alarm.
- Compatibility flags and Wrangler configuration are documented in cloudflare-wrangler; the Agents SDK built on Durable Objects is in cloudflare-agents.

## Related

- [Durable Object base class](./base-class.md)
- [SQLite-backed storage API](./sqlite-storage-api.md)
- [WebSockets](./websockets.md)
- [Durable Object lifecycle](./durable-object-lifecycle.md)
- [Durable Object ID](./id.md)
