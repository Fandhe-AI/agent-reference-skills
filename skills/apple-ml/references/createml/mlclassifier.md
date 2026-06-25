# MLClassifier

An enum representing a model trained to classify tabular data into discrete categories. Create ML automatically selects the best classifier algorithm for your data.

## Signature / Usage

```swift
// Create ML auto-selects the algorithm
let classifier = try MLClassifier(
    trainingData: dataTable,
    targetColumn: "species",
    featureColumns: ["petalLength", "petalWidth", "sepalLength"]
)

// Evaluate
print(classifier.trainingMetrics.classificationError)

// Predict
let predictions = try classifier.predictions(from: testTable)

// Export
try classifier.write(to: modelURL, metadata: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `targetColumn` | `String` | The column defining categories to predict |
| `featureColumns` | `[String]` | Columns used as input features |
| `model` | `MLModel` | The underlying Core ML model |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on training data |
| `validationMetrics` | `MLClassifierMetrics` | Performance on validation data |

## Notes

- macOS 10.14+ only
- Enum cases: `.decisionTree`, `.randomForest`, `.boostedTree`, `.logisticRegression`, `.supportVector` (deprecated)
- Do not use for image data (use `MLImageClassifier`) or natural language text (use `MLTextClassifier`)
- To force a specific algorithm, use the concrete model type directly (e.g., `MLRandomForestClassifier`)

## Related

- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLDataTable](./mldatatable.md)
- [MLRegressor](./mlregressor.md)
