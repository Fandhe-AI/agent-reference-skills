---
source: https://orm.drizzle.team/docs/insert
---

# SQL Insert

Drizzle ORM provides the most SQL-like way to insert rows into database tables. Values passed to `.values()` are parameterized automatically.

## Signature / Usage

```ts
await db.insert(users).values({ name: 'Andrew' });

// insert multiple rows
await db.insert(users).values([{ name: 'Andrew' }, { name: 'Dan' }]);

// inferred insert type
type NewUser = typeof users.$inferInsert;
const insertUser = async (user: NewUser) => db.insert(users).values(user);
```

## returning

```ts
await db.insert(users).values({ name: "Dan" }).returning();

// partial return
await db.insert(users).values({ name: "Partial Dan" }).returning({ insertedId: users.id });
```

## Upserts and conflicts

```ts
// on conflict do nothing
await db.insert(users).values({ id: 1, name: 'John' }).onConflictDoNothing();
await db.insert(users).values({ id: 1, name: 'John' }).onConflictDoNothing({ target: users.id });

// on conflict do update
await db.insert(users)
  .values({ id: 1, name: 'Dan' })
  .onConflictDoUpdate({ target: users.id, set: { name: 'John' } });
```

`onConflictDoUpdate` accepts `targetWhere` (part of the conflict target, e.g. partial indexes) and `setWhere` (part of the update clause):

```ts
await db.insert(employees)
  .values({ employeeId: 123, name: 'John Doe' })
  .onConflictDoUpdate({
    target: employees.employeeId,
    targetWhere: sql`name <> 'John Doe'`,
    set: { name: sql`excluded.name` }
  });
```

Composite indexes or composite primary keys can be used as `target` by passing an array:

```ts
await db.insert(users)
  .values({ firstName: 'John', lastName: 'Doe' })
  .onConflictDoUpdate({
    target: [users.firstName, users.lastName],
    set: { firstName: 'John1' }
  });
```

## with insert clause

```ts
const userCount = db.$with('user_count').as(
  db.select({ value: sql`count(*)`.as('value') }).from(users)
);

const result = await db.with(userCount)
  .insert(users)
  .values([
    { username: 'user1', admin: sql`((select * from ${userCount}) = 0)` }
  ])
  .returning({
    admin: users.admin
  });
```

## Insert into ... select

`db.insert(...).select(...)` accepts a query builder, a callback returning a query builder, or an `sql` template tag for the SELECT source.

```ts
const insertedEmployees = await db
  .insert(employees)
  .select(
    db.select({ id: users.id, name: users.name }).from(users).where(eq(users.role, 'employee'))
  )
  .returning({
    id: employees.id,
    name: employees.name
  });
```

## Notes

- Transcribed from pg/insert.mdx (pg is the canonical dialect)
- Values of `undefined` in `.values()` are ignored; pass `null` explicitly to set a column to `NULL`
- `on conflict do update` supports a `where` clause both on the conflict target (`targetWhere`) and on the update clause (`setWhere`)
- `insert ... select` is supported for all dialects via query builder, callback, or `sql` template tag

## Related

- [select](./select.md)
- [sql](./sql.md)
- [aliases](./aliases.md)
