# SpeechModuleResult

Protocol that all module results conform to.

## Signature / Usage

```swift
protocol SpeechModuleResult
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `range` | `CMTimeRange` | The audio input range that this result applies to. (required) |
| `isFinal` | `Bool` | Whether this result is final at the time it is produced. |
| `resultsFinalizationTime` | `CMTime` | The audio input time up to which results from this module have been finalized (after this result). The module's results are final up to but not including this time. (required) |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Conforming types: `SpeechTranscriber.Result`, `DictationTranscriber.Result`, `SpeechDetector.Result`.

## Related

- [SpeechModule](./speechmodule.md)
- [AnalyzerInput](./analyzerinput.md)
- [SpeechTranscriber](./speechtranscriber.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SpeechDetector](./speechdetector.md)
