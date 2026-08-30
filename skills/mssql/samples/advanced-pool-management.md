---
source: https://tediousjs.github.io/node-mssql/#advanced-pool-management
---

# Advanced Pool Management

Implement a custom multi-pool manager (e.g. for multiple databases or separate read/write pools) instead of relying on the single global pool.

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

- Reasons to manage pools yourself: connecting to multiple databases, or separate pools for read vs read/write workloads
- `pools.set(name, pool.connect())` caches the connect Promise itself, so concurrent `get()` calls for the same name share one in-flight connection
- Wrapping `pool.close` to delete the cache entry keeps `pools` consistent when a caller closes a pool directly
- As with the global pool, only close a pool when you are certain the application will never need it again (typically at shutdown)
