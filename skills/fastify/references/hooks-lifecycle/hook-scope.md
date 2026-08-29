---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Scope

Target: Fastify v5.12.1. Except for `onClose`, all hooks are encapsulated: you can control where a hook runs by registering it inside a given plugin scope.

## Signature / Usage

If you pass a function to `addHook`, that function is bound to the right Fastify context, giving full access to the Fastify API via `this`.

```js
fastify.addHook('onRequest', function (request, reply, done) {
  const self = this // Fastify context
  done()
})
```

The Fastify context in each hook is the same as the plugin where the route was registered:

```js
fastify.addHook('onRequest', async function (req, reply) {
  if (req.raw.url === '/nested') {
    assert.strictEqual(this.foo, 'bar')
  } else {
    assert.strictEqual(this.foo, undefined)
  }
})

fastify.get('/', async function (req, reply) {
  assert.strictEqual(this.foo, undefined)
  return { hello: 'world' }
})

fastify.register(async function plugin (fastify, opts) {
  fastify.decorate('foo', 'bar')

  fastify.get('/nested', async function (req, reply) {
    assert.strictEqual(this.foo, 'bar')
    return { hello: 'world' }
  })
})
```

## Notes

- If you declare the hook function as an arrow function, `this` will not be the Fastify instance, but the `this` of the enclosing scope.
- Scoping follows the same encapsulation model used by plugins/decorators — see the `plugins/encapsulation.md` page for the general mechanism.

## Related

- [request-hooks.md](./request-hooks.md)
- [application-hooks.md](./application-hooks.md)
- [route-level-hooks.md](./route-level-hooks.md)
