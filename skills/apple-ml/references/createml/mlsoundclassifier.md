# MLSoundClassifier

A struct for training a machine learning model that recognizes and classifies sounds from audio files.

## Signature / Usage

```swift
// Synchronous training (data source: labeled directory of audio files per class)
let classifier = MLSoundClassifier(
    trainingData: .labeledDirectories(at: audioURL),
    parameters: MLSoundClassifier.ModelParameters()
)

// Async training
let job = try MLSoundClassifier.train(
    trainingData: .labeledDirectories(at: audioURL),
    parameters: .init(),
    sessionParameters: MLTrainingSessionParameters()
)

// Predict
let labels = try classifier.predictions(from: [audioFileURL])

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

- macOS 10.15+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, visionOS 1.0+
- Requires at least 10 audio examples per class and at least one background/negative class
- Supported audio formats: M4A, MP3, AIFF, WAV; recommended single-channel, 16 kHz+
- `predictions(from:overlapFactor:predictionTimeWindowSize:)` allows sliding-window inference

## Related

- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
