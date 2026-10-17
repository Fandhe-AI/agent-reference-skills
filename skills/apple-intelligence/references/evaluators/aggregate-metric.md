---
source: https://developer.apple.com/documentation/evaluations/aggregatemetric, https://developer.apple.com/documentation/evaluations/aggregationoperation
---

# AggregateMetric / AggregationOperation

An aggregate statistic computed from a metric's results across the evaluation dataset, and the operation that produced it.

## Signature / Usage

### AggregateMetric

```swift
struct AggregateMetric
```

```swift
let accuracy = Metric("Accuracy")
let op = AggregationOperation.mean(of: accuracy)
print(op.label) // "Mean of Accuracy"
```

The summary DataFrame stores one `AggregateMetric` for each column. Each value records the operation that produced it, and derives its display label and source metric name from the operation.

### AggregationOperation

```swift
enum AggregationOperation
```

The type of aggregation operation used to compute a summary statistic. Each case pairs a statistical function with the `Metric` it operates on, except `custom(label:)` which represents a custom computation.

## Options / Props

### AggregateMetric properties

| Name | Description |
|------|-------------|
| group | The group this aggregate belongs to, if any. |
| label | The display label for this aggregate. |
| operation | The aggregation operation that produced this value. |
| sourceMetric | The name of the source metric. |
| value | The aggregate value. |

### AggregationOperation cases

| Case | Description |
|------|-------------|
| custom(label:) | A custom aggregation identified by its label. |
| maximum(of:) | The maximum of the metric's values. |
| mean(of:) | The arithmetic mean of the metric's values. |
| median(of:) | The median of the metric's values. |
| minimum(of:) | The minimum of the metric's values. |
| mode(of:) | The mode of the metric's values. |
| standardDeviation(of:) | The standard deviation of the metric's values. |
| variance(of:) | The variance of the metric's values. |

`AggregationOperation` also has an instance property `label` (the display label this operation produces).

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- `AggregationOperation` provides `Decodable` and `Encodable` implementations.

## Related

- [Metric](./metric.md)
- [MetricsAggregator](./metrics-aggregator.md)
