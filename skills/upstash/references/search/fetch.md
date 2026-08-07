# fetch

Retrieves documents by ID or by ID prefix, without running a search ranking pass.

## Signature / Usage

```ts
// By IDs
await index.fetch({ ids: ["star-wars", "inception"] })
/*
[
  { id: "star-wars", content: { ... }, metadata: { ... } },
  { id: "inception", content: { ... }, metadata: { ... } }
]
*/

// By ID prefix
await index.fetch({ prefix: "star-" })
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ids` | `string[] \| number[]` | Document IDs to fetch |
| `prefix` | `string` | Match document IDs by prefix |

**Response item fields:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string \| number` | Document identifier |
| `content` | `Record<string, unknown>` | Document content |
| `metadata` | `Record<string, unknown>` | Document metadata |

## Notes

- Returns `null` for an ID if no matching document is found
- This is Upstash **Search** (document `content`/`metadata`), distinct from `vector/fetch.md` (Upstash **Vector**, vector arrays) in this skill

## Related

- [upsert.md](./upsert.md)
- [range.md](./range.md)
- [delete.md](./delete.md)
