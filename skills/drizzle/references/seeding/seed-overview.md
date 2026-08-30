---
source: https://orm.drizzle.team/docs/seed-overview
---

# Drizzle Seed

`drizzle-seed` is a TypeScript library that generates deterministic, realistic fake data to populate a database, using a seedable pseudorandom number generator (pRNG) so the same seed always produces the same data.

## Signature / Usage

```ts
import { pgTable, integer, text } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";
import { seed } from "drizzle-seed";

const users = pgTable("users", {
  id: integer().primaryKey(),
  name: text().notNull(),
});

async function main() {
  const db = drizzle(process.env.DATABASE_URL!);
  await seed(db, { users });
}

main();
```

## Options / Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `count` | `number` | `10` | Number of entities to create per table |
| `seed` | `number` | — | Seed number; a different value generates a different deterministic dataset |

## Notes

- `reset(db, schema)` resets a database populated by `seed` (e.g. `TRUNCATE ... CASCADE` for PostgreSQL); reset strategy differs per dialect.
- `.refine((f) => ({...}))` customizes per-table generator behavior: `columns` (override/exclude a column's generator, `false` to skip), `count` (override row count for that table), `with` (generate related rows for referenced tables, optionally with weighted random distribution).
- Weighted random distribution is supported both for column generator values and for the number of related entities created via `with`.
- See `seed-functions` for the full list of generator functions (`f.int`, `f.fullName`, `f.valuesFromArray`, etc.) and `seed-limitations` for known constraints.
- Transcribed from `pg/seed-overview.mdx` (dialect-specific source path; `source:` above uses the dialect-less rendered URL per this skill's pg-canonical convention).

## Related

- [seed-functions](./seed-functions.md)
- [seed-versioning](./seed-versioning.md)
- [seed-limitations](./seed-limitations.md)
