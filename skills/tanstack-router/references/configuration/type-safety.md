---
source: https://tanstack.com/router/latest/docs/framework/react/guide/type-safety
---

# Type Safety

TanStack Router fully infers types throughout the routing experience, reducing manual type annotations.

## Signature / Usage

```tsx
// src/app.tsx
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

## Notes

- File-based routing handles most type safety automatically; code-based routing requires passing parent routes to child routes via `getParentRoute` to preserve parent types.
- Types are registered via declaration merging on the `Register` interface, enabling type-safe `Link` / `useNavigate` usage (see Creating a Router).
- Route-specific hooks accept an optional `from` parameter for context hints; providing it improves accuracy.
- `createRootRouteWithContext` enables hierarchical dependency injection with type merging across the route tree.
- For large apps, to keep TypeScript checking fast:
  - Only infer necessary types (avoid inferring unused loader return types)
  - Narrow to relevant routes using `from`/`to` rather than relying on unions
  - Use object syntax for `addChildren` instead of tuples for complex trees
  - Avoid broad internal types like `LinkProps` without narrowing; use `as const satisfies` instead
  - Consider render props for component prop inversion to enable precise type narrowing

## Related

- [Creating a Router](./creating-a-router.md)
- [Type Utilities](./type-utilities.md)
- [Router Context](./router-context.md)
