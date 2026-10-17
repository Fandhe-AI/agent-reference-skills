---
source: https://developer.apple.com/documentation/evaluations/designing-evaluation-criteria
---

# Designing specific, measurable criteria in an evaluation suite

Define quality for your feature by choosing measurable criteria, scoring approaches, and ground-truth strategies.

## Signature / Usage

```swift
Evaluator { input, subject in
    subject.value.split(separator: " ").count <= 200
        ? wordLimit.passing() : wordLimit.failing()
}
```

## Options / Props

Goals to measurable targets:

| Goal | Criterion | Measurement |
|------|-----------|-------------|
| Responses respect constraints. | Output stays within stated limits. | Pass or fail per constraint |
| Output is factually grounded. | Claims are supported by provided context. | Score 1-4 on factual scale |
| Feature handles diverse inputs. | Quality is consistent across input categories. | Standard deviation of category mean scores |
| Includes no harmful content. | Output avoids unsafe or inappropriate material. | Pass if no safety violations detected |

Scoring approaches:

| Approach | Use when | Speed | Cost | Reproducibility |
|----------|----------|-------|------|-----------------|
| Code-based (`Evaluator`) | Correctness has a computable definition, for example, exact match, schema validation, or range check. | Instant | Free | Perfect |
| Model judge (`ModelJudgeEvaluator`) | Quality is subjective or requires reasoning, for example, helpfulness, tone, or accuracy of classification. | Seconds | Inference cost | High with well-defined scoring levels |
| Human review | High stakes, calibrating model-judge evaluators, or discovering gaps in your scoring dimensions. | Minutes or more | Expensive | Variable |

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).
- Criteria are measurable standards of quality; vague criteria produce vague signals. Most features combine rule-based checks, scored quality dimensions, and model-judge assessments in an evaluation suite. Start with the criteria that matter most to users.
- Choose at least one criterion per quality dimension that carries real risk or value (the official page lists dimensions in a term list not reproduced here). Start with two or three evaluators and add more as failures appear.
- Use code when you can (word limits, schema conformance, numeric ranges). Use a model judge when code cannot capture the criterion; its quality depends on scoring levels specific enough that two independent reviewers would assign the same score. Use humans to calibrate, not to score at scale: compare human scores with model-judge scores and refine levels where they disagree.
- Ground-truth strategies relate differently to scoring (rule-based, explicit ground truth, no ground truth; details in a term list not reproduced here). Most suites combine all three: format compliance (rule-based), comparison to known-correct values for a core set (explicit ground truth), and model-judge for subjective quality (no ground truth).
- Use a judge model that is more capable than the model being evaluated, to reduce shared gaps.

## Related

- [Designing effective evaluations](./designing-effective-evaluations.md)
- [Designing effective model-judge evaluators](./designing-model-judges.md)
- [Scoring with model-judge evaluators](./scoring-with-model-judges.md)
- [Evaluator](../evaluators/evaluator.md)
- [Metric](../evaluators/metric.md)
