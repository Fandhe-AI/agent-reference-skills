# SFSpeechAudioBufferRecognitionRequest

A request to recognize speech from live or buffered audio content (e.g., microphone input). Inherits from `SFSpeechRecognitionRequest`.

## Signature / Usage

```swift
let request = SFSpeechAudioBufferRecognitionRequest()
request.shouldReportPartialResults = true

let task = recognizer.recognitionTask(with: request) { result, error in
    if let result {
        print(result.bestTranscription.formattedString)
    }
}

// Feed audio from AVAudioEngine tap
audioEngine.inputNode.installTap(onBus: 0, bufferSize: 1024,
    format: request.nativeAudioFormat) { buffer, _ in
    request.append(buffer)
}

// When done recording:
request.endAudio()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `nativeAudioFormat` | `AVAudioFormat` | The preferred audio format for optimal recognition (read-only). |

Inherits all properties from `SFSpeechRecognitionRequest` (`shouldReportPartialResults`, `requiresOnDeviceRecognition`, `contextualStrings`, etc.).

## Key Methods

| Method | Description |
|--------|-------------|
| `append(_:)` | Appends an `AVAudioPCMBuffer` to the recognition request. |
| `appendAudioSampleBuffer(_:)` | Appends a `CMSampleBuffer` to the recognition request. |
| `endAudio()` | Marks the end of audio input; must be called to finalize recognition. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. The request starts with no audio; call `append(_:)` continuously as audio is captured. You must explicitly call `endAudio()` to stop the recognition process. For file-based audio use `SFSpeechURLRecognitionRequest` instead.

As of 2026-10-16 the official documentation classifies this API under "Legacy API" (Speech Recognition in Objective-C). It carries no deprecation marker; it is not deprecated. The modern path is `SpeechAnalyzer` with `SpeechTranscriber` / `DictationTranscriber` (iOS 26.0+); on that side, audio is supplied as `AnalyzerInput` (time-coded audio data, iOS 26.0+) and `CaptureInputSequenceProvider` (iOS 27.0+).

## Related

- [SFSpeechRecognitionRequest](./sfspeechrecognitionrequest.md)
- [SFSpeechURLRecognitionRequest](./sfspeechurlrecognitionrequest.md)
- [SFSpeechRecognizer](./sfspeechrecognizer.md)
- [SFSpeechRecognitionTask](./sfspeechrecognitiontask.md)
