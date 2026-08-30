---
source: https://orm.drizzle.team/docs/mysql/get-started-mysql
---

# MySQL drivers (mysql2 / PlanetScale / TiDB)

Drizzle ORM's MySQL dialect driver options: `mysql2` (TCP), PlanetScale MySQL (`@planetscale/database` over HTTP), and TiDB Serverless (`@tidbcloud/serverless` over HTTP).

## Signature / Usage

```ts
// mysql2
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle(process.env.DATABASE_URL);

const response = await db.select().from(/* ... */);
```

```ts
// mysql2 — providing an existing client/pool
import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
  host: 'host',
  user: 'user',
  database: 'database',
});

const db = drizzle({ client: poolConnection });
```

```ts
// PlanetScale MySQL (Vitess), over HTTP
import { drizzle } from 'drizzle-orm/planetscale-serverless';

const db = drizzle({
  connection: {
    host: process.env['DATABASE_HOST'],
    username: process.env['DATABASE_USERNAME'],
    password: process.env['DATABASE_PASSWORD'],
  },
});

const response = await db.select().from(/* ... */);
```

```ts
// TiDB Serverless, over HTTP (edge-compatible)
import { drizzle } from 'drizzle-orm/tidb-serverless';

const db = drizzle({ connection: { url: process.env.TIDB_URL } });

const response = await db.select().from(/* ... */);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `drizzle-orm/mysql2` | package | Native `mysql2` client/pool driver |
| `drizzle-orm/planetscale-serverless` | package | PlanetScale MySQL over HTTP, via `@planetscale/database` |
| `drizzle-orm/tidb-serverless` | package | TiDB Serverless over HTTP, via `@tidbcloud/serverless` |

## Notes

- Transcribed from `mysql/get-started-mysql.mdx`, `mysql/connect-planetscale.mdx`, `mysql/connect-tidb.mdx`.
- For the built-in `migrate` function with DDL migrations, `mysql2` users are strongly encouraged to use a single `client` connection rather than a `pool` (querying can use either).
- PlanetScale MySQL can also be accessed over TCP with the `mysql2` driver instead of the HTTP driver.
- PlanetScale offers both MySQL (Vitess) and PostgreSQL; for PlanetScale Postgres, see the separate `connect-planetscale-postgres` page.
- TiDB Serverless is MySQL-compatible, so the standard MySQL connection guide also applies; `tidb-serverless` specifically targets edge environments via its HTTP driver.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [SQLite drivers](./sqlite-drivers.md)
- [Database connection overview](./connect-overview.md)
