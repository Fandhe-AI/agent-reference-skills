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
- Errors: `ENAME` (`RequestError`, table name must be specified for bulk insert), `ETIMEOUT` (`RequestError`, request timeout), `EREQUEST` (`RequestError`, message from SQL Server), `ECANCEL` (`RequestError`, cancelled), `ENOCONN` (`RequestError`, no connection is specified for that request), `ENOTOPEN` (`ConnectionError`, connection not yet open), `ECONNCLOSED` (`ConnectionError`, connection is closed), `ENOTBEGUN` (`TransactionError`, transaction has not begun), `EABORT` (`TransactionError`, transaction was aborted by user or because of an error).
- Migration (v5 → v6): bulk table inserts will attempt to coerce dates from non-`Date` objects if the column type is expecting a date.

## Related

- [Request](./request.md)
- [cancel](./cancel.md)
- [Version Migration Changes](../migration/version-changes.md)
