---
source: https://developer.apple.com/documentation/evaluations/toolcallevaluator
---

# ToolCallEvaluator

An evaluator that verifies agentic tool calls against an expected trajectory.

## Signature / Usage

```swift
struct ToolCallEvaluator<Input> where Input : ModelSampleProtocol, Input.Expectation == TrajectoryExpectation
```

This evaluator produces both a strict and partial result from a single evaluation pass. It also supports ordered sequences, unordered expectations, disallowed tool checks, and group steps.

Use the `toolsAllPass` and `toolsPercentagePass` conveniences for the standard metrics:

```swift
let evaluator = ToolCallEvaluator<ModelSample<String>>(
    allPass: .toolsAllPass, percentagePass: .toolsPercentagePass
)
```

## Options / Props

| Name | Description |
|------|-------------|
| init(allPass:percentagePass:) | Creates a new tool-call expectations evaluator. |
| init(allPass:percentagePass:argumentMatchModel:) | Creates a new tool-call expectations evaluator with a custom language model for semantic matching of natural language argument matchers. |
| allPass | The metric for the strict pass or fail result. |
| percentagePass | The metric for the partial score result. |
| metrics(subject:input:) | Evaluates tool-call expectations against the actual transcript and returns scored metrics. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- The sample's `Expectation` must be `TrajectoryExpectation`.
- Distinct from cloud-API tool-call evaluation: for OpenAI Evals / graders see openai-evals-tuning, and for Claude prompt evaluation see anthropic-prompt-eval. This page covers the Apple Evaluations framework only.

## Related

- [TrajectoryExpectation / ToolExpectation](./trajectory-expectation.md)
- [ArgumentMatcher / ArgumentValue / StructuredValue](./argument-matcher.md)
- [Metric](./metric.md)
- [Evaluator](./evaluator.md)
