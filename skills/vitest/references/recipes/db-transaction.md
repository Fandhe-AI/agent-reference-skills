# Database Transaction per Test

Wrap each test in a transaction that is rolled back when it finishes, so integration tests start from a clean state without per-test cleanup. Uses `aroundEach` (since 4.1.0) and a scoped fixture (since 3.2.0).

## Signature / Usage

```ts
import { test as baseTest } from 'vitest'
import { createTestDatabase } from './db.ts'

export const test = baseTest
  .extend('db', { scope: 'file' }, async ({}, { onCleanup }) => {
    const db = await createTestDatabase()
    onCleanup(() => db.close())
    return db
  })

test.aroundEach(async (runTest, { db }) => {
  await db.transaction(runTest)
})

test('insert user', async ({ db }) => {
  await db.insert({ name: 'Alice' })
  // rolled back automatically when the test ends
})
```

## One connection per worker

Use `scope: 'worker'` and turn off isolation so multiple files share one connection per worker process:

```ts
// vitest.config.ts
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    isolate: false,
  },
})
```

```ts
import { test as baseTest } from 'vitest'
import { createTestDatabase } from './db.ts'

export const test = baseTest
  .extend('db', { scope: 'worker' }, async ({}, { onCleanup }) => {
    const db = await createTestDatabase()
    onCleanup(() => db.close())
    return db
  })

test.aroundEach(async (runTest, { db }) => {
  await db.transaction(runTest)
})
```

## Notes

- The `db` fixture is created once per file (`scope: 'file'`); `onCleanup` closes the connection when the file is done. `aroundEach` wraps every test in `db.transaction(runTest)`; writes are rolled back when `runTest` resolves.
- Requires a database driver that supports nested transactions or savepoints.
- The same `aroundEach` hook can also wrap an `AsyncLocalStorage` context to propagate tenant or trace IDs alongside the transaction.
- By default every test file runs in its own worker, so `scope: 'file'` and `scope: 'worker'` behave identically. With `isolate: false`, workers are reused across files (capped by `maxWorkers`), so a worker-scoped fixture is created once per worker (e.g. 8 connections instead of 200 for 200 files on 8 workers).
- With isolation off, files share module instances inside the worker; top-level mutable state can leak to the next file. Per-test rollback protects database data only, not module state.
- `vmThreads` and `vmForks` always run isolated regardless of `isolate`, so worker-scoped fixtures fall back to per-file behavior in those pools.

## Related

- [Per-File Isolation Settings](./disable-isolation.md)
- [Hooks](../api/hooks.md)
