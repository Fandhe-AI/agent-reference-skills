---
source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V3/
---

# Migration Guide V3

Target: Fastify v5.12.1 (historical guide for the v2 -> v3 migration). Fix all v2 deprecation warnings before upgrading — every deprecated v2 API was removed in v3.

## Signature / Usage

```js
// v2
fastify.use(require('cors')())

// v3 — middleware no longer built in, register an adapter plugin first
await fastify.register(require('@fastify/express'))
fastify.use(require('cors')())
```

## Breaking Changes

| Change | v2 | v3 |
| --- | --- | --- |
| Middleware support | built into core (`fastify.use()`) | removed from core; requires `@fastify/express` or `@fastify/middie` |
| Logging serializers | received native `req`/`res` objects | receive Fastify `Request`/`Reply` objects (custom serializers must be updated) |
| Shared schema substitution | non-standard `'schemaId#'` string reference | JSON-Schema-compliant `{ $ref: 'schemaId#' }` |
| Schema validation hooks | `setSchemaCompiler` / `setSchemaResolver` | replaced by `setValidatorCompiler(({ schema, method, url, httpPart }) => ...)` |
| `preParsing` hook signature | `fn(request, reply, done)` | `fn(request, reply, payload, done)` (or async without `done`); can return a new stream to replace the payload |
| `onRoute` / `onRegister` hook timing | called synchronously at registration | called asynchronously; `onRoute` is inherited by plugins registered afterward in the same scope, so it must be registered before those plugins |
| Content-Type parser signature | `fn(req, [done])` / `fn(req, payload, [done])` with native `req` | `fn(request, payload, done)` (or async) with a Fastify `request`; deprecated old signatures still supported |
| TypeScript generics | 4 positional generics (`Querystring, Params, Headers, Body`) | single object generic (`{ Querystring, Params, Headers, Body }`) |
| Uncaught sync errors in handlers | crashed the server, bypassing `setErrorHandler` | routed through `setErrorHandler` like async errors |

## Further Additions

- Hooks now have consistent `this` context regardless of registration style
- `request.req` / `reply.res` deprecated in favor of `request.raw` / `reply.raw`
- Removed the `modifyCoreObjects` option
- Added `connectionTimeout` and `keepAliveTimeout` server options
- Added async/await support for plugins
- Added support for throwing a plain object as an error

## Notes

- `request.raw` / `reply.raw` (introduced here as a deprecation of `request.req` / `reply.res`) remain the stable API through v5; `reply.res` itself was fully renamed to `reply.raw` in the [v4 migration](./migration-v4.md)

## Related

- [migration-v4.md](./migration-v4.md)
- [migration-v5.md](./migration-v5.md)
