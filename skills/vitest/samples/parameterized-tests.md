# Parameterized Tests

Run the same test logic against multiple inputs using `test.each`.

```ts
import { expect, test } from 'vitest'

// Array-style: values are spread as arguments
test.each([
  [1, 1, 2],
  [1, 2, 3],
  [2, 1, 3],
])('add(%i, %i) -> %i', (a, b, expected) => {
  expect(a + b).toBe(expected)
})

// Object-style: named properties improve readability
test.each([
  { a: 1, b: 1, expected: 2 },
  { a: 1, b: 2, expected: 3 },
  { a: 2, b: 1, expected: 3 },
])('add($a, $b) -> $expected', ({ a, b, expected }) => {
  expect(a + b).toBe(expected)
})
```

```ts
// describe.each: parameterize an entire suite
import { describe, expect, test } from 'vitest'

describe.each([
  { currency: 'USD', symbol: '$' },
  { currency: 'EUR', symbol: '€' },
])('Currency $currency', ({ currency, symbol }) => {
  test('has the correct symbol', () => {
    expect(getSymbol(currency)).toBe(symbol)
  })
})
```

## Notes

- `%i` formats as integer, `%s` as string, `%o` as object in array-style test names
- `$propertyName` interpolates object properties into test names in object-style
- `test.each` and `describe.each` both accept a tagged template literal as an alternative syntax
- Each row generates an independent test case shown separately in reports
