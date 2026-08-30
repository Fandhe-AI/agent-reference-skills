---
source: https://orm.drizzle.team/docs/column-types/singlestore
---

# SingleStore column types

Drizzle has native support for all standard SingleStore column types. If a type isn't covered, define a custom type.

## Signature / Usage

```typescript
import { int, singlestoreTable, text, timestamp, varchar } from "drizzle-orm/singlestore-core";

export const table = singlestoreTable('table', {
	int: int().primaryKey(),
	name: varchar({ length: 256 }),
	bio: text(),
	createdAt: timestamp().defaultNow(),
});
```

## Options / Props

| Type | Description |
| --- | --- |
| `int` | Signed integer (0-8 bytes) |
| `tinyint` / `smallint` / `mediumint` | Smaller-width signed integers |
| `bigint` | 8-byte integer; `mode: 'number' \| 'bigint'`, `unsigned` |
| `real` | Floating-point number; `precision`, `scale` |
| `decimal` | Fixed-point number; `precision`, `scale`, `mode` |
| `double` | Double-precision float; `precision`, `scale` |
| `float` | Single-precision float |
| `serial` | Alias for `BIGINT UNSIGNED NOT NULL AUTO_INCREMENT UNIQUE` |
| `binary` / `varbinary` | Fixed/variable-length byte string |
| `char` / `varchar` | Fixed/variable-length string; `varchar` supports `enum` |
| `text` | Variable-length text; supports `enum` |
| `boolean` | Boolean value |
| `date` | Calendar date |
| `datetime` | Date and time; `mode: 'date' \| 'string'` |
| `time` | Time of day |
| `year` | Year value |
| `timestamp` | Date and time; `mode: 'date' \| 'string'` |
| `json` | Native JSON; supports `.$type<T>()` |
| `singlestoreEnum` | String from a permitted, ordered value list |

## Notes

- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.autoincrement()` marks a column `AUTO_INCREMENT`
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime; they do not affect `drizzle-kit` migrations
- Source: `singlestore/column-types.mdx`

## Related

- [mysql](./mysql.md)
- [pg](./pg.md)
