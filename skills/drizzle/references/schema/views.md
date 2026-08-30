---
source: https://orm.drizzle.team/docs/views
---

# Views

Drizzle can declare views to be created (`pgView`/`pgMaterializedView`) or existing views (`.existing()`), using an inline query builder, a standalone `QueryBuilder`, or raw `sql` with an explicit column schema.

## Signature / Usage

```ts
import { pgTable, pgView, serial, text, timestamp } from "drizzle-orm/pg-core";
import { eq } from "drizzle-orm";

export const user = pgTable("user", {
  id: serial(),
  name: text(),
  role: text().$type<"admin" | "customer">(),
});

export const userView = pgView("user_view").as((qb) => qb.select().from(user));
export const customersView = pgView("customers_view").as((qb) =>
  qb.select().from(user).where(eq(user.role, "customer"))
);
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `pgView(name, columns?)` / `pgMaterializedView(name, columns?)` | function | declares a view or materialized view; explicit `columns` required only when using raw `sql` |
| `.as(qb \| sql)` | method | defines the view body via query builder callback, standalone `QueryBuilder` instance, or `sql\`...\`` |
| `.existing()` | method | marks the view as already present in the DB; drizzle-kit skips `CREATE VIEW` for it |
| `.with({ checkOption, securityBarrier, securityInvoker, ... })` | method | Postgres `WITH (...)` view options |
| `.using('btree' \| ...)` | method (materialized view) | access method for the materialized view |
| `.tablespace(name)` | method (materialized view) | `TABLESPACE` clause |
| `.withNoData()` | method (materialized view) | `WITH NO DATA` on creation/refresh |

## Notes

- View columns are automatically inferred from the query builder; raw `sql` views require the columns schema to be declared explicitly
- Refresh a materialized view at runtime with `db.refreshMaterializedView(view)`, optionally `.concurrently()` or `.withNoData()`
- Parameters inside a view's query are always inlined into the generated SQL rather than passed as `$1`, `$2`, etc.

## Related

- [Schema declaration](./sql-schema-declaration.md)
- [Row-Level Security (RLS)](./rls.md)
