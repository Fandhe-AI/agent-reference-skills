---
source: https://developer.apple.com/documentation/evaluations/modeljudgeprompt
---

# ModelJudgePrompt

A configuration for how a model evaluator constructs its prompt.

## Signature / Usage

```swift
struct ModelJudgePrompt<Input> where Input : ModelSampleProtocol
```

```swift
let prompt = ModelJudgePrompt<ModelSample<String>>(
    instructions: "You are a domain expert evaluating product reviews."
)
```

`ModelJudgePrompt` bundles the instructions, response presentation, and reference-data injection into a single composable value. Use it with `ModelJudgeEvaluator` to customize how the model judge sees the evaluation.

## Options / Props

| Name | Description |
|------|-------------|
| init(instructions:evaluationTarget:reference:) | Creates a model prompt configuration. |
| defaultInstructions | The default system instructions used when no custom instructions are provided. |
| instructions | The system instructions for the model judge. |
| evaluationTarget | An optional closure that converts the model's response to a string for the model prompt. |
| reference | An optional closure that provides labeled reference data to include in the model prompt. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [ModelJudgeEvaluator](./model-judge-evaluator.md)
- [ScoreDimension / ScoreLevel / ScoringMode / ScoringScale](./score-dimension.md)
