---
source: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation
---

# Query plan and timeline

Query jobs embed diagnostic query plan and timing information (similar to `EXPLAIN` in other systems), retrievable from API responses such as `jobs.get` and viewable in the Google Cloud console under Execution Details. A query is converted into an execution graph of stages made of steps; stages run in parallel and exchange data through shuffle.

## Signature / Usage

### Step details

Substeps use variables (`$` plus a unique number, not shared across stages). Example of a stage's steps:

```text
  READ
  $30:l_orderkey, $31:l_quantity
  FROM lineitem

  AGGREGATE
  GROUP BY $100 := $30
  $70 := SUM($31)

  WRITE
  $100, $70
  TO __stage00_output
  BY HASH($100)
```

The stage reads `l_orderkey` and `l_quantity` from `lineitem`, aggregates them into `$100` and `$70`, and writes the results to shuffle ordered by `$100`.

### Federated query plan

Federated queries use `EXTERNAL_QUERY` and SQL pushdowns; the plan shows operations pushed down to the external source.

```sql
SELECT id, name
FROM EXTERNAL_QUERY("<connection>", "SELECT * FROM company")
WHERE country_code IN ('ee', 'hu') AND name like '%TV%'
```

Plan with pushdown (external source returns 3 columns and only rows for `'ee'` / `'hu'`; `LIKE` is evaluated by BigQuery):

```text
$1:id, $2:name, $3:country_code
FROM table_for_external_query_$_0(
  SELECT id, name, country_code
  FROM (
    /*native_query*/
    SELECT * FROM company
  )
  WHERE in(country_code, 'ee', 'hu')
)
WHERE and(in($3, 'ee', 'hu'), like($2, '%TV%'))
$1, $2
TO __stage00_output
```

Plan without pushdown (all columns and rows are returned and BigQuery filters):

```text
$1:id, $2:name, $3:country_code
FROM table_for_external_query_$_0(
  SELECT id, name, description, country_code, primary_address, secondary address
  FROM (
    /*native_query*/
    SELECT * FROM company
  )
)
WHERE and(in($3, 'ee', 'hu'), like($2, '%TV%'))
$1, $2
TO __stage00_output
```

### Example query

```sql
SELECT
  COUNT(1) as rowcount,
  COUNTIF(corpus = 'hamlet') as rowcount_hamlet
FROM `publicdata.samples.shakespeare`
```

### API sample representation

`statistics.query.queryPlan` and `timeline` from `jobs.get` for the hamlet query (first stage, abridged to the start of the plan):

```text
"statistics": {
  "creationTime": "1576544129234",
  "startTime": "1576544129348",
  "endTime": "1576544129681",
  "totalBytesProcessed": "2464625",
  "query": {
    "queryPlan": [
      {
        "name": "S00: Input",
        "id": "0",
        "startMs": "1576544129436",
        "endMs": "1576544129465",
        "waitRatioAvg": 0.04,
        "waitMsAvg": "1",
        "waitRatioMax": 0.04,
        "waitMsMax": "1",
        "readRatioAvg": 0.32,
        "readMsAvg": "8",
        "readRatioMax": 0.32,
        "readMsMax": "8",
        "computeRatioAvg": 1,
        "computeMsAvg": "25",
        "computeRatioMax": 1,
        "computeMsMax": "25",
        "writeRatioAvg": 0.08,
        "writeMsAvg": "2",
        "writeRatioMax": 0.08,
        "writeMsMax": "2",
        "shuffleOutputBytes": "18",
        "shuffleOutputBytesSpilled": "0",
        "recordsRead": "164656",
        "recordsWritten": "1",
        "parallelInputs": "1",
        "completedParallelInputs": "1",
        "status": "COMPLETE",
        "steps": [
          {
            "kind": "READ",
            "substeps": [
              "$1:corpus",
              "FROM publicdata.samples.shakespeare"
            ]
          },
          {
            "kind": "AGGREGATE",
            "substeps": [
              "$20 := COUNT($30)",
              "$21 := COUNTIF($31)"
            ]
          },
          {
            "kind": "COMPUTE",
            "substeps": [
              "$30 := 1",
              "$31 := equal($1, 'hamlet')"
            ]
          },
          {
            "kind": "WRITE",
            "substeps": [
              "$20, $21",
              "TO __stage00_output"
            ]
          }
        ]
      },
```

## Options / Props

### Stage overview fields

| API field | Description |
|-----------|-------------|
| `id` | Unique numeric ID for the stage |
| `name` | Simple summary name for the stage |
| `status` | `PENDING`, `RUNNING`, `COMPLETE`, `FAILED`, `CANCELLED` |
| `inputStages` | IDs forming the dependency graph of the stage |
| `startMs` | Epoch milliseconds when the first worker began |
| `endMs` | Epoch milliseconds when the last worker completed |
| `steps` | Detailed list of execution steps |
| `recordsRead` | Input size of the stage in records across all workers |
| `recordsWritten` | Output size of the stage in records across all workers |
| `parallelInputs` | Number of parallelizable units of work |
| `completedParallelInputs` | Units of work completed (not all inputs must complete for a stage to complete) |
| `shuffleOutputBytes` | Total bytes written across all workers in the stage |
| `shuffleOutputBytesSpilled` | Bytes spilled to disk when shuffle data falls back to disk-based transmission; not deterministic for a given query |

### Per-stage timing classification

Average and slowest-worker (max) times, as ratio (fraction of the longest time spent by any worker in any segment, shown by the console) and absolute milliseconds.

| Relative timing | Absolute timing | Meaning |
|-----------------|-----------------|---------|
| `waitRatioAvg` | `waitMsAvg` | Average worker time waiting to be scheduled |
| `waitRatioMax` | `waitMsMax` | Slowest worker time waiting to be scheduled |
| `readRatioAvg` | `readMsAvg` | Average worker time reading input |
| `readRatioMax` | `readMsMax` | Slowest worker time reading input |
| `computeRatioAvg` | `computeMsAvg` | Average worker time CPU bound |
| `computeRatioMax` | `computeMsMax` | Slowest worker time CPU bound |
| `writeRatioAvg` | `writeMsAvg` | Average worker time writing output |
| `writeRatioMax` | `writeMsMax` | Slowest worker time writing output |

### Step categories

| Step category | Description |
|---------------|-------------|
| `READ` | Read of columns from an input table or shuffle; only the first sixteen columns read are returned in step details |
| `WRITE` | Write of columns to an output table or shuffle; for `HASH` partitioned outputs also includes the partition key columns |
| `COMPUTE` | Expression evaluation and SQL functions |
| `FILTER` | Used by `WHERE`, `OMIT IF`, and `HAVING` |
| `SORT` | `ORDER BY` with column keys and sort order |
| `AGGREGATE` | Aggregations such as `GROUP BY` or `COUNT` |
| `LIMIT` | `LIMIT` clause |
| `JOIN` | Joins, with join type and possibly conditions |
| `ANALYTIC_FUNCTION` | Window (analytic) function invocation |
| `USER_DEFINED_FUNCTION` | User-defined function invocation |
| `UPDATE` | Modifies existing rows in the target table for `UPDATE` |
| `DELETE` | Removes rows from the target table for `DELETE` |
| `MERGE` | Modifies rows in the target table for `MERGE` |
| `EXPORT` | Writes output columns to a destination table for DML statements or query result exports |

### Timeline fields

| Field | Description |
|-------|-------------|
| `elapsedMs` | Milliseconds elapsed since the start of query execution |
| `totalSlotMs` | Cumulative slot milliseconds used by the query |
| `pendingUnits` | Units of work scheduled and waiting |
| `activeUnits` | Units of work being processed by workers |
| `completedUnits` | Units of work completed |

### Interpreting and optimizing steps

| Step | What to look for | Optimize |
|------|------------------|----------|
| `READ` | Large scan of an unpartitioned table; large table with a small filter ratio; shuffle bytes spilled to disk | Filter early with `WHERE`; partition and cluster by query patterns; avoid `SELECT *` (use `SELECT * EXCEPT`); materialized views |
| `COMPUTE` | Stages with heavy computation or many rows; compute max much higher than average (data skew) | Check data distribution; use integer, datetime and timestamp types rather than strings |
| `WRITE` | Intermediate shuffle writes vs final output; hash partitioned output includes the partition key | Reduce data written by filtering and aggregating earlier; partition so writes are confined; a DML `WHERE` with a static condition on the partition column modifies only the relevant partitions; denormalization has storage and consistency trade-offs |
| `JOIN` | Broadcast join (`JOIN EACH WITH ALL`); hash join (`JOIN EACH WITH EACH`); self join and cross join are antipatterns; skewed join (max compute time much greater than average) | `INT64` join keys instead of `STRING`; filter before joining; avoid functions on join columns; avoid self joins (use window functions); largest table first, then the smallest, then decreasing size; denormalize; partition and cluster on join keys; pre-filter or split skewed joins |
| `AGGREGATE` | Input vs output rows and shuffle size; uneven distribution; `DISTINCT` aggregates and very many groups | Cluster on `GROUP BY` columns; partition to match query patterns (ingestion-time partitioned tables reduce scanned data); aggregate earlier; consider `APPROX_COUNT_DISTINCT` |
| `REPARTITION` / `COALESCE` | `REPARTITION` rebalances skewed shuffle data; `COALESCE` merges many small buckets; occasional steps are normal, repeated ones can indicate skew or excess shuffling | Partition and cluster effectively; look for skew in selective filters or joins; aggregate earlier; don't over-optimize |
| `UPDATE` / `DELETE` / `MERGE` | Substeps: columns read or written, target table (`FROM` for `UPDATE` and `DELETE`, `INTO` for `MERGE`) | |
| `EXPORT` | Substeps: output columns, destination table (`TO`); common in final stages of `INSERT`, `UPDATE`, `DELETE`, `MERGE` and queries that materialize to a destination table | |

## Notes

- Source: https://docs.cloud.google.com/bigquery/docs/query-plan-explanation (retrieved 2026-11-19; CC BY 4.0, code samples Apache 2.0)
- Plan statistics of long-running queries are updated periodically, typically no more often than every 30 seconds, independent of job polling. Dry runs and results served from cached results don't include the additional diagnostic information.
- Substeps may be truncated when the execution graph is complex enough to cause payload size issues.
- The console query text heatmap colors by the whole stage's slot-time (BigQuery doesn't measure step slot-time), so it can overrepresent a step in a stage with several complex operations. Mapping to a view's or routine's query text requires `bigquery.tables.get` on the view or `bigquery.routines.get` on the routine, and the resource must still exist.
- BigQuery can modify the plan during execution (for example adding repartition stages). Some query processing happens outside any stage (some partition pruning, metadata operations), so latency or slot usage can accrue before the first stage or after the last.
- The API sample in the source is a fragment of the `jobs.get` response (it also continues with stage `S01: Output`, `estimatedBytesProcessed`, `timeline`, `totalBytesBilled`, `cacheHit`, `referencedTables`, `statementType`); it is not valid standalone JSON, so it is shown as `text` and cut after the first stage. The source also shows Console screenshots.
- Federated queries: the source's `"<connection>"` is a placeholder for a connection ID.
- Cloud SQL, Spanner and other federated-query sources are in their own skills (`gcp-databases-relational`).
- The hamlet query reads a public dataset and is billed by bytes processed.

## Related

- [best-practices-performance-compute.md](./best-practices-performance-compute.md)
- [bi-engine-intro.md](./bi-engine-intro.md)
