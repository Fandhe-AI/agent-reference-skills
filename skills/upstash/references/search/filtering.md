# Filtering

SQL-like filter expressions to narrow `search` and `delete` results by `content` or `metadata` fields.

## Signature / Usage

```ts
const searchResults = await index.search({
  query: "space",
  limit: 2,
  filter: "category = 'classic' AND @metadata.supplier_id = 'SUP-123'",
})
```

## Options / Props

| Operator | Applies to | Description |
|----------|-----------|--------------|
| `=`, `!=` | string, number, boolean | Equality / inequality |
| `<`, `<=`, `>`, `>=` | number | Numeric comparison |
| `GLOB`, `NOT GLOB` | string | Case-sensitive UNIX glob pattern (`*`, `?`, `[...]`) |
| `IN`, `NOT IN` | any | Match against a value list |
| `CONTAINS`, `NOT CONTAINS` | array | Array element presence |
| `HAS FIELD`, `HAS NOT FIELD` | any | JSON field existence |
| `AND`, `OR` | — | Boolean combination (`AND` binds tighter; use parentheses to group) |

## Notes

- `content` fields are referenced directly; `metadata` fields require the `@metadata.` prefix (e.g. `@metadata.supplier_id = 'SUP-123'`)
- Filtering uses a combination of in-filtering and post-filtering governed by a filter budget; if the budget is exhausted the engine falls back to post-filtering and may return fewer results than requested
- Nested objects use dot notation (`geography.coordinates.latitude >= 35.0`); arrays support index access (`economy.major_industries[0]`) including negative indices from the end (`[#-1]`)
- The TypeScript SDK also offers type-safe filter construction via structured objects (e.g. `greaterThanOrEquals`, `glob`, `contains`)
- This is Upstash **Search** filter syntax, distinct from `vector/filtering.md` (Upstash **Vector** metadata filter syntax) in this skill

## Related

- [search.md](./search.md)
- [delete.md](./delete.md)
- [content-and-metadata.md](./content-and-metadata.md)
