# MLImageClassifier

A struct for training machine learning models that classify images into discrete categories using labeled image datasets.

## Signature / Usage

```swift
// Synchronous training
let classifier = MLImageClassifier(
    trainingData: .labeledDirectories(at: trainingURL),
    parameters: MLImageClassifier.ModelParameters()
)

// Asynchronous training
let job = try MLImageClassifier.train(
    trainingData: .labeledDirectories(at: trainingURL),
    parameters: .init(),
    sessionParameters: MLTrainingSessionParameters()
)
let classifier = try await job.result.async()

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
- Use `train(trainingData:parameters:sessionParameters:)` for async training with progress and checkpointing
- Use `makeTrainingSession` + `resume` for full session control (pause/resume across launches)
- `prediction(from:)` returns the predicted label string; `predictionWithConfidence(from:)` is not available on this type — use `evaluation(on:)` for metrics

## Related

- [MLImageClassifier.ModelParameters](./mlimageclassifier-modelparameters.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
