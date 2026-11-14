# Redis Search — Getting Started

Step-by-step guide to creating a search index, indexing documents, and running queries with Upstash Redis Search.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis"

const redis = Redis.fromEnv()

// Step 1: Create an index (once per schema)
const index = await redis.search.createIndex({
  name: "products",
  dataType: "json",      // "json" | "hash" | "string" | "stream"
  prefix: "product:",   // keys with this prefix are auto-indexed
  schema: s.object({
    name: s.string(),
    description: s.string(),
    category: s.string().noTokenize(),
    price: s.number(),
    inStock: s.boolean(),
  }),
})

// Step 2: Store documents matching the prefix
await redis.json.set("product:1", "$", {
  name: "Wireless Headphones",
  description: "Premium noise-cancelling wireless headphones",
  category: "electronics",
  price: 199.99,
  inStock: true,
})

// Step 3: (Optional) Wait for indexing to complete
await index.waitIndexing()

// Step 4: Query
const results = await index.query({
  filter: { description: "wireless" },
  limit: 10,
})

// Step 5: Count matching documents
const count = await index.count({
  filter: { price: { $lt: 150 } },
})
```

## Options / Props

| `createIndex` option | Type | Description |
|------|------|-------------|
| `name` | `string` | Unique index name |
| `dataType` | `"json" \| "hash" \| "string" \| "stream"` | Redis data type being indexed |
| `prefix` | `string` | Key prefix; only matching keys are indexed |
| `schema` | `s.object` (field definitions) | Schema definition for indexed fields |

| Schema field type | Description |
|-------------------|-------------|
| `s.string()` | Full-text searchable string |
| `s.string().noTokenize()` | Exact-match keyword (no tokenization) |
| `s.number()` | Numeric field (supports range filters) |
| `s.boolean()` | Boolean field |

## Notes

- `createIndex` should be called once — repeated calls throw an error if the index already exists
- Indexing is asynchronous; call `waitIndexing()` in tests to ensure documents are searchable before querying
- Documents are automatically de-indexed when the key is deleted
- `s` comes from `@upstash/redis` (`import { Redis, s } from "@upstash/redis"`) in the official quickstart; older revisions of this page imported it from `@upstash/redis/search`
- Writes are indexed asynchronously (`JSON.SET` returns before the document is searchable); use `waitIndexing()` / `wait_indexing()` in demos and tests, not after every production write. To make setup re-runnable pass `existsOk` (`exists_ok=True` in Python) or wrap `createIndex` in `try/catch`
- Python equivalent: `redis.search.create_index(name=..., data_type="json", prefixes="product:", schema={"name": "TEXT", "category": {"type": "TEXT", "notokenize": True}, "price": "F64", "inStock": "BOOL"})`
- CLI: `SEARCH.CREATE products ON JSON PREFIX 1 product: SCHEMA name TEXT description TEXT category TEXT NOTOKENIZE price F64 FAST inStock BOOL`, then `SEARCH.WAITINDEXING products`, `SEARCH.QUERY products '{"description": "wireless"}'`, `SEARCH.COUNT products '{"price": {"$lt": 150}}'`
- Source: https://upstash.com/docs/redis/search/getting-started (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Search: Introduction](./search-introduction.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
- [Redis Search: Recipes](./search-recipes.md)
- [Redis Search: Hybrid Search](./search-hybrid-search.md)
