# DictationTranscriber

A speech-to-text transcription module that is similar to system dictation features and compatible with older devices.

## Signature / Usage

```swift
// Bias recognition towards certain words
let context = AnalysisContext()
// context.contextualStrings[...] = [...]  (see AnalysisContext)

let transcriber = DictationTranscriber(
    locale: locale,
    contentHints: [.farField],
    transcriptionOptions: [],
    reportingOptions: [],
    attributeOptions: []
)
let analyzer = SpeechAnalyzer(modules: [transcriber])
try await analyzer.setContext(context)
```

## Options / Props

Declaration: `final class DictationTranscriber` (conforms to `LocaleDependentSpeechModule`, `SpeechModule`, `Sendable`).

| Name | Type | Description |
|------|------|-------------|
| `convenience init(locale:preset:)` | `Locale`, `DictationTranscriber.Preset` | Creates a transcriber according to a preset. |
| `convenience init(locale:contentHints:transcriptionOptions:reportingOptions:attributeOptions:)` | `Locale`, `Set<ContentHint>`, `Set<TranscriptionOption>`, `Set<ReportingOption>`, `Set<ResultAttributeOption>` | Creates a transcriber. |
| `Preset` | struct | Predefined transcriber configurations. |
| `ContentHint` | struct | Expected characteristics of the spoken audio content and its delivery. Includes `farField` and `customizedLanguage(modelConfiguration:)`. |
| `TranscriptionOption` / `ReportingOption` / `ResultAttributeOption` | enums | Options for transcription text, result delivery, and result attributes. |
| `static installedLocales` / `supportedLocales` | `[Locale]` | Installed locales / all supported locales including downloadable ones. |
| `static supportedLocale(equivalentTo:)` | `async -> Locale?` | A supported locale equivalent to the given locale. |
| `availableCompatibleAudioFormats` | `[AVAudioFormat]` | Audio formats this module can analyze. |
| `results` | `some Sendable & AsyncSequence<DictationTranscriber.Result, any Error>` | The asynchronous sequence of transcription results. |
| `Result` | struct | A phrase or passage of transcribed speech. The phrases are sent in order. |
| `selectedLocales` | `[Locale]` | Asset locales specified by the module's configuration. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, visionOS 26.0+ (tvOS is not listed for this class).
- Uses the same speech-to-text models as system dictation, or as `SFSpeechRecognizer` configured for on-device operation. It does not support languages or locales that `SFSpeechRecognizer` only supports via network access.
- Improve accuracy: add words to `AnalysisContext.contextualStrings` and set it on the analyzer (initializer or `context`); supply custom vocabulary via `SFSpeechLanguageModel` plus the `ContentHint.customizedLanguage(modelConfiguration:)` hint; use hints such as `farField` for distant speech.
- Source: https://developer.apple.com/documentation/speech/dictationtranscriber

## Related

- [SpeechTranscriber](./speechtranscriber.md)
- [SpeechAnalyzer](./speechanalyzer.md)
- `AnalysisContext`
- [SFSpeechLanguageModel](./sfspeechlanguagemodel.md)
- [SFSpeechLanguageModel.Configuration](./sfspeechlanguagemodel-configuration.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
