---
source: https://docs.cloud.google.com/bigquery/docs/write-api-rest
---

# Storage Write API (REST)

The BigQuery Storage Write API (REST), previously known as the legacy `tabledata.insertAll` method, streams rows into BigQuery tables without running a load job. Streamed data is available for real-time GoogleSQL analysis as soon as BigQuery acknowledges the write request. For new projects use the Storage Write API (gRPC) (lower pricing, exactly-once delivery, streaming into Apache Iceberg managed tables); when migrating, select the gRPC default stream.

## Signature / Usage

### Stream rows (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of table to append to.
# table_id = "your-project.your_dataset.your_table"

rows_to_insert = [
    {"full_name": "Phred Phlyntstone", "age": 32},
    {"full_name": "Wylma Phlyntstone", "age": 29},
]

errors = client.insert_rows_json(table_id, rows_to_insert)  # Make an API request.
if errors == []:
    print("New rows have been added.")
else:
    print("Encountered errors while inserting rows: {}".format(errors))
```

### Stream rows (Node.js)

```javascript
// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function insertRowsAsStream() {
  // Inserts the JSON objects into my_dataset:my_table.

  /**
   * TODO(developer): Uncomment the following lines before running the sample.
   */
  // const datasetId = 'my_dataset';
  // const tableId = 'my_table';
  const rows = [
    {name: 'Tom', age: 30},
    {name: 'Jane', age: 32},
  ];

  // Insert data into a table
  await bigquery.dataset(datasetId).table(tableId).insert(rows);
  console.log(`Inserted ${rows.length} rows`);
}
```

### Stream without `insertId` (Python)

The source recommends not populating `insertId`.

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

# TODO(developer): Set table_id to the ID of table to append to.
# table_id = "your-project.your_dataset.your_table"

rows_to_insert = [
    {"full_name": "Phred Phlyntstone", "age": 32},
    {"full_name": "Wylma Phlyntstone", "age": 29},
]

errors = client.insert_rows_json(
    table_id, rows_to_insert, row_ids=[None] * len(rows_to_insert)
)  # Make an API request.
if errors == []:
    print("New rows have been added.")
else:
    print("Encountered errors while inserting rows: {}".format(errors))
```

### Stream to a partition with a decorator (testing only)

```bash
echo '{"a":1, "b":2}' | bq insert 'mydataset.mytable$20170101'
```

### Check for and remove duplicates

Check for duplicates (a result greater than 1 means duplicates exist):

```sql
#standardSQL
SELECT
  MAX(count) FROM(
  SELECT
    ID_COLUMN,
    count(*) as count
  FROM
    `TABLE_NAME`
  GROUP BY
    ID_COLUMN)
```

Remove duplicates (specify a destination table, allow large results, and disable result flattening):

```sql
#standardSQL
SELECT
  * EXCEPT(row_number)
FROM (
  SELECT
    *,
    ROW_NUMBER()
          OVER (PARTITION BY ID_COLUMN) row_number
  FROM
    `TABLE_NAME`)
WHERE
  row_number = 1
```

### Diagnose streaming quota errors

```sql
SELECT
 start_timestamp,
 error_code,
 SUM(total_input_bytes) as sum_input_bytes,
 SUM(IF(error_code IN ('QUOTA_EXCEEDED', 'RATE_LIMIT_EXCEEDED'),
     total_requests, 0)) AS quota_error
FROM
 `region-REGION_NAME`.INFORMATION_SCHEMA.STREAMING_TIMELINE_BY_PROJECT
WHERE
  start_timestamp > TIMESTAMP_SUB(CURRENT_TIMESTAMP, INTERVAL 1 DAY)
GROUP BY
 start_timestamp,
 error_code
ORDER BY 1 DESC
```

## Options / Props

### Required permissions

| Permission | Purpose |
|---|---|
| `bigquery.tables.updateData` | Insert data into the table |
| `bigquery.tables.get` | Obtain table metadata |
| `bigquery.datasets.get` | Obtain dataset metadata |
| `bigquery.tables.create` | Required if a template table creates the table automatically |

Predefined roles that include them: `roles/bigquery.dataEditor`, `roles/bigquery.dataOwner`, `roles/bigquery.admin`.

### Date, time and range formats

| Type | Format |
|---|---|
| `DATE` | A string in the form `"YYYY-MM-DD"` |
| `DATETIME` | A string in the form `"YYYY-MM-DD [HH:MM:SS]"` |
| `TIME` | A string in the form `"HH:MM:SS"` |
| `TIMESTAMP` | The number of seconds since 1970-01-01 (the Unix epoch), or a string in the form `"YYYY-MM-DD HH:MM[:SS]"` |
| `RANGE<T>` (`T` is `DATE`, `DATETIME` or `TIMESTAMP`) | JSON object with `start` and `end`; missing or NULL means an unbounded boundary |
| `NUMERIC` / `BIGNUMERIC` | Value surrounded by double quotation marks, such as `"big_numeric_col":"0.123456789123"` |

### Partitioned tables

| Table type | Behavior |
|---|---|
| Any time-partitioned table | Each partition has a streaming buffer, retained when a job overwrites the partition with `writeDisposition` = `WRITE_TRUNCATE`; verify it is empty with `tables.get` on the partition before removing it |
| Ingestion-time | Partition inferred from current UTC time; new rows first sit in `__UNPARTITIONED__` (no SLA for repartitioning); daily partitioned tables can use a decorator in `tableId` such as `table1$20210301`; allowed range 31 days in the past to 16 days in the future (use a load or query job outside it); not supported for hourly, monthly or yearly tables |
| Time-unit column | `DATE`, `DATETIME` or `TIMESTAMP` column value between 10 years in the past and 1 year in the future; data outside this range is rejected. Daily partitions are handled differently from hourly, monthly and yearly ones: only data outside last 7 days to future 3 days is extracted to the UNPARTITIONED partition for daily tables; for hourly tables data is always extracted there and later repartitioned |

### Template tables

| Item | Value |
|---|---|
| Parameter | `templateSuffix` in the API request; `--template_suffix` flag on `bq insert` |
| Resulting table | Same schema as the targeted table, named `<targeted_table_name>` + `<templateSuffix>`, same project and dataset |
| Suffix characters | Letters (a-z, A-Z), numbers (0-9), underscores |
| Max length | Table name plus suffix combined: 1024 characters |
| Quota | Subject to streaming quota; up to 10 tables per second (like `tables.insert`), applies only to created tables; for more, use clustered tables |
| Expiration | Inherited from the dataset; generated tables cannot be copied immediately |
| Availability | Usually within a few seconds, rarely longer |
| Schema changes | Later generated tables use the new schema; tables still having a streaming buffer follow backward compatible changes; non-backward-compatible changes lose buffered data with the old schema and block new streaming to those tables; wait for propagation (insert of new fields within a few minutes; queries on new fields up to 90 minutes) |
| Restrictions | Template and generated tables shouldn't be views; deduplication happens only between uniform references to a destination table |

### Data availability

| Item | Value |
|---|---|
| Query availability | Immediately after BigQuery acknowledges the request |
| Streaming buffer bytes | Not charged under on-demand pricing; under capacity-based pricing, reservations consume slots |
| `_PARTITIONTIME` of recent rows | Temporarily `NULL`; final value assigned typically within a few minutes, rarely up to 90 minutes |
| Table copy | Recent rows might not be available for copy, typically a few minutes, rarely up to 90 minutes; absent `streamingBuffer` section in the `tables.get` response means the data is available; `streamingBuffer.oldestEntryTime` shows the age |
| Excluded operations | Table copy jobs and `tabledata.list` don't interact with write-optimized storage, so recent streaming data is missing there |

### Best effort de-duplication

| Item | Value |
|---|---|
| Mechanism | `insertId` per row |
| Window | Up to one minute; BigQuery might de-duplicate the same row with the same `insertId` in the same table |
| Guarantee | None; the quality can be degraded at any time; if two rows share an `insertId` which one is kept is nondeterministic |
| Disable | Do not populate `insertId` (recommended); Apache Beam Java: `ignoreInsertIds()` |
| Strict needs | The source names Google Cloud Datastore as an alternative service that supports transactions |

### Response handling

| Case | Meaning |
|---|---|
| Failure HTTP code (for example network error) | Unknown whether the insert succeeded; retrying might duplicate rows, so set `insertId` |
| Permission error, invalid table name, exceeded quota | No rows inserted; the whole request fails |
| Success HTTP code, empty `insertErrors` | All rows inserted |
| Success HTTP code, `insertErrors` non-empty | Listed rows (by 0-based `index`, details in `errors`) weren't inserted; the others were, except on schema mismatch |
| Schema mismatch on any row | None inserted; each row gets an `insertErrors` entry; rows without a mismatch have `reason` = `stopped` and can be resent as-is |

### Streaming insert quota errors

| `insertId` | Quota limit | Error message |
|---|---|---|
| Empty | Bytes per second per project | Your entity with gaia_id: GAIA_ID, project: PROJECT_ID in region: REGION exceeded quota for insert bytes per second. |
| Populated | Rows per second per project | Your project: PROJECT_ID in REGION exceeded quota for streaming insert rows per second. |
| Populated | Rows per second per table | Your table: TABLE_ID exceeded quota for streaming insert rows per second. |
| Populated | Bytes per second per table | Your table: TABLE_ID exceeded quota for streaming insert bytes per second. |

## Notes

- Free tier: streaming is not available; without billing the error is `BigQuery: Streaming insert is not allowed in the free tier.` The table must exist before writing unless template tables are used.
- In certain regions the streaming insert quota is higher when `insertId` is not populated (see https://docs.cloud.google.com/bigquery/quotas#streaming_inserts).
- Resolution of quota errors, as stated: remove `insertId` where the region supports the higher quota; if mostly `RATE_LIMIT_EXCEEDED` and traffic is below 80% of quota, retry with exponential backoff; for Dataflow consider load jobs instead of streaming inserts; for `QUOTA_EXCEEDED` or traffic consistently above 80%, request a quota increase; or move to the newer Storage Write API (gRPC).
- Metadata changes (schema changes, table creation or deletion, truncation with `WRITE_TRUNCATE`) are eventually consistent for the streaming system, usually propagating within minutes; inserts can hit schema mismatch, `notFound` or be delivered to the old table or dropped during that period.
- Destructive option: the source says the safer strategy for the duplicate removal query is to target a new table; targeting the source table with write disposition `WRITE_TRUNCATE` overwrites it. Try it on a disposable dataset first. The query adds a `row_number` column that `SELECT * EXCEPT` removes; a view over the query is possible but costs follow the columns selected.
- `bq insert` is intended for testing only (the source's caution). Try partition-decorator writes on a disposable table first.
- The Node.js sample comments out `datasetId` and `tableId` and tells you to uncomment them before running.
- Names: Storage Write API (REST) is the former legacy `tabledata.insertAll` method; the Storage Write API (gRPC) is covered in write-api-grpc.md.
- The source also shows C#, Go, Java, PHP and Ruby streaming samples and a Java sample without row ids.
- Source: https://docs.cloud.google.com/bigquery/docs/write-api-rest (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-api-intro.md](./write-api-intro.md)
- [write-api-grpc.md](./write-api-grpc.md)
