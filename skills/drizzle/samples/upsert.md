---
source: https://orm.drizzle.team/docs/guides/upsert
---

# Upsert (insert or update on conflict)

Insert a row, updating it in place if a unique/primary-key conflict occurs, using `.onConflictDoUpdate()` (Postgres/Cockroach/SQLite) or `.onDuplicateKeyUpdate()` (MySQL).

```ts
import { users } from './schema';

const db = drizzle(...);

await db
  .insert(users)
  .values({ id: 1, name: 'John' })
  .onConflictDoUpdate({
    target: users.id,
    set: { name: 'Super John' },
  });
```

Composite target with an arithmetic update:

```ts
import { sql } from 'drizzle-orm';
import { inventory } from './schema';

await db
  .insert(inventory)
  .values({ warehouseId: 1, productId: 1, quantity: 100 })
  .onConflictDoUpdate({
    target: [inventory.warehouseId, inventory.productId], // composite primary key
    set: { quantity: sql`${inventory.quantity} + 100` },
  });
```

## Notes

- `target` accepts a single column or an array of columns (composite primary key / unique constraint).
- Reference the row that was proposed but rejected via ``sql.raw(`excluded.${column.name}`)`` (Postgres/Cockroach/SQLite) or `` sql`values(${column})` `` (MySQL) when upserting multiple rows in one call.
- `onConflictDoUpdate` accepts a `setWhere` condition to only apply the update when e.g. incoming values actually differ from the stored ones.
- **SQL Server (MSSQL) does not support `ON CONFLICT DO UPDATE`** — it has no equivalent upsert helper in this API.
