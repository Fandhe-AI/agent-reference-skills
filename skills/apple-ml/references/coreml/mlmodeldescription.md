# MLModelDescription

Describes a Core ML model's input/output feature types, prediction names, class labels, metadata, and update capability. Accessed via `MLModel.modelDescription`.

## Signature / Usage

```swift
class MLModelDescription

let model = try MLModel(contentsOf: modelURL)
let desc = model.modelDescription

let inputNames = desc.inputDescriptionsByName.keys
let outputNames = desc.outputDescriptionsByName.keys
print(desc.predictedFeatureName ?? "no primary output")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `inputDescriptionsByName` | `[String : MLFeatureDescription]` | Input feature descriptions keyed by name |
| `outputDescriptionsByName` | `[String : MLFeatureDescription]` | Output feature descriptions keyed by name |
| `stateDescriptionsByName` | `[String : MLFeatureDescription]` | State feature descriptions keyed by name |
| `predictedFeatureName` | `String?` | Name of the primary prediction output |
| `predictedProbabilitiesName` | `String?` | Name of the output containing all class probabilities |
| `classLabels` | `[Any]?` | Labels for classifier models (strings or numbers) |
| `metadata` | `[MLModelMetadataKey : Any]` | Author, version, description, and license info |
| `isUpdatable` | `Bool` | Whether the model supports on-device fine-tuning |
| `trainingInputDescriptionsByName` | `[String : MLFeatureDescription]` | Training inputs for updatable models |
| `parameterDescriptionsByKey` | `[MLParameterKey : MLParameterDescription]` | Model parameter descriptions |

## Notes

iOS 11.0+, macOS 10.13+, tvOS 11.0+, watchOS 4.0+, visionOS 1.0+.

## Related

- [MLModel](./mlmodel.md)
- [MLFeatureProvider](./mlfeatureprovider.md)
