---
source: https://orm.drizzle.team/docs/aliases
---

# Aliases

Drizzle supports aliasing tables, columns, subqueries and CTEs, mapping directly to the SQL `AS` keyword.

## Signature / Usage

```ts
import { alias, pgTable, integer, text } from "drizzle-orm/pg-core";

const employees = pgTable("employees", {
  id: integer().primaryKey(),
  name: text(),
  managerId: integer("manager_id"),
});

const manager = alias(employees, "manager");

await db.select({
  employeeName: employees.name,
  managerName: manager.name,
})
  .from(employees)
  .leftJoin(manager, eq(employees.managerId, manager.id));
```

## Column aliasing

```ts
const result = await db.select({
  id: users.id,
  lowerName: users.name.as("lower_name"),
}).from(users);

// with sql expressions
const result2 = await db.select({
  id: users.id,
  lowerName: sql<string>`lower(${users.name})`.as("lower_name"),
}).from(users);
```

## Subquery aliasing

```ts
const sq = db.select().from(users).where(eq(users.id, 42)).as('sq');
const result = await db.select().from(sq);

// usable in joins too
const result2 = await db.select().from(users).leftJoin(sq, eq(users.id, sq.id));
```

## CTE aliasing

```ts
const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
const result = await db.with(sq).select().from(sq);
```

`sql` expressions inside a CTE must be aliased with `.as()` to be referenced in the outer query:

```ts
const sq2 = db.$with('sq').as(db.select({
  name: sql<string>`upper(${users.name})`.as('name'),
}).from(users));

const result2 = await db.with(sq2).select({ name: sq2.name }).from(sq2);
```

## Notes

- Transcribed from pg/aliases.mdx (pg is the canonical dialect)
- Table aliasing (`alias()`) is essential for self-joins (e.g. employees and their managers)
- Subquery/CTE aliases must be provided with `.as()` before the subquery/CTE can be referenced in the outer query

## Related

- [joins](./joins.md)
- [select](./select.md)
- [sql](./sql.md)
