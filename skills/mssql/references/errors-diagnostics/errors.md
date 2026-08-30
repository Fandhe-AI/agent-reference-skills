---
source: https://tediousjs.github.io/node-mssql/#errors
---

# Errors

node-mssql exposes 4 error classes, all extending its internal `MSSQLError` (itself extending `Error`).

## Signature / Usage

```javascript
'use strict'

class MSSQLError extends Error {
  constructor (message, code) {
    if (message instanceof Error) {
      super(message.message)
      this.code = message.code || code
      Error.captureStackTrace(this, this.constructor)
      Object.defineProperty(this, 'originalError', { enumerable: true, value: message })
    } else {
      super(message)
      this.code = code
    }
    this.name = 'MSSQLError'
  }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `ConnectionError` | class | Errors related to connections and connection pool. |
| `TransactionError` | class | Errors related to creating, committing and rolling back transactions. |
| `RequestError` | class | Errors related to queries and stored procedures execution. |
| `PreparedStatementError` | class | Errors related to prepared statements. |
| `err.originalError` | `Error` | Original (possibly cropped) underlying error, always accessible. |
| `err.precedingErrors` | `Error[]` | Preceding errors, since SQL Server may generate more than one error for one request. |

## Notes

- Those errors are initialized in the node-mssql module and its original stack may be cropped; the original error is always accessible via `err.originalError`.
- SQL Server may generate more than one error for one request, accessible via `err.precedingErrors`.

## Related

- [error-codes.md](./error-codes.md)
- [detailed-sql-errors.md](./detailed-sql-errors.md)
- [informational-messages.md](./informational-messages.md)
