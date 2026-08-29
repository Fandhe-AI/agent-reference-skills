---
source: https://fastify.dev/docs/latest/Reference/Routes/
---

# Constraints

Fastify supports constraining routes to match certain requests based on properties like the `Host` header or any other value via find-my-way constraints. Constraints are specified in the `constraints` property of the route options. Fastify has two built-in constraints: `version` and `host`. Custom constraint strategies can be added to inspect other parts of a request to decide if a route should be executed.

## Signature / Usage

### Version Constraints

A `version` key can be provided in the `constraints` option of a route. Versioned routes allow multiple handlers to be declared for the same HTTP route path, matched according to the request's `Accept-Version` header. The header value should follow the semver specification, and routes should be declared with exact semver versions for matching.

Fastify requires a request `Accept-Version` header to be set if the route has a version set, and prefers a versioned route to a non-versioned route for the same path. Advanced version ranges and pre-releases are currently not supported.

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { version: '1.2.0' },
  handler: function (request, reply) {
    reply.send({ hello: 'world' })
  }
})

fastify.inject({
  method: 'GET',
  url: '/',
  headers: {
    'Accept-Version': '1.x' // it could also be '1.2.0' or '1.2.x'
  }
}, (err, res) => {
  // { hello: 'world' }
})
```

If multiple versions with the same major or minor are declared, Fastify always chooses the highest one compatible with the `Accept-Version` header value. If the request lacks an `Accept-Version` header, a 404 error is returned. Custom version matching logic can be defined through the `constraints` configuration when creating a Fastify server instance (see Server).

### Host Constraints

A `host` key can be provided in the `constraints` route option to limit the route to certain values of the request `Host` header. `host` constraint values can be strings for exact matches or RegExps for arbitrary host matching.

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: 'auth.fastify.example' },
  handler: function (request, reply) {
    reply.send('hello world from auth.fastify.example')
  }
})
```

RegExp `host` constraints can also be specified, allowing constraining to hosts matching wildcard subdomains:

```js
fastify.route({
  method: 'GET',
  url: '/',
  constraints: { host: /^.+\.fastify\.example$/ }, // will match any subdomain of fastify.example
  handler: function (request, reply) {
    reply.send('hello world from ' + request.headers.host)
  }
})
```

### Asynchronous Custom Constraints

Custom constraints can be provided, and criteria can be fetched from another source such as a database. Use asynchronous custom constraints as a last resort, as they impact router performance.

```js
function databaseOperation(field, done) {
  done(null, field)
}

const secret = {
  // strategy name for referencing in the route handler `constraints` options
  name: 'secret',
  // storage factory for storing routes in the find-my-way route tree
  storage: function () {
    let handlers = {}
    return {
      get: (type) => { return handlers[type] || null },
      set: (type, store) => { handlers[type] = store }
    }
  },
  // function to get the value of the constraint from each incoming request
  deriveConstraint: (req, ctx, done) => {
    databaseOperation(req.headers['secret'], done)
  },
  // optional flag marking if handlers without constraints can match requests that have a value for this constraint
  mustMatchWhenDerived: true
}
```

## Notes

- Version constraints can degrade the router's performance.
- Set a `Vary` header in responses with the value used for versioning (e.g., `'Accept-Version'`) to prevent cache poisoning attacks (also configurable on a Proxy/CDN):
  ```js
  const append = require('vary').append
  fastify.addHook('onSend', (req, reply, payload, done) => {
    if (req.headers['accept-version']) {
      let value = reply.getHeader('Vary') || ''
      const header = Array.isArray(value) ? value.join(', ') : String(value)
      if ((value = append(header, 'Accept-Version'))) {
        reply.header('Vary', value)
      }
    }
    done()
  })
  ```
- When using asynchronous constraints, avoid returning errors inside the callback; if unavoidable, provide a custom `frameworkErrors` handler, otherwise route selection may break or expose sensitive information.
- **v4 → v5**: the signature for route versioning constraints changed. The `version` and `versioning` options have been removed; use the `constraints` option instead. `FSTDEP008` (route-level `{version: "..."}`) → use `{constraints: {version: "..."}}`. `FSTDEP009` (server-level `{versioning: "..."}`) → use `{constraints: {version: "..."}}`.
- Anchor host-constraint regexes (`^...$`); the upstream example's unanchored `/.*\.fastify\.example/` also matches `foo.fastify.example.attacker.test`, so a tenant/admin routing constraint could be bypassed.

## Related

- [route-options.md](./route-options.md)
- [route-prefixing.md](./route-prefixing.md)
