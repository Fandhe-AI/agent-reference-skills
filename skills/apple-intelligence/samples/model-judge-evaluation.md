---
source: https://developer.apple.com/documentation/evaluations/scoring-with-model-as-judge-evaluators
---

# Model-Judge Evaluation

Score subjective quality with `ModelJudgeEvaluator`: a pointwise evaluation, multi-dimension scoring with `ScoreDimension`, a pairwise comparison, and the Swift Testing run.

```swift
@Generable
struct BookTags: Codable, Sendable {
    @Guide(description: "Tags describing the book's genre, themes, and setting",
           .count(3...8))
    var tags: [String]
}

struct BookTagEvaluation: Evaluation {

    // Book reviews for the model to generate tags from.
    let dataset = ArrayLoader(samples: [
            ModelSample(prompt: "An absolutely breathtaking novel. The characters are richly drawn, the plot twists kept me guessing, and the prose is lyrical without being overwrought.", expected: BookTags(tags: [])),
            ModelSample(prompt: "Honestly a slog. It's a dystopian novel about a totalitarian surveillance state but the characters are paper-thin and the romance subplot felt forced.", expected: BookTags(tags: [])),
            ModelSample(prompt: "A fun, twisty murder mystery set on a private island. Classic whodunit vibes with an eccentric cast of suspects and a storm that cuts them off from the mainland.", expected: BookTags(tags: [])),
            ModelSample(prompt: "This book completely changed how I think about habits. The idea that tiny changes compound over time really stuck with me. Very practical.", expected: BookTags(tags: [])),
            ModelSample(prompt: "A devastating, beautiful novel about a family torn apart by war. The way the author writes about memory and loss had me in tears.", expected: BookTags(tags: [])),
        ])

    // Run the intelligent feature under test.
    func subject(from sample: ModelSample<BookTags>) async throws -> ModelSubject<BookTags> {
        let session = LanguageModelSession(
            instructions: "Generate tags for this book based on the review."
        )
        let response = try await session.respond(to: sample.prompt, generating: BookTags.self)
        return ModelSubject(value: response.content)
    }

    // Evaluate the output from the intelligent feature.
    var evaluators: Evaluators {
        ModelJudgeEvaluator(
            "TagQuality",
            scale: .numeric([
                4: "Tags accurately represent the book and are useful for browsing.",
                3: "Tags are accurate but include one or two that are too vague or generic.",
                2: "Tags get the general idea but miss important qualities of the book.",
                1: "Tags are inaccurate or misleading.",
            ])
        )
    }

    // Summarize the metrics.
    let tagQuality = Metric("TagQuality")
    func aggregateMetrics(using aggregator: inout MetricsAggregator) {
        aggregator.computeMean(of: tagQuality)
    }
}
```

```swift
    private let accuracy = ScoreDimension(
        "Accuracy",
        description: "Does each tag describe the book itself?",
        scale: .numeric([
            4: "Every tag describes the book's genre, themes, or setting.",
            3: "Most tags describe the book but one or two reflect the reader's opinion.",
            2: "Some tags describe the book but most reflect the reader's opinion.",
            1: "None of the tags meaningfully describe the book.",
        ])
    )
    private let usefulness = ScoreDimension(
        "Usefulness",
        description: "Is each tag the right level for browsing a personal library?",
        scale: .numeric([
            4: "Every tag would help someone find this book while browsing.",
            3: "Most tags are useful for browsing but a couple are too narrow or generic.",
            2: "About half the tags are useful; the rest are too narrow or generic.",
            1: "The tags would not help someone browse a library.",
        ])
    )

    var evaluators: Evaluators {
        ModelJudgeEvaluator(
            dimensions: [accuracy, usefulness]
        )
    }
```

```swift
func aggregateMetrics(using aggregator: inout MetricsAggregator) {
    aggregator.group("Judge") { group in
        group.computeMean(of: accuracy.metric)
        group.computeMean(of: usefulness.metric)
    }
}
```

```swift
struct ExplanationPairwiseEvaluation: Evaluation {
    private let explanationComparison = Metric("ExplanationComparison")

    let dataset = ArrayLoader(samples: [
            ModelSample(
                prompt: "Explain why the sky is blue.",
                expected: "The sky is blue because of the way sunlight interacts with the atmosphere. Blue light gets scattered more than other colors."
            ),
            ModelSample(
                prompt: "Explain what DNA is.",
                expected: "DNA is a molecule in your cells that contains your genetic information. It looks like a twisted ladder. It determines things like your eye color and height."
            ),
            ModelSample(
                prompt: "Explain why ice floats.",
                expected: "Ice floats because water expands when it freezes, making ice less dense than liquid water. The lighter ice sits on top of the heavier water."
            ),
        ])

    func subject(from sample: ModelSample<String>) async throws -> ModelSubject<String> {
        let session = LanguageModelSession(
            instructions: """
                You are a knowledgeable science communicator. Explain concepts clearly and
                engagingly for a general audience. Use analogies and examples where helpful.
                Keep your explanation concise but thorough.
                """
        )
        let response = try await session.respond(to: sample.prompt, generating: String.self)
        return ModelSubject(value: response.content)
    }

    var evaluators: Evaluators {
        ModelJudgeEvaluator.pairwise(
            "ExplanationComparison",
            scale: .numeric([
                4: "Response is significantly clearer, more accurate, and more engaging than the baseline.",
                3: "Response is noticeably better than the baseline in most areas.",
                2: "Baseline is noticeably better than the response in most areas.",
                1: "Baseline is significantly clearer, more accurate, and more engaging than the response.",
            ]),
            judge: SystemLanguageModel.default
        )
    }

    func aggregateMetrics(using aggregator: inout MetricsAggregator) {
        aggregator.computeMean(of: explanationComparison)
    }
}
```

```swift
import Testing
import Evaluations

struct BookTagTests {
    static let evaluation = BookTagEvaluation()
    @Test(.evaluates(Self.evaluation))
    func evaluateTagQuality() async throws {
        let result = EvaluationContext.current.result
        let score = result.aggregateValue(.mean(of: Self.evaluation.tagQuality))
        #expect(score > 2.5)
    }
}
```

## Notes

- iOS 27.0+ / macOS 27.0+ / Xcode 27.0+ (Evaluations framework).
- The metric name passed to `ModelJudgeEvaluator` (for example `"TagQuality"`) identifies the metric in the results and must match the `Metric` used in `aggregateMetrics(using:)`.
- Write scale levels as observable features rather than a restated quality gradient; embed scored examples in `ModelJudgePrompt` instructions to improve consistency.
- Pairwise evaluation sends each sample's `expected` value to the judge as the baseline; a mean above 2.5 suggests responses beat the baseline on a 1-4 scale.
- The ModelJudgePrompt `evaluationTarget` and `reference` closures are described in the source article; this sample keeps only the listings above.
- Apple's on-device Evaluations framework differs from cloud eval products in openai-evals-tuning and anthropic-prompt-eval.
