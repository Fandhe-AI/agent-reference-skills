---
source: https://fastify.dev/docs/latest/Reference/Hooks/
---

# Route Level Hooks

Target: Fastify v5.12.1. One or more custom lifecycle hooks (`onRequest`, `onResponse`, `preParsing`, `preValidation`, `preHandler`, `preSerialization`, `onSend`, `onTimeout`, `onError`) that are unique to a single route, declared via `fastify.route()`. Route-level hooks always run as the **last** hook in their category, after the shared hooks added with `fastify.addHook`.

## Signature / Usage

```js
fastify.addHook('preHandler', (request, reply, done) => {
  // Your code
  done()
})

fastify.route({
  method: 'GET',
  url: '/',
  schema: { /* ... */ },
  onRequest: function (request, reply, done) {
    // This hook will always be executed after the shared `onRequest` hooks
    done()
  },
  preHandler: function (request, reply, done) {
    // This hook will always be executed after the shared `preHandler` hooks
    done()
  },
  // Arrays are also supported for every route-level hook option
  // preHandler: [function (request, reply, done) { done() }],
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})
```

Useful for implementing authentication, where `preParsing` or `preValidation` is exactly what you need. Route-level hooks can also be arrays of functions, and support the `async` function form.

### Using Hooks to Inject Custom Properties

Hooks can inject custom properties into the request object for reuse further down the lifecycle — for example, storing decoded authentication data:

```js
fastify.addHook('preParsing', async (request) => {
  request.authenticatedUser = {
    id: 42,
    name: 'Jane Doe',
    role: 'admin'
  }
})

fastify.get('/me/is-admin', async function (req, reply) {
  return { isAdmin: req.authenticatedUser?.role === 'admin' || false }
})
```

For TypeScript, augment the `FastifyRequest` interface:

```ts
interface AuthenticatedUser { /* ... */ }

declare module 'fastify' {
  export interface FastifyRequest {
    authenticatedUser?: AuthenticatedUser;
  }
}
```

Use a new, dedicated property name rather than mutating an existing one, and reserve this pattern for small, specific cases — for anything more complex, prefer a custom plugin.

## Options / Props

| Route option | Hook name | Runs after shared hook |
|---------------|-----------|--------------------------|
| `onRequest` | `onRequest` | yes |
| `onResponse` | `onResponse` | yes |
| `preParsing` | `preParsing` | yes |
| `preValidation` | `preValidation` | yes |
| `preHandler` | `preHandler` | yes |
| `preSerialization` | `preSerialization` | yes |
| `onSend` | `onSend` | yes |
| `onTimeout` | `onTimeout` | yes |
| `onError` | `onError` | yes |

## Notes

- Both route-level hook options and application-level `addHook` calls accept a single function or an array of functions.

## Related

- [request-hooks.md](./request-hooks.md)
- [hook-scope.md](./hook-scope.md)
- [lifecycle.md](./lifecycle.md)
