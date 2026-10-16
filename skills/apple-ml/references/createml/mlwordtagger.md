# MLWordTagger

A word-tagging model you train to classify natural language text at the word level.

## Signature / Usage

```swift
struct MLWordTagger

// Train from token/label sequences
init(trainingData: [(tokens: [MLWordTagger.Token], labels: [String])], parameters: MLWordTagger.ModelParameters) throws

// Train from a table
init(trainingData:tokenColumn:labelColumn:parameters:) throws

// Evaluate
func evaluation(on: [(tokens: [MLWordTagger.Token], labels: [String])]) -> MLWordTaggerMetrics

// Export
func write(to: URL, metadata: MLModelMetadata?) throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(trainingData:parameters:)` | `throws` | Creates a word tagger |
| `init(trainingData:tokenColumn:labelColumn:parameters:)` | `throws` | Creates a word tagger from a table |
| `Token` | typealias | The token type of a word tagger, which is a string |
| `ModelParameters` | struct | Model training parameters and validation data |
| `modelParameters` | `MLWordTagger.ModelParameters` | Configuration used for training during initialization |
| `evaluation(on:)` | `func -> MLWordTaggerMetrics` | Computes evaluation metrics |
| `evaluation(on:tokenColumn:labelColumn:)` | func | Computes evaluation metrics from a table |
| `trainingMetrics` | `MLWordTaggerMetrics` | Performance on the training data set |
| `validationMetrics` | `MLWordTaggerMetrics` | Performance on the validation data set |
| `prediction(from:)` | func | Predicts a tag for the input string |
| `predictions(from:)` | func | Predicts sequences of labels, token locations, and token lengths from input strings |
| `predictionWithConfidence(from:)` | func | Predicts tags and confidence scores for the input string |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?)` | Exports as a Core ML model file at a URL |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?)` | Exports as a Core ML model file at a file path |
| `model` | `MLModel` | The underlying Core ML model |
| `FeatureExtractorType` | enum | Feature extractors available with the transfer-learning algorithm option |
| `ModelAlgorithmType` | enum | The algorithm type |

## Notes

- Availability: macOS 10.14+ only
- Use a custom word tagger to identify content relevant to your app, like product names and points of interest
- To use it in the Natural Language framework, save it to a model file, import it into an `NLModel`, then add that `NLModel` to an `NLTagger` with `setModels(_:forTagScheme:)`
- Parameter types for `prediction(from:)`, `predictions(from:)`, `predictionWithConfidence(from:)` and the table-based initializers are not shown in the source page's declaration fragments

## Related

- [MLWordTaggerMetrics](./mlwordtaggermetrics.md)
- [MLTextClassifier](./mltextclassifier.md)
- [MLGazetteer](./mlgazetteer.md)
- [MLWordEmbedding](./mlwordembedding.md)
