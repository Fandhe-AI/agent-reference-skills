---
source: https://docs.cloud.google.com/spanner/docs/introspection
---

# Introspection tools and Query insights

Spanner provides built-in statistics tables (introspection tools) under `SPANNER_SYS` that you can query for insight into queries, transactions and reads. The Query insights dashboard (merged here from "Detect and diagnose query performance with Query insights") detects and diagnoses query and DML (`INSERT`, `UPDATE`, `DELETE`) performance problems: confirm whether inefficient queries cause high CPU, identify a problematic query or request tag, then analyze it. Query insights is available in single-region and multi-region configurations at no additional cost.

## Signature / Usage

### List the basic statistics for each query in the previous minute

```sql
SELECT text,
       request_tag,
       interval_end,
       execution_count,
       avg_latency_seconds,
       avg_rows,
       avg_bytes,
       avg_rows_scanned,
       avg_cpu_seconds
FROM spanner_sys.query_stats_top_minute
ORDER BY interval_end DESC;
```

## Options / Props

### Where `SPANNER_SYS` can be queried

| Interface |
|---|
| A database's Spanner Studio page in the Google Cloud console |
| The `gcloud spanner databases execute-sql` command |
| The `executeSql` or `executeStreamingSql` method |

Other single read methods can't query `SPANNER_SYS` tables.

### Statistics tools

| Tool | Purpose |
|---|---|
| Active partitioned DML statistics | Real-time progress of active partitioned DMLs |
| Column operations statistics | Monitor column statistics and usage trends |
| Lock statistics | Investigate lock conflicts; with transaction statistics find transactions contending for the same cells; Lock insights dashboard shows lock wait time |
| Oldest active queries statistics | Examine running, long-running queries: what they are, when they started, which session; change stream queries are not included |
| Query statistics | Aggregated statistics for queries (including DML and change stream queries) over 1, 10 and 60 minute intervals, for successful, failed, timed-out and canceled statements; Query insights dashboards |
| Read statistics | Most common and resource-consuming reads via the Reads API, in minute, 10-minute and hour intervals |
| Split statistics | Debug hotspots; warm or hot splits with the highest split CPU usage scores over the last 6 hours in 1-minute intervals |
| Table operations statistics | Monitor table and index usage and traffic changes; correlate storage with write traffic |
| Table sizes statistics | Historical sizes of tables, indexes and change stream tables; not for real-time monitoring |
| Transaction statistics | Slow transactions, shape changes; 1, 10 and 60 minute intervals; Transaction insights dashboard |
| Vector index statistics | Review vector index performance and tune the index |

### API methods included per tool

| API methods | Transaction mode | Query stats | Oldest active queries | Read stats | Transaction stats | Lock stats |
|---|---|---|---|---|---|---|
| Read, StreamingRead | Read-only | No | No | Yes | No | No |
| Read, StreamingRead | Read-write | No | No | Yes | Yes | Yes |
| ExecuteSql, ExecuteStreamingSql | Read-only | Yes (2) | Yes (2) | No | No | No |
| ExecuteSql, ExecuteStreamingSql | Read-write | Yes | Yes | No | Yes | Yes |
| ExecuteBatchDml | Read-write | Yes (3) | Yes (4) | No | Yes | Yes |
| Commit | Read-write (DML, mutations) | No | No | No | Yes | Yes |

Footnotes: read-only transactions are not in transaction or lock statistics. (2) Queries run with PartitionQuery aren't in oldest active queries. (3) A DML batch appears as a single entry in query statistics. (4) Statements within the batch appear in oldest active queries, not the whole batch. Uncommitted DML operations and empty (no-op) mutations are not in transaction statistics.

### Query insights: required access

| User type | Requirement |
|---|---|
| IAM user | On the instance: `roles/spanner.viewer` and `roles/spanner.databaseReader`. Permissions needed from Database Reader: `spanner.databases.beginReadOnlyTransaction`, `spanner.databases.select`, `spanner.sessions.create` |
| Fine-grained access control user | `roles/spanner.viewer`; fine-grained privileges with the `spanner_sys_reader` system role or one of its member roles; select `spanner_sys_reader` or a member role as the current system role on the database overview page |

If you already have an IAM database-level permission such as `spanner.databases.select`, the console assumes you are an IAM user and you can't select a system role.

### Query insights: limits and data

| Item | Value |
|---|---|
| Data retention | Maximum 30 days (`SPANNER_SYS.QUERY_STATS_TOP_*` tables) |
| TopN queries shown | Limited to 100 |
| Query text shown | Truncated to approximately 64KB |
| Graph timeline zoom out | Up to one week |
| Statistics granularities | 1 min, 10 min, 1 hour; each point is the average over one minute |
| Cloud Monitoring data retention (all-queries graph) | 45 days |

### Query insights: TopN table columns

| Column | Meaning |
|---|---|
| Fingerprint | Hash of the request tag, or of the query text if no tag |
| Query or Request tag | Tag if present (queries with the same tag grouped in one row), otherwise the SQL text; batch DML flattened with semicolons and consecutive identical texts deduplicated before truncation |
| Query type | `PARTITIONED_QUERY` (has a `partitionToken` from PartitionQuery API) or `QUERY` (all others, including DML) |
| CPU Utilization / CPU (%) | CPU used by the query as a percentage of all queries' CPU in the interval |
| Recommendation | Index advisor recommendation for new or altered indexes |
| Execution count | Average executions per minute |
| Avg latency (ms) | Average time per execution, excluding result set encoding and transmission and overhead |
| Avg rows scanned | Average rows scanned, excluding deleted values |
| Avg rows returned | Average rows returned |
| Bytes returned | Data bytes returned, excluding transmission encoding overhead |

The Query Details page adds query text, execution count, avg CPU (ms), avg latency (ms), avg rows and bytes, a query plan samples graph and visualizer (tree view or sequential view with Name, Machine group, Latency, Cumulative latency, CPU Time, Rows returned) and latency, CPU, execution count/failed, rows scanned and rows returned graphs. Query plans are not supported for PartitionQuery tokens and Partitioned DML queries.

## Notes

- Source: https://docs.cloud.google.com/spanner/docs/introspection (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/using-query-insights (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Source: https://docs.cloud.google.com/spanner/docs/introspection/query-statistics (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)
- Snippet taken from https://docs.cloud.google.com/spanner/docs/introspection/query-statistics. That page has more queries and the full table schemas.
- Source inconsistency: in `using-query-insights` the TopN table says "Avg latency (ms): Average length of time, in microseconds", while the Query Details page says "Avg. Latency (ms): ... in milliseconds". The unit is kept as written in each place.
- Use query parameters or tag your queries (request tags) to keep the dashboard responsive; otherwise too many results can return and the TopN table might not load. Time-series graphs show average rates per minute.
- The two CPU graphs can differ: the all-queries graph uses Cloud Monitoring data (pushed every minute), while the per-query/tag graph uses `SPANNER_SYS` system tables possibly averaged over 10 minutes or 1 hour (for example an event older than 6 hours is read from `SPANNER_SYS.QUERY_STATS_TOTAL_10MINUTE`).
- To find who ran a query, search Cloud Audit Logs for a `query_fingerprint` matching the Fingerprint value.

## Related

- [fgac-about.md](./fgac-about.md)
- Index advisor: https://docs.cloud.google.com/spanner/docs/index-advisor
- Request tags: https://docs.cloud.google.com/spanner/docs/introspection/troubleshooting-with-tags
