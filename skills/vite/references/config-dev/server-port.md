---
source: https://vite.dev/config/server-options#server-port
---

# server.port / server.strictPort

Dev server port and whether to fail when the port is taken.

## Signature / Usage

```js
export default defineConfig({
  server: {
    port: 5173,
    strictPort: true,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.port` | `number` | `5173` | Server port. If the port is already in use, Vite automatically tries the next available port, so this may not be the actual port |
| `server.strictPort` | `boolean` | — | Set to `true` to exit if the port is already in use, instead of trying the next available port |

## Related

- [server-host-allowed-hosts.md](./server-host-allowed-hosts.md)
- [preview-options.md](./preview-options.md)
