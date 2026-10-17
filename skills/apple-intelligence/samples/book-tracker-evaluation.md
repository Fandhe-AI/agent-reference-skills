---
source: https://developer.apple.com/documentation/evaluations/book-tracker-using-evaluations-to-evaluate-an-intelligent-feature
---

# Book Tracker Evaluation

Evaluate a tag-generation feature end to end: code-based checks, a model judge with two dimensions, aggregated metrics, a threshold test, and tool-call trajectories.

```swift
@Generable
struct BookTags: Codable, Equatable {
    @Guide(description: "Descriptive tags capturing themes, genres, moods, and topics from the review", .count(3...8))
    var tags: [String]
}
```

```swift
static func generateTags(for review: String) async throws -> BookTags {
    let session = LanguageModelSession(
        model: SystemLanguageModel(guardrails: .permissiveContentTransformations),
        instructions: instructions
    )
    let response = try await session.respond(to: tagsPrompt(review: review), generating: BookTags.self)
    return response.content
}
```

```swift
var dataset = ArrayLoader(samples:
    Book.sampleBooks.map { book in
        ModelSample(prompt: book.review, expected: BookTags(tags: book.tags))
    }
)
```

```swift
func subject(from sample: ModelSample<BookTags>) async throws -> ModelSubject<BookTags> {
    let result = try await BookTaggingService.generateTags(for: sample.promptDescription)
    return ModelSubject(value: result)
}
```

```swift
/// Whether the tag count fell in the required 3–8 range.
let tagCount = Metric("Tag Count")
/// Raw tag count, aggregated for variance reporting.
let tagTotal = Metric("Tag Total")
/// Whether at least one tag matched the known-genre list.
let hasGenreTag = Metric("Has Genre Tag")
/// Whether every tag is a single word.
let wordCount = Metric("Word Count")

var evaluators: Evaluators {
    // Tag count is within the required 3–8 range.
    Evaluator { _, subject in
        let count = subject.value.tags.count
        if count >= 3 && count <= 8 {
            return tagCount.passing(rationale: "\(count) tags")
        }
        return tagCount.failing(rationale: "Got \(count) tags, expected 3–8")
    }

    // Records raw tag count.
    Evaluator { _, subject in
        let count = subject.value.tags.count
        return tagTotal.scoring(Double(count))
    }

    // Tags must be single-word or hyphenated.
    Evaluator { _, subject in
        for tag in subject.value.tags where tag.contains(" ") {
            return wordCount.failing(rationale: "Tag \(tag) contains multiple words")
        }
        return wordCount.passing()
    }

    // Pass on the first known-genre match.
    Evaluator { _, subject in
        let tags = subject.value.tags.map { $0.lowercased() }
        let knownGenres = BookTaggingService.knownGenres
        for tag in tags where knownGenres.contains(tag) {
            return hasGenreTag.passing(rationale: "Matched \(tag)")
        }
        return hasGenreTag.failing()
    }
}
```

```swift
ModelJudgeEvaluator(
    judge: SystemLanguageModel.default,
    dimensions: [relevance, usefulness],
    prompt: ModelJudgePrompt(
        instructions: """
            You are evaluating tags generated for a personal book-tracking app where users
            organize their library by browsing and filtering tags.
            """,
        evaluationTarget: { value in
            "\(value.tags.count) Generated tags: " + value.tags.joined(separator: ", ")
        },
        reference: { input, _ in
            ["Expected Tags": input.expected?.tags.joined(separator: ", ") ?? "No expected tags defined"]
        }
    )
)
```

```swift
func aggregateMetrics(using aggregator: inout MetricsAggregator) {
    aggregator.group("Heuristics") { aggregator in
        aggregator.computeMean(of: tagCount)
        aggregator.computeStandardDeviation(of: tagTotal)
        aggregator.computeMean(of: tagTotal)
        aggregator.computeVariance(of: tagTotal)
        aggregator.computeMean(of: wordCount)
        aggregator.computeMean(of: hasGenreTag)
    }
    aggregator.group("Quality") { group in
        group.computeMean(of: relevance.metric)
        group.computeMean(of: usefulness.metric)
    }
}
```

```swift
@Test("Book Tag Evaluations", .evaluates(evaluation, info: evaluationInfo))
func evaluateBookTagging() async throws {
    let result = EvaluationContext.current.result
    #expect(result.aggregateValue(.mean(of: evaluation.tagCount)) >= 0.8)
}
```

```swift
expectations: TrajectoryExpectation(
    ordered: [
        ToolExpectation("searchBooks", arguments: [
            .exact(argumentName: "tag", value: .string("gothic"))
        ]),
        ToolExpectation("getBookDetails", arguments: [.keyOnly(argumentName: "bookId")])
    ],
    allowsAdditionalToolCalls: true
)
```

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, Xcode 27.0+ (sample-code page; associated with WWDC26 sessions 298, 335, and 299).
- `Book`, `BookTaggingService`, `relevance`, and `usefulness` are types or values of the sample project; the `ScoreDimension` definitions for `relevance` and `usefulness` are listed in the source page. Project files themselves are not reproduced here.
- Model-judge calibration uses Cohen's kappa via a `custom(of:label:)` aggregator and a test threshold above 0.6; the full prompt with worked examples is on the source page.
- The sample's `BookSampleGenerator` uses `SampleGenerator` with `PrivateCloudComputeLanguageModel` for offline synthetic data (see `synthetic-dataset.md`).
