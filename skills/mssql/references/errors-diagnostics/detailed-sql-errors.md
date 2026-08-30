---
source: https://tediousjs.github.io/node-mssql/#detailed-sql-errors
---

# Detailed SQL Errors

SQL errors (`RequestError` with `err.code` equal to `EREQUEST`) contain additional details.

## Signature / Usage

```javascript
class RequestError extends MSSQLError {
  constructor (message, code) {
    super(message, code)
    if (message instanceof Error) {
      if (message.info) {
        this.number = message.info.number || message.code // err.code is returned by msnodesql driver
        this.lineNumber = message.info.lineNumber
        this.state = message.info.state || message.sqlstate // err.sqlstate is returned by msnodesql driver
        this.class = message.info.class
        this.serverName = message.info.serverName
        this.procName = message.info.procName
      }
    }
    this.name = 'RequestError'
  }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| `err.number` | The error number. |
| `err.state` | The error state, used as a modifier to the number. |
| `err.class` | The class (severity) of the error. A class of less than 10 indicates an informational message. |
| `err.lineNumber` | The line number in the SQL batch or stored procedure that caused the error. Line numbers begin at 1; if not applicable, the value is 0. |
| `err.serverName` | The server name. |
| `err.procName` | The stored procedure name. |

## Notes

- Detailed explanation of error class (severity) can be found at Microsoft's `sys.messages` / severity level documentation (referenced as `https://msdn.microsoft.com/en-us/library/dd304156.aspx` in the original docs).

## Related

- [errors.md](./errors.md)
- [error-codes.md](./error-codes.md)
- [informational-messages.md](./informational-messages.md)
