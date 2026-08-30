---
source: https://orm.drizzle.team/docs/connect-xata
---

# Drizzle <> Xata

Xata is a PostgreSQL database platform with instant copy-on-write database branches, zero-downtime schema changes, data anonymization, AI-powered performance monitoring, and BYOC. Drizzle connects to it via the `postgres.js` driver.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/postgres-js';

const db = drizzle(process.env.DATABASE_URL);

const allUsers = await db.select().from(/* ... */);
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

const client = postgres(process.env.DATABASE_URL);
const db = drizzle({ client });

const allUsers = await db.select().from(/* ... */);
```

## Notes

- Transcribed from `pg/connect-xata.mdx`.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
