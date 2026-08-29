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

// replace with your real client
const provider = {
  thirdPartyMagicKeyGenerator: () => Promise.resolve('example-key')
}

async function setup (fastify) {
  fastify.decorate('magicKey', null)

  fastify.server.on('listening', () => {
    provider.thirdPartyMagicKeyGenerator()
      .then((key) => {
        fastify.magicKey = key
      })
      .catch((error) => {
        fastify.log.error({ error })
        fastify.close(() => process.exit(1))
      })
  })
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
- The upstream guide also leaves `provider` undefined and never assigns the generated key to `fastify.magicKey`, so requests would 503 forever; this sample adds a minimal self-contained `provider` stub (replace with your real client) and assigns the resolved key with `fastify.magicKey = key` so the server starts accepting requests once ready.
- `fastify.decorate('magicKey', null)` gives an explicit non-reference initial value (Fastify v5 requires decorators to be initialized rather than left `undefined`); the `onRequest` guard treats `null` the same as "not ready yet".
- `fastify.close(callback)` triggers the shutdown lifecycle (running `onClose` hooks) when initialization irrecoverably fails.
- Listening for `close` on `request.raw` and checking `request.raw.aborted` detects a client disconnecting before the response was sent, so handlers can skip unnecessary work.
