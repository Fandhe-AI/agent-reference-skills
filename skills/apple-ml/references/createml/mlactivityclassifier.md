# MLActivityClassifier

A model you train to classify motion sensor data.

## Signature / Usage

```swift
struct MLActivityClassifier

// Synchronous training
init(trainingData: MLActivityClassifier.DataSource, featureColumns: [String], labelColumn: String?, recordingFileColumn: String?, parameters: MLActivityClassifier.ModelParameters) throws

// Evaluate
func evaluation(on: MLActivityClassifier.DataSource, featureColumns: [String], labelColumn: String?, recordingFileColumn: String?) -> MLClassifierMetrics

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:featureColumns:labelColumn:recordingFileColumn:parameters:)` | `throws` | Creates an activity classifier with a training dataset represented by a data source |
| `init(checkpoint:)` | `MLCheckpoint` | Creates an activity classifier from a training session checkpoint |
| `train(trainingData:featureColumns:labelColumn:recordingFileColumn:parameters:sessionParameters:)` | `static func` | Begins an asynchronous training session |
| `makeTrainingSession(trainingData:featureColumns:labelColumn:recordingFileColumn:parameters:sessionParameters:)` | `static func` | Creates an asynchronous training session |
| `resume(_:)` | `static func -> MLJob<MLActivityClassifier>` | Begins or continues an asynchronous training session |
| `restoreTrainingSession(sessionParameters:)` | `static func -> MLTrainingSession<MLActivityClassifier>` | Restores an existing training session's state from its parameters |
| `evaluation(on:featureColumns:labelColumn:recordingFileColumn:)` | func | Metrics on labeled activities in a data source |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on the training dataset |
| `validationMetrics` | `MLClassifierMetrics` | Performance on the validation dataset |
| `predictions(from:perWindowPrediction:)` | func | Predicts activities from new observations |
| `featureColumns` | `[String]` | Feature column names used during training |
| `labelColumn` | `String` | Label column name used during training |
| `recordingFileColumn` | `String` | Column containing the data files used during training |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file to a file path |
| `model` | `MLModel` | Underlying Core ML model stored in memory |
| `modelParameters` | `MLActivityClassifier.ModelParameters` | Model configuration used during training |
| `DataSource` | enum | A data source for an activity classifier |
| `ModelParameters` | struct | Parameters that direct the training process |

## Notes

- Availability: macOS 10.15+ only
- Train with a dataset of a device's motion sensors (for example the accelerometer and gyroscope on an Apple Watch); the saved Core ML model predicts a user's activity from motion-sensor data your app captures
- Evaluate with a dataset completely distinct from the training and validation datasets, then inspect the returned metrics; if the classifier makes too many mistakes, train another with different parameters or a better training dataset
- Parameter types for several declarations (train / makeTrainingSession / predictions) are not shown in the source page's declaration fragments

## Related

- [MLSoundClassifier](./mlsoundclassifier.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
