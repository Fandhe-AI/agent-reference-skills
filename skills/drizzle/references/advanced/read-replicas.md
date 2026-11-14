---
source: https://orm.drizzle.team/docs/read-replicas
---

# Read Replicas

`withReplicas()` manages read/write routing when a project has read replica instances: `SELECT` queries go to read replicas, while insert/update/delete operations go to the primary instance.

## Signature / Usage

```ts
import { sql } from 'drizzle-orm';
import { drizzle } from 'drizzle-orm/node-postgres';
import { boolean, jsonb, pgTable, serial, text, timestamp, withReplicas } from 'drizzle-orm/pg-core';

const usersTable = pgTable("users", {
  id: serial().primaryKey(),
  name: text().notNull(),
});

const primaryDb = drizzle("postgres://user:password@host:port/primary_db");
const read1 = drizzle("postgres://user:password@host:port/read_replica_1");
const read2 = drizzle("postgres://user:password@host:port/read_replica_2");

const db = withReplicas(primaryDb, [read1, read2]);

// Read from either read1 or read2
await db.select().from(usersTable)

// Uses the primary database
await db.delete(usersTable).where(eq(usersTable.id, 1))

// Force using the primary instance even for a read
await db.$primary.select().from(usersTable);
```

Custom replica selection logic (e.g. weighted random choice):

```ts
const db = withReplicas(primaryDb, [read1, read2], (replicas) => {
    const weight = [0.7, 0.3];
    let cumulativeProbability = 0;
    const rand = Math.random();

    for (const [i, replica] of replicas.entries()) {
      cumulativeProbability += weight[i]!;
      if (rand < cumulativeProbability) return replica;
    }
    return replicas[0]!
});
```

## Notes

- Transcribed from `pg/read-replicas.mdx` (pg is the canonical dialect)
- Migration (rc.4 → rc.5): the page body above is verbatim and still says that `SELECT` queries are routed to replicas. The rc.5 release notes and the v0 → v1 changes page state otherwise: with `withReplicas(primary, replicas)` every query goes to the primary database by default, and reads must opt in to a replica with `db.$replica`. The two official pages disagree at docs commit 55f7f9e; for `drizzle-orm@rc` (1.0.0-rc.5) follow the rc.5 behavior below.
- Source: https://orm.drizzle.team/docs/latest-releases/drizzle-orm-v1rc5 and https://orm.drizzle.team/docs/v0-v1-changes (docs repo commit 55f7f9e, retrieved 2026-11-14)

```ts
// After: drizzle-orm@rc, with db created by withReplicas()
await db.select().from(users); // primary
await db.$replica.select().from(users); // replica
```

## Related

- [Cache](./cache.md)
- [Serverless performance](./perf-serverless.md)
