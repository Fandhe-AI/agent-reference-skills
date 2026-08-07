# @function

Modifier tag that documents a callable variable declaration as a function.

## Signature / Usage

```
/** @function */
```

If a variable declaration is callable but not constructable, TypeDoc can convert it into a function. TypeDoc performs this conversion automatically when the variable's initializer is a function expression without an explicit type annotation.

The `@function` tag lets you manually document a callable variable as a function in cases where the automatic conversion does not apply (for example, when there is an explicit type annotation).

This tag has no effect on non-callable variables or on constructable variables.

### Automatic conversion (no tag needed)

```typescript
// Function-expression initializer without a type annotation → documented as a function automatically
export const Callable3 = () => "";
```

### Manual conversion (using the `@function` tag)

```typescript
type MultiCallSignature = {
    (value: string): string;
    (value: number): number;
};

/**
 * A function with multiple overloads.
 * @function
 */
export const Callable: MultiCallSignature = () => "";
```

### Case not converted

```typescript
// Has a type annotation and no @function tag → documented as a variable
export const Callable2: MultiCallSignature = () => "";
```

## Notes

- Only affects variables that are callable but not constructable
- No tag is needed when the initializer is a function expression without a type annotation (automatic conversion applies)
- Use this tag to document a callable variable with an explicit type annotation as a function

## Related

- [@namespace](./namespace.md)
- [@interface](./interface.md)
- [@class](./class.md)
