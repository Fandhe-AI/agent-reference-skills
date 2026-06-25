# SFSpeechRecognitionTask

A task object for monitoring and controlling the progress of a speech recognition request. Returned by `SFSpeechRecognizer.recognitionTask(with:...)` — do not instantiate directly.

## Signature / Usage

```swift
let task = recognizer.recognitionTask(with: request) { result, error in
    // handle result or error
}

// Cancel if user stops recording early
stopButton.addAction(UIAction { _ in
    task.cancel()
}, for: .touchUpInside)

// Or finish gracefully (stops accepting new audio, finalizes existing)
task.finish()

// Check current state
print(task.state)      // SFSpeechRecognitionTaskState
print(task.isCancelled)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `state` | `SFSpeechRecognitionTaskState` | The current state of the task (starting, running, finishing, canceled, completed). |
| `error` | `(any Error)?` | The error that occurred, if any. |
| `isCancelled` | `Bool` | Whether the task was canceled. |
| `isFinishing` | `Bool` | Whether audio input has stopped and the task is finalizing. |

## Key Methods

| Method | Description |
|--------|-------------|
| `cancel()` | Cancels the recognition task immediately, discarding any pending results. |
| `finish()` | Stops accepting new audio and processes audio already received. |

## Notes

iOS 10.0+, iPadOS 10.0+, macOS 10.15+, Mac Catalyst 10.0+, visionOS 1.0+. Call `finish()` for a graceful stop (remaining audio is processed); call `cancel()` to abort immediately. For live audio tasks, also call `SFSpeechAudioBufferRecognitionRequest.endAudio()` before or alongside `finish()`.

## Related

- [SFSpeechRecognizer](./sfspeechrecognizer.md)
- [SFSpeechRecognitionResult](./sfspeechrecognitionresult.md)
- [SFSpeechAudioBufferRecognitionRequest](./sfspeechaudiobufferrecognitionrequest.md)
