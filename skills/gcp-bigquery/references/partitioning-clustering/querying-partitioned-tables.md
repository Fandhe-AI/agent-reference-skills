---
source: https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables
---

# Query partitioned tables

Filtering on the partitioning column lets BigQuery prune partitions, which reduces bytes scanned and query cost. Covers time-unit column-partitioned, ingestion-time partitioned and integer-range partitioned tables, the `_PARTITIONTIME` / `_PARTITIONDATE` pseudocolumns, which filter forms prune, and the require-partition-filter behaviour.

## Signature / Usage

### Time-unit column-partitioned table

Assume `dataset.table` is partitioned on `transaction_date`; the query prunes dates before `2016-01-01`.

```sql
SELECT * FROM dataset.table
WHERE transaction_date >= '2016-01-01'
```

### Ingestion-time partitioned table

Filter on `_PARTITIONTIME` (or `_PARTITIONDATE` for daily partitioning):

```sql
SELECT
  column
FROM
  dataset.table
WHERE
  _PARTITIONTIME BETWEEN TIMESTAMP('2016-01-01') AND TIMESTAMP('2016-01-02')
```

Selecting a pseudocolumn requires an alias:

```sql
SELECT
  _PARTITIONTIME AS pt, column
FROM
  dataset.table
```

```sql
SELECT
  _PARTITIONDATE AS pd, column
FROM
  dataset.table
```

The pseudocolumns are not returned by `SELECT *`; select them explicitly:

```sql
SELECT
  _PARTITIONTIME AS pt, *
FROM
  dataset.table
```

### Pseudocolumn filter forms

Put `_PARTITIONTIME` by itself on the left side of the comparison. The two queries are equivalent in bytes processed; the second often performs better:

```sql
-- Might be slower.
SELECT
  field1
FROM
  dataset.table1
WHERE
  TIMESTAMP_ADD(_PARTITIONTIME, INTERVAL 5 DAY) > TIMESTAMP("2016-04-15");

-- Often performs better.
SELECT
  field1
FROM
  dataset.table1
WHERE
  _PARTITIONTIME > TIMESTAMP_SUB(TIMESTAMP('2016-04-15'), INTERVAL 5 DAY);
```

Use constant expressions. The first condition prunes; the second does not because it uses dynamic table values:

```sql
SELECT
  column
FROM
  dataset.table2
WHERE
  -- This filter condition limits the scanned partitions:
  _PARTITIONTIME BETWEEN TIMESTAMP('2017-01-01') AND TIMESTAMP('2017-03-01')
  -- This one doesn't, because it uses dynamic table values:
  AND _PARTITIONTIME = (SELECT MAX(timestamp) from dataset.table1)
```

Do not combine other columns in a `_PARTITIONTIME` filter; this scans all partitions because `field1` is a table column:

```sql
-- Scans all partitions of table2. No pruning.
SELECT
  field1
FROM
  dataset.table2
WHERE
  _PARTITIONTIME + field1 = TIMESTAMP('2016-03-28');
```

A view that filters on `_PARTITIONTIME` provides pruning for a recurring range:

```sql
-- This view provides pruning.
CREATE VIEW dataset.past_week AS
  SELECT *
  FROM
    dataset.partitioned_table
  WHERE _PARTITIONTIME BETWEEN
    TIMESTAMP_TRUNC(TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 7 * 24 HOUR), DAY)
    AND TIMESTAMP_TRUNC(CURRENT_TIMESTAMP, DAY);
```

### Integer-range partitioned table

With partitioning specification `customer_id:0:100:10`, the query scans the three partitions starting at 30, 40 and 50:

```sql
SELECT * FROM dataset.table
WHERE customer_id BETWEEN 30 AND 50

+-------------+-------+
| customer_id | value |
+-------------+-------+
|          40 |    41 |
|          45 |    46 |
|          30 |    31 |
|          35 |    36 |
|          50 |    51 |
+-------------+-------+
```

Pruning is not supported for functions over an integer-range partitioned column; this scans the entire table:

```sql
SELECT * FROM dataset.table
WHERE customer_id + 1 BETWEEN 30 AND 50
```

### Write-optimized storage (`__UNPARTITIONED__`)

Rows streamed to a partitioned table and still in write-optimized storage sit in the `__UNPARTITIONED__` partition and have `NULL` in `_PARTITIONTIME` and `_PARTITIONDATE`. Data streamed directly to a specific partition does not use it.

```sql
SELECT
  column
FROM dataset.table
WHERE
  _PARTITIONTIME IS NULL
```

### Best practice: constant filter expression

Prunes:

```sql
SELECT
  t1.name, t1.quantity
FROM
  table1 AS t1
WHERE
  t1.ts = CURRENT_TIMESTAMP()
```

Does not prune (the predicate compares the partitioning column to a dynamic value):

```sql
SELECT
  t1.name, t1.quantity
FROM
  table1 AS t1
WHERE
  t1.ts = (SELECT timestamp FROM table3 WHERE key = 2)
```

These predicates do not prune because they depend on a second, non-constant column `ts2` or `duration`:

```sql
WHERE ts >= ts2

WHERE ts < CURRENT_TIMESTAMP() - duration
```

### Best practice: isolate the partitioning column or use supported functions

Functions on the partitioning column that support pruning when their other arguments are constant:

- `DATE_ADD`, `DATE_DIFF`, `DATE_SUB`, `DATE_TRUNC`, `EXTRACT` with `YEAR` part
- `DATETIME_DIFF`
- `TIMESTAMP_ADD`, `TIMESTAMP_DIFF`, `TIMESTAMP_SUB`, `TIMESTAMP_TRUNC`, `EXTRACT` with `DATE` or `YEAR` parts
- `FORMAT_TIMESTAMP` with format specifiers `%F`, `%Y-%m-%d` and `%Y%m%d`

Other functions and complex mathematical operations require a full table scan. Use a dry run to verify pruning. Examples that support pruning (partitioning column `datehour`):

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE datehour = '2025-03-30 12:00:00';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE datehour >= '2025-03-30'
  AND datehour < TIMESTAMP_ADD('2025-03-30', INTERVAL 1 DAY);
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE DATE(datehour) = '2025-03-30';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE EXTRACT(DATE FROM datehour) = '2025-03-30';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE CAST(datehour AS DATE) = '2025-03-30';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE datehour >= '2025-01-01' AND datehour < '2025-02-01';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE TIMESTAMP_TRUNC(datehour, MONTH) >= '2025-04-01'
  AND TIMESTAMP_TRUNC(datehour, MONTH) < '2025-07-01';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE TIMESTAMP_DIFF(datehour, '2025-01-01', DAY) < 1;
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE TIMESTAMP_ADD(datehour, INTERVAL 1 DAY) < '2025-01-03';
```

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE TIMESTAMP_SUB(datehour, INTERVAL 1 DAY) < '2025-01-01';
```

This query skips all partitions because the predicate matches no row:

```sql
SELECT COUNT(*) FROM `bigquery-public-data.wikipedia.pageviews_2025`
WHERE EXTRACT(YEAR FROM datehour) = 1900;
```

Selecting the first day of each month, with pruning:

```sql
SELECT COUNT(*) FROM bigquery-public-data.wikipedia.pageviews_2025
WHERE DATE(datehour) IN UNNEST(GENERATE_DATE_ARRAY(
  DATE_TRUNC(CURRENT_DATE(), YEAR),
  DATE(DATE_TRUNC(CURRENT_DATE(), YEAR) + INTERVAL 1 YEAR - INTERVAL 1 DAY),
  INTERVAL 1 MONTH
))
```

Predicates that do not prune (unsupported functions on the partitioning column):

Adapted (not in the official docs): `ts` is a `TIMESTAMP` column, so `FORMAT_DATE` (which takes a `DATE`) is replaced with `FORMAT_TIMESTAMP`.

```sql
WHERE FORMAT_TIMESTAMP('%Y-%m-%d %H', ts) = '2025-03-28 20';

WHERE EXTRACT(MONTH FROM ts) = 3 AND EXTRACT(HOUR FROM ts) = 20
```

Arithmetic on the partitioning column does not prune either:

```sql
WHERE ts + INTERVAL 1 DAY > CURRENT_TIMESTAMP()
```

Rewrite by isolating `ts`: use `>=` and `<` for time ranges, and move arithmetic to the other side of the comparison.

```sql
WHERE ts >= '2025-03-28 20:00:00' AND ts < '2025-03-28 21:00:00'
```

```sql
WHERE ts > CURRENT_TIMESTAMP() - INTERVAL 1 DAY
```

### Best practice: filter on multiple columns

Predicates on other columns do not restrict pruning when combined with `AND`, in any order. Changing `AND` to `OR` disables pruning.

```sql
WHERE meter_id = 1234
  AND ts >= '2025-03-28 20:00:00' AND ts < '2025-03-28 21:00:00'
```

### Require a partition filter

With the **Require partition filter** option, a query without a usable `WHERE` clause fails with `Cannot query over table 'project_id.dataset.table' without a filter that can be used for partition elimination`. The requirement also applies to views and materialized views that reference the table. At least one predicate must reference only a partitioning column. For a table partitioned on `partition_id` with another column `f`, both of these satisfy it:

```sql
WHERE partition_id = "20221231"

WHERE partition_id = "20221231" AND f = "20221130"
```

This is not sufficient and errors:

```sql
WHERE partition_id = "20221231" OR f = "20221130"
```

## Notes

- Corrected from the official docs: the non-pruning example calls `FORMAT_DATE('%Y-%m-%d %H', ts)` on the `TIMESTAMP` column `ts`; `FORMAT_DATE` takes a `DATE`, so it is written with `FORMAT_TIMESTAMP` (which still does not prune with the `%H` format).
- Pruned partitions are not counted in bytes scanned. Pruning behaviour differs by partitioning type, so bytes processed can differ between otherwise identical tables; estimate with a dry run.
- Ingestion-time `_PARTITIONTIME` is the UTC ingestion time truncated to the partition boundary as `TIMESTAMP`: hourly `TIMESTAMP("2021-04-15 08:00:00")`, daily `TIMESTAMP("2021-04-15")`, monthly `TIMESTAMP("2021-04-01")`, yearly `TIMESTAMP("2021-01-01")` (for data appended 2021-04-15 08:15:00 UTC). `_PARTITIONDATE` exists only for daily partitioning and is `_PARTITIONTIME` truncated to `DATE`. Both names are reserved; no column may use them.
- For a non-UTC time zone, adjust in SQL or load data into specific ingestion-time partitions with partition decorators.
- For ingestion-time tables, a required partition filter must use `_PARTITIONTIME` or `_PARTITIONDATE`.
- Pruning requires a constant filter expression; subqueries, other table columns and non-constant values prevent it.
- Source: https://docs.cloud.google.com/bigquery/docs/querying-partitioned-tables (retrieved 2026-11-19)

## Related

- [partitioned-tables.md](./partitioned-tables.md)
- [creating-partitioned-tables.md](./creating-partitioned-tables.md)
- [managing-partitioned-tables.md](./managing-partitioned-tables.md)
- [querying-clustered-tables.md](./querying-clustered-tables.md)
