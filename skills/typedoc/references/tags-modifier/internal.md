# @internal

Modifier tag that marks a reflection as not intended for API consumers. Can be excluded from output with `--excludeInternal`.

## Signature / Usage

```
/** @internal */
```

The `@internal` tag marks an API member as not intended for external consumers. Unlike `@hidden` or `@ignore`, the tag alone does not remove the member from the generated documentation.

To exclude it from the documentation, enable the `--excludeInternal` option. This makes it possible to switch flexibly between internal-developer documentation and externally published documentation.

It is sometimes used together with the TypeScript compiler's `--stripInternal` option.

```typescript
export class Visibility {
    /** @internal */
    member = 123;
}
```

```typescript
export class DatabaseConnection {
    /**
     * Internal state of the connection pool.
     * @internal
     */
    _poolState: PoolState;

    /**
     * Internal connection reset logic.
     * @internal
     */
    _resetConnection(): void {
        // ...
    }

    /**
     * Runs a query against the database.
     */
    query(sql: string): Promise<Result> {
        // ...
    }
}
```

## Notes

- Unlike `@hidden` / `@ignore`, the tag alone does not remove the member from the documentation
- Removed from output only when `--excludeInternal` is enabled
- Related to TypeScript's `--stripInternal` compiler option
- Follows the TSDoc spec: https://tsdoc.org/pages/tags/internal/
- Useful for switching between internal and external documentation

## Related

- [@hidden](./hidden.md)
- [@ignore](./ignore.md)
- [@alpha](./alpha.md)
- [@beta](./beta.md)
- [@experimental](./experimental.md)
- [@private](./private.md)
