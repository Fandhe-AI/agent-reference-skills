# Route Helper

Inspect matched routes, path patterns, and base paths at runtime — useful for nested sub-applications.

## Signature / Usage

```ts
import { matchedRoutes, routePath, baseRoutePath, basePath } from 'hono/route'

app.get('/api/posts/:id', (c) => {
  matchedRoutes(c)     // all matched routes (including middleware)
  routePath(c)         // '/api/posts/:id'
  routePath(c, 0)      // first matched pattern
  routePath(c, -1)     // last matched pattern
  baseRoutePath(c)     // base pattern from app.route()
  basePath(c)          // '/api' (actual values substituted)
})
```

## Options / Props

### `matchedRoutes(c)`

Returns: `Array<{ method: string; path: string; handler: Function }>` — all routes (and middleware) that matched the current request.

### `routePath(c, index?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `c` | `Context` | Hono context |
| `index` | `number` (optional) | Position in matched list; supports negative indexing (`Array.at()` semantics) |

Returns: `string` — route pattern (e.g., `'/posts/:id'`).

### `baseRoutePath(c, index?)`

Same signature as `routePath`. Returns the base path pattern as specified in `app.route()`.

### `basePath(c)`

Returns: `string` — base path with actual parameter values substituted (e.g., `'/api'`).

## Notes

- All helpers support sub-applications composed with `app.route()`
- `index` uses `Array.at()` semantics, so `-1` refers to the last matched route
- Source: https://hono.dev/docs/helpers/route (honojs/website@20aab4e0, retrieved 2026-11-14)
- Since v4.13.14 `basePath()` matches regex params the same way as the router (https://github.com/honojs/hono/releases/tag/v4.13.14).
- v5 (release candidate): `c.req.matchedRoutes` and `c.req.routePath` are removed; use `matchedRoutes(c)` and `routePath(c)` from this helper. See guides/migrating-to-v5.md.

## Related

- [Dev Helper](./dev.md)
- [Factory Helper](./factory.md)
