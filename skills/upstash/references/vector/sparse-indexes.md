# Sparse Indexes

Sparse vector indexes for exact keyword matching and information retrieval. Represent data in high-dimensional space where only a small fraction of dimensions have non-zero values.

## Signature / Usage

```ts
// Upsert sparse vector directly
await index.upsert({
  id: "doc-1",
  sparseVector: {
    indices: [10, 45, 200, 1500],
    values:  [0.8, 0.3,  0.5,  0.2],
  },
  metadata: { title: "Document Title" },
});

// Upsert raw text (with hosted BM25 or BGE-M3 model)
await index.upsert({
  id: "doc-1",
  data: "The quick brown fox",
  metadata: { title: "Document Title" },
});

// Query sparse index
const results = await index.query({
  sparseVector: {
    indices: [10, 45],
    values:  [0.8, 0.3],
  },
  topK: 5,
  includeMetadata: true,
});
```

## Options / Props

**Sparse vector structure:**

| Name | Type | Description |
|------|------|-------------|
| `indices` | `number[]` | Non-zero dimension indices |
| `values` | `number[]` | Corresponding non-zero values (same length as `indices`) |

**Hosted embedding models for sparse indexes:**

| Model | Space | Description |
|-------|-------|-------------|
| `BAAI/bge-m3` | 250,002 dimensions | Multi-functional, multi-lingual; contextual token weighting |
| `BM25` | 250,002 dimensions | Classic information retrieval. Parameters: k₁=1.2, b=0.75, avg doc length=32 tokens |

## Notes

- Sparse indexes use inner product similarity; results may be exact matches (not approximate)
- Results may contain fewer than `topK` items when there is insufficient dimensional overlap between query and stored vectors
- Maximum 1,000 non-zero dimensions per vector
- BM25 automatically maintains inverse document frequency (IDF) data for query-time weighting
- Sparse scores are not normalized 0–1 (unlike dense query scores)

## Related

- [hybrid-indexes.md](./hybrid-indexes.md)
- [embedding-models.md](./embedding-models.md)
- [upsert.md](./upsert.md)
- [query.md](./query.md)
