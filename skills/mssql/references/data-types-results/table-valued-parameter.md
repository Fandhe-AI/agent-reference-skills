---
source: https://tediousjs.github.io/node-mssql/#table-valued-parameter-tvp
---

# Table-Valued Parameter (TVP)

Pass a `sql.Table` as a parameter to a stored procedure. Supported on SQL Server 2008 and later.

## Signature / Usage

First, create a custom type in the database:

```sql
CREATE TYPE TestType AS TABLE ( a VARCHAR(50), b INT );
```

Next, create a stored procedure that accepts it:

```sql
CREATE PROCEDURE MyCustomStoredProcedure (@tvp TestType readonly) AS SELECT * FROM @tvp
```

Back in the Node.js app:

```javascript
const tvp = new sql.Table() // You can optionally specify table type name in the first argument.

// Columns must correspond with type we have created in database.
tvp.columns.add('a', sql.VarChar(50))
tvp.columns.add('b', sql.Int)

// Add rows
tvp.rows.add('hello tvp', 777) // Values are in same order as columns.
```

Send the table as a parameter to the stored procedure:

```javascript
const request = new sql.Request()
request.input('tvp', tvp)
request.execute('MyCustomStoredProcedure', (err, result) => {
    // ... error checks

    console.dir(result.recordsets[0][0]) // {a: 'hello tvp', b: 777}
})
```

You can clear the table rows for easier batching by using `table.rows.clear()`:

```js
const tvp = new sql.Table() // You can optionally specify table type name in the first argument.

// Columns must correspond with type we have created in database.
tvp.columns.add('a', sql.VarChar(50))
tvp.columns.add('b', sql.Int)

// Add rows
tvp.rows.add('hello tvp', 777) // Values are in same order as columns.
tvp.rows.clear()
```

## Notes

- You can also create a Table variable from any recordset with `recordset.toTable()`. You can optionally specify a table type name in the first argument
- Column order in `tvp.columns.add()` must correspond with the column order in the database-side custom type

## Related

- [Data Types](./data-types.md)
- [Geography and Geometry](./geography-geometry.md)
