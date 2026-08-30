---
source: https://orm.drizzle.team/docs/typebox
---

# typebox

Generates typebox schemas (new `typebox` package) from Drizzle ORM table/view/enum definitions for select, insert, and update validation. Supported dialects: CockroachDB, MSSQL, MySQL, PostgreSQL, SingleStore, SQLite.

## Signature / Usage

```ts
import { pgEnum, pgTable, serial, text, timestamp } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/typebox';
import { Type } from 'typebox';
import { Value } from 'typebox/value';

const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: text('name').notNull(),
  email: text('email').notNull(),
  role: text('role', { enum: ['admin', 'user'] }).notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

const insertUserSchema = createInsertSchema(users);
const updateUserSchema = createUpdateSchema(users);
const selectUserSchema = createSelectSchema(users);

const isUserValid: boolean = Value.Check(insertUserSchema, {
  name: 'John Doe',
  email: 'johndoe@test.com',
  role: 'admin',
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| field override (2nd arg) | typebox schema (e.g. `Type.String()`) | Completely overwrites a field's schema |
| field refinement (2nd arg) | `(schema) => typebox schema` | Extends/modifies a field's schema before it becomes nullable/optional |

## Notes

- Requires `drizzle-orm@rc` and the `typebox` package (new package, not `@sinclair/typebox`); for the legacy `@sinclair/typebox` package see `typebox-legacy`.
- Starting from `drizzle-orm@1.0.0-beta.15`, `drizzle-typebox` is deprecated in favor of first-class schema generation inside Drizzle ORM itself (`drizzle-orm/typebox`); the standalone `drizzle-typebox` package still works but receives no new features.
- Transcribed from root `typebox.mdx`.

## Related

- [typebox-legacy](./typebox-legacy.md)
- [zod](./zod.md)
- [valibot](./valibot.md)
- [arktype](./arktype.md)
- [effect-schema](./effect-schema.md)
