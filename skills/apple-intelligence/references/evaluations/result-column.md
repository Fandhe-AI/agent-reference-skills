---
source: https://developer.apple.com/documentation/evaluations/resultcolumn, https://developer.apple.com/documentation/evaluations/evaluation/inputcolumn, https://developer.apple.com/documentation/evaluations/evaluation/responsecolumn, https://developer.apple.com/documentation/evaluations/evaluation/expectedcolumn
---

# ResultColumn

A typed descriptor for a column in an evaluation result DataFrame.

## Signature / Usage

```swift
struct ResultColumn<Value>
```

```swift
let column = myEvaluation.inputColumn
```

`Evaluation` exposes three descriptors:

```swift
var inputColumn: ResultColumn<Self.Sample> { get }
var responseColumn: ResultColumn<Self.Subject> { get }
var expectedColumn: ResultColumn<Self.Sample.ExpectedValue> { get }
```

## Options / Props

| Name | Description |
|------|-------------|
| name | The column name in the DataFrame. |
| inputColumn | A typed column descriptor for the input samples in the detailed DataFrame. |
| responseColumn | A typed column descriptor for the model responses in the detailed DataFrame. |
| expectedColumn | A typed column descriptor for the expected values in the detailed DataFrame. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [EvaluationResult](./evaluation-result.md)
- [Evaluation](./evaluation.md)
