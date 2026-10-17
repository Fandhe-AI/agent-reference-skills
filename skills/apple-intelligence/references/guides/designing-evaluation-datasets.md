---
source: https://developer.apple.com/documentation/evaluations/designing-evaluation-datasets
---

# Designing datasets to test your feature

Build categorized test datasets that reflect the full range of real-world use of your feature.

## Signature / Usage

```swift
@Suite("Golden") struct GoldenEvaluations { /* ... */ }
@Suite("Edge cases") struct EdgeCaseEvaluations { /* ... */ }
@Suite("Adversarial") struct AdversarialEvaluations { /* ... */ }
@Suite("Known failures") struct KnownFailureEvaluations { /* ... */ }
```

Expanding a category with a focused generation prompt:

```swift
// Generate urgent work tasks with tight deadlines.
let workSeeds = dataset.filter { $0.expected?.category == .work }
let workPrompt = Prompt("""
    Generate realistic work tasks with explicit deadlines within 48 hours.
    Vary phrasing: some as direct requests, some as meeting invites, some as
    forwarded messages. Each needs a clear urgency signal.
    """)
for try await sample in workSeeds.makeSamples(workPrompt, targetCount: 30) {
    expanded.append(sample)
}

// Separately, generate ambiguous personal tasks with no due date.
let personalSeeds = dataset.filter { $0.expected?.category == .personal }
let personalPrompt = Prompt("""
    Generate personal reminders where the correct category isn't obvious and
    no due date is specified. Include requests that could plausibly be
    errands, home, or health tasks.
    """)
for try await sample in personalSeeds.makeSamples(personalPrompt, targetCount: 30) {
    expanded.append(sample)
}
```

## Options / Props

Practical dataset sizes:

| Scenario | Samples |
|----------|---------|
| Single feature evaluation | 100-500 with coverage across difficulty levels and input subtypes |
| Multi-feature benchmark | 50-200 per feature or category |
| Statistical power | About 400 samples to detect a 5-percent accuracy difference with 95-percent confidence |

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).
- A dataset that only covers the happy path gives false confidence. Sketch user profiles (expertise, goals, phrasing, edge cases); each profile needs at least one sample, then add more per profile.
- Categorize samples by purpose (golden, edge cases, adversarial, known failures; the official page lists the categories in a term list not reproduced here). Swift Testing `@Suite` can keep each category isolated and runnable on its own.
- Source data from several channels; start with a small set of carefully chosen samples and expand with synthetic generation only after evaluators are stable.
- Seed samples set the ceiling for synthetic quality. Cover each axis (difficulty, length, phrasing, category, edge conditions) with at least one seed at each end; make at least 20-30 percent of seeds genuinely difficult; include seeds where the correct behavior is to refuse, flag ambiguity, or produce a partial answer. Mark each seed with category, difficulty, and quality dimension.
- Use `SampleGenerator` with focused prompts per category or per dimension combination rather than one "diverse" prompt, which causes frequency bias, uneven coverage, and diminishing novelty.
- Synthetic strengths: format and structure testing, paraphrase and robustness, classification and routing, coverage expansion. Weaknesses: domain-expert knowledge, adversarial and safety testing, long-tail distributions, cultural and contextual nuance. Failure modes: mode collapse, difficulty collapse, answer leakage, distributional shift.
- Validate synthetic output: programmatic `validator` closure, category balance checks, human spot-check of a random 5-10 percent, self-consistency checks, deduplication (identical prompts are removed automatically; near-duplicates may remain). Keep at least 20-30 percent human-written samples as a calibration anchor.
- More data is not always better: 100-500 well-constructed samples can discriminate better than a noisy 5,000.

## Related

- [Generating synthetic datasets](./generating-synthetic-datasets.md)
- [Designing specific, measurable criteria in an evaluation suite](./designing-evaluation-criteria.md)
- [SampleGenerator](../evaluations/sample-generator.md)
- [ModelSample](../evaluations/model-sample.md)
- [Loader](../evaluations/loader.md)
