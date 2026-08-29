---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Route Prefixing

Sometimes maintaining multiple versions of the same API is necessary. A common approach is to prefix routes with the API version number, e.g., `/v1/user`. Fastify offers a fast and smart way to create different versions of the same API without changing all the route names by hand, called *route prefixing*.

## Signature / Usage

```js
// server.js
const fastify = require('fastify')()

fastify.register(require('./routes/v1/users'), { prefix: '/v1' })
fastify.register(require('./routes/v2/users'), { prefix: '/v2' })

fastify.listen({ port: 3000 })
```

```js
// routes/v1/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v1)
  done()
}
```

```js
// routes/v2/users.js
module.exports = function (fastify, opts, done) {
  fastify.get('/user', handler_v2)
  done()
}
```

Fastify does not complain about using the same name for two different routes because it handles the prefix automatically at compilation time; performance is not affected. Clients then have access to `/v1/user` and `/v2/user`. This can be done multiple times and works for nested `register`. Route parameters are also supported.

To use a prefix for all routes, place them inside a plugin:

```js
const fastify = require('fastify')()

const route = {
    method: 'POST',
    url: '/login',
    handler: () => {},
    schema: {},
}

fastify.register(function (app, _, done) {
  app.get('/users', () => {})
  app.route(route)

  done()
}, { prefix: '/v1' }) // global route prefix

await fastify.listen({ port: 3000 })
```

### Route Prefixing and fastify-plugin

If using `fastify-plugin` to wrap routes, the `prefix` option does not work directly. To make it work, wrap a plugin in a plugin:

```js
const fp = require('fastify-plugin')
const routes = require('./lib/routes')

module.exports = fp(async function (app, opts) {
  app.register(routes, {
    prefix: '/v1',
  })
}, {
  name: 'my-routes'
})
```

## Notes

- Handling of `/` route inside prefixed plugins: the `/` route behaves differently based on whether the prefix ends with `/`. With a prefix `/something/`, adding a `/` route matches only `/something/`. With a prefix `/something`, adding a `/` route matches both `/something` and `/something/`. See the `prefixTrailingSlash` route option (route-options.md) to change this behavior.

## Related

- [route-options.md](./route-options.md)
- [url-parameters.md](./url-parameters.md)
