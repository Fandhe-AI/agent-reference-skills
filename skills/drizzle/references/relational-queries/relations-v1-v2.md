---
source: https://orm.drizzle.team/docs/relations-v1-v2
---

# Migrating to Relational Queries v2

Guide for migrating Relational Queries (RQB) schema definitions and queries from v1 to v2 (`defineRelations`), including automated migration via `drizzle-kit pull` and manual migration steps.

## Signature / Usage

```ts
// v2: relations.ts
import * as schema from './schema';
import { defineRelations } from 'drizzle-orm';

export const relations = defineRelations(schema, (r) => ({
  users: {
    invitee: r.one.users({ from: r.users.invitedBy, to: r.users.id }),
    posts: r.many.posts(),
  },
  posts: {
    author: r.one.users({ from: r.posts.authorId, to: r.users.id }),
  },
}));

// index.ts
import { relations } from './relations';
import { drizzle } from 'drizzle-orm/...';
const db = drizzle(process.env.DATABASE_URL, { relations });
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `drizzle-kit pull` | CLI | Generates a `drizzle/relations.ts` file already in v2 syntax; move it into your source tree and update the `schema` import |
| manual migration | — | Rewrite `relations(table, ({ one, many }) => ...)` calls as a single `defineRelations(schema, (r) => ({...}))` |

## Notes

- Migration (v0 → v1): API renames — `fields` → `from`, `references` → `to` (both now accept a single value or array); `relationName` → `alias`.
- Migration (v0 → v1): schema declaration consolidated — v1 no longer needs separate `relations(table, ...)` objects per table passed individually to `drizzle()`; a single `defineRelations(schema, (r) => ...)` (optionally split via `defineRelationsPart`) is passed as `relations`.
- Migration (v0 → v1): `many()` no longer requires a corresponding `one()` declaration on the other side.
- Migration (v0 → v1): new `optional: false` option makes a relation key non-nullable at the type level (not supported in v0).
- Migration (v0 → v1): new `through` API for many-to-many relations removes the need to query the junction table explicitly and map it out (previously via a `usersToGroups`-style intermediate `with`).
- Migration (v0 → v1): predefined `where` filters on relations (polymorphic-style) are new in v1; not supported in v0.
- Migration (v0 → v1): `where` moved from callback syntax `(users, { eq }) => eq(users.id, 1)` to object syntax `{ id: 1 }`; `orderBy` additionally accepts the object form `{ id: "asc" }`. As of the pinned docs commit 55f7f9e the official guide states that the `orderBy` callback form `(users, { asc }) => [asc(users.id)]` remains supported (an earlier revision described the object form as a replacement).
- Migration (v0 → v1): filtering by related tables in `where` (e.g. `where: { posts: { content: { like: 'M%' } } }`) and `offset` on nested `with` entries are both new in v1.
- Migration (v0 → v1): `mode` (e.g. `"planetscale"` / `"default"`) is no longer needed on `drizzle()` for MySQL dialects once using `relations`.
- Migration (v0 → v1): removed exports from `drizzle-orm` / `drizzle-orm/relations` — `Relations`, `TableRelationsKeysOnly`, `ExtractTableRelationsFromSchema`, `ExtractRelationsFromTableExtraConfigSchema`, `getOperators`, `FindTableByDBName`, `RelationalSchemaConfig`, `RelationConfig`, `extractTablesRelationalConfig`, `relations`, `createOne`, `createMany`, `NormalizedRelation`, `normalizeRelation`, `createTableRelationsHelpers`, `TableRelationsHelpers`.
- Migration (v0 → v1): `drizzle`/`session`/`migrator`/`transaction` types and `DrizzleConfig` were regenericized around `TRelations extends AnyRelations` instead of `TSchema`/`TFullSchema`.

### Migration (rc.4 → rc.5)

- Migration (rc.4 → rc.5): an explicit `undefined` in a relational `where` filter now throws. Omit the field, or use `EmptyFilter` from `drizzle-orm/relations` when skipping the condition is intentional. This concerns `db.query` filters, not conditional filters in the SQL query builder.

```ts
import { EmptyFilter } from 'drizzle-orm/relations';

const userId: number | undefined = undefined;

const response = await db.query.users.findMany({
  where: {
    id: userId ?? EmptyFilter,
  },
});
```

- Migration (rc.4 → rc.5): relation existence filters. `where: { posts: true }` requires at least one related row, `where: { posts: false }` requires none, and `where: { posts: {} }` (or an object with only empty conditions) is now skipped instead of generating an `exists (...)` check.

```ts
// Users with at least one post
const usersWithPosts = await db.query.users.findMany({
  where: { posts: true },
});
// Users without posts
const usersWithoutPosts = await db.query.users.findMany({
  where: { posts: false },
});
```

- Migration (rc.4 → rc.5): ordering by related rows is new. For a `many` relation specify an aggregate (`orderBy: { posts: { id: 'desc(max)' } }`); for a `one` relation use the field's direction directly (`orderBy: { author: { name: 'asc' } }` when querying posts).

```ts
const usersByPostCount = await db.query.users.findMany({
  orderBy: { posts: 'desc(count)' },
});
```

- Migration (rc.4 → rc.5): the default `optimized` query strategy can nest relation subqueries differently, so raw SQL in `where` / `orderBy` that refers directly to generated relation aliases may stop working. Prefer relation filters and ordering, or opt out per root query with `strategy: 'basic'`.

```ts
const response = await db.query.users.findMany({
  strategy: 'basic',
  with: { posts: true },
});
```

- Migration (v0 → v1): the official guide notes that the `_relations` module still exists in rc.5 but RQB v1 support has been removed from the database drivers; use `import { defineRelations } from 'drizzle-orm'`. The guide's "before" examples now import `relations` from `drizzle-orm` (0.x); early v1 betas exposed it as `drizzle-orm/_relations`.
- Source: https://orm.drizzle.team/docs/relations-v1-v2 (docs repo commit 55f7f9e, retrieved 2026-11-14); `optional: false` only removes `null` from the related value's inferred type and creates no database constraint.

## Related

- [Drizzle Relations](./relations.md)
- [Drizzle Queries (RQB)](./rqb.md)
- drizzle-kit `pull` command (kit-overview category)
