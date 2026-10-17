---
source: https://developer.apple.com/documentation/evaluations/evaluationresult, https://developer.apple.com/documentation/evaluations/evaluationresult/dataframekind
---

# EvaluationResult

The results of running a model evaluation. A structure that contains the summary and detailed results from an evaluation run.

## Signature / Usage

```swift
struct EvaluationResult
```

Use the column descriptors from your `Evaluation` to access typed columns from the `detailed` DataFrame:

```swift
let result = try await evaluation.run(on: samples)
let inputs = result.detailed[evaluation.inputColumn]
let responses = result.detailed[evaluation.responseColumn]
let expected = result.detailed[evaluation.expectedColumn]
```

### EvaluationResult.DataFrameKind

```swift
enum DataFrameKind
```

```swift
let kind: EvaluationResult.DataFrameKind = .summary
```

Cases: `.detailed` (the sample-level detailed results DataFrame), `.summary` (the aggregated summary DataFrame).

## Options / Props

| Name | Description |
|------|-------------|
| summary | Aggregated statistics for each metric in the evaluation. |
| detailed | Individual results for each sample in the evaluation. |
| evaluationInfo | User-defined information about this evaluation, such as the model name, prompt version, or dataset. |
| evaluationID | The identifier of the evaluation that produced these results. |
| resultID | A unique identifier for this particular result. |
| reportMetadata | Framework-generated metadata used for report presentation. |
| aggregateValue(_:) | Returns the first aggregate value matching the given operation, or `-1` if not found. |
| startTime / endTime / duration | When the run started and finished; the total duration. |
| groupedSummary | A formatted description of summary metrics organized by groups. |
| jsonRepresentableDataFrame(of:) | Transforms a DataFrame into one with column types compatible with JSON representation. |
| saveJSON(to:includeReportMetadata:includeTranscripts:) | Saves evaluation results to a single JSON file. |
| jsonData(includeReportMetadata:includeTranscripts:jsonOptions:) | Returns the evaluation results as JSON data. |
| loadJSON(from:) | Loads an evaluation result from a JSON file on disk. |
| loadJSONLines(from:) | Loads an array of evaluation results from a JSONL file on disk. |
| init(jsonData:) | Creates an evaluation result by parsing JSON data. |
| errors | A summary of the failures encountered during the run. |

## Notes

- Availability: iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, visionOS 27.0+, watchOS 27.0+, Xcode 27.0+.

## Related

- [ResultColumn](./result-column.md)
- [EvaluationRunErrors](./evaluation-run-errors.md)
- [Evaluation](./evaluation.md)
- [EvaluationTrait / EvaluationContext](./evaluation-trait.md)
