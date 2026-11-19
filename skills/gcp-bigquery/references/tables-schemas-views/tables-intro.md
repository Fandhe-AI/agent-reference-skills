---
source: https://docs.cloud.google.com/bigquery/docs/tables-intro
---

# Introduction to tables

BigQuery tables store data as rows of columns (fields), and every table is defined by a schema of column names, data types, and other information. This page covers the table types (standard tables, table clones, table snapshots, external tables, views), table limitations, quotas, pricing, and security.

## Signature / Usage

### Fully qualified table names

Use `projectname.datasetname.tablename` in GoogleSQL and `projectname:datasetname.tablename` in the bq command-line tool. You can specify the schema when the table is created, or create a table without a schema and declare the schema in the query job or load job that first populates it.

```sql
CREATE TABLE IF NOT EXISTS mydataset.newtable (x INT64, y STRING, z BOOL)
  OPTIONS(
    description = 'My example table');
```

```bash
bq mk --table mydataset.mytable qtr:STRING,sales:FLOAT,year:STRING
```

## Options / Props

### Table types

| Type | Description |
|---|---|
| Table | Has a schema and every column has a data type. Stored in BigQuery storage in a columnar format. |
| Table clone | Lightweight, writable copy of a table. BigQuery stores only the delta between the clone and its base table. |
| Table snapshot | Point-in-time, read-only copy of a table; a table can be restored from a snapshot. BigQuery stores only bytes that differ from the base table, so a snapshot typically uses less storage than a full copy. |
| BigLake table (external) | References structured data in Cloud Storage, Amazon S3, or Azure Blob Storage; lets you enforce fine-grained security at the table level. |
| Object table (external) | References unstructured data in datastores such as Cloud Storage. |
| Non-BigLake external table | References structured data in Cloud Storage, Google Drive, or Bigtable; does not let you enforce fine-grained security at the table level. |
| View | Logical table defined by a SQL query that runs each time the view is queried. |
| Materialized view | Precomputed view that periodically caches the results of the view query in BigQuery storage. |

### Table limitations

| Limitation | Detail |
|---|---|
| Names | Table names must be unique per dataset. |
| Export | When you export BigQuery table data, the only supported destination is Cloud Storage (as the source writes it; this holds for extract jobs; reverse ETL workflows can move data to Bigtable, Spanner, Pub/Sub and AlloyDB, see Notes). |
| Enumeration | With an API call, enumeration performance slows as you approach 50,000 tables in a dataset. |
| Console | The Google Cloud console can display up to 50,000 tables for each dataset. |

## Notes

- Quotas and limits apply to load jobs, extract (export) jobs, query jobs, and copy jobs (see the BigQuery quotas page). Table-specific quota errors: "Table imports or query appends quota errors" and "Too many DML statements outstanding against table".
- Standard tables can also store references to unstructured data in struct columns that adhere to the `ObjectRef` format.
- Pricing: charges are based on data stored in tables and partitions and on the queries you run. Many table operations are free, including loading, copying, and exporting data, but they are subject to quotas and limits. Prices are not copied here; see https://cloud.google.com/bigquery/pricing.
- Table access is controlled with IAM ("Control access to resources with IAM").
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/schemas (the `CREATE TABLE` and `bq mk` examples above).
- The limitation "the only supported destination is Cloud Storage" is read as applying to extract jobs (the page's quota list links "Export data from tables" to extract jobs). The export overview (https://docs.cloud.google.com/bigquery/docs/export-intro) also documents reverse ETL (RETL) workflows that move data from BigQuery to Bigtable, Spanner, Pub/Sub and AlloyDB; see `../export-continuous-queries/export-intro.md`.
- Source: https://docs.cloud.google.com/bigquery/docs/tables-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [schemas.md](./schemas.md)
- [nested-repeated.md](./nested-repeated.md)
- [views-intro.md](./views-intro.md)
- [materialized-views-intro.md](./materialized-views-intro.md)
