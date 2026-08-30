---
source: https://orm.drizzle.team/docs/get-started/postgresql-new
---

# Get Started with Drizzle (PostgreSQL)

Quick-start flow for wiring Drizzle ORM to a PostgreSQL database with the `node-postgres` driver (pg is the canonical dialect for this skill; other dialects follow the same step shape — see Notes).

## Signature / Usage

```bash
npm i drizzle-orm pg
npm i -D drizzle-kit @types/pg
```

```ts
// src/db/schema.ts
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
});
```

```ts
// src/index.ts
import 'dotenv/config';
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.DATABASE_URL!);
```

## Options / Props

| Step | Description |
| --- | --- |
| 1. Install packages | `pg` (driver) + `@types/pg`, `drizzle-orm`, `drizzle-kit` |
| 2. Setup connection variables | Set `DATABASE_URL` in `.env` |
| 3. Connect Drizzle ORM | `drizzle(process.env.DATABASE_URL!)` from `drizzle-orm/node-postgres` |
| 4. Create a table | Define schema with `pgTable` in `src/db/schema.ts` |
| 5. Setup `drizzle.config.ts` | `dialect: 'postgresql'`, points at schema + `DATABASE_URL` |
| 6. Apply changes | `npx drizzle-kit push` (or `generate` + `migrate`, see `kit-overview`) |
| 7. Seed and query | Use `db.insert()` / `db.select()` against the connected `db` |
| 8. Run | `npx tsx src/index.ts` |

## Notes

- Drizzle also natively supports `postgres.js` as an alternative PostgreSQL driver; `node-postgres` (`pg`) is used in the canonical quick start. The separate `/docs/get-started-postgresql` page ("Drizzle <> PostgreSQL") compares `node-postgres` vs `postgres.js` connection setup in more depth — it is not this quick-start page.
- An "existing project" flow (`/docs/get-started/postgresql-existing`) replaces the "create a table" step with `drizzle-kit introspect` (pull the schema from an existing database) and adds a transfer-code step plus an optional "update schema" round trip; the new-project and existing-project flows otherwise share the same steps (install, env, config, connect, query, run).
- Other dialects (MySQL, SQLite, SingleStore, MSSQL, CockroachDB, and edge/serverless targets like Neon, Supabase, Vercel Postgres, PGLite, Bun SQL, Turso, D1, Expo SQLite, Gel) each have their own `get-started/<dialect>-{new,existing}.mdx` quick start with the same step shape (install → env → connect → schema → config → migrate/push → query → run); driver import paths differ, e.g. `drizzle-orm/mysql2`, `drizzle-orm/better-sqlite3`, `drizzle-orm/neon-http`, `drizzle-orm/node-mssql`, `drizzle-orm/cockroach`.
- The low-level `node-mssql` driver client itself is covered by the separate `mssql` skill; Drizzle's MSSQL dialect (`drizzle-orm/node-mssql`) wraps it.

## Related

- [overview](./overview.md)
