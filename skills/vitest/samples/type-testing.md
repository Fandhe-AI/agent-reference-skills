# Type Testing

Assert TypeScript types at compile time using `expectTypeOf` and `assertType`.

```ts
// math.test-d.ts
import { assertType, expectTypeOf, test } from 'vitest'
import { add, multiply } from './math'

test('add returns a number', () => {
  expectTypeOf(add).toBeFunction()
  expectTypeOf(add).parameter(0).toBeNumber()
  expectTypeOf(add).returns.toBeNumber()
})

test('multiply result is assignable to number', () => {
  assertType<number>(multiply(2, 3))

  // @ts-expect-error — multiply does not accept strings
  assertType<number>(multiply('a', 'b'))
})
```

```ts
// expectTypeOf: structural type equality
import { expectTypeOf, test } from 'vitest'
import type { User } from './types'

test('User has the expected shape', () => {
  expectTypeOf<User>().toEqualTypeOf<{ id: number; name: string }>()
})

test('User id is a number, not string', () => {
  expectTypeOf<User['id']>().not.toBeString()
  expectTypeOf<User['id']>().toBeNumber()
})
```

```json
// package.json — run type checks alongside unit tests
{
  "scripts": {
    "test": "vitest",
    "typecheck": "vitest --typecheck"
  }
}
```

## Notes

- Type test files use the `.test-d.ts` extension by default; change via `typecheck.include` in config
- Files are statically analyzed by `tsc` (or `vue-tsc`), not executed at runtime
- `expectTypeOf` provides detailed error messages showing actual vs. expected types
- `@ts-expect-error` inside `assertType` verifies that an assignment is intentionally invalid
