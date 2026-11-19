---
source: https://docs.cloud.google.com/bigquery/docs/federated-queries-intro
---

# Introduction to federated queries

Federated queries send a query statement to an external database (such as AlloyDB, Spanner, Cloud SQL, Oracle, MySQL, or PostgreSQL) and return the result as a temporary table. They use the BigQuery Connection API to connect, and the `EXTERNAL_QUERY` function sends the statement in the external database's SQL dialect; results are converted to GoogleSQL data types. A federated query can be slower than a query on data in BigQuery storage.

## Signature / Usage

### Workflow

1. Identify the Google Cloud project that includes the data source.
2. A `bigquery.admin` user creates a connection resource in BigQuery.
3. The admin grants permission to use the connection resource to user B (not needed if they are the same person).
4. User B writes a query with the `EXTERNAL_QUERY` SQL function.

### SQL pushdowns

Pushdowns delegate filtering and column pruning to the external database. For this query against Cloud SQL:

```sql
SELECT COUNT(*)
FROM (
  SELECT * FROM EXTERNAL_QUERY("CONNECTION_ID", "select * from operations_table")
  )
WHERE a = 'Y' AND b NOT IN ('COMPLETE','CANCELLED');
```

Without pushdowns the query sent to Cloud SQL returns the whole table:

```sql
SELECT *
FROM operations_table
```

With pushdowns the query sent to Cloud SQL is rewritten to return only two columns and the matching rows:

```sql
SELECT `a`, `b`
FROM (
  SELECT * FROM operations_table) t
WHERE ((`a` = 'Y') AND (NOT `b` IN ('COMPLETE', 'CANCELLED')))
```

Applied pushdowns appear in the query plan. Replace `CONNECTION_ID` with the ID of the BigQuery connection.

### GoogleSQL semantics for Spanner PostgreSQL dialect

A numeric column with value `1.1234567891` returns 0 rows here, because the comparison runs in the external database:

```sql
SELECT * FROM EXTERNAL_QUERY("CONNECTION_ID", "SELECT * from
operations_table where numeric_col = 1.123456789")
```

but returns 1 row under GoogleSQL semantics:

```sql
SELECT * from operations_table where numeric_col = 1.123456789
```

### Collations

An external column's collation (for example, case-insensitivity) applies to filters inside the external query. A filter in the outer BigQuery query uses BigQuery's default case-sensitive collation (Cloud SQL, SAP Datasphere, AlloyDB, Oracle, MySQL, PostgreSQL sources). To make the outer filter case-insensitive:

```sql
SELECT * FROM
  (
    SELECT * FROM EXTERNAL_QUERY("CONNECTION_ID", "select * from operations_table")
  )
WHERE COLLATE(flag, 'und:ci') = 'Y'
```

## Options / Props

### Supported datastores

| Datastore | Launch stage |
|-----------|--------------|
| Spanner | (not stated) |
| Cloud SQL | (not stated) |
| AlloyDB | (not stated) |
| Oracle | Preview |
| MySQL | Preview |
| PostgreSQL | Preview |
| SAP Datasphere | Preview |

### Supported regions

| Source | Rule |
|--------|------|
| AlloyDB and Cloud SQL | Only regions that support both the external source and BigQuery. A BigQuery single region can only query a resource in the same region (dataset in `us-east4` can query instances in `us-east4`; query processing location is that region). |
| AlloyDB and Cloud SQL, multi-region | A BigQuery multi-region can query any source region in the same geographic area (`US`, `EU`). A query in the `US` multi-region can query any single region in the US (such as `us-central1`, `us-east4`, `us-west2`); querying sources in `southamerica-east1` from the `US` multi-region is not supported. A query in the `EU` multi-region can query any single region in EU member states (such as `europe-north1`, `europe-west3`). Query processing location is `US` or `EU`. |
| Connection location | Must be the same as the location where the query runs (for example, the US multi-region needs a connection in the US multi-region). Queries that originate in multi-regions can no longer reference connections in single regions; recreate the connection in the same multi-region. |
| Cloud SQL multi-region | Multi-regional locations aren't available for Cloud SQL instances (only used for backups). |
| Spanner | Both regional and multi-regional configurations are supported; a BigQuery single region or multi-region can query a Spanner instance in any supported Spanner region. |
| Oracle, MySQL, PostgreSQL | All BigQuery regions where you can create connection resources; the query location must match the connection region. With Private Service Connect network attachments, the attachment and the BigQuery connection must be in the same region. |

### Quotas and limits

| Limit | Value |
|-------|-------|
| Cross-region federated querying | Up to 1 TB per project per day when the BigQuery query processing location and the external source location differ (for example, Cloud SQL in `us-west1` with a connection in the `US` multi-region). |
| Quota | No extra quota setting for federated querying; control quota in the external data source. Query a read replica for workload isolation. |
| Maximum bytes billed | Not supported for federated queries (bytes billed cannot be calculated before execution). |
| Connections | A federated query can have at most 10 unique connections. |
| Cloud SQL | Cloud SQL for MySQL / PostgreSQL quotas and limitations apply. |

### Limitations

| Limitation |
|------------|
| Performance is likely lower than querying BigQuery storage, and varies with the proximity of the dataset and the source. |
| Federated queries are read-only: DML and DDL are not supported in the external query. |
| A data type unsupported in BigQuery makes the query fail immediately; cast it to a supported type. |
| CMEK is configured separately for BigQuery and the source. If the source uses CMEK but BigQuery does not, the temporary result table is encrypted with a Google-owned and Google-managed key. |

### SQL pushdown limitations

| Scope | Limitation |
|-------|------------|
| `EXTERNAL_QUERY` | Applied only to queries of the form `SELECT * FROM T`; only column pruning and filter pushdowns (compute, join, limit, order by, aggregation are not supported); filter literals must be `BOOL`, `INT64`, `FLOAT64`, `STRING`, `DATE`, `DATETIME`, `TIMESTAMP` (struct literals not supported); function pushdown only for functions supported by both BigQuery and the destination; pushdowns only for AlloyDB, Cloud SQL and Spanner (other databases get the query unmodified). |
| Spanner external datasets | Column pruning, filter, compute and partial aggregation pushdowns supported (join, limit, order by not supported); filter literals `BOOL`, `INT64`, `FLOAT64`, `STRING`, `DATE`, `DATETIME`, `TIMESTAMP`, `BYTE` or arrays (struct literals not supported); function pushdown only for functions supported by both BigQuery and Spanner. |

### Supported functions by data source

| Source | Operators |
|--------|-----------|
| Cloud SQL MySQL | Logical `AND`, `OR`, `NOT`; comparison `=`, `>`, `>=`, `<`, `<=`, `<>`, `IN`, `BETWEEN`, `IS NULL`; arithmetic `+`, `-`, `*` (only `INT64` and `FLOAT64`). |
| Cloud SQL PostgreSQL and AlloyDB | Same logical and comparison operators; arithmetic `+`, `-`, `*`, `/` (only `INT64`, `FLOAT64`, and `DATE`, except `DATE` subtraction). |
| Spanner PostgreSQL dialect | Same logical and comparison operators; arithmetic `+`, `-`, `*`, `/` (only `INT64`, `FLOAT64`, `NUMERIC`). With external datasets additionally compute and partial aggregate pushdown and string, math, cast and array functions. |
| Spanner GoogleSQL dialect | Same logical and comparison operators; arithmetic `+`, `-`, `*`, `/` (only `INT64`, `FLOAT64`, `NUMERIC`); safe arithmetic `SAFE_ADD`, `SAFE_SUBTRACT`, `SAFE_MULTIPLY`, `SAFE_DIVIDE` (only `INT64`, `FLOAT64`, `NUMERIC`). With external datasets additionally compute and partial aggregate pushdown and string, math, cast and array functions. |

## Notes

- Spanner PostgreSQL dialect: expect GoogleSQL semantics, not PostgreSQL semantics. `NULL` values sort first in ascending order by default (PostgreSQL sorts them last). PostgreSQL `NUMERIC` values from Spanner follow the Spanner-to-BigQuery type mapping. JSON key normalization differs: Spanner `JSON` sorts keys strictly lexicographically, while PostgreSQL `PG JSONB` sorts by key length first.
- Pricing: on-demand, you are charged for the bytes returned from the external query; with BigQuery editions, you are charged by slots used. Prices are not copied here.
- Data type mappings per source are in the federated query functions reference (`https://docs.cloud.google.com/bigquery/docs/reference/standard-sql/federated_query_functions`).
- Alternatives: external tables and datasets (Bigtable, Spanner, Cloud Storage, Google Drive, Salesforce Data Cloud) let you query with BigQuery syntax without `EXTERNAL_QUERY` and without bringing data back into BigQuery.
- The source databases (AlloyDB, Cloud SQL, Spanner) are covered by `gcp-databases-relational`.
- Source: https://docs.cloud.google.com/bigquery/docs/federated-queries-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [cloud-sql-federated-queries.md](./cloud-sql-federated-queries.md)
- [connections-api-intro.md](./connections-api-intro.md)
- [external-data-sources.md](./external-data-sources.md)
- [external-tables.md](./external-tables.md)
