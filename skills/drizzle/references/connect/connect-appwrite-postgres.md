---
source: https://orm.drizzle.team/docs/connect-appwrite-postgres
---

# Drizzle <> Appwrite Postgres

Appwrite offers dedicated, native PostgreSQL databases connected directly over TLS. There is no Appwrite-specific driver; use Drizzle with `node-postgres` or `postgres.js` as with any PostgreSQL server.

## Signature / Usage

```env
DATABASE_URL="postgresql://admin:<password>@db-<hash>.<region>.appwrite.center:5432/<database>?sslmode=require"
```

```bash
npm i drizzle-orm@rc pg
npm i -D drizzle-kit@rc
# or, for postgres.js: npm i drizzle-orm@rc postgres
```

```ts
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

```ts
// Make sure to install the 'postgres' package
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const result = await db.execute('select 1');
```

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL);
const db = drizzle({ client: queryClient });

const result = await db.execute('select 1');
```

Connection pooling for serverless (pooler on port `6432` for runtime, direct port `5432` for Drizzle Kit):

```env
# Runtime: pooled, transaction mode
DATABASE_URL="postgresql://admin:<password>@db-<hash>.<region>.appwrite.center:6432/<database>?sslmode=require"

# Migrations & introspection: direct connection to the engine
DIRECT_URL="postgresql://admin:<password>@db-<hash>.<region>.appwrite.center:5432/<database>?sslmode=require"
```

```ts
// drizzle.config.ts
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  schema: './src/schema.ts',
  out: './drizzle',
  dbCredentials: {
    url: process.env.DIRECT_URL!,
  },
});
```

```ts
// postgres.js through the pooler
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const queryClient = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle({ client: queryClient });
```

## Notes

- Transcribed from `pg/connect-appwrite-postgres.mdx`.
- Get the connection string in the Appwrite Console: open the database and click **Credentials**. The **Drizzle** tab has a ready-made snippet; **DSN** and **.env** tabs have the raw string. It can also be fetched via the Appwrite API with `postgresql.get()`. The string already includes `sslmode=require`, so no extra TLS configuration is needed.
- Connection pooling for serverless: Appwrite runs a connection pooler on port `6432` of the same hostname. Route serverless/edge application traffic through it, and keep Drizzle Kit on the direct engine port `5432` because migrations issue DDL that needs a session-level connection.
- The pooler defaults to transaction mode, which does not keep a backend connection across statements, so server-side prepared statements are unavailable. With `postgres.js`, build the client yourself with `prepare: false`.
- If you rely on prepared statements, advisory locks, `LISTEN`/`NOTIFY`, temporary tables or `SET LOCAL`, switch the pooler to session mode or use the direct port.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
- [Supabase](./connect-supabase.md)
