# NLTagger

Analyzes natural language text by segmenting it into tokens and assigning linguistic tags for part of speech, lexical class, lemma, script, language, and sentiment.

## Signature / Usage

```swift
class NLTagger

let tagger = NLTagger(tagSchemes: [.lexicalClass, .nameType])
tagger.string = "Tim Cook visited Apple Park in Cupertino."

tagger.enumerateTags(
    in: tagger.string!.startIndex..<tagger.string!.endIndex,
    unit: .word,
    scheme: .nameType,
    options: [.omitWhitespace, .omitPunctuation]
) { tag, range in
    if let tag { print("\(tagger.string![range]): \(tag.rawValue)") }
    return true
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `string` | `String?` | The string being analyzed |
| `dominantLanguage` | `NLLanguage?` | The dominant language of the string |
| `tagSchemes` | `[NLTagScheme]` | The tag schemes configured for this tagger |

## Key Methods

| Method | Description |
|--------|-------------|
| `init(tagSchemes:)` | Creates a tagger with the specified schemes |
| `enumerateTags(in:unit:scheme:options:using:)` | Enumerates tags over a range; return `false` to stop |
| `tag(at:unit:scheme:)` | Returns `(NLTag?, Range)` for a single position |
| `tags(in:unit:scheme:options:)` | Returns `[(NLTag?, Range)]` for a range |
| `tagHypotheses(at:unit:scheme:maximumCount:)` | Returns `[String: Double]` confidence scores |
| `setLanguage(_:range:)` | Sets the language for a range of text |
| `setOrthography(_:range:)` | Sets the orthography for a range |
| `tokenRange(at:unit:)` | Returns the token range at a character index |
| `availableTagSchemes(for:language:)` | Class method — lists available schemes for a unit/language |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Not thread-safe — do not use one instance from multiple threads simultaneously.
- Only specify tag schemes you will actually use; specifying unused schemes reduces performance.

## Related

- [NLTagScheme](./nltagscheme.md)
- [NLTag](./nltag.md)
- [NLTokenizer](./nltokenizer.md)
- [NLModel](./nlmodel.md)
- [NLGazetteer](./nlgazetteer.md)
