# @useDeclaredType

Modifier tag that converts a type alias using its declared type instead of its type-node representation. Useful for improving the documentation of derived types.

## Signature / Usage

```
/** @useDeclaredType */
```

The `@useDeclaredType` tag instructs TypeDoc to use the declared type, rather than the type-node representation, when converting a type alias. This can make derived types such as `ReturnType` or `Pick` more readable in the generated documentation.

This tag only has an effect on type aliases; applying it to other elements has no effect.

### Important caveats

The output is not stable and may change between TypeScript versions. Small changes to a type can produce different results, and in some cases the tag can produce worse documentation. A common failure pattern is a type being documented as a reference to itself.

Conditional mapped types do not work as expected with this tag.

### Basic usage

```typescript
function getData() {
    return [{ abc: 123 }];
}

/** @useDeclaredType */
export type Data = ReturnType<typeof getData>;
// Documented as: export type Data = { abc: number }[];
```

### A case where it works well

```typescript
function createConfig() {
    return {
        host: "localhost",
        port: 3000,
        debug: false,
    };
}

/** @useDeclaredType */
export type Config = ReturnType<typeof createConfig>;
// Displayed as { host: string; port: number; debug: boolean }
```

### A case requiring caution

```typescript
// Conditional mapped types may not work as expected
/** @useDeclaredType */
export type ConditionalResult<T> = T extends string ? { text: T } : { value: T };
// May be documented as a reference to itself
```

## Notes

- Only has an effect on type aliases
- Output is not stable and may change between TypeScript versions
- Small changes to a type can produce different results
- Does not work as expected with conditional mapped types
- Watch for the failure pattern where a type is documented as a reference to itself

## Related

- [@interface](./interface.md)
