---
source: https://fastify.dev/docs/latest/Reference/Decorators/
---

# Decorators

The decorators API customizes core Fastify objects, such as the server instance and any request and reply objects used during the HTTP request lifecycle, by attaching properties (functions, plain objects, native types) to them. Target version: v5.12.1.

This API is *synchronous*. To register an asynchronous decoration, use the `register` API with `fastify-plugin`.

## Signature / Usage

```js
fastify.decorate(name, value, [dependencies])
fastify.decorateRequest(name, value, [dependencies])
fastify.decorateReply(name, value, [dependencies])
fastify.hasDecorator(name)
fastify.hasRequestDecorator(name)
fastify.hasReplyDecorator(name)
fastify.getDecorator(name)
request.setDecorator(name, value)
```

`decorate` attaches a new method/property to the server instance:

```js
fastify.decorate('utility', function () {
  // Something very useful
})

fastify.decorate('conf', {
  db: 'some.db',
  port: 3000
})
```

The decorated Fastify server is bound to `this` in route handlers:

```js
fastify.decorate('db', new DbConnection())

fastify.get('/', async function (request, reply) {
  return { hello: await this.db.query('world') }
})
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `name` | string | Name of the decorator, used to access it (`fastify.<name>`, `request.<name>`, `reply.<name>`). |
| `value` | any | Value to attach. Reference types (object/array) throw on `decorateRequest` / `decorateReply` — use a `getter`/`setter` object or the `onRequest` hook instead. |
| `dependencies` | string[] | Optional list of decorator names that must already be registered. Checked before the server boots; throws if unsatisfied. |

`decorateRequest` / `decorateReply` reject reference-type values directly (they would be shared across all requests, risking mutation across requests):

```js
// Don't do this — throws
fastify.decorateReply('foo', { bar: 'fizz' })
```

Instead, initialize per-request state in an `onRequest` hook:

```js
const fp = require('fastify-plugin')

async function myPlugin (app) {
  app.decorateReply('foo')
  app.addHook('onRequest', async (req, reply) => {
    reply.foo = { bar: 42 }
  })
}

module.exports = fp(myPlugin)
```

Or use the getter/setter pattern with two decorators:

```js
fastify.decorateRequest('my_decorator_holder') // define the holder
fastify.decorateRequest('user', {
  getter () {
    this.my_decorator_holder ??= {} // initialize the holder
    return this.my_decorator_holder
  }
})

fastify.get('/', async function (req, reply) {
  req.user.access = 'granted'
})
```

`getDecorator(name)` retrieves an existing decorator from the Fastify instance, `Request`, or `Reply`; it throws `FST_ERR_DEC_UNDECLARED` if the decorator is not defined:

```js
const utility = fastify.getDecorator('utility')
const user = request.getDecorator('user')
const helper = reply.getDecorator('helper')
```

`setDecorator(name, value)` safely updates the value of a `Request` decorator, throwing `FST_ERR_DEC_UNDECLARED` if it does not exist:

```js
fastify.decorateRequest('user', null)

fastify.addHook('preHandler', async (req, reply) => {
  req.setDecorator('user', 'Bob Dylan')
})
```

## Notes

- v4 -> v5: reference-type (object/array) values passed to `decorateRequest` / `decorateReply` are no longer supported and now throw an error at registration time. Use a `getter`/`setter` object, the `onRequest` hook, or `getDecorator`/`setDecorator` instead of sharing a mutable object reference across requests.
- Defining a decorator with the same name more than once in the same encapsulated context throws an exception; a child context may re-decorate the same name without conflict because it creates its own scope.
- Using an arrow function for a decorator value breaks the binding of `this` to the Fastify instance / `Request` / `Reply`.
- Decorators accept a `{ getter, setter }` object to define computed properties (e.g. `fastify.decorate('foo', { getter () { return 'a getter' } })`).

## Related

- [plugins](./plugins.md)
- [encapsulation](./encapsulation.md)
