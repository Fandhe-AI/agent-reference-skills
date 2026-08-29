---
source: https://fastify.dev/docs/latest/Guides/Delay-Accepting-Requests/
---

# Delay Accepting Requests

Target: Fastify v5.12.1. A pattern for rejecting requests immediately, with meaningful context, while the server is not yet ready to serve them (e.g. waiting for an OAuth handshake with an external provider to complete).

## Signature / Usage

```js
const fp = require('fastify-plugin')

const USUAL_WAIT_TIME_MS = 5000

// plugin factory: wraps `routes` so they 503 until `magicKey` is set
const delay = (routes) =>
  function (fastify, opts, done) {
    fastify.addHook('onRequest', function (request, reply, next) {
      if (!request.server.magicKey) {
        reply.statusCode = 503
        reply.header('Retry-After', USUAL_WAIT_TIME_MS)
        reply.send({ error: true, retryInMs: USUAL_WAIT_TIME_MS })
      }
      next()
    })

    fastify.register(routes, opts)
    done()
  }

module.exports = { delay }
```

```js
// index.js
server.register(setup) // decorates `magicKey` and kicks off the auth flow on `listening`
server.register(delay(customerRoutes), { prefix: '/v1' }) // gated behind the onRequest hook
```

## Notes

- The gating `onRequest` hook is registered on a plugin *without* the `fastify-plugin` wrapper so it stays scoped to the wrapped routes, not the parent instance (see [Plugins - scope](../plugins/encapsulation.md))
- `customerRoutes` itself is wrapped with `fastify-plugin` so its route registrations propagate up into the `delay` plugin's scope
- Use the Node `listening` event (`fastify.server.on('listening', ...)`) to start the external handshake as early as possible, right when the server starts accepting connections
- Return `503` with a `Retry-After` header so load balancers/clients know to redirect or retry, rather than letting requests fail slowly against an unready dependency
- This pattern combines [Decorators](../plugins/decorators.md), [Hooks](../hooks-lifecycle/README.md), and [Plugins](../plugins/plugins.md); it keeps local state and is not itself horizontally scalable — a shared store (e.g. cache/DB) is needed for that

## Related

- [../plugins/encapsulation.md](../plugins/encapsulation.md)
- [../hooks-lifecycle/request-hooks.md](../hooks-lifecycle/request-hooks.md)
