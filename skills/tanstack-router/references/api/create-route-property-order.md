---
source: https://tanstack.com/router/latest/docs/eslint/create-route-property-order
---

# create-route-property-order

Enforces a specific property order in `createRoute` / `createFileRoute` / `createRootRoute` / `createRootRouteWithContext` calls, since property order affects type inference.

## Signature / Usage

```tsx
// Incorrect
export const Route = createFileRoute('/path')({
  loader: async ({ context }) => {
    /* ... */
  },
  beforeLoad: () => ({ hello: 'world' }),
})

// Correct
export const Route = createFileRoute('/path')({
  beforeLoad: () => ({ hello: 'world' }),
  loader: async ({ context }) => {
    /* ... */
  },
})
```

## Notes

- Enforced order: `params`/`validateSearch` → `loaderDeps`/`search.middlewares`/`ssr` → `context` → `beforeLoad` → `loader` → `onEnter`/`onStay`/`onLeave`/`head`/`scripts`/`headers`/`remountDeps`. Other properties are unordered.
- Recommended and auto-fixable.

## Related

- [eslint-plugin-router](./eslint-plugin-router.md)
- [createRoute](./create-route.md)
