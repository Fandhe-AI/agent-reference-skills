---
source: https://developer.apple.com/documentation/evaluations/evaluating-language-model-responses
---

# Evaluating language model responses

Build an evaluation that runs your intelligence-powered feature against samples and scores each response.

## Signature / Usage

```swift
struct LetterCountEvaluation: Evaluation {
    // The samples to run, and their expected values.
    let dataset = ArrayLoader(samples: [...])

    // The feature under test, called once per sample.
    func subject(from sample: ModelSample<Int>) async throws -> ModelSubject<Int> { ... }

    // The scoring applied to each response.
    var evaluators: Evaluators { ... }

    // The statistics computed across every sample.
    func aggregateMetrics(using aggregator: inout MetricsAggregator) { ... }
}
```

Subject, evaluators, and aggregation:

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
    // Create a group called "Accuracy" with the mean of ExactMatch.
    aggregator.group("Accuracy") { group in
        group.computeMean(of: exactMatch)
    }
    // Create a group called "Error" with the maximum AbsoluteError.
    aggregator.group("Error") { group in
        group.computeMaximum(of: absoluteError)
    }
}
```

Running with Swift Testing:

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

Tool-call and model-judge evaluators:

```swift
var evaluators: Evaluators {
    // Score tool calls against the trajectory expectations defined on each sample.
    ToolCallEvaluator(allPass: toolsAllPass, percentagePass: toolsPercentagePass)
    // Also check whether the final output matches the expected answer.
    Evaluator { input, subject in
        guard let expected = input.expected else { return exactMatch.ignore() }
        return subject.value == expected ? exactMatch.passing() : exactMatch.failing()
    }
}
```

```swift
var evaluators: Evaluators {
    ModelJudgeEvaluator(
        "HaikuQuality",
        scale: .numeric([
            4: "Excellent - Perfect 5-7-5 form, strongly relevant to the topic, and uses vivid imagery that evokes emotion.",
            3: "Good - Correct or near-correct form, clearly relevant, with some evocative language.",
            2: "Poor - Incorrect syllable count, weak connection to topic, or lacks poetic quality.",
            1: "Very poor - Not recognizable as a haiku, off-topic, or incoherent.",
        ]),
        judge: SystemLanguageModel.default,
        prompt: ModelJudgePrompt(
            instructions: """
                You are an expert poetry evaluator. Evaluate the quality of AI-generated haiku poems \
                considering: form (traditional 5-7-5 syllable structure), relevance (clearly relates to \
                the given topic), and imagery (vivid, sensory language that evokes a feeling). \
                Give step-by-step explanations for your scoring.
                """
        )
    )
}
```

Reading detailed results:

```swift
@Test(.evaluates(Self.evaluation))
func inspectDetailedResults() async throws {
    let result = EvaluationContext.current.result

    // Read typed columns out of the per-sample DataFrame.
    let inputs   = result.detailed[Self.evaluation.inputColumn]
    let expected = result.detailed[Self.evaluation.expectedColumn]
    let scores   = result.detailed[metric: Self.evaluation.exactMatch]

    // Show the prompts where the model's count disagreed with the expected count.
    for row in 0..<scores.count where scores[row]?.value == .failing {
        let prompt = inputs[row]?.promptDescription ?? "<missing>"
        let target = expected[row].map(String.init) ?? "?"
        print("Missed (expected \(target)): \(prompt)")
    }

    #expect(scores.count == 5)
}
```

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).
- An evaluation is a loop: for each sample the framework runs the feature, scores the response with evaluators, and records a row; it then aggregates rows into summary statistics. Four parts, all members of one `Evaluation` conformance: dataset of samples with expected outputs, subject (feature under test), evaluators scoring against metrics, and aggregation into a metric summary.
- Each `ModelSample` carries a `prompt` and an optional `expected` value. Large sets: see synthetic datasets.
- `subject(from:)` is called once per sample and returns a `ModelSubject` wrapping the output and any transcript.
- Metrics: declare a `Metric` per measurement and return `passing(rationale:)` / `failing(rationale:)` for binary checks or `scoring(_:rationale:)` for continuous values; `ignore()` skips a sample.
- Run an evaluation by attaching `EvaluationTrait` to a Swift Testing test function with the `evaluates(_:info:recordTranscripts:)` test trait. The trait runs the loop before the test body and stores the `EvaluationResult` in `EvaluationContext`. Results appear in Xcode's Report navigator under the Evaluations item; Compare lets you see two runs side by side.
- `EvaluationResult` holds three values; the first two are TabularData `DataFrame`s (`summary`, `detailed`). `aggregateValue(_:)` reads one statistic and returns the sentinel `-1` if the statistic was not computed. Each `compute...` method on `MetricsAggregator` pairs with the same-named operation (for example `computeStandardDeviation(of:)` with `.standardDeviation(of:)`); `custom(of:label:_:)` is retrieved with `.custom(label:)`.
- `detailed` columns: `inputColumn`, `responseColumn`, `expectedColumn`, and `subscript(metric:)` for a metric's scores.
- Tool calling: attach a `TrajectoryExpectation` with `ToolExpectation` entries to the sample and add a `ToolCallEvaluator`. Subjective criteria: `ModelJudgeEvaluator` with a scale and instructions.
- A complete sample app is "Book Tracker: Using Evaluations to evaluate an intelligent feature" in the official documentation.
- Distinct from cloud platform evals and prompt-evaluation tooling: see openai-evals-tuning and anthropic-prompt-eval for those. This page covers the on-device Evaluations framework, which runs under Swift Testing.

## Related

- [Evaluation](../evaluations/evaluation.md)
- [ModelJudgeEvaluator](../evaluators/model-judge-evaluator.md)
- [ToolCallEvaluator](../evaluators/tool-call-evaluator.md)
- [Designing effective evaluations](./designing-effective-evaluations.md)
- [Scoring with model-judge evaluators](./scoring-with-model-judges.md)
- [Evaluating tool-calling behavior](./evaluating-tool-calling.md)
