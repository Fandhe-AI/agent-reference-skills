# Extending Matchers

Add custom matchers with `expect.extend` (or Chai's `chai.use`), and type them by augmenting the `Matchers` interface.

## Signature / Usage

```ts
expect.extend({
  toBeFoo(received) {
    const { isNot } = this
    return {
      // do not alter your "pass" based on isNot. Vitest does it for you
      pass: received === 'foo',
      message: () => `${received} is${isNot ? ' not' : ''} foo`
    }
  }
})
```

```ts
// vitest.d.ts (include it in tsconfig.json)
import 'vitest'

declare module 'vitest' {
  interface Matchers<R, T> {
    toBeFoo: () => R
  }
}
```

## Options / Props

Matcher return value:

```ts
interface SyncMatcherResult {
  pass: boolean
  message: () => string
  // shown automatically in a diff when the matcher fails
  actual?: unknown
  expected?: unknown
  meta?: object
}

type MatcherResult = SyncMatcherResult | Promise<SyncMatcherResult>
```

`this` context (also available via `expect.getState()`):

| Name | Description |
|------|-------------|
| `isNot` | True when called on `.not`; do not invert `pass` yourself |
| `promise` | Modifier name when called on `resolves` / `rejects`, else empty string |
| `equals` | Equality helper (supports asymmetric matchers) |
| `customTesters` | Equality testers for `equals`, including `expect.addEqualityTesters` ones |
| `utils` | Message helpers such as `printReceived` / `printExpected` |
| `currentTestName` | Full name of the current test including describe blocks |
| `task` | Runner `Test` task when available (4.1.0, advanced); `undefined` with global `expect` in concurrent tests, use `context.expect` |
| `testPath` | File path of the current test |
| `environment` | Name of the current environment (e.g. `jsdom`) |
| `soft` | Whether called as a soft assertion; Vitest always catches the error |
| `assertion` | Underlying Chai assertion object (5.0.0, advanced) |

## Notes

- `R` is the assertion return type, `T` the received value type. Return `R` from synchronous matchers so the type becomes `Promise<void>` with `.resolves`, `.rejects`, `expect.poll`, `expect.element`. Use `T` for arguments of the same type as the received value (`toEqualTyped: (expected: T) => R`).
- Importing `vitest` in the declaration file is required so TypeScript treats it as a module.
- Async matchers: declare the return type as `Promise<void>` and `await` the assertion.
- Since 4.1 the types `Matcher`, `MatcherResult`, `MatcherState` are exported from `vitest`:

```ts
import type { Matcher, MatcherResult, MatcherState } from 'vitest'

const customMatcher: Matcher<MatcherState, [arg1: unknown, arg2: unknown]> = function (received, arg1, arg2) {
  // ...
}
```

- `equals` alone does not compare `Map` / `Set` contents; pass `[...this.customTesters, this.utils.iterableEquality]` for `toEqual` semantics.
- For custom snapshot matchers use `Snapshots` exported from `vitest`.

## Related

- [Expect](../api/expect.md)
- [Snapshot](./snapshot.md)
