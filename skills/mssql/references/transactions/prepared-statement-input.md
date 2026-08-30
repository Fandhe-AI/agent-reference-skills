---
source: https://tediousjs.github.io/node-mssql/#input-name-type
---

# input (name, type)

Add an input parameter to the prepared statement.

## Signature / Usage

```javascript
ps.input('input_parameter', sql.Int)
ps.input('input_parameter', sql.VarChar(50))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | `string` | Name of the input parameter without `@` char |
| type | `sql.<Type>` | SQL data type of the input parameter |

## Notes

- Synchronous errors: `EARGS` (`PreparedStatementError`) - Invalid number of arguments. `EINJECT` (`PreparedStatementError`) - SQL injection warning
- This is a SQL Server prepared statement parameter, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepared-statement-output](./prepared-statement-output.md)
- [prepare](./prepare.md)
