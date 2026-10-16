---
source: https://vite.dev/config/server-options#server-proxy
---

# server.proxy

Custom proxy rules for the dev server, as `{ key: options }` pairs.

## Signature / Usage

```js
export default defineConfig({
  server: {
    proxy: {
      // string shorthand:
      // http://localhost:5173/foo
      //   -> http://localhost:4567/foo
      '/foo': 'http://localhost:4567',
      // with options:
      // http://localhost:5173/api/bar
      //   -> http://jsonplaceholder.typicode.com/bar
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
      // with RegExp:
      // http://localhost:5173/fallback/
      //   -> http://jsonplaceholder.typicode.com/
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/fallback/, ''),
      },
      // Using the proxy instance
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy will be an instance of 'http-proxy-3'
        },
      },
      // Proxying websockets or socket.io:
      // ws://localhost:5173/socket.io
      //   -> ws://localhost:5174/socket.io
      // Exercise caution using `rewriteWsOrigin` as it can leave the
      // proxying open to CSRF attacks.
      '/socket.io': {
        target: 'ws://localhost:5174',
        ws: true,
        rewriteWsOrigin: true,
      },
    },
  },
})
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.proxy` | `Record<string, string \| ProxyOptions>` | — | Requests whose path starts with the key are proxied to the target. A key starting with `^` is interpreted as a `RegExp`. `configure` gives access to the proxy instance |

## Notes

- If a request matches any configured proxy rule, the request is not transformed by Vite.
- With a non-relative `base`, each key must be prefixed with that `base`.
- `ProxyOptions` extends `http-proxy-3` options; additional Vite options are defined in `packages/vite/src/node/server/middlewares/proxy.ts`.
- To configure the underlying dev server (e.g. add custom middlewares to the internal connect app), write your own plugin and use the `configureServer` hook.
- Vite does not check the origin of WebSocket requests before proxying. The proxy target is expected to check the `Origin` header or do other checks. `rewriteWsOrigin` rewrites the origin to the target origin and causes the origin check to be bypassed.
- If a WebSocket proxy is set up in middleware mode, `server.middlewareMode.server` should be provided to bind the proxy correctly.
- `preview.proxy` defaults to `server.proxy`.

## Related

- [server-middleware-mode.md](./server-middleware-mode.md)
- [preview-options.md](./preview-options.md)
