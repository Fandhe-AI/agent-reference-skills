# Redis Search — Introduction

Full-text search built into Upstash Redis, powered by Tantivy (Rust-based). Enables searching through Redis data without a separate search service.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis"

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
- Supports JSON, Hash, String, and Stream data types (searchable Redis streams added September 2026: individual stream entries are searched by their field values)
- September 2026 expansion also added multi-value text and keyword fields and composite aggregations (see Aggregations); only the changelog states multi-value fields, so see Schema Definition for field details
- Available through `@upstash/redis` and `upstash-redis` SDKs; for `node-redis` / `ioredis` the `@upstash/search-redis` and `@upstash/search-ioredis` wrappers avoid switching clients
- `SEARCH.*` commands are separate from, and incompatible with, RediSearch `FT.*` commands
- The Tantivy engine provides boolean operators, fuzzy matching, phrase queries, and regex support
- This is Upstash's first extension beyond the standard Redis spec
- Since `@upstash/redis` 1.41.0 (October 2026) Search also covers hybrid search: `HYBRID` fields (`s.hybrid()`) searched by meaning with the `$ann` retriever and merged with full-text results by `$rrf` (see Hybrid Search and Retrievers pages)
- `s` is exported from `@upstash/redis` itself (`import { Redis, s } from "@upstash/redis"`), as in the official Search pages; earlier versions of this page imported it from `@upstash/redis/search`, which the official docs do not use
- Official feature list: works with JSON, hashes, strings and streams; auto-synchronization of writes; type-safe JSON query syntax (boolean operators, fuzzy, phrase, regex); hybrid search; Tantivy-based performance
- Source: https://upstash.com/docs/redis/search/introduction (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Index Management](./search-index-management.md)
- [Redis Search: Hybrid Search](./search-hybrid-search.md)
- [Redis Search: Retrievers](./search-retrievers.md)
- [Redis Search: Recipes](./search-recipes.md)
- [Redis Search: Troubleshooting](./search-troubleshooting.md)
- [Redis Search: Searching Streams](./search-streams.md)
- [Redis Search: Adapters](./search-adapters.md)
- [Commands: JSON](./commands-json.md)
