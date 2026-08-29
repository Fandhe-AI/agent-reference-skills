---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Handler Methods

Methods for setting the 404 handler, the error handler, the child-logger factory, and the request-id generator on a Fastify instance.

## Signature / Usage

```js
fastify.setNotFoundHandler(function (request, reply) {
  reply.code(404).send({ error: 'Not Found' })
})

fastify.setErrorHandler(function (error, request, reply) {
  this.log.error(error)
  reply.status(409).send({ ok: false })
})
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `setNotFoundHandler` | `.setNotFoundHandler([{ preValidation, preHandler }], handler(request, reply))` | Sets the 404 handler; encapsulated by prefix. Goes through the full Fastify lifecycle. Malformed URLs go to `onBadUrl` instead. |
| `setErrorHandler` | `.setErrorHandler(handler(error, request, reply))` | Sets the handler invoked on exceptions during the request lifecycle; fully encapsulated. Errors with `statusCode < 400` are forced to `500` first. Does **not** catch `onResponse` hook exceptions, 404s, or stream errors after headers are sent. |
| `setChildLoggerFactory` | `.setChildLoggerFactory(factory(logger, bindings, opts, rawReq))` | Sets the function used to create the per-request child logger; can add bindings or return a custom child logger. Encapsulated. |
| `setGenReqId` | `.setGenReqId(fn(rawReq))` | Sets a synchronous request-id generator for the current (and descendant) instance; encapsulated. |
| `errorHandler` | `.errorHandler` | Fastify's default error handler, callable directly, e.g. to fall back to default behavior from within a custom per-route `errorHandler`. |

## Notes

- `fastify.errorHandler` logs at `error` level for `statusCode >= 500` and `info`/`error` otherwise per the default formatter shown in the source.
- Avoid calling `setErrorHandler` multiple times in the same scope; see `allowErrorHandlerOverride` in `factory-options.md` (default `true`, scheduled to become `false`).
- Stream-reply error handlers must explicitly set `Content-Type` if it differs from the route's normal response type, or serialization fails with a `500`.

## Related

- [Factory Options](./factory-options.md)
- [Instance Content Type](./instance-content-type.md)
