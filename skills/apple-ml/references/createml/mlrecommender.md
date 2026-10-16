# MLRecommender

A model you train to make recommendations based on item similarity, grouping, and, optionally, item ratings.

## Signature / Usage

```swift
struct MLRecommender

init(trainingData:userColumn:itemColumn:ratingColumn:parameters:) throws

func evaluation(on:userColumn:itemColumn:ratingColumn:cutoffs:excludingObserved:) -> MLRecommenderMetrics

func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:userColumn:itemColumn:ratingColumn:parameters:)` | `throws` | Creates an instance given a table and the names of the item and user columns contained therein |
| `ModelParameters` | struct | Parameters that affect the process of training a recommender model |
| `modelParameters` | `MLRecommender.ModelParameters` | Configuration used for training during initialization |
| `userIdentifierColumn` | `String` | Column selected at initialization for user identifiers |
| `itemIdentifierColumn` | `String` | Column selected at initialization for item identifiers |
| `ratingColumn` | `String?` | Column selected at initialization for ratings |
| `evaluation(on:userColumn:itemColumn:ratingColumn:cutoffs:excludingObserved:)` | func -> `MLRecommenderMetrics` | Computes the metrics for the given testing data |
| `recommendations(fromUsers:maxCount:restrictingToItems:excluding:excludingObserved:)` | func | Highest scored items for an array of users (deprecated) |
| `getSimilarItems(fromItems:maxCount:)` | func | Top ranked similar items based on the model's similarity type (deprecated) |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?) throws` | Exports as a Core ML model file at a URL |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?) throws` | Exports as a Core ML model file at a file path |
| `model` | `MLModel` | The Core ML model |
| `ModelAlgorithmType` | enum | The algorithms a recommender can use to make recommendations |
| `SimilarityType` | enum | The metric by which the recommender computes item similarity |

## Notes

- Availability: macOS 10.15+ only
- Train with tabular data that has columns for the recommendation items and the groups the items belong to; an optional rating column gives higher-rated items more weight than lesser or negative ratings
- Save as an `.mlmodel` file and drag it into the Xcode Project navigator; recommendations then run on-device, keeping user data on the device
- Deprecated per the source page: `recommendations(fromUsers:maxCount:restrictingToItems:excluding:excludingObserved:)`, `getSimilarItems(fromItems:maxCount:)`, and `MLIdentifier`
- Parameter types for the table-based declarations are not shown in the source page's declaration fragments
- Source: https://developer.apple.com/documentation/createml/mlrecommender

## Related

- [MLRecommenderMetrics](./mlrecommendermetrics.md)
- [MLClassifier](./mlclassifier.md)
- [MLRegressor](./mlregressor.md)
- [MLDataTable](./mldatatable.md)
