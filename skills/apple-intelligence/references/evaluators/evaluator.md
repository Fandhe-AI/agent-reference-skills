---
source: https://developer.apple.com/documentation/evaluations/evaluator, https://developer.apple.com/documentation/evaluations/evaluatorprotocol
---

# Evaluator / EvaluatorProtocol

A closure-based evaluator, and the protocol that custom evaluators conform to.

## Signature / Usage

### Evaluator

```swift
struct Evaluator<Input> where Input : SampleProtocol, Input.ExpectedValue : Decodable, Input.ExpectedValue : Encodable, Input.ExpectedValue : Sendable
```

Use Evaluator to create inline evaluators without defining a custom type. The closure receives the input sample and the `ModelSubject`, providing access to both .value and .transcript.

```swift
Evaluator { sample, subject in
    let metric = Metric("TitleMatch")
    guard let expected = sample.expected else { return metric.ignore() }
    return subject.value == expected ? metric.passing() : metric.failing()
}
```

| Member | Description |
|--------|-------------|
| init(_:) | Creates an evaluator with the given evaluation closure. |
| metrics(subject:input:) | Evaluates the input and returns an array of metrics. |

### EvaluatorProtocol

```swift
protocol EvaluatorProtocol<Input, Subject> : Sendable
```

Conform to `EvaluatorProtocol` to create custom evaluators that measure the system's output against expected criteria. Each evaluator returns an array of `Metric` values: one for each DataFrame column.

```swift
struct MyEvaluator<Input: SampleProtocol>: EvaluatorProtocol
where Input.ExpectedValue: Sendable & Codable {
    let metric = Metric("Quality")

    func metrics(
        subject: ModelSubject<Input.ExpectedValue>,
        input: Input
    ) async throws -> [Metric] {
        return [metric.scoring(1.0)]
    }
}
```

| Member | Description |
|--------|-------------|
| Input (associated type) | The input sample type. |
| Subject (associated type) | The type of subject the system under test produces. |
| metrics(subject:input:) | Computes metrics for the given subject, given the input sample. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- The protocol takes `Input` (the sample type) as a type parameter. `Subject` is an associated type constrained to `EvaluationSubject`, ensuring the subject's value type matches the sample's expected value type.
- Conforming types must be `Sendable`.

## Related

- [Metric](./metric.md)
- [MetricsAggregator](./metrics-aggregator.md)
- [ModelJudgeEvaluator](./model-judge-evaluator.md)
- [ToolCallEvaluator](./tool-call-evaluator.md)
