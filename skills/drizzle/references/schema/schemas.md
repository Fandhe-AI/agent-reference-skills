---
source: https://orm.drizzle.team/docs/schemas
---

# Schemas

`pgSchema` declares a PostgreSQL schema (namespace) that other models (tables, enums, sequences, ...) can be placed inside; the query builder prepends the schema name to generated SQL.

## Signature / Usage

```ts
import { serial, text, pgSchema } from "drizzle-orm/pg-core";

export const mySchema = pgSchema("my_schema");

export const colors = mySchema.enum("colors", ["red", "green", "blue"]);

export const mySchemaUsers = mySchema.table("users", {
  id: serial("id").primaryKey(),
  name: text("name"),
  color: colors("color").default("red"),
});
```

## Notes

- Querying an entity declared inside a schema produces `select * from "schema"."users"`
- Tables with the same name across different schemas require the [join alias syntax](https://orm.drizzle.team/docs/joins) to disambiguate result types

## Related

- [Schema declaration](./sql-schema-declaration.md)
- [Sequences](./sequences.md)
