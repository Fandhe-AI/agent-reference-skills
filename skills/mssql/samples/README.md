# samples

| Name | Description | Path |
|------|-------------|------|
| Advanced Pool Management | Custom multi-pool manager for multiple databases or read/write pools. | [advanced-pool-management.md](./advanced-pool-management.md) |
| Async/Await | Global pool with async/await: a parameterized query and a stored procedure. | [async-await.md](./async-await.md) |
| Bulk insert | Insert many rows in one round trip using `sql.Table` and `request.bulk()`. | [bulk-insert.md](./bulk-insert.md) |
| Callbacks | Query, stored procedure, and template literal in Node.js error-first callback style. | [callbacks.md](./callbacks.md) |
| Config | Minimal connection config object used by `sql.connect()` and `ConnectionPool`. | [config.md](./config.md) |
| Diagnostics Channel: OpenTelemetry spans | Wrap `request.query()` calls in OpenTelemetry spans via `diagnostics_channel` and `TracingChannel`. | [diagnostics-opentelemetry.md](./diagnostics-opentelemetry.md) |
| Global Connection Pool | Reuse the single global connection pool via repeated `sql.connect()` calls. | [global-connection-pool.md](./global-connection-pool.md) |
| Global Pool Single Instance (Express) | Connect once, keep one pool reference on `app.locals` for all route handlers. | [global-pool-single-instance.md](./global-pool-single-instance.md) |
| Prepared Statement | Prepare once, execute (optionally many times), then unprepare to release the connection. | [prepared-statement.md](./prepared-statement.md) |
| Promises: Queries | Parameterized query against the global pool with the native Promise chain. | [promises-queries.md](./promises-queries.md) |
| Promises: Stored procedures | Stored procedure with input/output parameters via the native Promise chain. | [promises-stored-procedures.md](./promises-stored-procedures.md) |
| Streaming | Stream rows from a large result set in batches instead of buffering it all in memory. | [streaming.md](./streaming.md) |
| Table-Valued Parameter (TVP) | Pass a `sql.Table` as one parameter to a stored procedure (SQL Server 2008+). | [table-valued-parameter.md](./table-valued-parameter.md) |
| ES6 Tagged template literals | `sql.query` as an ES6 tagged template with automatically parameterized interpolation. | [tagged-template-literals.md](./tagged-template-literals.md) |
| Transaction | Run requests in a `Transaction` on one reserved connection, then commit. | [transaction.md](./transaction.md) |
