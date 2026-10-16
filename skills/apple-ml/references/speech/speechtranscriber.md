# SpeechTranscriber

A speech-to-text transcription module that is appropriate for normal conversation and general purposes. Add it to a `SpeechAnalyzer`.

## Signature / Usage

```swift
guard let locale = SpeechTranscriber.supportedLocale(equivalentTo: Locale.current) else {
    /* Note unsupported language */
}
let transcriber = SpeechTranscriber(locale: locale, preset: .transcription)
let analyzer = SpeechAnalyzer(modules: [transcriber])

for try await result in transcriber.results {
    let text = String(result.text.characters)
    print(text)
}
```

## Options / Props

Declaration: `final class SpeechTranscriber` (conforms to `LocaleDependentSpeechModule`, `SpeechModule`, `Sendable`).

| Name | Type | Description |
|------|------|-------------|
| `convenience init(locale:preset:)` | `Locale`, `SpeechTranscriber.Preset` | Creates a general-purpose transcriber according to a preset. |
| `convenience init(locale:transcriptionOptions:reportingOptions:attributeOptions:)` | `Locale`, `Set<TranscriptionOption>`, `Set<ReportingOption>`, `Set<ResultAttributeOption>` | Creates a general-purpose transcriber. |
| `Preset` | struct | Predefined transcriber configurations. |
| `TranscriptionOption` | enum | Options relating to the text of the transcription. |
| `ReportingOption` | enum | Options relating to the transcriber's result delivery. |
| `ResultAttributeOption` | enum | Options relating to the attributes of the transcription. |
| `static isAvailable` | `Bool` | Whether this module is available given the device's hardware and capabilities. |
| `static installedLocales` | `[Locale]` | Locales the transcriber can transcribe into, considering only locales installed on the device. |
| `static supportedLocales` | `[Locale]` | Locales the transcriber can transcribe into, including downloadable ones not yet installed. |
| `static supportedLocale(equivalentTo:)` | `async -> Locale?` | A supported locale equivalent to the given locale. |
| `availableCompatibleAudioFormats` | `[AVAudioFormat]` | Audio formats this module can analyze, given its configuration. |
| `results` | `some Sendable & AsyncSequence<SpeechTranscriber.Result, any Error>` | The asynchronous sequence of transcription results. |
| `Result` | struct | A phrase or passage of transcribed speech. The phrases are sent in order. |
| `selectedLocales` | `[Locale]` | Asset locales specified by the module's configuration. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Check `isAvailable` or `supportedLocales` first. If the device does not support the models, consider disabling the feature or using `DictationTranscriber` instead.
- Several transcriber instances can share the same backing engine and models if configured similarly.
- Assets must be installed (see `AssetInventory`) before analysis.
- Distinct from the older `SFSpeechRecognizer` request/delegate API.

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SpeechDetector](./speechdetector.md)
- [SpeechModule](./speechmodule.md)
- [LocaleDependentSpeechModule](./localedependentspeechmodule.md)
- [AssetInventory](./assetinventory.md)
