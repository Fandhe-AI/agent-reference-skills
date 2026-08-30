---
source: https://tediousjs.github.io/node-mssql/#advanced-pool-management
---

# Advanced Pool Management

For some use-cases you may want to implement your own connection pool management, rather than using the global connection pool. Reasons for doing this include:

- Supporting connections to multiple databases
- Creation of separate pools for read vs read/write operations

## Signature / Usage

```js
// pool-manager.js
const mssql = require('mssql')
const pools = new Map();

module.exports = {
 /**
  * Get or create a pool. If a pool doesn't exist the config must be provided.
  * If the pool does exist the config is ignored (even if it was different to the one provided
  * when creating the pool)
  *
  * @param {string} name
  * @param {{}} [config]
  * @return {Promise.<mssql.ConnectionPool>}
  */
 get: (name, config) => {
  if (!pools.has(name)) {
   if (!config) {
    throw new Error('Pool does not exist');
   }
   const pool = new mssql.ConnectionPool(config);
   // automatically remove the pool from the cache if `pool.close()` is called
   const close = pool.close.bind(pool);
   pool.close = (...args) => {
    pools.delete(name);
    return close(...args);
   }
   pools.set(name, pool.connect());
  }
  return pools.get(name);
 },
 /**
  * Closes all the pools and removes them from the store
  *
  * @return {Promise<mssql.ConnectionPool[]>}
  */
 closeAll: () => Promise.all(Array.from(pools.values()).map((connect) => {
  return connect.then((pool) => pool.close());
 })),
};
```

```js
const { get } = require('./pool-manager')

async function example() {
  const pool = await get('default')
  return pool.request().query('SELECT 1')
}
```

## Notes

- Similar to the global connection pool, aim to only close a pool when you know it will never be needed by the application again — typically only when the application is shutting down.
- `ConnectionPool` / `Pool` / `Connection` here are TDS connection pools to SQL Server — unrelated to the HTTP servers in the `fastify` / `hono` skills or the Redis connections in `upstash` / `bullmq`.

## Related

- [The Global Connection Pool](./global-connection-pool.md)
- [Global Pool Single Instance](./global-pool-single-instance.md)
