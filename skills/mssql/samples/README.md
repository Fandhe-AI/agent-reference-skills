# samples

対象 mssql (node-mssql) v12.7.0

| Name | Description | Path |
| --- | --- | --- |
| Config | Minimal connection config object used by `sql.connect()` and `ConnectionPool` | [config.md](./config.md) |
| Async/Await | Connect to the global pool and run a parameterized query and a stored procedure with async/await | [async-await.md](./async-await.md) |
| Promises: Queries | Run a parameterized query against the global pool using the native Promise chain | [promises-queries.md](./promises-queries.md) |
| Promises: Stored procedures | Execute a stored procedure with input/output parameters using the native Promise chain | [promises-stored-procedures.md](./promises-stored-procedures.md) |
| ES6 Tagged template literals | Run a query using `sql.query` as an ES6 tagged template, with interpolated values automatically parameterized | [tagged-template-literals.md](./tagged-template-literals.md) |
| Callbacks | Query, execute a stored procedure, and use a template literal, all with the Node.js error-first callback style | [callbacks.md](./callbacks.md) |
| Streaming | Stream rows from a large result set instead of buffering the whole recordset in memory, and back-pressure it in batches | [streaming.md](./streaming.md) |
| Global Connection Pool | Reuse the single global connection pool via repeated `sql.connect()` calls instead of reconnecting per request | [global-connection-pool.md](./global-connection-pool.md) |
| Global Pool Single Instance (Express) | Call `connect()` once, keep a single pool reference on `app.locals`, and reuse it across route handlers | [global-pool-single-instance.md](./global-pool-single-instance.md) |
| Advanced Pool Management | Implement a custom multi-pool manager (e.g. for multiple databases or separate read/write pools) instead of relying on the single global pool | [advanced-pool-management.md](./advanced-pool-management.md) |
| Transaction | Run a request inside a `Transaction` so all statements execute on a single reserved connection, then commit | [transaction.md](./transaction.md) |
| Prepared Statement | Prepare a statement once, execute it (optionally many times), then unprepare to release the reserved connection | [prepared-statement.md](./prepared-statement.md) |
| Bulk insert | Insert many rows in a single round trip using `sql.Table` and `request.bulk()` | [bulk-insert.md](./bulk-insert.md) |
| Table-Valued Parameter (TVP) | Pass a `sql.Table` as a single parameter to a stored procedure (SQL Server 2008+) | [table-valued-parameter.md](./table-valued-parameter.md) |
| Diagnostics Channel: OpenTelemetry spans | Wrap `request.query()` calls with OpenTelemetry spans using Node's `diagnostics_channel` and `TracingChannel` | [diagnostics-opentelemetry.md](./diagnostics-opentelemetry.md) |
