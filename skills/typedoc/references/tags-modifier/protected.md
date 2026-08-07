# @protected

Modifier tag that overrides a reflection's visibility to protected. Its use is generally discouraged.

## Signature / Usage

```
/** @protected */
```

The `@protected` tag overrides a reflection's visibility to protected, producing documentation output equivalent to TypeScript's `protected` keyword.

Use of this tag is generally discouraged and it may be removed in a future release. Using TypeScript's `protected` keyword directly is recommended instead.

The `--excludeProtected` option can be used to exclude protected members from the documentation.

```typescript
export class Visibility {
    /** @protected */
    member = 123;
}

// The above is documented equivalently to:
export class Visibility {
    protected member = 123;
}
```

```typescript
export class BaseComponent {
    /**
     * Lifecycle method accessible only from subclasses.
     * @protected
     */
    onMount(): void {
        // ...
    }
}
```

## Notes

- Generally discouraged; may be removed in a future release
- Prefer TypeScript's `protected` keyword
- Protected members can be excluded via the `--excludeProtected` option

## Related

- [@private](./private.md)
- [@public](./public.md)
- [@internal](./internal.md)
