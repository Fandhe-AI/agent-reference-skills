---
source: https://tediousjs.github.io/node-mssql/#the-global-connection-pool
---

# The Global Connection Pool

To assist with pool management in your application there is the `sql.connect()` function that is used to connect to the global connection pool. You can make repeated calls to this function, and if the global pool is already connected, it will resolve to the connected pool.

## Signature / Usage

```js
const sql = require('mssql')
const config = { ... }

// run a query against the global connection pool
function runQuery(query) {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  return sql.connect(config).then((pool) => {
    return pool.query(query)
  })
}
```

## Notes

- There can only be one global connection pool connected at a time. Providing a different connection config to `connect()` will not create a new connection if it is already connected.
- Awaiting or `.then`-ing the pool creation is a safe way to ensure that the pool is always ready, without knowing where it is needed first. Once the pool is created there will be no delay for the next `connect()` call.
- Do not close the global pool by calling `sql.close()` after a query is executed, because other queries may need to be run against this pool and closing it will add additional overhead. Only close the global pool if you're certain the application is finished (e.g. a CLI tool or a CRON job).

## Related

- [Global Pool Single Instance](./global-pool-single-instance.md)
- [Connection Pools](./connection-pools.md)
