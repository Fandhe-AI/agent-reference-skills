---
source: https://orm.drizzle.team/docs/sql-schema-declaration
---

# Drizzle schema

Drizzle lets you define a schema in TypeScript with various models and properties supported by the underlying database. The schema serves as the source of truth for queries (drizzle-orm) and migrations (drizzle-kit).

## Signature / Usage

```ts
import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const usersTable = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar().notNull(),
  age: integer().notNull(),
  email: varchar().notNull().unique(),
});
```

Alternative declaration styles: callback form `pgTable("users", (t) => ({ ... }))`, or `import * as p from "drizzle-orm/pg-core"` namespace form.

## Notes

- Schema files can live in a single `schema.ts` or be spread across multiple files/folders — `drizzle.config.ts`'s `schema` option points at either a file or a folder scanned recursively; every model must be exported for drizzle-kit to pick it up
- By default TypeScript key names are used as database column names 1:1; pass a string to the column builder (e.g. `varchar('first_name')`) to alias
- `snakeCase.table` / `camelCase.table` (and `.view` / `.materializedView` / `.schema` variants) from `drizzle-orm/pg-core` auto-map camelCase TS keys to snake_case DB columns (or vice versa) without per-column aliases
- Common columns (e.g. `created_at`/`updated_at`/`deleted_at`) can be factored into a plain object and spread (`...timestamps`) into multiple table definitions
- PostgreSQL schemas are declared with `pgSchema('name')`; call `.table(...)` on the returned object to place a table inside that schema
- Self-referencing foreign keys require an explicit `AnyPgColumn` return type on the callback: `references((): AnyPgColumn => users.id)`

## Related

- [Indexes & Constraints](./indexes-constraints.md)
- [Views](./views.md)
- [Schemas](./schemas.md)
- [Sequences](./sequences.md)
- [Extensions](./extensions.md)
