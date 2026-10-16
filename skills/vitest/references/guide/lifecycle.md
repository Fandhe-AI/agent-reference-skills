# Test Run Lifecycle

Order and scope of the phases of a Vitest run, from initialization to global teardown, and the order of hooks within a test file.

## Signature / Usage

```ts
// globalSetup.ts  (main process, once per run)
export function setup(project) {
  console.log('Global setup')
  project.provide('apiUrl', 'http://localhost:3000')
}

export function teardown() {
  console.log('Global teardown')
}
```

## Options / Props

Phases:

| # | Phase | Scope | Notes |
|---|-------|-------|-------|
| 1 | Initialization | Main process | Parses CLI args, loads config, validates project structure; may rerun when config or its imports change |
| 2 | Global Setup | Main process | `globalSetup` runs once, in definition order, only if at least one test is queued; separate global scope from tests (use `provide`/`inject`) |
| 3 | Worker Creation | Worker processes/threads | Per `pool` / `browser.enabled`; workers reused only if isolation is disabled or pool is `vmThreads` / `vmForks` |
| 4 | Test File Setup | Worker | `setupFiles` run before each test file, in parallel by default (`sequence.setupFiles`); with isolation disabled they still rerun but imports stay cached |
| 5 | Collection and Execution | Worker | See hook order below |
| 6 | Reporting | Main process | Reporters receive events; coverage generated if enabled |
| 7 | Global Teardown | Main process | `teardown()` in reverse order of setup; in watch mode only on exit |

Phases 4-6 run once per test file, possibly in parallel across files.

## Notes

Order within a test file:

1. File-level code runs immediately; `describe` blocks are processed and tests registered.
2. `aroundAll` hooks wrap the suite (must call `runSuite()`).
3. `beforeAll` hooks run once.
4. For each test: `aroundEach` (must call `runTest()`) wraps; `beforeEach` runs; the test; `afterEach` (reverse order with `sequence.hooks: 'stack'`, the default); cleanup functions returned from `beforeEach`; `onTestFinished` callbacks (always reverse); `onTestFailed` if the test failed. With `repeats` / `retry` all of these run again.
5. `afterAll` hooks, then cleanup functions returned from `beforeAll`.

Nested suites: parent `aroundAll` / `aroundEach` wrap child ones; `beforeEach` runs outer then inner, `afterEach` inner then outer.

```ts
describe('User API', () => {
  aroundAll(async (runSuite) => {
    console.log('aroundAll before')
    await runSuite()
    console.log('aroundAll after')
  })
  beforeAll(() => {
    return function beforeAllCleanup() {
      // runs once afterAll hooks have run
    }
  })
  aroundEach(async (runTest) => {
    await runTest()
  })
  beforeEach(() => {
    return function beforeEachCleanup() {
      // runs after afterEach hooks
    }
  })
})
```

- Test files run sequentially within a worker and in parallel across workers (`maxWorkers`); order can change with `sequence.shuffle` / `sequence.sequencer`; long-running files start earlier based on cache unless shuffled.
- Concurrent tests (`test.concurrent` or `sequence.concurrent`) each still run their own `beforeEach` / `afterEach`; use `({ expect })` from the test context for concurrent snapshots.
- Config file, global setup, and global teardown have no access to test context; setup files, file-level code, and hooks run in the worker and do.
- Watch mode: on change only affected files rerun and setup files rerun; global setup does not rerun (use `project.onTestsRerun`); teardown runs on exit.
- Performance: use global setup for expensive one-time work, `beforeAll` over `beforeEach` where isolation is not needed, and avoid heavy setup files with many test files.
- Source: https://vitest.dev/guide/lifecycle (Vitest v5.0.5)

## Related

- [Hooks](../api/hooks.md)
- [Config](./config.md)
- [Parallelism](./parallelism.md)
- [Test Context](./test-context.md)
- [Improving Performance](./improving-performance.md)
