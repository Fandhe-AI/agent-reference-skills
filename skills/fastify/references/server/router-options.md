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
| `compile` | `false` | When `true`, Fastify calls `find-my-way`'s `compile()` once all routes are registered, right before the `onReady` hooks run (main router and not-found router). Each HTTP method's routing tree becomes generated JavaScript, which makes route lookups faster; matching semantics are unchanged. |
| `constraints` | — | Object of custom constraint strategies for `find-my-way`, can override built-in `version`/`host`. |
| `defaultRoute` | — | `(req, res)` fallback handler for unmatched routes; receives raw Node `req`/`res` (no Fastify decorations). |
| `ignoreDuplicateSlashes` | `false` | Collapses duplicate slashes in route path and request URL. |
| `ignoreTrailingSlash` | `false` | Treats `/foo` and `/foo/` as the same route. |
| `maxParamLength` | `100` | Max length for a parametric route parameter; not-found route invoked when exceeded. For regex routes the limit applies to the captured values and is checked after the regex has run, so it is not a ReDoS mitigation (see Notes). |
| `onBadUrl` | — | `(path, req, res)` handler for malformed URLs (e.g. `/hello/%world`); raw req/res, no Fastify helpers. |
| `onMaxParamLength` | — | `(path, req, res)` handler invoked when `maxParamLength` is exceeded; raw req/res. |
| `querystringParser` | `fast-querystring` | Custom `(str) => object` query string parser, e.g. `qs`. |
| `useSemicolonDelimiter` | `false` | Allow `;` as a query string delimiter (e.g. `/dev;foo=bar`). |

## Notes

- All of these options must be nested under a top-level `routerOptions` key passed to the Fastify factory (`Fastify({ routerOptions: { ... } })`), not passed as top-level factory options.
- `caseSensitive`, `ignoreDuplicateSlashes`, `ignoreTrailingSlash`, and `maxParamLength` are surfaced read-only on `fastify.initialConfig.routerOptions`.

- `maxParamLength` does not limit the input a route regex processes and does not protect against ReDoS attacks. To guard against ReDoS, keep `allowUnsafeRegex` disabled so that potentially catastrophic regular expressions are rejected when the route is registered.
- `compile: true` caveats: the compiled matcher works on the raw request URL, so URLs containing percent-encoded characters fall back to the decoded path and are not faster; every route generates its own code, so applications with thousands of routes produce a large amount of JavaScript that needs to warm up per route.

```js
const fastify = require('fastify')({
  routerOptions: {
    compile: true
  }
})
```

- Source: https://raw.githubusercontent.com/fastify/fastify/v5.12.8/docs/Reference/Server.md (tag v5.12.8, fetched 2026-11-14)

## Related

- [Factory Options](./factory-options.md)
- [Instance Routing](./instance-routing.md)
