# Vector Semantic Search

Upsert text documents into Upstash Vector with a built-in embedding model and perform semantic similarity search without manual vectorization.

```typescript
import { Index } from "@upstash/vector";

// Index must be created with an embedding model in the Upstash console
const index = new Index({
  url: process.env.UPSTASH_VECTOR_REST_URL!,
  token: process.env.UPSTASH_VECTOR_REST_TOKEN!,
});

// Upsert raw text — embedding is generated automatically
await index.upsert([
  {
    id: "doc-1",
    data: "Upstash is a serverless data platform for Redis, Vector, and QStash.",
    metadata: { source: "homepage" },
  },
  {
    id: "doc-2",
    data: "QStash is a HTTP-based messaging service for serverless functions.",
    metadata: { source: "docs" },
  },
]);

// Query with raw text — no need to generate query vectors manually
const results = await index.query({
  data: "What is QStash?",
  topK: 2,
  includeMetadata: true,
});

console.log(results);
// [{ id: "doc-2", score: 0.92, metadata: { source: "docs" } }, ...]
```

```env
UPSTASH_VECTOR_REST_URL=https://...upstash.io
UPSTASH_VECTOR_REST_TOKEN=...
```

## Notes

- The `data` field accepts raw strings; vectorization is performed server-side by the embedding model chosen at index creation (e.g., `BAAI/bge-large-en-v1.5`)
- Use the `vector` field instead of `data` when providing pre-computed float arrays
- `topK` controls the number of nearest-neighbor results returned
- Upstash Vector is eventually consistent—newly upserted vectors may not be immediately queryable
