# Metadata Filtering

SQL-like filter expressions that restrict vector similarity search results. Only vectors whose metadata matches the filter are returned.

## Signature / Usage

```ts
// Equality
await index.query({ vector: [...], topK: 5, filter: "genre = 'fantasy'" });

// Numeric comparison
await index.query({ vector: [...], topK: 5, filter: "year >= 2020" });

// Boolean logic
await index.query({
  vector: [...],
  topK: 5,
  filter: "genre = 'fantasy' AND year > 2000",
});

// IN operator
await index.query({ vector: [...], topK: 5, filter: "genre IN ('fantasy', 'sci-fi')" });

// Nested object (dot notation)
await index.query({ vector: [...], topK: 5, filter: "geography.country = 'US'" });

// Array membership
await index.query({ vector: [...], topK: 5, filter: "CONTAINS(tags, 'new')" });

// Pattern matching
await index.query({ vector: [...], topK: 5, filter: "title GLOB 'Lord*'" });
```

## Options / Props

**Supported value types:**

| Type | Example |
|------|---------|
| String | `'fantasy'`, `"sci-fi"` |
| Number | `2020`, `3.14` |
| Boolean | `1` (true), `0` (false) |
| Object | Accessed via dot notation |
| Array | Accessed via index or `CONTAINS` |

**Operators:**

| Operator | Description |
|----------|-------------|
| `=` / `!=` | Equals / Not equals (string, number, boolean) |
| `<` `<=` `>` `>=` | Numeric comparisons |
| `GLOB` / `NOT GLOB` | Case-sensitive UNIX wildcard pattern (`*`, `?`, `[]`) |
| `IN (...)` / `NOT IN (...)` | Match against a set of literals |
| `CONTAINS` / `NOT CONTAINS` | Check array field for membership |
| `HAS FIELD` / `HAS NOT FIELD` | Test for JSON key existence |
| `AND` / `OR` | Boolean combination. `AND` has higher precedence than `OR` |
| `(...)` | Grouping to override default precedence |

**Advanced access patterns:**

| Syntax | Description |
|--------|-------------|
| `obj.field` | Dot notation for nested objects |
| `arr[0]` | Array index access |
| `arr[#-1]` | Last element access |

## Notes

- Filters use in-filtering combined with post-filtering. A per-query budget limits the number of candidate vectors evaluated; exhausting it triggers post-filtering, which may return fewer than `topK` results
- String literals accept both single and double quotes
- Boolean values use `1` / `0`, not `true` / `false`
- Filter expressions are also supported in `delete` (full scan, O(N))

## Related

- [query.md](./query.md)
- [delete.md](./delete.md)
