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

const expectValidUser = vi.defineHelper((user: unknown) => {
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

## Related

- [vi](../api/vi.md)
- [expect](../api/expect.md)
