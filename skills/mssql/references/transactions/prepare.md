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

- Errors: `ENOCONN` (`PreparedStatementError`) - No connection is specified for that prepared statement. `ECONNCLOSED` (`ConnectionError`) - Connection is closed. `EALREADYPREPARED` (`PreparedStatementError`) - Statement is already prepared. `ENOTBEGUN` (`TransactionError`) - Transaction has not begun
- Release notes (v12.7.9): `prepare()` rejects with `ENOCONN` when there is no pool and with `ECONNCLOSED` when the pool is not connected (previously `ENOTOPEN` was listed here)
- This is a SQL Server / TDS prepared statement, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepared-statement-input](./prepared-statement-input.md)
- [prepared-statement-execute](./prepared-statement-execute.md)
