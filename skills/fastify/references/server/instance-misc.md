---
source: https://fastify.dev/docs/latest/Reference/Server/
---

# Instance Miscellaneous Properties

Remaining top-level instance properties: the underlying Node server, the logger, the Fastify version, the raw router lookup, and the frozen initial configuration snapshot.

## Signature / Usage

```js
const fastify = require('fastify')({ https: { allowHTTP1: true, key, cert }, logger: { level: 'trace' } })
console.log(fastify.initialConfig)
fastify.routing(req, res)
```

## Options / Props

| Name | Description |
|------|-------------|
| `server` | `.server` — the Node core `http.Server`/`https.Server` object returned by the factory function. Intended only for attaching listeners; misuse can break Fastify features. |
| `log` | `.log` — the logger instance (see `Logging.md`, `errors-logging` category). |
| `version` | `.version` — the Fastify version of the instance, used for plugin compatibility checks. |
| `routing` | `.routing(req, res)` — accesses the internal router's `lookup` method directly, matching a raw request to its handler. |
| `initialConfig` | `.initialConfig` — a frozen, read-only object of the options passed to the factory function; setting a property throws. |

## Notes

- `initialConfig` exposes: `connectionTimeout`, `keepAliveTimeout`, `handlerTimeout`, `bodyLimit`, `caseSensitive`, `http2`, `https` (boolean or `{ allowHTTP1 }`), `disableRequestLogging`, `onProtoPoisoning`, `onConstructorPoisoning`, `pluginTimeout`, `requestIdHeader`, `requestIdLogLabel`, `http2SessionTimeout`, and a nested `routerOptions` object (`allowUnsafeRegex`, `buildPrettyMeta`, `caseSensitive`, `constraints`, `defaultRoute`, `ignoreDuplicateSlashes`, `ignoreTrailingSlash`, `maxParamLength`, `onBadUrl`, `querystringParser`, `useSemicolonDelimiter`).

## Related

- [Instance Lifecycle](./instance-lifecycle.md)
- [Router Options](./router-options.md)
