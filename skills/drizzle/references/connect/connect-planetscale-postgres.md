---
source: https://orm.drizzle.team/docs/connect-planetscale-postgres
---

# Drizzle <> PlanetScale Postgres

PlanetScale offers both MySQL (Vitess) and PostgreSQL databases; this page covers PlanetScale Postgres, reachable via the standard `node-postgres` driver or the `@neondatabase/serverless` driver for serverless environments.

## Signature / Usage

```ts
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL);

const result = await db.execute('select 1');
```

```ts
// Neon HTTP mode — required config for PlanetScale Postgres connections
import { neon, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

neonConfig.fetchEndpoint = (host) => `https://${host}/sql`;

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle({ client: sql });

const result = await db.execute('select 1');
```

## Notes

- Transcribed from `pg/connect-planetscale-postgres.mdx`.
- For PlanetScale MySQL, see the separate MySQL connection page (`connect-planetscale`, PlanetScale MySQL) — do not confuse it with this Postgres page.
- Connection URL format: `postgresql://{username}:{password}@{host}:{port}/postgres?sslmode=verify-full`.
- Port `5432` is a direct connection; port `6432` connects via PgBouncer for connection pooling (recommended for many simultaneous connections).
- Neon serverless driver mode: HTTP mode is faster for single/non-interactive queries; WebSocket mode is required for interactive transactions or session-based features, and needs `neonConfig.pipelineConnect = false` and `neonConfig.wsProxy` set for PlanetScale Postgres.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Neon](./connect-neon.md)
- [MySQL drivers](./mysql-drivers.md)
- [Database connection overview](./connect-overview.md)
