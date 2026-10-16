# CaptureInputSequenceProvider

Reads from an AV capture device such as a microphone, providing the captured audio in a format suitable for analysis by a speech analyzer.

## Signature / Usage

```swift
final class CaptureInputSequenceProvider
```

```swift
// Factory (signature from the official documentation)
static func providerWithSession(
    from: AVCaptureDevice,
    compatibleWith: [any SpeechModule],
    priority: TaskPriority?
) async throws -> CaptureInputSequenceProvider
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `static providerWithSession(from:compatibleWith:priority:)` | `async throws -> CaptureInputSequenceProvider` | Returns a provider that reads from an audio capture device and configures a new capture session with that device. |
| `static provider(from:in:compatibleWith:priority:)` | `async throws -> CaptureInputSequenceProvider` | Returns a provider that reads from an audio capture device in an existing `AVCaptureSession`. |
| `init(session:analyzerFormat:priority:)` | `AVCaptureSession`, `AVAudioFormat`, `TaskPriority?` | Creates an input sequence provider (`throws`). |
| `analyzerInputs` | `some Sendable & AsyncSequence<AnalyzerInput, any Error>` | A new sequence of speech analyzer input objects containing captured audio. |
| `captureSession` | `AVCaptureSession` | The underlying capture session. |
| `captureAudioDataOutput` | `AVCaptureAudioDataOutput` | An audio data output that routes and converts captured audio buffers to async sequences. |

## Notes

- iOS 27.0+, iPadOS 27.0+, Mac Catalyst 27.0+, macOS 27.0+, tvOS 27.0+, visionOS 27.0+.
- Pass `analyzerInputs` to `SpeechAnalyzer.analyzeSequence(_:)`, `start(inputSequence:)`, or an analyzer initializer's input-sequence parameter, then call a `finish` method to end the session.
- Source: https://developer.apple.com/documentation/speech/captureinputsequenceprovider

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [AssetInputSequenceProvider](./assetinputsequenceprovider.md)
- [AnalyzerInputConverter](./analyzerinputconverter.md)
- [AnalyzerInput](./analyzerinput.md)
