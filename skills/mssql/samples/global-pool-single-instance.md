---
source: https://tediousjs.github.io/node-mssql/#global-pool-single-instance
---

# Global Pool Single Instance (Express)

Call `connect()` once, keep a single pool reference on `app.locals`, and reuse it across route handlers.

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

- The web server is started only after `appPool.connect()` resolves, so route handlers never see an unconnected pool
- Storing the resolved `pool` on `app.locals.db` avoids calling `connect()`/`close()` repeatedly per request
