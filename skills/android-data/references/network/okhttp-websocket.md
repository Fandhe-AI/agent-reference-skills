# OkHttp WebSocket

OkHttp's `WebSocket` API for full-duplex, persistent connections (RFC 6455) over the same `OkHttpClient` used for regular HTTP calls. It ships in the core `okhttp` artifact — no extra dependency is needed beyond what [okhttp.md](./okhttp.md) already covers.

## Signature / Usage

```kotlin
val client = OkHttpClient()
val request = Request.Builder().url("wss://example.com/socket").build()

val listener = object : WebSocketListener() {
    override fun onOpen(webSocket: WebSocket, response: Response) {
        webSocket.send("hello")
    }

    override fun onMessage(webSocket: WebSocket, text: String) {
        println("received: $text")
    }

    override fun onClosing(webSocket: WebSocket, code: Int, reason: String) {
        webSocket.close(1000, null)
    }

    override fun onFailure(webSocket: WebSocket, t: Throwable, response: Response?) {
        // handle connection error
    }
}

val webSocket = client.newWebSocket(request, listener)

// later
webSocket.close(1000, "bye")
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `client.newWebSocket(request, listener)` | method | — | Opens a `WebSocket` asynchronously; connection proceeds on the client's dispatcher. |
| `WebSocket.send(text: String)` | method | — | Enqueues a text (opcode `0x1`) frame; returns `false` if the socket is closed/failed. |
| `WebSocket.send(bytes: ByteString)` | method | — | Enqueues a binary (opcode `0x2`) frame. |
| `WebSocket.close(code, reason)` | method | — | Initiates a graceful shutdown with a close frame; queued messages are sent first. |
| `WebSocket.cancel()` | method | — | Immediately and ungracefully releases resources; no more callbacks fire. |
| `WebSocket.queueSize()` | method | — | Bytes currently queued to be sent but not yet transmitted. |
| `WebSocketListener.onOpen(webSocket, response)` | callback | — | Fired once the peer accepts the handshake. |
| `WebSocketListener.onMessage(webSocket, text/bytes)` | callback | — | Fired per received text or binary frame (two overloads). |
| `WebSocketListener.onClosing(webSocket, code, reason)` | callback | — | Peer sent a close frame; call `close()` to complete the handshake. |
| `WebSocketListener.onClosed(webSocket, code, reason)` | callback | — | Both sides have released the connection. |
| `WebSocketListener.onFailure(webSocket, t, response)` | callback | — | Connection failed or was closed abnormally; terminal, no further callbacks. |

## Notes

- Requires the `okhttp` dependency already used for [OkHttp](./okhttp.md); no separate library.
- `send()` enqueues onto a 16 MiB outgoing message buffer and returns `false` (no exception, no `onFailure`) if the buffer would overflow or the socket is closing/closed/canceled; always check the return value. Use `queueSize()` to watch for backpressure.
- Set `OkHttpClient.Builder().pingInterval(interval, unit)` to have the client send periodic ping frames; if the peer doesn't pong in time, the socket is canceled and `onFailure` fires. This is the documented way to detect a dead connection and keep it alive through idle-closing proxies. The default of `0` disables client-initiated pings.
- Callbacks run on an internal OkHttp dispatcher thread, not the main thread; hop back with a coroutine/handler before touching UI state.
- A `Request` for a web socket must use `ws://`/`wss://` (or plain `http(s)://`, which OkHttp upgrades) and cannot have a request body.
- Distinct from the WebSocket plugin in fandhe-backend, which is a Rust server-side API.

## Related

- [OkHttp](./okhttp.md)
- [permissions-and-threading](./permissions-and-threading.md)
