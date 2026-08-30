---
source: https://orm.drizzle.team/docs/delete
---

# SQL Delete

Deletes rows, optionally filtered by a `where` condition.

## Signature / Usage

```ts
// delete all rows
await db.delete(users);

// delete with a filter
await db.delete(users).where(eq(users.name, 'Dan'));
```

## Returning

```ts
const deletedUser = await db.delete(users)
  .where(eq(users.name, 'Dan'))
  .returning();

// partial return
const deletedUserId = await db.delete(users)
  .where(eq(users.name, "Dan"))
  .returning({ deletedId: users.id });
```

## WITH DELETE clause

```ts
const averageAmount = db.$with('average_amount').as(
  db.select({ value: sql`avg(${orders.amount})`.as('value') }).from(orders)
);

const result = await db
  .with(averageAmount)
  .delete(orders)
  .where(gt(orders.amount, sql`(select * from ${averageAmount})`))
  .returning({ id: orders.id });
```

## Notes

- Transcribed from pg/delete.mdx (pg is the canonical dialect)
- `.where()` restricts rows; omitting it deletes every row in the table
- `.returning()` returns deleted rows, optionally with a partial column selection

## Related

- [select](./select.md)
- [update](./update.md)
- [insert](./insert.md)
