# WebSocket

Upgrading HTTP connections to WebSocket with a unified event-handler API.

```ts
// Cloudflare Workers / Deno / Bun
import { Hono } from 'hono'
import { upgradeWebSocket } from 'hono/cloudflare-workers'

const app = new Hono()

app.get(
  '/ws',
  upgradeWebSocket((c) => ({
    onOpen(event, ws) {
      console.log('Client connected')
      ws.send('Welcome!')
    },
    onMessage(event, ws) {
      const msg = event.data as string
      ws.send(`Echo: ${msg}`)
    },
    onClose(event, ws) {
      console.log('Client disconnected')
    },
    onError(event) {
      console.error('WebSocket error', event)
    },
  }))
)

export default app
```

```ts
// Node.js — requires @hono/node-ws
import { serve } from '@hono/node-server'
import { createNodeWebSocket } from '@hono/node-ws'
import { Hono } from 'hono'

const app = new Hono()
const { injectWebSocket, upgradeWebSocket } = createNodeWebSocket({ app })

app.get(
  '/ws',
  upgradeWebSocket(() => ({
    onMessage(event, ws) {
      ws.send(`Echo: ${event.data}`)
    },
  }))
)

const server = serve({ fetch: app.fetch, port: 3000 })
injectWebSocket(server)
```

## Notes

- `onOpen` is not supported on Cloudflare Workers; use `onMessage` for initialization logic if needed
- For Node.js, use `@hono/node-ws` (`createNodeWebSocket`) instead of the built-in helper
- Middleware that mutates response headers (e.g., CORS) can cause header immutability errors when combined with `upgradeWebSocket`
- Install for Node.js: `npm install @hono/node-ws`
