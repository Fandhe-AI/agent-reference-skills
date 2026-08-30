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
- Migration (v0 → v1): `where` moved from callback syntax `(users, { eq }) => eq(users.id, 1)` to object syntax `{ id: 1 }`; `orderBy` moved from `(users, { asc }) => [asc(users.id)]` to `{ id: "asc" }`.
- Migration (v0 → v1): filtering by related tables in `where` (e.g. `where: { posts: { content: { like: 'M%' } } }`) and `offset` on nested `with` entries are both new in v1.
- Migration (v0 → v1): `mode` (e.g. `"planetscale"` / `"default"`) is no longer needed on `drizzle()` for MySQL dialects once using `relations`.
- Migration (v0 → v1): removed exports from `drizzle-orm` / `drizzle-orm/relations` — `Relations`, `TableRelationsKeysOnly`, `ExtractTableRelationsFromSchema`, `ExtractRelationsFromTableExtraConfigSchema`, `getOperators`, `FindTableByDBName`, `RelationalSchemaConfig`, `RelationConfig`, `extractTablesRelationalConfig`, `relations`, `createOne`, `createMany`, `NormalizedRelation`, `normalizeRelation`, `createTableRelationsHelpers`, `TableRelationsHelpers`.
- Migration (v0 → v1): `drizzle`/`session`/`migrator`/`transaction` types and `DrizzleConfig` were regenericized around `TRelations extends AnyRelations` instead of `TSchema`/`TFullSchema`.

## Related

- [Drizzle Relations](./relations.md)
- [Drizzle Queries (RQB)](./rqb.md)
- drizzle-kit `pull` command (kit-overview category)
