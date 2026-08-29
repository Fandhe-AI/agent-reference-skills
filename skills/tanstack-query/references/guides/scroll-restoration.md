---
source: https://tanstack.com/query/latest/docs/framework/react/guides/scroll-restoration
---

# Scroll Restoration

TanStack Query does not implement scroll restoration itself, but removes the biggest cause of broken restoration in SPAs: refetch-induced UI resets.

## Signature / Usage

```tsx
// Cached data renders synchronously on remount, keeping layout (and scroll) stable
const { data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos })
```

## Notes

- Because query results are cached and synchronously available when re-rendered, navigating back to a previously visited page renders instantly with stable layout — as long as data is still within `gcTime` (default 5 minutes) and not garbage collected.
- Combine with `placeholderData` for even more stable layouts during pagination.
- Actual scroll position restoration should be handled by the router (React Router's `ScrollRestoration`, TanStack Router's scroll restoration, or a custom history-based solution).

## Related

- [caching.md](./caching.md)
- [important-defaults.md](./important-defaults.md)
