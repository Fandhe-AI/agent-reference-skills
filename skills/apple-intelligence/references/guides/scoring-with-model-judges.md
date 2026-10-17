---
source: https://developer.apple.com/documentation/evaluations/scoring-with-model-as-judge-evaluators
---

# Scoring with model-judge evaluators

Score subjective qualities like tone, accuracy, and relevance that programmatic checks cannot measure.

## Signature / Usage

Pointwise evaluator with a single scale:

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

Multiple dimensions in a single pass:

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

Reference data and structured-output formatting:

```swift
ModelJudgeEvaluator(
    "TagQuality",
    scale: .numeric([
        4: "All tags are relevant and match the expected tags closely.",
        3: "Most tags match the expected tags, with one or two missing or incorrect.",
        2: "Some tags match but several are missing or incorrect.",
        1: "Tags are mostly irrelevant or completely wrong.",
    ]),
    judge: SystemLanguageModel.default,
    prompt: ModelJudgePrompt(
        instructions: """
            You are evaluating automatically generated tags for Book Tracker, a personal
            book-tracking app. A good tag is specific, relevant to the book's content, and useful
            for organizing a personal library. A bad tag is generic, irrelevant, or misleading.
            Compare the generated tags against the expected tags and evaluate step by step.
            """,
        evaluationTarget: { value in
            "\(value.tags.count) Generated tags: " + value.tags.joined(separator: ", ")
        },
        reference: { input, _ in
            guard let expected = input.expected else { return [:] }
            return ["Expected Tags": expected.tags.joined(separator: ", ")]
        }
    )
)
```

Pairwise evaluation:

```swift
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
```

Running:

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

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).- `ModelJudgeEvaluator` uses a language model to score another model's output with a scoring scale and, optionally, a `ModelJudgePrompt`. Each response gets a score and a written rationale; the result is a `Metric` you aggregate like any other. The framework supports two modes (pointwise and pairwise; the official page lists them in a term list not reproduced here).
- The first parameter ("TagQuality") names the metric; use the same string in `aggregateMetrics(using:)`. Each scale level should describe observable features.
- `ScoreDimension` splits concerns into separate questions with separate scales; the evaluator scores all dimensions in a single judge call (no extra latency) via the `dimensions:` parameter and exposes `.metric` per dimension.
- `ModelJudgePrompt` has three components (instructions, `evaluationTarget`, `reference`). Instructions should include a role, criteria, and evaluation steps; omitting the prompt uses default instructions. Embed scored examples (prompt, response, score, rationale) spanning the scale, ending with "Use these examples to calibrate your scoring." By default the judge receives a JSON-serialized result; `evaluationTarget` formats it as readable text. The `reference` closure receives the input sample and response and returns `[String: String]`; each pair becomes a labeled section of the judge prompt.
- Pairwise: `pairwise(_:scale:judge:scoringMode:evaluationTarget:)` compares a response with a baseline and uses its own built-in prompt; the sample's `expected` value is sent as the baseline. `instructions` and `reference` apply only to pointwise. With a 1-4 scale, a mean above 2.5 indicates responses are generally better than baselines, below 2.5 regressions.
- Code-based `Evaluator`s and model-judge evaluators can be combined in one evaluation; both produce `Metric` values aggregated in one `MetricsAggregator`.
- Distinct from cloud platform graders and LLM-as-judge tooling: see openai-evals-tuning and anthropic-prompt-eval for those. This page covers the on-device `ModelJudgeEvaluator`.

## Related

- [Designing effective model-judge evaluators](./designing-model-judges.md)
- [ModelJudgeEvaluator](../evaluators/model-judge-evaluator.md)
- [ModelJudgePrompt](../evaluators/model-judge-prompt.md)
- [ScoreDimension](../evaluators/score-dimension.md)
- [Designing specific, measurable criteria in an evaluation suite](./designing-evaluation-criteria.md)
