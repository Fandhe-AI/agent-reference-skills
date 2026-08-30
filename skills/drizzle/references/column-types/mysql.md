---
source: https://orm.drizzle.team/docs/column-types/mysql
---

# MySQL column types

Drizzle has native support for all standard MySQL column types. If a type isn't covered, define a custom type.

## Signature / Usage

```typescript
import { sql } from "drizzle-orm";
import { int, mysqlTable, serial, text, timestamp, varchar } from "drizzle-orm/mysql-core";

export const table = mysqlTable('table', {
	id: serial(),
	int: int({ unsigned: true }),
	name: varchar({ length: 256 }),
	bio: text(),
	createdAt: timestamp().defaultNow(),
	count: int().default(sql`3`),
});
```

## Options / Props

| Type | Description |
| --- | --- |
| `int` | 4-byte integer; `unsigned: true` doubles the upper range |
| `tinyint` | 1-byte integer |
| `smallint` | 2-byte integer |
| `mediumint` | 3-byte integer |
| `bigint` | 8-byte integer; `mode: 'number' \| 'bigint' \| 'string'`, `unsigned` |
| `real` | Floating-point number; `precision`, `scale` |
| `decimal` | Exact fixed-point number, up to 65 digits; `precision`, `scale`, `mode` |
| `double` | 8-byte double-precision float; `precision`, `scale` |
| `float` | 4-byte single-precision float |
| `serial` | Alias for `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE` |
| `binary` | Fixed-length byte string, right-padded with `0x00` |
| `varbinary` | Variable-length byte string |
| `blob` / `tinyblob` / `mediumblob` / `longblob` | Binary large object, size-tiered; `mode: 'buffer' \| 'string'` |
| `char` | Fixed-length string (0-255); supports `enum` |
| `varchar` | Variable-length string (0-65,535); supports `enum` |
| `text` / `tinytext` / `mediumtext` / `longtext` | Text, size-tiered; supports `enum` |
| `boolean` | Synonym for `TINYINT(1)` |
| `date` | `'YYYY-MM-DD'`; `mode: 'date' \| 'string'` |
| `datetime` | `'YYYY-MM-DD hh:mm:ss'`; `mode`, `fsp: 0..6` |
| `time` | `'hh:mm:ss'`; `fsp: 0..6` |
| `year` | 1-byte year value `YYYY` |
| `timestamp` | UTC-converted date and time; `mode`, `fsp: 0..6` |
| `json` | Native JSON; supports `.$type<T>()` |
| `mysqlEnum` | String from a permitted, ordered value list |

## Notes

- All integer types are `signed` by default; `{ unsigned: true }` restricts to non-negative values and doubles the upper range
- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.autoincrement()` marks a column `AUTO_INCREMENT`
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime; they do not affect `drizzle-kit` migrations
- Source: `mysql/column-types.mdx`

## Related

- [pg](./pg.md)
- [sqlite](./sqlite.md)
- [singlestore](./singlestore.md)
