---
source: https://tanstack.com/router/latest/docs/framework/react/routing/virtual-file-routes
---

# Virtual File Routes

Programmatic route-tree construction that still references real project files, for custom file layouts or full override of the standard file-based generation.

## Signature / Usage

```tsx
// routes.ts
import { rootRoute, route, index, layout, physical } from '@tanstack/virtual-file-routes'

export const routes = rootRoute('root.tsx', [
  index('index.tsx'),
  layout('pathlessLayout.tsx', [
    route('/dashboard', 'app/dashboard.tsx', [
      index('app/dashboard-index.tsx'),
      route('/invoices', 'app/dashboard-invoices.tsx', [
        index('app/invoices-index.tsx'),
        route('$id', 'app/invoice-detail.tsx'),
      ]),
    ]),
    physical('/posts', 'posts'),
  ]),
])
```

```tsx
// vite.config.ts
tanstackRouter({
  target: 'react',
  virtualRouteConfig: './routes.ts',
})
```

```json
// tsr.config.json (CLI)
{ "virtualRouteConfig": "./routes.ts" }
```

## Options / Props

| Function | Purpose |
|----------|---------|
| `rootRoute` | Establishes the root route; accepts a filename and a children array |
| `route` | Creates a named route with an explicit URL path and optional children |
| `index` | Generates an index route from a specified file |
| `layout` | Builds a pathless layout route, with an optional custom ID when the filename differs from the desired identifier |
| `physical` | Mounts a directory using standard file-based routing conventions within the virtual tree; without a path prefix it merges the subtree at the current level with no URL prefix |

## Notes

- Virtual routing can be scoped to part of a project by placing `__virtual.ts` files inside directories, mixing file-based and virtual routing (hybrid routing).
- `virtualRouteConfig` also accepts route objects passed directly instead of a file path.

## Related

- [Route Trees](./route-trees.md)
- [File-Based Routing](./file-based-routing.md)
- [Code-Based Routing](./code-based-routing.md)
