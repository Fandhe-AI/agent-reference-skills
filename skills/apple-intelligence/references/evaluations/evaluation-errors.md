---
source: https://developer.apple.com/documentation/evaluations/evaluationerror, https://developer.apple.com/documentation/evaluations/evaluationresultserror, https://developer.apple.com/documentation/evaluations/subjectinferenceerror, https://developer.apple.com/documentation/evaluations/evaluatorerror
---

# EvaluationError / EvaluationResultsError / SubjectInferenceError / EvaluatorError

Four error enumerations in the Evaluations framework.

## Signature / Usage

### EvaluationError

Errors thrown during an evaluation run.

```swift
enum EvaluationError
```

```swift
do {
    let result = try await evaluation.run()
} catch EvaluationError.missingTranscript(let evaluatorType) {
    print("'\(evaluatorType)' requires a transcript")
}
```

### EvaluationResultsError

Errors the framework throws when parsing evaluation results.

```swift
enum EvaluationResultsError
```

```swift
do {
    throw EvaluationResultsError.fileNotFound(URL(fileURLWithPath: "/tmp/results.json"))
} catch EvaluationResultsError.fileNotFound(let url) {
    print("File not found: \(url)")
}
```

### SubjectInferenceError

A failure to produce a subject for a sample.

```swift
enum SubjectInferenceError
```

```swift
let result = try await evaluation.run()
if result.detailed.containsColumn("SubjectInferenceError") {
    let column = result.detailed["SubjectInferenceError", SubjectInferenceError.self]
    for (index, failure) in column.enumerated() {
        if let failure {
            print("Sample \(index) failed: \(failure.localizedDescription)")
        }
    }
}
```

### EvaluatorError

Why an evaluator failed while scoring a produced subject.

```swift
enum EvaluatorError
```

```swift
let result = try await evaluation.run()
if result.detailed.containsColumn("EvaluatorErrors") {
    let column = result.detailed["EvaluatorErrors", [EvaluatorError].self]
    for (index, failures) in column.enumerated() {
        if let failures {
            for failure in failures {
                print("Sample \(index): \(failure.localizedDescription)")
            }
        }
    }
}
```

## Options / Props

| Case | Enum | Description |
|------|------|-------------|
| duplicateMetricName(name:) | EvaluationError | Two evaluators, or a single evaluator returning multiple metrics, produced a metric with the same name for the same sample. |
| missingTranscript(evaluatorType:) | EvaluationError | An evaluator received a subject without the required transcript. |
| emptyJSONFile | EvaluationResultsError | The JSON file exists but contains no data. |
| fileNotFound(_:) | EvaluationResultsError | The specified file URL is not findable on disk. |
| invalidJSONFormat | EvaluationResultsError | The JSON data doesn't match the expected evaluation result format. |
| failed(reason:) | SubjectInferenceError | The subject method threw an error. |
| failed(evaluator:evaluatorType:reason:) | EvaluatorError | The evaluator threw an error while scoring the subject. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.
- The runner records `SubjectInferenceError` values in the `"SubjectInferenceError"` column of `detailed`, and `EvaluatorError` values as an array in the `"EvaluatorErrors"` column. Each column is omitted entirely on a clean run, so check for its presence before reading it.
- Rows with a `SubjectInferenceError` have a `nil` `Response`; rows with an `EvaluatorErrors` value always have a non-`nil` `Response` (evaluators run only after subject production succeeds). Multiple evaluators can fail for the same sample.

## Related

- [EvaluationRunErrors](./evaluation-run-errors.md)
- [EvaluationResult](./evaluation-result.md)
- [EvaluationSubject / ModelSubject](./evaluation-subject.md)
