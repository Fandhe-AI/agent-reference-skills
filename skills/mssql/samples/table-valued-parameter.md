---
source: https://tediousjs.github.io/node-mssql/#table-valued-parameter-tvp
---

# Table-Valued Parameter (TVP)

Pass a `sql.Table` as a single parameter to a stored procedure (SQL Server 2008+).

Create the custom type and stored procedure in the database first:

```sql
CREATE TYPE TestType AS TABLE ( a VARCHAR(50), b INT );
```

```sql
CREATE PROCEDURE MyCustomStoredProcedure (@tvp TestType readonly) AS SELECT * FROM @tvp
```

Build the table variable and pass it as an input parameter:

```javascript
const tvp = new sql.Table() // You can optionally specify table type name in the first argument.

// Columns must correspond with type we have created in database.
tvp.columns.add('a', sql.VarChar(50))
tvp.columns.add('b', sql.Int)

// Add rows
tvp.rows.add('hello tvp', 777) // Values are in same order as columns.

const request = new sql.Request()
request.input('tvp', tvp)
request.execute('MyCustomStoredProcedure', (err, result) => {
    // ... error checks

    console.dir(result.recordsets[0][0]) // {a: 'hello tvp', b: 777}
})
```

## Notes

- Column order in `tvp.columns.add()` must match the SQL type definition; `tvp.rows.add()` values are positional in that same order
- `request.input('tvp', tvp)` passes the table directly — no explicit SQL type argument is needed
- `table.rows.clear()` empties rows for reuse across batches without recreating the `Table` instance
