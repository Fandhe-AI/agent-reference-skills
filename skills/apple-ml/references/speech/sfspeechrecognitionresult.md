# SFSpeechRecognitionResult

Contains the partial or final results of a speech recognition request. Created by the Speech framework and delivered to your result handler or delegate — do not instantiate directly.

## Signature / Usage

```swift
recognizer.recognitionTask(with: request) { result, error in
    guard let result else { return }

    // Check if this is the final result
    if result.isFinal {
        print(result.bestTranscription.formattedString)
    } else {
        // Partial result — update UI
        print(result.bestTranscription.formattedString)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bestTranscription` | `SFTranscription` | The transcription with the highest confidence level. |
| `transcriptions` | `[SFTranscription]` | All potential transcriptions sorted by descending confidence. |
| `isFinal` | `Bool` | Whether speech recognition is complete and results are final. |
| `speechRecognitionMetadata` | `SFSpeechRecognitionMetadata?` | Metadata about the recognition result (speaking rate, average pause, etc.). |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. When `shouldReportPartialResults` is `true`, you receive multiple results with `isFinal == false` before the terminal result where `isFinal == true`. Only the final result is guaranteed to be accurate.

As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Speech Recognition in Objective-C). It carries no deprecation marker; it is not deprecated. The modern counterpart is `SpeechTranscriber.Result` ("a phrase or passage of transcribed speech"), delivered through `SpeechAnalyzer` (iOS 26.0+).

## Related

- [SFTranscription](./sftranscription.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
- [SFSpeechRecognitionTask](./sfspeechrecognitiontask.md)
