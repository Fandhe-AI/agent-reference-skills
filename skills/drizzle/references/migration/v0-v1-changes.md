---
source: https://orm.drizzle.team/docs/v0-v1-changes
---

# Changes in v1

Full list of breaking changes and new features between `drizzle-orm@0.x` / `drizzle-kit@0.x` / `drizzle-seed@0.x` and `drizzle-orm@1.0` / `drizzle-kit@1.0` / `drizzle-seed@1.0`.

## Breaking changes

| Area | v0.x | v1.0 |
| --- | --- | --- |
| Relational Queries | RQB v1 | Removed. Use `defineRelations()` (RQB v2, see `relations-v1-v2` migration guide) |
| Casing | `drizzle({ casing: 'camelCase' })` | Table/view/schema-level API: `snakeCase.table` / `camelCase.table` / `.view` / `.materializedView` / `.schema` |
| Validator packages | `drizzle-zod`, `drizzle-valibot`, `drizzle-typebox`, `drizzle-arktype` (standalone) | Consolidated into `drizzle-orm/zod`, `drizzle-orm/valibot`, `drizzle-orm/typebox` (or `drizzle-orm/typebox-legacy`), `drizzle-orm/arktype`; new `drizzle-orm/effect-schema` added |
| `.array()` | Chainable: `column.array().array()` | String syntax: `column.array('[][]')` |
| `.enableRLS()` | `pgTable('users', {...}).enableRLS()` | Deprecated. Use `pgTable.withRLS('users', {...})` |
| `.generatedAlwaysAs()` | Accepted raw values | Only accepts a `sql` template literal or `() => sql` |
| `getTableColumns` | `getTableColumns(users)` | Deprecated. Use `getColumns(users)` |
| Migration folder structure | `journal.json` + database snapshots | No `journal.json`; SQL files/snapshots grouped per-migration folder (DDL snapshots); `drizzle-kit drop` removed |
| `schemaFilter` default | Only `public` schema managed by default | All schemas managed by default; glob patterns supported |
| Relational filters | `undefined` in `where` silently skipped (earlier v1 RCs) | rc.5: explicit `undefined` throws; use `EmptyFilter` from `drizzle-orm/relations`. Empty relation filters (`{ posts: {} }`) are skipped; `true` / `false` check presence / absence |
| Read replicas | `withReplicas()` routed reads such as `select()` and `db.query` to a replica | rc.5: every query goes to the primary by default; use `db.$replica` for replica reads |
| Query errors | `DrizzleQueryError` included query parameters | rc.5: parameters omitted by default; `paramsInErrors: true` in `drizzle()` re-enables them |
| `postgres-js` JSON | Manual `JSON.stringify()` workaround in raw SQL | rc.5: remove it (the driver serializes JSON itself); wrap JSON arrays in `sql.param(jsonArrayValue)` |
| Relational query SQL shape | Relation aliases reachable from raw SQL | rc.5: optimized strategy nests subqueries; raw SQL may need updating, or set `strategy: 'basic'` |
| SQLite proxy / `db.get()` | `drizzle(callback, config)`, rows wrapped in `{ rows }` | rc.5: `drizzle(executors, config)` with `run` / `all` / `get` (optional `batch`); `get` returns a row or `undefined` |
| `drizzle-kit push --strict` | Explicit flag | Removed; strict confirmation prompting is now default (use `--force` to skip, `--explain` to preview SQL) |

## New features (non-breaking)

```ts
// JIT mappers (opt-in)
const db = drizzle({ jit: true });
```

- **Codecs** — driver-aware transform layer normalizing requests/responses to/from the DB.
- **New MSSQL dialect** and **new CockroachDB dialect**.
- **New NetlifyDB driver** (maintained by the Netlify team).
- **Effect integration** — `@effect/sql-pg` driver support and Effect Schema validation via `drizzle-orm/effect-schema`.
- **SQLcommenter support** — `db.select().from(users).comment("my_first_tag")` appends a SQL comment to the query.
- **Column aliases via `.as()`** — e.g. `users.age.as('ageOfUser')`.
- `.prepare(name)` name argument is now optional.
- **Full `drizzle-kit` rewrite** — DDL snapshots instead of database snapshots, reworked diff detection, schema introspection reduced from ~10s to < 1s, query hints and explain support for push.
- **`drizzle-kit pull --init`** — creates the migration table and marks the first pulled migration as applied.
- **`drizzle-kit push --explain`** — shows the SQL that would run without executing it.
- **`drizzle-kit check` (commutativity check)** — detects non-commutative migrations across branches by building a DAG from snapshot `prevIds`, finding fork points, and diffing DDL per branch leaf.
- **`drizzle-kit --ignore-conflicts` flag** — bypasses commutativity checks (v1 betas / earlier RCs). As of rc.5 the `postgresql` dialect rejects `--ignore-conflicts` in `generate`, `check` and `migrate`; `drizzle-kit generate --fix-conflicts` replaces it.
- **`drizzle-kit generate`** — now identifies incompatible changes across migration branches. In rc.5 for PostgreSQL, preview the repair with `drizzle-kit generate --fix-conflicts --explain` (shows the SQL and migration folders that would be deleted without changing files); the repair deletes the conflicting migrations and their children and generates one replacement migration, so any database that ran a deleted migration must be reset.
- **Incremental PostgreSQL snapshots (rc.5)** — the initial snapshot stores the full schema and later snapshots store structured diffs; keep migration folders and their snapshots together in version control.
- **Drizzle Kit for scripts and agents (rc.5 docs)** — the Drizzle skill (`drizzle-kit skills`) and MCP server (`drizzle-kit mcp`) help a coding agent work with the project; `--output json` on `generate`, `push`, `pull`, `up`, `export`, `check` returns a structured, non-interactive response, with rename / data-loss decisions supplied through `--hints` or `--hints-file`. See the `agents` category.
- **Relational query ordering and caching (rc.5)** — RQBv2 can order by related rows (for example `orderBy: { posts: 'desc(count)' }`); with an `all`-strategy cache relational queries are cached by default (`withCache: false` opts out, `withCache: true` opts in).
- **Migration table updates** — two new columns added automatically on `drizzle-kit up`: `name` (full migration folder name) and `applied_at` (timestamp); existing rows backfilled via millis-match → hash-tiebreaker → hash-only fallback.
- **Migrator applies all missing migrations** — previously only migrations newer than the last applied one ran; now every missing migration is detected and applied regardless of timestamp ordering.
- **Top-level `await`** now supported in `drizzle.config.ts` and schema files on Node.js.
- **drizzle-kit build system** — migrated from `esbuild-register` to the `tsx` loader; native Bun and Deno launch support.
- **Schema file processing** — only `.js`, `.mjs`, `.cjs`, `.jsx`, `.ts`, `.mts`, `.cts`, `.tsx` files are processed; all other extensions are ignored.

## Notes

- Migration (v0 → v1): this page is the canonical breaking-change reference linked from `upgrade-v1`; follow `upgrade-v1` for the step-by-step upgrade procedure (run `drizzle-kit up` first).
- Migration (v0 → v1): mssql-core and cockroach-core are new dialects introduced in v1, not ports of pre-existing v0 dialects. The low-level `node-mssql` driver client itself (used under the new MSSQL dialect) is covered by the separate `mssql` skill.
- Migration (rc.4 → rc.5): the rows and bullets marked rc.5 were added from the pinned docs commit 55f7f9e; the official page lists them under "Breaking changes" and "Other features". Earlier text of this page that mentioned `--ignore-conflicts` as a generic flag describes the pre-rc.5 behavior and still applies to non-PostgreSQL dialects (the rc.5 release notes only name the `postgresql` dialect).
- Source: https://orm.drizzle.team/docs/v0-v1-changes and https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)
- Transcribed from `pg/v0-v1-changes.mdx` (dialect-specific source path; `source:` above uses the dialect-less rendered URL per this skill's pg-canonical convention).

## Related

- [upgrade-v1](./upgrade-v1.md)
