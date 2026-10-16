# Conditional Mocking with vi.when

Return different mock results depending on call arguments with `vi.when` (v5.0.0+).

```ts
import { expect, test, vi } from 'vitest'
import { getUserById } from './user.ts'

test('returns user data', async () => {
  const db = { findById: vi.fn<FindById>() }

  vi.when(db.findById)
    .calledWith(1)
    .thenResolve({ id: 1, name: 'Ella' })
    .calledWith(2)
    .thenResolve({ id: 2, name: 'Gracie' })

  await expect(getUserById(db, 1)).resolves.toEqual({ name: 'Ella' })
  await expect(getUserById(db, 2)).resolves.toEqual({ name: 'Gracie' })
})
```

```ts
// Throw on unmatched arguments
vi.when(db.findById, { onUnmatched: 'throw' })
  .calledWith(1)
  .thenResolve({ id: 1, name: 'Ella' })
```

## Notes

- Actions: `thenReturn`, `thenThrow`, `thenResolve`, `thenReject`; `then*Once` equals `{ times: 1 }`
- Behaviors match first-in-first-out (register specific matchers before broad ones); actions on one behavior are consumed last-in-first-out
- Unmatched calls fall back to the spy's original implementation (or `undefined`) unless `onUnmatched` is set
- `expect(w).toHaveBeenExhausted()` asserts every behavior was used; `using w = vi.when(...)` restores the spy at block exit
