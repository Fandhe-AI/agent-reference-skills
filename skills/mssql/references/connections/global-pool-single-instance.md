---
source: https://tediousjs.github.io/node-mssql/#global-pool-single-instance
---

# Global Pool Single Instance

The ability to call `connect()` and `close()` repeatedly on the global pool is intended to make pool management easier, however it is better to maintain your own reference to the pool, where `connect()` is called **once**, and the resulting global pool's connection promise is re-used throughout the entire application.

## Signature / Usage

```js
const express = require('express')
const sql = require('mssql')
const config  = {/*...*/}
//instantiate a connection pool
const appPool = new sql.ConnectionPool(config)
//require route handlers and use the same connection pool everywhere
const route1 = require('./routes/route1')
const app = express()
app.get('/path', route1)

//connect the pool and start the web server when done
appPool.connect().then(function(pool) {
  app.locals.db = pool;
  const server = app.listen(3000, function () {
    const host = server.address().address
    const port = server.address().port
    console.log('Example app listening at http://%s:%s', host, port)
  })
}).catch(function(err) {
  console.error('Error creating connection pool', err)
});
```

```js
// ./routes/route1.js
const sql = require('mssql');

module.exports = function(req, res) {
  req.app.locals.db.query('SELECT TOP 10 * FROM table_name', function(err, recordset) {
    if (err) {
      console.error(err)
      res.status(500).send('SERVER ERROR')
      return
    }
    res.status(200).json({ message: 'success' })
  })
}
```

## Notes

- Example: in Express applications, a single global pool instance is added to `app.locals` so the application has access to it when needed; the server start is chained inside the `connect()` promise.
- Route handlers then read the pool from `req.app.locals.db`.

## Related

- [The Global Connection Pool](./global-connection-pool.md)
- [Advanced Pool Management](./advanced-pool-management.md)
