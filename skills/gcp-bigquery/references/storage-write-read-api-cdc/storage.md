---
source: https://docs.cloud.google.com/bigquery/docs/reference/storage
---

# Storage Read API

The BigQuery Storage Read API provides fast access to BigQuery-managed storage over an rpc-based protocol. Structured data is sent in a binary serialization format (Apache Avro or Apache Arrow), with multiple parallel streams per read session, column projection, server-side filtering and snapshot consistency. It does not manage datasets, jobs or tables.

## Signature / Usage

### Stream query results (Arrow, Preview)

Stream name to pass to `ReadRows` for a query job: `projects/PROJECT_ID/locations/LOCATION/jobs/JOB_ID/streams/_default`.

Basic flow: `CreateReadSession` (a `ReadSession` message sets maximum streams, snapshot time, columns and predicate filter), then `ReadRows` on each returned `Stream`, then decode Avro or Arrow row blocks. A stream can be split into two child streams for dynamic work rebalancing.

## Options / Props

### Permissions

| Item | Value |
|---|---|
| Role | `roles/bigquery.readSessionUser` (Read Session User) on the project |
| `bigquery.readsessions.create` | On the project |
| `bigquery.readsessions.getData` | On the table or higher |
| `bigquery.readsessions.update` | On the table or higher |

### Key features

| Feature | Detail |
|---|---|
| Multiple streams | Disjoint sets of rows per stream within a session |
| Column projection | Optional subset of columns at session creation |
| Column filtering | Simple filter predicates applied server-side |
| Snapshot consistency | Snapshot isolation; default snapshot time is session creation time; earlier snapshots allowed |

### Session and stream limits

| Item | Value |
|---|---|
| Session expiration | Returned in the `ReadSession` response; guaranteed at least 6 hours from creation; no cleanup needed |
| Stalled stream | Closed by the server if the client doesn't request data for more than 1 hour |
| Restart | Supply the row offset to `ReadRows` to resume a stream |
| Enablement | Shown as **BigQuery Storage API**; enabled in every project where the BigQuery API is enabled |
| Regions | Same regions and multi-regions as BigQuery |

### Query result streaming (Preview) behavior

| Behavior | Detail |
|---|---|
| Format | Always Apache Arrow, whether or not it was requested at job creation |
| Waiting | If the job is still running, the API waits for completion |
| Row count | `total_estimated_row_count` is populated in `ReadRowsResponse` |
| Arrow options | `arrow_serialization_options` in `ReadRowsRequest` (for example buffer compression) |

### Avro type mapping

| GoogleSQL type | Avro type | Annotations |
|---|---|---|
| `BOOLEAN` | boolean | |
| `INT64` | long | |
| `FLOAT64` | double | |
| `BYTES` | bytes | |
| `STRING` | string | |
| `DATE` | int | logicalType: date |
| `DATETIME` | string | logicalType: datetime |
| `TIMESTAMP` | long | logicalType: timestamp-micros |
| `TIME` | long | logicalType: time-micros |
| `NUMERIC` | bytes | logicalType: decimal (precision = 38, scale = 9) |
| `NUMERIC(P[, S])` | bytes | logicalType: decimal (precision = P, scale = S) |
| `BIGNUMERIC` | bytes | logicalType: decimal (precision = 77, scale = 38) |
| `BIGNUMERIC(P[, S])` | bytes | logicalType: decimal (precision = P, scale = S) |
| `GEOGRAPHY` | string | sqlType: GEOGRAPHY |
| `ARRAY` | array | |
| `STRUCT` | record | |
| `JSON` | string | sqlType: JSON |
| `RANGE<T>` | record | sqlType: RANGE; fields `start` and `end`, each a union `["null", AVRO_TYPE(T)]`; null means an unbounded boundary. The first `RANGE` field of type `T` defines the record `RANGE_T` in namespace `google.sqlType`; later fields of the same type reference `google.sqlType.RANGE_T` |

Avro schema for `RANGE` fields (the first field defines `RANGE_DATE`, the second references it):

```text
{
    "name": "range_date_1",
    "type": {
        "type": "record",
        "namespace": "google.sqlType",
        "name": "RANGE_DATE",
        "sqlType": "RANGE",
        "fields": [
            {
                 "name": "start",
                 "type": ["null", {"type": "int", "logicalType": "date"}]
            },
            {
                 "name": "end",
                 "type": ["null", {"type": "int", "logicalType": "date"}]
            },
        ]
    }
},
{
    "name": "range_date_2",
    "type": "google.sqlType.RANGE_DATE"
}
```

Nullable columns use unions with the Avro `NULL` type.

### Arrow type mapping

| GoogleSQL type | Arrow logical type | Notes |
|---|---|---|
| `BOOLEAN` | Boolean | |
| `INT64` | Int64 | |
| `FLOAT64` | Double | |
| `BYTES` | Binary | |
| `STRING` | Utf8 | |
| `DATE` | Date | 32-bit days since epoch |
| `DATETIME` | Timestamp | Microsecond precision, no timezone |
| `TIMESTAMP` | Timestamp | Microsecond precision, UTC timezone |
| `TIME` | Time | Microsecond precision |
| `NUMERIC` | Decimal | Precision = 38, scale = 9 |
| `NUMERIC(P[, S])` | Decimal | Precision = P, scale = S |
| `BIGNUMERIC` | Decimal256 | Precision = 76, scale = 38 |
| `BIGNUMERIC(P[, S])` | Decimal256 | Precision = P, scale = S |
| `GEOGRAPHY` | Utf8 | |
| `ARRAY` | List | |
| `STRUCT` | Struct | |
| `JSON` | Utf8 | |
| `RANGE<T>` | Struct | Fields `start` and `end` of the Arrow type of `T`; null means unbounded; `RANGE<DATE>` is a struct with two Arrow `Date` fields |

### Audit log fields (`google.cloud.bigquery.storage.v1.BigQueryRead.ReadRows`)

| Field name | Data type | Notes |
|---|---|---|
| `serialized_response_bytes` | INT64 | Bytes sent to the client after serialization (data egress) |
| `scanned_bytes` | INT64 | Bytes scanned from BigQuery storage; used for the analysis cost of the read |

### Troubleshooting

| Error | Cause / resolution |
|---|---|
| `Stream removed` | Likely transient; retry; if it persists contact Cloud Customer Care |
| `Stream expired` | Session reached the 6-hour timeout; increase job parallelism, use a larger machine type if worker CPU is steady and doesn't exceed 85%, or split the job into smaller jobs or queries |

## Notes

- Preview: streaming query results in Arrow format is a Preview feature subject to the "Pre-GA Offerings Terms"; support and feedback go to bq-arrow-support-in-query-results-preview@google.com.
- Arrow versions for older API versions: v1beta1 uses Arrow 0.14 and earlier; v1 uses Arrow 0.15 and later. Use the BigQuery Storage API client libraries regardless of version.
- Limitations: logical and materialized views can't be read directly (run a query over the view and read the resulting table; the Spark-BigQuery connector supports this); external tables can't be read (use Apache Iceberg tables managed by the Lakehouse runtime catalog). Tables with CDC that perform runtime merges can't be read either (see change-data-capture.md).
- Pricing: https://cloud.google.com/bigquery/pricing#data-extraction-pricing-details. Reads from Managed Service for Apache Spark serverless and BigQuery stored procedures for Apache Spark incur no additional Storage Read API charges (cross-region network egress still applies); cluster-based Spark (including GKE) pays standard rates.
- Quotas: https://docs.cloud.google.com/bigquery/quotas#storage-limits. Monitor `ReadRows` latency in Cloud Monitoring Metrics Explorer with `Consumed API - Request latencies` filtered by method.
- The Storage Read API is the read counterpart of the Storage Write API.
- The RANGE Avro schema block is the source's own text: two entries of an Avro `fields` list, not a standalone JSON document (it also keeps the source's trailing comma after the `end` field object), so it is shown as `text`.
- Corrected from the official docs: the source writes the role as `bigquery.readSessionUser`; the IAM role ID is `roles/bigquery.readSessionUser`.
- The permission table is as the source writes it ("on the table or higher" for `bigquery.readsessions.getData` / `.update`). The IAM role reference says `roles/bigquery.readSessionUser`, which holds all three `bigquery.readsessions.*` permissions, "can only be granted on Resource Manager resources (projects, folders, and organizations)", so grant it on the project that creates the read session. This page does not list the permission to read the table's data itself (for example `bigquery.tables.getData` in `roles/bigquery.dataViewer`); it is not confirmed here whether the Storage Read API also requires it.
- Source: https://docs.cloud.google.com/bigquery/docs/reference/storage (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [change-data-capture.md](./change-data-capture.md)
- [write-api-grpc.md](./write-api-grpc.md)
