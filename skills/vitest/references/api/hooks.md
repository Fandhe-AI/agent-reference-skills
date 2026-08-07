# Hooks

Lifecycle hooks for setup and teardown, including the wrapping hooks `aroundEach` / `aroundAll` and the test-execution hooks `onTestFinished` / `onTestFailed`.

## Signature / Usage

```ts
function beforeEach(body: (context: TestContext) => unknown, timeout?: number): void
function afterEach(body: (context: TestContext) => unknown, timeout?: number): void
function beforeAll(body: (context: ModuleContext) => unknown, timeout?: number): void
function afterAll(body: (context: ModuleContext) => unknown, timeout?: number): void
```

```ts
import { beforeEach } from 'vitest'

beforeEach(async () => {
  await stopMocking()
  await addUser({ name: 'John' })
})

// return a cleanup function instead of using afterEach
beforeEach(async () => {
  await prepareSomething()
  return async () => {
    await resetSomething()
  }
})
```

## aroundEach

Wraps individual tests in contextual code (database transactions, `AsyncLocalStorage` contexts, tracing spans). Receives a `runTest` function that must be called to run the wrapped test. Multiple `aroundEach` hooks nest around each other; the first registered is outermost.

```ts
function aroundEach(
  body: (runTest: () => Promise<void>, context: TestContext) => Promise<void>,
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
})
```

Also available as `test.aroundEach` for access to fixtures:

```ts
test.aroundEach(async (runTest, { db }) => {
  await db.transaction(runTest)
})

test('insert user', async ({ db, user }) => {
  await db.insert(user)
})
```

## aroundAll

Wraps the entire suite execution. Receives a `runSuite` function that must be called; suite-level tracing/transaction management is a typical use case.

```ts
function aroundAll(
  body: (runSuite: () => Promise<void>, context: ModuleContext) => Promise<void>,
  timeout?: number,
): void
```

```ts
import { aroundAll, test } from 'vitest'

aroundAll(async (runSuite) => {
  await tracer.trace('test-suite', runSuite)
})

test('test 1', () => {
  // Runs within tracing span
})
```

Nested suites can register their own `aroundAll`, which nests inside the outer one:

```ts
const context = new AsyncLocalStorage<{ suiteId: string }>()

aroundAll(async (runSuite) => {
  await context.run({ suiteId: 'root' }, runSuite)
})

describe('nested', () => {
  aroundAll(async (runSuite) => {
    await context.run({ suiteId: 'nested' }, runSuite)
  })
})
```

## onTestFinished

Registered inside a test body; always runs after the test completes (even on assertion failure), after `afterEach` hooks. Required for cleanup in concurrent tests since Vitest doesn't track concurrent tests in global hooks.

```ts
import { onTestFinished, test } from 'vitest'

test('performs a query', () => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```

```ts
// concurrent tests: use the TestContext version
test.concurrent('performs a query', ({ onTestFinished }) => {
  const db = connectDb()
  onTestFinished(() => db.close())
  db.query('SELECT * FROM users')
})
```

Can be called from a reusable helper function, not just directly in the test body:

```ts
function getTestDb() {
  const db = connectMockedDb()
  onTestFinished(() => db.close())
  return db
}
```

## onTestFailed

Registered inside a test body; runs only when the test fails, after `afterEach` hooks. Useful for debugging and error logging.

```ts
import { onTestFailed, test } from 'vitest'

test('performs a query', () => {
  const db = connectDb()
  onTestFailed(({ task }) => {
    console.log(task.result.errors)
  })
  db.query('SELECT * FROM users')
})
```

```ts
// concurrent tests: use the TestContext version
test.concurrent('performs a query', ({ onTestFailed }) => {
  const db = connectDb()
  onTestFailed(({ task }) => {
    console.log(task.result.errors)
  })
  db.query('SELECT * FROM users')
})
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `timeout` | `number` | `10000` | Max time (ms) allowed for the hook body |

## Notes

- Hooks execute in "stack order" by default, configurable via `sequence.hooks`
- `onTestFinished` / `onTestFailed` throw an error if called outside a test body
- `beforeEach` / `afterEach` / `beforeAll` / `afterAll` basics are also summarized in [Test API](./test-api.md) under "Lifecycle Hooks"; this page is the dedicated hooks reference (`aroundEach`, `aroundAll`, `onTestFinished`, `onTestFailed`)

## Related

- [Test API](./test-api.md)
- [Vi Utilities](./vi.md)
