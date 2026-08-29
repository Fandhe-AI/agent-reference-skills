---
source: https://tanstack.com/router/latest/docs/api/router/RegisterType
---

# Register

A TypeScript interface used to register a route tree with a router instance, unlocking full type safety (including top-level exports from `@tanstack/react-router`).

## Signature / Usage

```tsx
const router = createRouter({
  // ...
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
```

## Notes

- This module augmentation pattern is required for TypeScript to infer route types across the application (e.g. in `Link`, `useParams`, `useSearch`).

## Related

- [createRouter](./create-router.md)
