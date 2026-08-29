---
source: https://tanstack.com/start/latest/docs/framework/react/guide/error-boundaries
---

# Error Boundaries

Router-level error handling in TanStack Start via a default `defaultErrorComponent` on the router, or a per-route `errorComponent` override on `createFileRoute()`.

## Signature / Usage

### Default error component

```tsx
// src/router.tsx
import { createRouter, ErrorComponent } from '@tanstack/react-router'
import { routeTree } from './routeTree.gen'

export function getRouter() {
  const router = createRouter({
    routeTree,
    // Shown when an error bubbles to the router
    defaultErrorComponent: ({ error, reset }) => (
      <ErrorComponent error={error} />
    ),
  })
  return router
}
```

### Per-route override

```tsx
// src/routes/posts.$postId.tsx
import { createFileRoute, ErrorComponent } from '@tanstack/react-router'
import type { ErrorComponentProps } from '@tanstack/react-router'

function PostError({ error, reset }: ErrorComponentProps) {
  return <ErrorComponent error={error} />
}

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
  errorComponent: PostError,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `defaultErrorComponent` (router option) | `(props: ErrorComponentProps) => React.ReactNode` | Fallback rendered when an error bubbles up to the router without a closer `errorComponent` |
| `errorComponent` (route option) | `(props: ErrorComponentProps) => React.ReactNode` | Per-route override, receiving `{ error, reset }` |

## Notes

- A route without its own `errorComponent` falls back to the router's `defaultErrorComponent`.
- `ErrorComponent` (from `@tanstack/react-router`) is the built-in fallback UI; custom components typically wrap or replace it.

## Related

- [Server Components](./server-components.md)
- [Routing](./routing.md)
