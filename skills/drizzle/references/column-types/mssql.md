---
source: https://orm.drizzle.team/docs/column-types/mssql
---

# MSSQL column types

Drizzle has native support for all standard MSSQL column types. If a type isn't covered, define a custom type.

## Signature / Usage

```typescript
import { bit, int, mssqlTable, nvarchar, varchar } from "drizzle-orm/mssql-core";

export const table = mssqlTable('table', {
	id: int().primaryKey(),
	active: bit(),
	name: varchar({ length: 256 }),
	json: nvarchar({ mode: 'json' }),
});
```

## Options / Props

| Type | Description |
| --- | --- |
| `int` | Signed 4-byte integer |
| `smallint` | Signed 2-byte integer |
| `tinyint` | Signed 1-byte integer |
| `bigint` | Signed 8-byte integer; `mode: 'number' \| 'bigint' \| 'string'` |
| `bit` | `1`, `0`, or `NULL`; Drizzle accepts `true`/`false` |
| `text` | Non-Unicode variable-length data, max 2^31-1 chars; supports `enum` |
| `ntext` | Unicode variable-length data, max 2^30-1 chars; supports `enum` |
| `varchar` | Variable-size string, `length` in bytes (1-8,000) or `'max'`; supports `enum` |
| `nvarchar` | Variable-size Unicode string, `length` in byte-pairs; supports `enum`, `mode: 'json'` |
| `char` | Fixed-size string, `length` in bytes (1-8,000); supports `enum` |
| `nchar` | Fixed-size Unicode string, `length` in byte-pairs (1-4,000); supports `enum` |
| `binary` | Fixed-length binary data (1-8,000 bytes) |
| `varbinary` | Variable-length binary data, `length` or `'max'` |
| `numeric` | Fixed precision/scale number; `precision`, `scale` |
| `decimal` | Alias of `numeric` |
| `real` | ISO synonym for `float(24)` |
| `float` | Approximate number; `precision` (1-53, default 53) |
| `time` | Time of day, no time zone, 24-hour clock; `mode`, `precision` |
| `date` | Calendar date; `mode: 'date' \| 'string'` |
| `datetime` | Date + time with fractional seconds; `mode: 'date' \| 'string'` |
| `datetime2` | Extended `datetime` with larger range/precision; `mode: 'date' \| 'string'` |
| `datetimeoffset` | `datetime2` with UTC time zone awareness; `mode: 'date' \| 'string'` |

## Notes

- Migration (v0 → v1): MSSQL support (`mssql-core`, `mssqlTable`) is new in drizzle-orm/drizzle-kit `1.0.0-beta.2` and higher; it did not exist in v0
- Avoid `datetime` for new work; prefer `time`, `date`, `datetime2`, or `datetimeoffset` per Microsoft's own SQL Server guidance
- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime; they do not affect `drizzle-kit` migrations
- The low-level node-mssql driver client used to connect to SQL Server is covered by the separate `mssql` skill; this page only covers Drizzle's `mssql-core` column builders
- Source: `column-types/mssql.mdx`

## Related

- [pg](./pg.md)
- [cockroach](./cockroach.md)
