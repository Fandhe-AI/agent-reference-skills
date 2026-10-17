---
source: https://developer.apple.com/documentation/evaluations/modeljudgeevaluator, https://developer.apple.com/documentation/evaluations/modeljudgeerror
---

# ModelJudgeEvaluator

An evaluator that uses a language model as a judge to score responses.

## Signature / Usage

```swift
struct ModelJudgeEvaluator<Input> where Input : ModelSampleProtocol
```

`ModelJudgeEvaluator` sends the query, response, and optional reference data to a model judge, which returns scores for one or more dimensions. The response is automatically serialized as JSON, because `OutputType` is `Codable`, or is customizable via `ModelJudgePrompt`.

## Options / Props

| Name | Description |
|------|-------------|
| init(_:scale:judge:scoringMode:) | Creates a single-metric evaluator with default prompt configuration. |
| init(_:scale:judge:scoringMode:prompt:) | Creates a single-metric evaluator with a custom judge prompt. |
| init(judge:dimensions:scoringMode:) | Creates a multi-metric evaluator with default prompt configuration. |
| init(judge:dimensions:scoringMode:prompt:) | Creates a multi-metric evaluator with a custom judge prompt. |
| pairwise(_:scale:judge:scoringMode:evaluationTarget:) | Creates a pairwise comparison evaluator that compares the model's response against the sample's expected value. |
| pairwise(judge:dimensions:scoringMode:evaluationTarget:) | Creates a multi-metric pairwise comparison evaluator. |
| defaultInstructions | The default system instructions the model uses when no custom instructions are provided. |
| judgePrompt(for:output:) | Builds and returns the full judge prompt for inspection, debugging, or logging. |
| dimensions | The dimensions this evaluator scores. |
| scoringMode | The scoring constraint mode. See `ScoringMode`. |

### ModelJudgeError

```swift
enum ModelJudgeError
```

| Case | Description |
|------|-------------|
| invalidResponse(_:) | The evaluator can't interpret the model judge's response as a valid score. |
| invalidScore(dimension:value:) | A scoring dimension returns a value the evaluator can't parse as a number. |
| jsonDecodingFailed(response:underlying:) | The evaluator fails to decode the JSON from the model judge's response. |
| missingDimension(_:response:) | The model judge's response is missing a required scoring dimension. The first associated value is the name of the missing dimension. |
| noScaleValues(dimension:) | The scoring dimension has no scale values defined. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- Distinct from cloud-API eval and grader tooling: for OpenAI Evals / graders see openai-evals-tuning, and for Claude prompt evaluation see anthropic-prompt-eval. This page covers the Apple Evaluations framework only.

## Related

- [ModelJudgePrompt](./model-judge-prompt.md)
- [ScoreDimension / ScoreLevel / ScoringMode / ScoringScale](./score-dimension.md)
- [Evaluator](./evaluator.md)
