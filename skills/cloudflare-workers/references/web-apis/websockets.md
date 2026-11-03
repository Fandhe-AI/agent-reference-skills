---
source: https://developers.cloudflare.com/workers/runtime-apis/websockets/
---

# WebSockets

WebSockets allow you to communicate in real time with your Cloudflare Workers.

## Signature / Usage

```js
// { 0: <WebSocket>, 1: <WebSocket> }
let websocketPair = new WebSocketPair();
```

The `WebSocketPair` is an Object with two WebSockets at keys `0` and `1`, commonly referred to as `client` and `server`:

```js
let [client, server] = Object.values(new WebSocketPair());
```

## Options / Props

### Methods

| Name | Parameters | Description |
|------|------------|-------------|
| `accept(options?)` | `options` object (optional): `allowHalfOpen` boolean (optional, default `false`) | Accepts the WebSocket connection and begins terminating requests for the WebSocket on Cloudflare's global network. When `allowHalfOpen` is `true`, the runtime does not automatically send a reciprocal Close frame when a Close frame is received from the peer; `readyState` remains `CLOSING` until you explicitly call `close()`. Useful for WebSocket proxying. |
| `addEventListener(eventWebSocketEvent, callbackFunctionFunction)` | `event` WebSocketEvent; `callbackFunction(messageMessage)` Function | Adds callbacks executed when an event occurs on the WebSocket. |
| `close(codenumber, reasonstring)` | `code` integer (optional; close code per the WebSocket spec); `reason` string (optional; human-readable) | Closes the WebSocket connection. |
| `send(messagestring \| ArrayBuffer \| ArrayBufferView)` | `message` | Sends a message to the other WebSocket in this pair. Strings and numbers are cast to strings; objects and arrays should be cast to JSON strings using `JSON.stringify` and parsed in the client. |

### Properties

| Name | Type | Description |
|------|------|-------------|
| `readyState` | number | Current state: `WebSocket.CONNECTING` = `0` (not yet open), `WebSocket.OPEN` = `1` (open and ready), `WebSocket.CLOSING` = `2` (closing), `WebSocket.CLOSED` = `3` (closed). |
| `binaryType` | string | How binary frames are surfaced to the `message` event: `"blob"` or `"arraybuffer"`. Consulted when each incoming binary frame is dispatched, so assigning a new value affects subsequent messages only. Default is controlled by the `websocket_standard_binary_type` compatibility flag. |

### Events

| Event | Description |
|-------|-------------|
| `close` | The WebSocket has closed. The `CloseEvent` includes `code` (number), `reason` (string), and `wasClean` (boolean). |
| `error` | An error occurred with the WebSocket. |
| `message` | A new message received from the client, including the data passed by the client. |

`Message` type: `data` (any; data from the other WebSocket in your pair), `type` (string; defaults to `message`).

## Notes

- WebSocket messages received by a Worker have a size limit of 32 MiB (33,554,432 bytes). A larger message automatically closes the WebSocket with a `1009` "Message is too large" response.
- Connection lifetime: during routine runtime updates, existing connections can remain open until the grace period for runtime updates ends, after which they are disconnected. Crashes and shutdowns can disconnect clients earlier. Design clients to reconnect and restore application state.
- Close behavior: with the `web_socket_auto_reply_to_close` compatibility flag (enabled by default on compatibility dates on or after `2026-04-07`), the runtime automatically sends a reciprocal Close frame when it receives one; `readyState` becomes `CLOSED` before the `close` event fires. Calling `close()` inside the `close` handler is silently ignored. On earlier dates (or with `web_socket_manual_reply_to_close`), receiving a Close frame leaves the socket `CLOSING` and your code must call `close()`; otherwise the client may see `1006` abnormal closure.
- WebSockets created with `new WebSocket(url)` always auto-reply to Close frames and cannot pass `allowHalfOpen` (they are automatically accepted). For half-open behavior on a client WebSocket, use `fetch()` with the `Upgrade: websocket` header, then call `resp.webSocket.accept({ allowHalfOpen: true })`.
- Binary messages: text frames always arrive as strings. With the `websocket_standard_binary_type` compatibility flag (enabled by default on compatibility dates on or after `2026-03-17`), `binaryType` defaults to `"blob"`; without it, `"arraybuffer"`. With `"blob"`, reading bytes is asynchronous (`await event.data.arrayBuffer()` or `await event.data.bytes()`), so the handler must be `async`. Assign `binaryType` before calling `accept()` to guarantee all messages use the same type. The `no_websocket_standard_binary_type` flag opts the whole Worker out. This flag has no effect on the Durable Object hibernatable WebSocket `webSocketMessage` handler, which always receives `ArrayBuffer`.
- For coordinating multiple WebSocket connections (chat rooms, game matches) use Durable Objects (https://developers.cloudflare.com/durable-objects/) and its extended WebSockets API (https://developers.cloudflare.com/durable-objects/best-practices/websockets/).

Close handling example:

```js
server.addEventListener("close", (event) => {
  // readyState is already CLOSED — no need to call server.close().
  console.log(server.readyState); // WebSocket.CLOSED
  console.log(event.code);        // 1000
  console.log(event.wasClean);    // true
});
```

Half-open mode for proxying:

```js
server.accept({ allowHalfOpen: true });

server.addEventListener("close", (event) => {
  // readyState is still CLOSING here, giving you time
  // to coordinate the close on the other side.
  console.log(server.readyState); // WebSocket.CLOSING

  // Manually close when ready.
  server.close(event.code, "done");
});
```

`binaryType` opt-out for a single WebSocket:

```js
const resp = await fetch("https://example.com", {
  headers: { Upgrade: "websocket" },
});
const ws = resp.webSocket;

// Opt back into ArrayBuffer delivery for this WebSocket.
ws.binaryType = "arraybuffer";
ws.accept();

ws.addEventListener("message", (event) => {
  if (typeof event.data === "string") {
    // Text frame.
  } else {
    // event.data is an ArrayBuffer because we set binaryType above.
  }
});
```

## Related

- [Response (webSocket property)](./response.md)
- [Fetch](./fetch.md)
- [EventSource](./eventsource.md)
