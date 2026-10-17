# Redis Search — Querying

Queries are JSON filters run with `SEARCH.QUERY` / `index.query()`. Covers response format, smart matching, multi-value fields, pagination, sorting, output control, score functions, and highlighting.

## Signature / Usage

```ts
// Basic search
await index.query({
  filter: { name: "headphones" },
});

// Multiple fields (implicit AND)
await index.query({
  filter: { name: "wireless", category: "electronics" },
});

// Pagination + sort + select
await products.query({
  filter: { inStock: true },
  orderBy: { rating: "DESC" },
  limit: 5,
  offset: 0,
  select: { name: true, price: true },
});
```

```bash
SEARCH.QUERY products '{"name": "headphones"}'
SEARCH.QUERY products '{"inStock": true}' ORDERBY rating DESC LIMIT 5
```

## Options / Props

| Option (TS / CLI) | Description | Default / Constraints |
|-------------------|-------------|-----------------------|
| `limit` / `LIMIT` | Number of results to return | 10; between 1 and 1000 |
| `offset` / `OFFSET` | Number of results to skip | 0; non-negative |
| `orderBy` / `ORDERBY field ASC\|DESC` | Sort by a FAST field | score then reflects the sort field value |
| `select` / `SELECT n field...` | Return only listed fields; `select: {}` / `NOCONTENT` returns keys and scores only | all content |
| `scoreFunc` / `SCOREFUNC` | Adjust relevance using numeric FAST field values | cannot be combined with `ORDERBY` |
| `highlight` / `HIGHLIGHT FIELDS n field... [TAGS pre post]` | Mark matching portions of fields | tags default to `<em>` / `</em>` |

Score function (`FIELDVALUE` entries):

| Setting | Description | Default |
|---------|-------------|---------|
| `MODIFIER` / `modifier` | `none`, `log`, `log1p`, `log2p`, `ln`, `ln1p`, `ln2p`, `square`, `sqrt`, `reciprocal` | `none` |
| `FACTOR` / `factor` | Float multiplier applied after the modifier | `1.0` |
| `MISSING` / `missing` | Fallback when the value is missing or invalid for the modifier | `0.0` |
| `COMBINEMODE` / `combineMode` | How multiple field values combine: `multiply`, `sum` | `multiply` |
| `SCOREMODE` / `scoreMode` | How the combined result applies to the original score: `multiply`, `sum`, `replace` | `multiply` |

```ts
await products.query({
  filter: { name: "headphones" },
  scoreFunc: {
    fields: [
      { field: "popularity", modifier: "log1p" },
      { field: "recencyScore", modifier: "sqrt" },
    ],
    combineMode: "sum",
  },
});

await products.query({
  filter: { description: "wireless noise cancelling" },
  highlight: { fields: ["description"] },
});
```

## Notes

- If the index does not exist, queries return `null`; if nothing matches, an empty array is returned.
- Response is an array of `{ key, score, data }`. In the raw CLI response each item is `[key, score, [[field, value], ...]]`.
- Smart matching applies when a value is given directly: numeric / boolean / date fields use exact equality; single-word text values do a term search; multi-word values combine phrase, term, and fuzzy matching with different boosts; double-quoted values (`"\"noise cancelling\""`) force exact phrase matching. Use explicit operators such as `$phrase` or `$fuzzy` for more control.
- Multi-value fields: a condition matches when at least one array element matches (e.g. `{ tags: { $eq: "sale" } }`, `{ prices: { $lt: 180 } }`, `{ descriptions: { $phrase: "wireless headphones" } }`). Phrase matching stays within one element. `HIGHLIGHT` marks only matching string elements; the stored document is unchanged.
- `LIMIT` and `OFFSET` are separate keywords, unlike RediSearch's `LIMIT <offset> <count>`; `LIMIT 0 10` returns an error.
- Only `.fast()` fields can be used for sorting; only `.fast()` fields of type `i64` / `u64` / `f64` can be used with score functions.
- Highlighting only works for operators that resolve to terms (term or phrase queries).
- With aliased fields: use the alias name in filters and `highlight`; use the actual document field name in `select`.
- For stream indexes the key in results is the stream entry ID; for hash indexes content is all fields and values.
- Source: https://upstash.com/docs/redis/search/querying (fetched 2026-10; no version pin on the site).

## Related

- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Index Management](./search-index-management.md)
- [Redis Search: Aggregations](./search-aggregations.md)
- [Redis Search: Searchable Streams](./search-streams.md)
