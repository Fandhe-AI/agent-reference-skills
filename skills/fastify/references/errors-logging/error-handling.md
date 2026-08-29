---
source: https://fastify.dev/docs/latest/Reference/Errors/
---

# Error Handling

Fastify's approach to uncaught errors: what the default error handler sends, the encapsulation rules for `setErrorHandler`, and the `errorCodes` export for matching Fastify's own `FST_ERR_*` errors.

## Signature / Usage

```js
fastify.setErrorHandler(function (error, request, reply) {
  // Errors with a statusCode below 500 were raised deliberately by this
  // application, as were validation errors. A status code below 500 is not on
  // its own a guarantee that the message is safe to expose — narrow this
  // condition if any of yours are not.
  if (error.validation || (error.statusCode && error.statusCode < 500)) {
    return reply.send(error)
  }

  // Anything else is unexpected: log it, but do not describe it to the client.
  this.log.error({ err: error }, 'unhandled error')
  reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Internal Server Error'
  })
})
```

## Notes

- **Error handling in Node.js**: uncaught errors can cause memory leaks and file-descriptor leaks; the recommended remedy is to crash the process rather than attempt to recover. For promise-based code, attach `.catch()` synchronously.
- **Errors in Fastify**: Fastify follows an all-or-nothing approach — the developer is responsible for handling errors properly. Most errors stem from unexpected input data, so validating input against a JSON schema is recommended (see `validation-serialization`).
- **Catching uncaught errors**: Fastify catches errors thrown in both synchronous routes (`app.get('/', () => { throw new Error('kaboom') })`) and `async` routes, routing them to the default error handler and returning `500 Internal Server Error`.
- **Default error handler payload**: serializes the error into JSON with `statusCode`, `error`, and `message`, plus `code` when the error carries one. `error` is the generic HTTP status text, but `message` is `error.message` verbatim for every status code — the built-in serializer never includes the stack trace, though a route-level response schema replaces that serializer and will emit `stack` if declared.
- **Security warning**: because `message` and `code` are forwarded as-is, errors thrown by libraries deeper in the application (e.g. a database driver) are exposed to the client verbatim. Fastify does not distinguish between development and production; register a `setErrorHandler` to suppress unexpected error details if this is a concern.
- **Encapsulation**: error handlers are fully encapsulated. If `setErrorHandler` is used multiple times, the error is routed to the most precedent handler within the error's encapsulation context (a plugin's `setErrorHandler` only applies within that plugin). The root error handler uses the `Error` object's own headers/status code, which are not auto-set once a custom handler is registered.
- **Re-throwing from a custom handler**: throwing a new error inside a custom error handler calls the parent `errorHandler`; the `onError` hook fires only once per error (Fastify avoids infinite loops for errors thrown in reply-phase lifecycle hooks). If a plugin's error handler re-throws a value that is not an `Error` instance, it will **not** propagate to the parent context handler and is instead caught by the default handler — always `throw new Error(...)`, never `throw 'string'`.
- `reply.send(data)` inside a custom error handler behaves like in regular route handlers: objects are serialized (triggering `preSerialization`), strings/buffers/streams are sent as-is.
- The `errorCodes` export lets a `setErrorHandler` distinguish Fastify's own errors from application errors via `instanceof`:

  ```js
  const Fastify = require('fastify')
  fastify.setErrorHandler(function (error, request, reply) {
    if (error instanceof Fastify.errorCodes.FST_ERR_BAD_STATUS_CODE) {
      this.log.error(error)
      reply.status(500).send({ ok: false })
    } else {
      reply.send(error)
    }
  })
  ```

## Related

- [fastify-error-codes](./fastify-error-codes.md)
- [logging](./logging.md)
