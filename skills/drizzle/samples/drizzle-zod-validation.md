---
source: https://orm.drizzle.team/docs/zod
---

# Input validation with drizzle-zod

Generate zod schemas straight from a Drizzle table to validate API request/response bodies without hand-duplicating field types.

```ts
import { pgTable, text, integer } from 'drizzle-orm/pg-core';
import { createInsertSchema, createSelectSchema, createUpdateSchema } from 'drizzle-orm/zod';
import { eq } from 'drizzle-orm';

const users = pgTable('users', {
  id: integer().generatedAlwaysAsIdentity().primaryKey(),
  name: text().notNull(),
  age: integer().notNull(),
});

// validate an incoming POST body before insert
const userInsertSchema = createInsertSchema(users);
const parsed = userInsertSchema.parse({ name: 'Jane', age: 30 });
await db.insert(users).values(parsed);

// validate an incoming PATCH body before update
const userUpdateSchema = createUpdateSchema(users);
const patch = userUpdateSchema.parse({ age: 35 });
await db.update(users).set(patch).where(eq(users.name, 'Jane'));

// validate a row read back from the database
const userSelectSchema = createSelectSchema(users);
const row = userSelectSchema.parse((await db.select().from(users).limit(1))[0]);
```

## Notes

- `createInsertSchema` / `createUpdateSchema` / `createSelectSchema` mirror the table's nullability: insert schemas make `.notNull().default(...)` columns optional, update schemas make every column optional, select schemas match the DB row shape exactly.
- Pass a per-column refinement map as the 2nd argument (a callback narrows the generated field, a raw zod schema replaces it entirely, including nullability).
- `createSchemaFactory({ zodInstance, coerce })` lets you plug in an extended zod instance (e.g. `@hono/zod-openapi`) or auto-coerce types like dates.
- zod's own API (schemas, `.parse()`, refinements) is covered by the separate `zod` skill; drizzle-zod only generates zod schemas from Drizzle tables/views/enums.
