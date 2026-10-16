# MLWordEmbedding

A map of strings in a vector space that enable your app to find similar strings by looking at a string's neighbors.

## Signature / Usage

```swift
let wordEmbedding = try! MLWordEmbedding(dictionary: [
    "Hello"   : [0.0, 1.2, 5.0, 0.0],
    "Goodbye" : [0.0, 1.3, -6.2, 0.1]
])

try wordEmbedding.write(toFile: "~/Desktop/WordEmbedding.mlmodel")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(dictionary:parameters:)` | `([String : [Double]], MLWordEmbedding.ModelParameters) throws` | Creates a word embedding |
| `ModelParameters` | struct | The model configuration parameters |
| `modelParameters` | `MLWordEmbedding.ModelParameters` | The model configuration parameters |
| `prediction(from:maxCount:maxDistance:distanceType:)` | `(String, Int, Double, NLDistanceType) throws -> [(text: String, distance: Double)]` | Predicts neighbors |
| `distance(between:and:distanceType:)` | `(String, String, NLDistanceType) -> Double` | Distance between two strings in the vocabulary space |
| `contains(_:)` | `(String) -> Bool` | Whether the vocabulary contains the given string |
| `vector(for:)` | `(String) -> [Double]?` | The vector associated with the given string |
| `dimension` | `Int` | Number of dimensions in the vocabulary embedding space |
| `vocabularySize` | `Int` | Number of strings in the vocabulary |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?) throws` | Exports as a Core ML model file at a URL |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?) throws` | Exports as a Core ML model file at a file path |
| `model` | `MLModel` | The word embedding contained within a Core ML model file |

## Notes

- Availability: macOS 10.15+ only
- Configure with a dictionary keyed by the vocabulary strings; each value is an array of doubles representing a vector. All arrays must be the same length, which determines the number of dimensions
- Save to an `.mlmodel` file and add it to the Xcode project; at runtime an `NLEmbedding` instance finds similar strings based on the proximity of their vectors
- A word embedding file can efficiently store many strings and their vectors
- Source: https://developer.apple.com/documentation/createml/mlwordembedding

## Related

- [MLWordTagger](./mlwordtagger.md)
- [MLGazetteer](./mlgazetteer.md)
- [MLTextClassifier](./mltextclassifier.md)
