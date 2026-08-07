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
| `describe.sequential` | Force sequential execution inside a concurrent context |
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
| `test.sequential` | Run sequentially inside a concurrent suite |
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
| `retry` | `number` | `0` | Number of retries on failure |
| `repeats` | `number` | `0` | Number of times to repeat the test |
| `concurrent` | `boolean` | `false` | Run concurrently |
| `sequential` | `boolean` | `true` | Run sequentially |
| `tags` | `string[]` | `[]` | Test tags |

## Related

- [Expect Matchers](./expect.md)
- [Vi Utilities](./vi.md)
- [Hooks](./hooks.md)
