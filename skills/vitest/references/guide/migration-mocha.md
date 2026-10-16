# Migrating from Mocha + Chai + Sinon

Vitest keeps a Mocha-like test structure, bundles Chai assertions, and provides sinon-chai style spy assertions, so most suites migrate with `vi` replacing Sinon.

## Signature / Usage

```ts
import { expect, vi } from 'vitest'

const spy = vi.spyOn(obj, 'method')
obj.method('arg1', 'arg2')

expect(spy).to.have.been.called
expect(spy).to.have.been.calledOnce
expect(spy).to.have.been.calledWith('arg1', 'arg2')
```

## Options / Props

| Sinon | Vitest |
|-------|--------|
| `sinon.spy()` | `vi.fn()` |
| `sinon.stub(obj, 'method')` | `vi.spyOn(obj, 'method')` |
| `sinon.mock(obj)` | none; use spies |
| `stub.returns(42)` | `stub.mockReturnValue(42)` |
| `stub.onFirstCall().returns(1)` | `stub.mockReturnValueOnce(1)` |
| `stub.callsFake(fn)` | `stub.mockImplementation(fn)` |
| `spy.restore()` / `sinon.restore()` | `spy.mockRestore()` / `vi.restoreAllMocks()` |
| `sinon.useFakeTimers()`, `clock.tick(1000)`, `clock.restore()` | `vi.useFakeTimers()`, `vi.advanceTimersByTime(1000)`, `vi.useRealTimers()` |

Chai-style spy assertions: `called`, `calledOnce`, `calledTwice`, `calledThrice`, `callCount(n)`, `calledWith(...)`, `calledOnceWith(...)`, `returned(value)`.

## Notes

- Test structure: `before` / `after` become `beforeAll` / `afterAll`; `describe`, `it`, `beforeEach`, `afterEach` are the same, imported from `vitest`.
- Chai assertions (`expect(value).to.equal(42)`) work unchanged.
- Vitest and Sinon both use `@sinonjs/fake-timers` internally.
- Key differences: Mocha provides globals by default (import from `vitest` or enable `globals`); both Chai-style and Jest-style (`toHaveBeenCalled()`) spy assertions work; Vitest runs files in parallel by default, Mocha sequentially.
- Source: https://vitest.dev/guide/migration/mocha (Vitest v5.0.5)

## Related

- [Migrating from Jest](./migration-jest.md)
- [Expect](../api/expect.md)
- [Vi](../api/vi.md)
- [Mocking](../patterns/mocking.md)
