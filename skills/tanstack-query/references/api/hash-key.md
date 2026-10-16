---
source: https://tanstack.com/query/latest/docs/framework/react/reference/functions/hashKey
---

# hashKey

Default query and mutation keys hash function. Hashes the value into a stable hash.

## Signature / Usage

```ts
function hashKey(queryKey: readonly unknown[]): string;

// Object keys are sorted, so key order doesn't affect the hash:
hashKey(['todos', { page: 1, filter: 'done' }]) // === '["todos",{"filter":"done","page":1}]'
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `queryKey` | `readonly unknown[]` | The query or mutation key to hash |

## Notes

- Returns the stable hash of the key, as a JSON string.
- Defined in `packages/query-core/src/utils.ts`.

## Related

- [partialMatchKey](./partial-match-key.md)
- [matchQuery](./match-query.md)
