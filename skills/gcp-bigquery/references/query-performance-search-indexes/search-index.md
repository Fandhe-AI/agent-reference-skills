---
source: https://docs.cloud.google.com/bigquery/docs/search-index
---

# Manage search indexes

Create, update, inspect and delete BigQuery search indexes with `CREATE SEARCH INDEX`, `ALTER SEARCH INDEX` and `DROP SEARCH INDEX`, and understand index refresh, `INFORMATION_SCHEMA` views and index-management options (free shared slots vs your own `BACKGROUND` reservation).

## Signature / Usage

### Create a search index with the default text analyzer

Columns `a` and `c` are indexed with the default `LOG_ANALYZER`:

```sql
CREATE TABLE dataset.simple_table(a STRING, b INT64, c JSON);

CREATE SEARCH INDEX my_index
ON dataset.simple_table(a, c);
```

### Create a search index on all columns with `NO_OP_ANALYZER`

Indexes `a`, `c.e` and `c.f.g`:

```sql
CREATE TABLE dataset.my_table(
  a STRING,
  b INT64,
  c STRUCT <d INT64,
            e ARRAY<STRING>,
            f STRUCT<g STRING, h INT64>>) AS
SELECT 'hello' AS a, 10 AS b, (20, ['x', 'y'], ('z', 30)) AS c;

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS)
OPTIONS (analyzer = 'NO_OP_ANALYZER');
```

### Specify the columns and data types

Supported data types in this example: `STRING`, `INT64`, `TIMESTAMP`.

```sql
CREATE TABLE dataset.simple_table(a STRING, b INT64, c JSON, d TIMESTAMP);

CREATE SEARCH INDEX my_index
ON dataset.simple_table(a, b, c, d)
OPTIONS ( data_types = ['STRING', 'INT64', 'TIMESTAMP']);
```

### All columns with data types specified

Indexes `a`, `b`, `c`, `d.e`, `d.f`, `d.g.h`, `d.g.i`.

Adapted (not in the official docs): the source's `CREATE TABLE ... AS ( SELECT ...; )` has a `;` inside the parentheses and no `;` after the closing parenthesis, which is not valid; both are corrected.

```sql
CREATE TABLE dataset.my_table(
  a STRING,
  b INT64,
  c TIMESTAMP,
  d STRUCT <e INT64,
            f ARRAY<STRING>,
            g STRUCT<h STRING, i INT64>>)
AS (
  SELECT
    'hello' AS a,
    10 AS b,
    TIMESTAMP('2008-12-25 15:30:00 UTC') AS c,
    (20, ['x', 'y'], ('z', 30)) AS d
);

CREATE SEARCH INDEX my_index
ON dataset.my_table(ALL COLUMNS)
OPTIONS ( data_types = ['STRING', 'INT64', 'TIMESTAMP']);
```

### Index with column granularity

Set `index_granularity` in the `index_column_option_list`. Table used in the source's example:

```sql
CREATE TABLE my_dataset.job_postings (job_id INT64, company_name STRING, job_description STRING);
```

Query that benefits (the word "skills" is common in `job_description` but rare in `company_name`):

```sql
SELECT * FROM my_dataset.job_postings WHERE SEARCH(company_name, 'skills');
```

```sql
CREATE SEARCH INDEX my_index
ON my_dataset.job_postings (
  company_name OPTIONS(index_granularity = 'COLUMN'),
  job_description);
```

### Check alteration status of indexes

```sql
SELECT
  table_name,
  index_name,
  last_index_alteration_info.status AS status,
  last_index_alteration_info.new_coverage_percentage AS coverage
FROM my_project.my_dataset.INFORMATION_SCHEMA.SEARCH_INDEXES
```

### Query `INFORMATION_SCHEMA.SEARCH_INDEXES`

Active indexes, their DDL, coverage and analyzer:

```sql
SELECT table_name, index_name, ddl, coverage_percentage, analyzer
FROM my_project.my_dataset.INFORMATION_SCHEMA.SEARCH_INDEXES
WHERE index_status = 'ACTIVE';
```

### Query `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS`

```sql
SELECT table_name, index_name, index_column_name, index_field_path
FROM my_project.dataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS
```

Join with `SEARCH_INDEXES` and `COLUMNS` to include status and data type:

```sql
SELECT
  index_columns_view.index_catalog AS project_name,
  index_columns_view.index_SCHEMA AS dataset_name,
  indexes_view.TABLE_NAME AS table_name,
  indexes_view.INDEX_NAME AS index_name,
  indexes_view.INDEX_STATUS AS status,
  index_columns_view.INDEX_COLUMN_NAME AS column_name,
  index_columns_view.INDEX_FIELD_PATH AS field_path,
  columns_view.DATA_TYPE AS data_type
FROM
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEXES indexes_view
INNER JOIN
  mydataset.INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS index_columns_view
  ON
    indexes_view.TABLE_NAME = index_columns_view.TABLE_NAME
    AND indexes_view.INDEX_NAME = index_columns_view.INDEX_NAME
LEFT OUTER JOIN
  mydataset.INFORMATION_SCHEMA.COLUMNS columns_view
  ON
    indexes_view.INDEX_CATALOG = columns_view.TABLE_CATALOG
    AND indexes_view.INDEX_SCHEMA = columns_view.TABLE_SCHEMA
    AND index_columns_view.TABLE_NAME = columns_view.TABLE_NAME
    AND index_columns_view.INDEX_COLUMN_NAME = columns_view.COLUMN_NAME
ORDER BY
  project_name,
  dataset_name,
  table_name,
  column_name;
```

### Organization-level consumption (`SEARCH_INDEXES_BY_ORGANIZATION`)

Does the total indexed base table size in the US multi-region (shared slots) exceed 100 TB?

```sql
WITH
 indexed_base_table_size AS (
 SELECT
   SUM(base_table.total_logical_bytes) AS total_logical_bytes
 FROM
   `region-us`.INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION AS search_index
 JOIN
   `region-us`.INFORMATION_SCHEMA.TABLE_STORAGE_BY_ORGANIZATION AS base_table
 ON
   (search_index.table_name = base_table.table_name
     AND search_index.project_id = base_table.project_id
     AND search_index.index_schema = base_table.table_schema)
 WHERE
   TRUE
   -- Excludes search indexes that are permanently disabled.
   AND search_index.index_status != 'PERMANENTLY DISABLED'
   -- Excludes BASE_TABLE_TOO_SMALL search indexes whose base table size is
   -- less than 10 GB. These tables don't count toward the limit.
   AND search_index.index_status_details.throttle_status != 'BASE_TABLE_TOO_SMALL'
   -- Excludes search indexes whose project has BACKGROUND reservation purchased
   -- for search indexes.
   AND search_index.use_background_reservation = false
 -- Outputs the total indexed base table size if it exceeds 100 TB,
 -- otherwise, doesn't return any output.
)
SELECT * FROM indexed_base_table_size
WHERE total_logical_bytes >= 109951162777600 -- 100 TB
```

Throttled indexes in the organization and region:

```sql
SELECT project_id, index_schema, table_name, index_name
FROM
 `region-us`.INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION
WHERE
 -- Excludes search indexes that are permanently disabled.
 index_status != 'PERMANENTLY DISABLED'
 AND index_status_details.throttle_status IN ('ORGANIZATION_LIMIT_EXCEEDED', 'BASE_TABLE_TOO_LARGE')
```

### Use your own reservation for index management

Create a reservation in the table's region, then assign the project with `job_type` `BACKGROUND`:

```sql
CREATE ASSIGNMENT
  `ADMIN_PROJECT_ID.region-LOCATION.RESERVATION_NAME.ASSIGNMENT_ID`
OPTIONS (
  assignee = 'projects/PROJECT_ID',
  job_type = 'BACKGROUND');
```

Same assignment with `bq`:

```bash
bq mk \
    --project_id=ADMIN_PROJECT_ID \
    --location=LOCATION \
    --reservation_assignment \
    --reservation_id=RESERVATION_NAME \
    --assignee_id=PROJECT_ID \
    --job_type=BACKGROUND \
    --assignee_type=PROJECT
```

View the five most recent indexing jobs (not available for jobs in the shared slot pool):

```sql
SELECT *
FROM
 region-us.INFORMATION_SCHEMA.JOBS
WHERE
  project_id  = 'my_project'
  AND job_type IS NULL
  AND SEARCH(job_id, '`search_index`')
ORDER BY
 creation_time DESC
LIMIT 5;
```

Daily slot usage of index-management jobs (past 30 days, region `us-west1`):

```sql
SELECT
  TIMESTAMP_TRUNC(job.creation_time, DAY) AS usage_date,
  -- Aggregate total_slots_ms used for index-management jobs in a day and divide
  -- by the number of milliseconds in a day. This value is most accurate for
  -- days with consistent slot usage.
  SAFE_DIVIDE(SUM(job.total_slot_ms), (1000 * 60 * 60 * 24)) AS average_daily_slot_usage
FROM
  `region-us-west1`.INFORMATION_SCHEMA.JOBS job
WHERE
  project_id = 'my_project'
  AND job_type IS NULL
  AND SEARCH(job_id, '`search_index`')
GROUP BY
  usage_date
ORDER BY
  usage_date DESC
limit 30;
```

### Delete a search index

```sql
DROP SEARCH INDEX my_index ON dataset.simple_table;
```

## Options / Props

### Default indexed types (no data types specified)

| Type |
|------|
| `STRING` |
| `ARRAY<STRING>` |
| `STRUCT` containing at least one nested field of type `STRING` or `ARRAY<STRING>` |
| `JSON` |

### Text analyzers

| Analyzer | Description |
|----------|-------------|
| `LOG_ANALYZER` | Default. Suits machine-generated logs; special rules for tokens such as IP addresses and emails |
| `NO_OP_ANALYZER` | For pre-processed data to match exactly |
| `PATTERN_ANALYZER` | Extracts tokens from text using a regular expression |

### Cost of index alterations (`ALTER SEARCH INDEX`, Preview)

| Action | Description | Cost |
|--------|-------------|------|
| Drop columns | Updates the configuration instantly; metadata-only unless `REBUILD` is specified | No additional slots |
| Add columns or data types | Creates a revised index by processing the new data and reusing existing index data | Proportional to the amount of new data to index |
| Change token granularity, combine multiple alterations, or clean up storage | Rebuilds the index from scratch; removes data of dropped columns or data types, which can reduce index size and improve query performance | Proportional to the total size of the indexed data |

### `INFORMATION_SCHEMA` views for search indexes

| View | Content |
|------|---------|
| `INFORMATION_SCHEMA.SEARCH_INDEXES` | Each search index in a dataset |
| `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMNS` | Which columns of each table are indexed |
| `INFORMATION_SCHEMA.SEARCH_INDEXES_BY_ORGANIZATION` | Search indexes for the whole organization of the current project |
| `INFORMATION_SCHEMA.SEARCH_INDEX_COLUMN_OPTIONS` | Options set on columns of an indexed table |

### Index states and unused reasons

| Value | Meaning |
|-------|---------|
| `PENDING DISABLEMENT` | Total indexed size exceeded the organization limit in the shared pool; index queued for deletion, still used by queries and storage is charged |
| `TEMPORARILY DISABLED` | After deletion; queries don't use the index, no storage charge; `IndexUnusedReason` is `BASE_TABLE_TOO_LARGE` |
| `ACTIVE` | Management resumed after size falls below the limit; queries use the index and storage is charged |
| `BASE_TABLE_TOO_SMALL` | `IndexUnusedReason` when the indexed table is under 10GB |

### Reservation sizing estimates

| Scenario | Estimate |
|----------|----------|
| Existing data | 1000-slot reservation indexes an existing table at an average of up to 4 GiB per second (about 336 TiB per day) |
| Newly ingested data | On average three times the resources of initial backfill-indexing of the same data |
| Infrequently modified data | Start at 1/5 of the slots for the initial backfill, and no fewer than 250 slots |
| Minimum | Reservations smaller than 250 slots aren't recommended for indexing |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/search-index (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Corrected from the official docs: the source's `CREATE TABLE dataset.my_table(...) AS ( SELECT ... AS d; )` followed directly by `CREATE SEARCH INDEX` had a `;` inside the parentheses and no `;` after `)`.
- `ALTER SEARCH INDEX` is Preview ("Pre-GA Offerings Terms"; pre-GA features are available "as is" and might have limited support). Cancel an alteration with the `BQ.CANCEL_INDEX_ALTERATION` system procedure; a completed alteration can't be cancelled. `last_index_alteration_info` is `NULL` when the alteration is finished.
- Indexes on tables smaller than 10GB aren't populated (`coverage_percentage` 0); an indexed table that falls below 10GB temporarily disables its index. No storage charge until the index is populated and active. `SEARCH` always returns correct results even if some data isn't indexed yet.
- Full refresh happens when the partition expiration is updated, an indexed column is updated by a table schema change, or the index is stale for lack of `BACKGROUND` reservation slots (autoscaling can help). A schema change that prevents an explicitly indexed column from being indexed disables the index permanently; deleting the only indexed column or renaming the table deletes the index. Deleting a table deletes its index. Do backfills slowly (for example partition by partition).
- `ALL COLUMNS` indexes every `STRING` or `JSON` column added later (or, with `data_types`, every matching column); creation fails if there is no such data. Limits on columns with granularity: https://docs.cloud.google.com/bigquery/quotas#indexed_granular_columns.
- Shared slots: free pool subject to the per-organization limit (https://docs.cloud.google.com/bigquery/quotas#index_limits); no capacity or throughput guarantee. Own reservation: no table size limits; temporarily add slots for large indexes. If total table size exceeds the region limit, keep a non-zero reservation assigned for indexing, otherwise indexing might fall back to the default tier and delete all indexes. Index-management jobs run when an index is created, data in an indexed table changes, the schema affects indexed columns, or index data is periodically optimized.
- Best practices: designed for large tables; don't index columns with few unique values or columns never used with `SEARCH` or other supported functions; be careful with `ALL COLUMNS`; use your own reservation in production.
- `CREATE ASSIGNMENT` and `bq mk --reservation_assignment` create a reservation assignment; try on a disposable project first. The source also shows Console steps. `DROP SEARCH INDEX` is irreversible; try it on a disposable dataset first.
- Omitted: result tables of the sample queries and the project-breakdown query of `SEARCH_INDEXES_BY_ORGANIZATION`.

## Related

- [search-intro.md](./search-intro.md)
- [bi-engine-intro.md](./bi-engine-intro.md)
