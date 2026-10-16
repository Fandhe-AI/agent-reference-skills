# SpeechDetector

A module that performs a voice activity detection (VAD) analysis. It asks "is there speech?" so transcription can be gated by the presence of voices, saving power otherwise spent transcribing likely silence.

## Signature / Usage

```swift
let transcriber = SpeechTranscriber(..)
let speechDetector = SpeechDetector()
let analyzer = SpeechAnalyzer(.., modules: [speechDetector, transcriber])

// or later on:
let analyzer = SpeechAnalyzer(..)
let transcriber = SpeechTranscriber(..)
let speechDetector = SpeechDetector()
try await analyzer.setModules([transcriber, speechDetector])
```

## Options / Props

Declaration: `final class SpeechDetector` (conforms to `SpeechModule`, `Sendable`).

| Name | Type | Description |
|------|------|-------------|
| `convenience init()` | initializer | Creates a speech detector with default settings. |
| `init(detectionOptions:reportResults:)` | `SpeechDetector.DetectionOptions`, `Bool` | Creates a speech detector. |
| `DetectionOptions` | struct | Allows clients to customize an instance of a speech detector. |
| `SensitivityLevel` | enum | Determines how "aggressive" the VAD model is. Includes `medium`. |
| `availableCompatibleAudioFormats` | `[AVAudioFormat]` | Audio formats this module can analyze. |
| `results` | `some Sendable & AsyncSequence<SpeechDetector.Result, any Error>` | The asynchronous sequence of speech detection results. |
| `Result` | struct | A detector result; must be enabled via `init(detectionOptions:reportResults:)` and currently only supports error handling from the VAD model. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- Important: this module only functions in conjunction with a `SpeechTranscriber` or `DictationTranscriber` module.
- If the model drops audio that contains speech, there is a trade-off between power saved and lower transcription accuracy. `SensitivityLevel.medium` is recommended for most use cases; the value of these trade-offs is context-specific.

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [SpeechTranscriber](./speechtranscriber.md)
- [DictationTranscriber](./dictationtranscriber.md)
- [SpeechModule](./speechmodule.md)
