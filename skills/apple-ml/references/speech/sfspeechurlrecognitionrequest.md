# SFSpeechURLRecognitionRequest

A request to recognize speech in a pre-recorded audio file. Inherits from `SFSpeechRecognitionRequest`.

## Signature / Usage

```swift
guard let recognizer = SFSpeechRecognizer(), recognizer.isAvailable else { return }

let request = SFSpeechURLRecognitionRequest(url: audioFileURL)
request.shouldReportPartialResults = false

recognizer.recognitionTask(with: request) { result, error in
    guard let result else { return }
    if result.isFinal {
        print(result.bestTranscription.formattedString)
    }
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `url` | `URL` | The URL of the audio file to recognize. |

Inherits all properties from `SFSpeechRecognitionRequest` (`shouldReportPartialResults`, `requiresOnDeviceRecognition`, `contextualStrings`, etc.).

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. Audio file duration limit is one minute. For live microphone audio use `SFSpeechAudioBufferRecognitionRequest` instead.

As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Speech Recognition in Objective-C). It carries no deprecation marker; it is not deprecated. The modern path is `SpeechAnalyzer` with `SpeechTranscriber` / `DictationTranscriber` (iOS 26.0+); on that side, file/asset input is supplied through `AssetInputSequenceProvider` (iOS 27.0+).

## Related

- [SFSpeechRecognitionRequest](./sfspeechrecognitionrequest.md)
- [SFSpeechAudioBufferRecognitionRequest](./sfspeechaudiobufferrecognitionrequest.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
- [SFSpeechRecognitionResult](./sfspeechrecognitionresult.md)
