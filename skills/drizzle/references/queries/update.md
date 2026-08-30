---
source: https://orm.drizzle.team/docs/update
---

# SQL Update

Updates rows matching a `where` condition. Values passed to `.set()` are parameterized automatically.

## Signature / Usage

```ts
await db.update(users)
  .set({ name: 'Mr. Dan' })
  .where(eq(users.name, 'Dan'));

// set a column to NULL explicitly
await db.update(users)
  .set({ name: null })
  .where(eq(users.name, 'Dan'));

// use sql as a value
await db.update(users)
  .set({ updatedAt: sql`NOW()` })
  .where(eq(users.name, 'Dan'));
```

## Returning

```ts
const updatedUserId = await db.update(users)
  .set({ name: "Mr. Dan" })
  .where(eq(users.name, "Dan"))
  .returning({ updatedId: users.id });
```

## with update clause

```ts
const averagePrice = db.$with('average_price').as(
  db.select({ value: sql`avg(${products.price})`.as('value') }).from(products)
);

const result = await db.with(averagePrice)
  .update(products)
  .set({ cheap: true })
  .where(lt(products.price, sql`(select * from ${averagePrice})`))
  .returning({ id: products.id });
```

## Update ... from

PostgreSQL allows a table expression in `UPDATE` so columns from other tables can appear in the `WHERE` condition and update expressions.

```ts
await db
  .update(users)
  .set({ cityId: cities.id })
  .from(cities)
  .where(and(eq(cities.name, 'Seattle'), eq(users.name, 'John')))
```

Joined tables can be aliased, and Postgres also allows returning columns from the joined tables:

```ts
const c = alias(cities, 'c');
await db.update(users).set({ cityId: c.id }).from(c);

const updatedUsers = await db
  .update(users)
  .set({ cityId: cities.id })
  .from(cities)
  .returning({ id: users.id, cityName: cities.name });
```

## Notes

- Transcribed from pg/update.mdx (pg is the canonical dialect)
- Values of `undefined` in `.set()` are ignored; pass `null` explicitly to set a column to `NULL`
- `UPDATE ... FROM` is a PostgreSQL-specific table expression allowing joined-table columns in `WHERE`/`SET`/`RETURNING`

## Related

- [select](./select.md)
- [insert](./insert.md)
- [delete](./delete.md)
- [aliases](./aliases.md)
