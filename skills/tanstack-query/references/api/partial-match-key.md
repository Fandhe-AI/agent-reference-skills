---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/partialMatchKey
---

# partialMatchKey

Checks if key `b` partially matches key `a`.

## Signature / Usage

```ts
function partialMatchKey(a: readonly unknown[], b: readonly unknown[]): boolean;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `a` | `readonly unknown[]` | The key to check, e.g. a query's own key |
| `b` | `readonly unknown[]` | The (partial) key to match against `a` |

## Notes

- Returns `true` if every array element or object property in `b` matches the one at the same position in `a`.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [hashKey](./hash-key.md)
- [matchQuery](./match-query.md)
