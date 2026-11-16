---
source: https://docs.cloud.google.com/spanner/docs/secondary-indexes
---

# Secondary indexes

Spanner indexes each table's primary key automatically; secondary indexes speed up lookups and scans on other columns. An index stores the base table's key columns, the indexed columns, and any `STORING` (GoogleSQL) / `INCLUDE` (PostgreSQL) columns. Indexes can be global (default) or interleaved.

## Signature / Usage

### Create indexes

Add indexes when creating the table where possible (send table and index DDL in one request). Indexes on existing tables are backfilled in the background without taking the database offline.

```googlesql
CREATE INDEX SingersByFirstLastName ON Singers(FirstName, LastName);
```

Interleaved index (colocated with the parent row; GoogleSQL uses a comma before `INTERLEAVE IN`, PostgreSQL does not):

```googlesql
CREATE INDEX SongsBySingerAlbumSongName ON Songs(SingerId, AlbumId, SongName),
    INTERLEAVE IN Albums;
```

```postgresql
CREATE INDEX SongsBySingerAlbumSongName ON Songs(SingerId, AlbumId, SongName)
    INTERLEAVE IN Albums;
```

Descending keys are annotated per key: `SongName DESC` applies only to `SongName`. An index can also be interleaved in a non-ancestor table (for example `Publishers`) when the key type, sort order and nullability match.

### Index-only scans (STORING / INCLUDE)

```googlesql
CREATE INDEX AlbumsByAlbumTitle2 ON Albums(AlbumTitle) STORING (MarketingBudget);
```

```postgresql
CREATE INDEX AlbumsByAlbumTitle2 ON Albums(AlbumTitle) INCLUDE (MarketingBudget);
```

### Alter and drop

`ALTER INDEX` changes only the stored columns, never the index keys. Remove a stored column with `ALTER INDEX AlbumsByAlbumTitle DROP STORED COLUMN MarketingBudget` (GoogleSQL).

```googlesql
ALTER INDEX AlbumsByAlbumTitle ADD STORED COLUMN MarketingBudget
```

```postgresql
ALTER INDEX AlbumsByAlbumTitle ADD INCLUDE COLUMN MarketingBudget
```

Drop the index named `SingersByFirstLastName` (the source's example). Not from the source: dropping removes only the index and the table rows are kept, but queries that force it with `FORCE_INDEX` and reads that name it then fail, and re-creating it needs a full backfill (minutes to many hours, see Notes):

```sql
DROP INDEX SingersByFirstLastName;
```

### NULL handling

```googlesql
CREATE NULL_FILTERED INDEX SingersByFirstLastNameNoNulls
    ON Singers(FirstName, LastName);
```

PostgreSQL uses `CREATE INDEX ... WHERE FirstName IS NOT NULL AND LastName IS NOT NULL` instead of `NULL_FILTERED`. A query must repeat the filter to use a null-filtered index:

```googlesql
SELECT FirstName, LastName
    FROM Singers@{FORCE_INDEX=SingersByFirstLastNameNoNulls}
    WHERE FirstName = 'John' AND LastName IS NOT NULL;
```

### Expression indexes

```googlesql
CREATE INDEX VenuesByCity ON Venues((JSON_VALUE(VenueData.address.city)));
```

```postgresql
CREATE INDEX VenuesByCity ON Venues((VenueData -> 'address' ->> 'city'));
```

### Force an index in SQL

```googlesql
SELECT AlbumId, AlbumTitle, MarketingBudget
    FROM Albums@{FORCE_INDEX=AlbumsByAlbumTitle}
    WHERE AlbumTitle >= "Aardvark" AND AlbumTitle < "Goo";
```

PostgreSQL uses the hint comment form `FROM Albums /*@ FORCE_INDEX = AlbumsByAlbumTitle */`. Scan the base table instead: `FROM MyTable@{FORCE_INDEX=_BASE_TABLE}`. To scan an index in a table with named schemas (GoogleSQL): `FROM NAMED_SCHEMA_NAME.TABLE_NAME@{FORCE_INDEX="NAMED_SCHEMA_NAME.TABLE_INDEX_NAME"}`.

### Check backfill progress and cancel

```bash
gcloud spanner operations list --instance=INSTANCE-NAME \
--database=DATABASE-NAME --type=DATABASE_UPDATE_DDL
```

`gcloud spanner operations describe --instance=INSTANCE-NAME --database=DATABASE-NAME projects/PROJECT-NAME/instances/INSTANCE-NAME/databases/DATABASE-NAME/operations/OPERATION_ID` shows a `progress` section with the `progressPercent` of each statement. The `gcloud spanner operations describe --help` synopsis takes the short `OPERATION-ID` with `--instance` and `--database` (as `operations cancel` below does).

```bash
gcloud spanner operations cancel OPERATION_ID \
    --instance=INSTANCE \
    --database=DATABASE
```

Replace `INSTANCE-NAME` / `INSTANCE`, `DATABASE-NAME` / `DATABASE` and `OPERATION_ID` with your values; `PROJECT-NAME` in the operation path must be the project ID (the source calls it "the project name"). List existing indexes with `gcloud spanner databases ddl describe DATABASE --instance=INSTANCE`.

## Options / Props

| Choice | Interleaved index | Global index (default) |
|---|---|---|
| Storage | Co-located with the parent row in the same split | Separate root table, splits independently |
| Key requirement | Parent table's primary key must be a prefix of the index keys (type and sort order match; names need not) | None |
| Write overhead | Low when interleaved in an ancestor of the base table; higher in a non-ancestor (may need distributed transactions) | Higher; updates often span splits (two-phase commit) |
| Best for | Queries scoped to one parent entity | Queries across the whole database (e.g. find user by email) |

| Option | Dialect | Effect |
|---|---|---|
| `STORING (...)` / `INCLUDE (...)` | GoogleSQL / PostgreSQL | Stores column copies; avoids the join to the base table |
| `NULL_FILTERED` / `WHERE col IS NOT NULL` | GoogleSQL / PostgreSQL | Omits rows with NULL keys; GoogleSQL applies it to all key columns |
| `UNIQUE` | both | Rejects duplicate keys at commit; creation fails if existing data has duplicates |
| `DESC` on a key | both | Descending order for that key only |
| `INTERLEAVE IN` | both | Interleaves the index in a table |

## Notes

- Index creation can take minutes to many hours; it runs at low priority and is bound by schema update performance constraints. Follow the large schema update guidance when adding many indexes.
- A commit timestamp column as the first index key can create hotspots.
- `PRIMARY_KEY` is reserved and cannot be an index name.
- `FORCE_INDEX` errors if the index does not exist, is on another base table, or the query lacks the required `NULL` filter for a `NULL_FILTERED` index. Spanner picks indexes automatically; the source advises `FORCE_INDEX` for critical queries. Constructing a new optimizer statistics package can improve automatic selection.
- The read interface does not pick an index automatically and cannot join to the base table: the index must contain every requested non-key column (use `STORING` / `INCLUDE`, or query again by primary key). Index reads return ascending by key; for descending, annotate every key with `DESC` and give the key range with start key greater than end key.
- While an `ALTER INDEX ... ADD` backfill runs, the added column is not readable; the larger index can slow queries afterward.
- NULL sorts as the smallest value (first in `ASC`, last in `DESC`). Indexes include NULLs by default.
- `UNIQUE NULL_FILTERED` does not enforce uniqueness when a key part is NULL (with `CREATE UNIQUE NULL_FILTERED INDEX ExampleIndex ON ExampleTable (Key1, Key2, Col1)`, the example rows `1, NULL, 1, 1` and `1, NULL, 2, 1` are both accepted); mark the column `NOT NULL` or drop the filter to enforce it.
- Proto-field indexes: index a proto field through a stored generated column (primitive or `ENUM` fields only); repeated fields cannot be indexed, and an indexed field can no longer be modified or removed from the proto schema.
- Cancelling a multi-index operation cancels only indexes not yet created; created ones stay. `DROP INDEX` and `operations cancel` change a live database; try them on a disposable database first.
- The source also shows Console steps, REST/curl and PowerShell progress checks, C++/C#/Go/Java/PHP/Ruby/Node.js/Python samples for SQL and read-interface index use (read with `index="AlbumsByAlbumTitle"`), the example schema, and the proto-field `CREATE TABLE` example (abbreviated with `...` in the source, so not runnable as is).
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; distinct from `supabase` and `drizzle`. Client setup: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/spanner/docs/secondary-indexes (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [change-streams-details.md](./change-streams-details.md)
- Schema updates: https://docs.cloud.google.com/spanner/docs/schema-updates
- DDL reference: https://docs.cloud.google.com/spanner/docs/reference/standard-sql/data-definition-language
- gcloud: https://docs.cloud.google.com/sdk/gcloud/reference/spanner/operations/describe
