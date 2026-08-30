---
source: https://tediousjs.github.io/node-mssql/#queries
---

# Promises: Queries

Run a parameterized query against the global pool using the native Promise chain.

```javascript
const sql = require('mssql')

sql.on('error', err => {
    // ... error handler
})

sql.connect(config).then(pool => {
    // Query

    return pool.request()
        .input('input_parameter', sql.Int, value)
        .query('select * from mytable where id = @input_parameter')
}).then(result => {
    console.dir(result)
}).catch(err => {
  // ... error checks
});
```

## Notes

- Native `Promise` is used by default; override with `sql.Promise = require('myownpromisepackage')`
- `.catch()` must be attached to handle errors from `connect()`, `.request()`, and `.query()` in the same chain
