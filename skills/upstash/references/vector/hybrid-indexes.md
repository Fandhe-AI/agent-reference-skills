# Hybrid Indexes

Combines dense (semantic) and sparse (keyword) vector search. Both components are queried and their scores are fused, yielding better recall for out-of-domain queries where pure semantic search fails.

## Signature / Usage

```ts
// Upsert with both dense and sparse vectors
await index.upsert({
  id: "1",
  vector: [0.1, 0.2, 0.3],          // dense component
  sparseVector: {
    indices: [10, 45, 200],
    values:  [0.8, 0.3, 0.5],
  },
  metadata: { title: "Example doc" },
});

// Query hybrid index — fused results (default)
const results = await index.query({
  vector: [0.1, 0.2, 0.3],
  sparseVector: { indices: [10, 45], values: [0.8, 0.3] },
  topK: 5,
  fusionAlgorithm: "RRF",   // default
  queryMode: "HYBRID",       // default
  includeMetadata: true,
});

// Text-based query (when using a hosted embedding model)
const results = await index.query({
  data: "search query text",
  topK: 5,
  queryMode: "DENSE", // DENSE | SPARSE | HYBRID
});
```

## Options / Props

**`queryMode` values:**

| Value | Description |
|-------|-------------|
| `HYBRID` | Query both dense and sparse components and fuse results (default) |
| `DENSE` | Query only the dense component |
| `SPARSE` | Query only the sparse component |

**`fusionAlgorithm` values:**

| Value | Description |
|-------|-------------|
| `RRF` | Reciprocal Rank Fusion — `score = 1 / (rank + 60)`. Default. Good general-purpose fusion |
| `DBSF` | Distribution-Based Score Fusion — normalizes scores using mean and standard deviation. More sensitive to score range differences |

**Upsert sparse vector fields:**

| Name | Type | Description |
|------|------|-------------|
| `indices` | `number[]` | Dimension indices with non-zero values |
| `values` | `number[]` | Values corresponding to each index (same length as `indices`) |

## Notes

- Hybrid indexes require both dense and sparse vectors on upsert — neither component can be omitted
- When using hosted models (e.g., BGE-M3, BM25), upsert and query with `data` string; embedding is automatic
- For specialized reranking needs, query dense and sparse components separately using `queryMode: 'DENSE'` / `queryMode: 'SPARSE'` and apply a custom reranker (e.g., bge-reranker-v2-m3)
- Sparse vectors have a maximum of 1,000 non-zero dimensions

## Related

- [sparse-indexes.md](./sparse-indexes.md)
- [query.md](./query.md)
- [embedding-models.md](./embedding-models.md)
