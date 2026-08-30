---
source: https://tediousjs.github.io/node-mssql/#the-global-connection-pool
---

# Global Connection Pool

Reuse the single global connection pool via repeated `sql.connect()` calls instead of reconnecting per request.

```js
const sql = require('mssql')
const config = { ... }

// run a parameterised query against the global connection pool
function runQuery(userId) {
  // sql.connect() will return the existing global pool if it exists or create a new one if it doesn't
  return sql.connect(config).then((pool) => {
    return pool.request()
      .input('userId', sql.Int, userId)
      .query('SELECT * FROM users WHERE id = @userId')
  })
}
```

## Notes

- There can only be one global connection pool connected at a time; passing a different config to `sql.connect()` while already connected does not create a new pool
- Awaiting/`.then`-ing `sql.connect()` is safe to call repeatedly — once connected, subsequent calls resolve immediately with no delay
- Do not call `sql.close()` after each query; only close the global pool when the application is certain to be finished (e.g. end of a CLI tool or CRON job)
- The upstream README example accepts a raw SQL string; shown here parameterised to avoid propagating an injection-prone helper
