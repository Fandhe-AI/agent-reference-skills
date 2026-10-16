# MLActionClassifier

A model you train with videos to classify a person's body movements.

## Signature / Usage

```swift
struct MLActionClassifier

// Synchronous training
init(trainingData: MLActionClassifier.DataSource, parameters: MLActionClassifier.ModelParameters) throws

// Asynchronous training
static func train(trainingData: MLActionClassifier.DataSource, parameters: MLActionClassifier.ModelParameters, sessionParameters: MLTrainingSessionParameters) throws -> MLJob<MLActionClassifier>

// Evaluate and predict
func evaluation(on: MLActionClassifier.DataSource) throws -> MLClassifierMetrics
func prediction(from: URL) throws -> [MLActionClassifier.Prediction]

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:parameters:)` | `throws` | Creates an action classifier with a training dataset represented by a data source |
| `init(checkpoint:)` | `MLCheckpoint` | Creates an action classifier from a training session checkpoint |
| `train(trainingData:parameters:sessionParameters:)` | `static func -> MLJob<MLActionClassifier>` | Begins an asynchronous training session |
| `makeTrainingSession(trainingData:parameters:sessionParameters:)` | `static func -> MLTrainingSession<MLActionClassifier>` | Creates an asynchronous training session |
| `resume(_:)` | `static func -> MLJob<MLActionClassifier>` | Begins or continues an asynchronous training session |
| `restoreTrainingSession(sessionParameters:)` | `static func -> MLTrainingSession<MLActionClassifier>` | Restores an existing training session's state from its parameters |
| `evaluation(on:)` | `func -> MLClassifierMetrics` | Metrics on labeled videos represented by a data source |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on the training dataset |
| `validationMetrics` | `MLClassifierMetrics` | Performance on the validation dataset |
| `prediction(from:)` | `func (URL) -> [MLActionClassifier.Prediction]` | A prediction for each action recognized in the video |
| `predictions(from:)` | `func ([URL]) -> [[MLActionClassifier.Prediction]]` | A sequence of predictions for each video input |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file to a file-system location |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file to the file path |
| `model` | `MLModel` | Underlying Core ML model stored in memory |
| `modelParameters` | `MLActionClassifier.ModelParameters` | Model configuration used during training |
| `DataSource` | enum | A data source for an action classifier |
| `ModelParameters` | struct | Parameters affecting the training process |
| `Prediction` | struct | Predictions, each paired with its confidence, for a range of video frames |
| `VideoAugmentationOptions` | struct | Video augmentations for a training session |

## Notes

- Availability: macOS 11.0+ only (no iOS / visionOS availability listed on the source page)
- The source page for this symbol carries no prose overview or code example; the snippet above is assembled from the declarations listed on the page

## Related

- [MLHandActionClassifier](./mlhandactionclassifier.md)
- [MLStyleTransfer](./mlstyletransfer.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
