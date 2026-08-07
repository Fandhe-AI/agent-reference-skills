# @deprecated

Block tag indicating that a declaration is deprecated and may be removed in a future release.

## Signature / Usage

```
@deprecated Description of the alternative
```

The `@deprecated` tag indicates that a declaration should no longer be used. TypeDoc renders deprecated members with strikethrough formatting (similar to VSCode's display).

It conforms to the TSDoc specification.

The tag can include a description message, and `{@link}` syntax can be used to add a reference to a replacement API. Individual function signatures can be marked deprecated while other signatures remain active.

```typescript
/**
 * @deprecated Use {@link NewWidget} instead.
 */
export class Widget {}

export class NewWidget {
    /**
     * @deprecated a single signature may be deprecated
     */
    work(): void;

    /**
     * This signature is not deprecated
     */
    work(token: CancellationToken): void;

    work(token?: CancellationToken) {
        // ...
    }
}
```

## Notes

- Deprecated members are displayed with strikethrough
- `{@link}` syntax can be used to add cross-references to replacement APIs
- Individual overload signatures can be selectively marked as deprecated
- `@deprecated` also works with no description

## Related

- [TSDoc @deprecated](https://tsdoc.org/pages/tags/deprecated/)
