---
source: https://orm.drizzle.team/docs/latest-releases
---

# Latest Releases

The docs site's `/docs/latest-releases` page renders a dynamic `<LatestReleases/>` component listing all release notes under `latest-releases/*.mdx`; the most recent entry as of this writing is `drizzle-orm-v1beta2.mdx` (2025-02-12, `v1.0.0-beta.2`).

## Signature / Usage

```ts
// MSSQL dialect (new in v1.0.0-beta.2)
import { drizzle } from 'drizzle-orm/node-mssql';

const db = drizzle(process.env.DATABASE_URL);
const result = await db.execute('select 1');
```

## Options / Props

| Highlight (v1.0.0-beta.2) | Description |
| --- | --- |
| MSSQL dialect | New in `drizzle-orm`, `drizzle-kit`, `drizzle-seed`; most columns/query-builder/migrations supported, RQBv2 not yet supported |
| CockroachDB dialect | New in `drizzle-orm`, `drizzle-kit`, `drizzle-seed` (import from `drizzle-orm/cockroach`); RQBv2 not yet supported |
| `defineRelationsPart` | Split relations config into multiple parts, merged into `drizzle({ relations: { ...relations, ...part } })` |
| Migration folders v3 | Removed `journal.json`, groups SQL + snapshots per migration folder, removed `drizzle-kit drop`; migrate old folders with `drizzle-kit up` |
| `drizzle-kit` rewrite | Snapshots moved to DDL-based diffing; introspection time cut from ~10s to <1s |
| `drizzle-kit pull --init` | Creates the Drizzle migrations table and marks the first pulled migration as applied |
| `schemaFilter` | Now manages all schemas referenced in code by default; supports glob patterns to filter |
| `.enableRLS()` | Deprecated in favor of `pgTable.withRLS('name', {...})` |
| Column alias | `.as('alias')` can now be called directly on a column, e.g. `users.age.as('ageOfUser')` |

## Notes

- Migration (v0 → v1): this release is the last beta before 1.0.0-rc — it already carries the DDL-snapshot migration rewrite, `drizzle-kit drop` removal, and MSSQL/CockroachDB dialect additions that this skill's target version (1.0.0-rc.5) builds on; see `upgrade-v1` and `v0-v1-changes` for the consolidated migration guide, and `relations-v1-v2` for the RQBv1 → RQBv2 migration.
- The release notes warn that "something will definitely break"; rollback path given in the source is downgrading to `1.0.0-beta.1` or `0.44.7`.
- This is a summary of the release; the source file also lists ~150 individual GitHub issue links under "Bugs fixed" that are not reproduced here.
- The low-level `node-mssql` driver client itself is covered by the separate `mssql` skill.

## Related

- [get-started](./get-started.md)
