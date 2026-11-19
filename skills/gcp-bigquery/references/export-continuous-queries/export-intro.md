---
source: https://docs.cloud.google.com/bigquery/docs/export-intro
---

# Introduction to data export

BigQuery lets you export data for use in other tools, storage systems, and applications. You can save query results to a file, export tables to Cloud Storage, or set up reverse ETL (RETL) workflows to services such as Bigtable and Spanner.

## Signature / Usage

### Test export on a subset

The source recommends a test export on a data subset to assess costs, file sizes, counts, and time, and says a `WHERE` clause in `EXPORT DATA` can limit the test export. The statement below is the basic `EXPORT DATA` form.

```sql
EXPORT DATA
  OPTIONS (
    uri = 'gs://bucket/folder/*.csv',
    format = 'CSV',
    overwrite = true,
    header = true,
    field_delimiter = ';')
AS (
  SELECT field1, field2
  FROM mydataset.table1
  ORDER BY field1
);
```

## Options / Props

### Table export formats

| Data format | Supported compression types | Supported export methods |
|---|---|---|
| CSV | GZIP | Export to Cloud Storage |
| JSON | GZIP | Export to Cloud Storage; read from BigQuery using Dataflow |
| Avro | DEFLATE, SNAPPY | Export to Cloud Storage; read from BigQuery using Dataflow |
| Parquet | GZIP, SNAPPY, ZSTD | Export to Cloud Storage |

### Export destinations

| What | Where | Page |
|---|---|---|
| Query results | Local file (CSV or JSON), Google Drive, Google Sheets | [export-file.md](./export-file.md) |
| Tables | Cloud Storage (CSV, JSON, Avro, Parquet) | [exporting-data.md](./exporting-data.md) |
| Tables with nested data | Protobuf columns (separate page `protobuf-export`) | none in this category |
| Reverse ETL | Bigtable, Spanner, Pub/Sub, AlloyDB | Pub/Sub: [export-to-pubsub.md](./export-to-pubsub.md) |
| Code assets | Saved queries and notebooks can be downloaded from BigQuery Studio | none in this category |

### Large table export considerations

| Topic | Guidance from the source |
|---|---|
| Data volume and format | Calculate the volume; exports can incur substantial costs based on data size, format, method and geographic location; some resources are charged per GiB, others per TiB. CSV doesn't handle nested or repeated fields. Consider compression to reduce size and costs. |
| Export cost | Some methods are free up to a limit, others always incur costs. Costs can apply if the BigQuery table and the destination (such as a Cloud Storage bucket) are in different locations. |
| Quotas | Some export methods have daily limits (Extract jobs on the quotas page). |
| Multiple files | Large exports split into multiple files; plan downstream handling. |
| Automation | For recurring exports use BigQuery scheduled queries or Dataflow. |
| Retention policies | Determine retention periods in the destination and implement lifecycle rules. |
| Security | Implement appropriate IAM permissions and encryption. |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/export-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/exporting-data (the intro page itself has no code block).
- Pricing: see the BigQuery "Data extraction pricing" section (https://cloud.google.com/bigquery/pricing#data-extraction-pricing); prices are not copied here.
- Cloud Storage, Bigtable, Spanner, AlloyDB and Dataflow are separate products; the other product itself is in its own skill (for example `gcp-storage`, `gcp-databases-nosql`, `gcp-databases-relational`).

## Related

- [exporting-data.md](./exporting-data.md)
- [export-file.md](./export-file.md)
- [export-to-pubsub.md](./export-to-pubsub.md)
- [continuous-queries-introduction.md](./continuous-queries-introduction.md)
