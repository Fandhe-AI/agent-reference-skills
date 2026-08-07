# @enum

Modifier tag that documents a variable holding string or numeric literal values as an enum instead of an ordinary variable.

## Signature / Usage

```
/** @enum */
```

Applying `@enum` to a variable causes TypeDoc to convert it into an enum instead of an ordinary variable. The target variable must be an object whose values are string or numeric literals.

Individual doc comments can be written for each enum member.

### Using `as const` (recommended)

```typescript
/**
 * Represents a direction.
 * @enum
 */
export const Direction = {
    /** Up */
    Up: "UP",
    /** Down */
    Down: "DOWN",
    /** Left */
    Left: "LEFT",
    /** Right */
    Right: "RIGHT",
} as const;
```

### Using an explicit type annotation

```typescript
/**
 * Status codes.
 * @enum
 */
export const Status: {
    /** Success */
    Ok: 200;
    /** Not found */
    NotFound: 404;
    /** Server error */
    Error: 500;
} = {
    Ok: 200,
    NotFound: 404,
    Error: 500,
};
```

### Usage in a declaration file (`.d.ts`)

```typescript
/**
 * Log level.
 * @enum
 */
declare const LogLevel: {
    Debug: 0;
    Info: 1;
    Warn: 2;
    Error: 3;
};
```

## Notes

- Applies to objects whose properties are string or numeric literals
- Each enum member can have its own doc comment
- The `as const` approach is the simplest and recommended
- Can be used in declaration files (`.d.ts`) together with the `declare` keyword

## Related

- [@namespace](./namespace.md)
- [@interface](./interface.md)
