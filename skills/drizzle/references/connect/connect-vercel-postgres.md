---
source: https://orm.drizzle.team/docs/connect-vercel-postgres
---

# Drizzle <> Vercel Postgres

Vercel Postgres is a serverless SQL database designed to integrate with Vercel Functions. Drizzle ORM natively supports the `@vercel/postgres` serverless driver via the `drizzle-orm/vercel-postgres` package, as well as `postgres`/`pg` for direct `postgresql://` access.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle();

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { sql } from '@vercel/postgres';
import { drizzle } from 'drizzle-orm/vercel-postgres';

const db = drizzle({ client: sql });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `pg/connect-vercel-postgres.mdx`.
- `@vercel/postgres` allows access to Vercel Postgres from serverful or serverless environments with no TCP available (e.g. Cloudflare Workers) via WebSockets.
- From a serverful environment, `postgres` or `pg` can directly access the database through `postgresql://`.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
