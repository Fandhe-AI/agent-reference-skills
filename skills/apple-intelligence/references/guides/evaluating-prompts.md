---
source: https://developer.apple.com/documentation/foundationmodels/evaluating-prompts-to-measure-performance-and-improve-model-responses
---

# Evaluating prompts to measure performance and improve model responses

Systematically measure and improve the quality of your prompts by using structured evaluation.

## Signature / Usage

The source article contains no code listing. Its subject API is the `Evaluation` protocol of the Evaluations framework (see the evaluations category); the member shape shown in "Evaluating language model responses" is:

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

## Notes

- Article in the Foundation Models framework (iOS 26.0+, iPadOS 26.0+, macOS 26.0+, Mac Catalyst 26.0+, visionOS 26.0+, watchOS 27.0+). The Evaluations framework itself is 27.0+ (Xcode 27.0+).
- Prompt evaluation: test prompts against real-world scenarios to measure quality, catch failures early, and improve confidently. Start with a single critical quality criterion and a handful of scenarios, then expand. The strategy applies to Swift or Python (see Foundation Models SDK for Python, https://github.com/apple/python-apple-fm-sdk).
- Why it matters: output varies for identical input (probabilistic generation and model updates you do not control); quality is nuanced rather than exact-match, so translate requirements into objective, measurable criteria (for example a beginner recipe has three to six ingredients and takes under 20 minutes); a single added word can change behavior; model output reaches people.
- Anatomy: test inputs (common, complex multi-constraint, edge, adversarial), quality criteria (each examines one aspect), and measurement methods (rule-based checks, comparison to ground truth, model-based judgment; robust evaluations combine them). Output is pass-fail results, numeric scores, or percentages.
- Dataset: key success scenarios, challenge scenarios (edge cases, adversarial inputs such as "Give me a vegan steak recipe", known failure modes), coverage across regions, experience levels, and use cases. Add real interactions over time; synthetic data can add variation.
- Evaluation-driven workflow (five steps): define key success scenarios; develop with testability in mind; run systematic evaluations; analyze patterns in failures; make targeted improvements. Iterating in small measured changes is called hill climbing. Re-run the full suite after every change to prevent regressions.
- Some term-list items in the official article (criteria transformation and measurement approaches) are not reproduced here; see the official page.

## Related

- [Evaluating language model responses](./evaluating-language-model-responses.md)
- [Analyzing the runtime performance of your Foundation Models app](./runtime-performance.md)
- [Prompting an on-device foundation model](./prompting.md)
