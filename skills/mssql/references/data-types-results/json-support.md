---
source: https://tediousjs.github.io/node-mssql/#json-support
---

# JSON support

SQL Server 2016 introduced built-in JSON serialization. By default, JSON is returned as plain text in a special column named `JSON_F52E2B61-18A1-11d1-B105-00805F49916B`.

## Signature / Usage

```sql
SELECT
    1 AS 'a.b.c',
    2 AS 'a.b.d',
    3 AS 'a.x',
    4 AS 'a.y'
FOR JSON PATH
```

Results in:

```javascript
recordset = [ { 'JSON_F52E2B61-18A1-11d1-B105-00805F49916B': '{"a":{"b":{"c":1,"d":2},"x":3,"y":4}}' } ]
```

You can enable the built-in JSON parser with `config.parseJSON = true`. Once enabled, `recordset` will contain rows of parsed JS objects. Given the same example, the result will look like this:

```javascript
recordset = [ { a: { b: { c: 1, d: 2 }, x: 3, y: 4 } } ]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `config.parseJSON` | `boolean` | When `true`, parses the `FOR JSON` output column into JS objects instead of returning raw JSON text |

## Notes

- In order for `parseJSON` to work, there must be exactly one column named `JSON_F52E2B61-18A1-11d1-B105-00805F49916B` in the recordset
- More information about JSON support can be found in the [official SQL Server documentation](https://msdn.microsoft.com/en-us/library/dn921882.aspx)

## Related

- [Response Schema](./response-schema.md)
