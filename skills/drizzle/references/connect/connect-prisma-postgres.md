---
source: https://orm.drizzle.team/docs/connect-prisma-postgres
---

# Drizzle <> Prisma Postgres

Prisma Postgres is a serverless database built on unikernels, with a large free tier, operation-based pricing, and no cold starts. It is accessed via the `node-postgres` or `postgres.js` drivers.

## Signature / Usage

```ts
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const result = await db.execute('select 1');
```

```ts
// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `pg/connect-prisma-postgres.mdx`.
- Prisma Postgres also has a serverless driver, planned to be supported by Drizzle ORM in the future (not yet supported).

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
