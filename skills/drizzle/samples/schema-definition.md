---
source: https://orm.drizzle.team/docs/sql-schema-declaration
---

# Schema definition

Define tables, enums, self-references, and unique/index constraints for a typical app in a single `schema.ts`.

```ts
import type { AnyPgColumn } from "drizzle-orm/pg-core";
import { pgEnum, pgTable as table } from "drizzle-orm/pg-core";
import * as t from "drizzle-orm/pg-core";

export const rolesEnum = pgEnum("roles", ["guest", "user", "admin"]);

export const users = table(
  "users",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    firstName: t.varchar("first_name", { length: 256 }),
    lastName: t.varchar("last_name", { length: 256 }),
    email: t.varchar().notNull(),
    invitee: t.integer().references((): AnyPgColumn => users.id),
    role: rolesEnum().default("guest"),
  },
  (table) => [
    t.uniqueIndex("email_idx").on(table.email)
  ]
);

export const posts = table(
  "posts",
  {
    id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
    title: t.varchar({ length: 256 }),
    ownerId: t.integer("owner_id").references(() => users.id),
  },
  (table) => [
    t.index("title_idx").on(table.title),
  ]
);

export const comments = table("comments", {
  id: t.integer().primaryKey().generatedAlwaysAsIdentity(),
  text: t.varchar({ length: 256 }),
  postId: t.integer("post_id").references(() => posts.id),
  ownerId: t.integer("owner_id").references(() => users.id),
});
```

## Notes

- Export every table/enum from the schema file(s) referenced by `drizzle.config.ts`'s `schema` path — `drizzle-kit` imports them for migration diffing.
- Self-references (`users.invitee` → `users.id`) require an explicit `AnyPgColumn` return type annotation on the callback.
- Schema can live in one file or be split across many; `drizzle-kit` reads the folder recursively when `schema` points at a directory.
- For relational queries (RQB) on top of this schema, see `rqb-avoid-n-plus-one.md`.
