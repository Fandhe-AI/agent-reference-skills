---
source: https://tediousjs.github.io/node-mssql/#output-name-type
---

# output (name, type)

Add an output parameter to the prepared statement.

## Signature / Usage

```javascript
ps.output('output_parameter', sql.Int)
ps.output('output_parameter', sql.VarChar(50))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | `string` | Name of the output parameter without `@` char |
| type | `sql.<Type>` | SQL data type of the output parameter |

## Notes

- Synchronous errors: `EARGS` (`PreparedStatementError`) - Invalid number of arguments. `EINJECT` (`PreparedStatementError`) - SQL injection warning
- This is a SQL Server prepared statement parameter, unrelated to Redis (`upstash`) or Stripe (`stripe`) transaction concepts

## Related

- [prepared-statement](./prepared-statement.md)
- [prepared-statement-input](./prepared-statement-input.md)
- [prepare](./prepare.md)
