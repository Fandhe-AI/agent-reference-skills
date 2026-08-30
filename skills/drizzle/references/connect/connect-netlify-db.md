---
source: https://orm.drizzle.team/docs/connect-netlify-db
---

# Drizzle <> Netlify Database

Drizzle has native support for Netlify Database, a managed Postgres database. The driver (developed and maintained by the Netlify team) intelligently selects the optimal underlying Postgres driver based on the runtime environment — HTTP-based queries in serverless functions, persistent `node-postgres` connections in server mode.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/netlify-db';

// Connection string is set automatically by the platform
const db = drizzle();

const result = await db.execute('select 1');
```

```ts
import { drizzle } from 'drizzle-orm/netlify-db';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an explicit client (consumer controls the driver):

```ts
import { drizzle } from 'drizzle-orm/netlify-db';

const db = drizzle({ client: netlifyDbClient });
```

## Notes

- Transcribed from `pg/connect-netlify-db.mdx`.
- Zero-config mode (`drizzle()`) relies on the connection string being set automatically by the Netlify platform.
- The adapter abstracts the choice between HTTP-based (serverless functions) and persistent (server mode) connections so consumers can write `drizzle()` once.
- Migration (v0 → v1): new driver, no v0 equivalent — Netlify Database support was added as part of the v1 release.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
