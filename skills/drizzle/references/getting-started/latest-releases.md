---
source:
  - https://orm.drizzle.team/docs/latest-releases
  - https://github.com/drizzle-team/drizzle-orm/releases/tag/v1.0.0-rc.4
---

# Latest Releases

The docs site's `/docs/latest-releases` page renders a dynamic `<LatestReleases/>` component (the page source contains only that component, no release text). Release notes for the pinned version are taken from GitHub Releases: `v1.0.0-rc.4` (published 2026-06-27, prerelease).

## Signature / Usage

```ts
// v1.0.0-rc.4: typed `sql` operator keeps nullability; `.nullable()` adds `| null` to the output type
sql<Type | null>`...`.mapWith((v: Type) => String(v)) // Output type: string | null
sql`...`.mapWith((v: unknown) => new Type(v)).nullable() // Output type: Type | null
```

## Options / Props

| Highlight (v1.0.0-rc.4) | Description |
| --- | --- |
| SQLite RQBv1 removed | RQBv2 only; RQBv1 `TSchema` / `TFullSchema` generics removed from `sqlite` entities |
| SQLite split | `async` and `effect` versions (`sync` remains a subtype of `async`); `SQLiteSyncDialect` / `SQLiteAsyncDialect` removed, generic migrators moved to `sqlite-core/async/session` as `migrateSync` / `migrateAsync` |
| MySQL split | `async` and `effect` versions; codec system added to `mysql` |
| Set operators (PG, MySQL) | Codec handling improved; queries emitted as `SELECT ... FROM ([QUERY 1] UNION [QUERY 2]) "drizzle_union"` |
| `db.insert(table).select(...)` | Column order match no longer required; selection may skip columns with defaults or nullability |
| Drivers | Added `@tursodatabase/serverless` and `@tursodatabase/sync` driver support; `@tursodatabase/database` / `database-wasm` updated to v0.6.0 |

## Notes

- Migration (v0 → v1): this page is a release-note summary, not a migration guide; see `upgrade-v1` and `v0-v1-changes` for the consolidated migration steps, and `relations-v1-v2` for RQBv1 → RQBv2.
- The release notes for `rc.4` are on GitHub Releases only; the docs-site page does not list them as static text.
- This is a summary; the source also lists many individual bug fixes and issue links that are not reproduced here.
- Dates and versions of earlier betas/RCs are not reproduced because they could not be verified against the pinned sources.

## Related

- [get-started](./get-started.md)
