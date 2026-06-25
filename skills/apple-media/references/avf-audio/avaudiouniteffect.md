# AVAudioUnitEffect

Base class for real-time audio effect processing units in `AVAudioEngine`. Wrap AudioUnit plugins (effect, music effect, panner) as engine nodes.

## Signature / Usage

```swift
let engine = AVAudioEngine()
let playerNode = AVAudioPlayerNode()
let reverb = AVAudioUnitReverb()          // concrete subclass
reverb.loadFactoryPreset(.largeHall)
reverb.wetDryMix = 40

engine.attach(playerNode)
engine.attach(reverb)
engine.connect(playerNode, to: reverb, format: nil)
engine.connect(reverb, to: engine.mainMixerNode, format: nil)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `bypass` | `Bool` | When `true`, passes audio through without processing |

### Built-in Subclasses

| Class | Effect |
|-------|--------|
| `AVAudioUnitReverb` | Reverberation with factory presets |
| `AVAudioUnitDelay` | Echo/delay with feedback and low-pass filtering |
| `AVAudioUnitDistortion` | Signal distortion with factory presets |
| `AVAudioUnitEQ` | Multi-band parametric equalizer |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Use concrete subclasses (`AVAudioUnitReverb`, `AVAudioUnitEQ`, etc.) directly; instantiate `AVAudioUnitEffect` only with a custom `AudioComponentDescription`
- Effects are inserted into the audio graph between source and output nodes
- Setting `bypass = true` disables the effect without removing the node from the graph

## Related

- [AVAudioEngine](./avaudioengine.md)
- [AVAudioMixerNode](./avaudiomixernode.md)
- [AVAudioPlayerNode](./avaudioplayernode.md)
