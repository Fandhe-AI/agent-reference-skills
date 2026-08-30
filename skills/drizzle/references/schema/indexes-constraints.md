---
source: https://orm.drizzle.team/docs/indexes-constraints
---

# Indexes & Constraints

SQL constraints enforce rules on table columns to prevent invalid data; indexes speed up lookups. Drizzle exposes both through column builder methods and standalone operators.

## Signature / Usage

```ts
import { serial, text, index, uniqueIndex, pgTable } from "drizzle-orm/pg-core";

export const user = pgTable("user", {
  id: serial().primaryKey(),
  name: text(),
  email: text(),
}, (table) => [
  index("name_idx").on(table.name),
  uniqueIndex("email_idx").on(table.email),
]);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `.default(value)` | column method | `DEFAULT` clause; accepts a literal or `sql\`...\`` expression |
| `.notNull()` | column method | `NOT NULL` constraint |
| `.unique(name?, { nulls })` | column method | `UNIQUE` constraint; `nulls: "not distinct"` enables Postgres 15+ `NULLS NOT DISTINCT` |
| `unique(name?).on(...cols)` / `.nullsNotDistinct()` | standalone operator | composite `UNIQUE` constraint |
| `check(name, sql)` | standalone operator | `CHECK` constraint (column or table level) |
| `.primaryKey()` | column method | single-column `PRIMARY KEY` |
| `primaryKey({ name?, columns })` | standalone operator | composite `PRIMARY KEY` |
| `.references(() => col, opts?)` | column method | inline `FOREIGN KEY` |
| `foreignKey({ name?, columns, foreignColumns })` | standalone operator | single- or multi-column `FOREIGN KEY` |
| `index(name).on(...)` / `.onOnly(...)` | standalone operator | `CREATE INDEX`; supports `.using(method, ...)`, `.concurrently()`, `.where(sql)`, `.with({...})` |
| `uniqueIndex(name).on(...)` | standalone operator | `CREATE UNIQUE INDEX` |

## Notes

- A table can have only one `PRIMARY KEY` but many `UNIQUE` constraints; `PRIMARY KEY` implies `UNIQUE`
- Self-referencing foreign keys need either an explicit `AnyPgColumn` return type on the reference callback or the standalone `foreignKey` operator
- Index column expressions support `.asc()`/`.desc()`/`.nullsFirst()`/`.op('opclass')`, raw `sql` expressions, and `.using('btree' | 'gin' | 'gist' | 'hnsw' | ..., ...)`

## Related

- [Sequences](./sequences.md)
- [Views](./views.md)
- [Extensions](./extensions.md)
