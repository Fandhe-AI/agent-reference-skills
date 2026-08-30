---
source: https://orm.drizzle.team/docs/relations
---

# Drizzle Relations

`defineRelations` is the single place where all relations for all tables in a schema are declared, powering the Relational Queries API (`db.query`). Relations are an application-level abstraction, distinct from database-level foreign keys.

## Signature / Usage

```ts
import { defineRelations } from 'drizzle-orm';
import * as p from 'drizzle-orm/pg-core';

export const users = p.pgTable('users', {
  id: p.integer().primaryKey(),
  name: p.text().notNull(),
});

export const posts = p.pgTable('posts', {
  id: p.integer().primaryKey(),
  content: p.text().notNull(),
  ownerId: p.integer('owner_id'),
});

export const relations = defineRelations({ users, posts }, (r) => ({
  posts: {
    author: r.one.users({
      from: r.posts.ownerId,
      to: r.users.id,
    }),
  },
}));
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `r.one.<table>({ from, to, optional, alias, where })` | relation builder | Declares a single related row; `optional: false` makes the key non-nullable at the type level |
| `r.many.<table>({ from, to, alias, where })` | relation builder | Declares an array of related rows |
| `from` / `to` | column ref \| array | Soft-relation source/target columns; `.through(<junctionColumn>)` bypasses explicit junction-table selection for many-to-many |
| `alias` | `string` | Disambiguates multiple relations between the same two tables |
| `where` | `object` | Predefined filter for polymorphic relations; can only reference columns on the target (`to`) table |

## Notes

- Foreign keys and `relations` are independent — `relations` do not create foreign keys implicitly and can be used with databases lacking FK support.
- Many-to-many relations use `through` on both `from`/`to` sides to point at the junction table's columns, removing the need to manually select and map the junction table.
- `defineRelationsPart` lets you split relation declarations across files; when merging (`{ ...relations, ...part }`), the main `relations` object must be spread first so all table names remain available for autocomplete.
- Recommended indexing: FK column of the "one" side for 1:1, FK column of the "many" side for 1:many, and both individual FK columns plus a composite index on the junction table for many-to-many.
- Migration (v0 → v1): v1 (Relational Queries v2) replaced per-table `relations(table, ({ one, many }) => ...)` calls with a single `defineRelations(schema, (r) => ...)`; `fields`/`references` were renamed to `from`/`to` (accepting single values or arrays), `relationName` was renamed to `alias`, `many` no longer requires a matching `one` on the other side, and `through` was added for many-to-many. See relations-v1-v2 for the full diff.

## Related

- [Drizzle Queries (RQB)](./rqb.md)
- [Relations Fundamentals](./relations-schema-declaration.md)
- [Migrating to Relational Queries v2](./relations-v1-v2.md)
