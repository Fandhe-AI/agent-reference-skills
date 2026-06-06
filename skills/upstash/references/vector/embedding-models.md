# Embedding Models

Upstash Vector can automatically generate embeddings from raw text using a hosted model selected at index creation time. This eliminates the need to pre-vectorize data before upsert and query.

## Signature / Usage

```ts
// With a hosted model, upsert text directly
await index.upsert({
  id: "1",
  data: "The Lord of the Rings follows Frodo Baggins...",
  metadata: { title: "Lord of The Rings" },
});

// Query with text (embedding generated automatically)
const results = await index.query({
  data: "hobbit adventure",
  topK: 5,
  includeMetadata: true,
  includeData: true,
});
```

## Options / Props

**Dense index models:**

| Model | Dimensions | Seq Length | MTEB Score |
|-------|-----------|------------|------------|
| `BAAI/bge-large-en-v1.5` | 1024 | 512 | 64.23 |
| `BAAI/bge-base-en-v1.5` | 768 | 512 | 63.55 |
| `BAAI/bge-small-en-v1.5` | 384 | 512 | 62.17 |
| `BAAI/bge-m3` | 1024 | 8192 | — (multilingual, extended context) |

**Sparse / Hybrid index models:**

| Model | Description |
|-------|-------------|
| `BAAI/bge-m3` | Multi-functional, multi-lingual sparse embedder |
| `BM25` | Classic keyword ranking for information retrieval |

## Notes

- Model is selected once at index creation and cannot be changed afterward
- `data` field is used in upsert/query when a hosted model is configured; `vector` field is used otherwise
- `includeData: true` in query/fetch returns the original text stored with each vector
- `BAAI/bge-m3` supports up to 8,192-token context — suitable for long documents

## Related

- [ts-sdk-overview.md](./ts-sdk-overview.md)
- [upsert.md](./upsert.md)
- [query.md](./query.md)
- [hybrid-indexes.md](./hybrid-indexes.md)
- [sparse-indexes.md](./sparse-indexes.md)
