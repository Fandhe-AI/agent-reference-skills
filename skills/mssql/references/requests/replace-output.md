---
source: https://tediousjs.github.io/node-mssql/#replaceoutput-name-type-value
---

# replaceOutput (name, type, [value])

Replace an existing output parameter on the request.

## Signature / Usage

```javascript
request.output('myval', sql.Int)
request.replaceOutput('myval', sql.BigInt)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| name | string | Name of the output parameter without `@` char. |
| type | SQL data type | SQL data type of output parameter. |
| value | any | Output parameter value initial value. Optional. |

## Notes

- Migration (v5 → v6): attempting to add a parameter with the same name via `output()` now throws an error instead of silently overwriting; use `replaceOutput()` to change an existing output parameter's type/value.
- `Request` here is node-mssql's query-execution object — unrelated to the HTTP `Request` in the `fastify` / `hono` / `go-echo` skills.

## Related

- [output](./output.md)
- [replace-input](./replace-input.md)
- [Version Migration Changes](../migration/version-changes.md)
