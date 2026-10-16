# MLStyleTransfer

A model you train to apply an image's style to other images or videos.

## Signature / Usage

```swift
struct MLStyleTransfer

// Synchronous training
init(trainingData: MLStyleTransfer.DataSource, parameters: MLStyleTransfer.ModelParameters) throws

// Asynchronous training
static func train(trainingData: MLStyleTransfer.DataSource, parameters: MLStyleTransfer.ModelParameters, sessionParameters: MLTrainingSessionParameters) throws -> MLJob<MLStyleTransfer>

// Apply the learned style
func stylize(image: CGImage) throws -> CGImage?

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:parameters:)` | `throws` | Creates a style transfer model with a training dataset represented by a data source |
| `init(checkpoint:)` | `MLCheckpoint` | Creates a model from a training session checkpoint |
| `train(trainingData:parameters:sessionParameters:)` | `static func -> MLJob<MLStyleTransfer>` | Begins an asynchronous training session |
| `makeTrainingSession(trainingData:parameters:sessionParameters:)` | `static func -> MLTrainingSession<MLStyleTransfer>` | Creates an asynchronous training session |
| `resume(_:)` | `static func -> MLJob<MLStyleTransfer>` | Begins or continues an asynchronous training session |
| `restoreTrainingSession(sessionParameters:)` | `static func -> MLTrainingSession<MLStyleTransfer>` | Restores an existing training session's state from its parameters |
| `stylize(image:)` | `func (CGImage) -> CGImage?` | Applies the style the model learned to an image |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file to a file-system location |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file to the file path |
| `downloadAssets()` | `static func throws` | Downloads the mlmodel assets required for Style Transfer training |
| `DataSource` | enum | A data source for a style transfer model |
| `ModelParameters` | struct | Parameters affecting the training process |

## Notes

- Availability: iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, macOS 11.0+, visionOS 1.0+
- `downloadAssets()` is performed automatically at training time if needed, but can be run independently prior to training
- The source page for this symbol carries no prose overview or code example; the snippet above is assembled from the declarations listed on the page
- Source: https://developer.apple.com/documentation/createml/mlstyletransfer

## Related

- [MLActionClassifier](./mlactionclassifier.md)
- [MLHandActionClassifier](./mlhandactionclassifier.md)
- [MLTrainingSession](./mltrainingsession.md)
- [MLJob](./mljob.md)
