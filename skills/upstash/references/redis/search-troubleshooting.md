# Redis Search — Troubleshooting

Common Upstash Redis Search errors (index, query, aggregation, schema) and how to fix them, plus how Search differs from RediSearch.

## Signature / Usage

```bash
SEARCH.CREATE products ON JSON PREFIX 1 product: EXISTSOK SCHEMA name TEXT
```

```bash
# Correct
SEARCH.QUERY products '{}' LIMIT 10 OFFSET 20

# Incorrect (RediSearch style)
SEARCH.QUERY products '{}' LIMIT 20 10
```

```bash
# Ensure 'price' has the FAST flag
SEARCH.CREATE products ON JSON PREFIX 1 product: SCHEMA name TEXT price F64 FAST
```

```json
{"avg_price": {"$avg": {"field": "price"}}}
```

## Options / Props

| Error | Cause and fix |
|-------|---------------|
| `ERR Index <name> already exists` | Index already created. Use `existsOk` (SDK) / `EXISTSOK` (CLI), or `SEARCH.DROP <name>` first. With a different schema `EXISTSOK` still errors: drop and recreate or use another name |
| `ERR limit should be a positive number less than 1000` | `LIMIT` must be `1` to `1000`; `LIMIT 0`, `LIMIT 1001+`, and RediSearch-style `LIMIT <offset> <count>` all fail. Use separate `LIMIT` and `OFFSET` keywords |
| `ERR Unknown field operator: $not` | No `$not` operator; use `$mustNot` (e.g. `{"$mustNot": [{"status": "discontinued"}]}`) |
| `Aggregation '<name>' operator '$avg' requires field '<field>' to be FAST` | Metric operators need a `FAST` field. Recreate the index with `F64 FAST`; in the TS SDK numeric `s.number("F64")`, `s.date()` and `s.boolean()` are FAST by default unless `.fast(false)` |
| `Aggregation '<name>' is missing required 'field' property` | Pass `field` in an object: `{"avg_price": {"$avg": {"field": "price"}}}`, not `{"avg_price": {"$avg": "price"}}` |
| `Aggregation '<name>' must be a JSON object` | An alias must map to an operator object, not `{"avg_price": "$avg"}` |

## Notes

- A document value that does not match the schema type (e.g. `"abc"` for a number field) is silently skipped for that field and the document does not match filters on it; a document missing a schema field simply does not match filters on that field, with no error
- Upstash Redis Search (`SEARCH.*`, Tantivy / Rust, JSON filters, `LIMIT <count> OFFSET <offset>`, serverless) is a separate implementation from the open-source RediSearch module (`FT.*`, C, RediSearch query syntax, `LIMIT <offset> <count>`, self-hosted / Redis Cloud); queries must be rewritten when migrating
- Source: https://upstash.com/docs/redis/search/troubleshooting (fetched 2026-11-14; no version pin on the site)

## Related

- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Aggregations](./search-aggregations.md)
- [Redis Search: Index Management](./search-index-management.md)
