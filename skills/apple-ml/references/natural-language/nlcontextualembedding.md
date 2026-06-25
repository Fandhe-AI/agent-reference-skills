# NLContextualEmbedding

A BERT-style model that computes context-sensitive embedding vectors for natural language text, adjusting token representations based on surrounding words.

## Signature / Usage

```swift
class NLContextualEmbedding: NSObject

// Get a model for a language
guard let embedding = NLContextualEmbedding(language: .english) else { return }

// Ensure assets are available on-device
embedding.requestAssets { result, error in
    guard result == .available else { return }
    try? embedding.load()

    let result = try? embedding.embeddingResult(for: "The bank can guarantee deposits.", language: .english)
    result?.enumerateTokenVectors(in: ...) { vector, range in
        // vector: [Double] — context-aware embedding for each token
        return true
    }
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `dimension` | `Int` | Dimensionality of the output embedding vectors |
| `languages` | `[NLLanguage]` | Languages supported by this model |
| `scripts` | `[NLScript]` | Writing systems supported by this model |
| `modelIdentifier` | `String` | Unique identifier for the model |
| `revision` | `Int` | Model version number |
| `maximumSequenceLength` | `Int` | Maximum token count the model accepts |
| `hasAvailableAssets` | `Bool` | Whether model assets are present on-device |

## Key Methods

| Method | Description |
|--------|-------------|
| `init?(language:)` | Creates a model for a given `NLLanguage` |
| `init?(script:)` | Creates a model for a given `NLScript` |
| `init?(modelIdentifier:)` | Creates a model from an identifier string |
| `contextualEmbeddings(forValues:)` | Class method — lists matching models by key/value filter |
| `embeddingResult(for:language:) throws` | Applies the model; returns `NLContextualEmbeddingResult` |
| `requestAssets(completionHandler:)` | Downloads assets if not already on-device |
| `load() throws` | Loads the model into memory |
| `unload()` | Releases the model from memory |

## Notes

- Availability: iOS 17.0+, macOS 14.0+, tvOS 17.0+, watchOS 10.0+, visionOS 1.0+
- Always call `requestAssets` before `embeddingResult` to confirm on-device availability.
- For static, non-contextual similarity tasks use `NLEmbedding` instead.
- Compatible with Create ML's `bertEmbedding` feature extractor for text classifiers.

## Related

- [NLEmbedding](./nlembedding.md)
- [NLLanguage](./nllanguage.md)
