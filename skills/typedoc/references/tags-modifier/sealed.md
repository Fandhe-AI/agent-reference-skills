# @sealed

Modifier tag parsed for TSDoc compatibility, but with no specific meaning in TypeDoc.

## Signature / Usage

```
/** @sealed */
```

TypeDoc parses the `@sealed` tag for compatibility with the TSDoc spec, but does not assign it any specific behavior. Semantically, it is used as a convention to indicate that a class or method should not be overridden in a subclass.

The `--visibilityFilters` option controls the display of members carrying this tag.

```typescript
export class Visibility {
    /** @sealed */
    newBehavior(): void;
}
```

```typescript
export class SecurityManager {
    /**
     * Authentication logic. Must not be overridden in a subclass.
     * @sealed
     */
    authenticate(token: string): boolean {
        // Overriding is disallowed for security reasons
        return this.validateToken(token);
    }
}
```

## Notes

- Parsed for TSDoc compatibility, but grants no TypeDoc-specific behavior
- Can be used as a documentation convention to indicate overriding is disallowed
- Display can be controlled via the `--visibilityFilters` option
- Follows the TSDoc spec

## Related

- [@virtual](./virtual.md)
- [@override](./override.md)
- [@abstract](./abstract.md)
