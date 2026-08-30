---
source: https://orm.drizzle.team/docs/batch-api
---

# Batch API

Drizzle supports running SQL statements in a batch with the Neon HTTP driver for PostgreSQL.

## Signature / Usage

```ts
const batchResponse = await db.batch([
  db.insert(usersTable).values({ id: 1, name: 'John' }).returning({ id: usersTable.id }),
  db.update(usersTable).set({ name: 'Dan' }).where(eq(usersTable.id, 1)),
  db.query.usersTable.findMany({}),
  db.select().from(usersTable).where(eq(usersTable.id, 1)),
  db.select({ id: usersTable.id, invitedBy: usersTable.invitedBy }).from(usersTable),
]);

type BatchResponse = [
  { id: number }[],
  NeonHttpQueryResult,
  { id: number; name: string; verified: number; invitedBy: number | null }[],
  { id: number; name: string; verified: number; invitedBy: number | null }[],
  { id: number; invitedBy: number | null }[],
]
```

## Notes

- All possible builders that can be used inside `db.batch`: `db.query.<table>.findMany()`, `db.query.<table>.findFirst()`, `db.select()...`, `db.update()...`, `db.delete()...`, `db.insert()...`
- Requires the Neon HTTP driver for PostgreSQL
- Transcribed from `pg/batch-api.mdx` (pg is the canonical dialect)

## Related

- [Transactions](./transactions.md)
