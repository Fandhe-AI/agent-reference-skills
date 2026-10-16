# MLRecommenderMetrics

Metrics you use to evaluate a recommender's performance.

## Signature / Usage

```swift
struct MLRecommenderMetrics

let excludingObserved: Bool
var precisionRecallDataFrame: DataFrame
var isValid: Bool
let error: (any Error)?
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `excludingObserved` | `Bool` | Whether the recommender omitted training data from the recommendations |
| `precisionRecall` | `MLDataTable` | Recall and precision for each item (deprecated) |
| `precisionRecallDataFrame` | `DataFrame` | Recall and precision for each item |
| `isValid` | `Bool` | Whether the recommender model was able to calculate metrics |
| `error` | `(any Error)?` | The underlying error present when the metrics are invalid |
| `init(precisionRecall:excludingObserved:)` | `(MLDataTable, Bool)` | Creates metrics from a data table with precision and recall columns (deprecated) |

## Notes

- Availability: macOS 10.15+ only
- Deprecated per the source page: `precisionRecall` and `init(precisionRecall:excludingObserved:)`; use `precisionRecallDataFrame`

## Related

- [MLRecommender](./mlrecommender.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLRegressorMetrics](./mlregressormetrics.md)
- [MLWordTaggerMetrics](./mlwordtaggermetrics.md)
- [MLObjectDetectorMetrics](./mlobjectdetectormetrics.md)
