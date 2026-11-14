---
source: https://orm.drizzle.team/docs/kit-overview
---

# Migrations with Drizzle Kit

**Drizzle Kit** is a CLI tool for managing SQL database migrations with Drizzle. Install with `npm i -D drizzle-kit`.

## Signature / Usage

```bash
drizzle-kit generate
drizzle-kit migrate
drizzle-kit push
drizzle-kit pull
drizzle-kit check
drizzle-kit up
drizzle-kit studio
drizzle-kit export
```

Configured through [drizzle.config.ts](./drizzle-config-file.md) or CLI params. At minimum, `dialect` and `schema` must be provided.

```ts
import { defineConfig } from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./src/schema.ts",
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `generate` | command | Generates SQL migration files based on your Drizzle schema |
| `migrate` | command | Applies generated SQL migration files to your database |
| `pull` | command | Introspects database schema, converts it to Drizzle schema, saves to codebase |
| `push` | command | Pushes Drizzle schema directly to the database |
| `studio` | command | Connects to your database and spins up a proxy server for Drizzle Studio |
| `check` | command | Walks through all generated migrations and checks for race conditions (collisions) |
| `up` | command | Upgrades snapshots of previously generated migrations |
| `export` | command | Converts a TypeScript schema into raw SQL DDL and prints it out |

You can provide a config path via `--config` CLI param, useful for multiple database stages:

```bash
drizzle-kit push --config=drizzle-dev.drizzle.config
drizzle-kit push --config=drizzle-prod.drizzle.config
```

## Notes

- Migration (v0 → v1): drizzle-kit received a full architectural rewrite — migrated from database snapshots to DDL snapshots, reworked diff detection/application, schema introspection reduced from ~10s to <1s, added query hints and explain support for push. `meta/_journal.json` is removed; SQL files and snapshots are now grouped into separate per-migration folders. `drizzle-kit drop` command has been removed.

### rc.4 / rc.5 additions

- Migration (rc.3 → rc.4): `--output text|json` (machine-readable envelope, non-interactive) on `generate`, `push`, `pull`, `up`, `export`, `check`; unresolved renames and data-loss confirmations are supplied through `--hints` / `--hints-file`; a programmatic SDK at the `drizzle-kit/cli` subpath (`generate()`, `push()`, `pull()`, `up()`, `exportSql()`, `check()`); `drizzle-kit mcp` (MCP server over stdio) and `drizzle-kit skills` (bundled Agent Skills installer). See the `agents` category for the MCP server, bundled skill and setup prompt.
- Migration (rc.4 → rc.5): the bundled agent skills are one skill named `drizzle`; `drizzle-kit skills` removes the seven older skills (`drizzle-generate`, `drizzle-push`, `drizzle-pull`, `drizzle-migrations`, `drizzle-hints`, `drizzle-output-modes`, `drizzle-responses-and-errors`). `generateMigration` / `pushSchema` from `drizzle-kit/payload/*` and `drizzle-kit/api-postgres` accept `{ hints }` as the last argument and throw `code: 'missing_hints'` when a decision has no hint. PGLite custom options are supported; `drizzle-orm` is listed as a peer dependency.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc4 and https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

- [drizzle-kit-generate](./drizzle-kit-generate.md)
- [drizzle-kit-migrate](./drizzle-kit-migrate.md)
- [drizzle-config-file](./drizzle-config-file.md)
