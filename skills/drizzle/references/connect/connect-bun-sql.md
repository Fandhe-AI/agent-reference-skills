---
source: https://orm.drizzle.team/docs/connect-bun-sql
---

# Drizzle <> Bun SQL

Drizzle ORM natively supports Bun's built-in `bun sql` module (native bindings for PostgreSQL) via the `drizzle-orm/bun-sql` package.

## Signature / Usage

```ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.select().from(/* ... */);
```

Providing an existing driver instance:

```ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/bun-sql';
import { SQL } from 'bun';

const client = new SQL(process.env.DATABASE_URL!);
const db = drizzle({ client });
```

## Notes

- Transcribed from `pg/connect-bun-sql.mdx`.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
