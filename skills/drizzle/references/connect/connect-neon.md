---
source: https://orm.drizzle.team/docs/connect-neon
---

# Drizzle <> Neon Postgres

Drizzle has native support for Neon connections with the `neon-http` and `neon-websockets` drivers, both built on top of the `@neondatabase/serverless` package.

## Signature / Usage

```ts
// Neon HTTP — fastest for single, non-interactive queries
import { drizzle } from 'drizzle-orm/neon-http';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

```ts
// Neon WebSockets — needed for session/interactive transactions, drop-in replacement for 'pg'
import { drizzle } from 'drizzle-orm/neon-serverless';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `pg/connect-neon.mdx`.
- `neon-http`/`neon-websockets` access a Neon database over HTTP or WebSockets instead of TCP, useful in serverless environments.
- Querying over HTTP is faster for single, non-interactive transactions; use `neon-serverless` (WebSocket-based) for session or interactive transaction support, or as a drop-in `pg` replacement.
- In Node.js, WebSockets require the `ws` and `bufferutil` packages, and setting `ws` in the Drizzle config (`WebSocket` global is not defined by default).
- From a serverful environment, `node-postgres` or `postgres.js` can also be used to access Neon.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
