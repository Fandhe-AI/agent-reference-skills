# AVAudioPCMBuffer

A mutable buffer holding audio in PCM format. Used for reading from and writing to `AVAudioFile`, and for scheduling playback via `AVAudioPlayerNode`.

## Signature / Usage

```swift
let format = AVAudioFormat(standardFormatWithSampleRate: 44100, channels: 2)!
let buffer = AVAudioPCMBuffer(pcmFormat: format, frameCapacity: 4096)!
buffer.frameLength = 4096

// Access raw float samples
if let channelData = buffer.floatChannelData {
    let leftChannel = channelData[0]  // UnsafeMutablePointer<Float>
    let rightChannel = channelData[1]
}
```

## Options / Props

| Name | Type | Description |
|------|------|-------------|
| `frameCapacity` | `AVAudioFrameCount` | Maximum number of sample frames the buffer can hold (read-only) |
| `frameLength` | `AVAudioFrameCount` | Number of valid sample frames currently in the buffer (read/write) |
| `stride` | `Int` | Number of interleaved channels (read-only) |
| `floatChannelData` | `UnsafePointer<UnsafeMutablePointer<Float>>?` | 32-bit float audio samples per channel |
| `int16ChannelData` | `UnsafePointer<UnsafeMutablePointer<Int16>>?` | 16-bit integer audio samples per channel |
| `int32ChannelData` | `UnsafePointer<UnsafeMutablePointer<Int32>>?` | 32-bit integer audio samples per channel |

## Notes

- iOS 8.0+, macOS 10.10+, tvOS 9.0+, watchOS 2.0+, visionOS 1.0+
- Always set `frameLength` to indicate how many frames of data are valid before using the buffer
- Use `init(pcmFormat:bufferListNoCopy:deallocator:)` to wrap existing memory without copying
- For thread-safe read-only access, use `AVReadOnlyAudioPCMBuffer` (returned by `AVAudioFile.read(frameCount:)`)
- `floatChannelData`, `int16ChannelData`, and `int32ChannelData` return `nil` if the buffer format does not match the corresponding type

## Related

- [AVAudioFile](./avaudiofile.md)
- [AVAudioPlayerNode](./avaudioplayernode.md)
- [AVAudioEngine](./avaudioengine.md)
