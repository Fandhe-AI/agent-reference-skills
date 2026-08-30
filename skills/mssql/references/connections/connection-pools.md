---
source: https://tediousjs.github.io/node-mssql/#connection-pools
---

# Connection Pools

An important concept to understand when using this library is [Connection Pooling](https://en.wikipedia.org/wiki/Connection_pool) as this library uses connection pooling extensively. As one Node JS process is able to handle multiple requests at once, we can take advantage of this long running process to create a pool of database connections for reuse; this saves overhead of connecting to the database for each request (as would be the case in something like PHP, where one process handles one request).

With the advantages of pooling comes some added complexities, but these are mostly just conceptual and once you understand how the pooling is working, it is simple to make use of it efficiently and effectively.

## Signature / Usage

```javascript
const pool = new sql.ConnectionPool({ /* config */ })
```

## Notes

- Pooling is used extensively throughout the library; a `ConnectionPool` instance manages a pool of TDS connections reused across `Request` / `Transaction` / `Prepared Statement` operations.
- Migration (v11 → v12): config objects are no longer cloned by the library — mutating a config object after passing it to a `ConnectionPool` results in undefined behaviour.
- Migration (v4 → v5): pool library moved from `node-pool` to `tarn.js`; `pool.size`/`pool.available`/`pool.pending`/`pool.borrowed` deprecated in favor of `ConnectionPool.size`/`available`/`pending`/`borrowed`.
- `ConnectionPool` / `Pool` / `Connection` here are TDS connection pools to SQL Server — unrelated to the HTTP servers in the `fastify` / `hono` skills or the Redis connections in `upstash` / `bullmq`.

## Related

- [The Global Connection Pool](./global-connection-pool.md)
- [Global Pool Single Instance](./global-pool-single-instance.md)
- [Advanced Pool Management](./advanced-pool-management.md)
- [Version Migration Changes](../migration/version-changes.md)
