---
source: https://orm.drizzle.team/docs/overview
---

# Drizzle ORM

Drizzle ORM is a headless TypeScript ORM with a head — a library and a collection of complementary opt-in tools, not a data framework you build your project around.

## Signature / Usage

```ts
// Access your data
await db
  .select()
  .from(countries)
  .leftJoin(cities, eq(cities.countryId, countries.id))
  .where(eq(countries.id, 10));
```

## Notes

- "Headless ORM": Drizzle lets you build your project the way you want, without interfering with your project structure — unlike Django-like/Spring-like "data frameworks" you build around.
- SQL-like at its core: if you know SQL, you know Drizzle. It exposes the full power of SQL instead of abstracting it away.
- Also ships a relational **Queries API** (`db.query.<table>.findMany({ with: {...} })`) for convenient nested relational data, in addition to the SQL-like builder. Drizzle always outputs exactly 1 SQL query for a relational query.
- Drizzle ORM has exactly 0 dependencies and is dialect-specific, slim, and serverless-ready by design.
- Supports PostgreSQL, MySQL, SQLite, SingleStore, MSSQL, and CockroachDB drivers.

## Related

- [get-started](./get-started.md)
- [why-drizzle](./why-drizzle.md)
