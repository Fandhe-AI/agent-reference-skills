# AVAudioEngine

Manages a graph of audio nodes for real-time and offline audio processing, including playback, recording, effects, and 3D spatialization.

## Signature / Usage

```swift
let engine = AVAudioEngine()
let playerNode = AVAudioPlayerNode()

engine.attach(playerNode)
engine.connect(playerNode, to: engine.mainMixerNode, format: audioFile.processingFormat)

try engine.start()
playerNode.scheduleFile(audioFile, at: nil)
playerNode.play()
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `inputNode` | `AVAudioInputNode` | Singleton input node (microphone) |
| `outputNode` | `AVAudioOutputNode` | Singleton output node (speaker) |
| `mainMixerNode` | `AVAudioMixerNode` | Singleton main mixer node; created on first access |
| `attachedNodes` | `Set<AVAudioNode>` | All nodes currently attached to the engine (read-only) |
| `isRunning` | `Bool` | Whether the engine is currently running (read-only) |
| `isInManualRenderingMode` | `Bool` | Whether engine is in manual (offline) rendering mode (read-only) |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Call `attach(_:)` before connecting a node; call `connect(_:to:format:)` to wire nodes together
- `start()` throws; always call inside a `do-catch` block
- Removing nodes with differing channel counts during runtime can break the graph; prefer reconnecting only upstream of a mixer
- Enable `enableManualRenderingMode(_:format:maximumFrameCount:)` for offline or faster-than-real-time rendering

## Related

- [AVAudioPlayerNode](./avaudioplayernode.md)
- [AVAudioMixerNode](./avaudiomixernode.md)
- [AVAudioUnitEffect](./avaudiouniteffect.md)
- [AVAudioFile](./avaudiofile.md)
