# Redis Search — Aggregations

Compute analytics metrics and bucket groupings over indexed documents. Aggregations run in two phases: optional filtering, then computation.

## Signature / Usage

```ts
const result = await index.aggregate({
  filter: { inStock: true },
  aggregations: {
    avg_price:   { $avg: { field: "price" } },
    total:       { $count: {} },
    by_category: { $terms: { field: "category", size: 5 } },
    price_dist:  { $histogram: { field: "price", interval: 50 } },
  },
})

// Access results
console.log(result.avg_price.value)           // number
console.log(result.by_category.buckets)       // [{ key, docCount }]
```

## Options / Props

### Metric Aggregations (numeric summaries)

| Function | Description |
|----------|-------------|
| `$avg` | Average of a numeric field |
| `$sum` | Sum of a numeric field |
| `$min` | Minimum value |
| `$max` | Maximum value |
| `$count` | Total document count |
| `$cardinality` | Count of unique values |
| `$stats` | Basic statistics (min, max, avg, sum, count) |
| `$extendedStats` | Extended statistics including variance and std deviation |
| `$percentiles` | Percentile distribution |

### Bucket Aggregations (document grouping)

| Function | Description |
|----------|-------------|
| `$terms` | Group by top values of a field; `size` controls max buckets |
| `$range` | Group by custom numeric ranges |
| `$histogram` | Group by fixed-width numeric intervals |
| `$dateHistogram` | Group by fixed time intervals |
| `$facet` | Hierarchical facet aggregation |

## Notes

- Multiple aggregations can be computed in a single request against the same filtered dataset
- Bucket aggregations support nested `$aggs` for per-bucket sub-metrics
- Metric aggregations return `{ value: number }`; bucket aggregations return `{ buckets: [{ key, docCount, ... }] }`
- Results are keyed by the alias name provided in the `aggregations` object

## Related

- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Getting Started](./search-getting-started.md)
