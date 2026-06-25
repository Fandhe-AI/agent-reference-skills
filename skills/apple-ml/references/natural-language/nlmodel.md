# NLModel

Integrates a custom Core ML model for text classification or word tagging into the Natural Language framework.

## Signature / Usage

```swift
class NLModel: NSObject

// Load from a compiled Core ML model
let mlModel = try SentimentClassifier(configuration: .init()).model
let model = try NLModel(mlModel: mlModel)

// Predict a label
if let label = model.predictedLabel(for: "I love this!") {
    print(label) // "positive"
}
```

## Key Methods

| Method | Description |
|--------|-------------|
| `init(mlModel:) throws` | Creates an NLModel from an `MLModel` instance |
| `init(contentsOf:) throws` | Creates an NLModel from a compiled `.mlmodelc` URL |
| `predictedLabel(for:)` | Returns the top-predicted `String?` label for text |
| `predictedLabelHypotheses(for:maximumCount:)` | Returns `[String: Double]` confidence scores |
| `predictedLabels(forTokens:)` | Returns `[String]` labels for an array of token strings |
| `predictedLabelHypotheses(forTokens:maximumCount:)` | Returns `[[String: Double]]` per-token scores |

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `configuration` | `NLModelConfiguration` | Model metadata: language, revision, type |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Attach to `NLTagger` via `tagger.setModels([model], forTagScheme:)` for word-tagging use cases.
- Train classification or tagging models with Create ML (`MLTextClassifier`, `MLWordTagger`).

## Related

- [NLTagger](./nltagger.md)
- [NLGazetteer](./nlgazetteer.md)
