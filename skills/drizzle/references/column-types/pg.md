---
source: https://orm.drizzle.team/docs/column-types/pg
---

# PostgreSQL column types

Drizzle has native support for all standard PostgreSQL column types. If a type isn't covered, define a custom type.

## Signature / Usage

```typescript
import { sql } from "drizzle-orm";
import { integer, pgTable, serial, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";

export const table = pgTable('table', {
	id: serial().primaryKey(),
	uid: uuid().defaultRandom(),
	name: varchar({ length: 256 }),
	bio: text(),
	createdAt: timestamp().defaultNow(),
	count: integer().default(sql`10`),
});
```

## Options / Props

| Type | Aliases | Description |
| --- | --- | --- |
| `integer` | `int`, `int4` | Signed 4-byte integer |
| `smallint` | `int2` | Signed 2-byte integer |
| `bigint` | `int8` | Signed 8-byte integer; `mode: 'number' \| 'bigint'` |
| `serial` | `serial4` | Auto-incrementing 4-byte integer |
| `smallserial` | `serial2` | Auto-incrementing 2-byte integer |
| `bigserial` | `serial8` | Auto-incrementing 8-byte integer; `mode: 'number' \| 'bigint'` |
| `boolean` | — | Standard SQL boolean |
| `bytea` | — | Variable-length binary data |
| `text` | — | Unlimited variable-length character string; supports `enum` |
| `varchar` | `character varying(n)` | Variable-length string up to `n` chars; supports `enum` |
| `char` | `character(n)` | Fixed-length blank-padded string; supports `enum` |
| `numeric` | `decimal` | Exact numeric, `precision`/`scale`, `mode: 'number' \| 'bigint'` |
| `real` | `float4` | Single-precision float (4 bytes) |
| `doublePrecision` | `float8` | Double-precision float (8 bytes) |
| `json` | — | Textual JSON; supports `.$type<T>()` |
| `jsonb` | — | Binary JSON, decomposed; supports `.$type<T>()` |
| `uuid` | — | RFC 4122 UUID; `.defaultRandom()` |
| `time` | `timetz` | Time of day; `withTimezone`, `precision` |
| `timestamp` | `timestamptz` | Date and time; `mode: 'date' \| 'string'`, `withTimezone`, `precision` |
| `date` | — | Calendar date; `mode: 'date' \| 'string'` |
| `interval` | — | Time span; `fields`, `precision` |
| `point` | — | Geometric point; `mode: 'tuple' \| 'xy'` |
| `line` | — | Geometric line; `mode: 'tuple' \| 'abc'` |
| `pgEnum` | — | Enumerated type, declared separately then used as a column |
| `inet` | — | IPv4/IPv6 host address |
| `cidr` | — | IPv4/IPv6 network specification |
| `macaddr` | — | MAC address |
| `macaddr8` | — | MAC address in EUI-64 format |

## Notes

- `.generatedAlwaysAsIdentity()` / `.generatedByDefaultAsIdentity()` define PostgreSQL identity columns backed by sequences (`startWith`, `increment`, etc.)
- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime (insert / update); they do not affect `drizzle-kit` migrations
- Source: `pg/column-types.mdx`

## Related

- [mysql](./mysql.md)
- [sqlite](./sqlite.md)
- [cockroach](./cockroach.md)
- [mssql](./mssql.md)
- [singlestore](./singlestore.md)
