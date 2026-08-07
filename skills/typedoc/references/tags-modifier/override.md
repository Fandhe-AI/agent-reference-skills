# @override

Modifier tag indicating a member overrides an implementation from a parent class. Parsed for TSDoc compatibility.

## Signature / Usage

```
/** @override */
```

TypeDoc parses the `@override` tag for compatibility with the TSDoc spec, but does not assign it any specific behavior. It can be used to mark overridden members in the documentation.

The `--visibilityFilters` option controls the display of members carrying this tag.

```typescript
export class Visibility {
    /** @override */
    newBehavior(): void;
}
```

```typescript
class BaseRenderer {
    render(): void {
        // Default rendering logic
    }
}

export class CustomRenderer extends BaseRenderer {
    /**
     * Custom rendering logic.
     * @override
     */
    render(): void {
        // Custom rendering logic
    }
}
```

## Notes

- Parsed for TSDoc compatibility, but grants no TypeDoc-specific behavior
- Display can be controlled via the `--visibilityFilters` option
- Follows the TSDoc spec

## Related

- [@sealed](./sealed.md)
- [@virtual](./virtual.md)
- [@abstract](./abstract.md)
