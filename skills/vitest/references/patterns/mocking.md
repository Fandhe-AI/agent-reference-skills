# Mocking Patterns

## Basics: Creating a Mock Function with vi.fn()

```ts
const handler = vi.fn()
handler('event')
expect(handler).toHaveBeenCalledWith('event')
expect(handler).toHaveBeenCalledTimes(1)
```

## Setting Return Values

```ts
const fetchUser = vi.fn()
  .mockResolvedValueOnce({ id: 1, name: 'Alice' })
  .mockResolvedValueOnce({ id: 2, name: 'Bob' })
  .mockRejectedValue(new Error('not found'))

await fetchUser() // { id: 1, name: 'Alice' }
await fetchUser() // { id: 2, name: 'Bob' }
await fetchUser() // throws 'not found'
```

## Module Mocking: vi.mock()

### Automocking

```ts
vi.mock('./user-service')
// every export becomes vi.fn()
import { getUser } from './user-service'
```

### Factory Mock

```ts
vi.mock('./api', () => ({
  fetchData: vi.fn().mockResolvedValue([]),
  API_URL: 'https://test.example.com',
}))
```

### Partial Mock (importOriginal)

Mocks only some exports while keeping the rest of the original implementation.

```ts
vi.mock('./utils', async (importOriginal) => {
  const actual = await importOriginal<typeof import('./utils')>()
  return {
    ...actual,
    dangerousOp: vi.fn().mockReturnValue('safe'),
  }
})
```

### Combining with vi.hoisted()

`vi.mock` factories are hoisted, so they cannot reference outer variables directly.
Use `vi.hoisted()` to define variables at the hoisted level.

```ts
const mockFetch = vi.hoisted(() => vi.fn())

vi.mock('./api', () => ({
  fetchData: mockFetch,
}))

// configure mockFetch inside the test
mockFetch.mockResolvedValue({ data: [] })
```

### Mocking a Default Export

```ts
vi.mock('./config', () => ({
  default: { apiUrl: 'https://test.example.com' },
}))
```

## Object Mocking: vi.mockObject() (v3.2.0+)

Recursively mocks the methods of an object. Works on an imported module object without needing `vi.mock()`.

```ts
import { userService } from './user-service'

const mocked = vi.mockObject(userService)
mocked.getUser.mockResolvedValue({ id: 1, name: 'Alice' })
```

To spy while keeping the original implementation:

```ts
const spied = vi.mockObject(userService, { spy: true })
// runs the original implementation while tracking calls
expect(spied.getUser).toHaveBeenCalled()
spied.getUser.mockRestore()
```

## Object Spying: vi.spyOn()

Tracks calls while keeping the original implementation.

```ts
const spy = vi.spyOn(console, 'warn')
doSomething()
expect(spy).toHaveBeenCalledWith(expect.stringContaining('deprecated'))
spy.mockRestore()
```

### Replacing the Implementation

```ts
const spy = vi.spyOn(fs, 'readFileSync').mockReturnValue('mocked content')
// restore after the test
spy.mockRestore()
```

### Spying on Getters/Setters

```ts
const obj = {
  get value() { return 42 },
  set value(v) { /* ... */ },
}

vi.spyOn(obj, 'value', 'get').mockReturnValue(100)
expect(obj.value).toBe(100)
```

## Stubbing Globals and Environment Variables

```ts
// global variable
vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
  ok: true,
  json: () => Promise.resolve({ data: [] }),
}))

// environment variable
vi.stubEnv('NODE_ENV', 'test')
vi.stubEnv('API_KEY', 'test-key')

// restore in afterEach
afterEach(() => {
  vi.unstubAllGlobals()
  vi.unstubAllEnvs()
})
```

## Cleaning Up Mocks

```ts
// beforeEach pattern
beforeEach(() => {
  vi.clearAllMocks()   // clears call history, keeps implementation
})

// or automate it via config
// vitest.config.ts: clearMocks: true / resetMocks: true / restoreMocks: true
```

| Config Option | Effect |
|---------------|--------|
| `clearMocks: true` | calls `vi.clearAllMocks()` before each test |
| `resetMocks: true` | calls `vi.resetAllMocks()` before each test |
| `restoreMocks: true` | calls `vi.restoreAllMocks()` before each test |

## Related

- [Vi utilities](../api/vi.md)
- [Expect matchers](../api/expect.md)
- [Async testing patterns](./async.md)
