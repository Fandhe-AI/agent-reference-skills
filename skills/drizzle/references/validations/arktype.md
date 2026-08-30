---
source: https://orm.drizzle.team/docs/arktype
---

# arktype

Generates arktype schemas from Drizzle ORM table/view/enum definitions for select, insert, and update validation.

## Signature / Usage

```ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createSelectSchema, createInsertSchema, createUpdateSchema } from 'drizzle-orm/arktype';

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull()
});

const userSelectSchema = createSelectSchema(users);
const rows = await db.select().from(users).limit(1);
const parsed = userSelectSchema(rows[0]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| field override (2nd arg) | arktype `type` | Completely overwrites a field's schema |
| field refinement (2nd arg) | `(schema) => schema` | Extends/modifies a field's schema before it becomes nullable/optional |

## Notes

- The generated schema is a callable arktype `type` — validate by calling it directly (`userSelectSchema(rows[0])`), not `.parse()`.
- Starting from `drizzle-orm@1.0.0-beta.15`, `drizzle-arktype` is deprecated in favor of first-class schema generation inside Drizzle ORM itself (`drizzle-orm/arktype`); the standalone `drizzle-arktype` package still works but receives no new features.
- Transcribed from root `arktype.mdx`.

## Related

- [zod](./zod.md)
- [valibot](./valibot.md)
- [typebox](./typebox.md)
- [effect-schema](./effect-schema.md)
