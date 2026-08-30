---
source: https://orm.drizzle.team/docs/upgrade-v1
---

# Upgrading to Drizzle v1

Step-by-step procedure for migrating a `drizzle-orm@0.x` / `drizzle-kit@0.x` project to the v1 release candidate.

## Signature / Usage

```bash
npm i drizzle-orm@rc
npm i -D drizzle-kit@rc
```

```bash
# Step 1 - migrate the migrations folder to the new (v3) structure
npx drizzle-kit up
```

## Notes

- Migration (v0 → v1): the migration folder structure changed — `journal.json` is removed, SQL files and DDL snapshots are grouped into separate per-migration folders (instead of database snapshots), and the `drizzle-kit drop` command is removed. Run `drizzle-kit up` once to convert an existing project.
- Migration (v0 → v1): `drizzle-kit` gained commutativity checks that detect non-commutative migrations across branches (see discussion #5005).
- Migration (v0 → v1): the full breaking-change list lives in `v0-v1-changes` (this skill's `v0-v1-changes.md`).
- Migration (v0 → v1): projects using Relational Queries (RQB) must additionally migrate to the v2 `defineRelations()` API — schema definition and query migration guidance is in `relations-v1-v2` (see `relations` reference), not reproduced here.
- Transcribed from root `upgrade-v1.mdx`.

## Related

- [v0-v1-changes](./v0-v1-changes.md)
- [relations-v1-v2](../relational-queries/relations-v1-v2.md)
