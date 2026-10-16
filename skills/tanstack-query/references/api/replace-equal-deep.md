---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/replaceEqualDeep
---

# replaceEqualDeep

Returns `a` if `b` is deeply equal. If not, replaces any deeply equal children of `b` with those of `a`. Usable for structural sharing between JSON values.

## Signature / Usage

```ts
function replaceEqualDeep<T>(
   a: unknown, 
   b: T, 
   depth?: number): T;
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `a` | `unknown` | The previous value, whose deeply equal parts are reused |
| `b` | `T` | The new value |
| `depth?` | `number` | The current recursion depth. Past a depth of `500`, `b` is returned as is |

## Notes

- Returns `a` if `b` is deeply equal to it, otherwise `b` with its deeply equal parts replaced by those of `a`.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [useQuery](./use-query.md)
