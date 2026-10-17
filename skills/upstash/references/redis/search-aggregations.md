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
| `$composite` | Paginated combinations of several sources (September 2026) |
| `$facet` | Hierarchical facet aggregation |

### $composite

Groups documents by several fields and pages through every bucket. Unlike `$terms` (top buckets), `$composite` returns buckets in a stable sort order and an `afterKey` cursor for the next page. The order of `sources` controls sorting.

```ts
const firstPage = await index.aggregate({
  aggregations: {
    by_category_and_price: {
      $composite: {
        size: 100,
        sources: [
          { category: { $terms: { field: "category" } } },
          { price: { $histogram: { field: "price", interval: 10 } } },
        ],
      },
    },
  },
});

const secondPage = await index.aggregate({
  aggregations: {
    by_category_and_price: {
      $composite: {
        size: 100,
        sources: [
          { category: { $terms: { field: "category" } } },
          { price: { $histogram: { field: "price", interval: 10 } } },
        ],
        after: firstPage.by_category_and_price.afterKey,
      },
    },
  },
});
```

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `sources` | `array` | Yes | Non-empty list of named `$terms`, `$histogram`, or `$dateHistogram` sources; each entry has exactly one source name |
| `size` | `number` | No | Buckets per page; positive integer; default `10` |
| `after` | `object` | No | The `afterKey` object from the previous response |

Per-source arguments:

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `field` | `string` | Yes | `FAST` field to bucket on |
| `order` | `"asc" \| "desc"` | No | Sort direction; default `"asc"` |
| `missingBucket` | `boolean` | No | Create a bucket for documents where the field is missing; default `false` |
| `missingOrder` | `"default" \| "first" \| "last"` | No | Position of the missing-value bucket (with `missingBucket`); default `"default"` |

Source compatibility: `$terms` supports U64, I64, F64, BOOL, DATE, KEYWORD; `$histogram` supports U64, I64, F64, DATE and requires `interval`; `$dateHistogram` supports DATE and takes `fixedInterval` (e.g. `"1d"`) or `calendarInterval` (`"year"`, `"month"`, `"week"`).

Response: `{ buckets: [{ key, docCount }], afterKey }`. Pass `afterKey` back verbatim (its encoded values such as `"str:books"` / `"f64:20"` differ from the display values in `key`), use the same filter, sources, and source order for every page, and continue until a request returns no buckets. `$aggs` next to `$composite` computes per-bucket sub-metrics.

## Notes

- Metric `$sum` returns `0` when no values are collected (no matching documents, or all matching values missing/null with no `missing` fallback); set `nullIfNoMatch: true` to return `null` instead so it is distinguishable from a real sum of zero
- Multiple aggregations can be computed in a single request against the same filtered dataset
- `$terms`, `$range`, `$histogram`, `$dateHistogram`, and `$composite` support nested `$aggs` for per-bucket sub-metrics; `$facet` and metric operators do not
- Metric aggregations return `{ value: number }`; bucket aggregations return `{ buckets: [{ key, docCount, ... }] }`
- Results are keyed by the alias name provided in the `aggregations` object
- Source: https://upstash.com/docs/redis/search/aggregation-operators/bucket-aggregations/composite , https://upstash.com/docs/redis/search/aggregations (fetched 2026-10-17; no version pin on the site).

## Related

- [Redis Search: Query Operators](./search-query-operators.md)
- [Redis Search: Getting Started](./search-getting-started.md)
