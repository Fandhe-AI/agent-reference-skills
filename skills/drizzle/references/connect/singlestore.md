---
source: https://orm.drizzle.team/docs/singlestore/get-started-singlestore
---

# Drizzle <> SingleStore

Drizzle ORM natively supports SingleStore using the `mysql2` driver via the `drizzle-orm/singlestore` package.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/singlestore';

const db = drizzle(process.env.DATABASE_URL);

const response = await db.select().from(/* ... */);
```

Providing an existing driver instance:

```ts
import { drizzle } from 'drizzle-orm/singlestore';
import mysql from 'mysql2/promise';

const poolConnection = mysql.createPool({
  host: 'host',
  user: 'user',
  database: 'database',
});

const db = drizzle({ client: poolConnection });
```

## Notes

- Transcribed from `singlestore/get-started-singlestore.mdx`.
- For the built-in `migrate` function with DDL migrations, a single `client` connection is strongly encouraged over a `pool` (querying can use either).
- SingleStore dialect limitations: `serial` column type only ensures uniqueness (not auto-increment behavior); `ORDER BY` and `LIMIT` cannot be chained together; foreign keys are not supported; `INTERSECT ALL`/`EXCEPT ALL` are unsupported; nested transactions are unsupported; only one `isolationLevel` is supported; the FSP option on `DATE`/`TIMESTAMP`/`DATETIME` is unsupported; the relational query API is not yet supported.

## Related

- [Database connection overview](./connect-overview.md)
- [MySQL drivers](./mysql-drivers.md)
