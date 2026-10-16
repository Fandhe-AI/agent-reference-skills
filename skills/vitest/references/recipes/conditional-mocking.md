# Conditional Mocking with vi.when

`vi.when` (since 5.0.0) declares argument-specific mock behaviors via `.calledWith(...)` plus a `then*` action, replacing hand-written `mockImplementation` switch logic.

## Signature / Usage

```ts
import { test, vi } from 'vitest'
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

## Options / Props

Actions:

| Action               | Equivalent to              | Equivalent code                 |
| -------------------- | -------------------------- | ------------------------------- |
| `thenReturn(value)`  | `mockReturnValue(value)`   | `return value`                  |
| `thenThrow(error)`   | `mockThrow(error)`         | `throw error`                   |
| `thenResolve(value)` | `mockResolvedValue(value)` | `return Promise.resolve(value)` |
| `thenReject(error)`  | `mockRejectedValue(error)` | `return Promise.reject(error)`  |

`then*Once` shorthands (`thenReturnOnce`, `thenResolveOnce`, `thenThrowOnce`, `thenRejectOnce`) are equivalent to `{ times: 1 }`.

## Stacking actions

Actions on one behavior are consumed last-in-first-out; `times` limits how many calls an action handles before falling through. Register indefinite actions first:

```ts
import { test, vi } from 'vitest'
import { readConfig } from './config.ts'

test('retries after an initial failure', async () => {
  const fetchInstance = vi.fn<() => Promise<unknown>>()

  vi.when(fetchInstance)
    .calledWith('/data/config.json')
    .thenResolve(new Response('{ debug: true }'))
    // ↳ indefinite fallback
    .thenReject(new Error('network error'), { times: 1 })
    // ↳ applied first and consumed after one call

  await expect(readConfig(fetchInstance)).resolves.toEqual({ debug: true })

  expect(fetchInstance).toHaveBeenCalledTimes(2)
})
```

## Asymmetric matchers

`calledWith` supports asymmetric matchers. Behaviors are matched first-in-first-out, so register specific matchers before broad ones:

```ts
test('sends email to each recipient', () => {
  vi.when(sendEmail)
    .calledWith(expect.stringContaining('@internal.example.com'))
    .thenReturn({ ok: true, message: 'sent via internal relay' })
    .calledWith(expect.stringContaining('@'))
    .thenReturn({ ok: true, message: 'sent via external relay' })
})
```

Behavior merging: if a new `calledWith` argument already matches an existing behavior, the action is merged into that behavior instead of creating a new one.

```ts
vi.when(getRole)
  .calledWith(expect.any(String))
  .thenReturn('user')
  .calledWith('admin@example.com')
  .thenReturnOnce('admin')
```

Here `'admin'` is not scoped to `'admin@example.com'`; it becomes the next action of the `expect.any(String)` behavior, so the first call with any string returns `'admin'` and later calls return `'user'`.

## Handling unmatched calls

By default an unmatched call falls back to the spy's original implementation, or returns `undefined` if there is none.

`onUnmatched: 'throw'`:

```ts
vi.when(db.findById, { onUnmatched: 'throw' })
  .calledWith(1)
  .thenResolve({ id: 1, name: 'Ella' })

await expect(db.findById(1)).resolves.toMatchObject({ name: 'Ella' })
await expect(db.findById(3)).rejects.toThrow(
  'vi.when: no behavior defined when called with [3]',
)
```

`onUnmatched: fn` (called with the spy's arguments; its return value is used as the result):

```ts
vi.when(
  db.findById,
  { onUnmatched: id => Promise.resolve({ id, name: `User ${id}` }) }
)
  .calledWith(1)
  .thenResolve({ id: 1, name: 'Ella' })
```

Catch-all asymmetric matcher registered last:

```ts
vi.when(db.findById)
  .calledWith(1)
  .thenResolve({ id: 1, name: 'Ella' })
  .calledWith(2)
  .thenResolve({ id: 2, name: 'Gracie' })
  .calledWith(expect.any(Number))
  .thenReject(new Error('user not found'))
```

## Asserting that all behaviors were called

```ts
test('loads both users', async () => {
  const db = { findById: vi.fn<FindById>() }

  const w = vi.when(db.findById)
    .calledWith(1)
    .thenResolveOnce({ id: 1, name: 'Ella' })
    .calledWith(2)
    .thenResolveOnce({ id: 2, name: 'Gracie' })

  await loadDashboard(db)

  expect(w).toHaveBeenExhausted()
})
```

## Automatic cleanup with using

```ts
const spy = vi.fn(() => 'original')

test('with mocked behavior', () => {
  using w = vi.when(spy).calledWith('hello').thenReturn('mocked')
  expect(spy('hello')).toBe('mocked')
}) // ← restored here

test('without mocked behavior', () => {
  expect(spy('hello')).toBe('original')
})
```

## Notes

- The `onUnmatched: 'throw'` error type and message are fixed and cannot be customized. If an `onUnmatched` function throws or returns a rejected promise, the error propagates to the caller.
- A `vi.when` chain with no behaviors, or a bare `.calledWith()` with no `then*` action, is never considered exhausted; `toHaveBeenExhausted` always fails for it.
- Indefinite actions (no `times`) satisfy the exhaustion check after being used at least once.
- `vi.isWhenChain` is referenced in the official See also list.

## Related

- [Explicit resources](./explicit-resources.md)
- [Mocking patterns](../patterns/mocking.md)
- [vi](../api/vi.md)
- [expect](../api/expect.md)
