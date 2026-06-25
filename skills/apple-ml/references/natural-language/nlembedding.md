# NLEmbedding

Maps strings to high-dimensional vectors for semantic similarity search — finding neighbors and measuring distance between words or sentences.

## Signature / Usage

```swift
class NLEmbedding: NSObject

if let embedding = NLEmbedding.wordEmbedding(for: .english) {
    // Find 5 words most similar to "dog"
    let neighbors = embedding.neighbors(for: "dog", maximumCount: 5, distanceType: .cosine)
    // [("puppy", 0.12), ("cat", 0.18), ...]

    // Semantic distance (lower = more similar)
    let dist = embedding.distance(between: "cat", and: "dog", distanceType: .cosine)

    // Get raw vector
    let vec: [Double]? = embedding.vector(for: "dog")
}
```

## Options / Props

| Property | Type | Description |
|----------|------|-------------|
| `dimension` | `Int` | Number of dimensions in the vector space |
| `vocabularySize` | `Int` | Number of strings in the embedding |
| `language` | `NLLanguage?` | Language of the embedding |
| `revision` | `Int` | Version of the embedding model |

## Key Methods

| Method | Description |
|--------|-------------|
| `wordEmbedding(for:)` | Class method — built-in word embedding for a language |
| `wordEmbedding(for:revision:)` | Class method — specific revision |
| `sentenceEmbedding(for:)` | Class method — sentence-level embedding |
| `sentenceEmbedding(for:revision:)` | Class method — specific revision |
| `vector(for:)` | Returns `[Double]?` for a string |
| `distance(between:and:distanceType:)` | Scalar distance between two strings |
| `neighbors(for:maximumCount:distanceType:)` | Nearest neighbors for a string |
| `neighbors(for:maximumCount:distanceType:)` | Nearest neighbors for a vector |
| `enumerateNeighbors(for:maximumCount:distanceType:using:)` | Callback-based neighbor enumeration |
| `contains(_:)` | Whether a string is in the vocabulary |
| `init(contentsOf:) throws` | Load a custom embedding from a file URL |

## Notes

- Availability: iOS 13.0+, macOS 10.15+, tvOS 13.0+, watchOS 6.0+, visionOS 1.0+
- Use `NLDistanceType.cosine` for most semantic similarity tasks.
- For context-sensitive embeddings (BERT-style), use `NLContextualEmbedding` instead.

## Related

- [NLContextualEmbedding](./nlcontextualembedding.md)
- [NLLanguage](./nllanguage.md)
