---
source: https://orm.drizzle.team/docs/read-replicas
---

# Read replicas

Send reads to one or more read replicas and everything else to the primary, using `withReplicas()` (rc.5 routing: primary by default, replicas via `db.$replica`).

Adapted (not in the official docs): the official page still routes plain `select()` to a replica; the example below uses `db.$replica` as documented for 1.0.0-rc.5.

```ts
import { drizzle } from 'drizzle-orm/node-postgres';
import { withReplicas } from 'drizzle-orm/pg-core';

const primaryDb = drizzle("postgres://user:password@host:port/primary_db");
const read1 = drizzle("postgres://user:password@host:port/read_replica_1");
const read2 = drizzle("postgres://user:password@host:port/read_replica_2");

const db = withReplicas(primaryDb, [read1, read2]);

// reads from a replica (rc.5: explicit)
await db.$replica.select().from(usersTable);

// plain reads go to the primary by default (rc.5)
await db.select().from(usersTable);

// writes always go to primary
await db.delete(usersTable).where(eq(usersTable.id, 1));

// force primary even for a read
await db.$primary.select().from(usersTable);
```

## Notes

- Migration (rc.4 → rc.5): with `withReplicas()` every query goes to the primary by default and `db.$replica` selects a replica (rc.5 release notes, https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5, docs commit 55f7f9e). The official read-replicas page body is unchanged and still describes automatic `SELECT` routing; see `references/advanced/read-replicas.md` Notes.
- `withReplicas()` picks a replica at random by default when `db.$replica` is used; pass a 3rd argument `(replicas) => replica` for custom/weighted selection logic.
- All write operations (`insert`/`update`/`delete`) are always routed to the primary instance passed as the first argument.
- `db.$primary` bypasses replica selection for a specific read when you need read-your-writes consistency.
