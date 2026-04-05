# WebSocket Helper

Upgrade HTTP connections to WebSocket with a unified event-handler API across runtimes.

## Signature / Usage

```ts
import { upgradeWebSocket } from 'hono/cloudflare-workers' // or deno / bun adapter
// For Node.js: import { createNodeWebSocket } from '@hono/node-ws'

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

- For Node.js use `@hono/node-ws` (`createNodeWebSocket`) instead of the built-in helper
- Middleware that mutates response headers (e.g., CORS) can conflict with `upgradeWebSocket` and cause header immutability errors
- Supports RPC mode for type-safe client connections via `hono/client`

## Related

- [Factory Helper](./factory.md)
