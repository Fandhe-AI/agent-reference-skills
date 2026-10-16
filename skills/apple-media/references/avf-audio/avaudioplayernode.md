# AVAudioPlayerNode

An `AVAudioEngine` node that schedules playback of `AVAudioPCMBuffer` objects or segments of `AVAudioFile`. Supports precise timing control and completion callbacks.

## Signature / Usage

```swift
let engine = AVAudioEngine()
let playerNode = AVAudioPlayerNode()

engine.attach(playerNode)
engine.connect(playerNode, to: engine.mainMixerNode, format: audioFile.processingFormat)
try engine.start()

playerNode.scheduleFile(audioFile, at: nil, completionCallbackType: .dataPlayedBack) { _ in
    print("Playback complete")
}
playerNode.play()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `isPlaying` | `Bool` | Whether the node is currently playing (read-only) |

### Key Scheduling Methods

| Method | Description |
|--------|-------------|
| `scheduleFile(_:at:completionHandler:)` | Schedules an entire file for playback |
| `scheduleSegment(_:startingFrame:frameCount:at:completionHandler:)` | Schedules a portion of a file |
| `scheduleBuffer(_:at:options:completionHandler:)` | Schedules a PCM buffer |
| `play()` / `play(at:)` | Starts or resumes playback. Deprecated in 27.0 (all platforms); use `playAudio()` / `playAudio(at:)` |
| `playAudio()` / `playAudio(at:)` | `func playAudio() throws`, `func playAudio(at when: AVAudioTime?) throws`; starts or resumes playback (27.0+) |
| `pause()` | Pauses without clearing scheduled data |
| `stop()` | Stops and clears all scheduled data |
| `nodeTime(forPlayerTime:)` | Converts player timeline time to node time |
| `playerTime(forNodeTime:)` | Converts node time to player timeline time |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Must be attached to an `AVAudioEngine` before use
- Do not call `stop()` inside a completion handler — it causes deadlock
- `AVAudioPlayerNode` is not KVO-compliant; do not use Combine publishers to monitor it
- The snippet's `engine.connect(_:to:format:)` is deprecated in 27.0; use `try engine.connectNode(_:to:format:)` on 27.0+
- When `at:` is `nil`, playback follows immediately after the previously scheduled segment

## Related

- [AVAudioEngine](./avaudioengine.md)
- [AVAudioFile](./avaudiofile.md)
- [AVAudioPCMBuffer](./avaudiopcmbuffer.md)
- [AVAudioMixerNode](./avaudiomixernode.md)
