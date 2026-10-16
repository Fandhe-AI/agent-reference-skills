---
source: https://tediousjs.github.io/node-mssql/#bulk-table-options-callback
---

# bulk (table, [options,] [callback])

Perform a bulk insert.

## Signature / Usage

```javascript
const table = new sql.Table('table_name') // or temporary table, e.g. #temptable
table.create = true
table.columns.add('a', sql.Int, {nullable: true, primary: true})
table.columns.add('b', sql.VarChar(50), {nullable: false})
table.rows.add(777, 'test')

const request = new sql.Request()
request.bulk(table, (err, result) => {
    // ... error checks
})
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| table | `sql.Table` | Table instance to bulk insert. |
| options | object | Options object to be passed through to driver (currently tedious only). Optional. If argument is a function it will be treated as the callback. |
| callback | `(err, rowCount)` | Called after bulk insert has completed, or an error has occurred. Optional. If omitted, returns Promise. |

## Notes

- Always indicate whether the column is nullable or not.
- If you set `table.create` to `true`, module will check if the table exists before it start sending data. If it doesn't, it will automatically create it. You can specify primary key columns by setting `primary: true` to column's options. Primary key constraint on multiple columns is supported.
- You can also create Table variable from any recordset with `recordset.toTable()`. You can optionally specify table type name in the first argument.
- Errors: `ENAME` (`RequestError`, table name must be specified for bulk insert), `ETIMEOUT` (`RequestError`, request timeout), `EREQUEST` (`RequestError`, message from SQL Server), `ECANCEL` (`RequestError`, cancelled), `ENOCONN` (`RequestError`, no connection is specified for that request), `ENOTOPEN` (`ConnectionError`, connection not yet open), `ECONNCLOSED` (`ConnectionError`, connection is closed), `ENOTBEGUN` (`TransactionError`, transaction has not begun), `EABORT` (`TransactionError`, transaction was aborted by user or because of an error), `EREQINPROG` (`TransactionError`, can't acquire connection for the request; there is another request in progress), `EINJECT` (`RequestError`, column name or parameter type is not a valid identifier).
- **TIP**: A `VarChar`, `NVarChar` or `VarBinary` column declared without a length (e.g. `sql.NVarChar`) is created as `max` when `table.create` is set, and the tedious driver loads it as `max`. It does so whether or not the table already existed, so when `table.create` is set for an existing table, give such a column its length if the table's column is sized (it loads faster) or a `sql_variant` (which cannot hold a `max` value). Without `table.create`, the tedious driver needs a column declared as `max` (e.g. `sql.NVarChar(sql.MAX)`) to bulk load into an existing `varchar(max)`, `nvarchar(max)` or `varbinary(max)` column. `Xml`, `UDT`, `Geography` and `Geometry` columns are loaded as `max` unless you give them a length.
- Identifier rules (v12.7.9): a column name is emitted as a quoted identifier, so a `]` in it must be doubled (`table.columns.add('a]]b', sql.Int)` names the column `a]b`); a single `]` raises `EINJECT`. The keys of `options.order` are written unquoted into the `ORDER (...)` clause; quote a spaced name yourself. See identifier-rules.md.
- Release notes: v12.7.6 fixed tedious bulk loads into created tables and `Xml` columns; v12.7.9 stopped msnodesqlv8 bulk loads swallowing what their callback throws.
- Migration (v5 → v6): bulk table inserts will attempt to coerce dates from non-`Date` objects if the column type is expecting a date.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [Request](./request.md)
- [cancel](./cancel.md)
- [Identifier rules](../errors-diagnostics/identifier-rules.md)
- [Version Migration Changes](../migration/version-changes.md)
