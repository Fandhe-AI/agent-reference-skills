# Redis Search — Schema Definition

Every search index requires a schema describing the structure of searchable documents. The `s` schema builder from `@upstash/redis` defines field types and options.

## Signature / Usage

```ts
import { Redis, s } from "@upstash/redis"

const redis = Redis.fromEnv()

const schema = s.object({
  name: s.string(),
  description: s.string(),
  category: s.string().noTokenize(),
  price: s.number("F64"),
  inStock: s.boolean(),
})

const products = await redis.search.createIndex({
  name: "products",
  dataType: "json",
  prefix: "product:",
  schema,
})
```

```bash
SEARCH.CREATE products ON JSON PREFIX 1 product: SCHEMA name TEXT price F64 FAST rating F64 FAST
```

## Options / Props

Field types:

| SDK Method | Redis CLI Type | Description | Supports FAST | Multiple values | Range Operators | Text Operators |
|------------|----------------|-------------|---------------|-----------------|-----------------|----------------|
| `s.string()` | `TEXT` | Full-text searchable field with tokenization and stemming | No | Yes | No | `$smart`, `$phrase`, `$fuzzy`, `$regex` |
| `s.keyword()` | `KEYWORD` | Exact-match string (no tokenization) | Yes | Yes | Yes (`$gt`, `$gte`, `$lt`, `$lte`) | No |
| `s.number()` | `F64` (default), `U64`, `I64` | Numeric field | Yes | Yes | Yes | No |
| `s.date()` | `DATE` | Date/time field | Yes | Yes | Yes | No |
| `s.boolean()` | `BOOL` | Boolean field | Yes | No | No | No |
| `s.facet()` | `FACET` | Hierarchical path-based field | No | No | No | No (only `$eq`, `$in`) |

Field options (chainable):

| Option | Description |
|--------|-------------|
| `.noTokenize()` | Keep the whole value as one token (emails, URLs, SKUs, UUIDs, slugs) |
| `.noStem()` | Disable stemming (brand names, proper nouns, technical terms, regex targets) |
| `.fast(false)` | Disable the FAST columnar store (numeric `F64`, boolean, date are FAST by default in the TS SDK) |
| `.from("path")` | Alias: index an existing document field under another name (`FROM` in CLI) |

Multi-value storage by index data type:

| Index data type | How to store multiple values | Example |
|-----------------|------------------------------|---------|
| `JSON` | A JSON array in the document | `JSON.SET product:1 $ '{"tags":["new","sale"]}'` |
| `STRING` | A JSON array inside the JSON object stored in the string | `SET product:1 '{"tags":["new","sale"]}'` |
| `HASH` | A complete, JSON-encoded array in the hash field string | `HSET product:1 tags '["new","sale"]'` |
| `STREAM` | A complete, JSON-encoded array in the stream field string | `XADD events * services '["checkout","payments"]'` |

## Notes

- `s.number()` defaults to `F64` in the TypeScript SDK; use `s.number("U64")` / `s.number("I64")` for unsigned / signed 64-bit integers. In Redis CLI, `FAST` must be added explicitly after the field type.
- FAST fields enable `ORDERBY`, `SCOREFUNC FIELDVALUE`, and metric aggregations (`$avg`, `$sum`, `$min`, `$max`, `$count`, ...). Using them on a non-FAST field returns an error.
- Tokenization splits on spaces and punctuation (`"user@example.com"` -> `["user", "example", "com"]`). Stemming reduces words to roots (`"running"`, `"runs"`, `"runner"` -> `"run"`). Both are on by default for text fields.
- `KEYWORD` supports `$eq`, `$in`, `$gt`, `$gte`, `$lt`, `$lte`; these are not available on `TEXT`. `FACET` values must be `/`-delimited paths starting with `/` and support only `$eq` / `$in`; they are mainly used with the `$facet` aggregation.
- Multi-value: declare the field as `TEXT`, `KEYWORD`, `U64`, `I64`, `F64`, or `DATE`, then store a JSON array. There is no separator option (`new,sale` stays one value). Invalid elements are ignored; an empty array acts like a missing field. `BOOL` and `FACET` do not support arrays. A query matches when any indexed element satisfies the condition. `TEXT` phrases cannot span elements.
- Aliased fields: use the alias name in queries and highlighting; use the actual document field name in `select`. Aliasing happens at index level and does not modify documents.
- Fields in a document that are not in the schema are ignored; a document missing a schema field does not appear in results that filter on that field.
- Nested objects are supported with `s.object({ author: s.object({ name: s.string() }) })`. In Python / CLI use dotted paths such as `user.name`.
- Python equivalent uses a dict, e.g. `{"sku": {"type": "TEXT", "notokenize": True}, "createdAt": {"type": "DATE", "fast": True}}`.
- Source: https://upstash.com/docs/redis/search/schema-definition (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Introduction](./search-introduction.md)
- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Index Management](./search-index-management.md)
- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Aggregations](./search-aggregations.md)
