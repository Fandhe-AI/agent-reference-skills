# Parallelism

Two levels: test files run in parallel across workers by default; tests within a file run sequentially unless marked `concurrent`.

## Signature / Usage

```ts
import { expect, test } from 'vitest'

test.concurrent('fetches user profile', async () => {
  const user = await fetchUser(1)
  expect(user.name).toBe('Alice')
})

test.concurrent('fetches user posts', async () => {
  const posts = await fetchPosts(1)
  expect(posts).toHaveLength(3)
})
```

## Options / Props

| Option | Effect |
|--------|--------|
| `pool` | `forks` (default) and `vmForks` use child processes; `threads` and `vmThreads` use worker threads |
| `maxWorkers` | Number of workers running files simultaneously |
| `fileParallelism` | `false` runs files one at a time |
| `maxConcurrency` | Upper bound of concurrently running tests (also bounds hooks with `sequence.hooks: 'parallel'`) |
| `sequence.concurrent` | `true` runs all tests concurrently by default |
| `sequence.hooks` | Hook execution order |

## Notes

- Concurrent tests are grouped and run with `Promise.all` in the same worker as their file; no extra workers are created, so `concurrent` only helps when tests wait (network, timers, I/O). Purely synchronous tests still run one after another.
- Apply to a suite with `describe.concurrent`; opt out of inherited concurrency with `{ concurrent: false }` on a test or describe.
- With concurrent tests `beforeAll` / `afterAll` run once for the group, while `beforeEach` / `afterEach` run per test, possibly at the same time.
- Disable file parallelism when tests share an external resource such as a database that cannot handle concurrent access.

## Related

- [Improving Performance](./improving-performance.md)
- [Test Run Lifecycle](./lifecycle.md)
- [Test API](../api/test-api.md)
