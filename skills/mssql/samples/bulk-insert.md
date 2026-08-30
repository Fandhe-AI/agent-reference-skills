---
source: https://tediousjs.github.io/node-mssql/#bulk-table-options-callback
---

# Bulk insert

Insert many rows in a single round trip using `sql.Table` and `request.bulk()`.

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

## Notes

- Always specify `nullable` for every column
- Setting `table.create = true` makes the module check for the table and auto-create it if missing; `primary: true` on a column marks it as (part of) the primary key
- You can build a `Table` from any existing recordset with `recordset.toTable()`
