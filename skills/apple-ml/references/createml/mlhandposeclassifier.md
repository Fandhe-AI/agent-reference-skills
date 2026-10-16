# MLHandPoseClassifier

A task that creates a hand pose classification model by training with images of people's hands that you provide.

## Signature / Usage

```swift
struct MLHandPoseClassifier

// Synchronous training
init(trainingData: MLHandPoseClassifier.DataSource, parameters: MLHandPoseClassifier.ModelParameters) throws

// Asynchronous training
static func train(trainingData: MLHandPoseClassifier.DataSource, parameters: MLHandPoseClassifier.ModelParameters, sessionParameters: MLTrainingSessionParameters) throws -> MLJob<MLHandPoseClassifier>

// Evaluate and predict
func evaluation(on: MLHandPoseClassifier.DataSource) throws -> MLClassifierMetrics
func prediction(from: URL) throws -> [(label: String, confidence: Double)]

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:parameters:)` | `throws` | Creates a hand pose classifier by starting a synchronous training session |
| `init(checkpoint:)` | `MLCheckpoint` | Creates a hand pose classifier from a training session checkpoint |
| `train(trainingData:parameters:sessionParameters:)` | `static func -> MLJob<MLHandPoseClassifier>` | Begins an asynchronous training session |
| `makeTrainingSession(trainingData:parameters:sessionParameters:)` | `static func -> MLTrainingSession<MLHandPoseClassifier>` | Creates an asynchronous training session |
| `resume(_:)` | `static func -> MLJob<MLHandPoseClassifier>` | Begins or continues an asynchronous training session |
| `restoreTrainingSession(sessionParameters:)` | `static func -> MLTrainingSession<MLHandPoseClassifier>` | Recreates a training session by restoring saved state from the file system |
| `evaluation(on:)` | `func -> MLClassifierMetrics` | Generates metrics for a dataset of labeled images |
| `trainingMetrics` | `MLClassifierMetrics` | Performance on the training dataset |
| `validationMetrics` | `MLClassifierMetrics` | Performance on the validation dataset |
| `prediction(from:)` | `func (URL) -> [(label: String, confidence: Double)]` | Hand pose prediction for an image |
| `predictions(from:)` | `func ([URL]) -> [[(label: String, confidence: Double)]]` | Predictions for each image in a URL array |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file to a file path |
| `model` | `MLModel` | Underlying Core ML model stored in memory |
| `modelParameters` | `MLHandPoseClassifier.ModelParameters` | The hand pose model's configuration parameters |
| `DataSource` | enum | Annotated images or hand joint location data |
| `ModelParameters` | struct | Parameters affecting the training process |
| `ImageAugmentationOptions` | struct | Options to generate additional training data from provided images |

## Notes

- Availability: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 12.0+, visionOS 1.0+
- The source page for this symbol carries no prose overview or code example; the snippet above is assembled from the declarations listed on the page

## Related

- [MLHandActionClassifier](./mlhandactionclassifier.md)
- [MLImageClassifier](./mlimageclassifier.md)
- [MLObjectDetector](./mlobjectdetector.md)
- [MLClassifierMetrics](./mlclassifiermetrics.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
