# NLLanguageRecognizer

Detects the dominant language of a piece of text, with optional confidence scores for multiple language hypotheses.

## Signature / Usage

```swift
class NLLanguageRecognizer: NSObject

// Quick one-shot detection
let language = NLLanguageRecognizer.dominantLanguage(for: "Bonjour le monde")
// language == .french

// Stateful recognizer with hints
let recognizer = NLLanguageRecognizer()
recognizer.languageHints = [.english: 0.5, .french: 0.5]
recognizer.processString("Bonjour le monde")
let hypotheses = recognizer.languageHypotheses(withMaximum: 3)
// [.french: 0.95, .english: 0.03, ...]
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `dominantLanguage` | `NLLanguage?` | Most likely language after processing |
| `languageHints` | `[NLLanguage: Double]` | Prior probabilities to bias recognition |
| `languageConstraints` | `[NLLanguage]` | Restricts output to a specific set of languages |

## Key Methods

| Method | Description |
|--------|-------------|
| `init()` | Creates a new recognizer instance |
| `processString(_:)` | Analyzes text to determine language |
| `languageHypotheses(withMaximum:)` | Returns `[NLLanguage: Double]` confidence map |
| `reset()` | Resets state for reuse with new text |
| `dominantLanguage(for:)` | Class method — one-shot language detection |

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Not thread-safe — do not share an instance across threads.
- Provide more text for higher accuracy; short strings may produce uncertain results.

## Related

- [NLLanguage](./nllanguage.md)
- [NLTagger](./nltagger.md)
