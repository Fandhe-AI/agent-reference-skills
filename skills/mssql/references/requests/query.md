---
source: https://tediousjs.github.io/node-mssql/#query-command-callback
---

# query (command, [callback])

Execute the SQL command. To execute commands like `create procedure` or if you plan to work with local temporary tables, use `batch` instead.

## Signature / Usage

```javascript
const request = new sql.Request()
request.query('select 1 as number', (err, result) => {
    // ... error checks

    console.log(result.recordset[0].number) // return 1

    // ...
})
```

```javascript
const request = new sql.Request()
request.query('select 1 as number; select 2 as number', (err, result) => {
    // ... error checks

    console.log(result.recordset[0].number) // return 1
    console.log(result.recordsets[0][0].number) // return 1
    console.log(result.recordsets[1][0].number) // return 2
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| command | string | T-SQL command to be executed. |
| callback | `(err, recordset)` | Called after execution has completed, or an error has occurred. Optional. If omitted, returns Promise. |

## Notes

- Errors: `ETIMEOUT` (`RequestError`, request timeout), `EREQUEST` (`RequestError`, message from SQL Server), `ECANCEL` (`RequestError`, cancelled), `ENOCONN` (`RequestError`, no connection is specified for that request), `ENOTOPEN` (`ConnectionError`, connection not yet open), `ECONNCLOSED` (`ConnectionError`, connection is closed), `ENOTBEGUN` (`TransactionError`, transaction has not begun), `EABORT` (`TransactionError`, transaction was aborted by user or because of an error).
- To get the number of rows affected by the statement(s), see the Affected Rows reference page.
- `Request#query` is the method form of the same execution path used by the `sql.query` ES6 tagged template literal (`` sql.query`select * from mytable where id = ${value}` ``): both send the command as a parameterized/prepared statement via `sp_executesql`. Values interpolated through the tagged template are automatically sanitized against SQL injection because the statement is rendered as a prepared statement — the same limitations MS SQL imposes on parameters apply (e.g. column names cannot be passed as parameters). When building `command` strings manually for `request.query()`, always use `request.input()` parameters rather than string concatenation to get the same protection.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills; `query` is unrelated to `tanstack-query`.

## Related

- [batch](./batch.md)
- [Request](./request.md)
