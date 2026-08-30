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

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

function tenantDB<T>(tenantId: string, cb: (tx: any) => T | Promise<T>): Promise<T> {
  if (tenantId && !UUID_RE.test(tenantId)) {
    throw new Error('Invalid tenantId');
  }
  return db.transaction(async (tx) => {
    if (tenantId) {
      // Use set_config() as a bound parameter instead of interpolating
      // tenantId into the SQL text, so the value is never parsed as SQL.
      await tx.execute(sql`select set_config('nile.tenant_id', ${tenantId}, true)`);
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
- Once the tenant context is set, all queries in that transaction apply only to that tenant.
- `AsyncLocalStorage` can be combined with framework middleware to populate the tenant ID per-request instead of passing it explicitly.
- Official example does `` sql`set local nile.tenant_id = '${sql.raw(tenantId)}'` ``, interpolating `tenantId` directly into the SQL text via `sql.raw()` (SQL injection if `tenantId` is user-controlled); rewritten to bind it as a `set_config()` parameter plus a UUID-format validation guard for safety.

## Related

- [PostgreSQL](./get-started-postgresql.md)
- [Database connection overview](./connect-overview.md)
