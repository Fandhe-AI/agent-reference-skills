# Redis Search — Getting Started

Step-by-step guide to creating a search index, indexing documents, and running queries with Upstash Redis Search.

## Signature / Usage

```ts
import { Redis } from "@upstash/redis"
import { s } from "@upstash/redis/search"

const redis = Redis.fromEnv()

// Step 1: Create an index (once per schema)
const index = await redis.search.createIndex({
  name: "products",
  dataType: "json",      // "json" | "hash"
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
| `dataType` | `"json" \| "hash"` | Redis data type being indexed |
| `prefix` | `string` | Key prefix; only matching keys are indexed |
| `schema` | `s.object({...})` | Schema definition for indexed fields |

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

## Related

- [Redis Search: Introduction](./search-introduction.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
