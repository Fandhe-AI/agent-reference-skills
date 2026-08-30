---
source: https://orm.drizzle.team/docs/rqb
---

# RQB: avoid N+1 queries with `with`

Load posts together with their comments in one round trip using the Relational Queries API instead of looping and issuing a query per row.

```ts
import { defineRelations } from 'drizzle-orm';
import * as schema from './schema';

export const relations = defineRelations(schema, (r) => ({
  users: {
    posts: r.many.posts(),
  },
  posts: {
    author: r.one.users({
      from: r.posts.authorId,
      to: r.users.id,
    }),
    comments: r.many.comments(),
  },
  comments: {
    post: r.one.posts({
      from: r.comments.postId,
      to: r.posts.id,
    }),
  },
}));
```

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import * as schema from './schema';
import { relations } from './relations';

const db = drizzle(process.env.DATABASE_URL!, { relations });

// single query, no per-row fetch loop
const posts = await db.query.posts.findMany({
  with: {
    comments: true,
  },
});
```

## Notes

- `db.query.<table>.findMany({ with: { ... } })` batches related rows in a fixed number of queries instead of one query per parent row, avoiding N+1.
- Relations are declared via `defineRelations(schema, (r) => ({ ... }))` — this is the v2 relations API (drizzle-orm/drizzle-kit 1.0.0-rc.5). The older `relations(table, ({ one, many }) => ({ ... }))` helper is the v1 API.
- References to a table's own columns inside `where` / `orderBy` / `extras` callbacks must go through the callback parameter, not the imported table object.
- `findFirst()` behaves like `findMany()` with an implicit `limit 1`.
