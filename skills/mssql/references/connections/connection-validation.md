---
source: https://tediousjs.github.io/node-mssql/#connection-validation
---

# Connection Validation

When a connection is acquired from the pool, it can be validated to ensure it is still usable. This is controlled by the `validateConnection` config option.

## Signature / Usage

```javascript
const config = {
    server: 'localhost',
    // ...
    validateConnection: true // default
}
```

## Options / Props

| Value | Description |
|---|---|
| `true` (default) | Executes `SELECT 1` against the connection before handing it to the caller. This is the most thorough check — it verifies end-to-end connectivity — but adds a round-trip query for every pool acquisition. |
| `'socket'` | Performs a lightweight, synchronous check of the underlying connection state and TCP socket health. No SQL query is executed. This is significantly cheaper at scale and catches most failure modes (closed connections, destroyed sockets, wrong protocol state), but will not detect issues like server-side session invalidation. **Tedious driver only** — with msnodesqlv8, this value falls back to `SELECT 1` behaviour because native ODBC connections do not expose socket-level properties. |
| `false` | Disables validation entirely. The connection is assumed to be healthy if it has not been flagged as closed or errored. Use this only if your application already handles stale connection errors gracefully. |

## When to use `'socket'` mode

If your application maintains a large connection pool and you see high volumes of `SELECT 1` queries in your SQL Server monitoring, switching to `'socket'` mode can dramatically reduce overhead. TCP keepalive (enabled by default in tedious at 30-second intervals) will independently detect and close dead connections over time, so the socket-level check provides a good balance between reliability and performance.

## Notes

- `'socket'` mode falls back to `SELECT 1` behaviour when using the msnodesqlv8 driver.
- `ConnectionPool` / `Pool` / `Connection` here are TDS connection pools to SQL Server — unrelated to the HTTP servers in the `fastify` / `hono` skills or the Redis connections in `upstash` / `bullmq`.

## Related

- [Connection Pools](./connection-pools.md)
- [Drivers](../drivers/README.md)
