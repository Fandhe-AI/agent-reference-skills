# @virtual

Modifier tag parsed for TSDoc compatibility, but with no specific meaning in TypeDoc.

## Signature / Usage

```
/** @virtual */
```

TypeDoc parses the `@virtual` tag for compatibility with the TSDoc spec, but does not assign it any specific behavior. Semantically, it is used as a convention to indicate that a method is intended to be overridden in a subclass.

The `--visibilityFilters` option controls the display of members carrying this tag.

```typescript
export class Visibility {
    /** @virtual */
    intendedForOverrideByChildren(): void;
}
```

```typescript
export class BasePlugin {
    /**
     * Plugin initialization logic.
     * Can be overridden in a subclass to customize behavior.
     * @virtual
     */
    initialize(): void {
        // Default initialization logic
    }

    /**
     * Plugin disposal logic.
     * Can be overridden in a subclass to release resources.
     * @virtual
     */
    dispose(): void {
        // Default disposal logic
    }
}
```

## Notes

- Parsed for TSDoc compatibility, but grants no TypeDoc-specific behavior
- Can be used as a documentation convention to indicate overriding is expected
- Display can be controlled via the `--visibilityFilters` option
- Follows the TSDoc spec: https://tsdoc.org/pages/tags/virtual/

## Related

- [@sealed](./sealed.md)
- [@override](./override.md)
- [@abstract](./abstract.md)
