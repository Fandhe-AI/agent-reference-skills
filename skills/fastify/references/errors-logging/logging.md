---
source: https://fastify.dev/docs/latest/Reference/Logging/
---

# Logging

Fastify's built-in logger is [Pino](https://github.com/pinojs/pino). This page covers Fastify's own connection surface to it: enabling/disabling, `logger` vs `loggerInstance`, request-scoped `request.log`, serializers, request-ID tracking, and redaction.

## Signature / Usage

```js
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})

// Outside route handlers, use the instance logger directly
fastify.log.info('Something important happened!')
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `logger` | `boolean \| object` | Enables logging (`true`) or passes a Pino configuration object (`level`, `file`, `stream`, `serializers`, `redact`, `transport`, ...). Cannot be toggled at runtime once disabled. |
| `loggerInstance` | Pino instance | Supplies an already-constructed logger instance instead of a config object. Must expose `info`, `error`, `debug`, `fatal`, `warn`, `trace`, `silent`, `child`, and a `level` property. Mutually exclusive with `logger`. |
| `requestIdHeader` | `string \| false` | Header read for an incoming request ID (see [`Server.md#factory-request-id-header`](https://fastify.dev/docs/latest/Reference/Server/)). |
| `genReqId` | `function` | Generates the request ID when no `requestIdHeader` value is present (see [`Server.md#genreqid`](https://fastify.dev/docs/latest/Reference/Server/)). |

## Notes

- The logger itself is Pino; see the `pino` skill for Pino's own API (transports, serializers, redaction options).
- Logging is **disabled by default**. Enable with `{ logger: true }` or `{ logger: { level: 'info' } }`; [abstract-logging](https://www.npmjs.com/package/abstract-logging) backs the disabled state, and a disabled logger cannot be enabled at runtime.
- Default log level when enabled is `'info'`. Per-route level can be overridden — see the `routing` category's route options page.
- `pino-pretty` (used in the typical development transport) must be installed separately as a dev dependency; it is not bundled for performance reasons.
- Custom `serializers` override the default `req` / `res` / `err` object serialization. The request body **cannot** be serialized inside the `req` serializer, because serialization happens when the child logger is created — before the body is parsed; log `req.body` from a `preHandler` hook instead. Serializers must never throw, since an uncaught throw there can crash the Node.js process. Any logger other than Pino ignores the `serializers` option.
- Logging response headers via a custom `res` serializer can expose sensitive data (e.g. `Authorization`); use [log redaction](#log-redaction) instead of a naive full-headers dump. When a custom `res` serializer accesses properties beyond `statusCode`, guard for their existence first (e.g. `typeof reply.getHeaders === 'function'`) since the `Reply` object passed to it may not be fully constructed yet.
- `redact` (a Pino option, passed through `logger`) masks specific properties in emitted logs, e.g. `redact: ['req.headers.authorization']`.
- A custom logger instance passed via `loggerInstance` is available on `fastify.log` and, per-request, on `request.log` throughout the entire [lifecycle](./error-handling.md) — the request-scoped instance is the same object as the one supplied, just with request context attached via Pino's `child`.

### v4 → v5: `logger` / `loggerInstance` split

In Fastify v4, the `logger` option accepted either a configuration object or a raw Pino instance. In v5 these are split: `logger` only accepts a configuration object, and a pre-built instance must be passed as `loggerInstance`. Passing an instance to `logger`, a config object to `loggerInstance`, or both options together now throws `FST_ERR_LOG_INVALID_LOGGER_CONFIG` / `FST_ERR_LOG_INVALID_LOGGER_INSTANCE` / `FST_ERR_LOG_LOGGER_AND_LOGGER_INSTANCE_PROVIDED` respectively (see [fastify-error-codes](./fastify-error-codes.md)). See the Guides Migration Guide for v5 for the full rationale.

## Related

- [error-handling](./error-handling.md)
- [fastify-error-codes](./fastify-error-codes.md)
