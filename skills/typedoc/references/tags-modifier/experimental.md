# @experimental

Modifier tag marking a member intended for eventual use by third-party developers, but not yet stable enough to follow semantic versioning.

## Signature / Usage

```
/** @experimental */
```

`@experimental` indicates that an API member is in an experimental stage and may undergo breaking changes. Per the TSDoc specification, `@beta` and `@experimental` are treated as semantically equivalent.

Within a project, it is recommended to use only one of the two consistently rather than mixing them.

TypeDoc can show/hide `@experimental`-tagged members via the `--visibilityFilters` option.

```typescript
export class Visibility {
    /** @experimental */
    newBehavior(): void;
}
```

```typescript
export class DataProcessor {
    /**
     * Streaming processing mode. The API may change.
     * @experimental
     */
    async *processStream(input: AsyncIterable<Buffer>): AsyncGenerator<Result> {
        // ...
    }
}
```

## Notes

- Conforms to the TSDoc specification: https://tsdoc.org/pages/tags/experimental/
- `@beta` and `@experimental` are semantically equivalent; use only one consistently
- The `--visibilityFilters` option controls visibility

## Related

- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@public](./public.md)
- [@internal](./internal.md)
