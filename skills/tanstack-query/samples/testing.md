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
- React 18+ gets `renderHook`/`waitFor` directly from `@testing-library/react`; `@testing-library/react-hooks` is only needed for React 17 and earlier.
- Set `gcTime: Infinity` in Jest environments to silence the "Jest did not exit one second after the test run completed" warning from pending timers.
