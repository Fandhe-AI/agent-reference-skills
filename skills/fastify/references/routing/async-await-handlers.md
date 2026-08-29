---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Async Await / Promise Resolution

Fastify supports `async/await` handlers directly.

## Signature / Usage

```js
fastify.get('/', options, async function (request, reply) {
  const data = await getData()
  const processed = await processData(data)
  return processed
})
```

As shown, `reply.send` is not called to send data back to the user — simply return the body.

If needed, data can also be sent back with `reply.send`. In this case, do not forget to `return reply` or `await reply` in the `async` handler to avoid race conditions:

```js
fastify.get('/', options, async function (request, reply) {
  const data = await getData()
  const processed = await processData(data)
  return reply.send(processed)
})
```

If the route wraps a callback-based API that calls `reply.send()` outside of the promise chain, `await reply` is possible:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  await reply
})
```

Returning reply also works:

```js
fastify.get('/', options, async function (request, reply) {
  setImmediate(() => {
    reply.send({ hello: 'world' })
  })
  return reply
})
```

## Notes

- When using both `return value` and `reply.send(value)`, the first one takes precedence, the second is discarded, and a *warn* log is emitted.
- Calling `reply.send()` outside of the promise is possible but requires special attention (see Promise resolution below).
- `undefined` cannot be returned.
- Promise resolution: if the handler is an `async` function or returns a promise, the reply is automatically sent with its resolved value unless `reply` is explicitly awaited or returned in the handler.
  1. If using `async/await`/promises but responding with `reply.send`: **do** `return reply` / `await reply`; **do not** forget to call `reply.send`.
  2. If using `async/await`/promises: **do not** use `reply.send`; **do** return the value to send.
- This supports both callback-style and async-await with minimal trade-off; it is recommended to use only one style for consistent error handling within an application. Every async function returns a promise by itself.

## Related

- [route-options.md](./route-options.md)
- [shorthand-declaration.md](./shorthand-declaration.md)
