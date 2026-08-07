# @hidden

Modifier tag that completely removes a reflection from the generated documentation.

## Signature / Usage

```
/** @hidden */
```

A reflection tagged `@hidden` is completely removed from the generated documentation. It is functionally equivalent to JSDoc's `@ignore` tag, and TypeDoc recognizes both.

Unlike `@internal`, `@hidden` always removes the item from the documentation regardless of any option settings. `@internal` is only removed when the `--excludeInternal` option is enabled.

```typescript
export class Visibility {
    /** @hidden */
    newBehavior(): void;
}
```

```typescript
export class UserService {
    /**
     * Internal cache. Not included in the documentation.
     * @hidden
     */
    private _cache: Map<string, User> = new Map();

    /**
     * Retrieves a user.
     */
    getUser(id: string): User {
        return this._cache.get(id);
    }
}
```

## Notes

- Functionally equivalent to `@ignore`
- Unlike `@internal`, it is always removed from the documentation (no option required)
- Performs complete removal from documentation rather than specifying an access level

## Related

- [@ignore](./ignore.md)
- [@internal](./internal.md)
- [@hideconstructor](./hideconstructor.md)
