# Migrating from Jest

Vitest has a Jest-compatible API; these are the remaining differences.

## Signature / Usage

```ts
jest.mock('./some-path', () => 'hello') // [!code --]
vi.mock('./some-path', () => ({ // [!code ++]
  default: 'hello', // [!code ++]
})) // [!code ++]
```

## Options / Props

| Jest | Vitest |
|------|--------|
| globals on by default | off; enable with `globals` config or import from `vitest` |
| `jest.requireActual` | `await vi.importActual(...)` |
| `jest.setTimeout(5_000)` | `vi.setConfig({ testTimeout: 5_000 })` |
| `jest.Mock<...>` type | `import type { Mock } from 'vitest'` |
| `JEST_WORKER_ID` | `VITEST_POOL_ID` (<= `maxWorkers`); also `VITEST_WORKER_ID` (unique, increments per worker) |
| `jest.replaceProperty` | `vi.stubEnv` or `vi.spyOn` |
| `jest-snapshot` composables | `Snapshots` from `vitest` |

## Notes

- Without globals, libraries like `testing-library` will not auto-run DOM cleanup.
- `mockReset`: Jest resets to an empty function returning `undefined`; Vitest resets to the original implementation (`vi.fn(impl)` resets to `impl`).
- `mock.mock` is a persistent reference in Vitest (`const state = mock.mock; mock.mockClear(); state === mock.mock`); Jest recreates it.
- Module mock factories must return an object with each export explicitly defined (including `default`).
- `<root>/__mocks__` modules are not loaded unless `vi.mock()` is called; mock them in `setupFiles` to get Jest behavior.
- To extend a module mock to external libraries, add them to `server.deps.inline: ["lib-name"]`.
- `expect.getState().currentTestName` and `-t` match names joined with `>` (`math > adds`), Jest uses a space. Update patterns: `vitest -t 'math > adds'`.
- Done callbacks are unsupported; use `async`/`await` or Promises.
- `beforeAll` / `beforeEach` may return a teardown function, so hooks returning anything other than `undefined` / `null` need braces: `beforeEach(() => { setActivePinia(createTestingPinia()) })`.
- Hooks run in a stack by default; for Jest's sequential behavior set `sequence.hooks: 'list'`.
- Legacy fake timers are unsupported.
- Vue snapshots: install `jest-serializer-vue` and list it in `snapshotSerializers` to avoid escaped `"`.
- Custom snapshot matchers (experimental, 4.1.3):

```ts
import { Snapshots } from 'vitest'
const { toMatchSnapshot } = Snapshots

expect.extend({
  toMatchTrimmedSnapshot(received: string, length: number) {
    return toMatchSnapshot.call(this, received.slice(0, length))
  },
})
```
- Source: https://vitest.dev/guide/migration/jest (Vitest v5.0.5)

## Related

- [Migrating from Mocha + Chai + Sinon](./migration-mocha.md)
- [Migration to Vitest 5](./migration-v5.md)
- [Config](./config.md)
- [Snapshot](./snapshot.md)
