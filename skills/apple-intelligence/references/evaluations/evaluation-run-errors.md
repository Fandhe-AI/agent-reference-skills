---
source: https://developer.apple.com/documentation/evaluations/evaluationrunerrors
---

# EvaluationRunErrors

A summary of the failures encountered during an evaluation run. Retrieved via `EvaluationResult.errors`.

## Signature / Usage

```swift
struct EvaluationRunErrors
```

## Options / Props

| Name | Description |
|------|-------------|
| anyInferenceProduced | Whether any sample produced a subject. |
| evaluatorFailureCount | The total number of evaluator invocations that threw. |
| failingEvaluatorTypes | The set of evaluator type names that threw at least once. |
| hasFailures | Whether this represents any failure worth persisting. |
| inferenceFailureCount | The number of samples whose subject failed to be produced. |
| metricsNotFound | Metric names referenced by `MetricsAggregator` that no evaluator produced. |
| clean (type property) | Used as the default when loading a file that carries no `runErrors`. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [EvaluationResult](./evaluation-result.md)
- [EvaluationError](./evaluation-errors.md)
