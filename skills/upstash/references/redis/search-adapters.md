# Redis Search — node-redis / ioredis Adapters

Use Redis Search with an existing node-redis or ioredis client via the `@upstash/search-redis` and `@upstash/search-ioredis` adapter packages, without switching to `@upstash/redis`.

## Signature / Usage

```ts
// node-redis
import { createClient } from "redis";
import { createSearch, s } from "@upstash/search-redis";

const client = createClient({ url: process.env.REDIS_URL });
await client.connect();
const search = createSearch(client);
```

```ts
// ioredis
import IORedis from "ioredis";
import { createSearch, s } from "@upstash/search-ioredis";

const ioredis = new IORedis(process.env.REDIS_URL);
const search = createSearch(ioredis);
```

```ts
// shared API (both adapters)
const schema = s.object({
  name: s.string(),
  description: s.string(),
  category: s.string().noTokenize(),
  price: s.number(),
  inStock: s.boolean(),
});

await search.createIndex({ name: "products", dataType: "json", prefix: "product:", schema });

const index = search.index({ name: "products", schema });

// add data with raw commands
await client.sendCommand(["JSON.SET", "product:1", "$", JSON.stringify({ name: "Wireless Headphones", price: 199.99 })]); // node-redis
await ioredis.call("JSON.SET", "product:1", "$", JSON.stringify({ name: "Wireless Headphones", price: 199.99 })); // ioredis

await index.waitIndexing();
const results = await index.query({ filter: { description: "wireless" } });
const count = await index.count({ filter: { price: { $lt: 150 } } });
```

## Options / Props

| Item | node-redis | ioredis |
|------|------------|---------|
| Install | `npm install @upstash/search-redis redis` | `npm install @upstash/search-ioredis ioredis` |
| Factory | `createSearch(client)` from `@upstash/search-redis` | `createSearch(ioredis)` from `@upstash/search-ioredis` |
| Raw command | `client.sendCommand([...])` | `ioredis.call(...)` |

Index methods shown: `search.createIndex()`, `search.index()`, `index.query()`, `index.count()`, `index.waitIndexing()`, `index.describe()`, `index.drop()` (returns `1` dropped / `0` not found).

## Notes

- `REDIS_URL` is the Upstash Redis connection string in the format `rediss://default:<YOUR_TOKEN>@<YOUR-DATABASE>.upstash.io:6379`.
- The adapter exposes the same search API as `@upstash/redis`; see the Index Management, Querying, Aggregations, and Schema Definition pages for the full API.
- `search.index()` returns a client for an existing index without making a Redis call. Any key matching the index prefix is indexed automatically.
- Index updates are batched; call `waitIndexing()` when queries must reflect recent writes.
- This is a client-library choice, distinct from the `@upstash/redis` REST client covered in the TypeScript SDK page.
- Source: https://upstash.com/docs/redis/search/adapters/node-redis and https://upstash.com/docs/redis/search/adapters/ioredis (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Index Management](./search-index-management.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Querying](./search-querying.md)
- [TypeScript SDK Overview](./ts-sdk-overview.md)
