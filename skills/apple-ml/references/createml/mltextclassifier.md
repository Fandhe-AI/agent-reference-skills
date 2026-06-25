# MLTextClassifier

A struct that trains machine learning models to classify natural language text (sentences, paragraphs, or documents) into discrete categories.

## Signature / Usage

```swift
// Train from labeled CSV (columns: "text", "label")
let classifier = try MLTextClassifier(
    trainingData: .dataFrame(df),
    textColumn: "text",
    labelColumn: "label",
    parameters: MLTextClassifier.ModelParameters()
)

// Predict
let category = try classifier.prediction(from: "The battery drains too fast.")

// Predict with confidence
let scores = try classifier.predictionWithConfidence(from: "Great product!")

// Export
try classifier.write(to: modelURL, metadata: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | `MLModel` | The underlying Core ML model |
| `modelParameters` | `ModelParameters` | Training configuration used |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on training data |
| `validationMetrics` | `MLClassifierMetrics` | Performance on validation data |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, visionOS 1.0+
- `predictionWithConfidence(from:)` returns `[String: Double]` — label to confidence score mapping
- Deploy the exported `.mlmodel` in an app using `NLModel` from the Natural Language framework

## Related

- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLModelMetadata](./mlmodelmetadata.md)
