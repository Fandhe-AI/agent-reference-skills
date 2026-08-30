---
source: https://tediousjs.github.io/node-mssql/#prepare-statement-callback
---

# prepare (statement, [callback])

Prepare a statement.

## Signature / Usage

```javascript
const ps = new sql.PreparedStatement()
ps.prepare('select @param as value', err => {
    // ... error checks
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| statement | `string` | T-SQL statement to prepare |
| callback(err) | `function` | A callback which is called after preparation has completed, or an error has occurred. Optional. If omitted, returns Promise |

## Notes

- Errors: `ENOTOPEN` (`ConnectionError`) - Connection not yet open. `EALREADYPREPARED` (`PreparedStatementError`) - Statement is already prepared. `ENOTBEGUN` (`TransactionError`) - Transaction has not begun
- This is a SQL Server / TDS prepared statement, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepared-statement-input](./prepared-statement-input.md)
- [prepared-statement-execute](./prepared-statement-execute.md)
