---
source: https://docs.cloud.google.com/spanner/docs/query-execution-plans
---

# Query execution plans

A query execution plan is the set of steps Spanner uses to obtain a query's results: conceptually a tree of relational operators, where each operator reads rows from its inputs and produces output rows, and the root operator's result is the query result. Spanner executes the plan top-down while data flows bottom-up. Execution plans support GoogleSQL-dialect and PostgreSQL-dialect databases, but the page's examples are intended for GoogleSQL-dialect databases.

## Signature / Usage

### A simple plan

The query below compiles to a plan of `distributed union` -> `serialize result` -> `table scan`:

```sql
SELECT s.SongName FROM Songs AS s;
```

### Aggregate queries

An aggregate query implements `GROUP BY` logic. The plan starts with a `distributed union` that sends subplans to servers whose splits satisfy `SingerId < 100`; `stream aggregate` computes counts per `SingerId`, `serialize result` serializes, and the `distributed union` combines the results:

```sql
SELECT s.SingerId, COUNT(*) AS SongCount
FROM Songs AS s
WHERE s.SingerId < 100
GROUP BY s.SingerId;
```

### Co-located join

A join between interleaved tables (`Songs` interleaved in `Albums`) runs entirely on each server that holds `Albums` splits, using a `cross apply`:

```sql
SELECT al.AlbumTitle, so.SongName
FROM Albums AS al, Songs AS so
WHERE al.SingerId = so.SingerId AND
      al.AlbumId = so.AlbumId;
```

### Index and back join

Given this index, selecting a column the index lacks (`Duration`) forces a back join to `Songs` (a `distributed cross apply`) that is not co-located:

```sql
CREATE INDEX SongsBySongName ON Songs(SongName);
```

```googlesql
SELECT s.SongName, s.Duration
FROM Songs@{force_index=SongsBySongName} AS s
WHERE STARTS_WITH(s.SongName, "B");
```

Selecting only indexed columns needs no back join:

```googlesql
SELECT s.SongName
FROM Songs@{force_index=SongsBySongName} AS s
WHERE STARTS_WITH(s.SongName, "B");
```

### Sequential scan versus scattered seeks

Reading a contiguous range of rows is significantly faster than reading the same number of scattered rows. This query performs a seek for each singer ID (see the **Seek count** statistic):

```sql
SELECT SUM(Duration)
FROM Songs
WHERE SingerId IN (1, 3, 9, 10, 15);
```

A contiguous range allows a sequential read:

```sql
SELECT SUM(Duration)
FROM Songs
WHERE SingerId BETWEEN 1 AND 5;
```

## Options / Props

### Key performance metrics (Spanner Studio query plan visualizer)

| Metric | Description |
|---|---|
| Total elapsed time | The total wall-clock time taken to execute the query. |
| CPU time | The total amount of CPU time spent across all servers involved in executing the query. Because some parts of execution can proceed in parallel, CPU time can be greater than total elapsed time. |

### Sampled query plans

| Item | Source statement |
|---|---|
| Availability | Not available for all queries; Spanner might sample only queries that consume significant CPU. |
| Retention | Query plan samples are retained for 30 days. |
| Where | The Query insights page of the Google Cloud console. |
| Use cases | Plan changes from schema changes (for example adding or removing an index), optimizer version updates, and new optimizer statistics. |
| Optimizer statistics | Collected automatically every three days, or updated manually with the `ANALYZE` command. |

## Notes

- Execution model: Spanner compiles the query, chooses an initial root server, and sends it the plan. The root server starts remote execution of subplans, waits for results, handles remaining local steps such as aggregation, and returns results. A remote server that receives a subplan acts as the root for that subplan, producing a tree of remote executions.
- To evaluate plans over distributed data, Spanner runs subplans locally on servers that store the data and orchestrates and aggregates remote executions with distribution pruning, using the `distributed union` operator and its `distributed cross apply` and `distributed outer apply` variants.
- The **Remote calls** statistic (Query summary, **Explanation** tab) counts calls to other Spanner servers (excluding calls within the same server); a higher number often indicates a more distributed query, but it is not a 1:1 count of splits accessed.
- Every table or index in a query needs a distributed operator (`distributed union` or a `distributed apply`); tables or indexes interleaved in the same parent might share a single `distributed union`.
- Plans and retrieval details: you can run queries and retrieve plans even if the tables have no data.
- The page's own warning says its examples are for GoogleSQL-dialect databases; the source's PostgreSQL tabs for the back join queries are omitted here.
- The source also shows the full sample schema (`Singers`, `Albums`, `Songs`, `Concerts` and their indexes), `INSERT` statements for sample data, result tables and plan diagrams, which are not reproduced here.
- Spanner is Google Cloud's distributed relational database, not a PostgreSQL server even with the PostgreSQL interface; it is distinct from `supabase` and `drizzle`.
- Source: https://docs.cloud.google.com/spanner/docs/query-execution-plans (retrieved 2026-11-16; CC BY 4.0, code samples Apache 2.0)

## Related

- [sql-best-practices.md](./sql-best-practices.md)
- Query execution operators: https://docs.cloud.google.com/spanner/docs/query-execution-operators
- Query optimizer overview: https://docs.cloud.google.com/spanner/docs/query-optimizer/overview
- Manage the query optimizer: https://docs.cloud.google.com/spanner/docs/query-optimizer/manage-query-optimizer
