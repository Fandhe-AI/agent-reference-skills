---
source: https://fastify.dev/docs/latest/Reference/Logging/
---

# Logging Pino

Enable Fastify's built-in Pino-based logger and use the per-request child logger inside a route handler.

```js
const fastify = require('fastify')({
  logger: true
})

fastify.get('/', options, function (request, reply) {
  request.log.info('Some info about the current request')
  reply.send({ hello: 'world' })
})
```

## Notes

- Logging is disabled by default; pass `{ logger: true }` (or a Pino options object) when creating the instance to enable it.
- `request.log` is a child logger automatically bound with the request id, distinct from `fastify.log` used outside a request context.
- The logger is Pino; see the `pino` skill for Pino's own API (transports, serializers, levels).
