---
source: https://orm.drizzle.team/docs/connect-overview
---

# Database connection with Drizzle

Index of PostgreSQL drivers and providers supported by Drizzle ORM. Other SQL dialects (MySQL, SQLite, MSSQL, CockroachDB, SingleStore) have their own connection guides.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/<driver>';

const db = drizzle(process.env.DATABASE_URL);
```

## Notes

- Transcribed from `pg/connect-overview.mdx`.
- PostgreSQL connection docs: PostgreSQL (`get-started-postgresql`), PlanetScale Postgres, Neon, Vercel Postgres, Prisma Postgres, Supabase, Xata, PGLite, Nile, Bun SQL, Effect Postgres, Netlify Database, AWS Data API Postgres, Drizzle HTTP proxy.
- Every driver page follows the same pattern: install packages, then `drizzle(url)` or `drizzle({ client })` with an existing driver instance.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Drizzle HTTP proxy](./connect-drizzle-proxy.md)
- [MySQL drivers](./mysql-drivers.md)
- [SQLite drivers](./sqlite-drivers.md)
- [MSSQL](./mssql.md)
- [CockroachDB](./cockroach.md)
- [SingleStore](./singlestore.md)
