# WebSocket Helper

Upgrade HTTP connections to WebSocket with a unified event-handler API across runtimes.

## Signature / Usage

```ts
import { upgradeWebSocket } from '@hono/cloudflare-workers' // or '@hono/deno' / '@hono/bun'
// Node.js: import { serve, upgradeWebSocket } from '@hono/node-server' + import { WebSocketServer } from 'ws'

app.get(
  '/ws',
  upgradeWebSocket((c) => ({
    onOpen(event, ws) {
      ws.send('connected')
    },
    onMessage(event, ws) {
      ws.send(`Echo: ${event.data}`)
    },
    onClose() {},
    onError(event) {},
  }))
)
```

## Options / Props

| Handler | Description |
|---------|-------------|
| `onOpen(event, ws)` | Connection established (not supported on Cloudflare Workers) |
| `onMessage(event, ws)` | Message received from client; `event.data` contains the payload |
| `onClose(event, ws)` | Connection closed |
| `onError(event, ws)` | Connection error |

### `ws` object methods

| Method | Description |
|--------|-------------|
| `ws.send(data)` | Send data to the client |
| `ws.close()` | Close the connection |

## Notes

- Runtime adapters (`@hono/cloudflare-workers`, `@hono/deno`, `@hono/bun`) are separate packages
- On Node.js, WebSocket support is built into `@hono/node-server`. Install `ws` (and `@types/ws` for TypeScript), create a `WebSocketServer` with `{ noServer: true }`, and pass it to `serve()` via the `websocket` option
- `@hono/node-ws` is deprecated
- Middleware that mutates response headers (e.g., CORS) can conflict with `upgradeWebSocket` and cause header immutability errors
- Supports RPC mode for type-safe client connections via `hono/client`

## Related

- [Factory Helper](./factory.md)
