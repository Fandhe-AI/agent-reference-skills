---
source: https://orm.drizzle.team/docs/codecs
---

# Codecs

Codecs are a driver-aware transform layer between JS values and the database, normalizing differences between PG drivers (`node-postgres`, `postgres-js`, `pglite`, ...) for the same column type, and handling JSON-context serialization (e.g. `bigint` losing precision inside `json_agg`).

## Signature / Usage

```ts
const db = drizzle(client, {
  codecs: {
    "bigint:number": {
      cast: (name) => sql`${name}::text`,
      normalize: BigInt,
    },
  },
});
```

## Options / Props

| Name | Type | Description |
| --- | --- | --- |
| `cast` / `castArray` | function | SQL-level `::type` cast applied on regular `SELECT` (scalar/array) |
| `castInJson` / `castArrayInJson` | function | SQL-level cast applied when the column is selected inside JSON functions (`jsonAgg`, relational queries) |
| `castParam` / `castArrayParam` | function | SQL-level cast applied to param placeholders in `INSERT`/`UPDATE`/`WHERE` |
| `normalize` / `normalizeArray` | function | JS-level transform of a regular `SELECT` result |
| `normalizeInJson` / `normalizeArrayInJson` | function | JS-level transform of a `SELECT` result returned inside JSON |
| `normalizeParam` / `normalizeParamArray` | function | JS-level transform of a JS value before it becomes a driver param |

## Notes

- Codecs are enabled by default — every driver ships default codecs applied automatically when calling `drizzle(client)`
- Every built-in PG column class declares a `codec` string identifier (e.g. `PgInteger` → `'int'`, `PgBigInt64` → `'bigint'`) used as a lookup key into the driver's codec map; if the driver has no entry for that key, the value passes through untouched
- Built-in columns' `codec` identifier itself cannot be changed, but the behavior behind that identifier can be overridden via the `codecs` option passed to `drizzle(client, { codecs: {...} })`
- `customType()` accepts its own `codec` field (string, config-dependent function, or `undefined`) — see Custom types for how `toDriver`/`fromDriver` and codecs combine

## Related

- [Custom types](./custom-types.md)
