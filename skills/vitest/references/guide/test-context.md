# Test Context

The first argument of every test callback is a test context, inspired by Playwright Fixtures. It carries built-in utilities and custom fixtures defined with `test.extend`.

## Signature / Usage

```ts
import { it } from 'vitest'

it('should work', ({ task }) => {
  // prints name of the test
  console.log(task.name)
})
```

## Options / Props

Built-in context:

| Name | Type | Description |
|------|------|-------------|
| `task` | object | Readonly metadata about the test |
| `expect` | `expect` | `expect` bound to the current test; required for concurrent snapshot tests |
| `skip` | `skip(note?: string): never` / `skip(condition: boolean, note?: string): void` | Skips the test (boolean form since 3.1) |
| `annotate` | `annotate(message, attachment?)` / `annotate(message, type?, attachment?)` => `Promise<TestAnnotation>` | Adds a test annotation (3.2.0) |
| `signal` | `AbortSignal` | Aborted on timeout, Ctrl+C, `vitest.cancelCurrentRun`, or a parallel failure with `bail` (3.2.0) |
| `bench` | fixture | Defines and runs benchmarks inside tests (5.0.0) |
| `onTestFailed` | hook | `onTestFailed` bound to the current test |
| `onTestFinished` | hook | `onTestFinished` bound to the current test |

Fixture options (second argument of `.extend()`):

| Name | Type | Description |
|------|------|-------------|
| `auto` | boolean | Runs for every test even if unused |
| `scope` | `'test'` / `'file'` / `'worker'` | Lifetime; default `test` (3.2.0) |
| `injected` | boolean | Value can be overridden per project via `provide` |

## Notes

Builder pattern (4.1.0, recommended; types are inferred):

```ts
import { test as baseTest } from 'vitest'

export const test = baseTest
  .extend('config', { port: 3000, host: 'localhost' })
  .extend('server', async ({ config }) => {
    return `http://${config.host}:${config.port}`
  })
  .extend('tempFile', async ({}, { onCleanup }) => {
    const filePath = `/tmp/test-${Date.now()}.txt`
    await fs.writeFile(filePath, 'test data')
    onCleanup(async () => {
      await fs.unlink(filePath)
    })
    return filePath
  })
```

- `onCleanup` can be called only once per fixture; split into several fixtures for multiple cleanups.
- Object syntax (Playwright-compatible) uses `use()`; cleanup goes after `await use(value)`. Types must be given as a generic: `baseTest.extend<{ page: Page }>({ ... })`. Options use a tuple: `[fn, { auto: true }]`.
- Builder and object syntaxes can be mixed; an extended test can be extended again.
- Fixtures are initialized lazily, only when used by a test. Always destructure the context (`({ database }) => ...`), never use `(context) => context.database`.
- Fixture scope hierarchy: `worker` fixtures access only worker fixtures; `file` accesses worker + file; `test` accesses worker + file + test fixtures + built-in context. Only test-scoped fixtures see `task`, `expect`, `skip`; in file-scoped fixtures use `expect.getState().testPath`.
- By default every file runs in its own worker, so `file` and `worker` scopes behave the same; with isolation disabled, worker fixtures are shared across files in the same worker. In `vmThreads` / `vmForks`, `worker` scope behaves like `file`.
- Object syntax can declare scopes in types with `$worker`, `$file`, `$test` keys (3.2.0).
- Injected fixture: `.extend('url', { injected: true }, '/default')`; override per project with `test.provide` in the project config.
- `test.override(name, value | fn)` (4.1.0) overrides fixture values for a suite and its children; chainable, accepts an object, supports `onCleanup`, inherits options, cannot change `scope` / `auto`, cannot add new fixtures, cannot override non-test-scope fixtures inside `describe`. `test.scoped` is deprecated in favor of `test.override`.
- Extended `test` provides type-aware `test.beforeEach` / `test.afterEach`, and (4.1.0) `test.beforeAll` / `test.afterAll` / `test.aroundAll` that can access only file- and worker-scoped fixtures (including `auto`). Global `beforeAll` etc. do not see custom fixtures.
- Source: https://vitest.dev/guide/test-context (Vitest v5.0.5)

## Related

- [Test API](../api/test-api.md)
- [Hooks](../api/hooks.md)
- [Test Annotations](./test-annotations.md)
- [Benchmarking](./benchmarking.md)
- [Test Run Lifecycle](./lifecycle.md)
