---
source: https://orm.drizzle.team/docs/set-operations
---

# Set Operations

SQL set operations combine the results of multiple query blocks into a single result: `UNION`, `UNION ALL`, `INTERSECT`, `INTERSECT ALL`, `EXCEPT`, `EXCEPT ALL`. Each is available both as a standalone function and as a chained builder method.

## Signature / Usage

```ts
// standalone function
import { union } from 'drizzle-orm/pg-core'

const result = await union(
  db.select({ name: users.name }).from(users),
  db.select({ name: customers.name }).from(customers)
).limit(10);

// builder pattern
const result2 = await db
  .select({ name: users.name })
  .from(users)
  .union(db.select({ name: customers.name }).from(customers))
  .limit(10);
```

`unionAll`, `intersect`, `intersectAll`, `except`, `exceptAll` follow the same two patterns (standalone function or chained method), e.g.:

```ts
import { unionAll } from 'drizzle-orm/pg-core'

const result = await unionAll(
  db.select({ transaction: onlineSales.transactionId }).from(onlineSales),
  db.select({ transaction: inStoreSales.transactionId }).from(inStoreSales)
);
```

## Notes

- `union` / `intersect` / `except` omit duplicates; the `*All` variants (`unionAll`, `intersectAll`, `exceptAll`) keep duplicates
- `except(A, B)` returns rows from A not present in B
- Transcribed from `pg/set-operations.mdx` (pg is the canonical dialect)

## Related

- [Dynamic query building](./dynamic-query-building.md)
