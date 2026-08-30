---
source: https://tediousjs.github.io/node-mssql/#handling-duplicate-column-names
---

# Handling Duplicate Column Names

If your queries contain output columns with identical names, the default behaviour of `mssql` only returns column metadata for the last column with that name, and you will not always be able to re-assemble the order of output columns requested.

## Signature / Usage

Default behaviour:

```javascript
const request = new sql.Request()
request
    .query("select 'asdf' as name, 'qwerty' as other_name, 'jkl' as name")
    .then(result => {
        console.log(result)
    });
```

Results in:

```javascript
{
  recordsets: [
    [ { name: [ 'asdf', 'jkl' ], other_name: 'qwerty' } ]
  ],
  recordset: [ { name: [ 'asdf', 'jkl' ], other_name: 'qwerty' } ],
  output: {},
  rowsAffected: [ 1 ]
}
```

You can use the `arrayRowMode` configuration parameter to return the row values as arrays and add a separate array of column values. `arrayRowMode` can be set globally during the initial connection, or per-request.

```javascript
const request = new sql.Request()
request.arrayRowMode = true
request
    .query("select 'asdf' as name, 'qwerty' as other_name, 'jkl' as name")
    .then(result => {
        console.log(result)
    });
```

Results in:

```javascript
{
  recordsets: [ [ [ 'asdf', 'qwerty', 'jkl' ] ] ],
  recordset: [ [ 'asdf', 'qwerty', 'jkl' ] ],
  output: {},
  rowsAffected: [ 1 ],
  columns: [
    [
      { index: 0, name: 'name', length: 4, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true },
      { index: 1, name: 'other_name', length: 6, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true },
      { index: 2, name: 'name', length: 3, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true }
    ]
  ]
}
```

### Streaming Duplicate Column Names

When using `arrayRowMode` with `stream` enabled, the output from the `recordset` event is returned as an array of column metadata instead of as a keyed object. The order of the column metadata provided by the `recordset` event matches the order of row values when `arrayRowMode` is enabled.

Default behaviour (without `arrayRowMode`):

```javascript
const request = new sql.Request()
request.stream = true
request.query("select 'asdf' as name, 'qwerty' as other_name, 'jkl' as name")
request.on('recordset', recordset => console.log(recordset))
```

Results in:

```javascript
{
  name: { index: 2, name: 'name', length: 3, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true },
  other_name: { index: 1, name: 'other_name', length: 6, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true }
}
```

With `arrayRowMode`:

```javascript
const request = new sql.Request()
request.stream = true
request.arrayRowMode = true
request.query("select 'asdf' as name, 'qwerty' as other_name, 'jkl' as name")

request.on('recordset', recordset => console.log(recordset))
```

Results in:

```javascript
[
  { index: 0, name: 'name', length: 4, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true },
  { index: 1, name: 'other_name', length: 6, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true },
  { index: 2, name: 'name', length: 3, type: [sql.VarChar], scale: undefined, precision: undefined, nullable: false, caseSensitive: false, identity: false, readOnly: true }
]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `arrayRowMode` | `boolean` | Global (connection) or per-request setting. Returns row values as arrays plus a separate `columns` array instead of keyed objects, preserving order for duplicate column names |

## Related

- [Metadata](./metadata.md)
- [Response Schema](./response-schema.md)
