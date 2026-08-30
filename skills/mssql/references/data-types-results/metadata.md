---
source: https://tediousjs.github.io/node-mssql/#metadata
---

# Metadata

Recordset metadata is accessible through the `recordset.columns` property.

## Signature / Usage

```javascript
const request = new sql.Request()
request.query('select convert(decimal(18, 4), 1) as first, \'asdf\' as second', (err, result) => {
    console.dir(result.recordset.columns)

    console.log(result.recordset.columns.first.type === sql.Decimal) // true
    console.log(result.recordset.columns.second.type === sql.VarChar) // true
})
```

Columns structure for the example above:

```javascript
{
    first: {
        index: 0,
        name: 'first',
        length: 17,
        type: [sql.Decimal],
        scale: 4,
        precision: 18,
        nullable: true,
        caseSensitive: false,
        identity: false,
        readOnly: true
    },
    second: {
        index: 1,
        name: 'second',
        length: 4,
        type: [sql.VarChar],
        nullable: false,
        caseSensitive: false,
        identity: false,
        readOnly: true
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `index` | `number` | Zero-based column position in the resultset |
| `name` | `string` | Column name |
| `length` | `number` | Declared length of the column type |
| `type` | `ISqlType` | SQL data type constructor (e.g. `sql.Decimal`, `sql.VarChar`) |
| `scale` | `number` | Scale, for numeric/decimal/time types |
| `precision` | `number` | Precision, for numeric/decimal types |
| `nullable` | `boolean` | Whether the column allows `NULL` |
| `caseSensitive` | `boolean` | Whether the column is case-sensitive |
| `identity` | `boolean` | Whether the column is an identity column |
| `readOnly` | `boolean` | Whether the column is read-only |

## Related

- [Data Types](./data-types.md)
- [Handling Duplicate Column Names](./duplicate-column-names.md)
