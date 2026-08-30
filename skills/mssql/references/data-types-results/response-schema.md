---
source: https://tediousjs.github.io/node-mssql/#response-schema
---

# Response Schema

The shape of the object returned from a successful basic query.

## Signature / Usage

```javascript
{
	recordsets: [
		[
			{
				COL1: "some content",
				COL2: "some more content"
			}
		]
	],
	recordset: [
		{
			COL1: "some content",
			COL2: "some more content"
		}
	],
	output: {},
	rowsAffected: [1]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `recordsets` | `Array<Array<object>>` | One array of rows per resultset returned by the query |
| `recordset` | `Array<object>` | Shortcut to the first resultset in `recordsets` |
| `output` | `object` | Values of output parameters, keyed by parameter name |
| `rowsAffected` | `number[]` | Number of rows affected by each statement, in order |

## Notes

- Migration (v3 → v4): every callback/resolve now returns this single `result` object only (`recordsets`, `recordset`, `rowsAffected`, `output`) — this shape did not exist before v4.

## Related

- [Affected Rows](./affected-rows.md)
- [Metadata](./metadata.md)
- [Handling Duplicate Column Names](./duplicate-column-names.md)
- [Version Migration Changes](../migration/version-changes.md)
