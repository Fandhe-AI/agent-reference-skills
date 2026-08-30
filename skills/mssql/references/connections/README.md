# connections

| Name | Description | Path |
|------|-------------|------|
| Connection Pools | Overview of connection pooling in node-mssql | [connection-pools.md](./connection-pools.md) |
| The Global Connection Pool | `sql.connect()` and the shared global pool | [global-connection-pool.md](./global-connection-pool.md) |
| Global Pool Single Instance | Maintaining a single pool reference (Express example) | [global-pool-single-instance.md](./global-pool-single-instance.md) |
| Advanced Pool Management | Custom pool manager for multiple databases | [advanced-pool-management.md](./advanced-pool-management.md) |
| Result value manipulation | Per-datatype value handlers via `sql.valueHandler` | [result-value-manipulation.md](./result-value-manipulation.md) |
| Connection Validation | `validateConnection` config option, including `'socket'` mode | [connection-validation.md](./connection-validation.md) |
| Connection Events | `error` event on a `ConnectionPool` | [events.md](./events.md) |
| connect([callback]) | Create a new connection pool | [connect.md](./connect.md) |
| close() | Close all active connections in the pool | [close.md](./close.md) |
| Pool properties | `healthy` / `size` / `available` / `pending` / `borrowed` / `connected` / `connecting` | [pool-properties.md](./pool-properties.md) |
| ConnectionPool.parseConnectionString(connectionString) | Parse a connection string into a config object | [parse-connection-string.md](./parse-connection-string.md) |
