---
source: https://orm.drizzle.team/docs/dynamic-query-building
---

# Dynamic query building

By default, Drizzle query builder methods (e.g. `.where()`) can only be invoked once to conform to SQL. `.$dynamic()` removes this restriction so a query can be built up incrementally by shared functions.

## Signature / Usage

```ts
function withPagination<T extends PgSelect>(
	qb: T,
	page: number = 1,
	pageSize: number = 10,
) {
	return qb.limit(pageSize).offset((page - 1) * pageSize);
}

const query = db.select().from(users).where(eq(users.id, 1));
withPagination(query, 1); // ❌ Type error - the query builder is not in dynamic mode

const dynamicQuery = query.$dynamic();
withPagination(dynamicQuery, 1); // ✅ OK
```

Generic functions can also modify the result type, e.g. adding a join:

```ts
function withFriends<T extends PgSelect>(qb: T) {
	return qb.leftJoin(friends, eq(friends.userId, users.id));
}

let query = db.select().from(users).where(eq(users.id, 1)).$dynamic();
query = withFriends(query);
```

## Options / Props

Generic parameter types usable in dynamic query building:

| Query | Type |
| --- | --- |
| Select | `PgSelect` / `PgSelectQueryBuilder` |
| Insert | `PgInsert` |
| Update | `PgUpdate` |
| Delete | `PgDelete` |

## Notes

- The `...QueryBuilder` types are for use with standalone query builder instances (`new QueryBuilder()`); DB query builders are subclasses of them
- Without dynamic mode, calling a builder method (e.g. `.where()`) twice is a compile-time type error, not a runtime merge
- Transcribed from `pg/dynamic-query-building.mdx` (pg is the canonical dialect)

## Related

- [Transactions](./transactions.md)
