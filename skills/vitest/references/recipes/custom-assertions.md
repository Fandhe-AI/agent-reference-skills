# Custom Assertion Helpers

`vi.defineHelper` (since 4.1.0) wraps a reusable assertion function so Vitest strips its internals from the stack and points failures at the calling test line.

## Signature / Usage

```ts
import { expect, test, vi } from 'vitest'

const assertPair = vi.defineHelper((a: unknown, b: unknown) => {
  expect(a).toEqual(b) // ❌ failure does NOT point here
})

test('example', () => {
  assertPair('left', 'right') // ✅ failure points here
})
```

Bundling several assertions:

```ts
import { expect, test, vi } from 'vitest'

const expectValidUser = vi.defineHelper((user: { id: unknown; email: string }) => {
  expect(user).toHaveProperty('id')
  expect(user).toHaveProperty('email')
  expect(user.email).toMatch(/@/)
})

test('returns a valid user', async () => {
  const user = await fetchUser('alice')
  expectValidUser(user)
})
```

## Notes

- A failure in any inner `expect` is reported against the `expectValidUser(user)` line in the test, matching built-in matchers.
- Use `defineHelper` whenever a reusable check calls `expect` more than once.
- For asymmetric matchers and custom matchers attached to `expect.extend`, see the Extending Matchers guide.
- The official example types `user` as `unknown`, which makes `user.email` a TypeScript error (`toHaveProperty` does not narrow types); this page gives the parameter a structural type instead.
- Source: https://vitest.dev/guide/recipes/custom-assertions (Vitest v5.0.5)

## Related

- [vi](../api/vi.md)
- [expect](../api/expect.md)
