---
source: https://docs.cloud.google.com/bigquery/docs/write-api-grpc
---

# Storage Write API (gRPC)

The BigQuery Storage Write API (gRPC) streams and batch loads records into BigQuery over bidirectional gRPC connections. The core abstraction is a stream that writes to a table; more than one stream can write concurrently to the same table. For new projects use it instead of the Storage Write API (REST): lower ingestion pricing, stream-level transactions and exactly-once delivery semantics.

## Signature / Usage

### Stream types and API flow

Default stream (at-least-once, no explicit creation, data available immediately for query):

1. `AppendRows` (loop)

Pending type (batch workloads, alternative to load jobs; commit is atomic):

1. `CreateWriteStream`
2. `AppendRows` (loop)
3. `FinalizeWriteStream`
4. `BatchCommitWriteStreams`

Committed type (rows readable immediately; `FinalizeWriteStream` optional):

1. `CreateWriteStream`
2. `AppendRows` (loop)
3. `FinalizeWriteStream` (optional)

Buffered type (advanced; row-level commits by flushing):

1. `CreateWriteStream`
2. `AppendRows` ⇒ `FlushRows` (loop)
3. `FinalizeWriteStream` (optional)

### Control staleness of streamed data

Snippet taken from https://docs.cloud.google.com/bigquery/docs/change-data-capture (table-level `max_staleness`). The page itself also describes `SET @@max_staleness_override = INTERVAL 10 MINUTE;` for a multi-statement query or session.

```sql
ALTER TABLE `DATASET_NAME.TABLE_NAME`
SET OPTIONS (
  max_staleness = INTERVAL 15 MINUTE);
```

## Options / Props

### Required permission and roles

| Item | Value |
|---|---|
| Permission | `bigquery.tables.updateData` |
| Predefined roles that include it | `bigquery.dataEditor`, `bigquery.dataOwner`, `bigquery.admin` |

### Authentication scopes (one required)

| OAuth scope |
|---|
| `https://www.googleapis.com/auth/bigquery` |
| `https://www.googleapis.com/auth/cloud-platform` |
| `https://www.googleapis.com/auth/bigquery.insertdata` |

### Stream types

| Type | Visibility of written data | Use |
|---|---|---|
| Default stream | Immediately available for query; at-least-once; created implicitly; does not support `FinalizeWriteStream` | Continuously arriving data; migration from the REST API |
| Pending | Buffered until the stream is committed; commit is atomic | Batch workloads |
| Committed | Available for reading immediately; exactly-once with stream offsets; the default stream is an at-least-once form of this type | Streaming that needs minimal read latency |
| Buffered | Buffered until rows are flushed (row-level commits) | Advanced; generally only with the Apache Beam BigQuery I/O connector. For small batches that must appear together, use committed type and send each batch in one request |

### Connections and limits

| Topic | Behavior |
|---|---|
| Default stream | Multiple connections can be opened on it; appends are asynchronous; responses arrive in request order |
| Application-created streams | Only a single active connection |
| Throughput | A single connection supports at least 1 MBps; the upper bound depends on network bandwidth, data schema and server load; at the limit, requests might be rejected or queued, so create more connections |
| Idle connection | BigQuery closes it if idle too long; response code is `HTTP 409`; create a new connection (Java, Go and Rust clients reconnect automatically) |
| Multiplexing | Default stream in Java, Go or Rust can write to multiple destination tables over shared connections |
| First `AppendRows` call | Must contain the stream name and the data schema as a `DescriptorProto` (or a serialized Arrow schema for Arrow ingestion); send batches of rows, not one row at a time |
| Region header (direct gRPC only) | For any region except the `US` multiregion, send `x-goog-request-params: write_stream=<stream_name>`; not needed with client libraries |
| Direct protobuf messages | No `package` specifier; all nested and enumeration types inside the top-level root message; no references to external messages (Java and Go clients normalize the schema, so arbitrary protobufs work) |

### Partitioned tables

| Table type | Behavior |
|---|---|
| Any partitioned table | Streamed rows are first in the `__UNPARTITIONED__` partition; there is no SLA for how long repartitioning takes. For ingestion-time and time-unit column partitioned tables, filter out `NULL` pseudocolumn values (`_PARTITIONTIME` or `_PARTITIONDATE`) to exclude unpartitioned data |
| Ingestion-time | Partition inferred from current UTC time; a decorator such as `table1$20250601` in the `tableID` parameter overrides it for daily partitioned tables only; allowed range 31 days in the past to 16 days in the future (use a load or query job outside it); not supported for hourly, monthly or yearly tables |
| Time-unit column | Automatic by the `DATE`, `DATETIME` or `TIMESTAMP` column value; accepted if between 10 years in the past and 1 year in the future |
| Integer-range | Automatic by the `INTEGER` partitioning column |

### Client libraries

| Client | Notes |
|---|---|
| Java | `StreamWriter` (protocol buffers) and `JsonStreamWriter` (JSON converted to protobuf; automatic schema updates with reconnect); writer manages cleanup, regional routing headers and reconnects |
| Go | proto2 encoding; `cloud.google.com/go/bigquery/storage/managedwriter` |
| Python | Lower-level client wrapping gRPC; data must be protocol buffers; avoid dynamic proto message generation (`proto-plus`), performance is substandard; Arrow ingestion supported |
| Node.js | `@google-cloud/bigquery-storage`; JSON input, automatic reconnect |
| Rust | `Write` client with `DefaultWriter`, `CommittedWriter`, `PendingWriter`, `BufferedWriter`; Arrow input (convert JSON with the `arrow-json` crate) |

### DML on recently streamed data

| Item | Value |
|---|---|
| Supported | `UPDATE`, `DELETE`, `MERGE` on rows written within the last 30 minutes by the Storage Write API (gRPC) |
| Not supported | Data streamed with the Storage Write API (REST); mutating DML on recently streamed data inside a multi-statement transaction |

## Notes

- Python Arrow ingestion, Java, Go, Rust and Node.js client details are summarized above; the source shows no code on this page (code is on the "Stream data using the Storage Write API (gRPC)" page).
- Throughput example in the source: 100 million endpoints x 1,500 log records per minute / 60 seconds = 2.5 GB per second; verify quota in advance. Handle `429` (resource exhausted) errors on spikes. Quotas: https://docs.cloud.google.com/bigquery/quotas#write-api-limits. Pricing: https://cloud.google.com/bigquery/pricing#data_ingestion_pricing.
- Exactly-once requires a committed-type stream with client-supplied offsets; without offsets a retried append can duplicate records. The default stream gives higher throughput and does not count against the quota on creating write streams.
- Pending-type streams can be used instead of BigQuery load jobs; Iceberg tables can also be streamed to (Apache Iceberg managed tables).
- Monitoring: `INFORMATION_SCHEMA.WRITE_API_TIMELINE` view or Google Cloud metrics. The console latency and error dashboards for `AppendRows` reflect the bidirectional connection, not request level; use Google Cloud metrics for request-level data.
- Persistent failures: retry with exponential backoff, and for business-critical rows persist them (for example publish to a Pub/Sub topic, or persist on the client). Pub/Sub itself is covered by `gcp-messaging-workflows`.
- Fluent Bit Storage Write API (gRPC) output plugin ingests JSON records with no code: at-least-once with default type, exactly-once with committed type, dynamic scaling of default streams under backpressure.
- Names: this page is the Storage Write API (gRPC); the REST method formerly called legacy `tabledata.insertAll` is the Storage Write API (REST).
- Source: https://docs.cloud.google.com/bigquery/docs/write-api-grpc (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/change-data-capture (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [write-api-intro.md](./write-api-intro.md)
- [write-api-rest.md](./write-api-rest.md)
- [change-data-capture.md](./change-data-capture.md)
