---
source: https://tanstack.com/router/latest/docs/framework/react/guide/data-mutations
---

# Data Mutations

TanStack Router does not manage mutation/submission state itself; its role is invalidating loader data (and reacting to URL side effects) after mutations performed by an external library (TanStack Query, SWR, RTK Query, urql, Relay, Apollo, Zustand, Jotai, Recoil, Redux).

## Signature / Usage

```tsx
const router = useRouter()

const addTodo = async (todo: Todo) => {
  try {
    await api.addTodo()
    router.invalidate()
  } catch {
    //
  }
}

// await until all loaders finish
await router.invalidate({ sync: true })
```

Clearing stale mutation state on navigation via `router.subscribe`:

```tsx
const router = createRouter()
const coolMutationCache = createCoolMutationCache()

const unsubscribeFn = router.subscribe('onResolved', () => {
  coolMutationCache.clear()
})
```

## Notes

- `router.invalidate()` invalidates committed/cached/in-flight loader generations and retires matching active preload lanes; by default stale successful data revalidates in the background (existing data stays visible).
- Prefer a mutation library that supports keying (e.g. `key: ['sendMessage', roomId]`) so submission state resets automatically when the key changes; otherwise use `router.subscribe('onResolved', ...)` to manually clear mutation state on route change.
- `onResolved` fires only when the location path actually changes (not on a plain reload) and has resolved.

## Related

- [Data Loading](./data-loading.md)
- [External Data Loading](./external-data-loading.md)
