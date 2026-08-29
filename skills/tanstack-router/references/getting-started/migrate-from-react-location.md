---
source: https://tanstack.com/router/latest/docs/framework/react/installation/migrate-from-react-location
---

# Migrate from React Location

Step-by-step migration from React Location (the predecessor project by the same author) to TanStack Router.

## Signature / Usage

```tsx
// src/routes/__root.tsx
import { createRootRoute, Outlet } from '@tanstack/react-router'

export const Route = createRootRoute({
  component: () => (
    <>
      {/* nav links */}
      <Outlet />
    </>
  ),
})
```

```tsx
// src/routes/index.tsx
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: () => 'Home',
})
```

## Notes

- Key differences: React Location uses generics for type inference and a single flat array of route definitions; TanStack Router uses module declaration merging and a tree of route definitions starting at the root route
- File-based routing is the recommended way to define routes in TanStack Router, unlike React Location's code-based single-file approach
- Migration steps: (1) swap dependencies, (2) add the bundler plugin, (3) create `tsr.config.json`, (4) create `src/routes/`, (5) create `__root.tsx`, (6) create `index.tsx`, (7) build a layout route with a loader, (8) add an index child route, (9) add a dynamic param route with data loading, (10) generate the route tree (`npx tsr generate` or automatically), (11) update the entry point to instantiate the router and render `<RouterProvider />`

## Related

- [Migrate from React Router](./migrate-from-react-router.md)
- [Manual Setup](./installation-manual.md)
