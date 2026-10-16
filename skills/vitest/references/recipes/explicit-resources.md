# Auto-Cleanup with using

Declare spies and mocks with `using` instead of `const` so they are restored automatically when the block exits (Explicit Resource Management). Works for `vi.spyOn`, `vi.fn`, and `vi.doMock` (since 3.2.0).

## Signature / Usage

```ts
import { expect, it, vi } from 'vitest'

function debug(message: string) {
  console.log(message)
}

it('calls console.log', () => {
  using spy = vi.spyOn(console, 'log').mockImplementation(() => {})
  debug('message')
  expect(spy).toHaveBeenCalled()
})

// console.log is restored here without an afterEach
```

`vi.doMock` returns a disposable that queues an unmock when the scope exits:

```ts
import { expect, it, vi } from 'vitest'

it('uses the mocked module, then the real one', async () => {
  {
    using _mock = vi.doMock('./users', () => ({
      loadUser: () => ({ id: '1', name: 'Alice' }),
    }))
    const { loadUser } = await import('./users')
    expect(loadUser('alice').name).toBe('Alice')
  }

  // ./users is unmocked from here on
})
```

Block-scoped:

```ts
import { expect, it, vi } from 'vitest'

it('only mocks fetch for the auth call', async () => {
  // real fetch here
  await preloadConfig()

  {
    using fetchSpy = vi.spyOn(globalThis, 'fetch')
      .mockResolvedValue(new Response('{"ok":true}'))

    await login('alice', 'secret')
    expect(fetchSpy).toHaveBeenCalledOnce()
  }

  // real fetch is back
  await reportSuccess()
})
```

## Notes

- `using` is block-scoped, so a spy can cover just part of a test; neither `afterEach` nor `onTestFinished` can do that.
- It avoids enabling the global `restoreMocks: true` config when only a few calls need restoration.
- Requires TC39 Explicit Resource Management: TypeScript >= 5.2 (with `target: 'es2022'` or higher and the `disposable` lib included by default) and Node.js >= 24 (or Node 22+ with `--harmony`-style flags) for native runtime support.
- Fallback when unsupported: `onTestFinished` registers cleanup inline and runs after the test regardless of pass or failure, but cannot tear down a spy mid-test:

```ts
import { expect, it, onTestFinished, vi } from 'vitest'

it('calls console.log', () => {
  const spy = vi.spyOn(console, 'log').mockImplementation(() => {})
  onTestFinished(() => spy.mockRestore())

  debug('message')
  expect(spy).toHaveBeenCalled()
})
```
- Source: https://vitest.dev/guide/recipes/explicit-resources (Vitest v5.0.5)

## Related

- [vi](../api/vi.md)
- [Hooks](../api/hooks.md)
- [Mocking patterns](../patterns/mocking.md)
