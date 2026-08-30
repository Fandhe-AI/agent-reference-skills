---
source: https://tediousjs.github.io/node-mssql/#input-name-type-value
---

# input (name, [type], value)

Add an input parameter to the request.

## Signature / Usage

```javascript
request.input('input_parameter', value)
request.input('input_parameter', sql.Int, value)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the input parameter without `@` char. |
| type | SQL data type | If you omit type, module automatically decide which SQL data type should be used based on JS data type. |
| value | any | Input parameter value. `undefined` and `NaN` values are automatically converted to `null` values. |

## JS Data Type To SQL Data Type Map

| JS Data Type | SQL Data Type |
|---|---|
| `String` | `sql.NVarChar` |
| `Number` | `sql.Int` |
| `Boolean` | `sql.Bit` |
| `Date` | `sql.DateTime` |
| `Buffer` | `sql.VarBinary` |
| `sql.Table` | `sql.TVP` |

Default data type for unknown object is `sql.NVarChar`.

When a `Number` value is provided without an explicit type, the library inspects the value to choose the best SQL type:

- Integers within the 32-bit signed range -> `sql.Int`
- Integers outside the 32-bit range -> `sql.BigInt`
- Non-integer numbers -> `sql.Float`

JavaScript `bigint` primitives follow the same range logic (`sql.Int` for values within the 32-bit signed range, `sql.BigInt` otherwise).

You can define your own type map.

```javascript
sql.map.register(MyClass, sql.Text)
```

You can also overwrite the default type map.

```javascript
sql.map.register(Number, sql.BigInt)
```

## Notes

- Errors (synchronous): `EARGS` (`RequestError`, invalid number of arguments), `EINJECT` (`RequestError`, SQL injection warning).
- Do not use parameters `@p{n}` as these are used by the internal drivers and cause a conflict.

## Related

- [output](./output.md)
- [replace-input](./replace-input.md)
