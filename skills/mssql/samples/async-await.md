---
source: https://tediousjs.github.io/node-mssql/#asyncawait
---

# Async/Await

Connect to the global pool and run a parameterized query and a stored procedure with async/await.

```javascript
const sql = require('mssql')

(async function () {
    try {
        let pool = await sql.connect(config)
        let result1 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .query('select * from mytable where id = @input_parameter')

        console.dir(result1)

        // Stored procedure

        let result2 = await pool.request()
            .input('input_parameter', sql.Int, value)
            .output('output_parameter', sql.VarChar(50))
            .execute('procedure_name')

        console.dir(result2)
    } catch (err) {
        // ... error checks
    }
})()

sql.on('error', err => {
    // ... error handler
})
```

## Notes

- `sql.connect(config)` returns the global connection pool; reuse it across the app rather than reconnecting per request
- Always attach a top-level `sql.on('error', ...)` handler for errors emitted outside a specific request/transaction
- `.input()` binds parameters (prevents SQL injection); `.output()` declares an output parameter for a stored procedure call
