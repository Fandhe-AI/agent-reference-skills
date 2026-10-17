---
source: https://developer.apple.com/documentation/evaluations/evaluating-language-model-responses
---

# Evaluation with Swift Testing

Define an `Evaluation` with a dataset, subject, evaluators, and aggregated metrics, then run it from a Swift Testing function with the `evaluates` trait.

```swift
import Evaluations
import FoundationModels

struct LetterCountEvaluation: Evaluation {
    let dataset = ArrayLoader(samples: [
            ModelSample(prompt: "Count the letter 'r' in 'strawberry'.", expected: 3),
            ModelSample(prompt: "How many a's are in 'banana'?", expected: 3),
            ModelSample(prompt: "Mississippi contains how many s?", expected: 4),
            ModelSample(prompt: "What's the number of l in hello?", expected: 2),
            ModelSample(prompt: "The letter 'e' in 'bookkeeper' appears how many times?", expected: 3),
        ])

```

```swift
func subject(from sample: ModelSample<Int>) async throws -> ModelSubject<Int> {
    // Create the language model session; you can customize this with instructions and you can
    // choose the model you want to use.
    let session = LanguageModelSession()
    // Create the model response the same way you do in your app.
    let response = try await session.respond(to: sample.prompt, generating: Int.self)
    // Return the model's response along with the transcript.
    return ModelSubject(
        value: response.content,
        transcript: session.transcript.structuredTranscript
    )
}
```

```swift
// Metrics used by the evaluation and tests.
let exactMatch = Metric("ExactMatch")
let absoluteError = Metric("AbsoluteError")

var evaluators: Evaluators {
    Evaluator { input, subject in
        // Return a pass or fail result for the "ExactMatch" metric.
        guard let expected = input.expected else { return exactMatch.ignore() }
        return subject.value == expected ? exactMatch.passing() : exactMatch.failing()
    }
    Evaluator { input, subject in
        // Return a score that contains the absolute error.
        guard let expected = input.expected else { return absoluteError.ignore() }
        let error = abs(Double(subject.value - expected))
        return absoluteError.scoring(error)
    }
}
```

```swift
func aggregateMetrics(using aggregator: inout MetricsAggregator) {
    aggregator.computeMean(of: exactMatch)
    aggregator.computeMean(of: absoluteError)
}
```

```swift
import Testing
import Evaluations

struct LetterCountTests {
    static let evaluation = LetterCountEvaluation()

    @Test(.evaluates(Self.evaluation))
    func letterCounting() async throws {
        let result = EvaluationContext.current.result
        let score = result.aggregateValue(.mean(of: Self.evaluation.exactMatch))
        #expect(score > 0.8)
    }
}
```

## Notes

- iOS 27.0+ / macOS 27.0+ / Xcode 27.0+ (Evaluations framework).
- The trait runs the evaluation loop before the test body, then stores the `EvaluationResult` in `EvaluationContext`.
- `aggregateValue(_:)` returns `-1` when the evaluation did not compute the requested statistic.
- The listings are fragments of one `LetterCountEvaluation` type; in the article the `subject(from:)`, `evaluators`, and `aggregateMetrics(using:)` members are declared on the same struct as `dataset`.
- Swift Testing (`@Test`, `#expect`) is not covered by this skill; Apple's Evaluations framework is distinct from cloud evaluation products such as those in openai-evals-tuning and anthropic-prompt-eval.
