# MLGazetteer

A collection of terms and their labels, which augments a tagger that analyzes natural language text.

## Signature / Usage

```swift
let planets = [
    "real planet": ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"],
    "fictional planet" : ["Arrakis", "Hoth", "Vulcan", "Pandora", "Tatooine", "Bajor", "Alderaan", "Romulus"]
]

let parameters = MLGazetteer.ModelParameters(language: .english)
let planetGazetteer = try! MLGazetteer(dictionary: planets, parameters: parameters)

try planetGazetteer.write(toFile: "~/Desktop/PlanetGazetteer.mlmodel")
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(dictionary:parameters:)` | `([String : [String]], MLGazetteer.ModelParameters) throws` | Creates a gazetteer from a dictionary of labels and terms |
| `init(labeledData:textColumn:labelColumn:parameters:)` | `(MLDataTable, String, String, ModelParameters) throws` | Creates a gazetteer from a table of labels and terms (deprecated) |
| `ModelParameters` | struct | The model configuration parameters |
| `modelParameters` | `MLGazetteer.ModelParameters` | The model configuration parameters |
| `prediction(from:)` | `func (String) throws -> String` | Predicts the label for the given term |
| `predictions(from:)` | `func ([String]) throws -> [String]` | Predicts the labels for the given terms |
| `predictions(from:)` | `func (MLDataColumn<String>) throws -> MLDataColumn<String>` | Predicts labels for terms in a table column (deprecated) |
| `write(to:metadata:)` | `func (URL, MLModelMetadata?) throws` | Exports as a Core ML model file at a URL |
| `write(toFile:metadata:)` | `func (String, MLModelMetadata?) throws` | Exports as a Core ML model file at a file path |
| `model` | `MLModel` | The gazetteer contained within a Core ML model file stored in memory |

## Notes

- Availability: macOS 10.15+ only
- Configure a gazetteer with a dictionary keyed by labels; each value is an array of terms (words or phrases) for that label
- Save to an `.mlmodel` file and add it to the app in Xcode; at runtime the app creates an `NLGazetteer`, which augments an `NLTagger` to tag specific terms with a label
- A gazetteer file can efficiently store many labels, and many terms for each label
- Deprecated per the source page: `init(labeledData:textColumn:labelColumn:parameters:)` and `predictions(from:)` taking `MLDataColumn<String>`

## Related

- [MLWordTagger](./mlwordtagger.md)
- [MLTextClassifier](./mltextclassifier.md)
- [MLWordEmbedding](./mlwordembedding.md)
- [MLDataTable](./mldatatable.md)
