---
source: https://orm.drizzle.team/docs/rqb
---

# Drizzle Queries (RQB)

Relational Queries API provides a great developer experience for querying nested relational data from an SQL database, avoiding multiple joins and complex data mappings. It is an extension to the existing schema definition and query builder — you opt in based on your needs.

## Signature / Usage

```ts
import { relations } from './relations';
import { drizzle } from 'drizzle-orm/...';

const db = drizzle(process.env.DATABASE_URL, { relations });

const result = await db.query.users.findMany({
  with: {
    posts: true,
  },
});
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `with` | `object` | Include related tables (nested `with` is supported for arbitrarily deep relations) |
| `columns` | `object` | Partial select — include (`true`) or omit (`false`) specific columns; mixing `true`/`false` ignores the `false` entries |
| `where` | `object` | Object-based filter: `OR`, `AND`, `NOT`, `RAW`, per-column operators (`eq`, `ne`, `gt`, `gte`, `lt`, `lte`, `in`, `notIn`, `like`, `ilike`, `notLike`, `notIlike`, `isNull`, `isNotNull`, `arrayOverlaps`, `arrayContained`, `arrayContains`), and relation names for filtering by related rows |
| `orderBy` | `object \| callback` | `{ column: "asc" \| "desc" }` object, or `(t, { asc, desc, sql }) => ...` callback |
| `extras` | `object` | Custom computed fields via `(table, { sql }) => sql\`...\`` or subqueries (e.g. `db.$count(...)`) |
| `limit` / `offset` | `number` | Row limiting/paging; usable both at the top level and inside nested `with` entries |

## Notes

- Inside relational queries, references to a table's columns must go through the callback parameter (`(t) => ...`), not the imported table object — this applies to `orderBy`, `where.RAW`, `extras`, and subqueries inside `extras`.
- `.findFirst()` adds `limit 1` to the query.
- Aggregations are not supported in `extras`; use the core query builder (`select`) for that.
- `columns: {}` combined with `with` lets you select only nested relation fields.
- Prepared statements support placeholders in `where`, `limit`, and `offset` via `sql.placeholder(...)`.
- Migration (v0 → v1): the `where` and `orderBy` clauses moved from callback-array syntax (`where: (users, { eq }) => eq(users.id, 1)`) to object syntax (`where: { id: 1 }`, `orderBy: { id: "asc" }`); filtering by related tables and `offset` on nested `with` entries are new in v1 (Relational Queries v2 API). See relations-v1-v2 for the full diff.

### rc.5 additions

- Migration (rc.4 → rc.5): `where` throws on an explicit `undefined`; use `EmptyFilter` (`import { EmptyFilter } from 'drizzle-orm/relations'`) when an absent filter is intended. Relation filters with no conditions (`{}`) are skipped; use `true` / `false` to filter by presence / absence.
- Migration (rc.4 → rc.5): `orderBy` can order by related rows (`orderBy: { posts: { createdAt: 'desc(max)' } }`, `orderBy: { posts: 'asc(count)' }`, `orderBy: { author: { isAdmin: 'desc' }, createdAt: 'desc' }`).
- Migration (rc.4 → rc.5): for `mysql`, `postgres`, `cockroach`, `mssql` RQBv2 uses a new query build strategy; opt out per query with `strategy: 'basic'`. Raw SQL `where` / `orderBy` that references relation aliases (for example `"comments"."r"`) can become unreachable.
- Migration (rc.4 → rc.5): relational queries are cached by caches with the `all` strategy (`global: true`); use `withCache: true` to cache explicitly or `withCache: false` to opt out.

```ts
db.query.users.findMany({ where: { isActive: params.isActive ?? EmptyFilter } })

// Select users sorted by post count
db.query.users.findMany({ orderBy: { posts: 'asc(count)' } })

db.query.users.findMany({ with: { posts: true }, withCache: true })
```

- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [Drizzle Relations](./relations.md)
- [Relations Fundamentals](./relations-schema-declaration.md)
- [Migrating to Relational Queries v2](./relations-v1-v2.md)
