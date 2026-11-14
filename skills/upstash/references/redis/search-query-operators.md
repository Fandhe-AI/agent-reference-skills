# Redis Search — Query Operators

Boolean and comparison operators for filtering documents in Upstash Redis Search queries.

## Signature / Usage

```ts
// Simple filter — match a field value
const results = await index.query({
  filter: { category: "electronics", inStock: true },
})

// Comparison operators
const cheap = await index.query({
  filter: { price: { $lt: 50 } },
})

// Boolean: $must — all conditions required
const results = await index.query({
  filter: {
    $must: { category: "electronics", description: "wireless" },
  },
})

// Boolean: $should — at least one condition (OR logic)
const results = await index.query({
  filter: {
    $should: [
      { $must: { category: "electronics", description: "premium" } },
      { $must: { category: "sports", price: { $lt: 50 } } },
    ],
  },
})

// Boolean: $mustNot — exclude matching documents
const results = await index.query({
  filter: {
    $must: { inStock: true },
    $mustNot: { category: "clearance" },
  },
})

// $boost — adjust relevance scoring weight
const results = await index.query({
  filter: {
    $must: { description: "wireless" },
    $should: { $boost: 2.0, description: "premium" },
  },
})
```

## Options / Props

Boolean operators:

| Operator | Description |
|----------|-------------|
| `$must` | All specified conditions must match (AND); object or array syntax. Several top-level field conditions are implicitly wrapped in `$must` |
| `$should` | Alone: at least one condition must match (OR; more matches score higher). With `$must`: optional score boosters |
| `$mustNot` | Excludes documents matching any of the conditions (OR within the exclusion) |
| `$boost` | Multiplies a clause's score contribution; `>1` raises, `0..1` lowers, negative values demote without excluding |

Field operators (details on the Field Operators page):

| Operator | Description |
|----------|-------------|
| `$smart`, `$eq`, `$in` | Smart matching, exact equality, any-of values |
| `$gt` `$gte` `$lt` `$lte` | Range comparison on numeric, date and keyword fields |
| `$phrase`, `$fuzzy`, `$regex` | Phrase (slop / prefix), typo-tolerant, regular-expression matching on text fields |

## Notes

- When `$should` is used alongside `$must`, it acts as a score booster rather than a mandatory condition; nested `$should` arrays create OR logic between clause groups, and boolean operators can be nested
- `$mustNot` next to other conditions filters them. On its own it matches every document it does not exclude, all with score `0`; inside `$should` it is one alternative that matches every document it does not exclude (score `0`). Before the October 2026 change `$mustNot` matched no documents in those two cases
- There is no `$not` operator (the error is `ERR Unknown field operator: $not`); use `$mustNot`. Earlier versions of this page listed a `$ne` operator that does not appear in the official operator pages
- Retrievers (`$ann`, `$rrf`, `$standard`) are not query operators and cannot be placed inside `$must` / `$should` / `$mustNot`
- Source: https://upstash.com/docs/redis/search/query-operators/boolean-operators/overview and /must, /should, /must-not, /boost; https://upstash.com/docs/redis/search/query-operators/field-operators/overview (fetched 2026-11-14; no version pin on the site)
- Source: https://upstash.com/docs/redis/overall/changelog (October 2026 `$mustNot` change, fetched 2026-11-14)

## Related

- [Redis Search: Field Operators](./search-field-operators.md)
- [Redis Search: Retrievers](./search-retrievers.md)
- [Redis Search: Introduction](./search-introduction.md)
- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Aggregations](./search-aggregations.md)
