---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Factory Options

Configuration options accepted by the Fastify factory function (`require('fastify')(options)`) that customize the resulting server instance.

## Signature / Usage

```js
const fastify = require('fastify')({
  logger: true,
  bodyLimit: 1048576,
  trustProxy: true,
  ajv: {
    customOptions: {
      removeAdditional: 'all'
    }
  }
})
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `http` | `null` | Options object for Node core `createServer`. Ignored if `http2`/`https` set. |
| `http2` | `false` | Use Node core HTTP/2 module for binding the socket. |
| `https` | `null` | Options object for Node core `createServer` (TLS). Also applies with `http2`. |
| `connectionTimeout` | `0` (no timeout) | Server timeout in ms (`server.timeout`). Ignored with `serverFactory`. |
| `keepAliveTimeout` | `72000` | Keep-alive timeout in ms for HTTP/1. Ignored with `serverFactory`. |
| `forceCloseConnections` | `"idle"` if supported, else `false` | On `close()`, destroy persistent sockets: `"idle"` (idle only), `true` (all), `false` (none). |
| `maxRequestsPerSocket` | `0` (no limit) | Max HTTP/1.1 requests per socket before closing keep-alive. Requires Node >= v16.10.0. |
| `requestTimeout` | `0` (no limit) | Max ms to receive the entire request. Requires Node >= v14.11.0. Recommended non-zero without a reverse proxy. |
| `handlerTimeout` | `0` (no timeout) | Max ms for the full route lifecycle (routing through serialization). Sends `503` and aborts `request.signal` on expiry. Overridable per-route; cooperative (`FST_ERR_HANDLER_TIMEOUT`). |
| `bodyLimit` | `1048576` (1MiB) | Max payload bytes accepted; exceeding triggers `FST_ERR_CTP_BODY_TOO_LARGE`. |
| `onProtoPoisoning` | `'error'` | Action on `__proto__` in parsed JSON: `'error'`, `'remove'`, `'ignore'` (via secure-json-parse). |
| `onConstructorPoisoning` | `'error'` | Action on `constructor` in parsed JSON: `'error'`, `'remove'`, `'ignore'`. |
| `logger` | `false` | Built-in Pino logger config. `false` disables; object is passed to Pino, with default `level: 'info'` and `req`/`res`/`err` serializers. |
| `loggerInstance` | `null` | Custom logger conforming to Pino interface (`info`, `error`, `debug`, `fatal`, `warn`, `trace`, `child`). |
| `disableRequestLogging` | `false` | **Deprecated**, use `logController`. Suppresses per-request `info` logs; boolean or `(request) => boolean`. |
| `logController` | `undefined` | `LogController` instance to customize internal log lines (`disableRequestLogging`, `requestIdLogLabel`, and overridable log methods). |
| `serverFactory` | — | Custom `(handler, opts) => server` function providing a Node HTTP-API-compatible server. |
| `requestIdHeader` | `false` | Header name used to read the request id. `true` uses `"request-id"`; empty string forces `false`. |
| `requestIdLogLabel` | `'reqId'` | **Deprecated**, use `logController`. Label for request identifier in logs. |
| `genReqId` | increasing integer or `request-id` header | `(rawReq) => id` function generating request ids. Not called if `requestIdHeader` value is present. |
| `trustProxy` | `false` | Trust `X-Forwarded-*` headers: `true`/`false`, IP/CIDR string or array, or `(address, hop) => boolean`. Affects `request.ip`/`ips`/`host`/`protocol`. |
| `pluginTimeout` | `10000` | Max ms for a plugin to load (avvio `timeout`). `0` disables. |
| `exposeHeadRoutes` | `true` | Auto-creates a sibling `HEAD` route for each `GET` route (define custom `HEAD` first to override). |
| `return503OnClosing` | `true` | Requests arriving after `close()` get `503` + `Connection: close`; `false` processes them normally but still closes the connection. |
| `ajv` | — | Configure the built-in Ajv v8 instance: `customOptions`, `plugins`, `onCreate(ajv)`. |
| `serializerOpts` | — | Options for the default `fast-json-stringify` response serializer (e.g. `rounding`). |
| `http2SessionTimeout` | `72000` | Timeout in ms for incoming HTTP/2 sessions. |
| `frameworkErrors` | `null` | Custom handler `(error, req, res)` overriding framework errors (`FST_ERR_BAD_URL`, `FST_ERR_ASYNC_CONSTRAINT`). |
| `clientErrorHandler` | default handler | `(err, socket)` handling raw socket `'error'` events; must write a full HTTP response. |
| `rewriteUrl` | — | Sync `function (req)` (bound to root instance) returning a rewritten URL string, called before routing. |
| `allowErrorHandlerOverride` | `true` | When `false`, prevents `setErrorHandler` being called more than once per scope. Will default to `false` in the next major release. |

## Notes

- `querystringParser` is also exposed as a Factory-level option name but its examples use the `routerOptions: { querystringParser }` nesting; see `router-options.md`.
- `handlerTimeout` and `logController` are Fastify v5 additions (not present in the v4 top-level options list); `disableRequestLogging` and `requestIdLogLabel` are deprecated in favor of `logController` and scheduled for removal in `fastify@6`.

## Related

- [Router Options](./router-options.md)
- [Instance Handlers](./instance-handlers.md)
- [Instance Content Type](./instance-content-type.md)
