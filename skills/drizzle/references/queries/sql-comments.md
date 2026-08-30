---
source: https://orm.drizzle.team/docs/sql-comments
---

# SQL Comments

Adds custom tags to a query using the `.comment()` method. Tags are appended as sqlcommenter-formatted comments at the end of the query, useful for query tracking, debugging and database traffic control. Available on `select`, `insert`, `update` and `delete` queries.

## Signature / Usage

```ts
db.select().from(users).comment("my_first_tag");
```

```sql
select "id", "name" from "users" /*my_first_tag*/
```

## String comments

```ts
db.select().from(users).comment("key='val'");
```

```sql
select "id", "name" from "users" /*key='val'*/
```

## Object comments

```ts
db.select().from(users).comment({ priority: 'high', category: 'analytics' });
```

```sql
select "id", "name" from "users" /*priority='high',category='analytics'*/
```

```ts
db.select().from(users).comment({ trace: true, route: '/api/users', version: 2 });
```

```sql
select "id", "name" from "users" /*route='%2Fapi%2Fusers',trace='true',version='2'*/
```

## Usage with insert, update, delete

```ts
db.insert(users).values({ name: 'Dan' }).comment({ operation: 'seed' });
db.update(users).set({ name: 'Dan' }).where(eq(users.id, 1)).comment({ operation: 'update' });
db.delete(users).where(eq(users.id, 1)).comment({ operation: 'cleanup' });
```

## Notes

- Transcribed from pg/sql-comments.mdx (pg is the canonical dialect)
- `.comment()` cannot be used after a statement has been `.prepare()`d — add the comment before preparing
- Comments are formatted per the sqlcommenter spec (google.github.io/sqlcommenter); string values passed in an object comment are URL-encoded (e.g. `/` becomes `%2F`)

## Related

- [select](./select.md)
- [insert](./insert.md)
- [update](./update.md)
- [delete](./delete.md)
