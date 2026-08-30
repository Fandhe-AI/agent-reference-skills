---
source: https://tediousjs.github.io/node-mssql/#output-name-type-value
---

# output (name, type, [value])

Add an output parameter to the request.

## Signature / Usage

```javascript
request.output('output_parameter', sql.Int)
request.output('output_parameter', sql.VarChar(50), 'abc')
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the output parameter without `@` char. |
| type | SQL data type | SQL data type of output parameter. |
| value | any | Output parameter value initial value. `undefined` and `NaN` values are automatically converted to `null` values. Optional. |

## Notes

- Errors (synchronous): `EARGS` (`RequestError`, invalid number of arguments), `EINJECT` (`RequestError`, SQL injection warning).

## Related

- [input](./input.md)
- [replace-output](./replace-output.md)
