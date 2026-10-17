---
source: https://developer.apple.com/documentation/evaluations/metricsaggregator
---

# MetricsAggregator

A utility for computing aggregate statistics from evaluation metrics.

## Signature / Usage

```swift
struct MetricsAggregator
```

```swift
let accuracy = Metric("Accuracy")

func aggregateMetrics(using aggregator: inout MetricsAggregator) {
    aggregator.computeMean(of: accuracy)
    aggregator.computeMaximum(of: accuracy)
    aggregator.computeStandardDeviation(of: accuracy)
}
```

Use this structure to calculate summary statistics like mean, median, and standard deviation from your evaluation results. The aggregator processes metric data from a DataFrame and produces aggregated results.

## Options / Props

| Name | Description |
|------|-------------|
| computeMean(of:) | Computes the mean of a metric and adds it to the aggregated results. |
| computeMedian(of:) | Computes the median of a metric and adds it to the aggregated results. |
| computeMode(of:) | Computes the mode of a metric and adds it to the aggregated results. |
| computeMinimum(of:) | Computes the minimum value of a metric and adds it to the aggregated results. |
| computeMaximum(of:) | Computes the maximum value of a metric and adds it to the aggregated results. |
| computeStandardDeviation(of:) | Computes the standard deviation of a metric and adds it to the aggregated results. |
| computeVariance(of:) | Computes the variance of a metric and adds it to the aggregated results. |
| custom(of:label:_:) | Computes a custom aggregation from a single metric's results. |
| group(_:_:) | Creates a group of related metrics. |

### MetricsAggregator.Group

```swift
struct Group
```

A grouped collection of related metrics. Use `Group` within `group(_:_:)` to add metrics to display together.

| Name | Description |
|------|-------------|
| name | The name of this group. |
| computeMaximum(of:) / computeMean(of:) / computeMedian(of:) / computeMinimum(of:) / computeMode(of:) / computeStandardDeviation(of:) / computeVariance(of:) | Compute the statistic for a metric and add it to the group. |
| custom(of:label:_:) | Computes a custom aggregation and adds it to the group. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- Results are exposed as `AggregateMetric` values produced by an `AggregationOperation`.

## Related

- [Metric](./metric.md)
- [AggregateMetric / AggregationOperation](./aggregate-metric.md)
- [Evaluator](./evaluator.md)
