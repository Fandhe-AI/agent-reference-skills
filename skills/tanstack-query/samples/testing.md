---
source: https://tanstack.com/query/latest/docs/framework/react/guides/testing
---

# Testing a Query Hook

Wrap `renderHook` with a fresh `QueryClientProvider` per test, and disable retries to avoid slow failing tests.

```tsx
import { renderHook, waitFor } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

function useCustomHook() {
  return useQuery({ queryKey: ['customHook'], queryFn: () => fetchCustomData() })
}

function createWrapper() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  })
  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  )
}

test('useCustomHook resolves', async () => {
  const { result } = renderHook(() => useCustomHook(), { wrapper: createWrapper() })

  await waitFor(() => expect(result.current.isSuccess).toBe(true))

  expect(result.current.data).toEqual('Hello')
})
```

## Notes

- Create a new `QueryClient` per test (not module-scoped) so cached results from one test don't leak into another.
- Set `retry: false` in the test client's `defaultOptions.queries`; otherwise asserting failure states waits through the default retry/backoff schedule.
- `renderHook`/`waitFor` come from `@testing-library/react` (install `@testing-library/react @testing-library/dom`); the older `@testing-library/react-hooks` is not used in the current official guide.
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/framework/react/guides/testing.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)
- Set `gcTime: Infinity` in Jest environments to silence the "Jest did not exit one second after the test run completed" warning from pending timers.
