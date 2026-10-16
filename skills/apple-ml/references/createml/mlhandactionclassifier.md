# MLHandActionClassifier

A task that creates a hand action classification model by training with videos of people's hand movements that you provide.

## Signature / Usage

```swift
struct MLHandActionClassifier

// Synchronous training
init(trainingData: MLHandActionClassifier.DataSource, parameters: MLHandActionClassifier.ModelParameters) throws

// Asynchronous training
static func train(trainingData: MLHandActionClassifier.DataSource, parameters: MLHandActionClassifier.ModelParameters, sessionParameters: MLTrainingSessionParameters) throws -> MLJob<MLHandActionClassifier>

// Evaluate and predict
func evaluation(on: MLHandActionClassifier.DataSource) throws -> MLClassifierMetrics
func prediction(from: URL) throws -> [MLHandActionClassifier.Prediction]

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:parameters:)` | `throws` | Creates a hand action classifier by starting a synchronous training session |
| `init(checkpoint:)` | `MLCheckpoint` | Creates a hand action classifier from a training session checkpoint |
| `train(trainingData:parameters:sessionParameters:)` | `static func -> MLJob<MLHandActionClassifier>` | Begins an asynchronous training session |
| `makeTrainingSession(trainingData:parameters:sessionParameters:)` | `static func -> MLTrainingSession<MLHandActionClassifier>` | Creates an asynchronous training session |
| `resume(_:)` | `static func -> MLJob<MLHandActionClassifier>` | Begins or continues an asynchronous training session |
| `restoreTrainingSession(sessionParameters:)` | `static func -> MLTrainingSession<MLHandActionClassifier>` | Restores saved training state from the file system |
| `evaluation(on:)` | `func -> MLClassifierMetrics` | Metrics on labeled videos |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on the training dataset |
| `validationMetrics` | `MLClassifierMetrics` | Performance on the validation dataset |
| `prediction(from:)` | `func (URL) -> [MLHandActionClassifier.Prediction]` | Hand-action predictions for a video |
| `predictions(from:)` | `func ([URL]) -> [[MLHandActionClassifier.Prediction]]` | Predictions for each video in a URL array |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file to a file path |
| `model` | `MLModel` | Underlying Core ML model stored in memory |
| `modelParameters` | `MLHandActionClassifier.ModelParameters` | The hand action model's configuration parameters |
| `DataSource` | enum | Annotated videos or hand joint location data |
| `ModelParameters` | struct | Parameters affecting the training process |
| `Prediction` | struct | Predictions, each paired with its confidence, for a range of video frames |
| `VideoAugmentationOptions` | struct | Options to generate additional training data from provided videos |

## Notes

- Availability: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, visionOS 1.0+
- The source page for this symbol carries no prose overview or code example; the snippet above is assembled from the declarations listed on the page
- Source: https://developer.apple.com/documentation/createml/mlhandactionclassifier

## Related

- [MLActionClassifier](./mlactionclassifier.md)
- [MLHandPoseClassifier](./mlhandposeclassifier.md)
- [MLStyleTransfer](./mlstyletransfer.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
