---
source: https://orm.drizzle.team/docs/get-started-postgresql
---

# Drizzle <> PostgreSQL

Drizzle has native support for PostgreSQL connections with the `node-postgres` and `postgres.js` drivers.

## Signature / Usage

```ts
// node-postgres — make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

```ts
// postgres.js
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `pg/get-started-postgresql.mdx`.
- With `node-postgres`, installing `pg-native` can boost speed of both `node-postgres` and Drizzle by roughly 10%.
- `node-postgres` supports providing type parsers on a per-query basis without globally patching things.
- `postgres.js` uses prepared statements by default; this may need to be disabled (e.g. in AWS environments).
- `drizzle(process.env.DATABASE_URL)` accepts any property from the underlying driver's connection options via `{ connection: { ... } }`.

## Related

- [Database connection overview](./connect-overview.md)
- [Neon](./connect-neon.md)
- [Supabase](./connect-supabase.md)
- [Vercel Postgres](./connect-vercel-postgres.md)
