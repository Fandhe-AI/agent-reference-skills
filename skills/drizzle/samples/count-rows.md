---
source: https://orm.drizzle.team/docs/guides/count-rows
---

# Count rows

Count all rows, rows matching a condition, or grouped counts across a join, using the `count()` aggregation helper.

```ts
import { count, gt } from 'drizzle-orm';
import { products } from './schema';

const db = drizzle(...);

// count all rows
await db.select({ count: count() }).from(products);

// count rows matching a condition
await db
  .select({ count: count() })
  .from(products)
  .where(gt(products.price, 100));
```

Grouped count across a join:

```ts
import { count, eq } from 'drizzle-orm';
import { countries, cities } from './schema';

// count cities in each country
await db
  .select({
    country: countries.name,
    citiesCount: count(cities.id),
  })
  .from(countries)
  .leftJoin(cities, eq(countries.id, cities.countryId))
  .groupBy(countries.id)
  .orderBy(countries.name);
```

## Notes

- `count(column)` counts only non-NULL values of that column; `count()` with no argument counts all rows (equivalent to `count(*)`).
- `count()` casts its result to `number` at runtime for you; the raw ``sql`count(*)` `` form does not — annotate it as ``sql`count(*)`.mapWith(Number)`` or `` sql<number>`count(*)` `` and cast in the query for Postgres/MySQL/Cockroach, where `count()` returns a driver-level bigint/string.
- SQLite and MSSQL return `count()` as a native integer, so no cast is needed there.
