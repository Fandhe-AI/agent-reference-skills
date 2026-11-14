---
source:
  - https://orm.drizzle.team/docs/latest-releases
  - https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5
  - https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc4
  - https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.5
  - https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.4
---

# Latest Releases

The docs site's `/docs/latest-releases` index page renders a dynamic `<LatestReleases/>` component (no release text in its source). Static release-note pages exist at `/docs/latest-releases/drizzle-orm-v1rc5` (pubDate 2026-10-21) and `/docs/latest-releases/drizzle-orm-v1rc4` (pubDate 2026-06-27); this page summarizes both (docs repo commit 55f7f9e, retrieved 2026-11-14).

## Signature / Usage

```ts
// v1.0.0-rc.5: explicit `undefined` in relational filters throws; EmptyFilter marks an intentionally absent filter
import { EmptyFilter } from 'drizzle-orm/relations'
db.query.users.findMany({ where: { isActive: params.isActive ?? EmptyFilter } })

// v1.0.0-rc.5: order by related rows
db.query.users.findMany({ orderBy: { posts: 'asc(count)' } })

// v1.0.0-rc.4: typed `sql` operator keeps nullability; `.nullable()` adds `| null` to the output type
sql<Type | null>`...`.mapWith((v: Type) => String(v)) // Output type: string | null
sql`...`.mapWith((v: unknown) => new Type(v)).nullable() // Output type: Type | null
```

## Options / Props

| Highlight (v1.0.0-rc.5, 2026-10-21) | Description |
| --- | --- |
| `postgres-js` | Transparent parsers set by `drizzle()` no longer break the driver's own serializers for `timestamptz`, `timestamp`, `date`, `time`, `json`, `jsonb`; remove manual `JSON.stringify` workarounds, use `sql.param(jsonArrayValue)` for JSON arrays |
| Relational filters | `undefined` in `where` throws; `EmptyFilter` from `drizzle-orm/relations`; `{}` relation filters are skipped; `true` / `false` check presence / absence |
| RQBv2 | New query build strategy for `mysql` / `postgres` / `cockroach` / `mssql` (`strategy: 'basic'` opts out); ordering by relations; `withCache`; `Subquery` as relational entity; `mssql` and `cockroach` migrated to RQBv2 |
| `withReplicas` | Every query goes to the primary by default; `db.$replica` for replica reads |
| Errors | `DrizzleQueryError` omits `params` by default; `paramsInErrors` option on `drizzle()` |
| `sqlite-proxy` | `SqliteProxyExecutors` (`run` / `all` / `get` / optional `batch`) replace `callback` / `batchCallback`; `rowMode`; `get` returns `data \| undefined` |
| Exports | `View` exports moved to `drizzle-orm/view`; `StringChunk` / `commonStringChunks` moved to `drizzle-orm/sql/common-chunks` |
| `db.insert` | Optional explicit column list: `db.insert(users, 'name', 'email')` |
| `db.execute` | Reworked types (`db.execute<never>`, `db.execute<ReturnedObject>`) |
| Drivers | Aurora DSQL adapters for `postgres-js` and `node-postgres`; `expo-sqlite/async`; `op-sqlite` v17; transaction configs for Turso Database drivers |
| Drizzle Kit | Incremental PostgreSQL snapshots; `--fix-conflicts` replaces `--ignore-conflicts` for `postgresql`; `push` confirms dropped columns only for non-null values; bundled agent skills merged into one `drizzle` skill; `hints` for `generateMigration` / `pushSchema` |

| Highlight (v1.0.0-rc.4, 2026-06-27) | Description |
| --- | --- |
| SQLite RQBv1 removed | RQBv2 only; RQBv1 `TSchema` / `TFullSchema` generics removed from `sqlite` entities |
| SQLite split | `async` and `effect` versions (`sync` remains a subtype of `async`); `SQLiteSyncDialect` / `SQLiteAsyncDialect` removed, generic migrators moved to `sqlite-core/async/session` as `migrateSync` / `migrateAsync` |
| MySQL split | `async` and `effect` versions; codec system added to `mysql` |
| Set operators (PG, MySQL) | Codec handling improved; queries emitted as `SELECT ... FROM ([QUERY 1] UNION [QUERY 2]) "drizzle_union"` |
| `db.insert(table).select(...)` | Column order match no longer required; selection may skip columns with defaults or nullability |
| Drivers | Added `@tursodatabase/serverless` and `@tursodatabase/sync` driver support; `@tursodatabase/database` / `database-wasm` updated to v0.6.0 |

## Notes

- Migration (v0 → v1): this page is a release-note summary, not a migration guide; see `upgrade-v1` and `v0-v1-changes` for the consolidated migration steps, and `relations-v1-v2` for RQBv1 → RQBv2.
- Earlier revisions of this page said the `rc.4` notes were only on GitHub Releases; at docs commit 55f7f9e the docs site carries static pages for both `rc.4` and `rc.5`.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 and https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc4 (docs repo commit 55f7f9e, retrieved 2026-11-14)
- Drizzle Kit rc.4 additions (`--output json`, `drizzle-kit mcp`, `drizzle-kit skills`) are summarized in `references/drizzle-kit/kit-overview.md` and the `agents` category.
- This is a summary; the source also lists many individual bug fixes and issue links that are not reproduced here.
- Dates and versions of earlier betas/RCs are not reproduced because they could not be verified against the pinned sources.

## Related

- [get-started](./get-started.md)
