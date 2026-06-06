# range

Retrieves vectors in paginated chunks using a cursor. Stateless — all parameters must be passed in every request.

## Signature / Usage

```ts
// First page
const page1 = await index.range({
  cursor: 0,
  limit: 100,
  includeMetadata: true,
});

// Next page
const page2 = await index.range({
  cursor: page1.nextCursor,
  limit: 100,
  includeMetadata: true,
});

// With ID prefix filter
const results = await index.range({
  cursor: 0,
  limit: 50,
  prefix: "article_",
  includeMetadata: true,
});

// Namespace-scoped
const results = await index.namespace("my-namespace").range({
  cursor: 0,
  limit: 100,
});
```

## Options / Props

**Payload:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `cursor` | `string \| number` | Yes | Pagination cursor. Use `0` for the first request |
| `limit` | `number` | Yes | Maximum number of vectors to return per page |
| `prefix` | `string` | No | Filter vectors by ID prefix |
| `includeMetadata` | `boolean` | No | Include metadata in results |
| `includeVectors` | `boolean` | No | Include vector arrays in results |
| `includeData` | `boolean` | No | Include the `data` field in results |
| `namespace` | `string` | No | Target namespace. Omit to use the default namespace |

**Response:**

| Name | Type | Description |
|------|------|-------------|
| `nextCursor` | `string` | Cursor value to use in the next request. Empty string (`""`) indicates the last page |
| `vectors` | array | Array of vector objects with `id`, and optionally `vector`, `metadata`, `data` |

## Notes

- Stateless: repeat all parameters (including `cursor`) on every request
- Iteration ends when `nextCursor` is an empty string
- Prefer `range` over `fetch` with `prefix` for large datasets

## Related

- [fetch.md](./fetch.md)
- [query.md](./query.md)
- [namespace.md](./namespace.md)
