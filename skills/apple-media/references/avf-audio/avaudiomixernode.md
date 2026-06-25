# AVAudioMixerNode

An `AVAudioEngine` node that combines any number of input connections into a single output stream. Handles sample rate and channel count conversion automatically.

## Signature / Usage

```swift
let engine = AVAudioEngine()
let mixer = AVAudioMixerNode()
let playerA = AVAudioPlayerNode()
let playerB = AVAudioPlayerNode()

engine.attach(mixer)
engine.attach(playerA)
engine.attach(playerB)

// Connect both players into the mixer
engine.connect(playerA, to: mixer, format: format)
engine.connect(playerB, to: mixer, format: format)

// Connect mixer to output
engine.connect(mixer, to: engine.outputNode, format: nil)

mixer.outputVolume = 0.8
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `outputVolume` | `Float` | Output volume of the mixer (0.0–1.0) |
| `nextAvailableInputBus` | `AVAudioNodeBus` | Next unconnected input bus index (read-only) |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- `AVAudioEngine.mainMixerNode` is a built-in singleton mixer; attach a custom `AVAudioMixerNode` when you need separate sub-mix control
- Conforms to `AVAudioMixing`, `AVAudio3DMixing`, and `AVAudioStereoMixing` for per-input volume, pan, and 3D positioning
- Efficiently upmixes or downmixes inputs to match the output channel count

## Related

- [AVAudioEngine](./avaudioengine.md)
- [AVAudioPlayerNode](./avaudioplayernode.md)
- [AVAudioUnitEffect](./avaudiouniteffect.md)
