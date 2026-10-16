# NLScript

The writing scripts that the Natural Language framework supports.

## Signature / Usage

```swift
struct NLScript

static let latin: NLScript

init(_: String)
init(rawValue: String)
```

## Options / Props

### Standard scripts (`static let <name>: NLScript`)

| Name | Description |
|------|-------------|
| `arabic` | The unique identifier string for the Arabic script. |
| `armenian` | The unique identifier string for the Armenian script. |
| `bengali` | The unique identifier string for the Bengali script. |
| `canadianAboriginalSyllabics` | The unique identifier string for the Canadian Aboriginal Syllabics. |
| `cherokee` | The unique identifier string for the Cherokee script. |
| `cyrillic` | The unique identifier string for the Cyrillic script. |
| `devanagari` | The unique identifier string for the Devanagari script. |
| `ethiopic` | The unique identifier string for the Ethiopic script. |
| `georgian` | The unique identifier string for the Georgian script. |
| `greek` | The unique identifier string for the Greek script. |
| `gujarati` | The unique identifier string for the Gujarati script. |
| `gurmukhi` | The unique identifier string for the Gurmukhi script. |
| `hebrew` | The unique identifier string for the Hebrew script. |
| `japanese` | The unique identifier string for the Japanese script. |
| `kannada` | The unique identifier string for the Kannada script. |
| `khmer` | The unique identifier string for the Khmer script. |
| `korean` | The unique identifier string for the Korean script. |
| `lao` | The unique identifier string for the Lao script. |
| `latin` | The unique identifier string for the Latin script. |
| `malayalam` | The unique identifier string for the Malayalam script. |
| `mongolian` | The unique identifier string for the Mongolian script. |
| `myanmar` | The unique identifier string for the Myanmar script. |
| `oriya` | The unique identifier string for the Oriya script. |
| `simplifiedChinese` | The unique identifier string for the simplified Chinese script. |
| `sinhala` | The unique identifier string for the Sinhala script. |
| `tamil` | The unique identifier string for the Tamil script. |
| `telugu` | The unique identifier string for the Telugu script. |
| `thai` | The unique identifier string for the Thai script. |
| `tibetan` | The unique identifier string for the Tibetan script. |
| `traditionalChinese` | The unique identifier string for the traditional Chinese script. |
| `undetermined` | The unique identifier string for a script the Natural Language framework doesn't recognize. |

### Creating custom script tags

| Name | Description |
|------|-------------|
| `init(_:)` | Creates a language script with the given string. |
| `init(rawValue:)` | Creates a language script with the given string as its raw value. |

## Notes

- Availability: iOS 12.0+, iPadOS 12.0+, Mac Catalyst 13.0+, macOS 10.14+, tvOS 12.0+, visionOS 1.0+, watchOS 5.0+.
- Conforms to `Equatable`, `Hashable`, `RawRepresentable`, `Sendable`, `SendableMetatype`.
- In Objective-C this is declared as `typedef NSString * NLScript;`.
- Source: https://developer.apple.com/documentation/naturallanguage/nlscript

## Related

- [NLContextualEmbeddingKey](./nlcontextualembeddingkey.md)
- [NLContextualEmbedding](./nlcontextualembedding.md)
- [NLLanguage](./nllanguage.md)
