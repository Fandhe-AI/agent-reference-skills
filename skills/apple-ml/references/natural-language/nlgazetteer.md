# NLGazetteer

A lookup table of terms and their labels that overrides an `NLTagger`'s word-tagger predictions for specific terms or short phrases.

## Signature / Usage

```swift
class NLGazetteer: NSObject

// Create from a dictionary at runtime
let dict: [String: [String]] = [
    "personalName": ["Tim Cook", "Jony Ive"],
    "organizationName": ["Apple", "WWDC"]
]
let gazetteer = try NLGazetteer(dictionary: dict, language: .english)

// Attach to a tagger
tagger.setGazetteers([gazetteer], for: .nameType)

// Direct lookup
let label = gazetteer.label(for: "Apple") // "organizationName"
```

## Key Methods

| Method | Description |
|--------|-------------|
| `init(contentsOf:) throws` | Load from a Create ML–generated model file URL |
| `init(data:) throws` | Load from a `Data` instance |
| `init(dictionary:language:) throws` | Create from a `[String: [String]]` dictionary |
| `label(for:)` | Returns the label `String?` for a term |
| `write(_:language:to:) throws` | Class method — serialize a dictionary to a file URL |

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `data` | `Data` | The gazetteer as serialized data |
| `language` | `NLLanguage?` | Language of the gazetteer; `nil` for language-independent |

## Notes

- Availability: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Gazetteer labels take precedence over the attached `NLModel` word tagger.
- Retrieve attached gazetteers via `tagger.gazetteers(for:)`.

## Related

- [NLTagger](./nltagger.md)
- [NLModel](./nlmodel.md)
