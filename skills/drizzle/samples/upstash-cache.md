---
source: https://orm.drizzle.team/docs/cache
---

# Upstash Redis query cache

Opt individual `SELECT` queries into an Upstash Redis-backed cache with automatic invalidation on writes to the involved tables.

```ts
import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/...";

const db = drizzle(process.env.DB_URL!, {
  cache: upstashCache({
    url: process.env.UPSTASH_URL,
    token: process.env.UPSTASH_TOKEN,
    global: false, // opt-in per query (default)
    config: { ex: 60 }, // default TTL in seconds
  }),
});

// explicit is the default strategy: only cached when .$withCache() is added
const res = await db.select().from(users).$withCache();

// invalidate manually when needed
await db.$cache.invalidate({ tables: users });
```

## Notes

- `global: false` (default) means nothing is cached unless a query calls `.$withCache()`; `global: true` caches every `SELECT` by default and lets you opt individual queries out with `.$withCache(false)`.
- `.$withCache({ autoInvalidate: false })` disables automatic invalidation on writes for that query, trading consistency for fewer cache invalidations — data can be stale up to the configured TTL.
- Mutations (`insert`/`update`/`delete`) still trigger the cache's `onMutate` handler to invalidate matching cached queries even when `global: false`.
- Not supported: raw ``db.execute(sql`...`)`` queries, queries inside `db.transaction(...)`, relational queries (`db.query.*`), AWS Data API drivers, and views.
- Upstash Redis itself (its own SDK, commands, pricing) is covered by the separate `upstash` skill; this page only covers the `upstashCache()` adapter Drizzle plugs into it.
