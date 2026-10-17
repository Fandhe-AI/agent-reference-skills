# WebSockets

Vercel Functions can serve WebSocket connections (Beta, all plans) for realtime features such as AI streaming, chat, and collaboration.

## Signature / Usage

```ts
// api/ws.ts
import http from 'http';
import { WebSocketServer } from 'ws';

const server = http.createServer();
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
  ws.on('message', (data) => {
    ws.send(data);
  });
});

export default server;
```

```ts
// Bun — server.ts
Bun.serve({
  fetch(request, server) {
    if (server.upgrade(request)) {
      return;
    }

    return new Response('Expected a WebSocket connection', { status: 400 });
  },
  websocket: {
    message(socket, message) {
      socket.send(message);
    },
  },
});
```

```ts
// Next.js — app/api/ws/route.ts (requires @vercel/functions 3.10.0+)
import {
  upgradeWebSocket,
  type WebSocketData,
} from '@vercel/functions';

export async function GET() {
  return upgradeWebSocket((ws) => {
    ws.on('message', (data: WebSocketData) => {
      ws.send(data);
    });
  });
}
```

```python
# FastAPI (ASGI) — app.py
import fastapi

app = fastapi.FastAPI()

@app.websocket("/api/ws")
async def websocket_endpoint(websocket: fastapi.WebSocket):
    await websocket.accept()
    try:
        while True:
            data = await websocket.receive_text()
            await websocket.send_text(data)
    except fastapi.WebSocketDisconnect:
        pass
```

## Framework support

| Framework | Approach |
|-----------|----------|
| Node.js (Express, Hono, h3) | Export an `http.Server` from `api/server.ts`; use `ws` (Hono: `@hono/node-server` `upgradeWebSocket`; h3: `defineWebSocketHandler` with `crossws/server` plugin) |
| Socket.IO | Client must use `transports: ['websocket']`; path is `/api/<file>/socket.io` (e.g. `/api/socket-io/socket.io`) |
| Bun | Native `Bun.serve()` with `server.upgrade()` and `websocket` option |
| Nitro | `features: { websocket: true }` in `nitro.config.ts`; `defineWebSocketHandler()` from `nitro` in route files (`routes/_ws.ts` handles `/_ws`) |
| Next.js | No native upgrade API; use `upgradeWebSocket()` from `@vercel/functions` |
| FastAPI | ASGI; add `websockets`, `wsproto`, or `uvicorn[standard]` |
| Django | Django Channels with ASGI |
| Flask | `flask-sock` with WSGI; `python-socketio` / `Flask-SocketIO` implement the Socket.IO protocol |

## Notes

- A single WebSocket connection is pinned to one Vercel Function instance for its lifetime; Fluid compute lets one instance handle multiple connections
- The upgrade (`GET` with `Upgrade` header) goes through Routing Middleware, rewrites, Firewall rules, and rate limits first; rate limits apply to each upgrade request
- Connections close when the function reaches its maximum duration; implement client reconnect logic (recreate connection, resubscribe, reload state)
- New connections may reach a different instance; after a deployment, existing connections stay on the previous deployment until closed. Keep durable state, presence, rooms, and pub/sub in an external store (e.g. Redis from the Vercel Marketplace)
- Bun differences from standalone Bun: headers passed to `server.upgrade()` are not applied to the upgrade response; the `drain` handler is not invoked; `socket.send()` does not return Bun's `-1` backpressure status. `server.publish()` and subscriptions share messages only within one instance
- Python frameworks need no Vercel-specific upgrade API
- Pricing and limits follow Vercel Functions, plus Fast Data Transfer and Fast Origin Transfer for data sent over the connection
- Requires Fluid compute (default for new projects created on or after April 23, 2025)

## Related

- [bun-runtime.md](./bun-runtime.md)
- [functions-api-reference.md](./functions-api-reference.md)
- [fluid-compute.md](./fluid-compute.md)
- [limitations.md](./limitations.md)
- [streaming.md](./streaming.md)
