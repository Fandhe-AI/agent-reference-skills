# MLObjectDetector

A struct for training a machine learning model that identifies and locates one or more objects within an image.

## Signature / Usage

```swift
// Synchronous training
let detector = try MLObjectDetector(
    trainingData: .labeledImageDirectory(at: imagesURL),
    parameters: MLObjectDetector.ModelParameters(),
    annotationType: .boundingBox
)

// Async training
let job = try MLObjectDetector.train(
    trainingData: .labeledImageDirectory(at: imagesURL),
    annotationType: .boundingBox,
    parameters: .init(),
    sessionParameters: MLTrainingSessionParameters()
)

// Predict
let detections = try detector.prediction(from: imageURL)
// detections: [ObjectAnnotation] with label, confidence, location

// Export
try detector.write(to: modelURL, metadata: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `model` | `MLModel` | The underlying Core ML model |
| `modelParameters` | `ModelParameters` | Training configuration used |
| `trainingMetrics` | `MLObjectDetectorMetrics` | Performance on training data |
| `validationMetrics` | `MLObjectDetectorMetrics` | Performance on validation data |

## Notes

- macOS 10.15+ only (not available on iOS/iPadOS directly)
- `annotationType` must match the annotation format in the training data (`.boundingBox` or `.polygon`)
- Use `makeTrainingSession` + `resume` for interruptible async training across app launches

## Related

- [MLObjectDetectorMetrics](./mlobjectdetectormetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
