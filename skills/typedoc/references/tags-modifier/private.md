# @private

Modifier tag that overrides a reflection's visibility to private. Its use is generally discouraged.

## Signature / Usage

```
/** @private */
```

The `@private` tag overrides a reflection's visibility to private, producing documentation output equivalent to TypeScript's `private` keyword.

Use of this tag is generally discouraged and it may be removed in a future release. Using TypeScript's `private` keyword directly is recommended instead.

The `--excludePrivate` option can be used to exclude private members from the documentation.

```typescript
export class Visibility {
    /** @private */
    member = 123;
}

// The above is documented equivalently to:
export class Visibility {
    private member = 123;
}
```

```typescript
export class Config {
    /**
     * Internal configuration value.
     * @private
     */
    _secretKey: string;

    /**
     * Public configuration value.
     */
    appName: string;
}
```

## Notes

- Generally discouraged; may be removed in a future release
- Prefer TypeScript's `private` keyword
- Private members can be excluded via the `--excludePrivate` option

## Related

- [@protected](./protected.md)
- [@public](./public.md)
- [@internal](./internal.md)
- [@hidden](./hidden.md)
