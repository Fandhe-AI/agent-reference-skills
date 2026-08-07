# @namespace

Modifier tag that documents a variable as a namespace, resolving its properties as exported variables and functions.

## Signature / Usage

```
/** @namespace */
```

Applying `@namespace` to a variable makes TypeDoc convert that variable into a namespace. The object's properties are resolved and documented as exported variables and functions.

This is mainly useful for documenting JavaScript projects that use an object literal to implement a namespace pattern.

```javascript
const a = 1;
const b = () => 2;
const c = { a, b, c: 3 };

/** @namespace */
export const d = { ...c, d: 4 };
```

The example above is documented equivalently to:

```typescript
export namespace d {
    export const a = 1;
    export const b = () => 2;
    export const c = 3;
    export const d = 4;
}
```

### Utility namespace

```typescript
/**
 * String manipulation utilities.
 * @namespace
 */
export const StringUtils = {
    /**
     * Converts a string to upper case.
     */
    toUpper: (s: string) => s.toUpperCase(),

    /**
     * Converts a string to lower case.
     */
    toLower: (s: string) => s.toLowerCase(),

    /**
     * Maximum allowed length.
     */
    MAX_LENGTH: 255,
};
```

## Notes

- Object properties are expanded as exported variables/functions
- Function properties are documented as functions, value properties as variables
- Can be combined with the `@property` tag to document individual members

## Related

- [@interface](./interface.md)
- [@class](./class.md)
- [@function](./function.md)
