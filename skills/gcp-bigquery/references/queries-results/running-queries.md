---
source: https://docs.cloud.google.com/bigquery/docs/running-queries
---

# Run a query

Run queries interactively, in batches, or continuously. Use a dry run to validate SQL and estimate bytes processed. Covers required roles, destination tables, query settings, optional job creation mode, Arrow results (Preview), global queries, and advanced runtime.

## Signature / Usage

### Run an interactive query (GoogleSQL)

```sql
SELECT
  name, gender,
  SUM(number) AS total
FROM
  `bigquery-public-data.usa_names.usa_1910_2013`
GROUP BY
  name, gender
ORDER BY
  total DESC
LIMIT
  10;
```

### Run an interactive query (bq)

```bash
bq query \
    --use_legacy_sql=false \
    'QUERY'
```

### Write results to a destination table (bq)

```bash
bq query \
    --location=LOCATION \
    --destination_table=TABLE \
    --use_legacy_sql=false \
    'QUERY'
```

### Run a query (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

query = """
    SELECT name, SUM(number) as total_people
    FROM `bigquery-public-data.usa_names.usa_1910_2013`
    WHERE state = 'TX'
    GROUP BY name, state
    ORDER BY total_people DESC
    LIMIT 20
"""
rows = client.query_and_wait(query)  # Make an API request.

print("The query data:")
for row in rows:
    # Row values can be accessed by field name or index.
    print("name={}, count={}".format(row[0], row["total_people"]))
```

### Run a query (Node.js)

```javascript
// Import the Google Cloud client library using default credentials
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();
async function query() {
  // Queries the U.S. given names dataset for the state of Texas.

  const query = `SELECT name
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
    WHERE state = 'TX'
    LIMIT 100`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
}
```

### Dry run (bq)

```bash
bq query \
--use_legacy_sql=false \
--dry_run \
'SELECT
   COUNTRY,
   AIRPORT,
   IATA
 FROM
   `project_id`.dataset.airports
 LIMIT
   1000'
```

Output for a valid query:

```text
Query successfully validated. Assuming the tables are not modified,
running this query will process 10918 bytes of data.
```

### Dry run (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

job_config = bigquery.QueryJobConfig(dry_run=True, use_query_cache=False)

# Start the query, passing in the extra configuration.
query_job = client.query(
    (
        "SELECT name, COUNT(*) as name_count "
        "FROM `bigquery-public-data.usa_names.usa_1910_2013` "
        "WHERE state = 'WA' "
        "GROUP BY name"
    ),
    job_config=job_config,
)  # Make an API request.

# A dry run query completes immediately.
print("This query will process {} bytes.".format(query_job.total_bytes_processed))
```

### Batch query (bq)

```bash
bq query \
    --batch \
    --use_legacy_sql=false \
    'QUERY'
```

### Batch query (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

job_config = bigquery.QueryJobConfig(
    # Run at batch priority, which won't count toward concurrent rate limit.
    priority=bigquery.QueryPriority.BATCH
)

sql = """
    SELECT corpus
    FROM `bigquery-public-data.samples.shakespeare`
    GROUP BY corpus;
"""

# Start the query, passing in the extra configuration.
query_job = client.query(sql, job_config=job_config)  # Make an API request.

# Check on the progress by getting the job's updated state. Once the state
# is `DONE`, the results are ready.
query_job = client.get_job(
    query_job.job_id, location=query_job.location
)  # Make an API request.

print("Job {} is currently in state {}".format(query_job.job_id, query_job.state))
```

### Optional job creation mode (Python 3.34.0 and up)

```python
# This example demonstrates executing a query without requiring an associated
# job.
from google.cloud import bigquery
from google.cloud.bigquery.enums import JobCreationMode

# Construct a BigQuery client object, specifying that the library should
# avoid creating jobs when possible.
client = bigquery.Client(
    default_job_creation_mode=JobCreationMode.JOB_CREATION_OPTIONAL
)

query = """
    SELECT
        name,
        gender,
        SUM(number) AS total
    FROM
        bigquery-public-data.usa_names.usa_1910_2013
    GROUP BY
        name, gender
    ORDER BY
        total DESC
    LIMIT 10
"""
# Run the query.  The returned `rows` iterator can return information about
# how the query was executed as well as the result data.
rows = client.query_and_wait(query)

if rows.job_id is not None:
    print("Query was run with job state.  Job ID: {}".format(rows.job_id))
else:
    print(
        "Query was run without creating a job.  Query ID: {}".format(rows.query_id)
    )

print("The query data:")
for row in rows:
    # Row values can be accessed by field name or index.
    print("name={}, gender={}, total={}".format(row[0], row[1], row["total"]))
```

### Optional job creation mode (JDBC driver v1.6.1 and up)

Requires `JobCreationMode=2` in the connection string.

```text
jdbc:bigquery://https://www.googleapis.com/bigquery/v2:443;JobCreationMode=2;Location=US;
```

### Arrow results from `jobs.query` (Preview, Python)

```python
from typing import Iterable

import pyarrow
from google.cloud.bigquery import enums

from google.cloud import bigquery


def query_and_wait_arrow() -> Iterable[pyarrow.RecordBatch]:
    """Queries BigQuery and returns results as an iterable of Apache Arrow RecordBatches.

    Returns:
        Iterable[pyarrow.RecordBatch]: An iterable of Apache Arrow RecordBatch objects.
    """
    # Initialize a BigQuery client.
    client = bigquery.Client()

    query = """
        SELECT name, number, state
        FROM `bigquery-public-data.usa_names.usa_1910_current`
        LIMIT 100000
    """

    # Run the query and wait for results returned directly in Arrow format
    # compressed with LZ4_FRAME.
    results = client.query_and_wait(
        query,
        query_results_format=enums.QueryResultsFormat.ARROW,
        compression_codec=enums.QueryResultsCompressionCodec.LZ4_FRAME,
    )

    # Return results as an iterable of pyarrow.RecordBatch objects.
    # Each batch contains a slice of the rows in Apache Arrow format.
    batches = results.to_arrow_iterable()
    return batches
```

Job `_default` stream resource name for the Storage Read API `ReadRows` method: `projects/PROJECT_ID/locations/LOCATION/jobs/JOB_ID/streams/_default`.

### Estimate the impact of the advanced runtime

```sql
WITH
  jobs AS (
    SELECT
      *,
      query_info.query_hashes.normalized_literals AS query_hash,
      TIMESTAMP_DIFF(end_time, start_time, MILLISECOND) AS elapsed_ms,
      EXISTS(
        SELECT 1
        FROM UNNEST(JSON_QUERY_ARRAY(query_info.optimization_details.optimizations)) AS o
        WHERE JSON_VALUE(o, '$.enhanced_vectorization') = 'applied'
      ) AS has_advanced_runtime
    FROM region-LOCATION.INFORMATION_SCHEMA.JOBS_BY_PROJECT
    WHERE EXTRACT(DATE FROM creation_time) > DATE_SUB(CURRENT_DATE(), INTERVAL 30 DAY)
  ),
  most_recent_jobs_without_advanced_runtime AS (
    SELECT *
    FROM jobs
    WHERE NOT has_advanced_runtime
    QUALIFY ROW_NUMBER() OVER (PARTITION BY query_hash ORDER BY end_time DESC) = 1
  )
SELECT
  job.job_id,
  100 * SAFE_DIVIDE(
    original_job.elapsed_ms - job.elapsed_ms,
    original_job.elapsed_ms) AS percent_execution_time_saved,
  job.elapsed_ms AS new_elapsed_ms,
  original_job.elapsed_ms AS original_elapsed_ms,
FROM jobs AS job
INNER JOIN most_recent_jobs_without_advanced_runtime AS original_job
  USING (query_hash)
WHERE
  job.has_advanced_runtime
  AND original_job.end_time < job.start_time
ORDER BY percent_execution_time_saved DESC
LIMIT 10;
```

## Options / Props

### Required roles

| Role / permission | Scope |
|-------------------|-------|
| BigQuery Job User (`roles/bigquery.jobUser`) | On the project |
| BigQuery Data Viewer (`roles/bigquery.dataViewer`) | On all tables and views the query references; to query views also on all underlying tables and views (not needed with authorized views or authorized datasets) |
| `bigquery.jobs.create` | On the project from which the query is run, regardless of where the data is stored |
| `bigquery.tables.getData` | On all tables and views the query references (and underlying tables and views for views) |

### Query job types and how to run them

| Type | Description |
|------|-------------|
| Interactive | Default; starts as quickly as possible |
| Batch | Lower priority; `bq query --batch` or `configuration.query.priority` = `BATCH`; queued when resources are exhausted |
| Continuous | Requires additional configuration (see the continuous queries page) |

### Query settings

| Setting |
|---------|
| Destination table for results |
| Job priority |
| Whether to use cached query results |
| Job timeout in milliseconds |
| Whether to use session mode |
| Type of encryption |
| Maximum number of bytes billed |
| Dialect of SQL |
| Location (must be the same location as any tables referenced in the query) |
| Reservation to run the query in |

### `bq query` flags used on this page

| Flag | Description |
|------|-------------|
| `--use_legacy_sql=false` | Use GoogleSQL syntax |
| `--location=LOCATION` | Region or multi-region of the destination table, for example `US` |
| `--destination_table=TABLE` | Destination table, `myDataset.myTable`, or `PROJECT_ID:DATASET.TABLE` for another project |
| `--append_table=true` | Append to an existing destination table |
| `--replace=true` | Overwrite an existing destination table |
| `--dry_run` | Validate the query and report bytes processed |
| `--batch` | Run at batch priority |

### Optional job creation mode (`jobs.query`)

| Item | Detail |
|------|--------|
| Enable | `jobCreationMode` = `JOB_CREATION_OPTIONAL` in the `QueryRequest` body |
| Response without a job | Results inline in `rows`; no `jobReference`; a `queryId` is returned (look it up in `INFORMATION_SCHEMA.JOBS`) |
| Response with a job | `jobReference` is returned; poll `jobs.getQueryResults` until `jobComplete` is `true`; `INFORMATION_SCHEMA.JOBS` `job_creation_reason` shows why |
| Client versions | Java 2.51.0+, Python 3.34.0+, Node 8.1.0+, Go 1.69.0+, JDBC v1.6.1+ (`JobCreationMode=2`), ODBC v3.0.7.1016+ (`JobCreationMode=2`) |
| Scripts | BigQuery might create fewer jobs than statements, or none; automatic |

### Arrow format (Preview)

| Item | Detail |
|------|--------|
| `queryResultsFormat` | `ARROW` in `QueryRequest` |
| `arrowSerializationOptions.bufferCompression` | `COMPRESSION_UNSPECIFIED`, `LZ4_FRAME`, or `ZSTD` |
| Response fields | `arrowSchema.serializedSchema`, `arrowRecordBatch.serializedRecordBatch`, `pageRowCount`; `rows` and `schema` aren't populated |
| `jobs.getQueryResults` | Doesn't support Arrow; stream remaining pages with the Storage Read API `ReadRows` on the job `_default` stream |
| `_default` stream | Always defaults to Arrow; waits for a running job; `total_estimated_row_count` is populated; override compression with `arrow_serialization_options` in `ReadRowsRequest` |

## Notes

- Billing: if you query data from a project to data stored in a different project, the querying project is billed for the query job and the project storing the data is billed for the stored amount.
- Error `Access Denied: Project [project_id]: User does not have bigquery.jobs.create permission in project [project_id].` means the principal lacks `bigquery.jobs.create` on the project being queried; it is required in addition to data access.
- Without a destination table the query job writes output to a temporary (cache) table. A destination table must be in the same location as the queried data; you cannot query a dataset in one location and write the results to a table in another.
- `--replace=true` overwrites the destination table: try it on a disposable table or dataset first.
- Dry runs use no query slots and are not charged. A dry run of a federated query on an external data source might report a lower bound of 0 bytes even if rows are returned; running it still incurs cost. Dry runs on tables masked by row-level security always return 0 bytes, so don't rely on them to estimate cost. The pricing calculator's smallest unit is MB.
- Global queries (Preview): a query referencing data in more than one location is run as a global query; it requires additional permissions and can incur additional costs because of data transfer between locations.
- Quotas for interactive and batch queries are under Query jobs in Quotas and limits. Monitor queries with the jobs explorer or `INFORMATION_SCHEMA.JOBS_BY_PROJECT`.
- Advanced runtime: enhanced vectorization and short query optimizations apply automatically; no code changes. Short query optimizations are most effective with optional job creation mode. Comparisons are only possible for queries created on or after January 30, 2026 (when `enhanced_vectorization` and `short_query_optimization` indicators became consistently available in `INFORMATION_SCHEMA.JOBS`). Replace `LOCATION` in the SQL with the location to measure.
- Arrow results is a Preview feature (Pre-GA terms; limited support).
- Omitted: the bq example with `--job_creation_mode=JOB_CREATION_OPTIONAL` is not shown because that flag is absent from the bq command-line reference; use the REST `jobCreationMode` field. The source also shows Console, Terraform (`google_bigquery_job`), C#, Go, Java, PHP and Ruby forms and an ODBC `.ini` example.
- Source: https://docs.cloud.google.com/bigquery/docs/running-queries (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cached-results.md](./cached-results.md)
- [parameterized-queries.md](./parameterized-queries.md)
- [query-overview.md](./query-overview.md)
