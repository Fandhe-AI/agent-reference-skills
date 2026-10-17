---
source: https://vite.dev/config/server-options#server-cors
---

# server.cors / server.headers

CORS configuration and extra response headers for the dev server.

## Signature / Usage

```ts
server.cors: boolean | CorsOptions
server.headers: OutgoingHttpHeaders
```

## Options / Props

| Name | Type | Default | Description |
|------|------|---------|-------------|
| `server.cors` | `boolean \| CorsOptions` | `{ origin: /^https?:\/\/(?:(?:[^:]+\.)?localhost\|127\.0\.0\.1\|\[::1\])(?::\d+)?$/ }` (allows localhost, `127.0.0.1` and `::1`) | Configure CORS. Pass an options object (expressjs/cors) to fine tune, or `true` to allow any origin |
| `server.headers` | `OutgoingHttpHeaders` | — | Server response headers |

## Notes

- Setting `server.cors` to `true` allows any website to send requests to your dev server and download your source code and content. Always use an explicit list of allowed origins.
- The official page shows no code example for these options; the snippet above lists the documented types only.

## Related

- [preview-options.md](./preview-options.md)
- [server-host-allowed-hosts.md](./server-host-allowed-hosts.md)
