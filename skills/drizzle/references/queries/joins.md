---
source: https://orm.drizzle.team/docs/joins
---

# Joins [SQL]

Join clauses in SQL combine two or more tables based on related columns. Drizzle ORM's join syntax balances SQL-likeness with type safety.

## Join types

Drizzle ORM has APIs for `INNER JOIN [LATERAL]`, `FULL JOIN`, `LEFT JOIN [LATERAL]`, `RIGHT JOIN`, `CROSS JOIN [LATERAL]`.

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

## Signature / Usage

```ts
// Left Join
const result = await db.select().from(users).leftJoin(pets, eq(users.id, pets.ownerId))

// Left Join Lateral
const subquery = db.select().from(pets).where(gte(users.age, 16)).as('userPets')
const result2 = await db.select().from(users).leftJoinLateral(subquery, sql`true`)

// Right Join
const result3 = await db.select().from(users).rightJoin(pets, eq(users.id, pets.ownerId))

// Inner Join
const result4 = await db.select().from(users).innerJoin(pets, eq(users.id, pets.ownerId))

// Inner Join Lateral
const result5 = await db.select().from(users).innerJoinLateral(subquery, sql`true`)

// Full Join
const result6 = await db.select().from(users).fullJoin(pets, eq(users.id, pets.ownerId))

// Cross Join
const result7 = await db.select().from(users).crossJoin(pets)

// Cross Join Lateral
const result8 = await db.select().from(users).crossJoinLateral(subquery)
```

For `leftJoin`, `rightJoin` and `fullJoin`, the side that may not have a matching row is typed as nullable in the result (e.g. `pets` is `{...} | null` on `leftJoin`, `users` is `{...} | null` on `rightJoin`, both nullable on `fullJoin`). `innerJoin` and `crossJoin` never produce nullable sides.

## Partial select

```ts
await db.select({
  userId: users.id,
  petId: pets.id,
}).from(users).leftJoin(pets, eq(users.id, pets.ownerId))
```

`petId` becomes nullable because of the left join. For `sql` operator fields in a partial selection with joins, use `sql<type | null>` to get correct type inference:

```ts
const result = await db.select({
  userId: users.id,
  petId: pets.id,
  petName1: sql`upper(${pets.name})`,
  petName2: sql<string | null>`upper(${pets.name})`,
}).from(users).leftJoin(pets, eq(users.id, pets.ownerId))
```

To avoid many nullable fields when joining wide tables, use nested select object syntax — the whole nested object becomes nullable instead of every field individually:

```ts
await db.select({
  userId: users.id,
  userName: users.name,
  pet: {
    id: pets.id,
    name: pets.name,
    upperName: sql<string>`upper(${pets.name})`
  }
}).from(users).fullJoin(pets, eq(users.id, pets.ownerId))
```

## Aliases & Selfjoins

```ts
import { user } from "./schema";
import { alias } from "drizzle-orm/pg-core";

const parent = alias(user, "parent");
const result = await db
  .select()
  .from(user)
  .leftJoin(parent, eq(parent.id, user.parentId));
```

## Aggregating results

Drizzle delivers name-mapped results from the driver without changing structure; you map many-to-one relational data manually:

```ts
const rows = await db
  .select({ user: users, pet: pets })
  .from(users)
  .leftJoin(pets, eq(users.id, pets.ownerId));

const result = rows.reduce<Record<number, { user: typeof users.$inferSelect; pets: (typeof pets.$inferSelect)[] }>>(
  (acc, row) => {
    if (typeof acc[row.user.id] === "undefined") acc[row.user.id] = { user: row.user, pets: [] };
    if (row.pet) acc[row.user.id]!.pets.push(row.pet);
    return acc;
  },
  {}
);
```

## Many-to-many example

```ts
const usersToChatGroups = pgTable("users_to_chat_groups", {
  userId: integer("user_id").notNull().references(() => users.id),
  groupId: integer("group_id").notNull().references(() => chatGroups.id),
});

await db.select()
  .from(usersToChatGroups)
  .leftJoin(users, eq(usersToChatGroups.userId, users.id))
  .leftJoin(chatGroups, eq(usersToChatGroups.groupId, chatGroups.id))
  .where(eq(chatGroups.id, 1));
```

## Notes

- Transcribed from pg/joins.mdx (pg is the canonical dialect)
- `leftJoin`/`rightJoin`/`fullJoin` produce nullable result types on the side(s) that may be unmatched; `innerJoin`/`crossJoin` do not
- In the lateral join examples, the joined subquery (`pets` filtered by `gte(users.age, 16)`) references `users.age` from the outer query — this is the defining trait of `leftJoinLateral`/`innerJoinLateral`/`crossJoinLateral` shown in the source
- Use `sql<type | null>` for custom `sql` fields selected across a nullable-producing join
- Nested select objects (`{ pet: { ... } }`) make the whole object nullable instead of every inner field, reducing boilerplate for wide joined tables

## Related

- [select](./select.md)
- [aliases](./aliases.md)
- [operators](./operators.md)
