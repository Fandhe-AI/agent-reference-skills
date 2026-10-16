---
source: https://vite.dev/config/preview-options
---

# preview.* Options

Options for the preview server (`vite preview`). Unless noted, these apply only to preview.

## Signature / Usage

```js
export default defineConfig({
  server: {
    port: 3030,
  },
  preview: {
    port: 8080,
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `preview.host` | `string \| boolean` | `server.host` | IP addresses to listen on. `0.0.0.0` or `true` listens on all addresses. CLI: `--host 0.0.0.0` or `--host` |
| `preview.allowedHosts` | `string[] \| true` | `server.allowedHosts` | Hostnames Vite is allowed to respond to |
| `preview.port` | `number` | `4173` | Server port. If in use, Vite tries the next available port |
| `preview.strictPort` | `boolean` | `server.strictPort` | `true` exits if the port is already in use |
| `preview.https` | `https.ServerOptions` | `server.https` | Enable TLS + HTTP/2 |
| `preview.open` | `boolean \| string` | `server.open` | Automatically open the app in the browser on start; a string is used as the URL's pathname. `process.env.BROWSER` / `BROWSER_ARGS` (also settable in `.env`) select the browser and arguments |
| `preview.proxy` | `Record<string, string \| ProxyOptions>` | `server.proxy` | Custom proxy rules for the preview server. A key starting with `^` is a `RegExp`. `configure` accesses the proxy instance. Uses `http-proxy-3` |
| `preview.cors` | `boolean \| CorsOptions` | `server.cors` | CORS for the preview server |
| `preview.headers` | `OutgoingHttpHeaders` | — | Server response headers |

## Related

- [server-host-allowed-hosts.md](./server-host-allowed-hosts.md)
- [server-port.md](./server-port.md)
- [server-https-open.md](./server-https-open.md)
- [server-proxy.md](./server-proxy.md)
- [server-cors-headers.md](./server-cors-headers.md)
