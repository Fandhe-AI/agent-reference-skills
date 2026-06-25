# NLLanguage

A struct of constants representing the languages supported by the Natural Language framework.

## Signature / Usage

```swift
struct NLLanguage: RawRepresentable, Hashable, Sendable

// Use with NLLanguageRecognizer
let lang = NLLanguageRecognizer.dominantLanguage(for: "Ciao mondo")
if lang == .italian { /* ... */ }

// Create from BCP 47 tag
let custom = NLLanguage(rawValue: "zh-Hans")
```

## Options / Props

### Selected Language Constants

| Constant | Language |
|----------|----------|
| `.english` | English |
| `.french` | French |
| `.spanish` | Spanish |
| `.german` | German |
| `.italian` | Italian |
| `.portuguese` | Portuguese |
| `.dutch` | Dutch |
| `.russian` | Russian |
| `.chinese` | Chinese (simplified/traditional) |
| `.japanese` | Japanese |
| `.korean` | Korean |
| `.arabic` | Arabic |
| `.hebrew` | Hebrew |
| `.hindi` | Hindi |
| `.thai` | Thai |
| `.turkish` | Turkish |
| `.vietnamese` | Vietnamese |
| `.indonesian` | Indonesian |
| `.undetermined` | Language could not be identified |

60+ additional constants are available (Bengali, Tamil, Telugu, Greek, Polish, Swedish, etc.).

## Notes

- Availability: iOS 12.0+, macOS 10.14+, tvOS 12.0+, watchOS 5.0+, visionOS 1.0+
- Raw value is a BCP 47 language tag string (e.g., `"en"`, `"fr"`, `"zh-Hans"`).
- Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`.

## Related

- [NLLanguageRecognizer](./nllanguagerecognizer.md)
- [NLEmbedding](./nlembedding.md)
- [NLContextualEmbedding](./nlcontextualembedding.md)
