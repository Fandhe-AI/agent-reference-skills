---
source: https://tanstack.com/router/latest/docs/framework/react/comparison
---

# Comparison

Side-by-side comparison of TanStack Router / TanStack Start vs Next.js vs React Router / Remix, to help evaluate which routing solution fits a project's needs.

## Signature / Usage

```tsx
// TanStack Router: fully typesafe route/search-param inference, no codegen required for types
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$postId')({
  component: PostComponent,
})
```

## Options / Props

| Feature | TanStack Router / Start | React Router DOM | Next.js |
| --- | --- | --- | --- |
| Typesafe Routes | Yes | Partial | Partial |
| Code-based Routes | Yes | Yes | No |
| Typesafe Path Params | Yes | Yes | No |
| TypeSafe Search Params | Yes | No | No |
| Route Pending Elements | Yes | Yes | Yes |
| API Middleware | Yes | Yes | Yes |

## Notes

- The comparison may not capture all nuances or recent updates; consult each project's official documentation and test solutions directly
- react-router (the `react-router` package) is a distinct library — `Link` / `Outlet` / `useNavigate` / `loader` exist in both but are separate, non-interchangeable APIs

## Related

- [FAQ](./faq.md)
- [Migrate from React Router](./migrate-from-react-router.md)
