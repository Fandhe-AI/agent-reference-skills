# Vi Utilities

The `vi` object provides operations for mocks, spies, timers, and stubs.

## Mock Functions

### vi.fn()

Creates a mock function with call tracking.

```ts
vi.fn<T extends Procedure>(implementation?: T): MockInstance<T>
```

```ts
const mockFn = vi.fn()
mockFn('hello')
expect(mockFn).toHaveBeenCalledWith('hello')

const greet = vi.fn((name: string) => `Hello, ${name}`)
expect(greet('Alice')).toBe('Hello, Alice')
```

#### Mock instance methods

| Method | Description |
|--------|-------------|
| `mockReturnValue(val)` | Returns `val` on every call |
| `mockReturnValueOnce(val)` | Returns `val` on the next call only |
| `mockResolvedValue(val)` | Returns `Promise.resolve(val)` |
| `mockResolvedValueOnce(val)` | Returns a resolved promise on the next call only |
| `mockRejectedValue(err)` | Returns `Promise.reject(err)` |
| `mockRejectedValueOnce(err)` | Returns a rejected promise on the next call only |
| `mockImplementation(fn)` | Replaces the implementation |
| `mockImplementationOnce(fn)` | Replaces the implementation for the next call only |
| `mockClear()` | Resets call history (keeps implementation) |
| `mockReset()` | Resets history + implementation (returns `undefined`) |
| `mockRestore()` | Restores the original implementation (only valid with `vi.spyOn`) |

```ts
const fn = vi.fn()
  .mockReturnValueOnce('first')
  .mockReturnValue('default')

fn() // 'first'
fn() // 'default'
```

#### Call information

```ts
fn.mock.calls       // [[arg1, arg2], [arg1], ...]
fn.mock.results      // [{ type: 'return', value: ... }, ...]
fn.mock.instances    // instances created via `new`
fn.mock.lastCall     // arguments of the last call
```

### vi.isMockFunction()

Type guard that checks whether a value is a mock function.

### vi.mockObject() (v3.2.0+)

Recursively mocks all methods on an object. The object equivalent of `vi.mock()`.

```ts
function mockObject<T>(value: T, options?: { spy?: boolean }): MaybeMockedDeep<T>
```

```ts
const original = {
  simple: () => 'value',
  nested: { method: () => 'real' },
}

// replace all methods with vi.fn()
const mocked = vi.mockObject(original)
expect(mocked.simple()).toBe(undefined)
mocked.simple.mockReturnValue('mocked')

// spy while keeping the original implementation
const spied = vi.mockObject(original, { spy: true })
expect(spied.simple()).toBe('value')
expect(spied.simple).toHaveBeenCalled()
```

## Module Mocking

### vi.mock()

Replaces an entire module with a mock. Hoisted to the top of the file.

```ts
vi.mock(modulePath: string, factory?: () => unknown): void
```

```ts
// automock (all exports become vi.fn())
vi.mock('./utils')

// factory mock
vi.mock('./api', () => ({
  fetchUser: vi.fn().mockResolvedValue({ id: 1, name: 'Alice' }),
}))

// partial mock
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    dangerousOp: vi.fn(),
  }
})
```

### vi.doMock()

A non-hoisted version of `vi.mock`. Applies to the next dynamic import.

### vi.unmock() / vi.doUnmock()

Removes a module from the mock registry and restores the original module.

### vi.importActual()

Imports the original module, bypassing mocks.

```ts
vi.mock('./config', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./config')>()
  return { ...actual, debug: true }
})
```

### vi.importMock()

Imports the automocked version of a module.

### vi.resetModules()

Clears the module cache so modules are re-evaluated on the next import.

## Object Spies

### vi.spyOn()

Sets up a spy on an existing object's method. Keeps the original implementation by default.

```ts
vi.spyOn<T, K extends keyof T>(object: T, method: K, accessType?: 'get' | 'set'): MockInstance
```

```ts
const spy = vi.spyOn(console, 'warn')
callFn()
expect(spy).toHaveBeenCalledWith(expect.stringContaining('deprecated'))
spy.mockRestore()

// getter/setter
vi.spyOn(obj, 'value', 'get').mockReturnValue(100)
```

## Mock Management

| Method | Description |
|--------|-------------|
| `vi.clearAllMocks()` | Calls `.mockClear()` on all spies |
| `vi.resetAllMocks()` | Calls `.mockReset()` on all spies |
| `vi.restoreAllMocks()` | Restores the original implementation on all spies |

## Environment and Global Stubs

### vi.stubEnv()

Temporarily changes an environment variable.

```ts
vi.stubEnv('NODE_ENV', 'production')
vi.stubEnv('API_URL', 'https://test.example.com')
vi.unstubAllEnvs() // restore all
```

### vi.stubGlobal()

Temporarily changes a global variable.

```ts
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ json: () => ({}) }))
vi.unstubAllGlobals() // restore all
```

## Fake Timers

### vi.useFakeTimers()

Replaces `setTimeout`, `setInterval`, `Date`, etc. with fakes.

```ts
vi.useFakeTimers(config?: FakeTimerInstallOpts): void
```

| Method | Description |
|--------|-------------|
| `vi.useFakeTimers()` | Enables fake timers |
| `vi.useRealTimers()` | Restores real timers |
| `vi.advanceTimersByTime(ms)` | Advances timers by the given number of milliseconds |
| `vi.advanceTimersByTimeAsync(ms)` | Async version |
| `vi.advanceTimersToNextTimer()` | Advances to the next timer |
| `vi.advanceTimersToNextTimerAsync()` | Async version |
| `vi.advanceTimersToNextFrame()` | Advances `requestAnimationFrame` callbacks |
| `vi.runAllTimers()` | Runs all timers (infinite-loop guard: 10,000 iteration limit) |
| `vi.runAllTimersAsync()` | Async version |
| `vi.runOnlyPendingTimers()` | Runs only timers currently in the queue |
| `vi.runOnlyPendingTimersAsync()` | Async version |
| `vi.setSystemTime(date)` | Fixes `Date.now()` / `new Date()` to a given value |
| `vi.getRealSystemTime()` | Gets the actual system time |
| `vi.getMockedSystemTime()` | Gets the mocked Date (`null` if not mocked) |
| `vi.getTimerCount()` | Number of timers in the queue |
| `vi.clearAllTimers()` | Removes all timers without running them |
| `vi.isFakeTimers()` | Whether fake timers are enabled |
| `vi.setTimerTickMode(mode)` | Sets the timer tick mode (v4.1.0+) |

### vi.setTimerTickMode() (v4.1.0+)

Sets the tick mode for fake timers.

| Mode | Description |
|------|-------------|
| `'manual'` | Manual control via `vi.advanceTimersByTime()` etc. (default) |
| `'nextTimerAsync'` | Automatically advances async timers to the next timer |
| `'interval'` | Automatically advances timers at a given interval |

```ts
vi.useFakeTimers()
vi.setTimerTickMode('nextTimerAsync')
```

```ts
beforeEach(() => { vi.useFakeTimers() })
afterEach(() => { vi.useRealTimers() })

it('fires after delay', () => {
  const fn = vi.fn()
  setTimeout(fn, 1000)
  vi.advanceTimersByTime(1000)
  expect(fn).toHaveBeenCalledOnce()
})

it('mocks current date', () => {
  vi.setSystemTime(new Date('2024-01-01'))
  expect(new Date().getFullYear()).toBe(2024)
})
```

## Utilities

### vi.hoisted()

A hoisting mechanism for referencing external variables inside a `vi.mock` factory.

```ts
const mockFetch = vi.hoisted(() => vi.fn())
vi.mock('./api', () => ({ fetchData: mockFetch }))
mockFetch.mockResolvedValue({ data: [] })
```

### vi.waitFor()

Retries a callback until it succeeds.

```ts
await vi.waitFor(() => {
  expect(element).toBeVisible()
}, { timeout: 5000, interval: 100 })
```

### vi.waitUntil()

Waits until a callback returns a truthy value.

```ts
const result = await vi.waitUntil(() => fetchStatus() === 'ready')
```

### vi.mocked()

A TypeScript helper for mock types.

```ts
vi.mocked(myFn) // inferred as MockInstance<typeof myFn>
vi.mocked(obj, { deep: true }) // deep mock type
```

### vi.dynamicImportSettled()

Waits for all dynamic imports to settle.

### vi.setConfig()

Overrides Vitest configuration for the current test file.

```ts
vi.setConfig({ testTimeout: 10000, fakeTimers: { now: new Date(2024, 0, 1) } })
```

### vi.resetConfig()

Reverts configuration changed by `vi.setConfig()`.

```ts
afterAll(() => {
  vi.resetConfig()
})
```

### vi.defineHelper() (v4.1.0+)

Defines a custom assertion helper. Formats error stack traces to point to the caller.

```ts
const assertPositive = vi.defineHelper((value: number) => {
  expect(value).toBeGreaterThan(0)
})

test('is positive', () => {
  assertPositive(42) // error stack points to this line
})
```

## Related

- [Test API](./test-api.md)
- [Expect Matchers](./expect.md)
- [Mocking patterns](../patterns/mocking.md)
- [Async testing patterns](../patterns/async.md)
