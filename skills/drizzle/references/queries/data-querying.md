---
source: https://orm.drizzle.team/docs/data-querying
---

# Drizzle Queries + CRUD

Drizzle offers two ways to query the database: SQL-like syntax (query builder) or Relational Queries syntax. Drizzle always outputs exactly one SQL query per call.

## Signature / Usage

```ts
// SQL-like syntax
await db
  .select()
  .from(posts)
  .leftJoin(comments, eq(posts.id, comments.post_id))
  .where(eq(posts.id, 10))

// Relational Queries syntax
const result = await db.query.users.findMany({
  with: {
    posts: true
  },
});
```

## Notes

- Transcribed from pg/data-querying.mdx (pg is the canonical dialect)
- SQL-like syntax covers `select`, `insert`, `update`, `delete`, aliases, WITH clauses, subqueries, prepared statements, and more, matching SQL closely
- Relational Queries API fetches relational/nested data conveniently without manually writing joins, while still emitting exactly one SQL query
- Filters can be composed independently from the main query (e.g. build an array of `SQL` conditions and pass with `and(...filters)`)
- Subqueries can be separated into variables and reused in the main query via `.as('alias')`

## Related

- Relational Queries API (`rqb`, see the relations reference in another category)
- [select](./select.md)
- [insert](./insert.md)
- [update](./update.md)
- [delete](./delete.md)
- [operators](./operators.md)
- [joins](./joins.md)
- [sql](./sql.md)
