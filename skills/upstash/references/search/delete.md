# delete

Removes documents from an index by ID, ID prefix, or metadata/content filter.

## Signature / Usage

```ts
await index.delete(["star-wars", "inception"]) // { deleted: 2 }
await index.delete("star-wars")                 // { deleted: 1 }
await index.delete({ prefix: "star-" })          // { deleted: 3 }
await index.delete({ filter: "age > 30" })       // { deleted: 3 }
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ids` | `string \| number \| (string \| number)[]` | Document ID(s) to delete |
| `prefix` | `string` | Delete all documents whose ID matches this prefix |
| `filter` | `string` | SQL-like filter expression; deletes all matching documents |

**Response:**

| Name | Type | Description |
|------|------|-------------|
| `deleted` | `number` | Number of documents removed |

## Notes

- Filter-based deletion performs a full index scan (O(N)) and may be slower on large indexes
- This is Upstash **Search** (document filter/prefix delete), distinct from `vector/delete.md` (Upstash **Vector**, ID/prefix/metadata-filter vector delete) in this skill

## Related

- [fetch.md](./fetch.md)
- [filtering.md](./filtering.md)
- [reset.md](./reset.md)
