# Testing

Unit-test components that use `useQueryState` with `withNuqsTestingAdapter`.

```tsx
// counter.test.tsx (Vitest + React Testing Library)
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { CounterButton } from './counter'

it('increments the counter and updates the URL', async () => {
  const onUrlUpdate = vi.fn()

  render(<CounterButton />, {
    wrapper: withNuqsTestingAdapter({
      searchParams: '?count=42',
      onUrlUpdate,
    }),
  })

  await userEvent.click(screen.getByRole('button'))

  expect(onUrlUpdate).toHaveBeenCalledOnce()
  const { searchParams } = onUrlUpdate.mock.calls[0][0]
  expect(searchParams.get('count')).toBe('43')
})
```

```tsx
// Hook testing with renderHook
import { renderHook, act } from '@testing-library/react'
import { withNuqsTestingAdapter } from 'nuqs/adapters/testing'
import { useMyHook } from './use-my-hook'

it('initializes from searchParams', () => {
  const { result } = renderHook(() => useMyHook(), {
    wrapper: withNuqsTestingAdapter({ searchParams: { count: '42' } }),
  })

  expect(result.current.count).toBe(42)
})
```

## Notes

- `withNuqsTestingAdapter` accepts `searchParams` as a query string, `URLSearchParams`, or a plain record object
- `onUrlUpdate` receives `{ searchParams: URLSearchParams, queryString: string, options }` on every URL change (`options` are the options used for the update, e.g. `event.options.history`)
- Internal/advanced adapter options: `rateLimitFactor` (rate limiting is disabled when testing by default; `1` enables it with the production factor) and `resetUrlUpdateQueueOnMount` (default `true`, clears the shared URL update queue once when the adapter mounts to isolate tests; set `false` only when a test intentionally preserves updates queued before mounting; per-mount reset fixed in v2.10.1, #1518)
- By default, the adapter is stateless (each update does not persist) — set `hasMemory: true` to simulate real navigation state
- nuqs v2 is ESM-only; Jest requires `extensionsToTreatAsEsm` and `--experimental-vm-modules` flags
