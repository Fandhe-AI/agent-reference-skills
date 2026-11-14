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
| `.using('heap' \| ...)` | method (materialized view) | access method for the materialized view |
| `.tablespace(name)` | method (materialized view) | `TABLESPACE` clause |
| `.withNoData()` | method (materialized view) | `WITH NO DATA` on creation/refresh |

## Notes

- View columns are automatically inferred from the query builder; raw `sql` views require the columns schema to be declared explicitly
- Refresh a materialized view at runtime with `db.refreshMaterializedView(view)`, optionally `.concurrently()` or `.withNoData()`
- Parameters inside a view's query are always inlined into the generated SQL rather than passed as `$1`, `$2`, etc.

### rc.5 changes

- Migration (rc.4 → rc.5): `View` exports moved from `drizzle-orm/sql/sql` to `drizzle-orm/view`; the `View` class now takes a `Table`-like object config for its type template and has a typed `schema` property. `getTableUniqueName` no longer prefixes aliased views or tables with their `schema` and no longer adds a `public.` prefix to entities without `schema`.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 (docs repo commit 55f7f9e, retrieved 2026-11-14)

## Related

- [Schema declaration](./sql-schema-declaration.md)
- [Row-Level Security (RLS)](./rls.md)
