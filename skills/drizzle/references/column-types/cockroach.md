---
source: https://orm.drizzle.team/docs/column-types/cockroach
---

# CockroachDB column types

Drizzle has native support for all standard CockroachDB column types. If a type isn't covered, define a custom type.

## Signature / Usage

```typescript
import { bigint, bool, cockroachTable, jsonb, text, timestamp, uuid, varchar } from "drizzle-orm/cockroach-core";

export const table = cockroachTable('table', {
	uid: uuid().defaultRandom(),
	active: bool(),
	name: varchar({ length: 256 }),
	bio: text(),
	meta: jsonb(),
	count: bigint({ mode: 'number' }),
	createdAt: timestamp().defaultNow(),
});
```

## Options / Props

| Type | Aliases | Description |
| --- | --- | --- |
| `bigint` | `int`, `int8`, `int64`, `integer` | Signed 8-byte integer; `mode: 'number' \| 'bigint'` |
| `smallint` | `int2` | Small-range signed 2-byte integer |
| `int4` | — | Signed 4-byte integer |
| `int8` | — | Alias of `bigint` |
| `int2` | — | Alias of `smallint` |
| `bool` | — | Standard SQL boolean |
| `string` | `text`, `varchar`, `char` | Unicode character string; supports `enum`, `length` |
| `text` | — | CockroachDB alias for `string`; supports `enum` |
| `varchar` | `character varying(n)` | `string` alias kept for PostgreSQL compatibility; supports `enum` |
| `char` | `character(n)` | `string` alias kept for PostgreSQL compatibility; supports `enum` |
| `decimal` | `numeric`, `dec` | Exact fixed-point number; `precision`, `scale`, `mode` |
| `numeric` | — | Alias of `decimal` |
| `float` | `float8`, `double precision` | Approximate floating-point number |
| `real` | `float4` | Single-precision floating-point number (4 bytes) |
| `double precision` | — | Alias of `float` |
| `jsonb` | — | Binary JSON; supports `.$type<T>()` |
| `bit` | — | Fixed-length bit array; `length` |
| `varbit` | — | Variable-length bit array; `length` |
| `uuid` | — | 128-bit Universally Unique Identifier; `.defaultRandom()` |
| `time` | `timetz` | Time of day in UTC (or with timezone offset); `withTimezone`, `precision` |
| `timestamp` | `timestamptz` | Date and time pair in UTC; `mode`, `withTimezone`, `precision` |
| `date` | — | Calendar date; `mode: 'date' \| 'string'` |
| `interval` | — | Time span; `fields`, `precision` |
| `cockroachEnum` | — | Enumerated type, declared separately then used as a column |

## Notes

- Migration (v0 → v1): CockroachDB support (`cockroach-core`, `cockroachTable`) is new in drizzle-orm/drizzle-kit `1.0.0-beta.2` and higher; it did not exist in v0
- `.generatedAlwaysAsIdentity()` / `.generatedByDefaultAsIdentity()` define identity columns backed by sequences, shared with the PostgreSQL dialect
- `.$type<T>()` customizes the inferred TypeScript type for branded/unknown values without runtime checks
- `.$defaultFn()` / `.$onUpdateFn()` generate values at runtime; they do not affect `drizzle-kit` migrations
- Source: `column-types/cockroach.mdx`

## Related

- [pg](./pg.md)
- [mssql](./mssql.md)
