---
source: https://tediousjs.github.io/node-mssql/#callbacks
---

# Callbacks

Query, execute a stored procedure, and use a template literal, all with the Node.js error-first callback style.

```javascript
const sql = require('mssql')

sql.connect(config, err => {
    // ... error checks

    // Query

    new sql.Request().query('select 1 as number', (err, result) => {
        // ... error checks

        console.dir(result)
    })

    // Stored Procedure

    new sql.Request()
    .input('input_parameter', sql.Int, value)
    .output('output_parameter', sql.VarChar(50))
    .execute('procedure_name', (err, result) => {
        // ... error checks

        console.dir(result)
    })

    // Using template literal

    const request = new sql.Request()
    request.query(request.template`select * from mytable where id = ${value}`, (err, result) => {
        // ... error checks
        console.dir(result)
    })
})

sql.on('error', err => {
    // ... error handler
})
```

## Notes

- `new sql.Request()` without an explicit pool/transaction argument uses the global connection pool
- `request.template` is a tagged-template method on the `Request` instance; its result is passed as the `command` string to `request.query()`. Per the README's SQL injection section, tagged template literals (like `.input()`) sanitize interpolated values
- Every method accepts an optional trailing callback; omitting it returns a Promise instead (see Promises samples)
