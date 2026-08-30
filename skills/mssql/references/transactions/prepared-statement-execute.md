---
source: https://tediousjs.github.io/node-mssql/#execute-values-callback
---

# execute (values, [callback])

Execute a prepared statement.

## Signature / Usage

```javascript
const ps = new sql.PreparedStatement()
ps.input('param', sql.Int)
ps.prepare('select @param as value', err => {
    // ... error checks

    ps.execute({param: 12345}, (err, result) => {
        // ... error checks

        console.log(result.recordset[0].value) // return 12345
        console.log(result.rowsAffected) // Returns number of affected rows in case of INSERT, UPDATE or DELETE statement.

        ps.unprepare(err => {
            // ... error checks
        })
    })
})
```

Executed requests can also be streamed:

```javascript
const ps = new sql.PreparedStatement()
ps.input('param', sql.Int)
ps.prepare('select @param as value', err => {
    // ... error checks

    ps.stream = true
    const request = ps.execute({param: 12345})

    request.on('recordset', columns => {
        // Emitted once for each recordset in a query
    })

    request.on('row', row => {
        // Emitted for each row in a recordset
    })

    request.on('error', err => {
        // May be emitted multiple times
    })

    request.on('done', result => {
        // Always emitted as the last one

        console.log(result.rowsAffected) // Returns number of affected rows in case of INSERT, UPDATE or DELETE statement.

        ps.unprepare(err => {
            // ... error checks
        })
    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| values | `object` | An object whose names correspond to the names of parameters that were added to the prepared statement before it was prepared |
| callback(err) | `function` | A callback which is called after execution has completed, or an error has occurred. Optional. If omitted, returns Promise |

## Notes

- Errors: `ENOTPREPARED` (`PreparedStatementError`) - Statement is not prepared. `ETIMEOUT` (`RequestError`) - Request timeout. `EREQUEST` (`RequestError`) - Message from SQL Server. `ECANCEL` (`RequestError`) - Cancelled
- To learn more about how the number of affected rows works, see the Affected Rows reference page
- This is a SQL Server / TDS prepared statement execution, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepare](./prepare.md)
- [unprepare](./unprepare.md)
