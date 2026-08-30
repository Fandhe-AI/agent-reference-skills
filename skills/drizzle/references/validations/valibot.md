---
source: https://orm.drizzle.team/docs/valibot
---

# valibot

Generates valibot schemas from Drizzle ORM table/view/enum definitions for select, insert, and update validation.

## Signature / Usage

```ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-orm/valibot';
import { parse } from 'valibot';

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull()
});

const userSelectSchema = createSelectSchema(users);
const rows = await db.select().from(users).limit(1);
const parsed = parse(userSelectSchema, rows[0]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| refinement callback (2nd arg) | `(schema) => valibot schema` | Extends/modifies a field's schema (e.g. `(schema) => pipe(schema, maxLength(20))`) before it becomes nullable/optional |
| refinement override (2nd arg) | valibot schema | Completely overwrites a field's schema, including nullability |

## Notes

- Views and enums are also supported via `createSelectSchema`.
- Starting from `drizzle-orm@1.0.0-beta.15`, `drizzle-valibot` is deprecated in favor of first-class schema generation inside Drizzle ORM itself (`drizzle-orm/valibot`); the standalone `drizzle-valibot` package still works but receives no new features.
- Transcribed from root `valibot.mdx`.

## Related

- [zod](./zod.md)
- [typebox](./typebox.md)
- [arktype](./arktype.md)
- [effect-schema](./effect-schema.md)
