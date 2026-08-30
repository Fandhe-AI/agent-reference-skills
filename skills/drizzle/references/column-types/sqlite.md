---
source: https://orm.drizzle.team/docs/column-types/sqlite
---

# SQLite column types

Per the official [SQLite docs](https://www.sqlite.org/datatype3.html), every stored value has one of the storage classes `NULL`, `INTEGER`, `REAL`, `TEXT`, or `BLOB`. Drizzle has native support for all of them; for anything else define a custom type.

## Signature / Usage

```typescript
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const table = sqliteTable('table', {
	id: integer({ mode: 'number' }).primaryKey({ autoIncrement: true }),
	isActive: integer({ mode: 'boolean' }),
	createdAt: integer({ mode: 'timestamp' }),
	name: text(),
});
```

## Options / Props

| Type | Description |
| --- | --- |
| `integer` | Signed integer (0-8 bytes); `mode: 'number' \| 'boolean' \| 'timestamp' \| 'timestamp_ms'` |
| `real` | 8-byte IEEE floating point value |
| `text` | Text string in the database encoding; supports `enum`, `mode: 'json'` |
| `blob` | Raw blob of data; `mode: 'buffer' \| 'bigint' \| 'json'` |
| `numeric` | Numeric storage class; `mode: 'number' \| 'bigint' \| 'string'` |

## Notes

- SQLite has no native `boolean`; use `integer({ mode: 'boolean' })`
- SQLite has no native `bigint`; use `blob({ mode: 'bigint' })`
- `integer({ mode: 'number' }).primaryKey({ autoIncrement: true })` maps to `INTEGER PRIMARY KEY AUTOINCREMENT`
- Prefer `text('', { mode: 'json' })` over `blob('', { mode: 'json' })` — SQLite JSON functions throw on BLOB arguments
- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime; they do not affect `drizzle-kit` migrations
- Source: `sqlite/column-types.mdx`

## Related

- [pg](./pg.md)
- [mysql](./mysql.md)
- [singlestore](./singlestore.md)
