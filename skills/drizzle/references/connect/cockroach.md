---
source: https://orm.drizzle.team/docs/cockroach/get-started-cockroach
---

# Drizzle <> CockroachDB

Drizzle has native support for CockroachDB connections with the `node-postgres` driver via the `drizzle-orm/cockroach` package.

## Signature / Usage

```ts
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/cockroach';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/cockroach';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
const db = drizzle({ client: pool });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `cockroach/get-started-cockroach.mdx`.
- `drizzle({ connection: { connectionString, ssl } })` accepts any property from the underlying `node-postgres` connection options.
- Migration (v0 → v1): new dialect, no v0 equivalent — the CockroachDB dialect (`drizzle-orm/cockroach`, `cockroach-core`) was added as part of the v1 release.

## Related

- [Database connection overview](./connect-overview.md)
- [PostgreSQL](./get-started-postgresql.md)
