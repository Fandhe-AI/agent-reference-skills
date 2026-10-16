# Mocking Globals

Mock global variables that are not present with `jsdom` or `node` using the `vi.stubGlobal` helper. It puts the value of the global variable into the `globalThis` object.

## Signature / Usage

```ts
import { vi } from 'vitest'

const IntersectionObserverMock = vi.fn(class {
  disconnect = vi.fn()
  observe = vi.fn()
  takeRecords = vi.fn()
  unobserve = vi.fn()
})

vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)

// now you can access it as `IntersectionObserver` or `window.IntersectionObserver`
```

## Notes

- Source: https://vitest.dev/guide/mocking/globals (docs at tag `v5.0.5`).
- By default, Vitest does not reset these globals. Turn on the `unstubGlobals` config option to restore the original values after each test, or call `vi.unstubAllGlobals()` manually.

## Related

- [Mocking Patterns](./mocking.md)
- [Mocking Classes](./mocking-classes.md)
