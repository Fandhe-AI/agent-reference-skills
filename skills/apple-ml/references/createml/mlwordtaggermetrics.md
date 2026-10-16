# MLWordTaggerMetrics

Metrics you use to evaluate a word tagger's performance.

## Signature / Usage

```swift
struct MLWordTaggerMetrics

var taggingError: Double
var confusionDataFrame: DataFrame
var precisionRecallDataFrame: DataFrame
var isValid: Bool
var error: (any Error)?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `taggingError` | `Double` | The fraction of incorrectly tagged examples |
| `precisionRecall` | `MLDataTable` | Precision and recall percentages for each category (deprecated) |
| `confusion` | `MLDataTable` | Actual vs predicted labels for each tagging category (deprecated) |
| `precisionRecallDataFrame` | `DataFrame` | Precision and recall percentages for each class |
| `confusionDataFrame` | `DataFrame` | Actual vs predicted labels for each class |
| `isValid` | `Bool` | Whether the metrics were calculated |
| `error` | `(any Error)?` | The underlying error present when the metrics are invalid |
| `description` | `String` | A text representation of the metrics |
| `debugDescription` | `String` | A text representation suitable for debugging output |
| `playgroundDescription` | `Any` | A description shown in a playground |

## Notes

- Availability: macOS 10.14+ only
- Deprecated per the source page: `precisionRecall` and `confusion` (both `MLDataTable`); use the `DataFrame` variants

## Related

- [MLWordTagger](./mlwordtagger.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLRegressorMetrics](./mlregressormetrics.md)
- [MLRecommenderMetrics](./mlrecommendermetrics.md)
- [MLObjectDetectorMetrics](./mlobjectdetectormetrics.md)
