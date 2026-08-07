# @interface

Modifier tag that documents a type alias as an interface, expanding "dynamic" properties into actual properties.

## Signature / Usage

```
/** @interface */
```

Applying `@interface` to a type alias causes TypeDoc to display the type as an interface. All "dynamic" properties (computed / conditional properties) are expanded into actual properties.

This makes complex type definitions, such as `Record` types or mapped types, documented in a more readable interface form.

### Basic usage

```typescript
/**
 * Configuration object type.
 * @interface
 */
export type Config = {
    /** Host name */
    host: string;
    /** Port number */
    port: number;
    /** Debug mode */
    debug: boolean;
};
```

### Expanding a `Record` type

```typescript
/**
 * @interface
 * @property a - The first property
 * @property b - The second property
 * @property c - The third property
 */
export type MyRecord = Record<"a" | "b" | "c", string>;
```

The above is documented as an interface with three explicit `string` properties (`a`, `b`, `c`).

### Composite types

```typescript
/**
 * A user's complete profile information.
 * @interface
 */
export type UserProfile = BaseUser & {
    bio: string;
    avatar: string;
};
```

## Notes

- Only has an effect on type aliases
- Computed / conditional properties are expanded into actual properties
- Can be combined with `@property` / `@prop` tags to document each property

## Related

- [@class](./class.md)
- [@namespace](./namespace.md)
- [@useDeclaredType](./useDeclaredType.md)
