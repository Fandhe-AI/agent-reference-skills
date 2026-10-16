# AnalyzerInput

Time-coded audio data supplied to a `SpeechAnalyzer`.

## Signature / Usage

```swift
let (inputSequence, inputBuilder) = AsyncStream.makeStream(of: AnalyzerInput.self)
inputBuilder.yield(AnalyzerInput(buffer: pcmBuffer))
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `init(buffer:)` | `AVAudioPCMBuffer` | Creates an audio input object. |
| `init(buffer:)` | `CMReadySampleBuffer<CMReadOnlyDataBlockBuffer>` | Creates an audio input object. |
| `init(buffer:bufferStartTime:)` | `AVAudioPCMBuffer`, `CMTime?` | Creates an audio input object for audio that may be discontiguous with previous input. |
| `bufferStartTime` | `CMTime?` | The time-code of this input. |
| `bufferDuration` | `CMTime` | The length of this input. |
| `bufferFormat` | `AVAudioFormat` | The audio format of this input. |
| `buffer` | `AVAudioPCMBuffer` | A new copy of the audio data for this input. Deprecated. |

## Notes

- iOS 26.0+, iPadOS 26.0+, Mac Catalyst 26.0+, macOS 26.0+, tvOS 26.0+, visionOS 26.0+.
- The audio must be in a format supported by the analyzer's modules; the analyzer does not convert. Call `SpeechAnalyzer.bestAvailableAudioFormat(compatibleWith:considering:)` (or variants) to pick a target format.
- The audio format may differ from one `AnalyzerInput` to the next; if the new format is supported, modules are reconfigured as needed.
- `buffer` is marked deprecated in the source documentation.
- Source: https://developer.apple.com/documentation/speech/analyzerinput

## Related

- [SpeechAnalyzer](./speechanalyzer.md)
- [AnalyzerInputConverter](./analyzerinputconverter.md)
- [SpeechModuleResult](./speechmoduleresult.md)
