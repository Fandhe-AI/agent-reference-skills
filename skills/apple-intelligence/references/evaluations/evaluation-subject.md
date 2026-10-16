---
source: https://developer.apple.com/documentation/evaluations/evaluationsubject, https://developer.apple.com/documentation/evaluations/modelsubject
---

# EvaluationSubject / ModelSubject

`EvaluationSubject` is a type that represents the output the system under test produces. `ModelSubject` is the subject type for language model evaluations.

## Signature / Usage

### EvaluationSubject

```swift
protocol EvaluationSubject<Value>
```

Conform to this protocol to define custom subject types. The primary concrete conformance is `ModelSubject`, which carries a value and an optional transcript for tool-call evaluation.

```swift
struct MySubject<Value: Codable>: EvaluationSubject {
    var value: Value
    var transcript: StructuredTranscript?
}
```

### ModelSubject

```swift
struct ModelSubject<Value> where Value : Decodable, Value : Encodable, Value : Sendable
```

```swift
let subject = ModelSubject(value: "Paris, France")
```

## Options / Props

| Name | Owner | Description |
|------|-------|-------------|
| Value | EvaluationSubject | The type of value the system under test produces. |
| value | EvaluationSubject | The typed value the system under test produces. |
| transcript | EvaluationSubject | The structured transcript captured while producing the value, if any. |
| init(value:transcript:) | ModelSubject | Creates a model subject with a value and optional transcript. |
| value | ModelSubject | The typed value the model produces. |
| transcript | ModelSubject | The structured transcript from the model session. |
| toolCalls | ModelSubject | The tool calls from the transcript, or an empty array if no transcript was provided. |
| StructuredTranscript | ModelSubject | Transcript type (no abstract in the source). |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- The transcript is required for tool-call evaluation. `ToolCallEvaluator` performs a runtime check and throws `EvaluationError.missingTranscript(evaluatorType:)` if the transcript is `nil`.

## Related

- [Evaluation](./evaluation.md)
- [EvaluationError](./evaluation-errors.md)
