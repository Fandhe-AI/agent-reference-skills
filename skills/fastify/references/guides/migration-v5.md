---
source: https://fastify.dev/docs/latest/Guides/Migration-Guide-V5/
---

# Migration Guide V5

Target: Fastify v5.12.1. Fastify v5 requires Node.js v20+ (v4 supported until 2025-06-30). Fix all v4 deprecation warnings before upgrading — every deprecated v4 API listed below has been removed and no longer works.

## Signature / Usage

```js
// v4
fastify.listen(8000)
// v5
fastify.listen({ port: 8000 })
```

## Breaking Changes

| Change | v4 | v5 | Reference page |
| --- | --- | --- | --- |
| Full JSON Schema required | shorthand props allowed (`jsonShortHand`) | full schema with `type: 'object'` / `required` mandatory for `querystring`/`params`/`body`/`response` | [../validation-serialization/schema-basics.md](../validation-serialization/schema-basics.md) |
| Logger constructor | `logger` option accepted a custom pino instance | custom instance goes in new `loggerInstance` option; `logger` only accepts pino config | [../errors-logging/logging.md](../errors-logging/logging.md) |
| `useSemicolonDelimiter` | semicolon query delimiter supported by default | disabled by default; opt in via `useSemicolonDelimiter: true` | — |
| `request.params` prototype | plain object with `Object` prototype | no prototype (`Object.hasOwn()` instead of `.hasOwnProperty()`) | [../request-reply/request.md](../request-reply/request.md) |
| Type Provider schema types | single `output` type for validation and serialization | split `validator` / `serializer` types | [../validation-serialization/type-providers.md](../validation-serialization/type-providers.md) |
| `.listen()` signature | variadic args (`fastify.listen(port, cb)`) | options object only (`fastify.listen({ port })`) | [../server/instance-lifecycle.md](../server/instance-lifecycle.md) |
| Reply trailers | trailer callback could return a value directly | trailer function must be `async` or use a callback | [../request-reply/reply-hijack-trailers.md](../request-reply/reply-hijack-trailers.md) |
| Route definition access | `request.context`, `.routeSchema`, `.routeConfig`, `.routerPath`, `.routerMethod`, `reply.context` | `request.routeOptions.*` / `reply.routeOptions.*` | — |
| `reply.redirect()` signature | `reply.redirect(code, url)` | `reply.redirect(url, code?)` | [../request-reply/reply-redirect.md](../request-reply/reply-redirect.md) |
| `reply.sent` | writable to suppress the response | read-only; use `reply.hijack()` | [../request-reply/reply-hijack-trailers.md](../request-reply/reply-hijack-trailers.md) |
| Route versioning constraints | `{ version: '...' }` / server `{ versioning: '...' }` | `{ constraints: { version: '...' } }` | [../routing/constraints-versioning.md](../routing/constraints-versioning.md) |
| Custom `HEAD` + `exposeHeadRoutes` | no ordering requirement | custom `HEAD` route must be registered before `GET`, or set `exposeHeadRoutes: false` | — |
| `request.connection` | present, aliases the socket | removed; use `request.socket` | [../request-reply/request.md](../request-reply/request.md) |
| `reply.getResponseTime()` | present | removed; use `reply.elapsedTime` | [../request-reply/reply-hijack-trailers.md](../request-reply/reply-hijack-trailers.md) |
| `fastify.hasRoute()` matching | matched by resolved URL | must match the route pattern exactly (as `find-my-way` defines it) | [../server/instance-routing.md](../server/instance-routing.md) |
| Non-standard HTTP methods | `PROPFIND`/`PROPPATCH`/`MKCOL`/`COPY`/`MOVE`/`LOCK`/`UNLOCK`/`TRACE`/`SEARCH` built in | removed; re-add via `fastify.addHttpMethod()` | — |
| Decorators with reference types | `decorateRequest('x', { ... })` shared object allowed | reference-type default forbidden; use a function/getter or set per-request in a hook | [../server/instance-decorators.md](../server/instance-decorators.md) |
| `DELETE` with empty body | `Content-Type: application/json` + empty body accepted | rejected | [../server/instance-content-type.md](../server/instance-content-type.md) |
| Plugin callback/promise mixing | allowed (`async function (instance, opts, done)`) | forbidden; use either callback or promise style, not both | [../plugins/plugins.md](../plugins/plugins.md) |
| `request.hostname` | included the port (e.g. `localhost:1234`) | `host` = old `hostname` value; `hostname` excludes port; new `port` property | [../request-reply/request.md](../request-reply/request.md) |
| `getDefaultRoute`/`setDefaultRoute` | present | removed | [../server/instance-routing.md](../server/instance-routing.md) |
| `time`/`date-time` format | timezone optional | `ajv-formats` now requires timezone; use `iso-time`/`iso-date-time` for the old optional-timezone behavior | [../validation-serialization/ajv-configuration.md](../validation-serialization/ajv-configuration.md) |

## New Features

- **Diagnostics Channel support**: Fastify v5 natively supports Node's [`diagnostics_channel`](https://nodejs.org/api/diagnostics_channel.html), exposing `tracing:fastify.request.handler:start` / `:end` / `:error` channels for tracing a request's lifecycle without instrumenting handlers directly

```js
const diagnostics = require('node:diagnostics_channel')

diagnostics.subscribe('tracing:fastify.request.handler:start', (msg) => {
  console.log(msg.route.url, msg.route.method)
})
```

## Notes

- All v4 `FSTDEP0xx` deprecation codes referenced above (e.g. `FSTDEP011` for `.listen()`, `FSTDEP021` for `reply.redirect()`, `FSTDEP010` for `reply.sent`, `FSTDEP008`/`FSTDEP009` for versioning, `FSTDEP05` for `request.connection`, `FSTDEP20` for `getResponseTime()`, `FSTDEP014` for default-route methods, `FSTDEP07` for `HEAD`/`GET` ordering, `FSTDEP012`/`FSTDEP015`–`FSTDEP019` for route-definition access) were already emitted in v4 before the v5 removal
- Fastify v4 end-of-life support is available from HeroDevs for teams unable to upgrade immediately

## Related

- [migration-v4.md](./migration-v4.md)
- [migration-v3.md](./migration-v3.md)
