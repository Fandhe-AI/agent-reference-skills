---
source: https://fastify.dev/docs/latest/Guides/Detecting-When-Clients-Abort/
---

# Detecting When Clients Abort

Target: Fastify v5.12.1. Fastify has no built-in mechanism for detecting when a client intentionally aborts a request (e.g. closes the browser or cancels a fetch). This differs from `clientErrorHandler`, which only handles malformed requests / oversized headers at the socket level, not intentional aborts.

## Signature / Usage

```js
app.addHook('onRequest', async (request, reply) => {
  request.raw.on('close', () => {
    if (request.raw.aborted) {
      app.log.info('request closed')
    }
  })
})

app.get('/', async (request, reply) => {
  await sleep(3000)
  reply.code(200).send({ ok: true })
})
```

## Notes

- Listen for the raw request's `close` event and check `request.raw.aborted` to distinguish an intentional client abort from a normal completion
- `aborted` is deprecated in Node.js but remains the most reliable signal; `destroyed` is not a suitable replacement since it also fires when the server itself closes the connection
- The check can be placed in a global `onRequest` hook or inline in a specific route handler; doing it in application code (rather than lower-level raw-request code) gives access to Fastify context like `request.id` for logging
- Does not detect unintended disconnects (e.g. internet interruption) — those require additional application logic
- Test with an aborted `fetch()` request using `AbortController`, or by cancelling a request in a client like Postman before the handler responds

## Related

- [../hooks-lifecycle/request-hooks.md](../hooks-lifecycle/request-hooks.md)
