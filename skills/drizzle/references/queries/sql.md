---
source: https://orm.drizzle.team/docs/sql
---

# Magical `sql` operator

The `sql` template lets you write raw, type-safe, parameterized SQL fragments and drop them into partial `SELECT`s, `WHERE`, `ORDER BY`, `HAVING`, `GROUP BY`, and even relational query builders, without giving up type safety or parameterization.

## Signature / Usage

```ts
import { sql } from 'drizzle-orm'

const id = 69;
await db.execute(sql`select * from ${usersTable} where ${usersTable.id} = ${id}`)
```

```sql
select * from "users" where "users"."id" = $1; --> [69]
```

Tables and columns passed to `sql` are mapped to their escaped SQL identifiers; dynamic parameters (e.g. `${id}`) become placeholders with values passed separately, preventing SQL injection.

## `sql<T>`

Defines a custom TypeScript type for a `sql` fragment used where fields require a specific type instead of `unknown`. It performs no runtime mapping — it is purely a type hint.

```ts
const response: { lowerName: string }[] = await db.select({
    lowerName: sql<string>`lower(${usersTable.id})`
}).from(usersTable);
```

## sql.mapWith()

Applies a runtime mapping from the driver's returned value to a Drizzle value, using the same interface implemented by `Column`.

```ts
sql`...`.mapWith(usersTable.name);

sql``.mapWith({
  mapFromDriverValue: (value: any) => value,
});

sql``.mapWith(Number);
```

## sql.as<T>()

Explicitly aliases a `sql` fragment's result column.

```ts
sql`lower(${usersTable.name})`.as('lower_name')
```

```sql
... "users"."name" as lower_name ...
```

## `sql.raw()`

Includes a raw SQL string without parameterization or escaping.

```ts
sql.raw(`select * from users where id = ${12}`);
// vs parameterized
sql`select * from users where id = ${12}`;
```

`sql.raw()` can also be nested inside a `sql` template to leave part of it unescaped:

```ts
sql`select * from ${usersTable} where id = ${sql.raw(12)}`;
```

## sql.fromList()

Concatenates an array of `SQL` chunks into a single `SQL` statement.

```ts
const sqlChunks: SQL[] = [];
sqlChunks.push(sql`select * from users`);
sqlChunks.push(sql` where `);
for (let i = 0; i < 5; i++) {
  sqlChunks.push(sql`id = ${i}`);
  if (i === 4) continue;
  sqlChunks.push(sql` or `);
}
const finalSql: SQL = sql.fromList(sqlChunks)
```

## sql.join()

Like `fromList`, but lets you specify a custom separator between chunks.

```ts
const finalSql: SQL = sql.join(sqlChunks, sql.raw(' '));
```

## sql.append()

Appends a new `SQL` chunk directly to an already-generated `sql` value.

```ts
const finalSql = sql`select * from users`;
finalSql.append(sql` where `);
finalSql.append(sql`id = ${1}`);
```

## sql.empty()

Starts from a blank `SQL` object to build up a query incrementally with `.append()`.

```ts
const finalSql = sql.empty();
finalSql.append(sql`select * from users`);
finalSql.append(sql` where `);
finalSql.append(sql`id = ${1}`);
```

## Convert `sql` to string and params

Converting a `sql` template to a query string/params requires choosing the target dialect implementation.

```ts
import { PgDialect } from 'drizzle-orm/pg-core';

const pgDialect = new PgDialect();
pgDialect.sqlToQuery(sql`select * from ${usersTable} where ${usersTable.id} = ${12}`);
```

```sql
select * from "users" where "users"."id" = $1; --> [ 12 ]
```

## `sql` select

```ts
await db.select({
    id: usersTable.id,
    lowerName: sql<string>`lower(${usersTable.name})`,
    aliasedName: sql<string>`lower(${usersTable.name})`.as('aliased_column'),
    count: sql<number>`count(*)`.mapWith(Number)
}).from(usersTable)
```

## `sql` in where

```ts
const id = 77
await db.select().from(usersTable).where(sql`${usersTable.id} = ${id}`)
```

Full-text search example:

```ts
const searchParam = "Ale"
await db.select().from(usersTable)
  .where(sql`to_tsvector('simple', ${usersTable.name}) @@ to_tsquery('simple', ${searchParam})`)
```

## `sql` in orderBy

```ts
await db.select().from(usersTable).orderBy(sql`${usersTable.id} desc nulls first`)
```

## `sql` in having and groupBy

```ts
await db.select({
    projectId: usersTable.projectId,
    count: sql<number>`count(${usersTable.id})`.mapWith(Number)
}).from(usersTable)
    .groupBy(sql`${usersTable.projectId}`)
    .having(sql`count(${usersTable.id}) > 300`)
```

## Notes

- Transcribed from pg/sql.mdx (pg is the canonical dialect)
- `sql<T>` is compile-time only; use `.mapWith()` for actual runtime value mapping
- `sql.raw()` bypasses escaping/parameterization — only use it with trusted, non-user-controlled input
- Converting `sql` to a query string requires the dialect-specific class for your target database (the source shows `PgDialect` for PostgreSQL)

## Related

- [select](./select.md)
- [operators](./operators.md)
- [sql-comments](./sql-comments.md)
