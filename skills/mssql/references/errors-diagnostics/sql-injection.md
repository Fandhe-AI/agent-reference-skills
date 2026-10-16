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
- Related error code: `RequestError` / `PreparedStatementError` `EINJECT` is raised when a parameter name, a bulk column name, a type or a procedure name is not a valid identifier (v12.7.9 README wording; previously "SQL injection warning"), see error-codes.md.
- Identifiers (parameter names, bulk column names, parameter types, stored procedure names) cannot be bound as parameters, so this library builds them into the statement after checking them. That check is not a substitute for your own: if any of them comes from somewhere you do not control, map it to an allowlisted value first. See identifier-rules.md.
- The stricter identifier validation shipped in v12.7.2 (release notes): validate parameter names against an allowlist, validate stored procedure names, reject column names and type metadata that escape quoting, and validate bulk ordering keys.

## Related

- [identifier-rules.md](./identifier-rules.md)
- [error-codes.md](./error-codes.md)
- [errors.md](./errors.md)
