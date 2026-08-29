---
source: https://tanstack.com/router/latest/docs/framework/react/decisions-on-dx
---

# Decisions on Developer Experience

Explains why TanStack Router's configuration deviates from the norms of other routing libraries, in favor of best-in-class type-safety.

## Notes

- **JSX route config is not possible**: TypeScript cannot infer route configuration types from a JSX-based `<Route>` tree
- **Nested-object route trees don't scale**: a single ever-growing object doesn't support code-splitting well
- Routes are best defined outside the tree, then stitched into a single tree passed to `createRouter`; see code-based routing
- **Module declaration merging** (not manual imports) is used to expose the `Router` instance for type inference app-wide:

```tsx
// src/app.tsx
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

- **File-based routing is preferred over code-based** because the TanStack Router Bundler Plugin auto-generates boilerplate, stitches the route tree (wiring `getParentRoute`), and auto code-splits route components — a hand-written route tree for ~40-50 routes can exceed 700 lines

## Related

- [Overview](./overview.md)
- [FAQ](./faq.md)
