---
source: https://tanstack.com/router/latest/docs/framework/react/faq
---

# Frequently Asked Questions

Answers to common questions about TanStack Router.

## Notes

- **Why TanStack Router over another router?** Compares against Next.js (feature-rich but can present non-standard APIs and a steeper learning curve) and Remix / React Router (well-designed, web-standards-rooted, but type safety is an add-on and the design is more rigid)
- **Is TanStack Router a framework?** Not by itself, but it is designed to be upgradable into a full-stack framework via TanStack Start (built on TanStack Router + Vite)
- **Should `routeTree.gen.ts` be committed to git?** Yes — despite being generated, it is part of the application's runtime source, not a build artifact
- **Can the root route component be conditionally rendered?** No, the root route always renders (it's the app entry point). Use a Layout Route or Pathless Layout Route with a `beforeLoad` auth check instead:

```tsx
// src/routes/_pathless-layout.tsx
import { createFileRoute, Outlet } from '@tanstack/react-router'
import { isAuthenticated } from '../utils/auth'

export const Route = createFileRoute('/_pathless-layout', {
  beforeLoad: async () => {
    const authed = await isAuthenticated()
    if (!authed) return '/login'
  },
  component: PathlessLayoutRouteComponent,
})
```

  （原文どおり。現行 API では `createFileRoute(path)({...})` / `throw redirect(...)` 形が標準）

## Related

- [Comparison](./comparison.md)
- [Decisions on DX](./decisions-on-dx.md)
