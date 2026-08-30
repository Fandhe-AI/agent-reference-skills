---
source: https://tediousjs.github.io/node-mssql/#data-types
---

# Data Types

The full list of SQL Server data types supported by `mssql` for `request.input()` / `request.output()`, with optional length/precision/scale.

## Signature / Usage

```javascript
request.input("name", sql.VarChar, "abc")               // varchar(3)
request.input("name", sql.VarChar(50), "abc")           // varchar(50)
request.input("name", sql.VarChar(sql.MAX), "abc")      // varchar(MAX)
request.output("name", sql.VarChar)                     // varchar(8000)
request.output("name", sql.VarChar, "abc")               // varchar(3)

request.input("name", sql.Decimal, 155.33)              // decimal(18, 0)
request.input("name", sql.Decimal(10), 155.33)          // decimal(10, 0)
request.input("name", sql.Decimal(10, 2), 155.33)       // decimal(10, 2)

request.input("name", sql.DateTime2, new Date())        // datetime2(7)
request.input("name", sql.DateTime2(5), new Date())     // datetime2(5)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `sql.Bit` | numeric | Boolean-like bit type |
| `sql.BigInt` | numeric | 64-bit integer |
| `sql.Decimal([precision], [scale])` | numeric | Fixed precision/scale decimal |
| `sql.Float` | numeric | Floating point |
| `sql.Int` | numeric | 32-bit integer |
| `sql.Money` | numeric | Currency |
| `sql.Numeric([precision], [scale])` | numeric | Fixed precision/scale numeric |
| `sql.SmallInt` | numeric | 16-bit integer |
| `sql.SmallMoney` | numeric | Small currency |
| `sql.Real` | numeric | Single precision float |
| `sql.TinyInt` | numeric | 8-bit integer |
| `sql.Char([length])` | character | Fixed-length ANSI string |
| `sql.NChar([length])` | character | Fixed-length Unicode string |
| `sql.Text` | character | Variable ANSI text |
| `sql.NText` | character | Variable Unicode text |
| `sql.VarChar([length])` | character | Variable-length ANSI string |
| `sql.NVarChar([length])` | character | Variable-length Unicode string |
| `sql.Xml` | character | XML data |
| `sql.Time([scale])` | date/time | Time of day |
| `sql.Date` | date/time | Calendar date |
| `sql.DateTime` | date/time | Date and time |
| `sql.DateTime2([scale])` | date/time | Date and time, higher precision |
| `sql.DateTimeOffset([scale])` | date/time | Date and time with timezone offset |
| `sql.SmallDateTime` | date/time | Lower precision date and time |
| `sql.UniqueIdentifier` | other | GUID |
| `sql.Variant` | other | `sql_variant` |
| `sql.Binary` | binary | Fixed-length binary data |
| `sql.VarBinary([length])` | binary | Variable-length binary data |
| `sql.Image` | binary | Legacy large binary data |
| `sql.UDT` | other | CLR user-defined type |
| `sql.Geography` | other | Geography CLR type |
| `sql.Geometry` | other | Geometry CLR type |

## Notes

- Use `sql.MAX` as the length for `VarChar`, `NVarChar` and `VarBinary` to set up MAX length
- `sql.XML` and `sql.Variant` are not supported as input parameters

## Related

- [Geography and Geometry](./geography-geometry.md)
- [Table-Valued Parameter (TVP)](./table-valued-parameter.md)
- [Metadata](./metadata.md)
