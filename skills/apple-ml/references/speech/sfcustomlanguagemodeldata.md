# SFCustomLanguageModelData

An object that generates and exports custom language model training data.

## Signature / Usage

```swift
class SFCustomLanguageModelData
```

```swift
// Members as declared in the official documentation
init(locale: Locale, identifier: String, version: String)
convenience init(locale: Locale, identifier: String, version: String, builder: () -> any DataInsertable)
func insert(term: SFCustomLanguageModelData.CustomPronunciation)
func insert(phraseCount: SFCustomLanguageModelData.PhraseCount)
func export(to: URL) async throws
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(locale:identifier:version:)` | initializer | Constructs an empty data container. |
| `init(locale:identifier:version:builder:)` | convenience initializer | Constructs a data container using a builder. |
| `insert(term:)` | `CustomPronunciation` | Adds a custom term to the vocabulary. |
| `static supportedPhonemes(locale:)` | `[String]` | Lists the supported subset of X-SAMPA pronunciations for this locale. |
| `insert(phraseCount:)` | `PhraseCount` | Adds a sample to the body of training data. |
| `insert(phraseCountGenerator:)` | `PhraseCountGenerator` | Adds a stream of samples to the body of training data. |
| `export(to:)` | `URL`, `async throws` | Exports the accumulated data to a file. |
| `identifier` / `locale` / `version` | `String` / `Locale` / `String` | Inspect model data. |
| `CustomPronunciation` | struct | A term to be introduced into the recognition model's vocabulary. |
| `PhraseCount` | struct | A phrase used to bias the language model, with a weight for the relative strength of the bias. |
| `PhraseCountGenerator` / `TemplatePhraseCountGenerator` | classes | Generate `PhraseCount` values via an iterator / from templates. |
| `PhraseCountsFromTemplates` | struct | Builds data from template classes with the result builder DSL. |
| `DataInsertableBuilder` / `TemplateInsertableBuilder` | structs | Result builders constructing model data from closures. |
| `CompoundTemplate`, `DataInsertable`, `TemplateInsertable` | types | Result builder support; not intended for direct use. |

## Notes

- iOS 17.0+, iPadOS 17.0+, Mac Catalyst 17.0+, macOS 14.0+, tvOS 17.0+, visionOS 1.1+. Conforms to `Decodable`, `Encodable`, `Equatable`, `Hashable`.
- The exported file is compiled into a language model with `SFSpeechLanguageModel.prepareCustomLanguageModel(for:configuration:completion:)`.
- Source: https://developer.apple.com/documentation/speech/sfcustomlanguagemodeldata

## Related

- [SFSpeechLanguageModel](./sfspeechlanguagemodel.md)
- [SFSpeechLanguageModel.Configuration](./sfspeechlanguagemodel-configuration.md)
- `AnalysisContext`
