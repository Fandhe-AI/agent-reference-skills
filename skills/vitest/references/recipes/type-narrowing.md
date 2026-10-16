# Type Narrowing in Tests

`expect.assert` (since 4.0.0) throws at runtime and narrows the TypeScript type, replacing `as` casts, `!` assertions, and `toBeTruthy()` checks.

## Signature / Usage

```ts
import { expect, test } from 'vitest'

test('reads stored user', () => {
  const cache = new Map<string, { id: string; name: string }>()
  cache.set('alice', { id: '1', name: 'Alice' })

  const user = cache.get('alice') // typed as `{ id, name } | undefined`
  expect.assert(user) // throws if undefined, narrows below
  expect(user.name).toBe('Alice') // no `!`, no `as`, type is `{ id, name }`
})
```

Narrowing beyond null (any boolean expression, as with an `if` branch):

```ts
expect.assert(typeof input === 'string')
input.toUpperCase() // input is `string`

expect.assert(error instanceof MyError)
expect(error.code).toBe('E_FOO') // error is `MyError`
```

Pre-built helpers from chai's `assert` API via the same namespace:

```ts
expect.assert.isDefined(maybeUser) // narrows away `undefined`
expect.assert.isString(input) // narrows to string
expect.assert.instanceOf(error, MyError) // narrows to MyError
```

## Notes

- `expect(x).toBeTruthy()` and `expect(x).toBeDefined()` throw at runtime but do not narrow, because their TypeScript signature returns `void` rather than the `asserts` form. `expect.assert` is typed as an assertion function.
- Source: https://vitest.dev/guide/recipes/type-narrowing (Vitest v5.0.5)

## Related

- [expect](../api/expect.md)
- [Waiting for Async Conditions](./wait-for.md)
