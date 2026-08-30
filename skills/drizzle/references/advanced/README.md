# advanced

| Name | Description | Path |
| --- | --- | --- |
| Transactions | `db.transaction()`, nested savepoints, rollback, dialect-specific isolation config | [transactions.md](./transactions.md) |
| Batch API | `db.batch()` for running multiple statements in one round trip (Neon HTTP driver) | [batch-api.md](./batch-api.md) |
| Cache | Opt-in query caching via `upstashCache()` or a custom `Cache` implementation | [cache.md](./cache.md) |
| Dynamic query building | `.$dynamic()` to lift the once-per-clause restriction for shared query-building functions | [dynamic-query-building.md](./dynamic-query-building.md) |
| Read Replicas | `withReplicas()` for read/write routing across primary and replica instances | [read-replicas.md](./read-replicas.md) |
| Set Operations | `union`, `unionAll`, `intersect`, `intersectAll`, `except`, `exceptAll` | [set-operations.md](./set-operations.md) |
| JIT Mappers | Opt-in `jit: true` compiled row mappers for faster result mapping | [jit-mappers.md](./jit-mappers.md) |
| Query performance | Prepared statements and `sql.placeholder()` for near-zero query overhead | [perf-queries.md](./perf-queries.md) |
| Drizzle Serverless performance | Connection/prepared-statement reuse patterns for serverless vs. edge functions | [perf-serverless.md](./perf-serverless.md) |
