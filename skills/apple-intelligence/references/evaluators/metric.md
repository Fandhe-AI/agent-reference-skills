---
source: https://developer.apple.com/documentation/evaluations/metric
---

# Metric

A named metric that carries a result value.

## Signature / Usage

```swift
struct Metric
```

Use `Metric` to define a named measurement. The factory methods (`passing`, `failing`, `scoring`, `ignore`) return a new `Metric` with the result stored inside.

```swift
let metric = Metric("Accuracy")
let result = metric.passing(rationale: "Exact match")
```

## Options / Props

| Name | Kind | Description |
|------|------|-------------|
| init(_:) | initializer | Creates a metric with just a name. |
| passing(rationale:) | method | Returns a metric with a passing result. |
| failing(rationale:) | method | Returns a metric with a failing result. |
| scoring(_:rationale:) | method | Returns a metric with a numeric result. |
| ignore(rationale:) | method | Returns a metric with an ignored result, excluded from aggregation. |
| name | property | The name of the metric, used as the DataFrame column name. |
| value | property | The result value of this metric. |
| doubleValue | property | The numeric value of this metric. |
| rationale | property | An optional rationale describing the result. |
| toolsAllPass | type property | A convenience metric for the strict pass or fail result of a `ToolCallEvaluator`. |
| toolsPercentagePass | type property | A convenience metric for the partial score result of a `ToolCallEvaluator`. |

### Metric.Value

```swift
enum Value
```

A metric result value.

| Case | Description |
|------|-------------|
| failing | A failing result. |
| ignore | The metric doesn't apply to this sample and aggregators skip it. |
| passing | A passing result. |
| scoring(_:) | A numeric result. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- An evaluator returns an array of `Metric` values, one for each DataFrame column.
- `CustomStringConvertible` implementations are provided.

## Related

- [Evaluator](./evaluator.md)
- [MetricsAggregator](./metrics-aggregator.md)
- [ToolCallEvaluator](./tool-call-evaluator.md)
