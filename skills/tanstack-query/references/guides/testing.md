---
source: https://tanstack.com/query/latest/docs/framework/react/guides/testing
---

# Testing

Testing components/hooks that use TanStack Query with `@testing-library/react`.

## Signature / Usage

```tsx
export function useCustomHook() {
  return useQuery({ queryKey: ['customHook'], queryFn: () => 'Hello' })
}
```

```tsx
import { renderHook, waitFor } from '@testing-library/react'

const queryClient = new QueryClient()
const wrapper = ({ children }) => (
  <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
)

const { result } = renderHook(() => useCustomHook(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toEqual('Hello')
```

Disabling retries in tests:

```tsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // turns retries off
      retry: false,
    },
  },
})
```

Mocking network with `nock`:

```tsx
const expectation = nock('http://example.com').get('/api/data').reply(200, {
  answer: 42,
})

const { result } = renderHook(() => useFetchData(), { wrapper })

await waitFor(() => expect(result.current.isSuccess).toBe(true))

expect(result.current.data).toEqual({ answer: 42 })
```

## Notes

- Install with `npm install @testing-library/react @testing-library/dom --save-dev`; `@testing-library/react` provides `renderHook` and re-exports `@testing-library/dom` helpers such as `waitFor`.
- Set `retry: false` in the test `QueryClient` defaults to avoid slow/timing-out tests when asserting failure states (default retry is 3 with backoff).
- Set `gcTime: Infinity` in Jest to avoid the "Jest did not exit one second after the test run completed" warning.
- For infinite queries, `nock`'s `.persist()` + `.query(true)` can differentiate responses per page based on the request's query string; each page is one element of `data.pages`.
- Source: https://raw.githubusercontent.com/TanStack/query/release-2026-11-06-2304/docs/framework/react/guides/testing.md (tag `release-2026-11-06-2304`, fetched 2026-11-14)

## Related

- [query-retries.md](./query-retries.md)
