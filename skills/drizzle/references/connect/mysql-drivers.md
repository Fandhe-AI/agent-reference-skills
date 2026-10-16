---
source: https://orm.drizzle.team/docs/mysql/get-started-mysql
---

# MySQL drivers (mysql2 / PlanetScale / TiDB / Appwrite / Bun SQL)

Drizzle ORM's MySQL dialect driver options: `mysql2` (TCP; also used for Appwrite MySQL), PlanetScale MySQL (`@planetscale/database` over HTTP), TiDB Serverless (`@tidbcloud/serverless` over HTTP), and Bun SQL (`drizzle-orm/bun-sql/mysql`).

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

```ts
// Bun SQL (MySQL) — separate subpath from the Postgres `drizzle-orm/bun-sql`
import { drizzle } from 'drizzle-orm/bun-sql/mysql';

const db = drizzle(process.env.DATABASE_URL);
```

```ts
// Appwrite MySQL — no Appwrite-specific driver; use mysql2 with explicit TLS options when needed
import { drizzle } from 'drizzle-orm/mysql2';

const db = drizzle({ connection: { uri: process.env.DATABASE_URL, ssl: { rejectUnauthorized: true } } });
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `drizzle-orm/mysql2` | package | Native `mysql2` client/pool driver |
| `drizzle-orm/planetscale-serverless` | package | PlanetScale MySQL over HTTP, via `@planetscale/database` |
| `drizzle-orm/tidb-serverless` | package | TiDB Serverless over HTTP, via `@tidbcloud/serverless` |
| `drizzle-orm/bun-sql/mysql` | package | Bun's built-in `bun sql` module for MySQL; `new SQL(url)` can be passed as `{ client }` |
| Appwrite MySQL | provider | No dedicated package; connect with `mysql2` through `drizzle-orm/mysql2` |

## Notes

- Transcribed from `mysql/get-started-mysql.mdx`, `mysql/connect-planetscale.mdx`, `mysql/connect-tidb.mdx`, `mysql/connect-appwrite-mysql.mdx`, `mysql/connect-bun-sql.mdx`, `mysql/connect-aws-data-api-mysql.mdx`.
- Appwrite MySQL: native MySQL database over TLS, no Appwrite-specific driver. The username is `admin.<hash>` (the hash matches the hostname), the database name is always `default`, and the connection string ends with `?ssl=true`. If the runtime does not infer TLS, pass `ssl: { rejectUnauthorized: true }`. A connection pooler (transaction mode) listens on port `6033` of the same hostname; use the direct engine port `3306` (e.g. a `DIRECT_URL` in `drizzle.config.ts`) for Drizzle Kit migrations and introspection. Under transaction pooling, explicit prepared queries, user variables and temporary tables are unavailable.
- Bun SQL (MySQL) uses `drizzle-orm/bun-sql/mysql`, a different subpath from the Postgres `drizzle-orm/bun-sql`.
- AWS Data API for MySQL: the official page is a stub stating it is not implemented in Drizzle ORM.
- For the built-in `migrate` function with DDL migrations, `mysql2` users are strongly encouraged to use a single `client` connection rather than a `pool` (querying can use either).
- PlanetScale MySQL can also be accessed over TCP with the `mysql2` driver instead of the HTTP driver.
- PlanetScale offers both MySQL (Vitess) and PostgreSQL; for PlanetScale Postgres, see the separate `connect-planetscale-postgres` page.
- TiDB Serverless is MySQL-compatible, so the standard MySQL connection guide also applies; `tidb-serverless` specifically targets edge environments via its HTTP driver.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [SQLite drivers](./sqlite-drivers.md)
- [Database connection overview](./connect-overview.md)
