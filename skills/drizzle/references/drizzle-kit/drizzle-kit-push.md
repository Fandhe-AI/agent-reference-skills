---
source: https://orm.drizzle.team/docs/drizzle-kit-push
---

# `drizzle-kit push`

Pushes your schema and subsequent schema changes directly to the database, skipping SQL file generation (code-first migrations approach). Good for rapid prototyping and pairs well with blue/green deployment and serverless databases (PlanetScale, Neon, Turso).

## Signature / Usage

```bash
npx drizzle-kit push --dialect=postgresql --schema=./src/schema.ts --url=postgresql://user:password@host:port/dbname
```

Requires `dialect`, `schema`, and database connection credentials, either via `drizzle.config.ts` or CLI options.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
  dbCredentials: {
    url: "postgresql://user:password@host:port/dbname",
  },
});
```

Under the hood: reads the schema and composes a JSON snapshot, introspects the current database schema, diffs the two, generates SQL alterations, and applies them directly.

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dialect` | string | — (required) | Database dialect |
| `schema` | string | — (required) | Path to TypeScript schema file(s) or folder(s) |
| `driver` | string | — | Driver exception, e.g. `aws-data-api`, `pglite` |
| `tablesFilter` | string / string[] | `"*"` | Glob-based table name filter |
| `schemaFilter` | string[] | `["*"]` | Schema name filter |
| `extensionsFilters` | string[] | `[]` | Installed database extensions whose own tables should be ignored |
| `url` | string | — | Database connection string |
| `user` / `password` / `host` / `port` / `database` | string | — | Individual connection params |
| `config` | string | `drizzle.config.ts` | Configuration file path |
| `verbose` | boolean | — | Print all SQL statements prior to execution (CLI-only) |
| `explain` | boolean | — | Print planned SQL changes without applying them, i.e. dry run (CLI-only) |
| `force` | boolean | — | Auto-accept all data-loss statements (CLI-only) |

## Notes

- Migration (v0 → v1): `schemaFilter` now defaults to **all schemas** (previously only `public` by default) and supports glob patterns (e.g. `"app_*"`). The `--strict` flag has been removed — confirmation-prompting for data-loss statements is now always the default unless `--force` is passed; use `--explain` to preview SQL before running.

### rc.5 changes

- Migration (rc.4 → rc.5): `push` asks to confirm a dropped column only when the column has a non-null value (earlier, PostgreSQL, CockroachDB, MySQL, SingleStore and SQLite asked when the table had a row). Data loss warnings use the same texts in all dialects, quote every name as in SQL, show the table under the name the database has before the push, and add `(would become ...)` when the push renames or moves it. A data loss check on a renamed table, a table moved to another schema or a table in a renamed schema no longer fails with a database error.
- Migration (rc.4 → rc.5): SQLite push no longer glues a table's FOREIGN KEY clause onto a generated-column `ALTER ADD`, and table recreation keeps `UNIQUE` on a column that also has a plain index; with `provider: "neon"` push no longer tries to drop Neon system roles.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [drizzle-kit-generate](./drizzle-kit-generate.md)
- [drizzle-kit-pull](./drizzle-kit-pull.md)
- [drizzle-config-file](./drizzle-config-file.md)
