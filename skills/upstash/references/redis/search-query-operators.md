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

| Operator | Description |
|----------|-------------|
| `$must` | All specified conditions must match (AND) |
| `$should` | Optional conditions; boosts score when combined with `$must`; acts as OR when alone |
| `$mustNot` | Excludes documents matching any of these conditions |
| `$boost` | Multiplies the relevance score contribution of a clause |
| `$lt` | Numeric less-than comparison |
| `$lte` | Numeric less-than-or-equal |
| `$gt` | Numeric greater-than comparison |
| `$gte` | Numeric greater-than-or-equal |
| `$eq` | Exact equality |
| `$ne` | Not equal |

## Notes

- When `$should` is used alongside `$must`, it acts as a score booster rather than a mandatory condition
- Nested `$should` arrays create OR logic between clause groups
- Boolean operators can be nested for complex query expressions
- String fields support fuzzy matching, phrase queries, and regex in the filter value

## Related

- [Redis Search: Introduction](./search-introduction.md)
- [Redis Search: Getting Started](./search-getting-started.md)
- [Redis Search: Aggregations](./search-aggregations.md)
