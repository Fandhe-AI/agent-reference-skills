# query

Retrieves the most similar vectors from an index using Approximate Nearest Neighbor (ANN) search. Scores are normalized between 0 and 1, where 1 is highest similarity.

## Signature / Usage

```ts
// Dense vector query
const results = await index.query({
  vector: [0.1, 0.2, 0.3],
  topK: 5,
  includeMetadata: true,
  includeVectors: false,
  filter: "genre = 'fantasy'",
});

// Text query (hosted embedding model required)
const results = await index.query({
  data: "The Lord of the Rings",
  topK: 5,
  includeMetadata: true,
});

// Namespace-scoped query
const results = await index.namespace("my-namespace").query({
  vector: [0.1, 0.2, 0.3],
  topK: 5,
});
```

## Options / Props

**Payload:**

| Name | Type | Required | Description |
|------|------|----------|-------------|
| `vector` | `number[]` | Yes* | Dense query vector. Dimension must match index |
| `sparseVector` | `{ indices: number[], values: number[] }` | Yes* | Sparse query vector for sparse/hybrid indexes |
| `data` | `string` | Yes* | Text to embed and query; requires hosted embedding model |
| `topK` | `number` | Yes | Number of top results to return |
| `includeMetadata` | `boolean` | No | Include metadata in results |
| `includeVectors` | `boolean` | No | Include vector arrays in results |
| `includeData` | `boolean` | No | Include the `data` field in results |
| `filter` | `string` | No | Metadata filter expression (SQL-like syntax) |
| `fusionAlgorithm` | `'RRF' \| 'DBSF'` | No | Score fusion algorithm for hybrid indexes. Default: `RRF` |
| `weightingStrategy` | string | No | Weighting strategy for sparse vector dimensions |
| `queryMode` | `'HYBRID' \| 'DENSE' \| 'SPARSE'` | No | Query scope for hybrid indexes. Default: `HYBRID` |

*Provide `vector`, `sparseVector`, or `data` depending on index type.

**Options:**

| Name | Type | Description |
|------|------|-------------|
| `namespace` | `string` | Target namespace. Omit to use the default namespace |

**Response item fields:**

| Name | Type | Description |
|------|------|-------------|
| `id` | `string \| number` | Vector identifier |
| `score` | `number` | Similarity score (0–1) |
| `vector` | `number[]` | Dense vector (if `includeVectors: true`) |
| `sparseVector` | object | Sparse vector (if requested) |
| `metadata` | object | Attached metadata (if `includeMetadata: true`) |
| `data` | `string` | Stored data string (if `includeData: true`) |

## Notes

- Filter budget: if exhausted during in-filtering, the system switches to post-filtering and may return fewer than `topK` results
- For hybrid indexes, `queryMode` controls which components are searched
- `fusionAlgorithm: 'DBSF'` (Distribution-Based Score Fusion) is more sensitive to score range differences than the default `RRF`

## Related

- [filtering.md](./filtering.md)
- [resumable-query.md](./resumable-query.md)
- [hybrid-indexes.md](./hybrid-indexes.md)
- [upsert.md](./upsert.md)
