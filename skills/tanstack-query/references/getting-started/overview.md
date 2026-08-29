---
source: https://tanstack.com/query/latest/docs/framework/react/overview
---

# Overview

TanStack Query (formerly React Query) is the missing data-fetching library for web applications — it handles fetching, caching, synchronizing, and updating **server state**.

## Signature / Usage

```tsx
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from '@tanstack/react-query'

const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  )
}

function Example() {
  const { isPending, error, data } = useQuery({
    queryKey: ['repoData'],
    queryFn: () =>
      fetch('https://api.github.com/repos/TanStack/query').then((res) =>
        res.json(),
      ),
  })

  if (isPending) return 'Loading...'
  if (error) return 'An error has occurred: ' + error.message

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.description}</p>
    </div>
  )
}
```

## Notes

- Server state differs from client state: it is persisted remotely, requires async APIs, can be changed by others, and can become out of date
- TanStack Query solves caching, request deduping, background updates, staleness detection, pagination/lazy loading, memory management, and structural-sharing memoization out of the box

## Related

- [Installation](./installation.md)
- [Quick Start](./quick-start.md)
