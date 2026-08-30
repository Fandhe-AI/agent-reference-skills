---
source: https://orm.drizzle.team/docs/guides/seeding-using-with-option
---

# Seed related rows with `with`

Generate deterministic fake data for a one-to-many relationship (2 users, each with 3 posts) using `drizzle-seed`'s `refine().with` option.

```ts
// schema.ts
import { serial, pgTable, integer, text } from "drizzle-orm/pg-core";

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name'),
});

export const posts = pgTable('posts', {
  id: serial('id').primaryKey(),
  content: text('content'),
  authorId: integer('author_id').notNull().references(() => users.id),
});
```

```ts
// seed.ts
import { seed } from 'drizzle-seed';
import { users, posts } from './schema';

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { users, posts }).refine(() => ({
    users: {
      count: 2,
      with: {
        posts: 3, // 3 posts per user -> 6 posts total
      },
    },
  }));
}
main();
```

## Notes

- Even with `posts.authorId` referencing `users.id` via `.references(...)`, `with` throws `"posts" table doesn't have a reference to "users" table` unless the relation object is also passed into the seed schema map: declare `postsRelations` and call `seed(db, { users, posts, postsRelations })`.
- The `count` under the parent key (`users: { count: 2, with: { posts: 3 } }`) always describes "one parent has many children" — you cannot flip it to generate many parents per one child, and a table cannot use `with` on itself when the self-reference is one-to-one.
- The docs' relation examples for this seeding option still use the v1 `relations(table, ({ one }) => ({ ... }))` helper. For RQB (`db.query.*`), relations on drizzle-orm/drizzle-kit 1.0.0-rc.5 are declared with the v2 `defineRelations` API instead — see `rqb-avoid-n-plus-one.md`.
