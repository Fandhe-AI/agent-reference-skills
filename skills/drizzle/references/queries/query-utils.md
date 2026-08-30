---
source: https://orm.drizzle.team/docs/query-utils
---

# Drizzle query utils

## $count

`db.$count()` is a utility wrapper of `count(*)`. It can be used standalone, as a subquery, or with filters.

## Signature / Usage

```ts
const count = await db.$count(users);
//    ^? number

const count = await db.$count(users, eq(users.name, "Dan")); // works with filters
```

```sql
select count(*) from "users";
select count(*) from "users" where "users"."name" = 'Dan';
```

Usage as a subquery in a select:

```ts
const users = await db.select({
  ...users,
  postsCount: db.$count(posts, eq(posts.authorId, users.id)),
}).from(users);
```

Usage with relational queries:

```ts
const users = await db.query.users.findMany({
  extras: {
    postsCount: (t) => db.$count(posts, eq(posts.authorId, t.id)),
  },
});
```

## Notes

- Transcribed from src/mdx/$count-pg.mdx, imported into pg/query-utils.mdx as the `$count` section (pg is the canonical dialect)
- `db.$count()` is a flexible operator; see the drizzle-orm GitHub discussion #3119 for background
- Works both as a standalone query and embedded as a subquery/extra field

## Related

- [select](./select.md)
- [data-querying](./data-querying.md)
