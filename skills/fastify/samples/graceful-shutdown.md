---
source: https://fastify.dev/docs/latest/Guides/Delay-Accepting-Requests/
---

# Graceful Shutdown

Delay accepting requests until async setup completes, and detect when a client aborts a long-running request.

```js
const fp = require('fastify-plugin')

const delay = (routes) =>
  function (fastify, opts, done) {
    fastify.addHook('onRequest', function (request, reply, next) {
      if (!request.server.magicKey) {
        reply.statusCode = 503
        reply.header('Retry-After', 5)                 // seconds (RFC 9110)
        return reply.send({ error: true, retryInMs: 5000 })
      }
      next()
    })

    fastify.register(routes, opts)
    done()
  }

async function setup(fastify) {
  fastify.server.on('listening', () => {
    provider.thirdPartyMagicKeyGenerator(5000)
      .catch((error) => {
        fastify.log.error({ error })
        fastify.close(() => process.exit(1))
      })
  })

  fastify.decorate('magicKey')
}

module.exports = {
  setup: fp(setup),
  delay,
}
```

```js
app.addHook('onRequest', async (request, reply) => {
  request.raw.on('close', () => {
    if (request.raw.aborted) {
      app.log.info('request closed')
    }
  })
})
```

## Notes

- The upstream guide's example passes milliseconds to `Retry-After` and calls `next()` unconditionally after sending the 503, which double-sends/triggers "Reply was already sent"; this sample corrects both — `Retry-After` is in seconds (RFC 9110), `reply.send(...)` returns early, and `next()` runs only on the success path.
- `fastify.close(callback)` triggers the shutdown lifecycle (running `onClose` hooks) when initialization irrecoverably fails.
- Listening for `close` on `request.raw` and checking `request.raw.aborted` detects a client disconnecting before the response was sent, so handlers can skip unnecessary work.
