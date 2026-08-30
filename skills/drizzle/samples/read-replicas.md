---
source: https://orm.drizzle.team/docs/read-replicas
---

# Read replicas

Route `SELECT` queries across one or more read replicas while writes always go to the primary, using `withReplicas()`.

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { withReplicas } from 'drizzle-orm/pg-core';

const primaryDb = drizzle("postgres://user:password@host:port/primary_db");
const read1 = drizzle("postgres://user:password@host:port/read_replica_1");
const read2 = drizzle("postgres://user:password@host:port/read_replica_2");

const db = withReplicas(primaryDb, [read1, read2]);

// reads from a replica
await db.select().from(usersTable);

// writes always go to primary
await db.delete(usersTable).where(eq(usersTable.id, 1));

// force primary even for a read
await db.$primary.select().from(usersTable);
```

## Notes

- `withReplicas()` picks a replica at random by default for `SELECT`; pass a 3rd argument `(replicas) => replica` for custom/weighted selection logic.
- All write operations (`insert`/`update`/`delete`) are always routed to the primary instance passed as the first argument.
- `db.$primary` bypasses replica selection for a specific read when you need read-your-writes consistency.
