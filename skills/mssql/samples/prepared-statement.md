---
source: https://tediousjs.github.io/node-mssql/#prepared-statement
---

# Prepared Statement

Prepare a statement once, execute it (optionally many times), then unprepare to release the reserved connection.

```javascript
const ps = new sql.PreparedStatement(/* [pool] */)
ps.input('param', sql.Int)
ps.prepare('select @param as value', err => {
    // ... error checks

    ps.execute({param: 12345}, (err, result) => {
        // ... error checks

        // release the connection after queries are executed
        ps.unprepare(err => {
            // ... error checks

        })
    })
})
```

## Notes

- `ps.input()` must be called before `ps.prepare()`; parameter names in `ps.execute(values, ...)` must match the names registered with `input()`
- Each prepared statement reserves one connection from the pool — always call `unprepare()` when finished, or the pool will run out of connections
- You cannot run other requests in the same transaction while a `PreparedStatement` created from it is still prepared
