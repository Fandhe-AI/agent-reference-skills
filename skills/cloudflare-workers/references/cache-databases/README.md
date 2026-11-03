# cache-databases

| Name | Description | Path |
| --- | --- | --- |
| Workers Cache | Tiered, request-collapsing cache in front of a Worker, controlled by Cache-Control | [workers-cache.md](./workers-cache.md) |
| Workers Cache configuration | cache.enabled, per-entrypoint exports, cross_version_cache, Cache-Control semantics | [workers-cache-configuration.md](./workers-cache-configuration.md) |
| Workers Cache keys | Cache key components, ctx.props isolation, cf.cacheKey | [workers-cache-keys.md](./workers-cache-keys.md) |
| Purge and invalidate | ctx.cache.purge() and ctx.cache.invalidate() by tag, path prefix, everything | [workers-cache-purge.md](./workers-cache-purge.md) |
| Workers Cache examples | Gateway plus cached entrypoint patterns | [workers-cache-examples.md](./workers-cache-examples.md) |
| Workers Cache debugging | Diagnosing Cf-Cache-Status behavior | [workers-cache-debugging.md](./workers-cache-debugging.md) |
| Workers Cache limitations | Unsupported scenarios, limits, relation to other caches | [workers-cache-limitations.md](./workers-cache-limitations.md) |
| Connect to databases | Overview of database connection options from Workers | [connecting-to-databases.md](./connecting-to-databases.md) |
| Third-party integrations | Secrets-based connections to third-party databases | [third-party-integrations.md](./third-party-integrations.md) |
| MongoDB | Native driver or Mongoose, Durable Object connection persistence | [mongodb.md](./mongodb.md) |
| Neon | Neon Postgres via Hyperdrive or serverless driver | [neon.md](./neon.md) |
| PlanetScale | PlanetScale via Hyperdrive (mysql2) or serverless driver | [planetscale.md](./planetscale.md) |
| Supabase | Supabase via supabase-js or Hyperdrive | [supabase.md](./supabase.md) |
| Turso | libSQL client for Turso | [turso.md](./turso.md) |
| Upstash | Upstash Redis and QStash | [upstash.md](./upstash.md) |
| Xata | Xata Postgres via Hyperdrive | [xata.md](./xata.md) |
