# Redis Search — Aggregation Operators

Per-operator arguments, field compatibility and output shapes for metric aggregations (`$avg`, `$sum`, `$min`, `$max`, `$count`, `$cardinality`, `$stats`, `$extendedStats`, `$percentiles`) and bucket aggregations (`$terms`, `$range`, `$histogram`, `$dateHistogram`, `$composite`, `$facet`).

## Signature / Usage

```ts
await index.aggregate({
  aggregations: {
    total_price: { $sum: { field: "price", nullIfNoMatch: true } },
  },
});

await index.aggregate({
  aggregations: {
    price_extended: {
      $extendedStats: { field: "price", sigma: 2, missing: 0 },
    },
  },
});

await index.aggregate({
  aggregations: {
    latency_pct: {
      $percentiles: { field: "latencyMs", percents: [50, 95, 99], keyed: true },
    },
  },
});

await index.aggregate({
  aggregations: {
    by_category: {
      $terms: { field: "category", size: 5 },
    },
  },
});

await index.aggregate({
  aggregations: {
    price_tiers: {
      $range: {
        field: "price",
        ranges: [{ to: 30 }, { from: 30, to: 60 }, { from: 60 }],
      },
    },
  },
});

await index.aggregate({
  aggregations: {
    by_day: {
      $dateHistogram: {
        field: "createdAt",
        fixedInterval: "1d",
      },
    },
  },
});

await index.aggregate({
  aggregations: {
    category_tree: {
      $facet: {
        field: "category",
        path: "/category",
        depth: 2,
        size: 10,
        minDocCount: 1,
        order: { count: "desc" },
      },
    },
  },
});
```

## Options / Props

Metric operators take `{ field, missing? }` and require a `FAST` field:

| Operator | Extra arguments | Field types | Output |
|----------|-----------------|-------------|--------|
| `$avg` | `missing` (number) | U64/I64/F64, DATE, BOOL | `{ value }`; `null` when no values |
| `$sum` | `missing`, `nullIfNoMatch` (default `false`) | U64/I64/F64, DATE, BOOL | `{ value }`; `0` (or `null` with `nullIfNoMatch`) when nothing collected |
| `$min` / `$max` | `missing` | U64/I64/F64, DATE, BOOL | `{ value }`; can be `null` |
| `$count` | `missing` | U64/I64/F64, DATE, BOOL, KEYWORD | `{ value }`; counts documents with the field (plus missing-fallback ones) |
| `$cardinality` | `missing` (string or number) | U64/I64/F64, DATE, BOOL, KEYWORD | `{ value }` distinct values |
| `$stats` | `missing` | U64/I64/F64, DATE, BOOL | `{ count, min, max, sum, avg }`; `min` / `max` / `avg` can be `null` |
| `$extendedStats` | `missing`, `sigma` | U64/I64/F64, DATE | `$stats` plus `sumOfSquares`, `variance` (+ population / sampling), `stdDeviation` (+ variants), `stdDeviationBounds` |
| `$percentiles` | `percents` (default `[1, 5, 25, 50, 75, 95, 99]`), `keyed` (default `true`), `missing` | U64/I64/F64, DATE | `{ values: { "50.0": 40 } }` or, with `keyed: false`, `{ values: [{ key, value }] }` |

Bucket operators:

| Operator | Arguments | Field types |
|----------|-----------|-------------|
| `$terms` | `field`, `size`, `segmentSize`, `showTermDocCountError`, `minDocCount`, `order` (`{ count \| key \| <subAggAlias>: "asc" \| "desc" }`), `missing`, `include`, `exclude` (regex or list) | U64/I64/F64, DATE, BOOL, KEYWORD |
| `$range` | `field`, `ranges` (`{ key?, from?, to? }[]`, `from` inclusive, `to` exclusive), `keyed` | U64/I64/F64, DATE |
| `$histogram` | `field`, `interval` (required), `offset`, `minDocCount`, `hardBounds`, `extendedBounds` (both need `min` and `max`), `keyed` | U64/I64/F64, DATE |
| `$dateHistogram` | `field`, `fixedInterval` (required, e.g. `"1m"`, `"1h"`, `"1d"`), `offset`, `minDocCount`, `hardBounds`, `extendedBounds`, `keyed` | DATE |
| `$composite` | `sources`, `size`, `after` (see Aggregations page) | per source |
| `$facet` | `field`, `path` (starts with `/`), `depth` (default `1`), `size` (default `10`), `minDocCount` (default `1`), `order` (`{ count \| path: "asc" \| "desc" }`, default count desc) | FACET only |

## Notes

- All metric and bucket operators need a `FAST` field; TEXT and FACET fields are unsupported except `$facet` on FACET
- Metric operators do not support nested `$aggs`. `$terms`, `$range`, `$histogram`, `$dateHistogram` and `$composite` do; `$facet` does not and cannot be used as a sub-aggregation
- `$terms` output: `{ buckets: [{ key, docCount }], sumOtherDocCount }`. Counts are approximate (tallied per index segment, then merged), mostly for terms near the `size` cutoff; `docCountErrorUpperBound` reports the maximum error (per-bucket with `showTermDocCountError: true`), a higher `segmentSize` reduces error at more cost, and `SEARCH.COUNT` gives an exact count for one term
- `$range` buckets look like `{ "key": "*-30", "docCount": 3, "to": 30 }`; `$histogram` buckets `{ "key": 25, "docCount": 4 }`; `$dateHistogram` buckets `{ "key": 1704067200000, "keyAsString": "2024-01-01T00:00:00Z", "docCount": 14 }`; `$facet` returns `{ path, sumOtherDocCount, children: [{ path, docCount, sumOtherDocCount, children? }] }`
- Metric output example for `$stats`: `{ "price_stats": { "count": 9, "min": 0, "max": 80, "sum": 360, "avg": 40 } }`
- Source: https://upstash.com/docs/redis/search/aggregation-operators/metric-aggregations/overview and /avg, /sum, /min, /max, /count, /cardinality, /stats, /extended-stats, /percentiles; https://upstash.com/docs/redis/search/aggregation-operators/bucket-aggregations/overview and /terms, /range, /histogram, /date-histogram, /facet (fetched 2026-11-14; no version pin on the site)
- The `$composite` page is summarized on the Aggregations page; metric `$max` is documented on the official page in the same shape as `$min`

## Related

- [Redis Search: Aggregations](./search-aggregations.md)
- [Redis Search: Schema Definition](./search-schema-definition.md)
- [Redis Search: Troubleshooting](./search-troubleshooting.md)
