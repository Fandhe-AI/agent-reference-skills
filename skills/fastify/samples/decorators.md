---
source: https://fastify.dev/docs/latest/Reference/Decorators/
---

# Decorators

Extend the Fastify server, request, and reply instances with custom properties/methods using `decorate`, `decorateRequest`, and `decorateReply`.

```js
fastify.decorate('utility', function () {
  // Something very useful
})

fastify.decorateRequest('utility', function () {
  // something very useful
})

fastify.decorateReply('utility', function () {
  // Something very useful
})
```

## Notes

- Use `function` (not arrow functions) for decorator methods that need `this` bound to the Fastify instance/request/reply.
- Decorators are subject to plugin encapsulation — see `plugin-encapsulation.md`.
- Decorating request/reply with mutable objects (arrays, objects) requires the `onRequest` hook pattern to avoid shared-state bugs across requests (see the Decorators reference for details).
