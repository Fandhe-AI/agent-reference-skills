---
source: https://tediousjs.github.io/node-mssql/#sql-injection
---

# SQL injection

This module has built-in SQL injection protection. Always use parameters or tagged template literals to pass sanitized values to your queries.

## Signature / Usage

```javascript
const request = new sql.Request()
request.input('myval', sql.VarChar, '-- commented')
request.query('select @myval as myval', (err, result) => {
    console.dir(result)
})
```

## Notes

- Passing raw, unsanitized string concatenation into `request.query()` bypasses this protection; always use `request.input()` parameters or `sql.query` tagged template literals.
- Related error code: `RequestError` / `PreparedStatementError` `EINJECT` (SQL injection warning), see error-codes.md.

## Related

- [error-codes.md](./error-codes.md)
- [errors.md](./errors.md)
