---
source: https://orm.drizzle.team/docs/custom-types
---

# Custom types

`customType` from `drizzle-orm/pg-core` lets you define your own column type with a custom SQL data type and JS/DB value transforms.

## Signature / Usage

```ts
import { customType, pgTable } from "drizzle-orm/pg-core";

const customText = customType<{ data: string }>({
  dataType() {
    return "text";
  },
});

export const users = pgTable("users", {
  name: customText(),
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `data` | generic (required) | TypeScript type of the column after select/insert |
| `driverData` | generic | type the DB driver accepts for this column |
| `config` | generic | config object type passed to `dataType(config)` (e.g. `{ length: number }`) |
| `configRequired` | generic (`boolean`) | whether `config` is mandatory; default `false` |
| `notNull` / `default` | generic (`boolean`) | mark the custom type as `notNull`/having a default by default |
| `dataType(config)` | method (required) | returns the SQL type string, e.g. `'integer'`, `'varchar(256)'` |
| `toDriver(value)` | method | transforms a JS value into the driver-accepted format before writing |
| `fromDriver(value)` | method | transforms the driver's raw value into the JS `data` type after reading |
| `codec` | `string \| (config) => string \| undefined` | selects which built-in driver codec normalizes/casts this type (see Codecs) |
| `driverOutput` / `jsonData` / `fromJson` / `forJsonSelect` | — | **deprecated**, use `codec` instead |

## Notes

- Transform order: writes run `toDriver` first, then the codec's `normalizeParam`; reads run the codec's `normalize` first, then `fromDriver`. If no codec is set only `toDriver`/`fromDriver` run; if neither is set, values pass through untouched
- `driverOutput`, `jsonData`, `fromJson`, and `forJsonSelect` are deprecated in favor of `codec`, which also covers relational-query JSON contexts

## Related

- [Codecs](./codecs.md)
- [Generated Columns](./generated-columns.md)
