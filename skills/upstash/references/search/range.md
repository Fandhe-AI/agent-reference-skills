# range

Retrieves documents in paginated, cursor-based chunks. Stateless — all parameters must be passed on every call.

## Signature / Usage

```ts
const responseRange = await index.range({
  cursor: "0",
  limit: 2,
  prefix: "test-",
})
```

## Options / Props

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cursor` | `string` | Yes | Pagination cursor. Use `"0"` to start |
| `limit` | `number` | Yes | Maximum documents to return per call |
| `prefix` | `string` | No | Filter by document ID prefix |

**Response:**

| Name | Type | Description |
|------|------|-------------|
| `nextCursor` | `string` | Cursor for the next page; empty string `""` when done |
| `documents` | `Document[]` | Retrieved documents |

## Notes

- This is Upstash **Search** (paginated document scan), distinct from `vector/range.md` (Upstash **Vector**, paginated vector scan) in this skill

## Related

- [fetch.md](./fetch.md)
