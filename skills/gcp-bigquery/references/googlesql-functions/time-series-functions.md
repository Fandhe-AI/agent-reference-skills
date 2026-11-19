---
source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions
---

# Time series functions

## Signature / Usage

GoogleSQL for BigQuery supports the following time series functions.

### Function list

| Name | Summary |
|---|---|
| [`APPENDS`](#appends) | Returns all rows appended to a table for a given time range. |
| [`CHANGES`](#changes) | Returns all rows that have changed in a table for a given time range. |
| [`DATE_BUCKET`](#date_bucket) | Gets the lower bound of the date bucket that contains a date. |
| [`DATETIME_BUCKET`](#datetime_bucket) | Gets the lower bound of the datetime bucket that contains a datetime. |
| [`GAP_FILL`](#gap_fill) | Finds and fills gaps in a time series. |
| [`TIMESTAMP_BUCKET`](#timestamp_bucket) | Gets the lower bound of the timestamp bucket that contains a timestamp. |

### `APPENDS`

```sql
APPENDS(
  TABLE table,
  start_timestamp DEFAULT NULL,
  end_timestamp DEFAULT NULL)
```

**Description**

The `APPENDS` function returns all rows appended to a table for a given
time range.

The following operations add rows to the `APPENDS` change history:

- [`CREATE TABLE` DDL statement](../googlesql-syntax/data-definition-language-1.md#create-table-statement)
- [`INSERT` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement)
- [Data appended as part of a `MERGE` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#merge_statement)
- [Loading data](https://docs.cloud.google.com/bigquery/docs/loading-data) into BigQuery
- [Streaming ingestion](https://docs.cloud.google.com/bigquery/docs/write-api#use_data_manipulation_language_dml_with_recently_streamed_data)

**Definitions**

- `table`: the BigQuery table name. This must be a regular BigQuery table or an [Apache Iceberg managed table](https://docs.cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery). This argument must be preceded by the word `TABLE`.
- `start_timestamp`: a [`TIMESTAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#timestamp_type)
  value indicating the earliest time at which a
  change is included in the output. If the value is `NULL`, all changes since the
  table creation are returned. If the table was created after the
  `start_timestamp` value, the actual table creation time is used instead. An error
  is returned if the time specified is earlier than allowed by
  [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel).

  **Note:** An error is returned if the `start_timestamp` is older than
  allowed by [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel). An error is also returned if the
  `start_timestamp` value is `NULL` and the table was created earlier than
  allowed by time travel. To get all available appended records,
  specify a `start_timestamp` within your time travel window instead of
  `NULL`. For standard tables, the time travel window is seven days, but you can
  [configure the time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#configure_the_time_travel_window) to be less than that.
- `end_timestamp`: a `TIMESTAMP` value indicating the latest time at
  which a change is included in the output. `end_timestamp` is exclusive; for
  example, if you specify `2023-12-31 08:00:00` for `start_timestamp` and
  `2023-12-31 12:00:00` for `end_timestamp`, all changes made from
  8 AM December 31, 2023 through 11:59 AM December 31, 2023 are returned.

  If the `end_timestamp` value is `NULL`, all changes made
  up to the start time of the query are included.

  If the `end_timestamp` value is a future date or time, the query fails.

**Details**

Records of inserted rows persist even if that data is later deleted. Deletions
aren't reflected in the `APPENDS` function. If a table
is copied, calling the `APPENDS` function on the copied table returns every row
as inserted at the time of table creation. If a row is modified due to an
`UPDATE` operation, there's no effect.

**Output**

The `APPENDS` function returns a table with the following columns:

- All columns of the input table at the time the query is run. If a column is added after the `end_timestamp` value, it appears with `NULL` values populated in any of the rows that were inserted before the addition of the column.
- `_CHANGE_TYPE`: a `STRING` value indicating the type of change that produced the row. For `APPENDS`, the only supported value is `INSERT`.
- `_CHANGE_TIMESTAMP`: a `TIMESTAMP` value indicating the commit time of the transaction that made the change.

**Limitations**

- The data returned by the `APPENDS` function is limited to the time travel window of the table.
- The data returned by the `APPENDS` function is limited to the table's current schema.
- You can't call the `APPENDS` function within a multi-statement transaction.
- `APPENDS` function may not capture all rows appended within a multi-statement transaction if some appended rows are updated or deleted within the same transaction.
- You can only use the `APPENDS` function with regular BigQuery tables and [Apache Iceberg managed tables](https://docs.cloud.google.com/bigquery/docs/biglake-iceberg-tables-in-bigquery). Clones, snapshots, views, materialized views, external tables, and wildcard tables aren't supported.
- Partition pseudo-columns for ingestion-time partitioned tables, such as `_PARTITIONTIME` and `_PARTITIONDATE`, aren't included in the function's output.
- Rows inserted through the [Storage Write API (gRPC) pending stream](https://docs.cloud.google.com/bigquery/docs/write-api#pending_type) or [Storage Write API (gRPC) buffered stream](https://docs.cloud.google.com/bigquery/docs/write-api#buffered_type) can have inconsistent timestamps, so repeatable reads aren't guaranteed. If you require repeatable reads for streaming ingestion workloads, use either the [Storage Write API (gRPC) default stream](https://docs.cloud.google.com/bigquery/docs/write-api#default_stream) or the [Storage Write API (gRPC) committed stream](https://docs.cloud.google.com/bigquery/docs/write-api#committed_type). If you require repeatable reads for batch ingestion workloads, use [BigQuery load jobs](https://docs.cloud.google.com/bigquery/docs/loading-data) instead.

**Example**

This example shows the change history returned by the `APPENDS` function as various
changes are made to a table called `Produce`. First, create the table:

```sql
CREATE TABLE mydataset.Produce (product STRING, inventory INT64) AS (
  SELECT 'apples' AS product, 10 AS inventory);
```

Next, insert two rows into the table:

```sql
INSERT INTO mydataset.Produce
VALUES
  ('bananas', 20),
  ('carrots', 30);
```

To view the full change history of appends, use `NULL` values to get the full
history within the time travel window:

```sql
SELECT
  product,
  inventory,
  _CHANGE_TYPE AS change_type,
  _CHANGE_TIMESTAMP AS change_time
FROM
  APPENDS(TABLE mydataset.Produce, NULL, NULL);
```

The output is similar to the following:

```text
+---------+-----------+-------------+--------------------------------+
| product | inventory | change_type | change_time                    |
+---------+-----------+-------------+--------------------------------+
| apples  | 10        | INSERT      | 2022-04-15 20:06:00.488000 UTC |
| bananas | 20        | INSERT      | 2022-04-15 20:06:08.490000 UTC |
| carrots | 30        | INSERT      | 2022-04-15 20:06:08.490000 UTC |
+---------+-----------+-------------+--------------------------------+
```

Next, add a column, insert a new row of values, update the inventory, and delete
the `bananas` row:

```sql
ALTER TABLE mydataset.Produce ADD COLUMN color STRING;
INSERT INTO mydataset.Produce VALUES ('grapes', 40, 'purple');
UPDATE mydataset.Produce SET inventory = inventory + 5 WHERE TRUE;
DELETE mydataset.Produce WHERE product = 'bananas';
```

View the new table:

```sql
SELECT * FROM mydataset.Produce;
```

The output is similar to the following:

```text
+---------+-----------+--------+
| product | inventory | color  |
+---------+-----------+--------+
| apples  | 15        | NULL   |
| carrots | 35        | NULL   |
| grapes  | 45        | purple |
+---------+-----------+--------+
```

View the full change history of appends:

```sql
SELECT
  product,
  inventory,
  color,
  _CHANGE_TYPE AS change_type,
  _CHANGE_TIMESTAMP AS change_time
FROM
  APPENDS(TABLE mydataset.Produce, NULL, NULL);
```

The output is similar to the following:

```text
+---------+-----------+--------+-------------+--------------------------------+
| product | inventory | color  | change_type | change_time                    |
+---------+-----------+--------+-------------+--------------------------------+
| apples  | 10        | NULL   | INSERT      | 2022-04-15 20:06:00.488000 UTC |
| bananas | 20        | NULL   | INSERT      | 2022-04-15 20:06:08.490000 UTC |
| carrots | 30        | NULL   | INSERT      | 2022-04-15 20:06:08.490000 UTC |
| grapes  | 40        | purple | INSERT      | 2022-04-15 20:07:45.751000 UTC |
+---------+-----------+--------+-------------+--------------------------------+
```

The `inventory` column displays the values that were set when the rows were
originally inserted into to the table. It doesn't show the changes from the
`UPDATE` statement. The row with information on bananas is still present because
the `APPENDS` function only captures additions to tables, not deletions.

### `CHANGES`

```sql
CHANGES(
  TABLE table,
  start_timestamp DEFAULT NULL,
  end_timestamp)
```

**Description**

The `CHANGES` function returns all rows that have changed in a table for a given
time range. To use the `CHANGES` function on a table, you must set the table's
[`enable_change_history` option](../googlesql-syntax/data-definition-language-1.md#table_option_list)
to `TRUE`.

The following operations add rows to the `CHANGES` change history:

- [`CREATE TABLE` DDL statement](../googlesql-syntax/data-definition-language-1.md#create-table-statement)
- [`INSERT` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#insert_statement)
- [Data appended, changed or deleted as part of a `MERGE` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#merge_statement)
- [`UPDATE` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#update_statement)
- [`DELETE` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#delete_statement)
- [Loading data](https://docs.cloud.google.com/bigquery/docs/loading-data) into BigQuery
- [Streaming ingestion](https://docs.cloud.google.com/bigquery/docs/write-api#use_data_manipulation_language_dml_with_recently_streamed_data)
- [`TRUNCATE TABLE` DML statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement)
- [Jobs](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job) configured with a `writeDisposition` of `WRITE_TRUNCATE`
- Individual [table partition deletions](https://docs.cloud.google.com/bigquery/docs/managing-partitioned-tables#delete_a_partition)

**Definitions**

- `table`: the BigQuery table name. This must be a regular BigQuery table, and must have the [`enable_change_history`
  option](../googlesql-syntax/data-definition-language-1.md#table_option_list) set to `TRUE`. Enabling this table option has an impact on costs; for more information see [Pricing and costs](https://docs.cloud.google.com/bigquery/docs/change-history#pricing_and_costs). This argument must be preceded by the word `TABLE`.
- `start_timestamp`: a [`TIMESTAMP`](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#timestamp_type) value indicating the earliest
  time at which a change is included in the output. If the value is `NULL`,
  all changes since the table creation are returned. If you set the
  `enable_change_history` option after setting the `start_timestamp` option,
  the history before the enablement time might be incomplete. If the table was
  created after the `start_timestamp` value, the actual table creation time is
  used instead.

  **Note:** An error is returned if the `start_timestamp` is older than
  allowed by [time travel](https://docs.cloud.google.com/bigquery/docs/time-travel). An error is also returned if the
  `start_timestamp` value is `NULL` and the table was created earlier than
  allowed by time travel. To get all available changes,
  specify a `start_timestamp` within your time travel window instead of
  `NULL`. For standard tables, the time travel window is seven days, but you
  can [configure the time travel window](https://docs.cloud.google.com/bigquery/docs/time-travel#configure_the_time_travel_window) to be less than that.
- `end_timestamp`: a `TIMESTAMP` value indicating the latest time at which a
  change is included in the output. `end_timestamp` is exclusive; for example,
  if you specify `2023-12-31 08:00:00` for `start_timestamp` and `2023-12-31
  12:00:00` for `end_timestamp`, all changes made from 8 AM December 31, 2023
  through 11:59 AM December 31, 2023 are returned. The maximum time range
  allowed between `start_timestamp` and `end_timestamp` is one day.

  If the `end_timestamp` value is `NULL`, all changes made up to the start
  time of the query are included.

  If the `end_timestamp` value is a future date or time, the query fails.

**Details**

If a row is inserted, a record of the new row with an `INSERT` change type is
produced.

If a row is deleted, a record of the deleted row with a `DELETE` change type is
produced.

If a row is updated, a record of the old row with a `DELETE` change type and a
record of the new row with an `UPDATE` change type are produced.

**Output**

The `CHANGES` function returns a table with the following columns:

- All columns of the input table at the time that the query is run. If a column is added after the `end_timestamp` value, it appears with `NULL` values populated in of the any rows that were changed before the addition of the column.
- `_CHANGE_TYPE`: a `STRING` value indicating the type of change that produced the row. For `CHANGES`, the supported values are `INSERT`, `UPDATE`, and `DELETE`.
- `_CHANGE_TIMESTAMP`: a `TIMESTAMP` value indicating the commit time of the transaction that made the change.
- `_CHANGE_IS_FOR_UPDATE`: a `BOOL` value that is `TRUE` for a `DELETE` event produced by a row update. Otherwise, the value is `FALSE`.

**Limitations**

- The data returned by the `CHANGES` function is limited to the time travel window of the table.
- The data returned by the `CHANGES` function is limited to the table's current schema.
- The maximum allowed time range between the `start_timestamp` and `end_timestamp` arguments you specify for the function is one day.
- You can't call the `CHANGES` function within a multi-statement transaction.
- You can't use the `CHANGES` function with tables that have had multi-statement transactions committed to them within the requested time window.
- You can only use the `CHANGES` function with regular BigQuery tables. Views, materialized views, external tables, and wildcard tables aren't supported.
- For tables that have been cloned or snapshotted, and for tables that are restored from a clone or snapshot, change history from the source table isn't carried over to the new table, clone, or snapshot.
- You can't use the `CHANGES` function with a table that has [change data capture](https://docs.cloud.google.com/bigquery/docs/change-data-capture) enabled.
- If a table is enabled with [fine-grained DML](https://docs.cloud.google.com/bigquery/docs/data-manipulation-language#fine-grained_dml), and data deletion occurs using either a [`TRUNCATE TABLE` statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/dml-syntax#truncate_table_statement), [`WRITE_TRUNCATE` write disposition](https://docs.cloud.google.com/bigquery/docs/reference/rest/v2/Job#jobconfigurationquery), or a [qualifying `DELETE` statement](https://docs.cloud.google.com/bigquery/docs/using-dml-with-partitioned-tables#using_dml_delete_to_delete_partitions) that covers all rows in a partition, the `CHANGES` function might return additional deleted events.
- Partition pseudo-columns for ingestion-time partitioned tables, such as `_PARTITIONTIME` and `_PARTITIONDATE`, aren't included in the function's output.
- Rows inserted through the [Storage Write API (gRPC) pending stream](https://docs.cloud.google.com/bigquery/docs/write-api#pending_type) or [Storage Write API (gRPC) buffered stream](https://docs.cloud.google.com/bigquery/docs/write-api#buffered_type) can have inconsistent timestamps, so repeatable reads aren't guaranteed. If you require repeatable reads for streaming ingestion workloads, use either the [Storage Write API (gRPC) default stream](https://docs.cloud.google.com/bigquery/docs/write-api#default_stream) or the [Storage Write API (gRPC) committed stream](https://docs.cloud.google.com/bigquery/docs/write-api#committed_type). If you require repeatable reads for batch ingestion workloads, use [BigQuery load jobs](https://docs.cloud.google.com/bigquery/docs/loading-data) instead.
- Change history isn't captured for table deletions made due to table partition expiration.
- Performing [data manipulation language (DML) statements over recently streamed data](https://docs.cloud.google.com/bigquery/docs/write-api#use_data_manipulation_language_dml_with_recently_streamed_data) fails on tables that have the `enable_change_history` option set to `TRUE`.

**Example**

This example shows the change history returned by the `CHANGES` function as
various changes are made to a table called `Produce`. First, create the table:

```sql
CREATE TABLE mydataset.Produce (
  product STRING,
  inventory INT64)
OPTIONS(enable_change_history=true);
```

Insert two rows into the table:

```sql
INSERT INTO mydataset.Produce
VALUES
  ('bananas', 20),
  ('carrots', 30);
```

Delete one row from the table:

```sql
DELETE mydataset.Produce
WHERE product = 'bananas';
```

Update one row of the table:

```sql
UPDATE mydataset.Produce
SET inventory = inventory - 10
WHERE product = 'carrots';
```

View the full change history of the changes made to the table:

```sql
SELECT
  product,
  inventory,
  _CHANGE_TYPE AS change_type,
  _CHANGE_TIMESTAMP AS change_time,
  _CHANGE_IS_FOR_UPDATE as change_is_for_update
FROM
  CHANGES(TABLE mydataset.Produce, NULL, NULL)
ORDER BY change_time, product;
```

The output is similar to the following:

```text
+---------+-----------+-------------+---------------------+----------------------+
| product | inventory | change_type |     change_time     | change_is_for_update |
+---------+-----------+-------------+---------------------+----------------------+
| bananas |        20 | INSERT      | 2024-01-09 17:13:58 | false                |
| carrots |        30 | INSERT      | 2024-01-09 17:13:58 | false                |
| bananas |        20 | DELETE      | 2024-01-09 17:14:30 | false                |
| carrots |        30 | DELETE      | 2024-01-09 17:15:24 | true                 |
| carrots |        20 | UPDATE      | 2024-01-09 17:15:24 | false                |
+---------+-----------+-------------+---------------------+----------------------+
```

**Enabling change history for an existing table**

To set the
[`enable_change_history` option](../googlesql-syntax/data-definition-language-1.md#table_option_list)
to `TRUE` for an existing table, use the
[`ALTER TABLE SET OPTIONS` DDL statement](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-definition-language#alter_table_set_options_statement).
The following example updates the change history option for `my_table` to
`TRUE`:

```sql
ALTER TABLE `my_dataset.my_table`
SET OPTIONS (enable_change_history = TRUE);
```

### `DATE_BUCKET`

```sql
DATE_BUCKET(date_in_bucket, bucket_width)
```

```sql
DATE_BUCKET(date_in_bucket, bucket_width, bucket_origin_date)
```

**Description**

Gets the lower bound of the date bucket that contains a date.

**Definitions**

- `date_in_bucket`: A `DATE` value that you can use to look up a date bucket.
- `bucket_width`: An `INTERVAL` value that represents the width of a date bucket. A [single interval](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#single_datetime_part_interval) with [date parts](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#interval_datetime_parts) is supported.
- `bucket_origin_date`: A `DATE` value that represents a point in time. All buckets expand left and right from this point. If this argument isn't set, `1950-01-01` is used by default.

**Return type**

`DATE`

**Examples**

In the following example, the origin is omitted and the default origin,
`1950-01-01` is used. All buckets expand in both directions from the origin,
and the size of each bucket is two days. The lower bound of the bucket in
which `my_date` belongs is returned.

```sql
WITH some_dates AS (
  SELECT DATE '1949-12-29' AS my_date UNION ALL
  SELECT DATE '1949-12-30' UNION ALL
  SELECT DATE '1949-12-31' UNION ALL
  SELECT DATE '1950-01-01' UNION ALL
  SELECT DATE '1950-01-02' UNION ALL
  SELECT DATE '1950-01-03'
)
SELECT DATE_BUCKET(my_date, INTERVAL 2 DAY) AS bucket_lower_bound
FROM some_dates;

/*--------------------+
 | bucket_lower_bound |
 +--------------------+
 | 1949-12-28         |
 | 1949-12-30         |
 | 1949-12-30         |
 | 1950-01-01         |
 | 1950-01-01         |
 | 1950-01-03         |
 +--------------------*/

-- Some date buckets that originate from 1950-01-01:
-- + Bucket: ...
-- + Bucket: [1949-12-28, 1949-12-30)
-- + Bucket: [1949-12-30, 1950-01-01)
-- + Origin: [1950-01-01]
-- + Bucket: [1950-01-01, 1950-01-03)
-- + Bucket: [1950-01-03, 1950-01-05)
-- + Bucket: ...
```

In the following example, the origin has been changed to `2000-12-24`,
and all buckets expand in both directions from this point. The size of each
bucket is seven days. The lower bound of the bucket in which `my_date` belongs
is returned:

Adapted (not in the official docs): Changed the end of the last bucket from 2000-01-07 to 2001-01-07.

```sql
WITH some_dates AS (
  SELECT DATE '2000-12-20' AS my_date UNION ALL
  SELECT DATE '2000-12-21' UNION ALL
  SELECT DATE '2000-12-22' UNION ALL
  SELECT DATE '2000-12-23' UNION ALL
  SELECT DATE '2000-12-24' UNION ALL
  SELECT DATE '2000-12-25'
)
SELECT DATE_BUCKET(
  my_date,
  INTERVAL 7 DAY,
  DATE '2000-12-24') AS bucket_lower_bound
FROM some_dates;

/*--------------------+
 | bucket_lower_bound |
 +--------------------+
 | 2000-12-17         |
 | 2000-12-17         |
 | 2000-12-17         |
 | 2000-12-17         |
 | 2000-12-24         |
 | 2000-12-24         |
 +--------------------*/

-- Some date buckets that originate from 2000-12-24:
-- + Bucket: ...
-- + Bucket: [2000-12-10, 2000-12-17)
-- + Bucket: [2000-12-17, 2000-12-24)
-- + Origin: [2000-12-24]
-- + Bucket: [2000-12-24, 2000-12-31)
-- + Bucket: [2000-12-31, 2001-01-07)
-- + Bucket: ...
```

### `DATETIME_BUCKET`

```sql
DATETIME_BUCKET(datetime_in_bucket, bucket_width)
```

```sql
DATETIME_BUCKET(datetime_in_bucket, bucket_width, bucket_origin_datetime)
```

**Description**

Gets the lower bound of the datetime bucket that contains a datetime.

**Definitions**

- `datetime_in_bucket`: A `DATETIME` value that you can use to look up a datetime bucket.
- `bucket_width`: An `INTERVAL` value that represents the width of a datetime bucket. A [single interval](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#single_datetime_part_interval) with [date and time parts](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#interval_datetime_parts) is supported.
- `bucket_origin_datetime`: A `DATETIME` value that represents a point in time. All buckets expand left and right from this point. If this argument isn't set, `1950-01-01 00:00:00` is used by default.

**Return type**

`DATETIME`

**Examples**

In the following example, the origin is omitted and the default origin,
`1950-01-01 00:00:00` is used. All buckets expand in both directions from the
origin, and the size of each bucket is 12 hours. The lower bound of the bucket
in which `my_datetime` belongs is returned:

Adapted (not in the official docs): Changed two bucket bounds so that each bucket is 12 hours wide: the end `1950-01-01 00:00:00` to `1949-12-31 00:00:00`, and the invalid `1950-02-00` to `1950-01-02`.

```sql
WITH some_datetimes AS (
  SELECT DATETIME '1949-12-30 13:00:00' AS my_datetime UNION ALL
  SELECT DATETIME '1949-12-31 00:00:00' UNION ALL
  SELECT DATETIME '1949-12-31 13:00:00' UNION ALL
  SELECT DATETIME '1950-01-01 00:00:00' UNION ALL
  SELECT DATETIME '1950-01-01 13:00:00' UNION ALL
  SELECT DATETIME '1950-01-02 00:00:00'
)
SELECT DATETIME_BUCKET(my_datetime, INTERVAL 12 HOUR) AS bucket_lower_bound
FROM some_datetimes;

/*---------------------+
 | bucket_lower_bound  |
 +---------------------+
 | 1949-12-30T12:00:00 |
 | 1949-12-31T00:00:00 |
 | 1949-12-31T12:00:00 |
 | 1950-01-01T00:00:00 |
 | 1950-01-01T12:00:00 |
 | 1950-01-02T00:00:00 |
 +---------------------*/

-- Some datetime buckets that originate from 1950-01-01 00:00:00:
-- + Bucket: ...
-- + Bucket: [1949-12-30 00:00:00, 1949-12-30 12:00:00)
-- + Bucket: [1949-12-30 12:00:00, 1949-12-31 00:00:00)
-- + Origin: [1950-01-01 00:00:00]
-- + Bucket: [1950-01-01 00:00:00, 1950-01-01 12:00:00)
-- + Bucket: [1950-01-01 12:00:00, 1950-01-02 00:00:00)
-- + Bucket: ...
```

In the following example, the origin has been changed to `2000-12-22 12:00:00`,
and all buckets expand in both directions from this point. The size of each
bucket is seven days. The lower bound of the bucket in which `my_datetime`
belongs is returned:

Adapted (not in the official docs): Changed the end of the last bucket from 2000-01-05 to 2001-01-05.

```sql
WITH some_datetimes AS (
  SELECT DATETIME '2000-12-20 00:00:00' AS my_datetime UNION ALL
  SELECT DATETIME '2000-12-21 00:00:00' UNION ALL
  SELECT DATETIME '2000-12-22 00:00:00' UNION ALL
  SELECT DATETIME '2000-12-23 00:00:00' UNION ALL
  SELECT DATETIME '2000-12-24 00:00:00' UNION ALL
  SELECT DATETIME '2000-12-25 00:00:00'
)
SELECT DATETIME_BUCKET(
  my_datetime,
  INTERVAL 7 DAY,
  DATETIME '2000-12-22 12:00:00') AS bucket_lower_bound
FROM some_datetimes;

/*--------------------+
 | bucket_lower_bound |
 +--------------------+
 | 2000-12-15T12:00:00 |
 | 2000-12-15T12:00:00 |
 | 2000-12-15T12:00:00 |
 | 2000-12-22T12:00:00 |
 | 2000-12-22T12:00:00 |
 | 2000-12-22T12:00:00 |
 +--------------------*/

-- Some datetime buckets that originate from 2000-12-22 12:00:00:
-- + Bucket: ...
-- + Bucket: [2000-12-08 12:00:00, 2000-12-15 12:00:00)
-- + Bucket: [2000-12-15 12:00:00, 2000-12-22 12:00:00)
-- + Origin: [2000-12-22 12:00:00]
-- + Bucket: [2000-12-22 12:00:00, 2000-12-29 12:00:00)
-- + Bucket: [2000-12-29 12:00:00, 2001-01-05 12:00:00)
-- + Bucket: ...
```

### `GAP_FILL`

Adapted (not in the official docs): Removed the comma after `bucket_width`, because the optional argument already starts with a comma.

```sql
GAP_FILL (
  TABLE time_series_table,
  time_series_column,
  bucket_width
  [, partitioning_columns => value ]
  [, value_columns => value ]
  [, origin => value ]
  [, ignore_null_values => { TRUE | FALSE } ]
)
```

Adapted (not in the official docs): Removed the comma after `bucket_width`, because the optional argument already starts with a comma.

```sql
GAP_FILL (
  (time_series_subquery),
  time_series_column,
  bucket_width
  [, partitioning_columns => values ]
  [, value_columns => value ]
  [, origin => value ]
  [, ignore_null_values => { TRUE | FALSE } ]
)
```

**Description**

Finds and fills gaps in a time series.

**Definitions**

- `time_series_table`: The name of the table that contains the time series data.
- `time_series_subquery`: The subquery that contains the time series data.
- `time_series_column`: The name of the column in `time_series_table` or `time_series_subquery` that contains the time points of the time series data. This column must represent a `DATE`, `DATETIME`, or `TIMESTAMP` type.
- `bucket_width`: The `INTERVAL` value that represents the selected width of the time buckets. The interval can represent a `DATE`, `DATETIME`, or `TIMESTAMP` type.
- `partitioning_columns`: A named argument with an `ARRAY<STRING>` value. Represents an array of zero or more column names used to partition data into individual time series (time series identity). This has the same column type requirements as the `PARTITION BY` clause.
- `value_columns`: A named argument with an `ARRAY<STRUCT<STRING, STRING>>`
  value. Represents an array of column name and gap-filling method pairs in
  the following format:

  ```sql
  [(column_name, gap_filling_method), ...]
  ```

  - `column_name`: A `STRING` value that represents a valid column from
    `time_series_table`. A column name can only be used once in
    `value_columns`.

  - `gap_filling_method`: A `STRING` value that can be one of the following
    gap-filling methods:

    - `null` (default): Fill in missing values with `NULL` values.

    - `linear`: Fill in missing values using
      linear interpolation. So, when a new value is added, it's based on
      a linear slope for a specific time bucket. When this method is
      used, `column_name` must be a numeric data type.

    - `locf`: Fill in missing values by carrying the last observed value
      forward. So, when a new value is added, it's based on
      the previous value.

- `origin`: A `DATE`, `DATETIME` or `TIMESTAMP` optional named argument.
  Represents a point in time from which all time buckets expand in
  each direction.

  If `origin` isn't provided, the data type for `time_series_column` is
  assumed, and the corresponding default value is used:
  - `DATE '1950-01-01'`
  - `DATETIME '1950-01-01 00:00:00'`
  - `TIMESTAMP '1950-01-01 00:00:00'`
- `ignore_null_values`: A named argument with a `BOOL` value. Indicates
  whether the function ignores `NULL` values in the input data when performing
  gap filling. By default, this value is `TRUE`.

  - If `TRUE` (default), `NULL` values are skipped during gap filling.

    - `null` is the gap-filling method for a column: If a value in a
      column is `NULL`, the output is `NULL` for that column.

    - `locf` or `linear` is the gap-filling method for a column: The
      previous or next non-`NULL` value is used. The side effect of this
      is that output value columns are never `NULL`, except for the edges.

  - If `FALSE`, `NULL` values are included during gap filling.

    - `null` is the gap-filling method for a column: If a value in a
      column is `NULL`, the output is `NULL` for that column.

    - `locf` is the gap-filling method for a column: If the previous
      value in that column is `NULL`, the output is `NULL` for that
      column.

    - `linear` is the gap-filling method for a column: If either of
      the endpoints in that column is `NULL`, the output is `NULL` for
      that column.

**Details**

Sometimes the fixed time intervals produced by time bucket functions have gaps,
either due to irregular sampling intervals or an event that caused data loss
for some time period. This can cause irregularities in reporting. For example,
a plot with irregular intervals might have visible discontinuity. You can use
the `GAP_FILL` function to employ various gap-filling methods to fill in
those missing data points.

`time_series_column` and `origin` must be of the same data type.

**Return type**

`TABLE`

**Examples**

In the following query, the `locf` gap-filling method is applied to gaps:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', 78, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'locf')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | 74     |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | 78     |
 | 2023-11-01T09:38:00 | 78     |
 +---------------------+--------*/
```

In the following query, the `linear` gap-filling method is applied to gaps:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', 78, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'linear')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | 75     |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | 78     |
 | 2023-11-01T09:38:00 | 80     |
 +---------------------+--------*/
```

In the following query, the `null` gap-filling method is applied to gaps:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', 78, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'null')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | NULL   |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | 78     |
 | 2023-11-01T09:38:00 | NULL   |
 +---------------------+--------*/
```

In the following query, `NULL` values in the input data are ignored by default:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', NULL, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'linear')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | 75     |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | 78     |
 | 2023-11-01T09:38:00 | 80     |
 +---------------------+--------*/
```

In the following query, `NULL` values in the input data aren't ignored, using
the `ignore_null_values` argument:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', NULL, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'linear')
  ],
  ignore_null_values => FALSE
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | 75     |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | NULL   |
 | 2023-11-01T09:38:00 | NULL   |
 +---------------------+--------*/
```

In the following query, when the `value_columns` argument isn't passed in,
the `null` gap-filling method is used on all columns:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', 79, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE
)
ORDER BY time;

/*---------------------+-----------+--------+----------+
 | time                | device_id | signal | state    |
 +---------------------+-----------+--------+----------+
 | 2023-11-01T09:35:00 | NULL      | NULL   | NULL     |
 | 2023-11-01T09:36:00 | 2         | 77     | ACTIVE   |
 | 2023-11-01T09:37:00 | 3         | 79     | ACTIVE   |
 | 2023-11-01T09:38:00 | NULL      | NULL   | NULL     |
 +---------------------+-----------+--------+----------*/
```

In the following query, rows (buckets) are added for gaps that are found:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:35:39', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:37:39', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:38:00', 77, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:40:00', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'locf')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:36:00 | 74     |
 | 2023-11-01T09:37:00 | 74     |
 | 2023-11-01T09:38:00 | 74     |
 | 2023-11-01T09:39:00 | 77     |
 | 2023-11-01T09:40:00 | 77     |
 +---------------------+--------*/
```

In the following query, data is condensed when it fits in the same bucket and
has the same values:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:35:39', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:60', 77, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:00', 77, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:37:20', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'locf')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:36:00 | 74     |
 | 2023-11-01T09:37:00 | 77     |
 +---------------------+--------*/
```

In the following query, gap filling is applied to partitions:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(2, DATETIME '2023-11-01 09:35:07', 87, 'ACTIVE'),
    STRUCT(1, DATETIME '2023-11-01 09:35:26', 82, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:35:39', 74, 'INACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:07', 88, 'ACTIVE'),
    STRUCT(1, DATETIME '2023-11-01 09:36:26', 82, 'ACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:37:07', 88, 'ACTIVE'),
    STRUCT(1, DATETIME '2023-11-01 09:37:28', 80, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:37:39', 77, 'ACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:38:07', 86, 'ACTIVE'),
    STRUCT(1, DATETIME '2023-11-01 09:38:26', 81, 'ACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:38:39', 77, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  partitioning_columns => ['device_id'],
  value_columns => [
    ('signal', 'locf')
  ]
)
ORDER BY device_id;

/*---------------------+-----------+--------+
 | time                | device_id | signal |
 +---------------------+-----------+--------+
 | 2023-11-01T09:36:00 | 1         | 82     |
 | 2023-11-01T09:37:00 | 1         | 82     |
 | 2023-11-01T09:38:00 | 1         | 80     |
 | 2023-11-01T09:36:00 | 2         | 87     |
 | 2023-11-01T09:37:00 | 2         | 88     |
 | 2023-11-01T09:38:00 | 2         | 88     |
 | 2023-11-01T09:36:00 | 3         | 74     |
 | 2023-11-01T09:37:00 | 3         | 74     |
 | 2023-11-01T09:38:00 | 3         | 77     |
 +---------------------+-----------+--------*/
```

In the following query, gap filling is applied to multiple columns, and each
column uses a different gap-filling method:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'ACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'INACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:38:00', 78, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:39:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'linear'),
    ('state', 'locf')
  ]
)
ORDER BY time;

/*---------------------+--------+----------+
 | time                | signal | state    |
 +---------------------+--------+----------+
 | 2023-11-01T09:35:00 | 75     | ACTIVE   |
 | 2023-11-01T09:36:00 | 77     | INACTIVE |
 | 2023-11-01T09:37:00 | 78     | INACTIVE |
 | 2023-11-01T09:38:00 | 78     | ACTIVE   |
 | 2023-11-01T09:39:00 | 80     | ACTIVE   |
 +---------------------+--------+----------*/
```

In the following query, the point of origin is changed in the gap-filling
results to a custom origin, using the `origin` argument:

```sql
CREATE TEMP TABLE device_data AS
SELECT * FROM UNNEST(
  ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
    STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'ACTIVE'),
    STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'INACTIVE'),
    STRUCT(3, DATETIME '2023-11-01 09:38:00', 78, 'ACTIVE'),
    STRUCT(4, DATETIME '2023-11-01 09:39:01', 80, 'ACTIVE')
]);

SELECT *
FROM GAP_FILL(
  TABLE device_data,
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'null')
  ],
  origin => DATETIME '2023-11-01 09:30:01'
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:34:01 | 74     |
 | 2023-11-01T09:35:01 | NULL   |
 | 2023-11-01T09:36:01 | NULL   |
 | 2023-11-01T09:37:01 | NULL   |
 | 2023-11-01T09:38:01 | NULL   |
 | 2023-11-01T09:39:01 | 80     |
 +---------------------+--------*/
```

In the following query, a subquery is passed into the function instead of a
table:

```sql
SELECT *
FROM GAP_FILL(
  (
    SELECT * FROM UNNEST(
    ARRAY<STRUCT<device_id INT64, time DATETIME, signal INT64, state STRING>>[
      STRUCT(1, DATETIME '2023-11-01 09:34:01', 74, 'INACTIVE'),
      STRUCT(2, DATETIME '2023-11-01 09:36:00', 77, 'ACTIVE'),
      STRUCT(3, DATETIME '2023-11-01 09:37:00', 78, 'ACTIVE'),
      STRUCT(4, DATETIME '2023-11-01 09:38:01', 80, 'ACTIVE')
    ])
  ),
  ts_column => 'time',
  bucket_width => INTERVAL 1 MINUTE,
  value_columns => [
    ('signal', 'linear')
  ]
)
ORDER BY time;

/*---------------------+--------+
 | time                | signal |
 +---------------------+--------+
 | 2023-11-01T09:35:00 | 75     |
 | 2023-11-01T09:36:00 | 77     |
 | 2023-11-01T09:37:00 | 78     |
 | 2023-11-01T09:38:00 | 80     |
 +---------------------+--------*/
```

### `TIMESTAMP_BUCKET`

```sql
TIMESTAMP_BUCKET(timestamp_in_bucket, bucket_width)
```

```sql
TIMESTAMP_BUCKET(timestamp_in_bucket, bucket_width, bucket_origin_timestamp)
```

**Description**

Gets the lower bound of the timestamp bucket that contains a timestamp.

**Definitions**

- `timestamp_in_bucket`: A `TIMESTAMP` value that you can use to look up a timestamp bucket.
- `bucket_width`: An `INTERVAL` value that represents the width of a timestamp bucket. A [single interval](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#single_datetime_part_interval) with [date and time parts](https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/data-types#interval_datetime_parts) is supported.
- `bucket_origin_timestamp`: A `TIMESTAMP` value that represents a point in time. All buckets expand left and right from this point. If this argument isn't set, `1950-01-01 00:00:00` is used by default.

**Return type**

`TIMESTAMP`

**Examples**

In the following example, the origin is omitted and the default origin,
`1950-01-01 00:00:00` is used. All buckets expand in both directions from the
origin, and the size of each bucket is 12 hours. The default time zone,
UTC, is included in the results. The lower bound of the
bucket in which `my_timestamp` belongs is returned:

Adapted (not in the official docs): Changed two bucket bounds so that each bucket is 12 hours wide: the end `1950-01-01 00:00:00.00 UTC` to `1949-12-31 00:00:00.00 UTC`, and the invalid `1950-02-00` to `1950-01-02`.

```sql
WITH some_timestamps AS (
  SELECT TIMESTAMP '1949-12-30 13:00:00.00' AS my_timestamp UNION ALL
  SELECT TIMESTAMP '1949-12-31 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '1949-12-31 13:00:00.00' UNION ALL
  SELECT TIMESTAMP '1950-01-01 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '1950-01-01 13:00:00.00' UNION ALL
  SELECT TIMESTAMP '1950-01-02 00:00:00.00'
)
SELECT TIMESTAMP_BUCKET(my_timestamp, INTERVAL 12 HOUR) AS bucket_lower_bound
FROM some_timestamps;

-- Display of results may differ, depending upon the environment and
-- time zone where this query was executed.
 /*------------------------+
 | bucket_lower_bound      |
 +-------------------------+
 | 1949-12-30 12:00:00 UTC |
 | 1949-12-31 00:00:00 UTC |
 | 1949-12-31 12:00:00 UTC |
 | 1950-01-01 00:00:00 UTC |
 | 1950-01-01 12:00:00 UTC |
 | 1950-01-02 00:00:00 UTC |
 +-------------------------*/

-- Some timestamp buckets that originate from 1950-01-01 00:00:00:
-- + Bucket: ...
-- + Bucket: [1949-12-30 00:00:00.00 UTC, 1949-12-30 12:00:00.00 UTC)
-- + Bucket: [1949-12-30 12:00:00.00 UTC, 1949-12-31 00:00:00.00 UTC)
-- + Origin: [1950-01-01 00:00:00.00 UTC]
-- + Bucket: [1950-01-01 00:00:00.00 UTC, 1950-01-01 12:00:00.00 UTC)
-- + Bucket: [1950-01-01 12:00:00.00 UTC, 1950-01-02 00:00:00.00 UTC)
-- + Bucket: ...
```

In the following example, the origin has been changed to `2000-12-22 12:00:00`,
and all buckets expand in both directions from this point. The size of each
bucket is seven days. The default time zone, UTC, is included
in the results. The lower bound of the bucket in which `my_timestamp`
belongs is returned:

Adapted (not in the official docs): Changed the end of the last bucket from 2000-01-05 to 2001-01-05.

```sql
WITH some_timestamps AS (
  SELECT TIMESTAMP '2000-12-20 00:00:00.00' AS my_timestamp UNION ALL
  SELECT TIMESTAMP '2000-12-21 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '2000-12-22 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '2000-12-23 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '2000-12-24 00:00:00.00' UNION ALL
  SELECT TIMESTAMP '2000-12-25 00:00:00.00'
)
SELECT TIMESTAMP_BUCKET(
  my_timestamp,
  INTERVAL 7 DAY,
  TIMESTAMP '2000-12-22 12:00:00.00') AS bucket_lower_bound
FROM some_timestamps;

-- Display of results may differ, depending upon the environment and
-- time zone where this query was executed.
 /*------------------------+
 | bucket_lower_bound      |
 +-------------------------+
 | 2000-12-15 12:00:00 UTC |
 | 2000-12-15 12:00:00 UTC |
 | 2000-12-15 12:00:00 UTC |
 | 2000-12-22 12:00:00 UTC |
 | 2000-12-22 12:00:00 UTC |
 | 2000-12-22 12:00:00 UTC |
 +-------------------------*/

-- Some timestamp buckets that originate from 2000-12-22 12:00:00:
-- + Bucket: ...
-- + Bucket: [2000-12-08 12:00:00.00 UTC, 2000-12-15 12:00:00.00 UTC)
-- + Bucket: [2000-12-15 12:00:00.00 UTC, 2000-12-22 12:00:00.00 UTC)
-- + Origin: [2000-12-22 12:00:00.00 UTC]
-- + Bucket: [2000-12-22 12:00:00.00 UTC, 2000-12-29 12:00:00.00 UTC)
-- + Bucket: [2000-12-29 12:00:00.00 UTC, 2001-01-05 12:00:00.00 UTC)
-- + Bucket: ...
```

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/time-series-functions (Markdown twin and rendered page fetched 2026-11-19).
- Converted mechanically from the official Markdown twin: headings are one level lower than on the page; indented code blocks are fenced; and the text of each code block is taken from the rendered page, because the twin shortens the dashes in result-table borders. The prose is otherwise unchanged.
- Links to other pages of this reference point to the local files when the target heading exists here; all other links point to the official docs.
- Corrected from the official docs: The bucket comment `[2000-12-31, 2000-01-07)` ends before it starts. With a seven-day bucket width it is changed to `[2000-12-31, 2001-01-07)`.
- Corrected from the official docs: The bucket comment `[2000-12-29 12:00:00, 2000-01-05 12:00:00)` ends before it starts. With a seven-day bucket width it is changed to end at `2001-01-05 12:00:00`.
- Corrected from the official docs: The bucket comment `[2000-12-29 12:00:00.00 UTC, 2000-01-05 12:00:00.00 UTC)` ends before it starts. With a seven-day bucket width it is changed to end at `2001-01-05 12:00:00.00 UTC`.
- Corrected from the official docs: The text says each bucket is 12 hours wide, but the bucket `[1949-12-30 12:00:00, 1950-01-01 00:00:00)` spans 36 hours and `1950-02-00` is not a valid date. The bounds are changed to `1949-12-31 00:00:00` and `1950-01-02 00:00:00`.
- Corrected from the official docs: The text says each bucket is 12 hours wide, but the bucket `[1949-12-30 12:00:00.00 UTC, 1950-01-01 00:00:00.00 UTC)` spans 36 hours and `1950-02-00` is not a valid date. The bounds are changed to `1949-12-31 00:00:00.00 UTC` and `1950-01-02 00:00:00.00 UTC`.
- Corrected from the official docs: The text says the origin is `2000-12-24 12:00:00`, but the example code passes `DATETIME '2000-12-22 12:00:00'` and its comments say the buckets originate from `2000-12-22 12:00:00`. The text is changed to match.
- Corrected from the official docs: The text says the origin is `2000-12-24 12:00:00`, but the example code passes `TIMESTAMP '2000-12-22 12:00:00.00'` and its comments say the buckets originate from `2000-12-22 12:00:00`. The text is changed to match.
- Corrected from the official docs: The `GAP_FILL` syntax has a comma after `bucket_width` and another at the start of the optional `[, partitioning_columns => ...]`, which gives a doubled comma. The first comma is removed.
- Corrected from the official docs: The `GAP_FILL` subquery syntax has a comma after `bucket_width` and another at the start of the optional `[, partitioning_columns => ...]`, which gives a doubled comma. The first comma is removed.
- Conflicting official statements: The `GAP_FILL` syntax blocks name the second argument `time_series_column` (positional), but every `GAP_FILL` example passes it as `ts_column => 'time'`. The official docs do not say which spelling is accepted; both are kept as published.
- Caution: In the `GAP_FILL` example with `linear` and `ignore_null_values => FALSE`, the result shows `NULL` for the `09:38` row although the input row for that bucket has the value 80 (`09:38:01`). The description only says the output is `NULL` when an endpoint is `NULL`; the official docs do not explain this row, and the result is kept as published.

## Related

- [Index of this directory](./README.md)
