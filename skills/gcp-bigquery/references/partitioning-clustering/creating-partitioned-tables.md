---
source: https://docs.cloud.google.com/bigquery/docs/creating-partitioned-tables
---

# Create partitioned tables

How to create an empty time-unit column-partitioned, ingestion-time partitioned or integer-range partitioned table with `CREATE TABLE ... PARTITION BY`, `bq mk` or `tables.insert`; how to create one from a query result; and how to convert date-sharded tables into one ingestion-time partitioned table with `bq partition`.

## Signature / Usage

### Time-unit column-partitioned table (SQL)

Daily partitions on a `DATE` column (the default type for `DATE`):

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64, transaction_date DATE)
PARTITION BY
  transaction_date
  OPTIONS (
    partition_expiration_days = 3,
    require_partition_filter = TRUE);
```

Monthly partitions, using `DATE_TRUNC` in `PARTITION BY`:

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64, transaction_date DATE)
PARTITION BY
  DATE_TRUNC(transaction_date, MONTH)
  OPTIONS (
    partition_expiration_days = 3,
    require_partition_filter = TRUE);
```

For a `TIMESTAMP` or `DATETIME` column use `TIMESTAMP_TRUNC` or `DATETIME_TRUNC`:

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64, transaction_ts TIMESTAMP)
PARTITION BY
  TIMESTAMP_TRUNC(transaction_ts, DAY)
  OPTIONS (
    partition_expiration_days = 3,
    require_partition_filter = TRUE);
```

### Time-unit column-partitioned table (bq)

Adapted (not in the official docs): added the missing line-continuation `\` after `--require_partition_filter=BOOLEAN`, otherwise the table argument runs as a separate command.

```bash
bq mk \
   --table \
   --schema SCHEMA \
   --time_partitioning_field COLUMN \
   --time_partitioning_type UNIT_TIME \
   --time_partitioning_expiration EXPIRATION_TIME \
   --require_partition_filter=BOOLEAN \
   PROJECT_ID:DATASET.TABLE
```

Hourly partitioning on `ts`, partition expiration 259,200 seconds (3 days):

```bash
bq mk \
   -t \
   --schema 'ts:TIMESTAMP,qtr:STRING,sales:FLOAT' \
   --time_partitioning_field ts \
   --time_partitioning_type HOUR \
   --time_partitioning_expiration 259200  \
   mydataset.mytable
```

### Ingestion-time partitioned table

SQL, daily partitions on `_PARTITIONDATE`:

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64)
PARTITION BY
  _PARTITIONDATE
  OPTIONS (
    partition_expiration_days = 3,
    require_partition_filter = TRUE);
```

Monthly partitions:

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64)
PARTITION BY
  DATE_TRUNC(_PARTITIONTIME, MONTH)
  OPTIONS (
    partition_expiration_days = 3,
    require_partition_filter = TRUE);
```

bq, daily partitioning, partition expiration 259,200 seconds (3 days):

```bash
bq mk \
   -t \
   --schema qtr:STRING,sales:FLOAT,year:STRING \
   --time_partitioning_type DAY \
   --time_partitioning_expiration 259200 \
   mydataset.mytable
```

### Integer-range partitioned table

SQL (start 0, end 100, interval 10):

```sql
CREATE TABLE mydataset.newtable (customer_id INT64, date1 DATE)
PARTITION BY
  RANGE_BUCKET(customer_id, GENERATE_ARRAY(0, 100, 10))
  OPTIONS (
    require_partition_filter = TRUE);
```

Adapted (not in the official docs): added the `--table` flag, which the source's steps name but its template omits (without it `bq mk` creates a dataset).

```bash
bq mk \
   --table \
   --schema schema \
   --range_partitioning=COLUMN_NAME,START,END,INTERVAL \
   --require_partition_filter=BOOLEAN  \
   PROJECT_ID:DATASET.TABLE
```

```bash
bq mk \
   -t \
   --schema 'customer_id:INTEGER,qtr:STRING,sales:FLOAT' \
   --range_partitioning=customer_id,0,100,10 \
   mydataset.mytable
```

### Partitioned table from a query result

`CREATE TABLE ... AS SELECT` works for time-unit column and integer-range partitioning, not ingestion time:

```sql
CREATE TABLE
  mydataset.newtable (transaction_id INT64, transaction_date DATE)
PARTITION BY
  transaction_date
AS (
  SELECT
    transaction_id, transaction_date
  FROM
    mydataset.mytable
);
```

`bq query` with a destination table works for any partitioning type (`jobs.insert` with `destinationTable` plus `timePartitioning` or `rangePartitioning` does the same):

```bash
bq query \
   --use_legacy_sql=false \
   --destination_table TABLE_NAME \
   --time_partitioning_field COLUMN \
   --time_partitioning_type UNIT_TIME \
   'QUERY_STATEMENT'
```

```bash
bq query \
   --use_legacy_sql=false \
   --destination_table TABLE_NAME \
   --time_partitioning_type UNIT_TIME \
   'QUERY_STATEMENT'
```

```bash
bq query \
   --use_legacy_sql=false \
   --destination_table PROJECT_ID:DATASET.TABLE \
   --range_partitioning COLUMN,START,END,INTERVAL \
   'QUERY_STATEMENT'
```

```bash
bq query \
   --use_legacy_sql=false \
   --destination_table mydataset.newtable \
   --time_partitioning_field transaction_date \
   --time_partitioning_type MONTH \
   'SELECT transaction_id, transaction_date FROM mydataset.mytable'
```

Create an ingestion-time partitioned table and load into the `20180201` partition with a partition decorator:

```bash
bq query \
   --use_legacy_sql=false  \
   --time_partitioning_type=DAY \
   --destination_table='newtable$20180201' \
   'SELECT * FROM mydataset.mytable'
```

### Convert date-sharded tables

`bq partition` creates a copy job that turns tables such as `sourcetable_20180126` and `sourcetable_20180127` into partitions `mydataset.mytable_partitioned$20180126` and `$20180127`:

```bash
bq --location=LOCATION partition \
    --time_partitioning_type=PARTITION_TYPE \
    --time_partitioning_expiration INTEGER \
    PROJECT_ID:SOURCE_DATASET.SOURCE_TABLE \
    PROJECT_ID:DESTINATION_DATASET.DESTINATION_TABLE
```

```bash
bq partition \
    --time_partitioning_type=DAY \
    --time_partitioning_expiration 259200 \
    mydataset.sourcetable_ \
    mydataset.mytable_partitioned
```

## Options / Props

### Required roles and permissions

| Role / permission | Needed for |
|---|---|
| `roles/bigquery.jobUser` (BigQuery Job User) on the project | Creating a table by loading data or saving query results |
| `roles/bigquery.dataEditor` (BigQuery Data Editor) on the dataset | Creating the table |
| `bigquery.tables.create` on the dataset | Creating the table |
| `bigquery.tables.getData` on all tables and views the query references | Saving query results as a table |
| `bigquery.jobs.create` on the project | Creating the table by loading data or saving query results |
| `bigquery.tables.updateData` on the table | Appending to or overwriting a table with query results |

### `bq mk` / `bq query` / `bq partition` placeholders

| Placeholder | Description |
|---|---|
| `SCHEMA` | `column:data_type,column:data_type` or the path to a JSON schema file |
| `COLUMN` / `COLUMN_NAME` | Partitioning column; `TIMESTAMP`, `DATETIME` or `DATE` for time-unit, `INTEGER` for range |
| `UNIT_TIME` / `PARTITION_TYPE` | `DAY`, `HOUR`, `MONTH` or `YEAR` |
| `EXPIRATION_TIME` / `INTEGER` | Partition expiration in seconds (`--time_partitioning_expiration`, optional). For `bq partition` there is no minimum and expiration is the partition's UTC date plus the value |
| `BOOLEAN` | If `true`, queries must include a partition filter (`--require_partition_filter`, optional) |
| `START` / `END` / `INTERVAL` | Range start (inclusive), range end (exclusive), width of each range. Values outside go to `__UNPARTITIONED__` |
| `LOCATION` | Location name; the `--location` flag is optional |
| `PROJECT_ID` | Project ID; the default project if omitted |

## Notes

- The Console cannot set partition expiration; set it afterwards (see "Updating the partition expiration" in the managing partitioned tables page).
- Partition filters and expiration: the SQL examples set `partition_expiration_days = 3`, which deletes partitions older than 3 days automatically, and `require_partition_filter = TRUE`, which makes unfiltered queries fail. Try them on a disposable dataset first.
- `bq partition` does not support `--label`, `--expiration`, `--add_tags` or `--description`; add them to the table afterwards.
- Corrected from the official docs: the time-unit `bq mk` template ended `--require_partition_filter=BOOLEAN` without a trailing `\`; the integer-range template read `bq mk \ --schema schema \ --range_partitioning=...` without `--table`.
- The source also shows Console steps, Terraform (`google_bigquery_table` with `time_partitioning` / `range_partitioning`), the `tables.insert` API (properties `timePartitioning` / `rangePartitioning` plus `schema`), and Go, Java, Node.js and Python client samples; these are omitted here.
- Source: https://docs.cloud.google.com/bigquery/docs/creating-partitioned-tables (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [partitioned-tables.md](./partitioned-tables.md)
- [querying-partitioned-tables.md](./querying-partitioned-tables.md)
- [managing-partitioned-tables.md](./managing-partitioned-tables.md)
- [clustered-tables.md](./clustered-tables.md)
