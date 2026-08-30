---
source: https://tediousjs.github.io/node-mssql/#unprepare-callback
---

# unprepare ([callback])

Unprepare a prepared statement.

## Signature / Usage

```javascript
const ps = new sql.PreparedStatement()
ps.input('param', sql.Int)
ps.prepare('select @param as value', err => {
    // ... error checks

    ps.unprepare(err => {
        // ... error checks

    })
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| callback(err) | `function` | A callback which is called after unpreparation has completed, or an error has occurred. Optional. If omitted, returns Promise |

## Notes

- Errors: `ENOTPREPARED` (`PreparedStatementError`) - Statement is not prepared
- Releases the connection reserved by the prepared statement back to the pool
- This is a SQL Server / TDS prepared statement, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepare](./prepare.md)
- [prepared-statement-execute](./prepared-statement-execute.md)
