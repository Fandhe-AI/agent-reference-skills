---
source: https://developer.apple.com/documentation/evaluations/designing-effective-evaluations
---

# Designing effective evaluations

Design evaluations that tell you how well your feature works, why it fails, and where to focus next.

## Signature / Usage

```swift
aggregator.computeMean(of: safetyCheck)   // Pass rate for binary metrics.
aggregator.computeMedian(of: qualityScore) // Central tendency for scored metrics.
```

## Options / Props

Vague goals translated to precise criteria:

| Vague goal | Precise criterion |
|------------|-------------------|
| "Stay within budget." | 100% compliance with stated budget ceiling (pass/fail) |
| "Be helpful." | Greater than 90% task success rate on common query benchmark |
| "Match the user's skill level." | Complexity score (1-4) within 0.5 of stated preference |
| "Generate accurate tags." | 95% of tags classify as factual descriptors, not subjective reactions |

## Notes

- Article in the Evaluations framework (iOS 27.0+, iPadOS 27.0+, macOS 27.0+, Mac Catalyst 27.0+, visionOS 27.0+, watchOS 27.0+; Xcode 27.0+).
- Intelligence-powered features break the determinism assumption of unit tests, so build an evaluation practice. Treat the evaluation as a living specification: the `Evaluation` protocol bundles the feature under test, dataset, evaluators, and result aggregation into one runnable definition.
- Life cycle: Plan (define the feature and success metrics), Develop (prompts, model, feature), Evaluate (run against a dataset and score), Analyze (where and why it fails), Improve (refine prompts, settings, or test cases, then repeat).
- Components: a dataset of samples with expected outputs; the subject; evaluators; aggregated metric summary. A good dataset includes golden samples, edge cases, and adversarial inputs. Two evaluator kinds: code-based (format compliance, word limits, schema validation, exact matches; instant, free, reproducible) and model-judge (tone, clarity, helpfulness; scored against levels you define).
- `EvaluationResult` has `summary` (aggregate statistics) and `detailed` (per-sample scores); both matter. Organize results by dataset category. Use the mean of pass/fail metrics for pass rate and the median of scored metrics to resist outlier skew.
- Always verify the metric measures what you think: a perfect score can be misleading (for example zero bias because the model is not answering at all).
- Improvement cycle: Hypothesize, Modify (targeted change), Re-run the entire suite (not just failing samples), Compare.
- Overfitting: keep a holdout set that is never used during prompt development and run it at milestones; vary inputs; watch for brittle fixes; periodically test with new data.
- Capture failures as regression cases in a "known failures" category. Growth plan: week one 2-3 evaluators and 10-20 golden samples; first month add challenge sets and a model judge (30-50 samples); ongoing add real interactions (with permission), use `SampleGenerator` for statistical consistency at volume.
- Integrate: run on every prompt change, model update (OS update or API version bump), and tool modification; label runs with model name, dataset version, and prompt version; reuse evaluation assertions as runtime guardrails; treat runs like CI checks.
- Some term-list items in the official article (testing complexities, specification attributes, costs of skipping evaluation, result-review patterns) are not reproduced here; see the official page.

## Related

- [Evaluating language model responses](./evaluating-language-model-responses.md)
- [Designing datasets to test your feature](./designing-evaluation-datasets.md)
- [Designing specific, measurable criteria in an evaluation suite](./designing-evaluation-criteria.md)
- [Designing effective model-judge evaluators](./designing-model-judges.md)
- [Generating synthetic datasets](./generating-synthetic-datasets.md)
