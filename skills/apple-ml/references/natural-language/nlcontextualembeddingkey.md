# NLContextualEmbeddingKey

This class defines properties that you can filter or search for contextual embeddings.

## Signature / Usage

```swift
struct NLContextualEmbeddingKey

static let languages: NLContextualEmbeddingKey
static let revision: NLContextualEmbeddingKey
static let scripts: NLContextualEmbeddingKey

init(_: String)
init(rawValue: String)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `languages` | `NLContextualEmbeddingKey` | A key that identifies the supported languages in a contextual embedding. |
| `revision` | `NLContextualEmbeddingKey` | A key that identifies the version number the contextual embedding uses. |
| `scripts` | `NLContextualEmbeddingKey` | A key that identifies the writing system that the language uses in a contextual embedding. |
| `init(_:)` | `String` | Creates an embedding key with the given string. |
| `init(rawValue:)` | `String` | Creates an embedding key with the given string as its raw value. |

## Notes

- Availability: iOS 12.0+, iPadOS 12.0+, Mac Catalyst 13.0+, macOS 10.14+, tvOS 12.0+, visionOS 1.0+, watchOS 5.0+.
- The keys provide filtering criteria that you can specify within your model. For example, you can use a defined key like `scripts` and search for models that use a specific script like `Latin`.
- Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`.
- In Objective-C this is declared as `typedef NSString * NLContextualEmbeddingKey;`.
- Source: https://developer.apple.com/documentation/naturallanguage/nlcontextualembeddingkey

## Related

- [NLContextualEmbedding](./nlcontextualembedding.md)
- [NLScript](./nlscript.md)
