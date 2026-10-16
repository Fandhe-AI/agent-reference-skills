---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/shouldThrowError
---

# shouldThrowError

Resolves a `throwOnError` option to a boolean. If `throwOnError` is a function, it is called with `params` and its result is returned, allowing the throwing behavior to be decided per error. Otherwise `throwOnError` is coerced to a boolean (`undefined` resolves to `false`).

## Signature / Usage

```ts
function shouldThrowError<T>(throwOnError: boolean | T | undefined, params: Parameters<T>): boolean;

const throwOnError =
  query.state.error && typeof options.throwOnError === 'function'
    ? shouldThrowError(options.throwOnError, [query.state.error, query])
    : options.throwOnError
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `throwOnError` | `boolean \| T \| undefined` | A boolean, a function that decides per error, or `undefined` |
| `params` | `Parameters<T>` | The arguments passed to `throwOnError` if it is a function |

`T` extends `(...args: any[]) => boolean`.

## Notes

- Returns whether the error should be thrown.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [useQuery](./use-query.md)
- [useSuspenseQuery](./use-suspense-query.md)
