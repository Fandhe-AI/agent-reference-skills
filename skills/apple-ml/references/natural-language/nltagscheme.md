# NLTagScheme

Constants identifying the kind of linguistic information an `NLTagger` should extract.

## Signature / Usage

```swift
struct NLTagScheme: RawRepresentable, Hashable, Sendable

let tagger = NLTagger(tagSchemes: [.lexicalClass, .sentimentScore])
tagger.string = "I absolutely love this product!"
let (tag, _) = tagger.tag(at: tagger.string!.startIndex, unit: .paragraph, scheme: .sentimentScore)
// tag?.rawValue is a numeric string, e.g. "0.9"
```

## Options / Props

| Scheme | Description |
|--------|-------------|
| `.tokenType` | Broad token type: word, punctuation, or whitespace |
| `.lexicalClass` | Part of speech and punctuation class |
| `.nameType` | Named entity classification |
| `.nameTypeOrLexicalClass` | `nameType` for named entities, `lexicalClass` for others |
| `.lemma` | Stem/base form of a word token |
| `.language` | Language of each token |
| `.script` | Writing script of each token (e.g., `"Latn"`) |
| `.sentimentScore` | Sentiment polarity as a numeric string (positive/negative/neutral) |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Use `NLTagger.availableTagSchemes(for:language:)` to check which schemes are supported for a given unit and language.
- Only include schemes you will use — unnecessary schemes reduce performance.

## Related

- [NLTagger](./nltagger.md)
- [NLTag](./nltag.md)
