---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Router Options

Options passed to the internal [`find-my-way`](https://github.com/delvedor/find-my-way) HTTP router via the `routerOptions` object in the Fastify factory options.

## Signature / Usage

```js
const fastify = require('fastify')({
  routerOptions: {
    ignoreTrailingSlash: true,
    maxParamLength: 200,
    caseSensitive: true
  }
})
```

## Options / Props

| Name | Default | Description |
|------|---------|-------------|
| `allowUnsafeRegex` | `false` | Allow unsafe regular expressions in route patterns (e.g. `/user/:id(^([0-9]+){4}$)`). |
| `buildPrettyMeta` | — | `(route) => object` sanitizing a route's `store` object for `printRoutes`/pretty-print output. |
| `caseSensitive` | `true` | `false` makes `/foo` and `/Foo` match the same route (matched path lowercased; param/wildcard casing preserved). Does not affect query strings. |
| `constraints` | — | Object of custom constraint strategies for `find-my-way`, can override built-in `version`/`host`. |
| `defaultRoute` | — | `(req, res)` fallback handler for unmatched routes; receives raw Node `req`/`res` (no Fastify decorations). |
| `ignoreDuplicateSlashes` | `false` | Collapses duplicate slashes in route path and request URL. |
| `ignoreTrailingSlash` | `false` | Treats `/foo` and `/foo/` as the same route. |
| `maxParamLength` | `100` | Max length for a parametric route parameter; not-found route invoked when exceeded (ReDoS mitigation). |
| `onBadUrl` | — | `(path, req, res)` handler for malformed URLs (e.g. `/hello/%world`); raw req/res, no Fastify helpers. |
| `onMaxParamLength` | — | `(path, req, res)` handler invoked when `maxParamLength` is exceeded; raw req/res. |
| `querystringParser` | `fast-querystring` | Custom `(str) => object` query string parser, e.g. `qs`. |
| `useSemicolonDelimiter` | `false` | Allow `;` as a query string delimiter (e.g. `/dev;foo=bar`). |

## Notes

- All of these options must be nested under a top-level `routerOptions` key passed to the Fastify factory (`Fastify({ routerOptions: { ... } })`), not passed as top-level factory options.
- `caseSensitive`, `ignoreDuplicateSlashes`, `ignoreTrailingSlash`, and `maxParamLength` are surfaced read-only on `fastify.initialConfig.routerOptions`.

## Related

- [Factory Options](./factory-options.md)
- [Instance Routing](./instance-routing.md)
