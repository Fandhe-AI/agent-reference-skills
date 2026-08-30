---
source: https://tediousjs.github.io/node-mssql/#batch-batch-callback
---

# batch (batch, [callback])

Execute the SQL command. Unlike `query`, it doesn't use `sp_executesql`, so is not likely that SQL Server will reuse the execution plan it generates for the SQL. Use this only in special cases, for example when you need to execute commands like `create procedure` which can't be executed with `query`. Also you should use this if you plan to work with local temporary tables.

## Signature / Usage

```javascript
const request = new sql.Request()
request.batch('create procedure #temporary as select * from table', (err, result) => {
    // ... error checks
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| batch | string | T-SQL command to be executed. |
| callback | `(err, recordset)` | Called after execution has completed, or an error has occurred. Optional. If omitted, returns Promise. |

## Notes

- Table-Valued Parameter (TVP) is not supported in batch.
- Errors: `ETIMEOUT` (`RequestError`, request timeout), `EREQUEST` (`RequestError`, message from SQL Server), `ECANCEL` (`RequestError`, cancelled), `ENOCONN` (`RequestError`, no connection is specified for that request), `ENOTOPEN` (`ConnectionError`, connection not yet open), `ECONNCLOSED` (`ConnectionError`, connection is closed), `ENOTBEGUN` (`TransactionError`, transaction has not begun), `EABORT` (`TransactionError`, transaction was aborted by user or because of an error).
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [query](./query.md)
- [Request](./request.md)
