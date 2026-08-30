---
source: https://orm.drizzle.team/docs/connect-nile
---

# Drizzle <> Nile

Nile is PostgreSQL re-engineered for multi-tenant apps. It can be used with any of Drizzle's Postgres drivers; `node-postgres` is shown here.

## Signature / Usage

```ts
// Make sure to install the 'pg' package
import { drizzle } from 'drizzle-orm/node-postgres';

const db = drizzle(process.env.NILEDB_URL);

const response = await db.select().from(/* ... */);
```

Connecting to a virtual tenant database by wrapping each query in a transaction that sets the tenant context:

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { todosTable } from './db/schema';
import { sql } from 'drizzle-orm';

const db = drizzle(process.env.NILEDB_URL);

function tenantDB<T>(tenantId: string, cb: (tx: any) => T | Promise<T>): Promise<T> {
  return db.transaction(async (tx) => {
    if (tenantId) {
      await tx.execute(sql`set local nile.tenant_id = '${sql.raw(tenantId)}'`);
    }
    return cb(tx);
  }) as Promise<T>;
}

const tenantId = '01943e56-16df-754f-a7b6-6234c368b400';

const response = await tenantDB(tenantId, async (tx) => {
  // No need for a "where" clause here
  return await tx.select().from(todosTable);
});
```

## Notes

- Transcribed from `pg/connect-nile.mdx`.
- Once the tenant context is set with `set local nile.tenant_id = '...'`, all queries in that transaction apply only to that tenant.
- `AsyncLocalStorage` can be combined with framework middleware to populate the tenant ID per-request instead of passing it explicitly.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
