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
        reply.header('Retry-After', 5000)
        reply.send({ error: true, retryInMs: 5000 })
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

- Returning `503` with `Retry-After` defers client requests until an async dependency (e.g. a key fetched from a third party) is ready, instead of accepting requests during a half-initialized state.
- `fastify.close(callback)` triggers the shutdown lifecycle (running `onClose` hooks) when initialization irrecoverably fails.
- Listening for `close` on `request.raw` and checking `request.raw.aborted` detects a client disconnecting before the response was sent, so handlers can skip unnecessary work.
