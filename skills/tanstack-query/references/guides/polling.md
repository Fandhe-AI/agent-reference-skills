---
source: https://tanstack.com/query/latest/docs/framework/react/guides/polling
---

# Polling

`refetchInterval` enables automatic query refetching on a timer, independent of `staleTime`.

## Signature / Usage

```tsx
useQuery({
  queryKey: ['prices'],
  queryFn: fetchPrices,
  refetchInterval: 5_000, // ms
})
```

Function form (stop by returning `false`):

```tsx
useQuery({
  queryKey: ['job', jobId],
  queryFn: () => fetchJobStatus(jobId),
  refetchInterval: (query) =>
    query.state.data?.status === 'complete' ? false : 2_000,
})
```

Continue polling while tab is unfocused:

```tsx
useQuery({
  queryKey: ['portfolio'],
  queryFn: fetchPortfolio,
  refetchInterval: 30_000,
  refetchIntervalInBackground: true,
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `refetchInterval` | `number \| false \| (query) => number \| false` | Poll interval in ms, or a function computing it |
| `refetchIntervalInBackground` | `boolean` | Keep polling when the tab is not focused |

## Notes

- Polling stops by default when the browser tab loses focus; set `refetchIntervalInBackground: true` to keep it active.
- Each `QueryObserver` runs its own timer; concurrent fetches for the same key are still deduplicated to one network request.
- In environments without reliable `online`/`offline` events (Electron, some WebViews), set `networkMode: 'always'` to skip connectivity checks.

## Related

- [important-defaults.md](./important-defaults.md)
- [network-mode.md](./network-mode.md)
