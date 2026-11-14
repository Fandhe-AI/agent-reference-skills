---
source: https://orm.drizzle.team/docs/drizzle-kit-generate
---

# `drizzle-kit generate`

Generates SQL migrations based on your Drizzle schema upon declaration or on subsequent schema changes (code-first migrations approach).

## Signature / Usage

```bash
npx drizzle-kit generate --dialect=postgresql --schema=./src/schema.ts
```

Requires both `dialect` and `schema`, either via `drizzle.config.ts` or CLI options.

```ts
// drizzle.config.ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});
```

It reads the Drizzle schema file(s), composes a JSON snapshot, compares it to the most recent previous snapshot, generates SQL migrations from the diff, and saves `migration.sql` and `snapshot.json` in a timestamped folder under `out` (default `./drizzle`).

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `dialect` | string | — (required) | Database dialect |
| `schema` | string / string[] | — (required) | Path to TypeScript schema file(s) or folder(s) |
| `driver` | `aws-data-api` \| `pglite` | — | Driver exception when the dialect's default driver doesn't apply |
| `out` | string | `./drizzle` | Migrations output folder |
| `config` | string | `drizzle.config.ts` | Configuration file path |
| `breakpoints` | boolean | `true` | SQL statement breakpoints |
| `name` | string | — | Custom migration file/folder name |
| `custom` | boolean | `false` | Generate an empty SQL migration for hand-written DDL or data seeding |
| `ignore-conflicts` | boolean | `false` | Skip commutativity conflict checks between migration branches |

## Notes

- Custom migrations: `drizzle-kit generate --custom --name=seed-users` creates an empty migration file for DDL not yet supported by Drizzle Kit, or data seeding. See `kit-custom-migrations`.
- Migration (v0 → v1): `generate` now performs migration branch commutativity/conflict detection (the same mechanism as `drizzle-kit check`); use `--ignore-conflicts` to bypass it. Output layout changed from a single `meta/_journal.json` + flat `.sql` files to one folder per migration containing `migration.sql` and `snapshot.json`.

### rc.5 changes

- Migration (rc.4 → rc.5): the `postgresql` dialect rejects `--ignore-conflicts` in `generate`, `check` and `migrate`; `drizzle-kit generate --fix-conflicts` replaces it. Preview the repair with `--explain` (shows the SQL and migration folders it would delete without changing files). The repair deletes the conflicting migrations and their children, then generates one replacement migration, so any database that ran a deleted migration must be reset.
- Migration (rc.4 → rc.5): PostgreSQL snapshots are incremental (first snapshot = full schema, later snapshots = structured diffs and commutativity metadata). `generate` no longer drops column alterations when a same-named column is renamed in another table, and no longer emits `DROP COLUMN` before `DROP INDEX`.

```shell
drizzle-kit generate --fix-conflicts --explain
```

- Source: https://orm.drizzle.team/docs/v0-v1-changes and https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [drizzle-kit-migrate](./drizzle-kit-migrate.md)
- [kit-custom-migrations](./kit-custom-migrations.md)
- [drizzle-config-file](./drizzle-config-file.md)
