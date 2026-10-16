# WebSocket

Upgrading HTTP connections to WebSocket with a unified event-handler API.

```ts
// Cloudflare Workers — requires @hono/cloudflare-workers
import { Hono } from 'hono'
import { upgradeWebSocket } from '@hono/cloudflare-workers'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket((c) => ({
    onMessage(event, ws) {
      console.log(`Message from client: ${event.data}`)
      ws.send('Hello from server!')
    },
    onClose: () => {
      console.log('Connection closed')
    },
  }))
)

export default app
```

```ts
// Bun — requires @hono/bun
import { Hono } from 'hono'
import { upgradeWebSocket, websocket } from '@hono/bun'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket((c) => ({
    onMessage(event, ws) {
      ws.send(`Echo: ${event.data}`)
    },
  }))
)

export default {
  fetch: app.fetch,
  websocket,
}
```

```ts
// Node.js — built into @hono/node-server, requires ws
import { serve, upgradeWebSocket } from '@hono/node-server'
import { Hono } from 'hono'
import { WebSocketServer } from 'ws'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      ws.send(event.data)
    },
  }))
)

const wss = new WebSocketServer({ noServer: true })

serve({
  fetch: app.fetch,
  websocket: { server: wss },
})
```

## Notes

- Each runtime adapter is a separate package (`@hono/cloudflare-workers`, `@hono/deno`, `@hono/bun`); the old `hono/cloudflare-workers`-style imports are replaced by these
- Available events: `onOpen` (not supported on Cloudflare Workers), `onMessage`, `onClose`, `onError`
- On Node.js, install `ws` (and `@types/ws` for TypeScript) and pass a `WebSocketServer` created with `{ noServer: true }` via the `websocket` option of `serve()`; `@hono/node-ws` is deprecated
- Middleware that modifies headers (e.g., CORS) on a WebSocket route can cause an immutable-headers error because `upgradeWebSocket()` also changes headers internally
