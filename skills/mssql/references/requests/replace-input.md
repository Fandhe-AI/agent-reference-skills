---
source: https://tediousjs.github.io/node-mssql/#replaceinput-name-type-value
---

# replaceInput (name, type, value)

Replace an existing input parameter on the request. If the parameter was previously added with `input()`, it is removed and re-added with the new type and value. Useful when building queries dynamically or re-using a `Request` object.

## Signature / Usage

```javascript
request.input('myval', sql.Int, 1)
request.replaceInput('myval', sql.Int, 2)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the input parameter without `@` char. |
| type | SQL data type | SQL data type of input parameter. |
| value | any | Input parameter value. |

## Notes

- Unlike `input()`, `replaceInput()` requires an explicit SQL type — auto type inference is not supported.
- Migration (v5 → v6): attempting to add a parameter with the same name to a query/stored procedure via `input()` now throws an error instead of silently overwriting; use `replaceInput()` to change an existing parameter's type/value.

## Related

- [input](./input.md)
- [replace-output](./replace-output.md)
- [Version Migration Changes](../migration/version-changes.md)
