---
source: https://orm.drizzle.team/docs/typebox-legacy
---

# typebox-legacy

Generates typebox schemas using the legacy `@sinclair/typebox` package from Drizzle ORM table/view/enum definitions for select, insert, and update validation.

## Signature / Usage

```ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-orm/typebox-legacy';
import { Value } from '@sinclair/typebox/value';

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull()
});

const userSelectSchema = createSelectSchema(users);
const rows = await db.select().from(users).limit(1);
const parsed = Value.Parse(userSelectSchema, rows[0]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| field override (2nd arg) | `@sinclair/typebox` schema (e.g. `Type.String()`) | Completely overwrites a field's schema |
| field refinement (2nd arg) | `(schema) => schema` | Extends/modifies a field's schema before it becomes nullable/optional |
| `createSchemaFactory({ typeboxInstance })` | function | Advanced factory for using an extended typebox instance (e.g. Elysia's `t`) |

## Notes

- Requires `drizzle-orm@rc` and `@sinclair/typebox` (legacy package). For the new `typebox` package, use the `typebox` page instead.
- Starting from `drizzle-orm@1.0.0-beta.15`, `drizzle-typebox` is deprecated in favor of first-class schema generation inside Drizzle ORM itself; the standalone `drizzle-typebox` package still works but receives no new features.
- Transcribed from root `typebox-legacy.mdx`.

## Related

- [typebox](./typebox.md)
- [zod](./zod.md)
- [valibot](./valibot.md)
- [arktype](./arktype.md)
