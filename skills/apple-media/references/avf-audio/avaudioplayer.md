# AVAudioPlayer

Plays audio data from a file or buffer. Supports volume, panning, rate adjustment, looping, and audio metering.

## Signature / Usage

```swift
// Initialize from file
let player = try AVAudioPlayer(contentsOf: url)
player.prepareToPlay()
player.play()

// Initialize from data buffer
let player = try AVAudioPlayer(data: data)
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `volume` | `Float` | Playback volume relative to other audio output |
| `pan` | `Float` | Stereo pan position (-1.0 left to 1.0 right) |
| `rate` | `Float` | Playback rate; requires `enableRate = true` |
| `enableRate` | `Bool` | Enables rate adjustment capability |
| `numberOfLoops` | `Int` | Repeat count; 0 = once, -1 = infinite |
| `isPlaying` | `Bool` | Current playback status (read-only) |
| `currentTime` | `TimeInterval` | Current position in the audio timeline |
| `duration` | `TimeInterval` | Total audio duration (read-only) |
| `isMeteringEnabled` | `Bool` | Enables audio-level metering |
| `delegate` | `AVAudioPlayerDelegate?` | Receives playback and error events |

## Notes

- iOS 2.2+, macOS 10.7+, tvOS 9.0+, watchOS 3.0+, visionOS 1.0+
- Call `prepareToPlay()` before `play()` to minimize playback latency
- Use `play(atTime:)` with `deviceCurrentTime` to synchronize multiple players
- For streaming or positional audio, use `AVAudioEngine` + `AVAudioPlayerNode` instead

## Related

- [AVAudioPlayerNode](./avaudioplayernode.md)
- [AVAudioEngine](./avaudioengine.md)
- [AVAudioSession](./avaudiosession.md)
