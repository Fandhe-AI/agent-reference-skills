---
source: https://docs.cloud.google.com/bigquery/docs/materialized-views-intro
---

# Introduction to materialized views

Materialized views are precomputed tables that improve performance and reduce cost for frequently run, predictable queries. BigQuery refreshes them in the background and automatically merges precomputed data with recent base-table changes, so results stay fresh.

## Signature / Usage

Workflow: (1) design and verify an aggregation query with GoogleSQL, (2) run `CREATE MATERIALIZED VIEW` (console, bq, or API), (3) let smart tuning reroute base-table queries to the view.

```sql
CREATE MATERIALIZED VIEW project-id.my_dataset.my_mv_table AS
SELECT date, AVG(net_paid) AS avg_paid
FROM project-id.my_dataset.my_base_table
GROUP BY date
```

## Options / Props

### Key characteristics

| Characteristic | Detail |
|---|---|
| Zero maintenance | Precomputed in the background when base tables change; incremental changes are added automatically. |
| Fresh data | If base-table changes might invalidate the view, BigQuery reads directly from the base tables; otherwise it reads the view plus only the base-table changes. |
| Smart tuning | If any part of a query on a base table can be resolved from the view, BigQuery reroutes the query to the view. Only incremental materialized views support smart tuning. |

### Incremental vs non-incremental

By default only *incremental* queries are allowed. To create a non-incremental view, specify `allow_non_incremental_definition = true` in the definition.

| Category | Incremental | Non-incremental |
|---|---|---|
| Query supported | Limited | Most queries |
| Maintenance cost | Can reduce the cost of frequently used queries | Every refresh runs the full query |
| Smart tuning support | Supported for most view queries | No |
| Always fresh results | Supported, even when base tables changed since last refresh | No |

### Limitations: SQL and syntax

| Limitation | Detail |
|---|---|
| Dialect | Only GoogleSQL. |
| SQL syntax | Restricted syntax and limited set of aggregation functions. |
| System variables | Not supported (for example `@@session_id`). |
| Parameterized types | Can't inherit or define parameterized types such as `STRING(n)`. |
| Column descriptions | Can set a description for the view, not for individual columns. |
| Query modification | Can't update the query after creation. |
| Data modification | Can't directly update or manipulate data with `COPY`, `EXPORT`, `LOAD`, `WRITE`, or DML. |
| CPU-intensive operators | Operators such as `UNPIVOT` or heavy `UNNEST` can cause refresh failures under on-demand billing; switch to capacity-based pricing, materialize the transformed data in the base table first, or use scheduled queries. |

### Limitations: base tables and scope

| Limitation | Detail |
|---|---|
| Nesting | Can't nest a materialized view over another materialized view. |
| Source types | Can't query external tables (except BigLake tables), wildcard tables, logical views (logical view reference support is in Preview), or snapshots. |
| Deletion | Deleting a base table first makes queries and refreshes of the view fail; recreate the view if you recreate the table. |
| Spanner external datasets | Only non-incremental materialized views can have Spanner external dataset base tables. If the last refresh is outside the `max_staleness` interval, the query reads the base tables. BigQuery doesn't cache results for queries on non-incremental views that reference Spanner external dataset tables. |
| Organization boundary | The view must reside in the same project or organization block as its base tables. |
| `max_staleness` | Must be between 30 minutes and 3 days, inclusive. |

### Limitations: tables with active change data capture (CDC)

| Limitation | Detail |
|---|---|
| Combined references | You can't reference the CDC base table in a query that also references the view. |
| `max_staleness` | Views can't perform runtime merge jobs; set the view `max_staleness` to at least twice the base table's. Queries fail if the CDC table's current version is staler than the view's `max_staleness`. |
| Smart tuning | Not available. |

### Limitations: BigLake tables (metadata cache-enabled)

| Limitation | Detail |
|---|---|
| Partitioning | You can't partition the view; any deletion in a base table causes a full refresh. |
| `--max_staleness` | Must be greater than that of the BigLake base table. |
| Joins | No join between BigQuery managed tables and BigLake tables in one definition. |
| BI Engine | Doesn't accelerate materialized views over BigLake tables. |

### Pricing components

| Component | On-demand pricing | Capacity-based pricing |
|---|---|---|
| Querying | Bytes processed by the view and any necessary portions of base tables | Slots consumed during query time |
| Maintenance | Bytes processed during refresh time | Slots consumed during refresh time |
| Storage | Bytes stored in the view | Bytes stored in the view |

## Notes

- Materialized views aren't available with reservations created with certain BigQuery editions; see "Introduction to BigQuery editions".
- Automatic refresh cost is billed to the project where the view resides; manual refresh cost to the project that runs the refresh job.
- Storage: for `AVG`, `ARRAY_AGG`, and `APPROX_COUNT_DISTINCT`, an intermediate sketch is stored as `BYTES` (and counted as `BYTES` for size), although the column appears as `NUMERIC` or `FLOAT64`.
- Authorized materialized views are authorized in the same way as authorized views. Materialized view replicas (for Amazon S3 BigLake data) can only be created over authorized materialized views.
- Cross-region replication: create views only on the primary region; the secondary replica returns "The dataset replica of the cross region dataset {PROJECT}:{DATASET} in region {REGION} is read-only because it's not the primary replica."
- Works transparently with query plan explanation, query caching, maximum bytes billed, and dry run (a dry run shows whether a query uses a materialized view).
- Materialized views over BigLake tables with a metadata cache hold all external-table updates up to the most recent metadata cache creation. Amazon S3 BigLake views are not available for joins with BigQuery data.
- The source contains one code example (the `CREATE MATERIALIZED VIEW` statement above). Prices are not copied; see the BigQuery pricing page.
- Source: https://docs.cloud.google.com/bigquery/docs/materialized-views-intro (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)

## Related

- [views-intro.md](./views-intro.md)
- [tables-intro.md](./tables-intro.md)
