---
source: https://tediousjs.github.io/node-mssql/#stored-procedures
---

# Promises: Stored procedures

Execute a stored procedure with input/output parameters using the native Promise chain.

```js
const sql = require('mssql')

sql.on('error', err => {
    // ... error handler
})

sql.connect(config).then(pool => {

    // Stored procedure

    return pool.request()
        .input('input_parameter', sql.Int, value)
        .output('output_parameter', sql.VarChar(50))
        .execute('procedure_name')
}).then(result => {
    console.dir(result)
}).catch(err => {
    // ... error checks
})
```

## Notes

- `.output()` must be declared before `.execute()`; `result.output` is a key/value collection of the declared output parameters (see `Request#execute`)
- `.execute()` replaces `.query()` when calling a stored procedure by name
