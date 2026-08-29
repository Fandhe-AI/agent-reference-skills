---
source: https://fastify.dev/docs/latest/Reference/Encapsulation/
---

# Encapsulation

A fundamental feature of Fastify is the "encapsulation context." It governs which decorators, registered hooks, and plugins are available to routes. Target version: v5.12.1.

## Signature / Usage

There are several entities in the encapsulation context:

1. The _root context_
2. Three _root plugins_
3. Two _child contexts_, each with two _child plugins_ and one _grandchild context_ (each with three _child plugins_)

Every _child context_ and _grandchild context_ has access to the _root plugins_. Within each _child context_, the _grandchild contexts_ have access to the _child plugins_ registered within the containing _child context_, but the containing _child context_ **does not** have access to the _child plugins_ registered within its _grandchild context_.

```js
'use strict'

const fastify = require('fastify')()

fastify.decorateRequest('answer', 42)

fastify.register(async function authenticatedContext (childServer) {
  childServer.register(require('@fastify/bearer-auth'), { keys: ['abc123'] })

  childServer.route({
    path: '/one',
    method: 'GET',
    handler (request, reply) {
      reply.send({
        answer: request.answer,
        // request.foo will be undefined as it is only defined in publicContext
        foo: request.foo,
        // request.bar will be undefined as it is only defined in grandchildContext
        bar: request.bar
      })
    }
  })
})

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, reply) {
      reply.send({
        answer: request.answer,
        foo: request.foo,
        bar: request.bar
      })
    }
  })

  childServer.register(async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, reply) {
        reply.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  })
})

fastify.listen({ port: 8000 })
```

## Sharing Between Contexts

Each context inherits _only_ from its parent contexts. Parent contexts cannot access entities within their descendant contexts. Encapsulation can be broken using [fastify-plugin](./fastify-plugin.md), making anything registered in a descendant context available to the parent context:

```js
'use strict'

const fastify = require('fastify')()
const fp = require('fastify-plugin')

fastify.decorateRequest('answer', 42)

fastify.register(async function publicContext (childServer) {
  childServer.decorateRequest('foo', 'foo')

  childServer.route({
    path: '/two',
    method: 'GET',
    handler (request, reply) {
      reply.send({
        answer: request.answer,
        foo: request.foo,
        bar: request.bar
      })
    }
  })

  childServer.register(fp(grandchildContext))

  async function grandchildContext (grandchildServer) {
    grandchildServer.decorateRequest('bar', 'bar')

    grandchildServer.route({
      path: '/three',
      method: 'GET',
      handler (request, reply) {
        reply.send({
          answer: request.answer,
          foo: request.foo,
          bar: request.bar
        })
      }
    })
  }
})

fastify.listen({ port: 8000 })
```

`fastify-plugin` breaks encapsulation only for the plugin it wraps. Plugins registered inside it without `fastify-plugin` still create new encapsulated contexts:

```js
'use strict'

const fastify = require('fastify')()
const fp = require('fastify-plugin')

fastify.register(fp(async function sharedContext (childServer) {
  childServer.decorate('foo', 'foo')

  childServer.register(async function encapsulatedContext (grandchildServer) {
    grandchildServer.decorate('bar', 'bar')
  })
}))

await fastify.ready()

console.log(fastify.foo) // 'foo'
console.log(fastify.bar) // undefined
```

## Notes

- The `foo` decorator is available in the root context because it is added directly by the plugin wrapped with `fastify-plugin`. The nested `register` call still creates a grandchild context, so `bar` remains available only in that context and its children.
- A visual diagram of the encapsulation context (root context / root plugins / child contexts / grandchild contexts) is published at `../resources/encapsulation_context.svg` in the fastify/fastify repository; it is not reproduced here as this format has no image support.

## Related

- [plugins](./plugins.md)
- [fastify-plugin](./fastify-plugin.md)
- [decorators](./decorators.md)
