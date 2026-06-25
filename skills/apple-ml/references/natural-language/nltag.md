# NLTag

A struct representing a token type, lexical class, name, lemma, language, or script returned by `NLTagger`.

## Signature / Usage

```swift
struct NLTag: RawRepresentable, Hashable, Sendable

let tagger = NLTagger(tagSchemes: [.lexicalClass])
tagger.string = "Hello world"
let (tag, _) = tagger.tag(at: tagger.string!.startIndex, unit: .word, scheme: .lexicalClass)
// tag == NLTag.interjection
```

## Options / Props

### Token Types (used with `.tokenType`)

| Constant | Description |
|----------|-------------|
| `.word` | Token is a word |
| `.punctuation` | Token is punctuation |
| `.whitespace` | Token is whitespace |
| `.other` | Non-linguistic item (e.g., symbol) |

### Lexical Classes (used with `.lexicalClass` or `.nameTypeOrLexicalClass`)

| Constant | Description |
|----------|-------------|
| `.noun` | Noun |
| `.verb` | Verb |
| `.adjective` | Adjective |
| `.adverb` | Adverb |
| `.pronoun` | Pronoun |
| `.determiner` | Determiner |
| `.particle` | Particle |
| `.preposition` | Preposition |
| `.number` | Number |
| `.conjunction` | Conjunction |
| `.interjection` | Interjection |
| `.classifier` | Classifier |
| `.idiom` | Idiom |
| `.otherWord` | Word not in other categories |
| `.sentenceTerminator` | End-of-sentence punctuation |
| `.openQuote` / `.closeQuote` | Quotation marks |
| `.openParenthesis` / `.closeParenthesis` | Parentheses |
| `.dash` | Dash |
| `.paragraphBreak` | Paragraph break |
| `.otherPunctuation` / `.otherWhitespace` | Catch-all categories |

### Name Types (used with `.nameType` or `.nameTypeOrLexicalClass`)

| Constant | Description |
|----------|-------------|
| `.personalName` | Personal name |
| `.organizationName` | Organization name |
| `.placeName` | Place name |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`.

## Related

- [NLTagScheme](./nltagscheme.md)
- [NLTagger](./nltagger.md)
