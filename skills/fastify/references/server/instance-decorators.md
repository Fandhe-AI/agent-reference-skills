---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Decorators

Method to decorate the Fastify instance, `Request`, or `Reply` with additional properties or functions.

## Signature / Usage

```js
fastify.decorate('utility', () => 'hello')
fastify.decorateRequest('user', null)
fastify.decorateReply('sendSuccess', function (data) {
  this.send({ ok: true, data })
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `decorate` / `decorateRequest` / `decorateReply` | Add properties/functions to the Fastify instance, `Request`, or `Reply`. Full options and `hasDecorator`/`hasRequestDecorator`/`hasReplyDecorator` APIs are documented in `Decorators.md` (plugins scope). |

## Notes

- v4 → v5: decorating `Request`/`Reply` with a reference type (`Array`, `Object`) is now prohibited, since that single reference would be shared across all requests. Use a hook to assign a fresh instance per request, or convert the decorator to a function/getter instead.
- Full decorator API detail (including `hasDecorator*`) lives in the `plugins` category's `decorators.md` page; this page only covers the `Server.md` pointer.

## Related

- [Instance Plugins](./instance-plugins.md)
- [Instance Schemas](./instance-schemas.md)
