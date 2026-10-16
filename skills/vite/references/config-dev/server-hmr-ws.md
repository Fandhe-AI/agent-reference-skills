---
source: https://vite.dev/config/server-options#server-hmr
---

# server.hmr / server.ws

Configure HMR behavior (`server.hmr`) and the WebSocket connection (`server.ws`).

## Signature / Usage

```js
export default defineConfig({
  server: {
    ws: {
      protocol: 'wss',
      host: 'localhost',
      port: 3001,
    },
  },
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `server.hmr` | `boolean \| { overlay?: boolean }` | Disable or configure HMR. `server.hmr.overlay: false` disables the server error overlay |
| `server.ws` | `false \| { protocol?: string, host?: string, port?: number, path?: string, timeout?: number, clientPort?: number, server?: Server }` | WebSocket connection options. `false` disables the WebSocket connection entirely |
| `server.ws.protocol` | string | WebSocket protocol (`ws` or `wss`) |
| `server.ws.host` | string | WebSocket server host |
| `server.ws.port` | number | WebSocket server port |
| `server.ws.path` | string | WebSocket path |
| `server.ws.clientPort` | number | Override the port on the client side, so the websocket can be served on a different port than the client code looks for |
| `server.ws.timeout` | number | Connection timeout in milliseconds (default: 30000) |
| `server.ws.server` | Server | Use a custom HTTP server for WebSocket connections |

## Notes

- Deprecated: the WebSocket-related options on `server.hmr` (`protocol`, `host`, `port`, `path`, `clientPort`, `timeout`, `server`) are deprecated; use `server.ws`. They are automatically synced, so existing configurations keep working.
- When `server.ws.server` is defined, Vite processes WebSocket connection requests through that server. If not in middleware mode, Vite tries to process them through the existing server. Useful with self-signed certificates or when exposing Vite over a network on a single port.
- By default, reverse proxies in front of Vite are expected to support proxying WebSocket. If the HMR client fails to connect, it falls back to connecting directly to the Vite HMR server, bypassing reverse proxies, and logs: `Direct websocket connection fallback. Check out https://vite.dev/config/server-options.html#server-ws to remove the previous connection error.` The browser error in that case can be ignored. To avoid it: configure the reverse proxy to proxy WebSocket too; or set `server.strictPort = true` and `server.ws.clientPort` to the same value as `server.port`; or set `server.ws.port` to a different value from `server.port`.
- See `vite-setup-catalogue` (sapphi-red) for setup examples.

## Related

- [server-port.md](./server-port.md)
- [server-middleware-mode.md](./server-middleware-mode.md)
