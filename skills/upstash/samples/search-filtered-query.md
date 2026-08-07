# Full-Text Search with Filters

Upsert documents into an Upstash Search index and query them with a full-text search combined with typesafe content/metadata filters.

```typescript
import { Search } from "@upstash/search";

const client = Search.fromEnv();
const index = client.index("products");

await index.upsert([
  {
    id: "product-1",
    content: {
      name: "Wireless Headphones",
      description: "Noise-cancelling bluetooth headphones",
      brand: "Sony",
      category: "Electronics",
      warehouse_location: "A3-15",
      in_stock: 3,
    },
    metadata: {
      sku: "AT-WH-001",
      supplier_id: "SUP-123",
    },
  },
]);

const results = await index.search({
  query: "sony headphones",
  limit: 10,
  filter: {
    AND: [
      { category: { equals: "Electronics" } },
      { in_stock: { greaterThan: 0 } },
      { "@metadata.supplier_id": { equals: "SUP-123" } },
    ],
  },
});

console.log(results);
```

```env
UPSTASH_SEARCH_REST_URL=https://...upstash.io
UPSTASH_SEARCH_REST_TOKEN=...
```

## Notes

- Upstash Search (`@upstash/search`) is a standalone product, distinct from Redis Search (`@upstash/redis/search`)—the Tantivy-based full-text extension built into Upstash Redis. Do not mix the two SDKs
- `content` fields are both searchable and filterable; `metadata` fields are filterable only and must be referenced with the `@metadata.` prefix inside `filter`
- Typesafe filter operators include `equals`, `greaterThan`, `glob`, `contains`, combined via `AND` / `OR`; a raw SQL-like string is also accepted, e.g. `filter: "category = 'Electronics' AND in_stock > 0"`
- `Search.fromEnv()` reads `UPSTASH_SEARCH_REST_URL` / `UPSTASH_SEARCH_REST_TOKEN` from environment variables
