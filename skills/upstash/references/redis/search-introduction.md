# Redis Search — Introduction

Full-text search built into Upstash Redis, powered by Tantivy (Rust-based). Enables searching through Redis data without a separate search service.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis"
import { s } from "@upstash/redis/search"

const redis = Redis.fromEnv()

// Create a search index (once, not per request)
const index = await redis.search.createIndex({
  name: "products",
  dataType: "json",
  prefix: "product:",
  schema: s.object({
    name: s.string(),
    description: s.string(),
    category: s.string().noTokenize(),  // exact-match only
    price: s.number(),
    inStock: s.boolean(),
  }),
})

// Index a document (automatically tracked by key prefix)
await redis.json.set("product:1", "$", {
  name: "Wireless Headphones",
  description: "Premium noise-cancelling wireless headphones",
  category: "electronics",
  price: 199.99,
  inStock: true,
})

// Wait for async indexing (useful in tests)
await index.waitIndexing()

// Query
const results = await index.query({
  filter: { description: "wireless" },
})
```

## Notes

- Indexing is **automatic and asynchronous** — once an index is created, all matching write operations are tracked
- Create index once (typically at app startup or migration); re-creating throws an error
- Supports JSON, Hash, and String data types
- The Tantivy engine provides boolean operators, fuzzy matching, phrase queries, and regex support
- This is Upstash's first extension beyond the standard Redis spec

## Related

- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
- [Commands: JSON](./commands-json.md)
