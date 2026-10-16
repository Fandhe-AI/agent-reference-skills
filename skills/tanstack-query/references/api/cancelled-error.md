---
source: https://tanstack.com/query/latest/docs/framework/react/reference/classes/CancelledError
---

# CancelledError (+ isCancelledError, deprecated)

The error thrown by a `Retryer` (and surfaced to `query.promise` / mutation) when a fetch is cancelled, e.g. via `query.cancel()`. Extends `Error`.

## Signature / Usage

```ts
query.cancel()

try {
  await query.promise
} catch (error) {
  if (error instanceof CancelledError) {
    // the fetch was cancelled, e.g. via `query.cancel()`
  }
}
```

```ts
new CancelledError(options?: CancelOptions): CancelledError;

function isCancelledError(value: any): value is CancelledError;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `revert?` | `boolean` | If `true`, restore the state the query had before the fetch started instead of surfacing the error |
| `silent?` | `boolean` | If `true`, suppress this error and resolve with the promise of the fetch that triggered the cancellation |

## Notes

- `isCancelledError(value)` checks whether a value is a `CancelledError`. It is deprecated: use `instanceof CancelledError` instead.
- Defined in `packages/query-core/src/retryer.ts`.

## Related

- [Query](./query.md)
- [useQuery](./use-query.md)
