---
source: https://orm.drizzle.team/docs/cache
---

# Cache

Drizzle sends every query straight to your database by default. There is no hidden caching or invalidation unless you opt in. The default strategy is `explicit` (`global: false`); flipping to `all` (`global: true`) makes every select look in cache first.

## Signature / Usage

```ts
import { upstashCache } from "drizzle-orm/cache/upstash";
import { drizzle } from "drizzle-orm/...";

const db = drizzle(process.env.DB_URL!, {
  cache: upstashCache({ token: process.env.UPSTASH_TOKEN, url: process.env.UPSTASH_URL }),
});
```

Explicit credentials, global caching, and default config:

```ts
const db = drizzle(process.env.DB_URL!, {
  cache: upstashCache({
    url: '<UPSTASH_URL>',
    token: '<UPSTASH_TOKEN>',
    global: true,
    config: { ex: 60 }
  })
});
```

Per-query opt-in and invalidation control:

```ts
// explicit mode: opt a single query into caching
const res = await db.select().from(users).$withCache();

// custom cache key
.$withCache({ tag: 'custom_key' })

// disable auto-invalidation (eventual consistency)
.$withCache({ autoInvalidate: false })

// global mode: opt a single query out of caching
const res = await db.select().from(users).$withCache(false);

// manual invalidation
await db.$cache.invalidate({ tables: users });
await db.$cache.invalidate({ tables: ["usersTable", "postsTable"] });
await db.$cache.invalidate({ tags: ["custom_key", "custom_key1"] });
```

Custom cache implementations extend the `Cache` class and implement `strategy()`, `get()`, `put()`, and `onMutate()`:

```ts
const db = drizzle(process.env.DB_URL!, { cache: new TestGlobalCache() });
```

## Options / Props

`CacheConfig` (Upstash):

| Name | Type | Description |
| --- | --- | --- |
| ex | number | Expiration in seconds (positive integer) |
| hexOptions | `"NX" \| "nx" \| "XX" \| "xx" \| "GT" \| "gt" \| "LT" \| "lt"` | TTL (HEXPIRE) behavior for hash fields |

`CacheConfig` (custom cache extension):

| Name | Type | Description |
| --- | --- | --- |
| ex | number | Expire time, in seconds |
| px | number | Expire time, in milliseconds |
| exat | number | Unix time (sec) at which the key expires |
| pxat | number | Unix time (ms) at which the key expires |
| keepTtl | boolean | Retain existing TTL when updating a key |
| hexOptions | `'NX' \| 'XX' \| 'GT' \| 'LT' \| 'nx' \| 'xx' \| 'gt' \| 'lt'` | Options for HEXPIRE (hash-field TTL) |

## Notes

- The `upstashCache()` helper wires Drizzle to Upstash Redis; the underlying Upstash Redis client/API itself is covered by the separate `upstash` skill
- Not handled by the cache extension: raw queries (`db.execute(sql\`...\`)`) and queries inside transactions
- Temporary limitations (may be lifted): Relational Queries (`db.query.*.findMany()`), AWS Data API drivers, and views are not cached
- Transcribed from `pg/cache.mdx` (pg is the canonical dialect)

### rc.5 changes

- Migration (rc.4 → rc.5): relational queries (`db.query`) are now cached by caches with the `all` strategy (`global: true`); opt out per query with `withCache: false`, or opt in explicitly with `withCache: true`. Cached query invalidation was fixed for tables in nested SQL and subqueries, aliased and `tableCreator`-prefixed tables, tables defined on schemas and tables used in filters, selected fields, order clauses, set operators and CTEs; `getCacheKey(table)` returns the name the cache tracks a table by. A local `sha256` fallback is used for query hashing where `globalThis.crypto` is unavailable.

```ts
db.query.users.findMany({ with: { posts: true }, withCache: true })
```

- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [Transactions](./transactions.md)
- [Read Replicas](./read-replicas.md)
