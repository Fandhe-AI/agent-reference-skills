# SpeechModule

Protocol that all analyzer modules conform to.

## Signature / Usage

```swift
protocol SpeechModule : AnyObject, Sendable
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `availableCompatibleAudioFormats` | `[AVAudioFormat]` | The audio formats this module is able to analyze, given its configuration. (required) |
| `results` | `Self.Results` | An asynchronous sequence containing this module's analysis results; results are added as they are created. (required) |
| `Results` | associatedtype : `Sendable`, `AsyncSequence` | The results sequence type. (required) |
| `Result` | associatedtype : `SpeechModuleResult`, `Sendable` | The result element type. (required) |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Conforming types: `SpeechTranscriber`, `DictationTranscriber`, `SpeechDetector`. Inherited by `LocaleDependentSpeechModule`.

## Related

- [LocaleDependentSpeechModule](./localedependentspeechmodule.md)
- [SpeechModuleResult](./speechmoduleresult.md)
- [SpeechAnalyzer](./speechanalyzer.md)
- [SpeechTranscriber](./speechtranscriber.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SpeechDetector](./speechdetector.md)
