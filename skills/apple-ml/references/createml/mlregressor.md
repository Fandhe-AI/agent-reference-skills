# MLRegressor

An enum representing a model trained to estimate continuous numerical values from tabular data.

## Signature / Usage

```swift
// Create ML auto-selects the best regressor type
let regressor = try MLRegressor(
    trainingData: dataTable,
    targetColumn: "price",
    featureColumns: ["sqft", "bedrooms", "location"]
)

// Evaluate
print(regressor.trainingMetrics.rootMeanSquaredError)
print(regressor.validationMetrics.maximumError)

// Predict
let predictions = try regressor.predictions(from: testTable)

// Export
try regressor.write(to: modelURL, metadata: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `targetColumn` | `String` | The column being predicted |
| `featureColumns` | `[String]` | Input columns used for training |
| `model` | `MLModel` | The underlying Core ML model |
| `trainingMetrics` | `MLRegressorMetrics` | Performance on training data |
| `validationMetrics` | `MLRegressorMetrics` | Performance on validation data |

## Notes

- macOS 10.14+ only
- Enum cases represent the selected algorithm: `.linear`, `.decisionTree`, `.boostedTree`, `.randomForest`
- Create ML automatically selects the algorithm; to force a specific type, use the concrete model types (e.g., `MLBoostedTreeRegressor`)

## Related

- [MLRegressorMetrics](./mlregressormetrics.md)
- [MLDataTable](./mldatatable.md)
- [MLClassifier](./mlclassifier.md)
