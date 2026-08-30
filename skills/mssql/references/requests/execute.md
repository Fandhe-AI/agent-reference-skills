---
source: https://tediousjs.github.io/node-mssql/#execute-procedure-callback
---

# execute (procedure, [callback])

Call a stored procedure.

## Signature / Usage

```javascript
const request = new sql.Request()
request.input('input_parameter', sql.Int, value)
request.output('output_parameter', sql.Int)
request.execute('procedure_name', (err, result) => {
    // ... error checks

    console.log(result.recordsets.length) // count of recordsets returned by the procedure
    console.log(result.recordsets[0].length) // count of rows contained in first recordset
    console.log(result.recordset) // first recordset from result.recordsets
    console.log(result.returnValue) // procedure return value
    console.log(result.output) // key/value collection of output values
    console.log(result.rowsAffected) // array of numbers, each number represents the number of rows affected by executed statemens

    // ...
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| procedure | string | Name of the stored procedure to be executed. |
| callback | `(err, recordsets, returnValue)` | Called after execution has completed, or an error has occurred. `returnValue` is also accessible as property of recordsets. Optional. If omitted, returns Promise. |

## Notes

- Errors: `EREQUEST` (`RequestError`, message from SQL Server), `ECANCEL` (`RequestError`, cancelled), `ETIMEOUT` (`RequestError`, request timeout), `ENOCONN` (`RequestError`, no connection is specified for that request), `ENOTOPEN` (`ConnectionError`, connection not yet open), `ECONNCLOSED` (`ConnectionError`, connection is closed), `ENOTBEGUN` (`TransactionError`, transaction has not begun), `EABORT` (`TransactionError`, transaction was aborted by user or because of an error).

## Related

- [Request](./request.md)
- [input](./input.md)
- [output](./output.md)
