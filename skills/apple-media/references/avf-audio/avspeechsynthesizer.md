# AVSpeechSynthesizer

Produces synthesized speech from `AVSpeechUtterance` objects. Maintains a queue of utterances and provides controls for pause, resume, and stop.

## Signature / Usage

```swift
let synthesizer = AVSpeechSynthesizer()
let utterance = AVSpeechUtterance(string: "Hello, world!")
utterance.voice = AVSpeechSynthesisVoice(language: "en-US")
utterance.rate = AVSpeechUtteranceDefaultSpeechRate
synthesizer.speak(utterance)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isSpeaking` | `Bool` | Whether the synthesizer is speaking or has queued utterances (read-only) |
| `isPaused` | `Bool` | Whether the synthesizer is paused (read-only) |
| `delegate` | `AVSpeechSynthesizerDelegate?` | Receives start, finish, pause, resume, and error events |
| `usesApplicationAudioSession` | `Bool` | When `true`, the app manages the audio session |
| `mixToTelephonyUplink` | `Bool` | Routes speech output to an active phone call |
| `outputChannels` | `[AVAudioSessionChannelDescription]?` | Audio channels for speech routing |

### Key Methods

| Method | Description |
|--------|-------------|
| `speak(_:)` | Enqueues an utterance; begins immediately if idle |
| `pauseSpeaking(at:)` | Pauses at `.immediate` or `.word` boundary |
| `continueSpeaking()` | Resumes from paused state |
| `stopSpeaking(at:)` | Stops and clears the queue |
| `write(_:toBufferCallback:)` | Generates speech into PCM buffers for custom processing |

## Notes

- iOS 7.0+, macOS 10.14+, tvOS (all), watchOS 2.0+, visionOS 1.0+
- The system does not retain the synthesizer automatically; store it in a property until speech completes or it will be deallocated prematurely
- Utterances are spoken in FIFO order; use `stopSpeaking(at:)` then re-enqueue to interrupt
- Call `requestPersonalVoiceAuthorization(completionHandler:)` before using a user's personal voice

## Related

- [AVSpeechUtterance](./avspeechutterance.md)
