---
source: https://orm.drizzle.team/docs/operators
---

# Filter and conditional operators

Drizzle natively supports all dialect-specific filter and conditional operators, importable from `drizzle-orm`:

```ts
import { eq, ne, gt, gte, lt, lte, and, or, not } from "drizzle-orm";
```

## Signature / Usage

```ts
import { eq, gt, and } from "drizzle-orm";

db.select().from(table).where(eq(table.column, 5));
db.select().from(table).where(eq(table.column1, table.column2));
db.select().from(table).where(and(gt(table.column, 5), lt(table.column, 7)));
```

```sql
SELECT * FROM "table" WHERE "table"."column" = 5
SELECT * FROM "table" WHERE "table"."column1" = "table"."column2"
SELECT * FROM "table" WHERE ("table"."column" > 5 AND "table"."column" < 7)
```

## Options / Props

| Name | Description |
| --- | --- |
| `eq(a, b)` | Value equal to `b` (or another column) |
| `ne(a, b)` | Value not equal to `b` |
| `gt(a, b)` | Value greater than `b` |
| `gte(a, b)` | Value greater than or equal to `b` |
| `lt(a, b)` | Value less than `b` |
| `lte(a, b)` | Value less than or equal to `b` |
| `exists(query)` | `EXISTS (subquery)` |
| `notExists(query)` | `NOT EXISTS (subquery)` |
| `isNull(col)` | `col IS NULL` |
| `isNotNull(col)` | `col IS NOT NULL` |
| `inArray(col, values \| subquery)` | `col IN (...)`, values or a subquery |
| `notInArray(col, values \| subquery)` | `col NOT IN (...)` |
| `between(col, a, b)` | `col BETWEEN a AND b` |
| `notBetween(col, a, b)` | `col NOT BETWEEN a AND b` |
| `like(col, pattern)` | `col LIKE pattern`, case sensitive |
| `notLike(col, pattern)` | `col NOT LIKE pattern` |
| `ilike(col, pattern)` | `col ILIKE pattern`, case insensitive |
| `notIlike(col, pattern)` | `col NOT ILIKE pattern` |
| `not(condition)` | Negates the condition |
| `and(...conditions)` | All conditions must be `true` |
| `or(...conditions)` | Any condition must be `true` |
| `arrayContains(col, list \| subquery)` | `col @> list` — column/expression contains all elements of `list` |
| `arrayContained(col, list)` | `col <@ list` — `list` contains all elements of column/expression |
| `arrayOverlaps(col, list)` | `col && list` — column/expression contains any element of `list` |

## Examples

```ts
import { inArray, between, like, ilike, arrayContains } from "drizzle-orm";

db.select().from(table).where(inArray(table.column, [1, 2, 3, 4]));
db.select().from(table).where(between(table.column, 2, 7));
db.select().from(table).where(like(table.column, "%llo wor%"));
db.select().from(table).where(ilike(table.column, "%llo wor%"));

await db.select({ id: posts.id }).from(posts)
  .where(arrayContains(posts.tags, ['Typescript', 'ORM']));
```

`inArray`/`notInArray` also accept a subquery instead of a static array:

```ts
const query = db.select({ data: table2.column }).from(table2);
db.select().from(table).where(inArray(table.column, query));
```

## Notes

- Transcribed from pg/operators.mdx (pg is the canonical dialect)
- All values passed to filter operators (and to the `sql` function) are parameterized automatically
- `arrayContains`/`arrayContained`/`arrayOverlaps` operate on PostgreSQL array columns (`@>`, `<@`, `&&`)
- Custom filters not covered by these operators can be written directly with the `sql` function

## Related

- [select](./select.md)
- [sql](./sql.md)
- [joins](./joins.md)
