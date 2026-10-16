# Test API

## describe

Defines a test suite. Can be nested.

```ts
describe(name: string, fn: () => void, timeout?: number): void
```

```ts
describe('math utils', () => {
  it('adds numbers', () => {
    expect(1 + 1).toBe(2)
  })

  describe('edge cases', () => {
    it('handles zero', () => {
      expect(0 + 0).toBe(0)
    })
  })
})
```

### describe modifiers

| Modifier | Description |
|----------|-------------|
| `describe.only` | Run only this suite |
| `describe.skip` | Skip |
| `describe.todo` | Mark as not yet implemented |
| `describe.concurrent` | Run inner tests concurrently |
| `describe.sequential` | Force sequential execution inside a concurrent context (removed in v5; use `concurrent: false`, see Notes) |
| `describe.shuffle` | Run in random order |
| `describe.each(table)` | Repeat the suite in table-driven fashion |

```ts
describe.each([
  { input: 1, expected: 2 },
  { input: 2, expected: 4 },
])('double($input)', ({ input, expected }) => {
  it(`returns ${expected}`, () => {
    expect(input * 2).toBe(expected)
  })
})
```

## test / it

Defines an individual test case. `it` is an alias for `test`.

```ts
test(name: string, fn?: () => void | Promise<void>, timeout?: number): void
```

```ts
test('returns correct value', () => {
  expect(sum(1, 2)).toBe(3)
})

test('async test', async () => {
  const data = await fetchData()
  expect(data).toBeDefined()
})
```

### test modifiers

| Modifier | Description |
|----------|-------------|
| `test.only` | Run only this test (errors if used in CI) |
| `test.skip` | Skip |
| `test.todo` | Mark as not yet implemented (no body required) |
| `test.fails` | Expect the test to fail |
| `test.concurrent` | Run concurrently |
| `test.sequential` | Run sequentially inside a concurrent suite (removed in v5; use `concurrent: false`, see Notes) |
| `test.skipIf(condition)` | Skip if the condition is truthy |
| `test.runIf(condition)` | Run only if the condition is truthy |

### test.override (v4.1.0+)

Overrides a fixture defined with `test.extend`, scoped to the suite.

```ts
const myTest = test.extend<{ port: number }>({
  port: 3000,
})

myTest.override({ port: 8080 })('uses port 8080', ({ port }) => {
  expect(port).toBe(8080)
})
```

### test.each (table-driven tests)

Accepts an array or a template literal.

```ts
test.each([
  [1, 1, 2],
  [2, 3, 5],
  [0, 0, 0],
])('add(%i, %i) = %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})
```

Format specifiers: `%s` (string), `%d` (number), `%i` (integer), `%f` (float), `%j` (JSON), `%#` (index), `%$` (test number)

### test.for

An alternative to `test.each`. Does not spread array arguments and gives access to the TestContext.

```ts
test.for([
  { a: 1, b: 1, expected: 2 },
  { a: 2, b: 3, expected: 5 },
])('add($a, $b) = $expected', ({ a, b, expected }, { expect }) => {
  expect(a + b).toBe(expected)
})
```

### test.extend (fixtures)

Adds custom fixtures to the test context.

```ts
const myTest = test.extend<{ db: Database }>({
  db: async ({}, use) => {
    const db = await createTestDb()
    await use(db)
    await db.cleanup()
  },
})

myTest('uses fixture', ({ db }) => {
  expect(db).toBeDefined()
})
```

## Lifecycle Hooks

```ts
beforeAll(fn: () => void | Promise<void>, timeout?: number): void
afterAll(fn: () => void | Promise<void>, timeout?: number): void
beforeEach(fn: () => void | Promise<void>, timeout?: number): void
afterEach(fn: () => void | Promise<void>, timeout?: number): void
```

```ts
describe('database tests', () => {
  beforeAll(async () => {
    await db.connect()
  })

  afterAll(async () => {
    await db.disconnect()
  })

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('queries data', async () => {
    const result = await db.query('SELECT 1')
    expect(result).toBeDefined()
  })
})
```

### Hook execution order

- `beforeEach`: outer → inner
- `afterEach`: inner → outer
- Top-level hooks (outside `describe`) apply to all tests in the file

## aroundEach / aroundAll (v4.1.0+)

Hooks that wrap each test or the entire suite in the current suite. Call `runTest` / `runSuite` to actually run the wrapped test (including `beforeEach`/`afterEach` and fixtures). See [Hooks](./hooks.md) for the full reference.

```ts
aroundEach(
  body: (runTest: () => Promise<void>, context: TestContext) => Promise<void>,
  timeout?: number,
): void

aroundAll(
  body: (runSuite: () => Promise<void>, context: ModuleContext) => Promise<void>,
  timeout?: number,
): void
```

```ts
import { aroundEach, test } from 'vitest'

aroundEach(async (runTest) => {
  await db.transaction(runTest)
})

test('insert user', async () => {
  await db.insert({ name: 'Alice' })
  // transaction is automatically rolled back after the test
})
```

Also available as `myTest.aroundEach` / `myTest.aroundAll`, a scoped version that inherits the types from `test.extend`.

## context.skip() (dynamic skip)

Skips the test conditionally during execution.

```ts
test('dynamic skip', ({ skip }) => {
  if (someCondition) skip()
  // nothing below this runs
})
```

## context.annotate() (test annotations)

Adds an annotation during test execution (v4.0+).

```ts
test('annotated', async ({ annotate }) => {
  await annotate('notice message')
  await annotate('error detail', 'error')
})
```

Type: `'notice' | 'warning' | 'error'` (defaults to `'notice'`)

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout` | `number` | `5000` | Timeout (ms) |
| `retry` | `number \| { count?: number, delay?: number, condition?: RegExp \| ((error: TestError) => boolean) }` | `0` (configured by `retry` config) | Retry configuration. A number is the retry count; the object form (count / delay in ms / condition) is available since Vitest 4.1. A function `condition` can only be used in test files, not in `vitest.config.ts` (config is serialized for workers) |
| `repeats` | `number` | `0` | Number of times to repeat the test |
| `concurrent` | `boolean` | `false` | Run concurrently |
| `sequential` | `boolean` | `true` | Run sequentially (removed in v5; see Notes) |
| `tags` | `string[]` | `[]` | Custom user tags (4.1.0). If a tag is not defined in the config, the test fails before it starts unless `strictTags` is disabled |
| `meta` | `TaskMeta` | — | Custom metadata available in reporters (4.1.0). Top-level properties inherited from suites or tags are merged; nested objects are not deep-merged |

## Notes

- Vitest 5 (removed): `test.sequential`, `describe.sequential`, and the `sequential` option were removed. Use `concurrent: false` instead, either as an option object or in the options argument of `test` / `describe`, e.g. `test('runs sequentially', { concurrent: false }, async () => { ... })`. The v4 rows above are kept for projects still on v4. Source: Migrating to Vitest 5.0 (vitest.dev/guide/migration), docs at tag `v5.0.5`.
- Vitest 5: `test.each` / `test.for` titles and inspected values are formatted with `pretty-format` instead of `loupe`; string `$` placeholders are no longer quoted, and truncation length is set by `taskTitleValueFormatTruncate` (default `40`).
- `test.describe` (4.1.0): scoped `describe`. `test.suite` (4.1.0): alias for `suite`. See the describe API.
- `test.scoped` (3.1.0, alias `it.scoped`) is Deprecated in favor of `test.override` (above) and will be removed in a future major version.
- Updated in Vitest 5 (`bench`): the benchmarking API has been rewritten. `bench` is no longer a top-level import from `vitest`, and `bench.skip` / `bench.only` / `bench.todo` were removed; `bench` is now a test-context fixture accessed from inside a `test()` (`test('x', async ({ bench }) => { ... })`). See the Benchmarking guide.
- Vitest 5: `clearMocks` defaults to `true`, so `vi.clearAllMocks()` runs before each test automatically (see [Config](../guide/config.md)).

## Related

- [Expect Matchers](./expect.md)
- [Vi Utilities](./vi.md)
- [Hooks](./hooks.md)
