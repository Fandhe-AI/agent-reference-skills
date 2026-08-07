# Type Testing

Vitest supports type-level testing via `expectTypeOf` and `assertType`. Files matching `*.test-d.ts` are automatically recognized as type tests.

## Signature / Usage

```bash
vitest typecheck
# or
vitest --typecheck
```

```json
// package.json
{
  "scripts": {
    "test:types": "vitest --typecheck"
  }
}
```

Use `typecheck.include` in the config to customize the match pattern.

```ts
import { expectTypeOf } from 'vitest'

expectTypeOf(42).toBeNumber()
expectTypeOf('hello').toBeString()
expectTypeOf(true).toBeBoolean()
expectTypeOf(undefined).toBeUndefined()
expectTypeOf(null).toBeNull()
expectTypeOf({}).toBeObject()
expectTypeOf([]).toBeArray()
expectTypeOf(() => {}).toBeFunction()
```

```ts
import { assertType } from 'vitest'

const answer = 42
assertType<number>(answer)

// @ts-expect-error answer is not a string
assertType<string>(answer)
```

## Notes

- Type equality / extension checks:

```ts
expectTypeOf<string>().toEqualTypeOf<string>()
expectTypeOf<string>().toExtend<string | number>()

// function parameters / return values
expectTypeOf(fn).parameter(0).toBeString()
expectTypeOf(fn).returns.toBeNumber()
```

- Negation:

```ts
expectTypeOf<string>().not.toBeNumber()
```

- How it works: Vitest internally invokes `tsc` or `vue-tsc` and parses the results. Files are statically analyzed only, never executed.
- Best practices:
  - Using type arguments gives clearer error messages than relying on inference: `expectTypeOf(value).toEqualTypeOf<Expected>()`
  - Combine with `@ts-expect-error` to also catch typos in a runtime test
  - `--allowOnly` and `-t` flags also work with type tests

## Related

- [Config](./config.md)
- [CLI](./cli.md)
