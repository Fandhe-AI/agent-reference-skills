---
source: https://tediousjs.github.io/node-mssql/#es6-tagged-template-literals
---

# ES6 Tagged template literals

Run a query using `sql.query` as an ES6 tagged template, with interpolated values automatically parameterized.

```javascript
const sql = require('mssql')

sql.connect(config).then(() => {
    return sql.query`select * from mytable where id = ${value}`
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})

sql.on('error', err => {
    // ... error handler
})
```

## Notes

- All interpolated values are automatically sanitized against SQL injection because the query is rendered as a prepared statement
- Because it is a prepared statement, all MS SQL parameter limitations apply (e.g. column names cannot be passed as interpolated values)
- `sql.query` here is the tagged-template form of the module-level query function, distinct from `Request#query`
