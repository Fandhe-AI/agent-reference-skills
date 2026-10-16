# errors-diagnostics

| Name | Description | Path |
|------|-------------|------|
| Detailed SQL Errors | SQL errors (`RequestError`, `EREQUEST`) carry extra detail fields. | [detailed-sql-errors.md](./detailed-sql-errors.md) |
| Diagnostics Channel | node-mssql publishes telemetry through Node.js `diagnostics_channel` for APM tools. | [diagnostics-channel.md](./diagnostics-channel.md) |
| Error Codes | Each known error has `name`, `code` and `message` properties. | [error-codes.md](./error-codes.md) |
| Errors | node-mssql exposes 4 error classes, all extending the internal `MSSQLError`. | [errors.md](./errors.md) |
| Identifier Rules | Parameter, column and procedure names are validated; unsafe ones are rejected with `EINJECT`. | [identifier-rules.md](./identifier-rules.md) |
| Informational messages | Receive `PRINT` / `RAISERROR` messages via the `info` event on a `Request`. | [informational-messages.md](./informational-messages.md) |
| SQL injection | Built-in SQL injection protection; always pass values via parameters or tagged templates. | [sql-injection.md](./sql-injection.md) |
