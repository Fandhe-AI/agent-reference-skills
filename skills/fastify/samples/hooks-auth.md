---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Hooks Authentication

Use the `preHandler` hook to run authentication logic before the route handler executes, short-circuiting the request on failure.

```js
const fastify = require('fastify')()

// replace with your real token/session verification (e.g. JWT verify, session store lookup)
async function verifyToken (token) {
  return token === 'valid-token'
}

fastify.addHook('preHandler', async (request, reply) => {
  const authHeader = request.headers.authorization || ''
  const token = authHeader.startsWith('Bearer ') ? authHeader.slice(7) : null

  if (!token || !(await verifyToken(token))) {
    reply.code(401)
    throw new Error('Unauthorized')
  }
})
```

```js
fastify.addHook('preHandler', (request, reply, done) => {
  reply.code(401)
  done(new Error('Some error'))
})
```

## Notes

- Throwing (or rejecting) inside an `async` `preHandler` hook is equivalent to calling `done(new Error(...))` in the callback style — both stop the request lifecycle and trigger the error handler.
- `verifyToken` is a stub; replace it with real token/session verification (JWT signature check, session store lookup, etc.) before using this pattern in production.
- Set `reply.code()` before throwing/calling `done(new Error(...))` so the intended status code is used.
- `preHandler` hooks can be scoped per-route via the route options `{ preHandler: fn }` instead of applying globally with `addHook`.
