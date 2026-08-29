---
source: https://tanstack.com/router/latest/docs/api/router/useRouterHook
---

# useRouter

Retrieves the current `Router` instance from context.

## Signature / Usage

```tsx
import { useRouter } from '@tanstack/react-router'

function Component() {
  const router = useRouter()
  // Use router instance here
}
```

```ts
useRouter(): Router
```

## Notes

- `router.state` is always up to date but **not reactive** — components reading `router.state` won't re-render on state changes.
- Use `useRouterState` instead when reactive state updates are needed.

## Related

- [useRouterState](./use-router-state.md)
- [Router](./router.md)
