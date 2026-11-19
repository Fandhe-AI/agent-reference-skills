---
source: https://docs.cloud.google.com/bigquery/docs/best-practices-costs
---

# Estimate and control costs

Best practices for estimating and controlling BigQuery costs. The primary costs are compute (query processing, on-demand or capacity-based) and storage (per the dataset storage billing model). The page also covers cost attribution, dry runs, bytes-billed limits, storage cost tuning, and troubleshooting unexpected charges.

## Signature / Usage

### Dry run a query (bq)

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

### Dry run a query (Python)

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

### Dry run a query (Node.js)

```javascript
// Import the Google Cloud client library
const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

async function queryDryRun() {
  // Runs a dry query of the U.S. given names dataset for the state of Texas.

  const query = `SELECT name
    FROM \`bigquery-public-data.usa_names.usa_1910_2013\`
    WHERE state = 'TX'
    LIMIT 100`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
    dryRun: true,
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);

  // Print the status and statistics
  console.log('Status:');
  console.log(job.metadata.status);
  console.log('\nJob Statistics:');
  console.log(job.metadata.statistics);
}
```

### Limit bytes billed (bq)

The query reads a public dataset and is billed by bytes processed unless it fails the limit.

```bash
  bq query --maximum_bytes_billed=1000000 \
  --use_legacy_sql=false \
  'SELECT
     word
   FROM
     `bigquery-public-data`.samples.shakespeare'
```

## Options / Props

### Pricing and cost controls

| Model | Charge | How to restrict cost |
|---|---|---|
| On-demand | Per TiB processed | Project-level or user-level daily custom quotas (hard cap); `maximum_bytes_billed` per query |
| Capacity (editions) | Slot-hours; pay-as-you-go for all editions; Enterprise and Enterprise Plus add optional 1- or 3-year commitments | Reservation maximum slots; commitments; baseline 0 with a maximum behaves like fully on-demand editions |

### Dry run and bytes-billed settings

| Setting | Where | Notes |
|---|---|---|
| `--dry_run` | `bq query` | Estimate only |
| `dryRun: true` | `JobConfiguration` (API), `QueryJobConfig(dry_run=True)` (Python) | Dry run is not asynchronous; result returned immediately |
| `--maximum_bytes_billed` | `bq query` | Query fails without charge if the estimate exceeds the limit |
| `maximumBytesBilled` | `JobConfigurationQuery` / `QueryRequest` | API equivalent |

### Billing-comparison facts

| Item | Value |
|---|---|
| Minimum billed per referenced table and per query | 10 MiB |
| On-demand free tier | 1 TB of querying per month per project |
| Long-term storage | Unmodified 90 consecutive days; storage price drops 50 percent; each partition considered separately |
| Time travel default | 7 days; fail-safe adds 7 days |
| Cloud Billing daily boundary | Midnight US and Canadian Pacific Time (UTC-8); `INFORMATION_SCHEMA` is UTC |

## Notes

- The source also shows Console, Go, Java, and PHP forms of the dry run; they are omitted here.
- Dry-run byte estimates are an upper bound; for tables protected by row-level security, dry runs always return 0 bytes to prevent side-channel attacks. Estimates for clustered tables are an upper bound, so a query can fail `maximum_bytes_billed` although actual bytes billed would not exceed it. Error example: `Error: Query exceeded limit for bytes billed: 1000000. 10485760 or higher required.`
- Capacity-based cost cannot be estimated exactly per query (dynamic slot allocation, concurrency, autoscaling). After execution use `total_slot_ms` in `INFORMATION_SCHEMA.JOBS`. Enable compute cost attribution in the administration project to attribute capacity charges to consumption projects (Cloud Billing line item **Analysis Slots Attribution**, no extra cost).
- On-demand costs always use logical (uncompressed) bytes regardless of the dataset storage billing model. For ORC / Parquet external tables, charged bytes are limited to columns read.
- Avoid `LIMIT` as cost control on non-clustered tables (all bytes still billed); on clustered tables it can reduce bytes scanned. Use table preview (console Preview tab, `bq head`, `tabledata.list`) instead of exploratory queries. Materialize multi-stage query results into destination tables. Consider Rapid Cache for Cloud Storage external tables.
- Storage: modifying data, metadata, schema, labels, description, or expiration moves long-term data back to active storage. With the physical billing model, `TRUNCATE TABLE` and `--replace` loads keep replaced data for the time travel and fail-safe windows, so prefer `WRITE_APPEND`, `MERGE`, or the Storage Write API. Time travel storage is billed only under the physical billing model; the source recommends reducing the window to 2 days to minimize cost of deletions in physical-model datasets. Use default table expiration for large destination tables. Try destructive operations on a disposable dataset first.
- Troubleshooting autoscaling: billing uses scaled slots (multiples of 50, one-minute minimum unless fluid scaling) rather than slots used, so slot-hours billed can exceed `INFORMATION_SCHEMA.JOBS` calculations. The `BigQuery Governance SKU` comes from Knowledge Catalog jobs billed under the BigQuery Reservation API SKU. Label `goog-bq-feature-type` = `BQ_STUDIO_NOTEBOOK` marks notebook usage metered as pay-as-you-go Standard edition slots; `SPARK_PROCEDURE` marks Apache Spark procedures metered as pay-as-you-go Enterprise edition slots. Disabling the Reservation API does not stop commitment charges; set the renewal plan to `NONE`.
- Billing lower than calculated bytes: free tier, double-counted `SCRIPT` jobs, discounts and credits. Billing higher: row-level security queries do not populate `total_bytes_billed`, BigQuery ML pricing differs per model type, location-dependent per-TB prices. The error `Your project exceeded quota for free query bytes scanned` requires upgrading to a paid Cloud Billing account.
- Storage billing comparisons: use `INFORMATION_SCHEMA.TABLE_STORAGE_USAGE_TIMELINE` instead of `TABLE_STORAGE`; views exclude taxes, adjustments, and rounding.
- Prices are not copied; see https://cloud.google.com/bigquery/pricing.
- Source: https://docs.cloud.google.com/bigquery/docs/best-practices-costs (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [custom-quotas.md](./custom-quotas.md)
- [slots.md](./slots.md)
- [reservations-workload-management.md](./reservations-workload-management.md)
- [editions-intro.md](./editions-intro.md)
