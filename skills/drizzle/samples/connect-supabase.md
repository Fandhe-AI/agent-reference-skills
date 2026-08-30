---
source: https://orm.drizzle.team/docs/connect-supabase
---

# Connect to Supabase Postgres

Initialize Drizzle against a Supabase Postgres database using the `postgres-js` driver, disabling prepared statements when connecting through Supabase's transaction-mode pooler.

```ts
import { drizzle } from 'drizzle-orm/postgres-js'

const db = drizzle(process.env.DATABASE_URL);

const allUsers = await db.select().from(users);
```

Through the Supabase connection pooler in "Transaction" pool mode:

```ts
import { drizzle } from 'drizzle-orm/postgres-js'
import postgres from 'postgres'

// Disable prepare as prepared statements are not supported in "Transaction" pool mode
const client = postgres(process.env.DATABASE_URL, { prepare: false })
const db = drizzle({ client });

const allUsers = await db.select().from(users);
```

## Notes

- Use the Connection Pooler URL for serverless environments and the Direct Connection URL for long-running servers.
- `{ prepare: false }` is required specifically when the pooler is in "Transaction" pool mode, since prepared statements aren't supported there.
- Supabase-specific features (Auth, RLS policies, Storage, project setup) are covered by the separate `supabase` skill; this page only covers the Drizzle client connection.
