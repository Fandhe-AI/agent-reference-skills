# MLImageClassifier.ModelParameters

Configuration struct for controlling an image classifier training session.

## Signature / Usage

```swift
var params = MLImageClassifier.ModelParameters(
    validation: .split(strategy: .automatic),
    maxIterations: 25,
    augmentation: [],
    algorithm: .transferLearning(
        featureExtractor: .scenePrint(revision: 2),
        classifier: .logisticRegressor
    )
)
let classifier = MLImageClassifier(
    trainingData: .labeledDirectories(at: url),
    parameters: params
)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `validation` | `ValidationData` | Validation dataset source |
| `maxIterations` | `Int` | Maximum number of training iterations |
| `augmentationOptions` | `ImageAugmentationOptions` | Image variations applied during training (deprecated; use `augmentation`) |
| `algorithm` | `ModelAlgorithmType` | Model algorithm used for training |
| `featureExtractor` | `FeatureExtractorType` | Base model for feature extraction (deprecated; prefer `algorithm`) |

## Notes

- macOS 10.14+, iOS 15.0+, iPadOS 15.0+, Mac Catalyst 15.0+, visionOS 1.0+
- `featureExtractor` and `validationData` properties are deprecated; use `algorithm` and `validation` respectively

## Related

- [MLImageClassifier](./mlimageclassifier.md)
- [MLSplitStrategy](./mlsplitstrategy.md)
