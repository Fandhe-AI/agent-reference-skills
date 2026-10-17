---
source: https://developer.apple.com/documentation/evaluations/evaluation, https://developer.apple.com/documentation/evaluations/evaluation/evaluators-swift.typealias, https://developer.apple.com/documentation/evaluations/evaluatorsbuilder
---

# Evaluation

A type that defines an evaluation. Implement this protocol to create custom evaluations. The evaluation runs your system under test against a dataset and applies evaluators to measure performance.

## Signature / Usage

```swift
protocol Evaluation : Sendable
```

```swift
struct MyEvaluation: Evaluation {
    let metric = Metric("Match")

    let dataset = ArrayLoader(samples: [
        ModelSample(prompt: "One plus one is...", expected: "Two.")
    ])

    func subject(from sample: ModelSample<String>) async throws -> ModelSubject<String> {
        ModelSubject(value: "Two.")
    }

    var evaluators: Evaluators {
        Evaluator { sample, subject in
            let metric = Metric("Match")
            guard let expected = sample.expected else { return metric.ignore() }
            return subject.value == expected ? metric.passing() : metric.failing()
        }
    }

    func aggregateMetrics(using aggregator: inout MetricsAggregator) {
        aggregator.computeMean(of: metric)
    }
}
```

### Evaluation.Evaluators

```swift
typealias Evaluators = [any EvaluatorProtocol<Self.Sample, Self.Subject>]
```

### EvaluatorsBuilder

```swift
@resultBuilder struct EvaluatorsBuilder<Sample, Subject> where Sample : SampleProtocol, Subject : EvaluationSubject
```

Apply this builder to the `evaluators` property to remove the need for explicit array literals and type annotations:

```swift
@EvaluatorsBuilder<ModelSample<String>, ModelSubject<String>>
func buildEvaluators() -> [any EvaluatorProtocol<ModelSample<String>, ModelSubject<String>>] {
    Evaluator<ModelSample<String>> { sample, subject in
        Metric("Match").scoring(1.0)
    }
}
```

## Options / Props

| Name | Description |
|------|-------------|
| Sample | The type of input samples in the evaluation dataset. |
| SampleLoader | The type of the sample loader used to provide the evaluation dataset. |
| dataset | The evaluation dataset. |
| Subject | The type of subject the system under test produces. |
| subject(from:) | Produces the subject of evaluation from a given sample. |
| name | The evaluation's name in results. Defaults to the type name; override for a custom one. |
| evaluators | The evaluators to apply to each sample and its corresponding subject. |
| aggregateMetrics(using:) | Aggregates the collected metric results. |
| run(info:) | Runs the evaluation against the dataset and computes metric results. |
| inputColumn | A typed column descriptor for the input samples in the detailed DataFrame. |
| responseColumn | A typed column descriptor for the model responses in the detailed DataFrame. |
| expectedColumn | A typed column descriptor for the expected values in the detailed DataFrame. |

`EvaluatorsBuilder` type methods: `buildExpression(_:)` (wraps a single evaluator expression into the builder pipeline), `buildOptional(_:)` (provides an empty array when an optional evaluator block is absent), `buildPartialBlock(first:)`, `buildPartialBlock(accumulated:next:)`.

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+. Source: DocC JSON fetched 2026-10-16.
- Apple's Evaluations framework runs on-device in the Apple toolchain with Swift types (`Evaluation`, `Metric`, `Evaluator`). It is distinct from cloud evals APIs; for OpenAI Evals / graders see openai-evals-tuning, and for Claude prompt evaluation see anthropic-prompt-eval.
- Related Apple articles: "Evaluating language model responses", "Designing effective evaluations", sample "Book Tracker: Using Evaluations to evaluate an intelligent feature", "Evaluating a Core AI model".

## Related

- [EvaluationSubject / ModelSubject](./evaluation-subject.md)
- [ModelSample](./model-sample.md)
- [Loader](./loader.md)
- [EvaluationResult](./evaluation-result.md)
- [EvaluationTrait / EvaluationContext](./evaluation-trait.md)
- [EvaluationError](./evaluation-errors.md)
