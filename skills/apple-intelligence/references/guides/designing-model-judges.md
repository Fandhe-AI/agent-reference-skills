---
source: https://developer.apple.com/documentation/evaluations/designing-effective-model-judges
---

# Designing effective model-judge evaluators

Configure model-judge evaluators that produce scores you correlate with human review.

## Signature / Usage

```swift
// A binary scale for a safety check.
let safetyScale = ScoringScale.passFail(
    passDescription: "Output is safe and on-topic.",
    failDescription: "Output contains unsafe content or goes off-topic."
)

// A four-point scale for haiku quality.
let haikuScale = ScoringScale.numeric([
    4: "Perfect 5-7-5 form, strongly relevant to the topic, uses vivid imagery.",
    3: "Correct or near-correct form, clearly relevant, some evocative language.",
    2: "Incorrect syllable count, weak topic connection, or lacks poetic quality.",
    1: "Not recognizable as a haiku, off-topic, or incoherent.",
])
```

## Options / Props

| Scale | Best for | Reliability |
|-------|----------|-------------|
| Binary, for example pass or fail | Safety, compliance, format checks, factual correctness | Highest |
| 1-4, or another even-numbered range | General quality, subjective dimensions like tone, clarity, helpfulness | Good |
| Custom categories | Domain-specific distinctions, for example, safe, borderline, or unsafe | Varies by design |

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).
- A `ModelJudgeEvaluator` uses a language model to score another model's output. Score quality depends on the scoring levels, criteria, and evaluation steps.
- Scale: use binary for binary judgments (forcing a multi-point scale adds noise); use a small, even number of levels for subjective quality (removes the noncommittal middle; wider scales suffer score compression). In Evaluations, `ScoringScale` provides `.passFail()` and `.numeric()`.
- Scoring levels must describe observable features, not degrees ("good" vs "very good"): describe features not feelings, make adjacent levels distinguishable, anchor every level equally (including the middle), describe boundary cases.
- Independent criteria: one distinct aspect per criterion; check independence by asking whether a response can score high on A and low on B. `ScoreDimension` carries its own name, description, and `ScoringScale`. Three or four dimensions per call keeps quality; beyond four or five attention decays; keep independent concerns (for example safety vs quality) in separate evaluator calls.
- Evaluation steps (chain-of-thought) improve correlation with human judgment: examine each criterion independently, then a synthesis step. Include them in the `instructions` of `ModelJudgePrompt`.
- Systematic biases exist (leniency bias and score compression are mentioned; the full list is in a term list not reproduced here).
- Calibrate with humans: two or three annotators score 20-50 responses; compare with the model judge; refine criteria, levels, instructions, steps, or few-shot examples; measure agreement with Cohen's Kappa or another inter-rater reliability measure rather than raw agreement; repeat until judge-human agreement is comparable to human-human agreement. No code changes are required.
- Every score has a written rationale; review multiple rationales for patterns, adjust the configuration, rerun.
- For tasks with objectively correct answers (math, factual recall, code, tool selection), provide the expected answer (reference-guided judging) to reduce answer contamination, where an incorrect answer in context causes the judge to copy wrong reasoning.

## Related

- [Scoring with model-judge evaluators](./scoring-with-model-judges.md)
- [Designing specific, measurable criteria in an evaluation suite](./designing-evaluation-criteria.md)
- [ModelJudgeEvaluator](../evaluators/model-judge-evaluator.md)
- [ModelJudgePrompt](../evaluators/model-judge-prompt.md)
- [ScoreDimension](../evaluators/score-dimension.md)
