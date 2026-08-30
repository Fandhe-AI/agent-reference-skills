---
source: https://orm.drizzle.team/docs/select
---

# SQL Select

Drizzle provides the most SQL-like way to fetch data while remaining type-safe and composable. Whatever a dialect supports but Drizzle's builder doesn't (yet) can be added with the `sql` operator.

Examples below assume:

```ts
import { pgTable, serial, text, integer } from 'drizzle-orm/pg-core';

export const users = pgTable('users', {
  id: serial().primaryKey(),
  name: text().notNull(),
  age: integer(),
});
```

## Signature / Usage

```ts
const result = await db.select().from(users);
```

```sql
select "id", "name", "age" from "users";
```

The result type is inferred from the table definition, including column nullability. Drizzle always explicitly lists columns instead of `select *`, to guarantee field order and as good practice.

## Partial select

```ts
const result = await db.select({
  field1: users.id,
  field2: users.name,
}).from(users);
```

Arbitrary expressions are allowed as selection fields, not just columns:

```ts
const result2 = await db.select({
  id: users.id,
  lowerName: sql<string>`lower(${users.name})`,
}).from(users);
```

`sql<string>` only tells Drizzle the expected TypeScript type; it performs no runtime cast. Use `.mapWith()` (see `sql` reference) for runtime transformations.

## Conditional select

```ts
async function selectUsers(withName: boolean) {
  return db
    .select({
      id: users.id,
      ...(withName ? { name: users.name } : {}),
    })
    .from(users);
}
```

## Distinct select

```ts
await db.selectDistinct().from(users).orderBy(users.id, users.name);
await db.selectDistinct({ id: users.id }).from(users).orderBy(users.id);
```

PostgreSQL also supports `distinct on`:

```ts
await db.selectDistinctOn([users.id]).from(users).orderBy(users.id);
await db.selectDistinctOn([users.name], { name: users.name }).from(users).orderBy(users.name);
```

## Advanced select

```ts
import { getColumns, sql } from 'drizzle-orm';

// spread all columns plus an extra computed field
await db.select({
  ...getColumns(posts),
  titleLength: sql<number>`length(${posts.title})`,
}).from(posts);

// exclude a column
const { content, ...rest } = getColumns(posts);
await db.select({ ...rest }).from(posts);
```

Relational query builder equivalents (`columns: { title: true }` to include-only, `columns: { content: false }` to exclude) are also available via `db.query.<table>.findMany()`.

## Filters

```ts
import { eq, lt, gte, ne } from 'drizzle-orm';

await db.select().from(users).where(eq(users.id, 42));
await db.select().from(users).where(lt(users.id, 42));
await db.select().from(users).where(gte(users.id, 42));
await db.select().from(users).where(ne(users.id, 42));
```

All filter operators are implemented with the `sql` function, so custom filters can be written the same way:

```ts
import { sql } from 'drizzle-orm';
import type { PgColumn } from "drizzle-orm/pg-core";

function equals42(col: PgColumn) {
  return sql`${col} = 42`;
}

await db.select().from(users).where(equals42(users.id));
```

All values passed to filter operators and `sql` are parameterized automatically.

Invert a condition with `not`:

```ts
import { eq, not } from 'drizzle-orm';

await db.select().from(users).where(not(eq(users.id, 42)));
```

## Combining filters

```ts
import { eq, and, or } from 'drizzle-orm';

await db.select().from(users).where(and(eq(users.id, 42), eq(users.name, 'Dan')));
await db.select().from(users).where(or(eq(users.id, 42), eq(users.name, 'Dan')));
```

## Advanced filters

```ts
const searchPosts = async (term?: string) => {
  await db.select().from(posts).where(term ? ilike(posts.title, term) : undefined);
};

const searchPosts2 = async (filters: SQL[]) => {
  await db.select().from(posts).where(and(...filters));
};
```

## Limit & offset

```ts
await db.select().from(users).limit(10);
await db.select().from(users).limit(10).offset(10);
```

## Order By

```ts
import { asc, desc } from 'drizzle-orm';

await db.select().from(users).orderBy(users.name);
await db.select().from(users).orderBy(desc(users.name));

// multiple fields
await db.select().from(users).orderBy(asc(users.name), desc(users.name2));
```

## Advanced pagination

```ts
// offset pagination, orderBy is mandatory
await db.select().from(users).orderBy(asc(users.id)).limit(4).offset(4);

// cursor pagination
const nextUserPage = async (cursor?: number, pageSize = 3) => {
  return await db
    .select()
    .from(users)
    .where(cursor ? gt(users.id, cursor) : undefined)
    .limit(pageSize)
    .orderBy(asc(users.id));
};
```

## WITH clause

```ts
const sq = db.$with('sq').as(db.select().from(users).where(eq(users.id, 42)));
const result = await db.with(sq).select().from(sq);
```

`insert`, `update` and `delete` statements can also be used inside `with`:

```ts
const sqInsert = db.$with('sq').as(db.insert(users).values({ name: 'John' }).returning());
const result2 = await db.with(sqInsert).select().from(sqInsert);
```

Arbitrary `sql` values selected in a CTE must be aliased with `.as()` to be referenced elsewhere; otherwise the field type becomes `DrizzleTypeError` and referencing it throws a runtime error:

```ts
const sq2 = db.$with('sq').as(db.select({
  name: sql<string>`upper(${users.name})`.as('name'),
}).from(users));

const result3 = await db.with(sq2).select({ name: sq2.name }).from(sq2);
```

## Select from subquery

```ts
const sq = db.select().from(users).where(eq(users.id, 42)).as('sq');
const result = await db.select().from(sq);
```

Subqueries can be used anywhere a table can, including joins:

```ts
const result2 = await db.select().from(users).leftJoin(sq, eq(users.id, sq.id));
```

## Aggregations

```ts
import { gt, sql } from "drizzle-orm";

await db.select({
  age: users.age,
  count: sql<number>`cast(count(${users.id}) as int)`,
})
  .from(users)
  .groupBy(users.age)
  .having(({ count }) => gt(count, 1));
```

`cast(... as int)` is needed because `count()` returns `bigint`/`string` in PostgreSQL; alternatively use `.mapWith(Number)`.

## Aggregation helpers

Drizzle wraps common aggregate functions so you don't need to hand-write `sql` templates:

```ts
import { count, countDistinct, avg, avgDistinct, sum, sumDistinct, max, min } from 'drizzle-orm'

await db.select({ value: count() }).from(users);          // count(*)
await db.select({ value: count(users.id) }).from(users);  // count("id")
await db.select({ value: countDistinct(users.id) }).from(users);
await db.select({ value: avg(users.id) }).from(users);
await db.select({ value: avgDistinct(users.id) }).from(users);
await db.select({ value: sum(users.id) }).from(users);
await db.select({ value: sumDistinct(users.id) }).from(users);
await db.select({ value: max(users.id) }).from(users);
await db.select({ value: min(users.id) }).from(users);
```

`count`/`countDistinct` map to `Number`; `avg`/`sum`/`avgDistinct`/`sumDistinct` map to `String`; `max`/`min` map to the source column's type. Aggregation functions are typically used together with `.groupBy()`.

## $count

`db.$count()` is a utility wrapper of `count(*)`, usable standalone, with filters, as a subquery, or inside relational query extras. See the query-utils reference for full details:

```ts
const count = await db.$count(users);
const filteredCount = await db.$count(users, eq(users.name, "Dan"));
```

## Notes

- Transcribed from pg/select.mdx; the `$count` section imports src/mdx/$count-pg.mdx (pg is the canonical dialect)
- Drizzle always lists columns explicitly instead of `select *`
- `sql<T>` on a selected field is a compile-time type hint only; it does not cast the runtime value
- CTEs (`with`) can wrap `insert`/`update`/`delete` statements, not just `select`
- Aggregation helpers (`count`, `sum`, `avg`, `max`, `min`, and their `*Distinct` variants) are thin wrappers over `sql` with appropriate `.mapWith()` calls

## Related

- [operators](./operators.md)
- [joins](./joins.md)
- [sql](./sql.md)
- [query-utils](./query-utils.md)
