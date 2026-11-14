# Dev Helper

Utilities for inspecting registered routes and the active router during development.

## Signature / Usage

```ts
import { showRoutes, getRouterName } from 'hono/dev'

const app = new Hono().basePath('/v1')
app.get('/posts', (c) => c.text('list'))
app.get('/posts/:id', (c) => c.text('show'))
app.post('/posts', (c) => c.text('create'))

showRoutes(app, { verbose: true })
// GET   /v1/posts
//         [handler]
// GET   /v1/posts/:id
//         [handler]
// POST  /v1/posts
//         [handler]

console.log(getRouterName(app))
// e.g. 'SmartRouter'
```

## Options / Props

### `showRoutes(app, options?)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | `Hono` | Application instance |
| `options.verbose` | `boolean` | Show additional details when `true` |
| `options.colorize` | `boolean` | Disable colored output when `false` |

### `getRouterName(app)`

| Parameter | Type | Description |
|-----------|------|-------------|
| `app` | `Hono` | Application instance |

Returns: `string` — name of the active router (e.g., `'SmartRouter'`, `'RegExpRouter'`).

## Notes

- These helpers are intended for development/debugging only; avoid using in production handlers
- The official output now prints a `[handler]` line under each route.
- Source: https://hono.dev/docs/helpers/dev (honojs/website@20aab4e0, retrieved 2026-11-14)

## Related

- [Route Helper](./route.md)
- [SSG Helper](./ssg.md)
