---
source: https://tediousjs.github.io/node-mssql/#error-codes
---

# Error Codes

Each known error has `name`, `code` and `message` properties.

## Signature / Usage

```javascript
'use strict'

class RequestError extends MSSQLError {
  constructor (message, code) {
    super(message, code)
    // ...
    this.name = 'RequestError'
  }
}
```

## Options / Props

| Name | Code | Message |
|------|------|---------|
| `ConnectionError` | `ELOGIN` | Login failed. |
| `ConnectionError` | `ETIMEOUT` | Connection timeout. |
| `ConnectionError` | `EDRIVER` | Unknown driver. |
| `ConnectionError` | `EALREADYCONNECTED` | Database is already connected! |
| `ConnectionError` | `EALREADYCONNECTING` | Already connecting to database! |
| `ConnectionError` | `ENOTOPEN` | Connection not yet open. |
| `ConnectionError` | `EINSTLOOKUP` | Instance lookup failed. |
| `ConnectionError` | `ESOCKET` | Socket error. |
| `ConnectionError` | `ECONNCLOSED` | Connection is closed. |
| `TransactionError` | `ENOTBEGUN` | Transaction has not begun. |
| `TransactionError` | `EALREADYBEGUN` | Transaction has already begun. |
| `TransactionError` | `EREQINPROG` | Can't commit/rollback transaction. There is a request in progress. |
| `TransactionError` | `EABORT` | Transaction has been aborted. |
| `RequestError` | `EREQUEST` | Message from SQL Server. Error object contains additional details. |
| `RequestError` | `ECANCEL` | Cancelled. |
| `RequestError` | `ETIMEOUT` | Request timeout. |
| `RequestError` | `EARGS` | Invalid number of arguments. |
| `RequestError` | `EINJECT` | SQL injection warning. |
| `RequestError` | `ENOCONN` | No connection is specified for that request. |
| `PreparedStatementError` | `EARGS` | Invalid number of arguments. |
| `PreparedStatementError` | `EINJECT` | SQL injection warning. |
| `PreparedStatementError` | `EALREADYPREPARED` | Statement is already prepared. |
| `PreparedStatementError` | `ENOTPREPARED` | Statement is not prepared. |

## Related

- [errors.md](./errors.md)
- [detailed-sql-errors.md](./detailed-sql-errors.md)
