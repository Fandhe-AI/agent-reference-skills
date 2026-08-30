---
source: https://orm.drizzle.team/docs/guides/include-or-exclude-columns
---

# Include or exclude columns in a query

Use `getColumns()` to add computed columns or drop specific columns from a `.select()`, and the RQB `columns` option to include/exclude columns declaratively.

```ts
import { getColumns, sql } from 'drizzle-orm';

// include all columns plus a computed one
await db
  .select({
    ...getColumns(posts),
    titleLength: sql<number>`length(${posts.title})`,
  })
  .from(posts);

// exclude "content" column
const { content, ...rest } = getColumns(posts);
await db.select({ ...rest }).from(posts);
```

RQB equivalent (include/exclude with a joined relation):

```ts
await db.query.posts.findMany({
  columns: {
    id: true, // include only "id" column
  },
  with: {
    comments: {
      columns: {
        userId: false, // exclude "userId" column
        postId: false, // exclude "postId" column
      },
    },
    user: true, // include all columns from "users" table
  },
});
```

## Notes

- `getColumns(table)` returns a plain column map you can destructure to drop fields before passing to `.select({ ...rest })`.
- In RQB `columns`, `{ field: true }` switches to an include-only allowlist; `{ field: false }` instead excludes just that field while keeping the rest.
- `extras` in RQB adds computed SQL columns the same way `getColumns()` + spread does for `.select()`.
- Requires relations declared via `defineRelations` (see `rqb-avoid-n-plus-one.md`) for the `with` option to resolve `comments` / `user`.
