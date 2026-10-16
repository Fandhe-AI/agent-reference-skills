---
source: https://vite.dev/config/server-options#server-https
---

# server.https / server.open

Enable TLS + HTTP/2 on the dev server, and automatically open the app in a browser on start.

## Signature / Usage

```js
export default defineConfig({
  server: {
    open: '/docs/index.html',
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.https` | `https.ServerOptions` | — | Enable TLS + HTTP/2. The value is an options object passed to `https.createServer()` |
| `server.open` | `boolean \| string` | — | Automatically open the app in the browser on server start. A string is used as the URL's pathname |

## Notes

- `server.https` needs a valid certificate. For a basic setup, add `@vitejs/plugin-basic-ssl` to the project plugins, which automatically creates and caches a self-signed certificate. Creating your own certificates is recommended.
- To open in a specific browser, set `process.env.BROWSER` (e.g. `firefox`). `process.env.BROWSER_ARGS` passes additional arguments (e.g. `--incognito`).
- `BROWSER` and `BROWSER_ARGS` are also special environment variables you can set in the `.env` file. See the `open` package for details.

## Related

- [server-host-allowed-hosts.md](./server-host-allowed-hosts.md)
- [preview-options.md](./preview-options.md)
