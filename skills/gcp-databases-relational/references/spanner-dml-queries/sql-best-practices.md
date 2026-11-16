---
source: https://docs.cloud.google.com/spanner/docs/sql-best-practices
---

# SQL best practices

Best practices for constructing Spanner SQL statements so the query optimizer finds efficient execution plans: query parameters, secondary indexes, key lookups, joins, timestamp predicate pushdown, avoiding large reads in read-write transactions, `ORDER BY`, `STARTS_WITH` and commit timestamps. The examples use a `Singers` / `Albums` sample schema (`Albums` interleaved in `Singers` with `ON DELETE CASCADE`).

## Signature / Usage

### Sample schema (GoogleSQL)

```googlesql
CREATE TABLE Singers (
 SingerId   INT64 NOT NULL,
 FirstName  STRING(1024),
 LastName   STRING(1024),
 SingerInfo BYTES(MAX),
 BirthDate  DATE
) PRIMARY KEY (SingerId);

CREATE TABLE Albums (
 SingerId     INT64 NOT NULL,
 AlbumId      INT64 NOT NULL,
 AlbumTitle   STRING(MAX),
 ReleaseDate  DATE
) PRIMARY KEY (SingerId, AlbumId),
INTERLEAVE IN PARENT Singers ON DELETE CASCADE;
```

### Use secondary indexes

```googlesql
CREATE INDEX SingersByLastName ON Singers (LastName);
```

Specify the index with an index directive in the `FROM` clause (GoogleSQL, then PostgreSQL):

```googlesql
SELECT s.SingerId
FROM Singers@{FORCE_INDEX=SingersByLastName} AS s
WHERE s.LastName = 'Smith';
```

```postgresql
SELECT s.SingerId
FROM Singers /*@ FORCE_INDEX=SingersByLastName */ AS s
WHERE s.LastName = 'Smith';
```

With named schemas (GoogleSQL):

```googlesql
FROM NAMED_SCHEMA_NAME.TABLE_NAME@{FORCE_INDEX="NAMED_SCHEMA_NAME.TABLE_INDEX_NAME"}
```

Store a column in the index to avoid a back join (`STORING` for GoogleSQL, `INCLUDE` for PostgreSQL):

```googlesql
CREATE INDEX SingersByLastName ON Singers (LastName) STORING (FirstName);
```

```postgresql
CREATE INDEX SingersByLastName ON Singers (LastName) INCLUDE (FirstName);
```

Index for ordered results (remove a sort step):

```sql
CREATE INDEX AlbumsByReleaseDateTitleDesc on Albums (ReleaseDate, AlbumTitle DESC);
```

```googlesql
SELECT a.AlbumTitle, a.ReleaseDate
FROM Albums@{FORCE_INDEX=AlbumsByReleaseDateTitleDesc} AS a
ORDER BY a.ReleaseDate, a.AlbumTitle DESC;
```

### Optimize range key lookups

Sparse, non-adjacent keys (for example `{1, 5, 1000}`): use a query parameter and `UNNEST` (PostgreSQL uses `$1`):

```googlesql
SELECT *
FROM Table AS t
WHERE t.Key IN UNNEST (@KeyList)
```

Adjacent keys in a range (for example `{1,2,3,4,5}`; `@min` and `@max` bound to 1 and 5):

```googlesql
SELECT *
FROM Table AS t
WHERE t.Key BETWEEN @min AND @max
```

### Optimize joins

Join interleaved tables by primary key:

```sql
SELECT s.FirstName, a.ReleaseDate
FROM Singers AS s JOIN Albums AS a ON s.SingerId = a.SingerId;
```

Force the join order (GoogleSQL):

```googlesql
SELECT *
FROM Singers AS s JOIN@{FORCE_JOIN_ORDER=TRUE} Albums AS a
ON s.SingerId = a.Singerid
WHERE s.LastName LIKE '%x%' AND a.AlbumTitle LIKE '%love%';
```

Choose a join method with the `JOIN_METHOD` hint (PostgreSQL syntax is `JOIN/*@ JOIN_METHOD=HASH_JOIN */`):

Adapted (not in the official docs): the source's join condition `ON a.SingerId = a.SingerId` compares a column with itself; it is changed to `ON s.SingerId = a.SingerId`.

```googlesql
SELECT *
FROM Singers s JOIN@{JOIN_METHOD=HASH_JOIN} Albums AS a
ON s.SingerId = a.SingerId
```

### Timestamp predicate pushdown

```googlesql
@{allow_timestamp_predicate_pushdown=TRUE}
SELECT s.SingerInfo
FROM Singers s
WHERE s.ModificationTime > TIMESTAMP_SUB(CURRENT_TIMESTAMP(), INTERVAL 12 HOUR);
```

### ORDER BY and STARTS_WITH

```sql
SELECT * FROM Singers
ORDER BY SingerId;
```

Not recommended (assumes `@like_clause` is bound to `'Love%'`), then recommended (assumes `@prefix` is bound to `'Love'`; faster if an index is defined on `Albums.AlbumTitle`):

```googlesql
SELECT a.AlbumTitle FROM Albums a
WHERE a.AlbumTitle LIKE @like_clause;
```

```googlesql
SELECT a.AlbumTitle FROM Albums a
WHERE STARTS_WITH(a.AlbumTitle, @prefix);
```

## Options / Props

| Topic | Source guidance |
|---|---|
| Query parameters | Substitute for arbitrary expressions, not identifiers, column names or table names. Same parameter name can be used more than once. Give cached plans, simpler composition, SQL injection protection. |
| Literal auto-parameterization | Spanner converts literals to parameters when the optimal plan doesn't depend on the literal values; queries whose plan might depend on literals are not converted. Force it with the `auto_parameter` hint. Application-side parameters remain the best practice. |
| Automatic index use | Spanner uses a secondary index automatically once three days have passed since database creation; explicitly specifying the index directive is still best. |
| Index trade-off | Each secondary index typically adds an extra node to each commit; a few indexes are fine for most workloads, benchmark yours. |
| Key list shape | Sparse keys: `UNNEST` with one parameter (better than `OR` with many). Adjacent keys: `BETWEEN`; don't use it for `{1, 5, 1000}` because it scans every value between 1 and 1000. |
| `HASH JOIN` / `APPLY JOIN` | With a selective `WHERE` on one side, put the table producing the fewest rows first; hash join picks the left side as build and the right as probe, apply join picks left as outer and right as inner. |
| Timestamp pushdown | Needs the pushdown hint enabled, an age restriction at or below the spill policy age (`ssd_to_hdd_spill_timespan` in `CREATE LOCALITY GROUP` / `ALTER LOCALITY GROUP`), and a commit timestamp column in the same locality group with an age-based tiered storage policy. |

## Notes

- Large reads in read-write transactions block writers on the rows read until commit or abort. Alternative pattern from the source: read in a read-only transaction (no locks), optionally process, start a read-write transaction, verify the critical rows are unchanged (roll back and restart if changed), then commit.
- Result order is guaranteed only with `ORDER BY`; when an index provides the order Spanner doesn't sort explicitly, so check the query plan.
- Parameterized `LIKE` patterns are evaluated at execution time, so all rows are read; for a `foo%` pattern on an indexed column use `STARTS_WITH`.
- Commit timestamp columns let Spanner reduce I/O for queries restricted to recently written rows (GoogleSQL and PostgreSQL pages linked in the source).
- If some queried columns of a row are on SSD and others on HDD, using the pushdown hint can be slower because cells age by their own commit timestamps; update all queried columns in the same transaction.
- Corrected from the official docs: the source's hash join examples read `ON a.SingerId = a.SingerId` (both dialects); the corrected condition matches the source's own join examples on the same page.
- The pushdown example assumes a commit-timestamp column `ModificationTime` (not in the sample schema), as the source's prerequisites describe.
- The `STORING` index is an alternative to the first `SingersByLastName` definition, not an addition; creating both fails because the index name already exists.
- Source inconsistency: one of the source's join sections puts prose about interleaved tables (rows of `Albums` stored in the same splits as the parent `Singers` row, so joins complete locally) inside a `sql` code fence; it is carried here as prose only. The source's PostgreSQL `ORDER BY` example declares the alias `s` but selects `a.` columns, and its PostgreSQL `STARTS_WITH` example uses `$2` without `$1`; those PostgreSQL blocks are omitted and the GoogleSQL forms are shown.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; it is distinct from `supabase` and `drizzle`.
- The source also shows PostgreSQL variants, the console steps for viewing a plan (Spanner Studio, **Explanation**) and the PostgreSQL schema.
- Source: https://docs.cloud.google.com/spanner/docs/sql-best-practices (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [query-execution-plans.md](./query-execution-plans.md)
- [dml-best-practices.md](./dml-best-practices.md)
- Secondary indexes: https://docs.cloud.google.com/spanner/docs/secondary-indexes
- Tune a query with the visualizer: https://docs.cloud.google.com/spanner/docs/tune-query-with-visualizer
