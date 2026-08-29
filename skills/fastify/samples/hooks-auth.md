---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Hooks Authentication

Use the `preHandler` hook to run authentication logic before the route handler executes, short-circuiting the request on failure.

```js
fastify.addHook('preHandler', (request, reply, done) => {
  // some code
  done()
})
```

```js
fastify.addHook('preHandler', async (request, reply) => {
  // Some code
  await asyncMethod()
})
```

```js
fastify.addHook('preHandler', (request, reply, done) => {
  reply.code(401)
  done(new Error('Some error'))
})
```

## Notes

- Passing an `Error` to `done()` (or throwing/rejecting in an `async` hook) stops the request lifecycle and triggers the error handler.
- Set `reply.code()` before calling `done(new Error(...))` so the intended status code is used.
- `preHandler` hooks can be scoped per-route via the route options `{ preHandler: fn }` instead of applying globally with `addHook`.
