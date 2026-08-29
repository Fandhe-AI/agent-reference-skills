---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Routing Methods

Methods for registering, inspecting and debugging routes and route constraint strategies on a Fastify instance.

## Signature / Usage

```js
fastify.addHttpMethod('MKCOL', { hasBody: true })

const exists = fastify.hasRoute({ url: '/', method: 'GET' })
const route = fastify.findRoute({ url: '/artists/:artistId', method: 'GET' })

fastify.ready(() => {
  console.log(fastify.printRoutes())
})
```

## Options / Props

| Name | Signature | Description |
|------|-----------|-------------|
| `route` | `.route(options)` | Adds a route; has shorthand methods (`.get`, `.post`, ...). See `Routes.md` (routing scope). |
| `hasRoute` | `.hasRoute({ url, method, constraints? })` | Returns `true`/`false` whether a route is registered in the internal router. |
| `findRoute` | `.findRoute({ url, method, constraints? })` | Returns the matching route object, or `null` if not found. |
| `addHttpMethod` | `.addHttpMethod(method, { hasBody?, overrideExisting? })` | Registers a non-standard HTTP method (Fastify natively supports `GET`, `HEAD`, `TRACE`, `DELETE`, `OPTIONS`, `PATCH`, `PUT`, `POST`, `QUERY`). `hasBody` defaults `false`; `overrideExisting` defaults `false`. |
| `addConstraintStrategy` | `.addConstraintStrategy(strategy)` | Registers a custom `find-my-way` constraint strategy (`name`, `storage()`, `deriveConstraint(req, ctx)`, optional `mustMatchWhenDerived`). |
| `hasConstraintStrategy` | `.hasConstraintStrategy(name)` | Returns whether a constraint strategy with that name is already registered. |
| `printRoutes` | `.printRoutes([options])` | Pretty-prints the route tree. Options: `method` (internal tree, for debugging), `commonPrefix: false` (compressed), `includeMeta` (array or `true`), `includeHooks: true`. Call inside/after `ready`. |

## Notes

- v4 → v5: non-standard HTTP methods (`PROPFIND`, `PROPPATCH`, `MKCOL`, `COPY`, `MOVE`, `LOCK`, `UNLOCK`, `TRACE`, `SEARCH`) were removed from the default method set; restore them per-instance with `addHttpMethod()`. Calling `addHttpMethod` for an existing method without `overrideExisting: true` emits deprecation warning `FSTDEP025` in v5 and will throw in v6.
- v4 → v5: `hasRoute()` now matches `find-my-way`'s own matching behavior — the route definition passed must match how the route was originally registered (e.g. a regex parameter pattern), not an arbitrary concrete path.
- v4 → v5: `getDefaultRoute` and `setDefaultRoute` instance methods were removed (deprecated as `FSTDEP014` in v4). Use the `routerOptions.defaultRoute` factory/router option instead.
- `printRoutes({ method })` reflects the true internal router structure and is safe for debugging; the default merged-tree output across all methods is not.

## Related

- [Router Options](./router-options.md)
- [Instance Plugins](./instance-plugins.md)
