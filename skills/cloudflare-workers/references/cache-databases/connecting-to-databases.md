---
source: https://developers.cloudflare.com/workers/databases/connecting-to-databases/
---

# Connect to databases

Overview of how Workers connect to SQL and NoSQL databases: native bindings (D1, Durable Objects SQLite), TCP drivers with Hyperdrive, and serverless HTTP drivers.

## Signature / Usage

Store credentials as Wrangler secrets and read them from `env`:

```sh
wrangler secret put <SECRET_NAME>
```

```js
const secretValue = env.<SECRET_NAME>;
```

## Options / Props

| Database | Library or Driver | Connection Method |
|----------|-------------------|-------------------|
| D1 | Workers binding; Prisma, Drizzle, other ORMs | Workers binding, REST API |
| Durable Objects (SQLite) | SQL storage API (`ctx.storage.sql`) | Workers binding |
| Postgres | node-postgres, Postgres.js | TCP socket via driver; Hyperdrive optional, recommended |
| MySQL | mysql2, mysql | TCP socket via driver; Hyperdrive optional, recommended |
| MongoDB | mongodb, mongoose | TCP socket via native driver |
| PlanetScale | Hyperdrive (MySQL / PostgreSQL), `@planetscale/database` | mysql2, mysql, node-postgres, Postgres.js, or API via client |
| Supabase | Hyperdrive, `@supabase/supabase-js` | node-postgres, Postgres.js, or API via client |
| Prisma Postgres | Hyperdrive, Prisma ORM | node-postgres, Postgres.js, or Prisma ORM |
| Neon | Hyperdrive, `@neondatabase/serverless` | node-postgres, Postgres.js, or API via client |
| Hasura | API | GraphQL API via `fetch()` |
| Upstash Redis | `@upstash/redis` | API via client library |
| TiDB Cloud | `@tidbcloud/serverless` | API via client library |

## Notes

- D1 and SQLite-backed Durable Objects (up to 10 GB each) are accessed through bindings, not network connections; D1 is built on Durable Objects. See the cloudflare-storage skill for D1 and Hyperdrive APIs.
- TCP drivers need several round trips per connection and a connection per invocation; Hyperdrive pools connections globally to remove that latency.
- Hyperdrive supports only PostgreSQL and MySQL wire protocols, not MongoDB. Persist a MongoDB client inside a Durable Object instead.
- For services that need mTLS client certificates, use mTLS certificate bindings.

- Prisma Postgres replaces the generic Prisma row: the official table lists Prisma Postgres with Hyperdrive and Prisma ORM, and the PostgreSQL-compatible serverless databases list now includes Prisma Postgres. Source: https://developers.cloudflare.com/workers/databases/connecting-to-databases/ (cloudflare-docs production 34d908a, fetched 2026-11-14)

## Related

- [third-party-integrations.md](./third-party-integrations.md)
- [mongodb.md](./mongodb.md)
- [neon.md](./neon.md)
- [planetscale.md](./planetscale.md)
- [supabase.md](./supabase.md)
