---
source: https://orm.drizzle.team/docs/mssql/get-started-mssql
---

# Drizzle <> MSSQL

Drizzle has native support for MSSQL connections with the `mssql` driver via the `drizzle-orm/node-mssql` package.

## Signature / Usage

```ts
// Make sure to install the 'mssql' package
import { drizzle } from 'drizzle-orm/node-mssql';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/node-mssql';
import { connect } from 'mssql';

const pool = await connect(process.env.DATABASE_URL!);
const db = drizzle({ client: pool });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `mssql/get-started-mssql.mdx`.
- Because `node-mssql` requires `await` on `Pool` initialization, each request must be awaited unless an existing `Pool` instance is supplied to Drizzle. To access `db.$client` in that case, `await db.$client.$instance()` first.
- The low-level `node-mssql` driver client itself (connection options, `Request`/`Transaction` APIs, error types) is covered by the separate `mssql` skill; this page covers only the Drizzle ORM connection layer built on top of it.
- Migration (v0 → v1): new dialect, no v0 equivalent — the MSSQL dialect (`drizzle-orm/node-mssql`, `mssql-core`) was added as part of the v1 release.

## Related

- [Database connection overview](./connect-overview.md)
