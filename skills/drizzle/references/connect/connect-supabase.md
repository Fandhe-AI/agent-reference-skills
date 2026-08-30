---
source: https://orm.drizzle.team/docs/connect-supabase
---

# Drizzle <> Supabase

Supabase is an open source Firebase alternative for building secure and performant Postgres backends with minimal configuration. Drizzle connects to it via the `postgres.js` driver.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const allUsers = await db.select().from(/* ... */);
```

Using Supabase's connection pooler in "Transaction" pool mode requires disabling prepared statements:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL, { prepare: false });
const db = drizzle({ client });

const allUsers = await db.select().from(/* ... */);
```

## Notes

- Transcribed from `pg/connect-supabase.mdx`.
- Connect using the Connection Pooler for serverless environments, and the Direct Connection for long-running servers.
- If "Transaction" pool mode is enabled, prepared statements are not supported — set `prepare: false` on the `postgres.js` client.
- This library is distinct from the separate `supabase` skill, which covers Supabase's own client SDK, Auth, Storage, Realtime, and Edge Functions APIs; this page covers only the Drizzle ORM connection layer.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
