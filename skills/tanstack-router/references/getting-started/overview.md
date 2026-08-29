---
source: https://tanstack.com/router/latest/docs/framework/react/overview
---

# Overview

**TanStack Router is a router for building React and Solid applications** with 100% inferred TypeScript support, typesafe navigation, nested routing/layout routes, built-in route loaders with SWR caching, file-based route generation, and typesafe JSON-first Search Params.

## Signature / Usage

```tsx
import { createRouter, RouterProvider } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

const router = createRouter({ routeTree })

export default function App() {
  return <RouterProvider router={router} />
}
```

## Notes

- Designed for client-side data caches (TanStack Query, SWR, etc.); automatic route prefetching and asynchronous route elements/error boundaries are built in
- Delivers the same fundamentals as other routers (nested routes, file-based routing, parallel data loading, prefetching, path params, error boundaries, SSR, route masking) plus type-safe search params and route matching/loading middleware

## Related

- [Quick Start](./quick-start.md)
- [Comparison](./comparison.md)
- [Decisions on DX](./decisions-on-dx.md)
