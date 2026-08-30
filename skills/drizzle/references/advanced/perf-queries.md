---
source: https://orm.drizzle.team/docs/perf-queries
---

# Query performance

Drizzle is a thin TypeScript layer over SQL with near-zero overhead. Prepared statements reduce it further by doing SQL concatenation once on the Drizzle side, letting the database driver reuse a precompiled binary SQL executable instead of re-parsing the query.

## Signature / Usage

```ts
const db = drizzle(...);

const prepared = db.select().from(customers).prepare("statement_name");

const res1 = await prepared.execute();
const res2 = await prepared.execute();
const res3 = await prepared.execute();
```

Embedding dynamic runtime values with `sql.placeholder(...)`:

```ts
import { sql } from "drizzle-orm";

const p1 = db
  .select()
  .from(customers)
  .where(eq(customers.id, sql.placeholder('id')))
  .prepare("p1")

await p1.execute({ id: 10 }) // SELECT * FROM customers WHERE id = 10
await p1.execute({ id: 12 }) // SELECT * FROM customers WHERE id = 12

const p2 = db
  .select()
  .from(customers)
  .where(sql`lower(${customers.name}) like ${sql.placeholder('name')}`)
  .prepare("p2");

await p2.execute({ name: '%an%' }) // SELECT * FROM customers WHERE lower(name) like '%an%'
```

## Notes

- Transcribed from `pg/perf-queries.mdx` (pg is the canonical dialect)

## Related

- [JIT Mappers](./jit-mappers.md)
- [Serverless performance](./perf-serverless.md)
