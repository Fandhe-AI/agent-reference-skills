---
source: https://tanstack.com/router/latest/docs/framework/react/guide/render-optimizations
---

# Render Optimizations

TanStack Router preserves reference stability for unchanged URL/search state ("structural sharing") and supports fine-grained subscriptions via a `select` option on router-state hooks.

## Signature / Usage

```tsx
// component won't re-render when `bar` changes
const foo = Route.useSearch({ select: ({ foo }) => foo })
```

Structural sharing (prevents re-render when `select` returns a new object with unchanged fields):

```tsx
const router = createRouter({
  routeTree,
  defaultStructuralSharing: true,
})

const result = Route.useSearch({
  select: (search) => ({ foo: search.foo, hello: `hello ${search.foo}` }),
  structuralSharing: true,
})
```

## Options / Props

| Name | Description |
|------|-------------|
| `select` (on `useSearch`, `useRouterState`, etc.) | Subscribe to only a derived subset of state; component re-renders only when the selected value changes |
| `structuralSharing` (per-hook) | Preserve referential stability of unchanged parts of a `select` result |
| `routerOptions.defaultStructuralSharing` | Enable structural sharing by default for all `select` usages |

## Notes

- Structural sharing only works with JSON-compatible data — returning class instances (e.g. `new Date()`) from `select` while structural sharing is enabled is a TypeScript error.
- Structural sharing defaults to **off** for backward compatibility (may change in v2).
- Without structural sharing, a `select` that returns a new object every call causes re-renders even when the underlying values are unchanged.

## Related

- [Data Loading](./data-loading.md)
