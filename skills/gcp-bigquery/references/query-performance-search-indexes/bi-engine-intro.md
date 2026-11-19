---
source: https://docs.cloud.google.com/bigquery/docs/bi-engine-intro
---

# Introduction to BI Engine

BigQuery BI Engine is a fast, in-memory analysis service that accelerates many SQL queries by caching frequently used data. It integrates with the BigQuery API (REST, JDBC, ODBC) and BI tools such as Looker, Data Studio, Tableau and Power BI. Capacity is reserved per project and region with a supported edition; you pay for the reservation.

## Signature / Usage

### Window function sharing example

Two window functions with identical `OVER` clauses and the same direct inputs share one window function operator:

- `SELECT ROW_NUMBER() OVER (ORDER BY x), SUM(x) OVER (ORDER BY x) FROM my_table` has only one window function operator.
- `SELECT ROW_NUMBER() OVER (ORDER BY x), SUM(x) OVER (PARTITION BY y ORDER BY x) FROM my_table` has two window function operators because the two functions have different `OVER` clauses.
- `SELECT ROW_NUMBER() OVER (ORDER BY x) FROM (SELECT SUM(x) OVER (ORDER BY x) AS x FROM my_table)` has two window function operators because the two functions have different direct inputs although their `OVER` clauses appear the same.

### Monitor BI Engine capacity

```sql
SELECT *
FROM `my-project-id.region-us`.INFORMATION_SCHEMA.BI_CAPACITIES
```

## Options / Props

### Preferred tables

Preferred tables limit BI Engine acceleration to a specified set of tables; queries on other tables use regular BigQuery slots. If memory is insufficient, BI Engine offloads partitions and columns that haven't been accessed recently.

| Limitation |
|------------|
| Logical views can't be added; only tables are supported |
| Queries on materialized views are accelerated only if both the materialized view and its base tables are preferred tables |
| Specifying partitions or columns for acceleration isn't supported |
| `JSON` type columns aren't supported and aren't accelerated |
| A multi-table query (for example a `JOIN`) is accelerated only if all its tables are preferred tables |
| Public datasets aren't supported in the Google Cloud console; use the API or DDL to add a public table |

### Join limits

Acceleration applies to leaf-level subqueries with `INNER` and `LEFT OUTER` joins where a large fact table joins up to four smaller dimension tables.

| Dimension table restriction | Limit |
|-----------------------------|-------|
| Rows | Fewer than 5 million |
| Unpartitioned table size | 5 GiB or less |
| Partitioned table, referenced partitions | 1 GiB or less |

### Window function conditions

A query with window functions runs in BI Engine only if all hold:

| Condition |
|-----------|
| The query scans exactly one table, which isn't partitioned and has fewer than 5 million rows |
| The query has no `JOIN` operators |
| Scanned table size multiplied by the number of window function operators doesn't exceed 300 MiB |

`INFORMATION_SCHEMA.JOBS` reports `bi_engine_statistics.acceleration_mode` as `FULL_INPUT` (input stages accelerated) or `FULL_QUERY`.

Supported window functions: `ANY_VALUE`, `AVG`, `BIT_AND`, `BIT_OR`, `BIT_XOR`, `CORR`, `COUNT`, `COUNTIF`, `COVAR_POP`, `COVAR_SAMP`, `CUME_DIST`, `DENSE_RANK`, `FIRST_VALUE`, `LAG`, `LAST_VALUE`, `LEAD`, `LOGICAL_AND`, `LOGICAL_OR`, `MAX`, `MIN`, `NTH_VALUE`, `NTILE`, `PERCENT_RANK`, `PERCENTILE_CONT`, `PERCENTILE_DISC`, `RANK`, `ROW_NUMBER`, `ST_CLUSTERDBSCAN`, `STDDEV_POP`, `STDDEV_SAMP`, `STDDEV`, `STRING_AGG`, `SUM`, `VAR_POP`, `VAR_SAMP`, `VARIANCE`.

Unsupported window functions can produce `Analytic function is incompatible with other operators or its inputs are too large`.

### Features without BI Engine acceleration

| Feature | Note |
|---------|------|
| JavaScript UDFs and remote functions | |
| External tables, including BigLake tables | |
| `JSON` data | Error: `JSON native type is not supported.` |
| `RANGE` data | Error: `RANGE native type is not supported.` |
| Writing results to a permanent BigQuery table | |
| Tables with upserts from BigQuery change data capture ingestion | |
| Transactions | |
| Queries returning more than 1 GiB | For latency-sensitive applications a response under 1 MiB is recommended |
| Row-level security | |
| `SEARCH` / `VECTOR_SEARCH` functions or queries optimized by search indexes or vector indexes | |
| Recursive queries using `RECURSIVE` | |
| BigQuery ML queries | |
| Wildcard tables | Not supported, no acceleration |
| Non-SQL user-defined functions | Listed as unsupported in the use-case section |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/bi-engine-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Requires BI Engine capacity reserved with a supported edition (see Understand BigQuery editions). Capacity is managed per project and region; BI Engine caches only the queried parts of columns and partitions.
- BI Engine works with authorized views, column-level security and data masking.
- Unsupported stages fall back to standard BigQuery slots without failing the query. BI Engine is most optimized for leaf-level subqueries (scan, filter, compute, aggregate, `ORDER BY`, supported joins).
- Best for pre-joined or pre-aggregated data and queries with few joins; stale materialized views are recommended for query performance.
- Monitor with Cloud Monitoring or `INFORMATION_SCHEMA.BI_CAPACITIES` / `INFORMATION_SCHEMA.BI_CAPACITY_CHANGES`; disable "Use cached results" for an accurate comparison.
- Workaround for unsupported features: save query results to a table, refresh it with a scheduled query (hourly or daily works best; every minute might invalidate the cache too frequently), and query that table.
- To guarantee acceleration for a set of queries, use a separate project with a dedicated BI Engine reservation.
- Quotas and limits: see https://docs.cloud.google.com/bigquery/quotas#biengine-limits. Pricing: see https://docs.cloud.google.com/bigquery/pricing#bi_engine_pricing.
- Snippet taken from https://docs.cloud.google.com/bigquery/docs/information-schema-bi-capacities (the window-function examples in the source are inline code, not code blocks; `my_table` is a placeholder).

## Related

- [best-practices-performance-compute.md](./best-practices-performance-compute.md)
- [search-intro.md](./search-intro.md)
