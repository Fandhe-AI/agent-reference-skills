---
source: https://developer.apple.com/documentation/evaluations/evaluationtrait, https://developer.apple.com/documentation/evaluations/evaluationcontext
---

# EvaluationTrait / EvaluationContext

`EvaluationTrait` is a test trait that runs an evaluation and records the result as attachments. `EvaluationContext` provides the evaluation result within a test scope.

## Signature / Usage

```swift
struct EvaluationTrait
struct EvaluationContext
```

```swift
let accuracyMetric = Metric("Accuracy")

@Test(.evaluates(myEvaluation))
func testAccuracy() async throws {
    let result = EvaluationContext.current.result
    #expect(result.aggregateValue(.mean(of: accuracyMetric)) >= 0.8)
}
```

## Options / Props

| Name | Owner | Description |
|------|-------|-------------|
| provideScope(for:testCase:performing:) | EvaluationTrait | Runs the evaluation and makes its result available to the test body through an evaluation context. |
| result | EvaluationContext | The evaluation result. |
| current (type property) | EvaluationContext | The current evaluation context within the active test scope. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- Integrates with Swift Testing (`@Test`, `#expect`); the result is read from `EvaluationContext.current.result` inside the test body.

## Related

- [Evaluation](./evaluation.md)
- [EvaluationResult](./evaluation-result.md)
