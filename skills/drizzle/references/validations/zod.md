---
source: https://orm.drizzle.team/docs/zod
---

# zod

Generates zod schemas from Drizzle ORM table/view/enum definitions for select, insert, and update validation.

## Signature / Usage

```ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-orm/zod';

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull()
});

const userSelectSchema = createSelectSchema(users);
const userInsertSchema = createInsertSchema(users);
const userUpdateSchema = createUpdateSchema(users);

const rows = await db.select().from(users).limit(1);
const parsed = userSelectSchema.parse(rows[0]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| refinement callback (2nd arg) | `(schema) => ZodType` | Extends/modifies a field's schema before it becomes nullable/optional |
| refinement override (2nd arg) | `ZodType` | Completely overwrites a field's schema, including nullability |
| `createSchemaFactory({ zodInstance, coerce })` | function | Advanced factory for using an extended zod instance or enabling type coercion (e.g. `coerce: { date: true }`) |

## Notes

- Views and enums are also supported via `createSelectSchema`.
- Starting from `drizzle-orm@1.0.0-beta.15`, `drizzle-zod` is deprecated in favor of first-class schema generation inside Drizzle ORM itself (`drizzle-orm/zod`); the standalone `drizzle-zod` package still works but receives no new features.
- zod's own API (schema builders, `.parse()`, `z.infer`, etc.) is covered by the separate `zod` skill; drizzle-zod only generates zod schemas from Drizzle tables.
- Transcribed from root `zod.mdx`.

## Related

- [valibot](./valibot.md)
- [typebox](./typebox.md)
- [arktype](./arktype.md)
- [effect-schema](./effect-schema.md)
