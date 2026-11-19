---
source: https://docs.cloud.google.com/bigquery/docs/change-data-capture
---

# Change data capture (CDC) ingestion

BigQuery change data capture (CDC) ingestion keeps tables synchronized with source changes by streaming real-time upsert and delete row operations through the Storage Write API (gRPC). The pseudocolumn `_CHANGE_TYPE` marks each row as `UPSERT` or `DELETE`; the table option `max_staleness` trades freshness for query cost and latency; the optional `_CHANGE_SEQUENCE_NUMBER` pseudocolumn supplies custom ordering.

## Signature / Usage

### Create a table with `max_staleness`

```sql
CREATE TABLE employees (
  id INT64 PRIMARY KEY NOT ENFORCED,
  name STRING)
  CLUSTER BY
    id
  OPTIONS (
    max_staleness = INTERVAL 10 MINUTE);
```

### Modify `max_staleness` on an existing table

```sql
ALTER TABLE employees
SET OPTIONS (
  max_staleness = INTERVAL 15 MINUTE);
```

### Enable partition pruning on a partitioned CDC table

```sql
ALTER TABLE `DATASET_NAME.TABLE_NAME`
SET OPTIONS (
  max_staleness = INTERVAL 15 MINUTE);
```

### Determine the current `max_staleness`

```sql
SELECT
  option_name,
  option_value
FROM
  DATASET_NAME.INFORMATION_SCHEMA.TABLE_OPTIONS
WHERE
  option_name = 'max_staleness'
  AND table_name = 'TABLE_NAME';
```

Example result:

```text
+---------------------+--------------+
| Row |  option_name  | option_value |
+---------------------+--------------+
|  1  | max_staleness | 0-0 0 0:10:0 |
+---------------------+--------------+
```

### Monitor upsert progress

```sql
SELECT upsert_stream_apply_watermark
FROM DATASET_NAME.INFORMATION_SCHEMA.TABLES
WHERE table_name = 'TABLE_NAME';
```

### Recommended `max_staleness` (p95 of background apply jobs plus a seven-minute buffer)

```sql
SELECT
  project_id,
  destination_table.dataset_id,
  destination_table.table_id,
  APPROX_QUANTILES((TIMESTAMP_DIFF(end_time, creation_time,MILLISECOND)/1000), 100)[OFFSET(95)] AS p95_background_apply_duration_in_seconds,
  CEILING(APPROX_QUANTILES((TIMESTAMP_DIFF(end_time, creation_time,MILLISECOND)/1000), 100)[OFFSET(95)]*2/60)+7 AS recommended_max_staleness_with_buffer_in_minutes
FROM `region-REGION`.INFORMATION_SCHEMA.JOBS AS job
WHERE
  project_id = 'PROJECT_ID'
  AND DATE(creation_time) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY) AND CURRENT_DATE()
  AND job_id LIKE "%cdc_background%"
GROUP BY 1,2,3;
```

### Assign a project to a `BACKGROUND` reservation

```sql
CREATE ASSIGNMENT
  `ADMIN_PROJECT_ID.region-REGION.RESERVATION_NAME.ASSIGNMENT_ID`
OPTIONS (
  assignee = 'projects/PROJECT_ID',
  job_type = 'BACKGROUND');
```

### Size and monitor a `BACKGROUND` reservation

Adapted (not in the official docs): the `region-REGION` qualifier is wrapped in backticks because the hyphen is not valid in an unquoted path.

```sql
SELECT
  period_start,
  SUM(period_slot_ms) / (1000 * 60) AS slots_used
FROM
  `region-REGION`.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT
WHERE
  DATE(job_creation_time) BETWEEN DATE_SUB(CURRENT_DATE(), INTERVAL 7 DAY)
  AND CURRENT_DATE()
  AND job_id LIKE '%cdc_background%'
GROUP BY
  period_start
ORDER BY
  period_start DESC;
```

## Options / Props

### Required permission

| Item | Value |
|---|---|
| Permission | `bigquery.tables.updateData` |
| Predefined role | BigQuery Data Editor (`roles/bigquery.dataEditor`) |

### Prerequisites

| Requirement | Detail |
|---|---|
| Write path | Storage Write API (gRPC) in the default stream |
| Format | protobuf; Apache Arrow isn't supported |
| Primary keys | Declared on the destination table; composite keys up to 16 columns |
| Compute | Sufficient BigQuery compute for the CDC row operations; if they fail you might retain data you meant to delete |

### Pseudocolumns

| Pseudocolumn | Values | Notes |
|---|---|---|
| `_CHANGE_TYPE` | `UPSERT`, `DELETE` only | Not queryable on a table read. Mixing `UPSERT` / `DELETE` rows with `INSERT` or unspecified rows in the same connection is unsupported and fails with `The given value is not a valid CHANGE_TYPE` |
| `_CHANGE_SEQUENCE_NUMBER` | Optional `STRING` in a fixed hexadecimal format | Not queryable on a table read |

### `_CHANGE_SEQUENCE_NUMBER` format and ordering

| Rule | Detail |
|---|---|
| Format | Hexadecimal sections separated by `/`; up to 4 sections, each at most 16 hexadecimal characters; upper or lower case |
| Range | `0/0/0/0` to `FFFFFFFFFFFFFFFF/FFFFFFFFFFFFFFFF/FFFFFFFFFFFFFFFF/FFFFFFFFFFFFFFFF` |
| Comparison | Unsigned numeric comparison of the first section, then the next only if the previous are equal. Example: `'7B'` beats `'77'`; `'FFF/ABC'` beats `'FFF/B'`; `'ABC'` beats `'BA/FFFFFFFF'`; `'FFF/ABC'` beats `'ABC'` |
| Ties | Identical values: the record with the latest BigQuery ingestion time wins |
| Default ordering | Without it, the record ingested latest (BigQuery system time) wins |
| Consistency | When used, always supply it; a mix of rows with and without it gives unpredictable ordering |
| Conversion | The client converts data to hexadecimal (for example a timestamp to milliseconds from Epoch: `'2024-04-30 11:19:44 UTC'` is `'18F2EBB6480'`) |

### Query behavior with `max_staleness`

| Situation | Behavior |
|---|---|
| Last apply within the interval | Returns the baseline version (based on `upsert_stream_apply_watermark`); partition and cluster pruning work |
| `max_staleness` not set, set to `0`, or baseline older than the interval | Runtime merge job; applies row modifications between watermark and query time, with extra latency; partition pruning is bypassed and the whole table is scanned |
| Apply cadence | Pending modifications are applied at least once within the interval, but BigQuery might not always finish in time |

The `max_staleness` value should generally be the higher of (a) the maximum tolerable staleness and (b) twice the maximum time to apply upserted changes plus a buffer.

### Job categories and reservations

| Job | Assignment type | Notes |
|---|---|---|
| Background apply jobs | `BACKGROUND` or `BACKGROUND_CHANGE_DATA_CAPTURE` | Run at regular intervals defined by `max_staleness`; without such an assignment they use on-demand pricing |
| Query jobs | Normal query | Read only the baseline within the `max_staleness` window; only these benefit from partitioning and clustering |
| Runtime merge jobs | `QUERY` | Triggered by queries outside the window; do not advance `upsert_stream_apply_watermark`; tables without `max_staleness` or with `0` also use `QUERY` |

### Limitations

| Limit | Detail |
|---|---|
| Key enforcement | None; primary keys must be unique |
| Primary key columns | At most 16 |
| Top-level columns | At most 2,000 on tables with active CDC |
| Unsupported on active CDC | Mutating DML (`DELETE`, `UPDATE`, `MERGE`) while the table receives CDC streams or has unmerged changes; wildcard table queries; search indexes |
| Unsupported when runtime merges occur (`max_staleness` too low) | Table copy, table clone, table snapshot, BigQuery Storage Read API, `requirePartitionFilter` table option |
| Export | Export operations omit recent unapplied row modifications; use an `EXPORT DATA` statement for the full table |
| Standard edition | `BACKGROUND` reservations aren't available, so apply uses on-demand pricing; querying CDC tables works in any edition |
| Delete retention | A CDC `DELETE` is applied only when `upsert_stream_apply_watermark` passes its streaming time; BigQuery keeps a two-day delete retention window (standard storage pricing) before the standard data deletion process |

## Notes

- Upsert operations are performed by the `bigquery-adminbot@system.gserviceaccount.com` service account and appear in the project's job history.
- Example from the source: a table with rows 100 / 101 / 102 receiving `100 DELETE`, `101 Tal 8000 UPSERT`, `105 Izumi 6000 UPSERT` ends with rows 101 (8000), 102 and 105.
- Mutating DML on a CDC table risks data drift with the source database if CDC streaming resumes.
- Corrected from the official docs: the source's reservation-sizing query has `FROM region-REGION.INFORMATION_SCHEMA.JOBS_TIMELINE_BY_PROJECT` (no backticks); the fence uses `` `region-REGION` ``.
- Try `CREATE ASSIGNMENT`, `max_staleness` changes and DML on a CDC table on a disposable dataset first; deleted data may be retained longer than expected if apply jobs lack resources.
- Pricing: ingestion (Storage Write API (gRPC)), storage and compute all incur costs; see https://cloud.google.com/bigquery/pricing. Prefer capacity pricing when baseline reads are large, avoid very low `max_staleness`, and consider a reservation for CDC tables.
- Datastream replication to BigQuery uses CDC ingestion; Datastream itself is not in this skill.
- Source: https://docs.cloud.google.com/bigquery/docs/change-data-capture (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-api-grpc.md](./write-api-grpc.md)
- [write-api-intro.md](./write-api-intro.md)
- [storage.md](./storage.md)
