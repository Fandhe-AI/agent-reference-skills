---
source: https://docs.cloud.google.com/bigquery/docs/cached-results
---

# Use cached query results

BigQuery writes query results to a temporary cached results table unless you specify a permanent destination table. Running an identical query again can return results from the cache, avoiding additional compute charges. Cached tables are kept per user and per project for approximately 24 hours for both interactive and batch queries, with exceptions. Cross-user caching depends on edition.

## Signature / Usage

### Disable cached results (bq)

Adapted (not in the official docs): `--use_legacy_sql=false` is added, because the query uses GoogleSQL backtick-quoted table names.

```bash
bq query \
--use_legacy_sql=false \
--nouse_cache \
--batch \
'SELECT
   name,
   count
 FROM
   `my-project`.mydataset.names_2013
 WHERE
   gender = "M"
 ORDER BY
   count DESC
 LIMIT
   6'
```

### Disable cached results (Python)

```python
from google.cloud import bigquery

# Construct a BigQuery client object.
client = bigquery.Client()

job_config = bigquery.QueryJobConfig(use_query_cache=False)
sql = """
    SELECT corpus
    FROM `bigquery-public-data.samples.shakespeare`
    GROUP BY corpus;
"""
query_job = client.query(sql, job_config=job_config)  # Make an API request.

for row in query_job:
    print(row)
```

### Disable cached results (Node.js)

```javascript
// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');

async function queryDisableCache() {
  // Queries the Shakespeare dataset with the cache disabled.

  // Create a client
  const bigquery = new BigQuery();

  const query = `SELECT corpus
    FROM \`bigquery-public-data.samples.shakespeare\`
    GROUP BY corpus`;
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    useQueryCache: false,
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

### Require cached results (bq)

Adapted (not in the official docs): `--use_legacy_sql=false` is added, because the query uses GoogleSQL backtick-quoted table names.

```bash
bq query \
--use_legacy_sql=false \
--require_cache \
--batch \
'SELECT
   name,
   count
 FROM
   `my-project`.mydataset.names_2013
 WHERE
   gender = "M"
 ORDER BY
   count DESC
 LIMIT
   6'
```

## Options / Props

### Job configuration properties and flags

| Name | Where | Effect |
|------|-------|--------|
| `configuration.query.useQueryCache` | REST job configuration | Set to `false` to disable retrieving cached results and force live evaluation |
| `--nouse_cache` | `bq query` | Overwrites the query cache |
| `--require_cache` | `bq query` | Requires results from the query cache |
| `createDisposition` = `CREATE_NEVER` | `jobs.insert` query configuration | Job fails with a `NOT_FOUND` error unless cached results can be used |
| `statistics.query.cacheHit` | Job statistics | `true` when results came from the cache; not charged for the query |
| `cacheHit` | Query result (API) | `true` when BigQuery returned a result using the cache |

### Exceptions: query results are not cached

| Condition |
|-----------|
| A destination table is specified in the job configuration, the Google Cloud console, the bq command-line tool, or the API |
| Any referenced table or logical view has changed since the results were cached |
| A referenced table recently received streaming inserts (data in write-optimized storage), even if no new rows arrived |
| The query uses non-deterministic functions such as `CURRENT_TIMESTAMP()`, `CURRENT_DATE`, `SESSION_USER()` |
| The query uses a wildcard to query multiple tables |
| The cached results expired (typical lifetime 24 hours, best-effort, may be invalidated sooner) |
| The query runs against an external data source other than Cloud Storage (GoogleSQL queries on Cloud Storage are supported) |
| The query runs against a table protected by row-level security |
| The query runs against a table protected by column-level security, including data masking (results might not be cached) |
| The query text changed in any way, including whitespace or comments |

### Limitations

| Limitation |
|------------|
| Duplicate query text must be the same as the original query to hit the cache |
| The result set must be smaller than the maximum response size to persist in a cached results table |
| Cached result tables cannot be targeted with DML statements |
| Using cached results as input for dependent jobs is discouraged; write to a named destination table instead (for example with dataset-level `defaultTableExpirationMs`) |

## Notes

- You aren't charged for storing cached results; cache hits aren't charged but are subject to quota policies.
- Storage: cached results live in a hidden anonymous dataset whose name begins with an underscore. Access is restricted to the owner (the user who ran the query); `bigquery.jobs.create` is also checked on the project. Anonymous datasets cannot be shared; write to a named destination table to share results. They can be listed through the bq tool or the API.
- Cross-user caching is available on the Enterprise or Enterprise Plus edition. The cached result is copied into your personal anonymous dataset and stays 24 hours from when you ran the query; the same limits and exceptions apply.
- Repeating a query with **Use cached results** disabled overwrites the existing cached result, requires computing the result, and is charged. Useful for benchmarking.
- Column-level security: removing a user or group from the Data Catalog Fine-Grained Reader role does not invalidate the 24-hour cache; a user who ran the query can still retrieve those results for 24 hours, only for data they were previously allowed to see. Rows added later are not visible.
- Verify cache use in the console: **Query results** > **Job Information** shows **Bytes processed** as **0 B (results cached)**.
- Data Catalog Fine-Grained Reader is a Policy Tag Manager role (column-level security); it is covered under column-level security in `gcp-bigquery`.
- The source also shows Console, Go, Java and PHP forms.
- Corrected from the official docs: the two `bq query` cache examples use GoogleSQL table names without `--use_legacy_sql=false`; without it, `bq` picks the dialect from the query or the configured default (`bq help query`), so the flag is added.
- Source: https://docs.cloud.google.com/bigquery/docs/cached-results (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [running-queries.md](./running-queries.md)
- [query-overview.md](./query-overview.md)
