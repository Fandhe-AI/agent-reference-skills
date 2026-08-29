---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Shorthand Declaration

The full route declaration (`fastify.route(options)`) is more Hapi-like, but Fastify also supports an Express/Restify-like shorthand approach.

## Signature / Usage

```js
fastify.get(path, [options], handler)
fastify.head(path, [options], handler)
fastify.post(path, [options], handler)
fastify.put(path, [options], handler)
fastify.delete(path, [options], handler)
fastify.options(path, [options], handler)
fastify.patch(path, [options], handler)
```

```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  }
}
fastify.get('/', opts, (request, reply) => {
  reply.send({ hello: 'world' })
})
```

`fastify.all(path, [options], handler)` adds the same handler to all the supported methods.

The handler may also be supplied via the `options` object:

```js
const opts = {
  schema: {
    response: {
      200: {
        type: 'object',
        properties: {
          hello: { type: 'string' }
        }
      }
    }
  },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
}
fastify.get('/', opts)
```

## Notes

- Specifying the handler in both `options` and as the third parameter to the shortcut method throws a duplicate `handler` error.

## Related

- [route-options.md](./route-options.md)
- [async-await-handlers.md](./async-await-handlers.md)
