# Spy on Methods

Track calls to existing methods with `vi.spyOn` without replacing the implementation.

```ts
import { afterEach, expect, test, vi } from 'vitest'

test('logs a deprecation warning', () => {
  const spy = vi.spyOn(console, 'warn')

  callDeprecatedApi()

  expect(spy).toHaveBeenCalledWith(expect.stringContaining('deprecated'))
  spy.mockRestore()
})
```

```ts
// Replace implementation while keeping the spy
import { fs } from 'node:fs'

test('reads the config file', () => {
  const spy = vi.spyOn(fs, 'readFileSync').mockReturnValue('{"port":3000}')

  const config = loadConfig()

  expect(config.port).toBe(3000)
  spy.mockRestore()
})
```

```ts
// Spy on a getter
const store = {
  get isLoggedIn() {
    return checkSession()
  },
}

test('renders the dashboard when logged in', () => {
  vi.spyOn(store, 'isLoggedIn', 'get').mockReturnValue(true)

  const result = renderApp()

  expect(result).toContain('Dashboard')
})
```

## Notes

- `spy.mockRestore()` reverts the method to its original implementation; call it in `afterEach` or inline
- Setting `restoreMocks: true` in `vitest.config.ts` restores all spies automatically before each test
- `vi.spyOn` wraps the existing function, so the original is still called unless `.mockImplementation()` or `.mockReturnValue()` is used
- Spy assertions include `toHaveBeenCalled`, `toHaveBeenCalledTimes`, `toHaveBeenCalledWith`, and `toHaveBeenLastCalledWith`
