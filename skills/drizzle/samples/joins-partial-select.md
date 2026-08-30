---
source: https://orm.drizzle.team/docs/joins
---

# Joins with partial select

Left-join two tables and shape the result with a nested partial `.select({ ... })` object so joined-in nullability stays scoped to the sub-object instead of spreading to every column.

```ts
export const users = pgTable("users", {
  id: serial().primaryKey(),
  name: text().notNull(),
  age: integer(),
});

export const pets = pgTable("pets", {
  id: serial().primaryKey(),
  name: text().notNull(),
  ownerId: integer("owner_id").notNull().references(() => users.id),
});
```

```ts
await db.select({
  userId: users.id,
  userName: users.name,
  pet: {
    id: pets.id,
    name: pets.name,
  },
}).from(users).leftJoin(pets, eq(users.id, pets.ownerId));

// result type
// {
//   userId: number;
//   userName: string;
//   pet: { id: number; name: string } | null;
// }[]
```

## Notes

- Without nested select objects, a `leftJoin`/`fullJoin` makes every column of the joined table nullable individually; nesting under a key (`pet: { ... }`) makes the whole sub-object nullable instead.
- `sql` expressions in a partial select need an explicit `sql<type | null>` annotation when the source side of a join can be null — Drizzle can't infer nullability through raw SQL.
- Use `alias(table, "name")` from `drizzle-orm/pg-core` for self-joins (e.g. fetching users with their parent user).
- For excluding specific columns instead of listing them, see `include-exclude-columns.md`.
