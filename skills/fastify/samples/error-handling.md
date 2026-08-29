---
source: https://fastify.dev/docs/latest/Reference/Errors/
---

# Error Handling

Register a custom global error handler with `setErrorHandler` to pass through expected client errors and mask unexpected server errors.

```js
app.setErrorHandler(function (error, request, reply) {
  if (error.validation || (error.statusCode && error.statusCode < 500)) {
    return reply.send(error)
  }

  this.log.error({ err: error }, 'unhandled error')
  reply.status(500).send({
    statusCode: 500,
    error: 'Internal Server Error',
    message: 'Internal Server Error'
  })
})
```

## Notes

- `error.validation` is set when a request fails JSON Schema validation (see `validation-json-schema.md`).
- Errors with `statusCode < 500` are considered expected/client errors and are sent as-is; 5xx and unknown errors are logged and masked to avoid leaking internals.
- `this` inside the handler is bound to the Fastify instance, giving access to `this.log`.
