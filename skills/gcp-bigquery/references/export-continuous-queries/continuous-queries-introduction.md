---
source: https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction
---

# Introduction to continuous queries

BigQuery continuous queries are SQL statements that run continuously to analyze incoming data in real time, for example to generate immediate insights, apply real-time ML inference, or replicate data to other platforms. They let you use BigQuery as an event-driven data processing engine. Running them requires an Enterprise or Enterprise Plus edition reservation with a `CONTINUOUS` assignment; the on-demand compute billing model isn't supported.

## Signature / Usage

### Continuous query writing to Pub/Sub

A continuous query reads with `APPENDS` (or `CHANGES` when exporting to Pub/Sub) and exports through `EXPORT DATA`. This example is the multi-column Pub/Sub export from the Pub/Sub export page.

```sql
EXPORT DATA
  OPTIONS (
    format = 'CLOUD_PUBSUB',
    uri = 'https://pubsub.googleapis.com/projects/myproject/topics/taxi-real-time-rides')
AS (
  SELECT
    TO_JSON_STRING(
      STRUCT(
        ride_id,
        timestamp,
        latitude,
        longitude)) AS message
  FROM
    APPENDS(TABLE `myproject.real_time_taxi_streaming.taxi_rides`,
      -- Configure the APPENDS TVF start_timestamp to specify when you want to
      -- start processing data using your continuous query.
      -- This example starts processing at 10 minutes before the current time.
      CURRENT_TIMESTAMP() - INTERVAL 10 MINUTE)
  WHERE ride_status = 'enroute'
);
```

## Options / Props

### Destinations

| Destination | Notes |
|---|---|
| BigQuery tables | Via `INSERT` |
| Apache Iceberg managed tables | Via `INSERT` |
| Pub/Sub topics | `EXPORT DATA`; must run as a service account |
| Bigtable tables | `EXPORT DATA` |
| Spanner tables | `EXPORT DATA` |

### Data written to source tables that continuous queries can process

Standard BigQuery tables or Apache Iceberg managed tables written by: Storage Write API (gRPC), Storage Write API (REST), batch load, `INSERT` DML, mutating DML (`DELETE`, `UPDATE`, `MERGE`) when exporting to Pub/Sub, batch query results to a permanent table, continuous query results to a permanent table, a Pub/Sub BigQuery subscription, Dataflow to BigQuery, and Datastream to BigQuery in append-only write mode.

### Supported functionality

| Capability | Condition |
|---|---|
| `INSERT` statements | Write to a BigQuery table or Iceberg managed table |
| `EXPORT DATA` | To Pub/Sub (service account required), Bigtable, Spanner |
| `AI.GENERATE`, `AI.GENERATE_TEXT` | `AI.GENERATE_TEXT` needs a BigQuery ML remote model over a Gemini Enterprise Agent Platform model |
| `ML.UNDERSTAND_TEXT`, `ML.TRANSLATE` | Need a BigQuery ML remote model over a Cloud AI API |
| `ML.NORMALIZER` | Normalizing numerical data |
| JSON functions and JSON unnesting | Supported |
| Stateless GoogleSQL functions | Each row processed independently |
| Persistent or temporary SQL UDFs | Underlying SQL expression must be valid in a continuous query |
| Stateful operations | Preview: JOINs, aggregations and windowing, `UNION ALL` |
| `APPENDS` | Standard tables and Iceberg managed tables |
| `CHANGES` | Only when exporting to Pub/Sub; not with stateful operations or Iceberg managed tables |
| Views | Underlying SQL query must be a valid continuous query |

### Not supported

| Category | Items |
|---|---|
| Query operators | `PIVOT`, `UNPIVOT`, `TABLESAMPLE`; set operators except `UNION ALL`; `SELECT DISTINCT`; `EXISTS` / `NOT EXISTS` subqueries; recursive CTEs; window function calls |
| UDFs | Non-SQL UDFs (JavaScript, Python, remote functions, user-defined aggregate functions) |
| Statements | BigQuery ML functions other than those listed; DDL except `CREATE TEMP FUNCTION` for a temporary SQL UDF; DML except `INSERT`; DCL; `EXPORT DATA` not targeting Bigtable, Pub/Sub, or Spanner; procedural language; debugging statements |
| Data sources | External tables, information schema views, wildcard tables, CDC upsert data, materialized views, views using unsupported features |
| Security | Column-level and row-level security features |
| Other | Running from a data canvas; modifying the SQL of a running job |

### Limits and runtime

| Item | Value |
|---|---|
| Max runtime, user account | 2 days (access token TTL is two days) |
| Max runtime, service account | 150 days |
| Output watermark lag | Job fails if lag is more than 48 hours; restart with `APPENDS` / `CHANGES` from the stop time |
| `CONTINUOUS` reservation size | At most 500 slots per reservation (increase by contacting `bq-continuous-queries-feedback@google.com`) |
| Admission threshold | 10 slots per continuous query job (not necessarily all consumed) |
| Idle query consumption | Typically about 1 slot; the reservation doesn't scale down to zero |
| Reservation job types | Can't mix another job type with a `CONTINUOUS` assignment in the same reservation |
| Edition | Enterprise or Enterprise Plus only |
| Locations | See "BigQuery continuous query locations" on the locations page |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/continuous-queries-introduction (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/export-to-pubsub (the introduction page itself has no code block).
- Preview: stateful operations (JOINs, aggregations and windowing, `UNION ALL`) are subject to the Pre-GA Offerings Terms; feedback goes to `bq-continuous-queries-feedback@google.com`. State of ingested data is kept only for these specific stateful operations.
- Duplicates: occasional temporary issues can cause automatic reprocessing and duplicate output rows; design downstream systems to handle this.
- Updating or deleting a persistent SQL UDF while a continuous query references it terminates the job; start a new job from the point the previous one stopped.
- Output is subject to the quotas of the destination service. Bigtable, Spanner and Pub/Sub locational endpoints must be in the same Google Cloud regional boundary as the BigQuery dataset of the queried table; this doesn't apply to Pub/Sub global endpoints.
- Several jobs in one reservation may not share resources fairly (BigQuery fairness). Use slot autoscaling with a smaller baseline and a maximum covering 10 slots per query. Only idle baseline or committed slots of a `CONTINUOUS` assignment are shareable; autoscaled slots aren't. A `CONTINUOUS` assignment needs a non-zero baseline or non-zero autoscaling.
- Pricing: capacity compute pricing (slots), fluid scaling can be used; data ingestion, storage and receiving services are billed separately. Rough estimate from the source: estimated slots ≈ number of continuous queries x sum(data rate x query complexity); monitor a running job to measure.
- `AI.GENERATE_TEXT` and other AI functions call Agent Platform (Vertex AI) models from BigQuery; the Gemini Developer API and `google-genai` SDK are in `google-gemini-api`.
- Pub/Sub, Bigtable, Spanner and Datastream are separate products (see `gcp-messaging-workflows`, `gcp-databases-nosql`, `gcp-databases-relational`).
- Storage Write API: the source calls the former `tabledata.insertAll` path "Storage Write API (REST)" and the gRPC one "Storage Write API (gRPC)".

## Related

- [export-to-pubsub.md](./export-to-pubsub.md)
- [export-intro.md](./export-intro.md)
