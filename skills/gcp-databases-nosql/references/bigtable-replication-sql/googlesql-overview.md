---
source: https://docs.cloud.google.com/bigtable/docs/googlesql-overview
---

# GoogleSQL for Bigtable overview

GoogleSQL statements query Bigtable data, from Bigtable Studio in the Google Cloud console or programmatically with the Java, Python and Go client libraries. SQL queries are handled by cluster nodes like NoSQL requests, so the same practices apply (avoid full table scans and complex filters).

## Signature / Usage

### Latest value of a column

```sql
SELECT _key, columnFamily['qualifier'] FROM myTable
```

### All versions (history)

```sql
SELECT _key, info FROM users(with_history => TRUE) WHERE _key = 'user_123';
```

```sql
SELECT
  address['street'][0].value AS moved_to,
  address['street'][1].value AS moved_from,
  FORMAT_TIMESTAMP('%Y-%m-%d', address['street'][0].timestamp) AS moved_on,
FROM myTable(with_history => TRUE)
WHERE _key = 'user1'
```

### Point in time and ranges

```sql
SELECT address
FROM myTable(as_of => TIMESTAMP('2022-01-10T13:14:00.234Z'))
WHERE _key = 'user1'
```

```sql
SELECT metrics['temperature'] AS temp_versioned
FROM
sensorReadings(with_history => true, after => TIMESTAMP('2023-01-04T23:00:00.000Z'),
      before => TIMESTAMP('2023-01-05T01:00:00.000Z'))
WHERE _key LIKE 'sensorA%'
```

### UNPACK time series and JSON

Adapted (not in the official docs): the inner alias is changed from `temperature_versioned` to `temp_versioned` so that it matches the outer `SELECT temp_versioned` and the result table in the source.

```sql
SELECT temp_versioned, _timestamp
FROM
UNPACK((
  SELECT metrics['temperature'] AS temp_versioned
  FROM
  sensorReadings(with_history => true, after => TIMESTAMP('2023-01-04T23:00:00.000Z'),
        before => TIMESTAMP('2023-01-05T01:00:00.000Z'))
  WHERE _key LIKE 'sensorA%'
));
```

```sql
SELECT _key, JSON_VALUE(session['payload'],'$.abc') AS abc FROM analytics
```

### Escape names with backticks

```sql
SELECT * FROM `my.table` WHERE _key = 'r1'
```

### Python (asyncio) client

Adapted (not in the official docs): the second query string was made an f-string so `{table_id}` is interpolated.

```python
from google.cloud.bigtable.data import BigtableDataClientAsync

async def execute_query(project_id, instance_id, table_id):
    async with BigtableDataClientAsync(project=project_id) as client:
        query = (
          "SELECT cf1['bytesCol'] AS bytesCol, CAST(cf2['stringCol'] AS STRING) AS stringCol,"
          f" cf3 FROM {table_id} WHERE _key='mykey'"
        )
        async for row in await client.execute_query(query, instance_id):
          print(row["_key"], row["bytesCol"], row["stringCol"], row["cf3"])
```

## Options / Props

Temporal filter arguments, applied in this order (`as_of` before `with_history`, `latest_n` last); timestamps must be valid:

| Argument | Description |
|----------|-------------|
| `as_of` | Timestamp. Latest values with timestamps less than or equal to it |
| `with_history` | Boolean. Latest value as scalar, or timestamped values as `STRUCT` |
| `after` | Timestamp, exclusive. Requires `with_history => TRUE` |
| `after_or_equal` | Timestamp, inclusive. Requires `with_history => TRUE` |
| `before` | Timestamp, exclusive. Requires `with_history => TRUE` |
| `latest_n` | Integer >= 1, values per column qualifier. Requires `with_history => TRUE` |

Client library minimum versions: Go `cloud.google.com/go/bigtable` 1.36.0, Java `java-bigtable` 2.57.3, Python `python-bigtable` 2.30.1.

## Notes

- Corrected from the official docs: the Python sample had `" cf3 FROM {table_id} WHERE _key='mykey'"` as a plain string; it is now an f-string.
- Corrected from the official docs: the `UNPACK` example selects `temp_versioned` in the outer query while the inner subquery aliases the column `SELECT metrics['temperature'] AS temperature_versioned`; the outer column would not exist.
- Not supported in the current release: DML beyond `SELECT`, DDL, data access control statements, subqueries, `JOIN`, `UNION`, CTEs (the `UNPACK` input subquery is a table value function). You can create continuous materialized views and logical views with GoogleSQL.
- Schema: special column `_key` (row key) plus one `MAP` column per column family. Default map is qualifier to latest value; with `with_history` it is `MAP<key, ARRAY<STRUCT<timestamp, value>>>`, newest first.
- Unused columns appear as an empty map and return `NULL`; `WHERE family['column1'] IS NOT NULL` filters rows. `STRING` is implicitly cast to `BYTES`; use `CAST` to define types at read time.
- `UNPACK` input must be a subquery with `with_history => true`; the columns must be selected in the subquery; it adds `_timestamp`.
- Reserved words and names with special characters (period in a table name) need backticks.
- For production, list column family IDs instead of `SELECT *` (temporary errors when families are added or deleted); view definitions cannot use `SELECT *`.
- `ARRAY_LENGTH(MAP_ENTRIES(address))` counts versions. Garbage collection policies control retained versions.
- The source also shows Go and Java samples (omitted here); Go needs the prepared-statement API (`PrepareStatement`, `Bind`, `Execute`).
- Wide-column NoSQL database; GoogleSQL for Bigtable is not Cloud SQL or Spanner (`gcp-databases-relational`). Client library setup patterns: `gcp-client-libraries`.
- Source: https://docs.cloud.google.com/bigtable/docs/googlesql-overview (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [googlesql-examples.md](./googlesql-examples.md)
- [routing.md](./routing.md)
