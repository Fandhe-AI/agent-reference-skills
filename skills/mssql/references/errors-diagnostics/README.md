# errors-diagnostics

| Name | Description | Path |
|------|-------------|------|
| Errors | Overview of the 4 error classes (`ConnectionError`, `TransactionError`, `RequestError`, `PreparedStatementError`) and `originalError` / `precedingErrors`. | [errors.md](./errors.md) |
| Error Codes | Name / Code / Message table for all known error codes. | [error-codes.md](./error-codes.md) |
| Detailed SQL Errors | Additional `RequestError` (`EREQUEST`) properties: `number`, `state`, `class`, `lineNumber`, `serverName`, `procName`. | [detailed-sql-errors.md](./detailed-sql-errors.md) |
| Informational messages | Receiving `PRINT` / `RAISERROR` output via the `info` event. | [informational-messages.md](./informational-messages.md) |
| SQL injection | Built-in SQL injection protection via parameters / tagged template literals. | [sql-injection.md](./sql-injection.md) |
| Diagnostics Channel | Node.js `diagnostics_channel` telemetry: TracingChannels, point-event channels, OpenTelemetry Spans example. | [diagnostics-channel.md](./diagnostics-channel.md) |
