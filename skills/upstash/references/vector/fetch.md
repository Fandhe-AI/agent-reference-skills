# fetch

Retrieves vectors by their IDs. Returns `null` for IDs that do not exist.

## Signature / Usage

```ts
// Simple ID array
const results = await index.fetch(["id-1", "id-2", "id-3"], {
  includeMetadata: true,
  includeVectors: true,
  includeData: true,
});

// FetchPayload with prefix
const results = await index.fetch(
  { prefix: "article_" },
  { includeMetadata: true }
);

// Namespace-scoped fetch
const results = await index.namespace("my-namespace").fetch(["id-1"]);
```

## Options / Props

**First argument (ids or FetchPayload):**

| Name | Type | Description |
|------|------|-------------|
| `ids` | `(string \| number)[]` | Array of vector IDs to retrieve |
| `prefix` | `string` | Retrieve all vectors whose ID starts with this prefix. Use `range` for large prefix scans |

**Options (second argument):**

| Name | Type | Description |
|------|------|-------------|
| `includeMetadata` | `boolean` | Include metadata in response |
| `includeVectors` | `boolean` | Include vector arrays in response |
| `includeData` | `boolean` | Include the `data` field in response |
| `namespace` | `string` | Target namespace. Omit to use the default namespace |

**Response item fields:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string \| number` | Vector identifier |
| `vector` | `number[] \| null` | Dense vector (if `includeVectors: true`) |
| `sparseVector` | object \| null | Sparse vector (if applicable) |
| `metadata` | object \| null | Attached metadata (if `includeMetadata: true`) |
| `data` | `string \| null` | Stored data string (if `includeData: true`) |

## Notes

- Returns an array ordered to match the input `ids`; missing IDs produce `null` at that position
- For large prefix-based scans, prefer `range` with a `prefix` filter (stateless pagination)

## Related

- [upsert.md](./upsert.md)
- [delete.md](./delete.md)
- [range.md](./range.md)
