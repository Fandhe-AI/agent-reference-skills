# Redis Search — Field Operators

Operators that control how a single field is matched: `$smart` (default), `$eq`, `$in`, range operators, `$phrase`, `$fuzzy`, `$regex`, and `$boost`.

## Signature / Usage

```ts
// Explicit smart matching
await index.query({
  filter: { name: { $smart: "wireless headphones" } },
});

// Exact equality and any-of values
await products.query({
  filter: {
    price: { $eq: 199.99 },
  },
});

await products.query({
  filter: {
    category: {
      $in: ["electronics", "accessories", "audio"],
    },
  },
});

// Price range
await products.query({
  filter: {
    price: { $gte: 100, $lte: 200 },
  },
});

// With slop (allow terms between, not exact adjacency)
await products.query({
  filter: {
    description: {
      $phrase: {
        value: "wireless headphones",
        slop: 2,
      },
    },
  },
});

// Custom distance for more tolerance
// "haedphone" is 2 edits away from "headphone" without taking transposition into account
await products.query({
  filter: {
    name: {
      $fuzzy: {
        value: "haedphone",
        distance: 2,
        transpositionCostOne: false,
      },
    },
  },
});

// Match product codes with pattern
await products.query({
  filter: {
    sku: {
      $regex: "SKU-[0-9]{4}",
    },
  },
});
```

```bash
SEARCH.QUERY products '{"description": {"$phrase": {"value": "wireless headphones", "slop": 2}}}'
SEARCH.QUERY products '{"name": {"$fuzzy": {"value": "haedpho", "prefix": true, "transpositionCostOne": true}}}'
SEARCH.QUERY users '{"email": {"$regex": ".*@company\\.com"}}'
```

## Options / Props

| Operator | Field types | Parameters |
|----------|-------------|------------|
| `$smart` | all | Value (identical to passing a plain value); can be combined with `$boost` |
| `$eq` | TEXT, U64/I64/F64, DATE, BOOL, KEYWORD, FACET | Value |
| `$in` | TEXT, U64/I64/F64, DATE, BOOL, KEYWORD, FACET | Array of values (OR of `$eq`) |
| `$gt` `$gte` `$lt` `$lte` | U64/I64/F64, DATE, KEYWORD | Value; combine on one field for bounded ranges, e.g. `{ $gte: 100, $lte: 200 }` |
| `$phrase` | TEXT | String, or `{ value, slop }`, or `{ value, prefix: true }` (`slop` and `prefix` are mutually exclusive) |
| `$fuzzy` | TEXT | String, or `{ value, distance (default 1, max 2), transpositionCostOne, prefix }` |
| `$regex` | TEXT | Regular expression string, matched against individual terms |
| `$boost` | any (modifier next to an operator or field condition) | Number: `>1` raises, `0..1` lowers, negative values demote |

## Notes

- Smart matching on numeric, boolean and date fields is exact equality. On text fields: single word runs exact term (high boost), fuzzy distance 1 and fuzzy prefix (no boost); multiple words combine exact phrase (highest boost), phrase with slop and terms match (medium boost), fuzzy and fuzzy prefix on the last word (no boost); a value wrapped in double quotes (`"\"noise cancelling\""`) forces exact phrase matching (not `noise-cancelling`, not reordered)
- `$eq` on a text field is a term search for one word and a phrase query for several words
- `$phrase` `slop` is the maximum number of position moves (`slop: 2` matches `wireless bluetooth overhead headphones`, not three moves); `prefix: true` lets the last term be partial (`wireless head` matches `wireless headphones`)
- `$fuzzy` uses Levenshtein distance (insert, delete, substitute); a transposition counts as one edit by default and `transpositionCostOne: false` counts it as two (the same page's example says that without `transpositionCostOne` the distance is 2; both statements are in the source). `prefix: true` gives fuzzy prefix matching for search-as-you-type. Several words are combined with `$must` (all must match, each with fuzzy tolerance)
- `$regex` matches single tokenized terms, never across words (`hello world.*` does not match); avoid leading wildcards (`.*suffix` scans all terms); on stemmed fields (default) it runs against stemmed forms, so use `NOSTEM` (and `NOTOKENIZE` for emails / SKUs) where the pattern must match exactly
- `$boost` changes only the score, so it works with every field type
- Source: https://upstash.com/docs/redis/search/query-operators/field-operators/smart-matching, /eq, /in, /range-operators, /phrase, /fuzzy, /regex, /boost (fetched 2026-11-14; no version pin on the site)
- The official smart-matching page also shows a `$and` array combining `$smart` with `$boost`; `$and` is not documented anywhere else (boolean operators are `$must` / `$should` / `$mustNot`), so it is not reproduced here
- The official fuzzy page's CLI prefix example sets `"transpositionCostOne": true` while the TypeScript one does not; both are shown as given in each language

## Related

- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Querying](./search-querying.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
