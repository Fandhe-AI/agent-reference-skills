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

### rc.5 changes

- Migration (rc.4 → rc.5): `postgres-js` transparent parsers set by `drizzle()` constructors no longer override the driver's own serializers for `timestamptz`, `timestamp`, `date`, `time`, `json`, `jsonb`. Remove any manual `JSON.stringify(jsonValue)` workaround in raw `sql` or raw driver calls to avoid double stringification.
- Migration (rc.4 → rc.5): Aurora DSQL adapters were added: `drizzle-orm/postgres-js/dsql` (with `@aws/aurora-dsql-postgresjs-connector`) and `drizzle-orm/node-postgres/dsql` (with `@aws/aurora-dsql-node-postgres-connector`). The release notes show no usage example; see the connectors' own documentation.
- Migration (rc.4 → rc.5): `node-postgres` transactions no longer leak the pool client on a rejected `BEGIN` or crash the process when the connection drops mid-transaction, and a failed `rollback` no longer replaces the original error. Transaction snapshot support was added for the `pg` dialect.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [Database connection overview](./connect-overview.md)
- [Neon](./connect-neon.md)
- [Supabase](./connect-supabase.md)
- [Vercel Postgres](./connect-vercel-postgres.md)
