# Waiting for Async Conditions

Choose between `expect.poll`, `vi.waitFor`, and `vi.waitUntil` to retry on a fixed interval until a condition holds or a timeout elapses.

## Signature / Usage

```ts
import { expect, test } from 'vitest'
import { createServer } from './server.ts'

test('server starts', async () => {
  const server = createServer()

  await expect.poll(() => server.isReady, {
    timeout: 500,
    interval: 20
  }).toBe(true)
})
```

`vi.waitFor` retries until the callback stops throwing and resolves with its return value:

```ts
import { expect, test, vi } from 'vitest'
import { connect, DB_URL } from './db.ts'

test('database is reachable', async () => {
  // `connect` throws ECONNREFUSED until the database accepts connections
  const client = await vi.waitFor(() => connect(DB_URL), {
    timeout: 5000,
    interval: 100,
  })

  const rows = await client.query('SELECT 1 AS ok')
  expect(rows[0].ok).toBe(1)
})
```

`vi.waitUntil` polls until truthy and fails fast on a thrown error:

```ts
import { expect, test, vi } from 'vitest'
import { jobResults, startJob } from './worker.ts'

test('worker completes the job', async () => {
  startJob('build-42')

  const result = await vi.waitUntil(
    () => jobResults.get('build-42'),
    { timeout: 5000, interval: 100 },
  )

  expect(result.status).toBe('ok')
  expect(result.steps).toHaveLength(4)
})
```

## Options / Props

|                         | `expect.poll`            | `vi.waitFor`                         | `vi.waitUntil`                          |
| ----------------------- | ------------------------ | ------------------------------------ | --------------------------------------- |
| Reach for it when       | the wait is an assertion | the work might fail until it's ready | a lookup might be falsy and that's fine |
| Retries on thrown error | yes                      | yes                                  | no, fails fast                          |
| Resolves with           | the assertion            | callback's return value              | callback's return value                 |

Each accepts `{ timeout, interval }`, defaulting to a 1000 ms timeout and 50 ms interval. `vi.waitFor` and `vi.waitUntil` also accept a number as shorthand for the timeout.

## Notes

- `expect.poll` makes every assertion asynchronous, so it must be awaited. It does not pair with snapshot matchers, `.resolves` / `.rejects`, or `toThrow`; use `vi.waitFor` for those.
- `waitUntil` narrows the resolved type (e.g. `JobResult | undefined` becomes `JobResult`).
- In browser mode, prefer `page.locator` and `expect.element` over `waitUntil` for DOM queries; locators retry on their own.
- If `vi.useFakeTimers` is active, `vi.waitFor` automatically calls `vi.advanceTimersByTime(interval)` between attempts.

## Related

- [Async patterns](../patterns/async.md)
- [expect](../api/expect.md)
- [vi](../api/vi.md)
