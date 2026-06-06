# upsert

Adds new vectors to an index or updates existing ones. Vectors must match the index dimension.

## Signature / Usage

```ts
// Single vector
await index.upsert({
  id: "1234",
  vector: [0.1, 0.2, 0.3, 0.4, 0.5],
  metadata: { title: "Lord of The Rings" },
});

// Multiple vectors
await index.upsert([
  { id: "6789", vector: [0.6, 0.7, 0.8, 0.9, 0.9] },
  { id: "1234", vector: [0.1, 0.2, 0.3, 0.4, 0.5] },
]);

// With namespace
await index.upsert([...], { namespace: "my-namespace" });

// Text data (requires an index with a hosted embedding model)
await index.upsert({
  id: "1234",
  data: "The Lord of the Rings follows Frodo Baggins...",
  metadata: { title: "Lord of The Rings" },
});
```

## Options / Props

**Payload fields (VectorPayload):**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `id` | `string \| number` | Yes | Unique vector identifier |
| `vector` | `number[]` | Yes* | Dense vector values. Dimension must match index |
| `sparseVector` | `{ indices: number[], values: number[] }` | Yes* | Sparse vector for sparse/hybrid indexes |
| `data` | `string` | Yes* | Raw text; embedding generated automatically by hosted model |
| `metadata` | `Record<string, unknown>` | No | Arbitrary key-value metadata attached to the vector |

*Provide `vector`, `sparseVector`, or `data` depending on index type.

**Options:**

| Name | Type | Description |
|------|------|-------------|
| `namespace` | `string` | Target namespace. Omit to use the default namespace |

## Notes

- Returns `'Success'` on completion
- Upsert semantics: existing vectors with the same ID are overwritten
- Maximum 1,000 non-zero dimensions per sparse vector
- Namespaces are created implicitly on first upsert — no separate create step needed

## Related

- [fetch.md](./fetch.md)
- [delete.md](./delete.md)
- [query.md](./query.md)
- [namespace.md](./namespace.md)
